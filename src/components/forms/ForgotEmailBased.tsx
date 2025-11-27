"use client";
import React, { useState } from "react";
import { Box, Stack, Input, Button, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function ForgotEmailBased({ onSent }: { onSent?: (email: string) => void }) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ email: string }>({ defaultValues: { email: "" }});
  const designPdf = "/mnt/data/Forgot Password- EMail Based.pdf";

  const submit = (vals: { email: string }) => {
    // mock: send link
    console.log("Reset link sent to", vals.email);
    onSent?.(vals.email);
    // show confirmation (stay here or route to a "check your email" page)
    router.push("/auth/forgot/email-based");
  };

  return (
    <Box maxW="700px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>Reset via Email Link</Text>

        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl>
              <FormLabel>Enter your account email</FormLabel>
              <Input {...register("email")} placeholder="you@example.com" />
            </FormControl>

            <Button type="submit" colorScheme="brand">Send Reset Link</Button>
          </Stack>
        </form>

        <Text fontSize="xs" color="gray.500">Design reference: <code>{designPdf}</code></Text>
      </Stack>
    </Box>
  );
}
