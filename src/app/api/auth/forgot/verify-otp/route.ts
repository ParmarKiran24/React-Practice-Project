// src/app/api/auth/forgot/verify-otp/route.ts
import { NextResponse } from "next/server";
import { getOtp, consumeOtp, incOtpAttempts, createResetToken } from "@/lib/mockAuthStore";

function makeResetToken() {
  return `RT-${Date.now()}-${Math.floor(Math.random() * 900000)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const requestId = (body?.requestId || "").toString();
    const otp = (body?.otp || "").toString();

    if (!requestId || !otp) {
      return NextResponse.json({ success: false, error: "requestId and otp are required" }, { status: 400 });
    }

    const entry = getOtp(requestId);
    if (!entry) {
      return NextResponse.json({ success: false, error: "OTP expired or invalid" }, { status: 400 });
    }

    // optional attempts guard
    if (entry.attempts >= 5) {
      consumeOtp(requestId);
      return NextResponse.json({ success: false, error: "Too many attempts, OTP invalidated" }, { status: 429 });
    }

    if (entry.otp !== otp) {
      incOtpAttempts(requestId);
      return NextResponse.json({ success: false, error: "Incorrect OTP" }, { status: 400 });
    }

    // success: consume otp and issue a short-lived resetToken
    consumeOtp(requestId);
    const resetToken = makeResetToken();
    createResetToken(resetToken, entry.email, 900); // 15 minutes

    return NextResponse.json({ success: true, resetToken, email: entry.email });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
