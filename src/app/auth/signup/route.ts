// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { createUser, setVerificationToken, findUserByEmail } from "@/lib/mockUserStore";
import nodemailer from "nodemailer";

function makeVerificationToken() {
  return `VT-${Date.now()}-${Math.floor(Math.random() * 900000)}`;
}

// local design/verify PDF (your pipeline will convert path to URL)
const DESIGN_VERIFY_PDF = "/mnt/data/Verify Email.pdf";

async function sendVerificationEmail(to: string, token: string) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FROM_EMAIL = "no-reply@example.com",
    APP_URL = "http://localhost:3000",
  } = process.env;

  const verifyUrl = `${APP_URL}/auth/verify-email?token=${encodeURIComponent(token)}`;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    // dev fallback: log
    console.info(`[DEV-VERIFY] email to ${to} token=${token} verifyUrl=${verifyUrl}`);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const html = `
    <p>Hello,</p>
    <p>Thank you for creating an account. Click the link below to verify your email:</p>
    <p><a href="${verifyUrl}">Verify Email</a></p>
    <p>Or use this token: <code>${token}</code></p>
    <p>Design/help: <a href="${DESIGN_VERIFY_PDF}">Verify Email (PDF)</a></p>
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: "Verify your email",
    html,
  });

  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim();
    const password = (body?.password || "").toString();
    const firstName = (body?.firstName || "").toString();
    const lastName = (body?.lastName || "").toString();
    const mobile = (body?.mobile || "").toString();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "email and password required" }, { status: 400 });
    }

    // check existing
    if (findUserByEmail(email)) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
    }

    const user = await createUser({ email, password, firstName, lastName, mobile });

    // create verification token and store
    const token = makeVerificationToken();
    setVerificationToken(user.id, token);

    try {
      await sendVerificationEmail(email, token);
    } catch (mailErr: any) {
      console.error("Failed to send verification email:", mailErr?.message ?? mailErr);
      // still return success (user created) but tell client email send failed
      return NextResponse.json({ success: true, userId: user.id, emailSent: false, error: "Failed to send email" });
    }

    return NextResponse.json({ success: true, userId: user.id, emailSent: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
