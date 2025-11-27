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
  FormLabel,
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



const SignupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    securityQuestion: z.string().min(1, "Select a security question"),
    securityAnswer: z.string().min(1, "Security answer is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof SignupSchema>;

export default function SignupForm({
  onSuccess,
}: {
  onSuccess?: (payload: any) => void;
}) {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      securityQuestion: "",
      securityAnswer: "",
    },
  });

  const submit = async (data: SignupForm) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!json?.success) {
        toast({
          title: "Signup failed",
          description: json?.error ?? "Unable to create account",
          status: "error",
        });
        return;
      }

      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
        status: "success",
      });
      router.push("/auth/verify-email");

      onSuccess?.(data);
    } catch (err: any) {
      toast({
        title: "Network error",
        description: String(err?.message ?? err),
        status: "error",
      });
    }
  };

  // Local PDF path for design reference (will be turned into a URL by your infra)
  const designPdf = "/mnt/data/Create Account.pdf";

  return (
    <Center minH="100vh"  py={8}>
      <Box
        w="full"
        maxW="520px"
        p={8}
        borderRadius="12px"
      >
        <Stack gap={6}>
         

          <Center>
            <Image src="/logo.png" alt="logo" boxSize="64px" objectFit="contain" />
          </Center>

          <Text fontSize="20px" fontWeight={600} textAlign="center" lineHeight={1.5}>
            Vasantrao Naik Marathwada Krishi Vidyapeeth,
            <br />
            Parbhani - 431 402 (Maharashtra)
          </Text>

          <Box as="form" width="100%" onSubmit={handleSubmit(submit)}>
            <Stack gap={4}>
              <FormControl isInvalid={!!errors.fullName}>
               
                <Input
                  placeholder="Full Name"
                  borderRadius="25px"
                  {...register("fullName")}
                />
                <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
               
                <Input
                  type="email"
                  placeholder="you@example.com"
                  borderRadius="25px"
                  {...register("email")}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
               
                <Box position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
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

              <FormControl isInvalid={!!errors.confirmPassword}>
               
                <Box position="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    borderRadius="25px"
                    pr="40px"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
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
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </Box>
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.securityQuestion}>
            
                <select
                  {...register("securityQuestion")}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    borderRadius: "25px",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Select question</option>
                  <option value="mother_maiden">What is your mother's maiden name?</option>
                  <option value="first_pet">What was your first pet's name?</option>
                  <option value="first_school">What is the name of your first school?</option>
                </select>
                <FormErrorMessage>{errors.securityQuestion?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.securityAnswer}>
              
                <Input
                  placeholder="Security Answer"
                  borderRadius="25px"
                  {...register("securityAnswer")}
                />
                <FormErrorMessage>{errors.securityAnswer?.message}</FormErrorMessage>
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
                Verify Email
              </Button>

              <Center>
                <Text fontSize="sm">
                  Already Have an Account?{' '}
                  <Link href="/auth/signin" color="red.500" fontWeight={600}>
                    Log In
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
