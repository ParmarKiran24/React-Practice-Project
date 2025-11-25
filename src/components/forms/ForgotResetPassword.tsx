"use client";
import React from "react";
import { Box, Stack, Input, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";

const ResetSchema = z.object({
  password: z.string().min(8, "At least 8 chars"),
  confirmPassword: z.string().min(8, "Confirm password"),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] });

type ResetForm = z.infer<typeof ResetSchema>;

export default function ForgotResetPassword() {
  const search = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const resetToken = search?.get("token") ?? "";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetForm>({ resolver: zodResolver(ResetSchema) });

  const submit = async (vals: ResetForm) => {
    if (!resetToken) {
      toast({ title: "Missing reset token", status: "error" });
      return;
    }
    try {
      const res = await fetch("/api/auth/forgot/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword: vals.password }),
      });
      const json = await res.json();
      if (!json?.success) {
        toast({ title: "Reset failed", description: json?.error ?? "Unknown", status: "error" });
        return;
      }
      toast({ title: "Password reset successful", status: "success" });
      router.push("/auth/signin");
    } catch (err: any) {
      toast({ title: "Network error", description: String(err?.message ?? err), status: "error" });
    }
  };

  return (
    <Box maxW="700px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>Set New Password</Text>

        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>New Password</FormLabel>
              <Input type="password" {...register("password")} placeholder="Enter new password" />
              <FormErrorMessage>{(errors.password as any)?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
              <FormErrorMessage>{(errors.confirmPassword as any)?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="brand" isLoading={isSubmitting}>Reset Password</Button>
          </Stack>
        </form>

        <Text fontSize="xs" color="gray.500">Design reference: <code>/mnt/data/Forgot Password- Reset Password.pdf</code></Text>
      </Stack>
    </Box>
  );
}
