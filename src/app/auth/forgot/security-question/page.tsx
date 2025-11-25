"use client";
import React from "react";
import ForgotSecurityQuestion from "@/components/forms/ForgotSecurityQuestion";

export default function SecurityQPage() {
  return <ForgotSecurityQuestion question="What is your mother's maiden name?" onVerified={()=>console.log("sec ok")} />;
}
