import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { filename, contentType } = body
    if (!filename || !contentType) {
      return new Response(JSON.stringify({ error: 'filename and contentType required' }), { status: 400 })
    }

    const s3Client = new S3Client({
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
      },
      forcePathStyle: true
    })

    const key = `${Date.now()}-${filename}`
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 5 })

    return new Response(JSON.stringify({ url: signedUrl, key }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
