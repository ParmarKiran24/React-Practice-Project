"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import {
  Box,
  Stack,
  Input,
  Button,
  Text,
  Link,
  Center,
  HStack,
  Image,
} from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2-8.83" />
  </svg>
);

const VerifyEmailSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  captcha: z.string().min(1, "Captcha is required"),
});

type VerifyEmailForm = z.infer<typeof VerifyEmailSchema>;

export default function VerifyEmail({
  email: initialEmail,
}: {
  email?: string;
} = {}) {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailForm>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email: initialEmail || "",
      password: "",
      captcha: "",
    },
  });

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const submit = async (data: VerifyEmailForm) => {
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json?.success) {
        toast({
          title: "Verification failed",
          description: json?.error ?? "Email verification failed",
          status: "error",
        });
        return;
      }

      toast({
        title: "Email verified successfully!",
        status: "success",
      });

      router.push("/dashboard");
    } catch (err: any) {
      toast({
        title: "Network error",
        description: String(err?.message ?? err),
        status: "error",
      });
    }
  };

  return (
    <Center minH="100vh" bg="gray.50" py={8}>
      <Box
        w="full"
        maxW="520px"
        p={8}
        bg="white"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      >
        <Stack gap={6}>
          <HStack width="100%" mb={2}>
            <Link href="/" _hover={{ textDecoration: "none" }}>
              <HStack gap={2} color="gray.600" fontSize="sm">
                <Box as="span" display="flex" alignItems="center">
                  <BackArrowIcon />
                </Box>
                <Text>Back to Home Page</Text>
              </HStack>
            </Link>
          </HStack>

          <Center>
            <Image src="/logo.png" alt="logo" boxSize="64px" objectFit="contain" />
          </Center>

          <Text fontSize="16px" fontWeight={700} textAlign="center" lineHeight={1.5}>
            Vasantrao Naik Marathwada Krishi Vidyapeeth,
            <br />
            Parbhani - 431 402 (Maharashtra)
          </Text>

          <Box as="form" width="100%" onSubmit={handleSubmit(submit)}>
            <Stack gap={4}>
              <FormControl isInvalid={!!errors.email}>
                <Input
                  type="email"
                  placeholder="Email Address *"
                  borderRadius="25px"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <Box position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password *"
                    borderRadius="25px"
                    pr="40px"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                      padding: 0,
                    }}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </Box>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.captcha}>
                <HStack gap={4}>
                  <Box
                    bg="gray.100"
                    p={2}
                    borderRadius="6px"
                    flex="0 0 auto"
                    minW="120px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="18px"
                    fontWeight={700}
                    color="gray.700"
                    fontFamily="monospace"
                  >
                    {captcha}
                  </Box>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "#2d7d5f",
                      fontSize: "14px",
                      fontWeight: 500,
                      padding: 0,
                    }}
                  >
                    <RefreshIcon />
                    Refresh Captcha
                  </button>
                </HStack>
              </FormControl>

              <FormControl isInvalid={!!errors.captcha}>
                <Input
                  placeholder="Enter Captcha *"
                  borderRadius="25px"
                  {...register("captcha")}
                />
                <FormErrorMessage>{errors.captcha?.message}</FormErrorMessage>
              </FormControl>

              <Button
                borderRadius="full"
                bgColor="green.700"
                color="white"
                _hover={{ bg: "green.800" }}
                type="submit"
                width="100%"
                loading={isSubmitting}
                height="48px"
              >
                Log In
              </Button>

              <Center>
                <Link href="/auth/forgot" color="gray.600" fontSize="sm">
                  Forgot Password?
                </Link>
              </Center>

              <Center>
                <Text fontSize="sm">
                  Don't have an Account?{' '}
                  <Link href="/auth/signup" color="red.500" fontWeight={600}>
                    Register Here
                  </Link>
                </Text>
              </Center>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
}

function generateCaptcha(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
