"use client";
import React from "react";
import { Box, Stack,Input, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
export default function ForgotSecurityQuestion({
  question = "What is your pet's name?",
  onVerified,
}: {
  question?: string;
  onVerified?: () => void;
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ answer: string }>({ defaultValues: { answer: "" }});
  const designPdf = "/mnt/data/Forgot Password- Security Question.pdf";

  const submit = (vals: { answer: string }) => {
    // mock verify: accept anything non-empty
    if (!vals.answer) {
      alert("Please enter an answer (demo).");
      return;
    }
    console.log("Security answer:", vals.answer);
    onVerified?.();
    router.push("/auth/forgot/reset");
  };

  return (
    <Box maxW="700px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>Answer Security Question</Text>

        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Text fontWeight={600}>{question}</Text>
            </FormControl>

            <FormControl>
              <FormLabel>Your Answer</FormLabel>
              <Input {...register("answer")} placeholder="Answer" />
            </FormControl>

            <Button type="submit" colorScheme="brand">Verify Answer</Button>
          </Stack>
        </form>

        <Text fontSize="xs" color="gray.500">Design reference: <code>{designPdf}</code></Text>
      </Stack>
    </Box>
  );
}
