"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Text,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";


import { useForm } from "react-hook-form";

/**
 * Verify Email Page
 * Design reference: /mnt/data/Verify Email.pdf
 * (Your toolchain will convert this local path to a served URL)
 */

type VerifyForm = {
  otp: string;
};

export default function VerifyEmail({
  email,
  onVerify,
  onResend,
}: {
  email: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyForm>({
    defaultValues: { otp: "" },
  });

  const [timer, setTimer] = useState(60);
  const designPdf = "/mnt/data/Verify Email.pdf";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const submit = (data: VerifyForm) => {
    console.log("Verify OTP:", data.otp);
    onVerify?.(data.otp);
  };

  return (
    <Box maxW="500px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700} textAlign="center">
          Verify Your Email
        </Text>

        <Text fontSize="md" textAlign="center" color="gray.600">
          We have sent a 6-digit verification code to
        </Text>

        <Text textAlign="center" fontWeight={700}>
          {email}
        </Text>

        <form onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.otp}>
              <FormLabel>Enter OTP *</FormLabel>

              <HStack justify="center">
                <PinInput
                  otp
                  onChange={(v) => setValue("otp", v)}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>

              <FormErrorMessage>{errors.otp?.message}</FormErrorMessage>
            </FormControl>

            <Stack gap={4} align="center">
              <Text fontSize="sm" color="gray.600">
                Didn’t receive the code?
              </Text>

              {timer > 0 ? (
                <Text fontSize="sm" color="gray.500">
                  Resend available in {timer}s
                </Text>
              ) : (
                <Button variant="ghost" colorScheme="blue" onClick={() => { setTimer(60); onResend?.(); }}>
                  Resend OTP
                </Button>
              )}
            </Stack>

            <Button
              type="submit"
              colorScheme="brand"
              width="100%"
              isLoading={isSubmitting}
            >
              Verify Email
            </Button>
          </Stack>
        </form>

        <Text textAlign="center" fontSize="xs" color="gray.500">
          Design file: <code>{designPdf}</code>
        </Text>
      </Stack>
    </Box>
  );
}
