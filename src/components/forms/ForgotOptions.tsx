"use client";
import React from "react";
import { Box, Stack, Button, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ForgotOptions({
  email,
  onSelect,
}: {
  email?: string;
  onSelect?: (method: "email-otp" | "email-link" | "security") => void;
}) {
  const router = useRouter();
  const designPdf = "/mnt/data/Forget Password_ Select Options.pdf";

  const handleSelect = (method: "email-otp" | "email-link" | "security") => {
    if (onSelect) {
      onSelect(method);
    } else {
      // Default navigation
      if (method === "email-otp") {
        router.push("/auth/forgot/email-otp");
      } else if (method === "email-link") {
        router.push("/auth/forgot/email-based");
      } else {
        router.push("/auth/forgot/security-question");
      }
    }
  };

  return (
    <Box maxW="700px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>Forgot Password</Text>
        <Text color="gray.600">
          Choose how you'd like to reset your password for <strong>{email ?? "your account"}</strong>.
        </Text>

        <VStack gap={3} align="stretch">
          <Button onClick={() => handleSelect("email-otp")}>Reset via Email OTP</Button>
          <Button onClick={() => handleSelect("email-link")}>Send Reset Link to Email</Button>
          <Button onClick={() => handleSelect("security")}>Answer Security Questions</Button>
        </VStack>

        <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
          Back to Login
        </Button>

        <Text fontSize="xs" color="gray.500">
          Design reference: <code>{designPdf}</code>
        </Text>
      </Stack>
    </Box>
  );
}
