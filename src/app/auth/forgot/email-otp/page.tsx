"use client";
import React from "react";
import ForgotEmailOtp from "@/components/forms/ForgotEmailOtp";

export default function EmailOtpPage() {
  return <ForgotEmailOtp defaultEmail="user@example.com" onSend={(e)=>console.log("send otp to", e)} onVerified={(e)=>console.log("verified", e)} />;
}
