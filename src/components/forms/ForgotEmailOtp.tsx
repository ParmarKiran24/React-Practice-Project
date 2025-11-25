"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack, Input, Button, Text, HStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useToast } from "@chakra-ui/toast";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormVals = { email: string; otp: string };

export default function ForgotEmailOtp({
  defaultEmail,
}: {
  defaultEmail?: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormVals>({
    defaultValues: { email: defaultEmail ?? "", otp: "" },
  });

  const [requestId, setRequestId] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let t: any;
    if (timer > 0) t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  async function sendOtp(email?: string) {
    const e =
      email ??
      (document.querySelector('input[name="email"]') as HTMLInputElement)
        ?.value;
    if (!e) {
      toast({ title: "Enter email", status: "warning" });
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e }),
      });
      const json = await res.json();
      if (!json?.success) {
        toast({
          title: "Failed to send OTP",
          description: json?.error || "Unknown",
          status: "error",
        });
        return;
      }
      setRequestId(json.requestId);
      setTimer(60);
      setSent(true);
      toast({
        title: "OTP sent",
        description: `A code was sent to ${e}`,
        status: "success",
      });
    } catch (err: any) {
      toast({
        title: "Network error",
        description: String(err?.message ?? err),
        status: "error",
      });
    }
  }

  async function submitOtp(vals: FormVals) {
    if (!requestId) {
      toast({
        title: "No OTP request found",
        status: "error",
        description: "Please send OTP first",
      });
      return;
    }
    if (!vals.otp || vals.otp.length !== 6) {
      toast({ title: "Enter a valid 6-digit OTP", status: "warning" });
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, otp: vals.otp }),
      });
      const json = await res.json();
      if (!json?.success) {
        toast({
          title: "Verification failed",
          description: json?.error ?? "Invalid OTP",
          status: "error",
        });
        return;
      }
      // json.resetToken and json.email
      toast({ title: "OTP verified", status: "success" });
      // navigate to reset page passing resetToken securely as state — but to keep it simple we pass in query
      router.push(
        `/auth/forgot/reset?token=${encodeURIComponent(json.resetToken)}`
      );
    } catch (err: any) {
      toast({
        title: "Network error",
        description: String(err?.message ?? err),
        status: "error",
      });
    }
  }

  return (
    <Box
      maxW="700px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
    >
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>
          Reset via Email OTP
        </Text>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitOtp({
              email:
                (
                  document.querySelector(
                    'input[name="email"]'
                  ) as HTMLInputElement
                )?.value || "",
              otp:
                (
                  document.querySelector(
                    'input[name="otp"]'
                  ) as HTMLInputElement
                )?.value || "",
            });
          }}
        >
          <Stack gap={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                placeholder="you@example.com"
                defaultValue={defaultEmail}
              />
            </FormControl>

            <HStack gap={3}>
              <Button onClick={() => sendOtp()}>Send OTP</Button>
              <Text color="gray.600">
                {sent ? `Resend in ${timer}s` : "No OTP sent yet"}
              </Text>
            </HStack>

            <FormControl isInvalid={!!errors.otp}>
              <FormLabel>Enter OTP</FormLabel>
              <HStack justify="center">
                <PinInput otp onChange={(v) => setValue("otp", v)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <FormErrorMessage>
                {(errors.otp as any)?.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="button"
              colorScheme="brand"
              onClick={handleSubmit(submitOtp)}
            >
              Verify OTP
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
