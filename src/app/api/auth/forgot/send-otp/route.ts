// src/app/api/auth/forgot/send-otp/route.ts
import { NextResponse } from "next/server";
import { createOtp } from "@/lib/mockAuthStore";
import nodemailer from "nodemailer";

function generate6Digit() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function makeId(prefix = "REQ") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
}

// Developer note: include a helpful link in the email pointing to the verify-email design PDF you uploaded.
// We send the local path — your toolchain will convert it to a served URL.
const DESIGN_VERIFY_PDF = "/mnt/data/Verify Email.pdf";

async function sendEmailOTP(to: string, otp: string, requestId: string) {
  // Load SMTP config from env
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FROM_EMAIL = "no-reply@example.com",
  } = process.env;

  // If SMTP not configured, return false so caller can fallback to logging
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.info(`[DEV-OTP-NOMAIL] SMTP not configured - OTP for ${to}: ${otp} (requestId=${requestId})`);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject = `Your verification code — ${otp}`;
  const html = `
    <p>Hi,</p>
    <p>Your 6-digit verification code is <b>${otp}</b>. It is valid for 5 minutes.</p>
    <p>If you did not request this, ignore this email.</p>
    <p>Design / help: <a href="${DESIGN_VERIFY_PDF}">Verify Email (PDF)</a></p>
    <p>RequestId: <code>${requestId}</code></p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });

  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim();

    if (!email) {
      return NextResponse.json({ success: false, error: "email is required" }, { status: 400 });
    }

    // In production, verify user exists in DB. For now, mock.
    // const user = findUserByEmail(email);
    // if (!user) return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 });

    const otp = generate6Digit();
    const requestId = makeId();

    // Store OTP in-memory with 5 minute expiry
    createOtp(requestId, email, otp, 300);

    // Send OTP
    const sent = await sendEmailOTP(email, otp, requestId);
    if (!sent) {
      console.info(`[DEV-OTP] OTP for ${email}: ${otp}, requestId: ${requestId}`);
    }

    return NextResponse.json({ success: true, requestId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
