// src/app/api/auth/forgot/reset/route.ts
import { NextResponse } from "next/server";
import { getResetToken, consumeResetToken } from "@/lib/mockAuthStore";
// optional: import bcrypt to hash password if you want to store here (we only mock)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const resetToken = (body?.resetToken || "").toString();
    const newPassword = (body?.newPassword || "").toString();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ success: false, error: "resetToken and newPassword are required" }, { status: 400 });
    }

    const tokenEntry = getResetToken(resetToken);
    if (!tokenEntry) {
      return NextResponse.json({ success: false, error: "Invalid or expired reset token" }, { status: 400 });
    }

    // In production: look up user by tokenEntry.email and update password (hash with bcrypt)
    // Example (pseudo):
    // const hashed = await bcrypt.hash(newPassword, 10);
    // await db.users.update({ where: { email: tokenEntry.email }, data: { password: hashed } });

    // consume token after use
    consumeResetToken(resetToken);

    console.info(`[DEV-RESET] password reset for ${tokenEntry.email} (mock).`);

    return NextResponse.json({ success: true, email: tokenEntry.email });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}

// const resetRes = await fetch("/api/auth/forgot/reset", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ resetToken, newPassword }),
// });
// const resetJson = await resetRes.json();
