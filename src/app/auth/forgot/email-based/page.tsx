"use client";
import React from "react";
import ForgotEmailBased from "@/components/forms/ForgotEmailBased";

export default function EmailBasedPage() {
  return <ForgotEmailBased onSent={(e)=>console.log("link sent to", e)} />;
}
