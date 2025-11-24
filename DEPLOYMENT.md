# Vercel Deployment Guide

This guide will help you deploy the DU App to Vercel via GitHub.

## Prerequisites

1. GitHub account
2. Vercel account (sign up at [vercel.com](https://vercel.com))
3. PostgreSQL database (production)
4. S3-compatible storage bucket (production)

## Step 1: Prepare Your Database

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel project
2. Click "Storage" tab
3. Create a new Postgres database
4. Vercel will automatically set `POSTGRES_URL` environment variable

### Option B: External Database (Supabase, Neon, Railway, etc.)

1. Create a PostgreSQL database
2. Get the connection string
3. You'll add it to Vercel environment variables

## Step 2: Prepare S3 Storage

Set up one of these options:

- **AWS S3**: Create a bucket and get access keys
- **Cloudflare R2**: Create a bucket (S3-compatible, cheaper)
- **DigitalOcean Spaces**: Create a space
- **Backblaze B2**: Create a bucket

Get these credentials:

- Endpoint URL
- Region
- Access Key ID
- Secret Access Key
- Bucket Name

## Step 3: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - DU App setup"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/du-app.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `pnpm build` (auto-detected)
   - **Install Command**: `pnpm install` (auto-detected)

### Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 5: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Auth.js
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-app.vercel.app

# S3 Storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET=your-bucket-name
```

### Generate NEXTAUTH_SECRET

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use online generator
# https://generate-secret.vercel.app/32
```

**Important**: Set environment variables for all environments (Production, Preview, Development)

## Step 6: Run Database Migrations

After deployment, run migrations:

### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull

# Run migrations locally against production DB
pnpm run migrate:push
```

### Option B: Via CI/CD (Recommended for production)

Add a `postinstall` script to run migrations automatically:

```json
// In package.json
"scripts": {
  "postinstall": "pnpm run migrate:push || true"
}
```

> ⚠️ **Warning**: Only use auto-migrations in development. For production, use versioned migrations.

## Step 7: Create SuperAdmin User

Connect to your production database and run:

```sql
-- Generate password hash first
-- Run: node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"

INSERT INTO users (email, password_hash, name, role, is_active, email_verified)
VALUES (
  'admin@yourcompany.com',
  '$2a$10$YOUR_HASHED_PASSWORD_HERE',
  'Super Admin',
  'superadmin',
  true,
  NOW()
);
```

## Step 8: Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test sign-in at `/auth/signin`
3. Verify database connection
4. Test file upload functionality

## Troubleshooting

### Build Errors

**Error**: Module not found

```bash
# Solution: Clear Vercel cache and redeploy
vercel --force
```

**Error**: Out of memory

```bash
# Solution: Add to vercel.json
{
  "functions": {
    "api/**": {
      "memory": 1024
    }
  }
}
```

### Database Connection Issues

**Error**: Connection timeout

- Check if your database allows connections from Vercel IPs
- Vercel Postgres: No configuration needed
- External DB: Whitelist Vercel IPs or use connection pooling

**Solution**: Use connection pooling

```typescript
// In src/lib/drizzle.ts
const pool = new Pool({
  connectionString,
  max: 10, // Maximum number of clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Environment Variables Not Working

- Make sure variables are set for the correct environment (Production/Preview)
- Redeploy after adding new variables
- Check variable names (no typos)

### NextAuth Errors

**Error**: Invalid callback URL

```bash
# Solution: Update NEXTAUTH_URL to match your domain
NEXTAUTH_URL=https://your-actual-domain.vercel.app
```

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. Update `NEXTAUTH_URL` environment variable to use custom domain

## Continuous Deployment

Once set up, every push to `main` branch will:

1. Trigger a new build
2. Run type checking
3. Deploy to production

Preview deployments are created for:

- Pull requests
- Pushes to other branches

## Production Best Practices

### 1. Enable Production Mode Features

```typescript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Hide X-Powered-By header
  compress: true, // Enable gzip compression
};
```

### 2. Set Up Database Backups

- Vercel Postgres: Automatic backups included
- External DB: Set up automated backups

### 3. Monitor Your App

- Vercel Analytics: Built-in (enable in dashboard)
- Error Tracking: Add Sentry or similar
- Uptime Monitoring: Use Vercel's or external service

### 4. Security Checklist

- [ ] Strong NEXTAUTH_SECRET (32+ characters)
- [ ] Database credentials secure and rotated
- [ ] S3 bucket has proper CORS and access policies
- [ ] Environment variables never committed to git
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Rate limiting implemented on API routes

## Cost Optimization

### Vercel Free Tier Includes:

- Unlimited deployments
- 100 GB bandwidth
- Serverless function execution
- SSL certificates

### Paid Features You Might Need:

- Team collaboration
- Custom domains (3+ on Hobby, unlimited on Pro)
- Higher bandwidth limits
- Priority support

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Pull environment variables
vercel env pull

# Add environment variable
vercel env add [variable-name]
```

## Next Steps After Deployment

1. Set up monitoring and alerts
2. Configure error tracking
3. Set up automated backups
4. Add health check endpoints
5. Implement rate limiting
6. Set up staging environment
7. Configure CI/CD for tests

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Next.js on Vercel: [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
