"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import {
  Box,
  Stack,
  Grid,
  Input,
  Button,
  Text,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Create Account / Signup form
 * Design reference (local path will be transformed to a URL by your toolchain):
 *   /mnt/data/Create Account.pdf
 */

const SignupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Enter a valid email"),
    mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    acceptTnC: z.boolean().refine((v) => v === true, { message: "You must accept terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof SignupSchema>;

export default function SignupForm({ onSuccess }: { onSuccess?: (payload: any) => void }) {
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      acceptTnC: false,
    },
  });

  const submit = async (data: SignupForm) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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

      // Redirect to verify email page
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
    <Box maxW="700px" mx="auto" p={6} bg="white" borderRadius="md" boxShadow="sm">
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>
          Create an Account
        </Text>

        <Text fontSize="sm" color="gray.600">
          Fill the details below to create your account. Already have an account?{" "}
          <Link href="/auth/signin" color="brand.500">
            Sign in
          </Link>
        </Text>

        <Box as="form" onSubmit={handleSubmit(submit)}>
          <Stack gap={4}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>First Name *</FormLabel>
                <Input placeholder="First name" {...register("firstName")} />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Last name" {...register("lastName")} />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email *</FormLabel>
                <Input type="email" placeholder="you@example.com" {...register("email")} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.mobile}>
                <FormLabel>Mobile No *</FormLabel>
                <Input placeholder="10-digit mobile" {...register("mobile")} maxLength={10} />
                <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
              </FormControl>
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password *</FormLabel>
                <Input type="password" placeholder="Create password" {...register("password")} />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password *</FormLabel>
                <Input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              </FormControl>
            </Grid>

            <FormControl isInvalid={!!errors.acceptTnC}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" {...register("acceptTnC")} />
                I agree to the <Link href={designPdf} target="_blank" rel="noopener noreferrer" color="brand.500">Terms & Conditions</Link>
              </label>
              <FormErrorMessage>{(errors.acceptTnC as any)?.message}</FormErrorMessage>
            </FormControl>

            <Stack direction="row" justify="space-between" align="center" mt={2}>
              <Button variant="ghost" onClick={() => router.push("/")}>
                Cancel
              </Button>

              <Button colorScheme="brand" type="submit" loading={isSubmitting}>
                Create Account
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Text fontSize="xs" color="gray.500">
          Design reference: <code>{designPdf}</code>
        </Text>
      </Stack>
    </Box>
  );
}
