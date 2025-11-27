# Application Routing Map

## Public Routes (No Auth Required)

### Landing & Information
- `/` - Home page (Welcome + Programmes + News)
- `/landing` - Full landing page
- `/programmes` - Browse all programmes
- `/news` - News & events listing

### Authentication
- `/auth/signin` - Login page
- `/auth/signup` - Create account
- `/auth/verify-email` - Email verification
- `/auth/forgot/options` - Password reset options
- `/auth/forgot/email-otp` - OTP verification
- `/auth/forgot/email-based` - Email-based recovery
- `/auth/forgot/security-question` - Security question
- `/auth/reset` - Reset password

## Protected Routes (Requires Authentication)

### Dashboard
- `/dashboard` - Main dashboard

### Profile Application Flow (Multi-step)
1. `/profile/personal` - Personal, Address & Contact Details
2. `/profile/qualification` - Educational qualifications
3. `/profile/reservation` - Reservation category
4. `/profile/photo` - Photo & signature upload
5. `/profile/documents` - Document uploads
6. `/profile/bank` - Bank account details
7. `/profile/declaration` - Declaration & consent
8. `/profile/summary` - Review all details
9. `/profile/payment` - Fee payment
10. `/profile/success` - Application submitted
11. `/profile/status` - Application status tracking

## Navigation Flow

### First Time User Journey
```
/ (Landing) → Register → Verify Email → Login → Dashboard → Profile (Personal) → ... → Success
```

### Returning User Journey
```
/ (Landing) → Login → Dashboard → Profile Status
```

### Password Reset Flow
```
Login → Forgot Password → Options → (Email OTP / Security Question) → Reset → Login
```

## Component Click Events

### Header.tsx
- "Login" button → `/auth/signin`
- "Register" button → `/auth/signup`
- Logo → `/`

### Welcome.tsx
- "Get Started" button → `/auth/signup`
- "View Programmes" button → `/programmes`

### Programmes.tsx
- "View Course Information" → `/programmes` (course detail)
- Tab filters → Filter programmes

### NewsEvents.tsx
- "Read More" links → `/news` (article detail)
- "View More" button → `/news`

### LoginForm.tsx
- Success → `/dashboard`
- "Forgot Password" → `/auth/forgot/options`
- "Create Account" → `/auth/signup`

### SignupForm.tsx
- Success → `/auth/verify-email`
- "Already have account" → `/auth/signin`

### Dashboard.tsx
- "Start Application" → `/profile/personal`
- "View Status" → `/profile/status`

### Profile Forms (Multi-step Navigation)
- "Next" button → Next step in flow
- "Previous" button → Previous step
- "Save & Exit" → `/dashboard`
- Final "Submit" → `/profile/payment`

## API Endpoints

### Authentication APIs
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify email token
- `POST /api/auth/forgot/send-otp` - Send OTP
- `POST /api/auth/forgot/verify-otp` - Verify OTP
- `POST /api/auth/forgot/reset` - Reset password

### Payment APIs
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Upload API
- `POST /api/upload` - Get S3 signed URL

## Implementation Status

✅ Header navigation (Login, Register)
✅ Welcome section routing
✅ Programmes navigation
✅ News events routing
✅ Login form routing
✅ API routes structure
⏳ Profile multi-step flow
⏳ Dashboard navigation
⏳ Payment integration
⏳ Document upload flow
