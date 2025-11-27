"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";

export default function SigninPage() {
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      router.push("/dashboard");
    }
  }, [router]);

  return <LoginForm />;
}
