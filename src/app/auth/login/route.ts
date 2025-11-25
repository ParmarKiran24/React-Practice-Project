// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/mockUserStore";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toString().trim();
    const password = (body?.password || "").toString();

    if (!email || !password)
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });

    const user = findUserByEmail(email);
    if (!user)
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 });

    if (!user.verified)
      return NextResponse.json({ success: false, error: "Email not verified" }, { status: 403 });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
