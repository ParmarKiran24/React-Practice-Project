#!/usr/bin/env node
/**
 * fetchFigmaAssets.js
 *
 * Improvements:
 * - dotenv support for FIGMA_API_KEY and FIGMA_FILE_KEY
 * - Accepts either a fileKey or a full Figma URL; extracts fileKey from URL
 * - Exponential backoff retries for network/rate-limit errors
 * - Unique sanitized filenames (prevents collisions)
 * - Format & scale support; correct file extension logic
 * - Summary metadata saved to figma-meta.json
 *
 * Usage:
 *   FIGMA_API_KEY=... FIGMA_FILE_KEY=... node scripts/fetchFigmaAssets.js
 *   node scripts/fetchFigmaAssets.js --token=xxx --file=https://www.figma.com/file/<fileKey>/...
 *   node scripts/fetchFigmaAssets.js --out=assets/figma --format=svg --scale=1
 *
 * Security:
 * - Do NOT commit .env with FIGMA_API_KEY
 */

const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

// load .env if present
try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional
}

async function main() {
  const argv = require('minimist')(process.argv.slice(2));
  const token = process.env.FIGMA_API_KEY || argv['token'] || argv['figma-token'] || argv['token'] || argv['FIGMA_API_KEY'];
  let fileKeyOrUrl = process.env.FIGMA_FILE_KEY || argv['file'] || argv['fileKey'] || argv['file-key'] || argv['FIGMA_FILE_KEY'];
  const outDir = argv['out'] || process.env.FIGMA_OUTPUT_DIR || 'public/figma';
  const format = (argv['format'] || process.env.FIGMA_IMAGE_FORMAT || 'png').toLowerCase();
  const scale = argv['scale'] || process.env.FIGMA_IMAGE_SCALE || '2';

  if (!token || !fileKeyOrUrl) {
    console.error('Missing FIGMA_API_KEY or FIGMA_FILE_KEY. Provide via env or CLI args.');
    console.error('Example: FIGMA_API_KEY=xxx FIGMA_FILE_KEY=yyy node scripts/fetchFigmaAssets.js');
    process.exit(2);
  }

  // if user provided a full figma url, extract file key
  const fileKey = extractFileKey(fileKeyOrUrl);
  if (!fileKey) {
    console.error('Could not extract Figma file key from provided value:', fileKeyOrUrl);
    process.exit(2);
  }

  const headers = {
    'X-Figma-Token': token,
    'Accept': 'application/json',
    'User-Agent': 'fetchFigmaAssets/1.0 (+https://your-repo)'
  };

  // 1) Get file document
  const fileUrl = `https://api.figma.com/v1/files/${fileKey}`;
  console.log('Fetching Figma file metadata...', fileUrl);

  const fileRes = await retryFetch(fileUrl, { headers }, 3);
  if (!fileRes.ok) {
    console.error('Failed to fetch file:', fileRes.status, await readTextSafe(fileRes));
    process.exit(3);
  }
  const fileJson = await fileRes.json();

  // 2) traverse nodes and collect candidate node IDs and names
  const nodes = {};
  function traverse(node, namePrefix = '') {
    const name = namePrefix ? `${namePrefix} / ${node.name || node.id}` : node.name || node.id;
    if (node.children && node.children.length) {
      node.children.forEach((c) => traverse(c, name));
    }
    // collect nodes that either have exportSettings or are common types
    if ((node.exportSettings && node.exportSettings.length > 0) ||
      ['FRAME','COMPONENT','RECTANGLE','VECTOR','ELLIPSE','GROUP','BOOLEAN','LINE','TEXT','INSTANCE'].includes(node.type)
    ) {
      nodes[node.id] = { id: node.id, name };
    }
  }
  traverse(fileJson.document);

  const nodeIds = Object.keys(nodes);
  if (nodeIds.length === 0) {
    console.log('No candidate nodes found for export. Exiting.');
    process.exit(0);
  }

  // ensure output directory
  fs.mkdirSync(outDir, { recursive: true });

  // 3) Request images in chunks
  const chunkSize = 50;
  const usedNames = new Map(); // to avoid collisions
  let downloaded = 0;
  let skipped = 0;
  for (let i = 0; i < nodeIds.length; i += chunkSize) {
    const chunk = nodeIds.slice(i, i + chunkSize);
    const params = new URLSearchParams({ ids: chunk.join(','), format, scale: String(scale) });
    const imagesUrl = `https://api.figma.com/v1/images/${fileKey}?${params.toString()}`;
    console.log('Requesting images for nodes:', chunk.length);
    const imgRes = await retryFetch(imagesUrl, { headers }, 3);
    if (!imgRes.ok) {
      console.error('Failed to request images:', imgRes.status, await readTextSafe(imgRes));
      continue;
    }
    const imgJson = await imgRes.json();
    const images = imgJson.images || {};

    // 4) download each image
    for (const [nodeId, url] of Object.entries(images)) {
      if (!url) {
        skipped++;
        continue;
      }
      const safeBase = sanitizeName(nodes[nodeId]?.name || nodeId);
      const ext = fileExtensionForFormat(format);
      const safeName = ensureUniqueName(usedNames, `${safeBase || nodeId}${ext}`);
      const outPath = path.join(outDir, safeName);
      console.log(`Downloading ${nodeId} -> ${outPath}`);
      try {
        const r = await retryFetch(url, {}, 3, true); // allow binary response
        if (!r.ok) {
          console.warn('Failed to download image for', nodeId, r.status);
          continue;
        }
        const buffer = Buffer.from(await r.arrayBuffer());
        fs.writeFileSync(outPath, buffer);
        downloaded++;
      } catch (err) {
        console.warn('Error downloading', nodeId, err.message || err);
      }
    }
  }

  // 5) Save metadata
  const meta = {
    fetchedAt: new Date().toISOString(),
    fileKey,
    format,
    scale,
    countCandidates: nodeIds.length,
    downloaded,
    skipped,
  };
  fs.writeFileSync(path.join(outDir, 'figma-meta.json'), JSON.stringify(meta, null, 2));
  console.log('Figma fetch completed. Assets saved to', outDir);
  console.log('Summary:', meta);
}

// helpers
function sanitizeName(name) {
  return name
    .replace(/[#%&{}<>*?/$!'":@+`|=\\\[\];,]/g, '') // remove many special chars
    .replace(/[^a-z0-9\-_. ]/gi, '') // allow safe chars
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 120);
}

function fileExtensionForFormat(format) {
  if (format === 'svg') return '.svg';
  if (format === 'jpg' || format === 'jpeg') return '.jpg';
  return '.png';
}

function ensureUniqueName(map, name) {
  const base = name.replace(/(\.\w+)$/, '');
  const ext = (name.match(/(\.\w+)$/) || ['',''])[0];
  let candidate = name;
  let n = 1;
  while (map.has(candidate)) {
    candidate = `${base}_${n}${ext}`;
    n++;
  }
  map.set(candidate, true);
  return candidate;
}

function extractFileKey(input) {
  if (!input) return null;
  // if looks like a direct key (alphanumeric hyphen)
  if (/^[A-Za-z0-9]+$/.test(input)) return input;
  // try to match /file/<fileKey>/
  const m = input.match(/\/file\/([A-Za-z0-9]+)(?:\/|$)/);
  if (m) return m[1];
  // sometimes people paste the "file key" with querystring; fallback to last path segment
  try {
    const u = new URL(input);
    const parts = u.pathname.split('/').filter(Boolean);
    // if 'file' in path, pick the token after
    const idx = parts.indexOf('file');
    if (idx >= 0 && parts[idx+1]) return parts[idx+1];
    // otherwise possibly the first segment
    if (parts.length > 0) return parts[parts.length - 1];
  } catch (e) {
    // ignore
  }
  return null;
}

async function retryFetch(url, options = {}, maxRetries = 3, allowNoCors = false) {
  let attempt = 0;
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  while (attempt <= maxRetries) {
    try {
      // For direct asset URLs, some servers may require no extra headers; pass options as-is
      const res = await fetch(url, options);
      // handle 429 with retry
      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
        const delay = retryAfter > 0 ? retryAfter * 1000 : (500 * Math.pow(2, attempt));
        console.warn(`429 received. Retrying after ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await wait(delay);
        attempt++;
        continue;
      }
      return res;
    } catch (err) {
      // transient network error
      if (attempt < maxRetries) {
        const delay = 500 * Math.pow(2, attempt);
        console.warn(`Fetch error (attempt ${attempt + 1}/${maxRetries}): ${err.message}. Retrying in ${delay}ms`);
        await wait(delay);
        attempt++;
        continue;
      }
      throw err;
    }
  }
  // final attempt
  return fetch(url, options);
}

async function readTextSafe(res) {
  try {
    return await res.text();
  } catch (e) {
    return '<no body>';
  }
}

main().catch((err) => {
  console.error('Unhandled error:', err);
  process.exit(4);
});
