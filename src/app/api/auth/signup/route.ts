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
    const firstName = (body?.firstName || body?.name || "").toString().trim();
    const lastName = (body?.lastName || "").toString().trim();
    const mobile = (body?.mobile || "").toString().trim();

    if (!email || !password || !firstName)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    const exists = findUserByEmail(email);
    if (exists)
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 409 });

    const user = await createUser({ email, password, firstName, lastName, mobile });
    const token = makeVerificationToken();
    setVerificationToken(user.id, token);

    await sendVerificationEmail(email, token);

    return NextResponse.json({ success: true, userId: user.id, email: user.email });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
