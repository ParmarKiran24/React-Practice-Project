"use client";

import VerifyEmail from "@/components/forms/VerifyEmail";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const email = "student@mail.com"; // replace with actual email from signup

  return (
    <VerifyEmail
      email={email}
      onVerify={(otp) => {
        console.log("OTP Verified:", otp);
        // On success → redirect to Sign-in or Dashboard
        router.push("/auth/signin");
      }}
      onResend={() => {
        console.log("Resend OTP triggered");
      }}
    />
  );
}
