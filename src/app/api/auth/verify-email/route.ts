// src/app/api/auth/verify-email/route.ts
import { NextResponse } from "next/server";
import { verifyUserByToken } from "@/lib/mockUserStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = (body?.token || "").toString();
    if (!token) {
      return NextResponse.json({ success: false, error: "token required" }, { status: 400 });
    }

    const user = verifyUserByToken(token);
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
    }

    return NextResponse.json({ success: true, email: user.email });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
