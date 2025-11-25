"use client";
import React from "react";
import ForgotResetPassword from "@/components/forms/ForgotResetPassword";

export default function ResetPage() {
  return <ForgotResetPassword onReset={() => console.log("password reset (demo)")} />;
}
