# DU App — Dynamic University Management System

A comprehensive, dynamic university management system built for multi-university deployments with minimal developer intervention.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Chakra UI v3
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Storage**: S3-compatible (AWS S3, Cloudflare R2, etc.)
- **Authentication**: Auth.js (NextAuth.js) with Drizzle adapter
- **Form Validation**: React Hook Form + Zod
- **Package Manager**: pnpm

## Project Overview

This system is designed to be handed over to universities with a hierarchical structure:

- **SuperAdmin**: Manually adds universities to the database
- **University Admins**: University heads who manage colleges
- **Colleges**: Have curriculum, subjects, staff, and students
- **Staff**: College employees who manage academic operations
- **Students**: Can fill admission forms, pay fees, generate challans, etc.

Everything is designed to be **dynamic** and customizable with minimal developer intervention.

## Database Schema

The system includes comprehensive tables for:

### Core Entities

- **universities**: Multi-tenant university management with dynamic config
- **colleges**: College management under universities
- **users**: Unified user table for all roles (superadmin, admin, staff, student)
- **university_admins**: University head administrators
- **staff**: College staff members
- **students**: Student profiles with enrollment details

### Academic Structure

- **curricula**: Curriculum/program definitions
- **subjects**: Course/subject management per curriculum

### Dynamic Forms

- **form_templates**: Customizable form templates (admission, examination, certificates)
- **form_submissions**: Student form submissions with approval workflow

### Fee Management

- **fee_structures**: Configurable fee structures per college/curriculum
- **fee_payments**: Payment tracking with multiple payment methods
- **challans**: Fee challan generation and management

## Quick Start

### 1. Prerequisites

- Node.js >= 18.17.0 (Node.js 20+ recommended for best performance)
- PostgreSQL database
- pnpm installed globally (`npm install -g pnpm`)
- S3-compatible storage (AWS S3, Cloudflare R2, MinIO, etc.)

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env.local
```

Edit `.env.local` with your values:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/du_app

# Auth.js - Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# S3 Storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET=your-bucket-name
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Database Setup

```bash
# Generate migration files
pnpm run migrate:dev

# Push schema to database
pnpm run migrate:push
```

### 5. Create SuperAdmin User

You'll need to manually create the first superadmin user in the database. Here's a sample SQL:

```sql
-- Insert superadmin user (password: admin123)
INSERT INTO users (email, password_hash, name, role, is_active, email_verified)
VALUES (
  'admin@example.com',
  '$2a$10$YourHashedPasswordHere', -- Use bcrypt to hash your password
  'Super Admin',
  'superadmin',
  true,
  NOW()
);
```

To hash a password, you can use:

```javascript
const bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync("admin123", 10));
```

### 6. Run Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── forgot/
│   │   │   │   ├── send-otp/route.ts
│   │   │   │   ├── verify-otp/route.ts
│   │   │   │   └── reset/route.ts
│   │   │   ├── signup/route.ts
│   │   │   ├── verify-email/route.ts
│   │   │   └── login/route.ts
│   │   ├── payments/
│   │   │   ├── create/route.ts
│   │   │   └── verify/route.ts
│   │   └── upload/route.ts                # S3 signed-url endpoint (placeholder)
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx                   # Login page
│   │   ├── signup/
│   │   │   └── page.tsx                   # Signup page
│   │   ├── verify-email/
│   │   │   └── page.tsx                   # Verify email page (auto-call / UI)
│   │   └── forgot/
│   │       ├── options/
│   │       │   └── page.tsx
│   │       ├── email-otp/
│   │       │   └── page.tsx
│   │       ├── email-based/
│   │       │   └── page.tsx
│   │       ├── security-question/
│   │       │   └── page.tsx
│   │       └── reset/
│   │           └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx                       # Dashboard route wrapper
│   ├── profile/
│   │   ├── photo/
│   │   │   └── page.tsx
│   │   ├── documents/
│   │   │   └── page.tsx
│   │   ├── declaration/
│   │   │   └── page.tsx
│   │   ├── summary/
│   │   │   └── page.tsx
│   │   ├── payment/
│   │   │   └── page.tsx
│   │   ├── success/
│   │   │   └── page.tsx
│   │   └── status/
│   │       └── page.tsx
│   ├── landing/
│   │   └── page.tsx                       # Landing page (also src/app/page.tsx can redirect)
│   ├── programmes/
│   │   └── page.tsx
│   ├── news/
│   │   └── page.tsx
│   ├── layout.tsx                         # Root layout (renders MainContainer with children)
│   └── page.tsx                           # Home (imports Welcome + Programmes + NewsEvents)
│
├── components/
│   ├── ui/
│   │   ├── ButtonPrimary.tsx
│   │   ├── Card.tsx
│   │   ├── InputField.tsx
│   │   ├── Loader.tsx
│   │   └── Table.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── VerifyEmail.tsx
│   │   ├── ForgotOptions.tsx
│   │   ├── ForgotEmailOtp.tsx
│   │   ├── ForgotEmailBased.tsx
│   │   ├── ForgotSecurityQuestion.tsx
│   │   ├── ForgotResetPassword.tsx
│   │   ├── PhotoSignature.tsx
│   │   ├── DocumentDetails.tsx
│   │   ├── Declaration.tsx
│   │   ├── ProfileSummary.tsx
│   │   ├── Payment.tsx
│   │   └── SuccessPage.tsx
│   ├── dashboard/
│   │   ├── DashboardHome.tsx
│   │   └── ApplicationStatus.tsx
│   ├── landing/
│   │   └── LandingHero.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── MainContainer.tsx
│
├── lib/
│   ├── auth.ts                            # next-auth (placeholder) or auth helpers
│   ├── drizzle.ts                         # Drizzle DB client (placeholder)
│   ├── mockAuthStore.ts                   # OTP + reset in-memory store
│   └── mockUserStore.ts                   # in-memory users (signup/login mock)
│
├── providers/
│   └── ChakraProviders.tsx
|
├── db/
│   └── schema.ts                          # Drizzle schema (empty / scaffold)
|
├── styles/
│   └── globals.css
|
├── public/
│   └── hero-placeholder.png               # hero placeholder (or your image)
|
├── assets/
│   └── image 4.png                        # header logo file you used
|
└── package.json

## Available Scripts

```bash
pnpm dev          # Start development server (with Next.js 15)
pnpm dev --turbo  # Start dev server with Turbopack (faster)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript type checking
pnpm migrate:dev  # Generate migration files
pnpm migrate:push # Push schema to database
```

## Features Included

### ✅ Authentication & Authorization

- Auth.js (NextAuth.js) with Drizzle adapter
- Credentials-based login with bcrypt password hashing
- JWT session strategy
- Role-based access control (superadmin, admin, staff, student)
- Protected routes and API endpoints

### ✅ Database Schema

- Comprehensive schema covering all entities
- Foreign key relationships and indexes
- Dynamic configuration fields (JSONB)
- Audit fields (created_at, updated_at)

### ✅ File Upload

- S3-compatible storage integration
- Signed URL generation for secure uploads
- Works with AWS S3, Cloudflare R2, MinIO, etc.

### ✅ Form Handling

- React Hook Form integration
- Zod schema validation
- Example form implementation

### ✅ UI Components

- Chakra UI v3 integration
- Responsive layouts
- Form components with validation

## Next Steps

### Immediate Development Tasks

1. **Implement CRUD APIs**

   - University management endpoints
   - College management endpoints
   - User management endpoints
   - Student enrollment APIs

2. **Build Admin Dashboard**

   - SuperAdmin panel for university management
   - University admin panel for college management
   - Staff dashboard for student management

3. **Student Portal**

   - Registration/admission forms
   - Fee payment integration
   - Challan generation
   - Document uploads

4. **Dynamic Form Builder**

   - Form template creation UI
   - Field configuration
   - Conditional logic
   - Form preview and testing

5. **Fee Management**

   - Fee structure configuration
   - Payment gateway integration
   - Receipt generation
   - Payment history

6. **Reporting & Analytics**
   - Student enrollment reports
   - Fee collection reports
   - Academic performance tracking
   - Custom report builder

### Security Considerations

- [ ] Implement proper RBAC middleware
- [ ] Add input validation on all endpoints
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up audit logging
- [ ] Implement file upload validation
- [ ] Add data encryption for sensitive fields

### Production Checklist

- [ ] Set up proper database backups
- [ ] Configure production environment variables
- [ ] Set up CDN for static assets
- [ ] Implement proper error tracking (Sentry, etc.)
- [ ] Set up monitoring and logging
- [ ] Configure SSL certificates
- [ ] Set up database connection pooling
- [ ] Implement caching strategy (Redis)

## Configuration

### Dynamic Configuration

The system uses JSONB fields for dynamic configuration. Universities and colleges can have custom configurations stored in their `config` field:

```typescript
// Example university config
{
  "branding": {
    "primaryColor": "#007bff",
    "logo": "https://...",
    "name": "ABC University"
  },
  "features": {
    "enableAdmissions": true,
    "enableOnlinePayments": true,
    "enableCertificates": false
  },
  "settings": {
    "academicYearStart": "08-01",
    "semesterDuration": 6
  }
}
```

### Form Templates

Forms are defined dynamically using JSON schema:

```typescript
// Example form template
{
  "fields": [
    {
      "name": "full_name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "validation": { "minLength": 3 }
    },
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
      "required": true
    }
  ]
}
```

## Troubleshooting

### Database Connection Issues

```bash
# Test database connection
psql $DATABASE_URL
```

### Migration Issues

```bash
# Reset database (warning: deletes all data)
pnpm run migrate:push --force
```

### Type Errors

```bash
# Rebuild TypeScript types
pnpm run typecheck
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
