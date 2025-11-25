"use client";
import React from "react";
import ForgotOptions from "@/components/forms/ForgotOptions";
import { useRouter } from "next/navigation";

export default function ForgotOptionsPage() {
  const router = useRouter();
  return (
    <ForgotOptions
      email="user@example.com"
      onSelect={(m) => {
        if (m === "email-otp") router.push("/auth/forgot/email-otp");
        else if (m === "email-link") router.push("/auth/forgot/email-based");
        else router.push("/auth/forgot/security-question");
      }}
    />
  );
}
