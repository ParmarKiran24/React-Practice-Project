"use client";
import React from "react";
import {
  Box,
  Stack,
  Input,
  Button,
  Text,
  Link,
  Heading,
  HStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import mockData from "@/data/mockData.json";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "kp007@gmail.com",
      password: "test123",
    },
  });

  const submit = async (data: LoginFormType) => {
    try {
      // Demo credentials bypass - check against mockData.json
      const user = mockData.users.find(
        (u) => u.email === data.email && u.password === data.password
      );
      
      if (user) {
        // Store user data in localStorage for profile pages
        localStorage.setItem("mockUser", JSON.stringify(user));
        
        toast({ 
          title: "Login successful", 
          description: "Welcome back!",
          status: "success" 
        });
        router.push("/dashboard");
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!json?.success) {
        toast({
          title: "Login failed",
          description: json?.error ?? "Invalid credentials",
          status: "error",
        });
        return;
      }

      toast({ title: "Login successful", status: "success" });
      router.push("/dashboard");
    } catch (err: any) {
      toast({
        title: "Network error",
        description: String(err?.message ?? err),
        status: "error",
      });
    }
  };

  const designPdf = "/mnt/data/Login.pdf";

  return (
    <Box mx="auto" mt={{ base: 6, md: 12 }} px={{ base: 4, md: 0 }}>
      <Box
        maxW={{ base: "100%", md: "540px" }}
        mx="auto"
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
      >
        <Stack direction={{ base: "column", md: "column" }} spacing={0}>
          <Box p={{ base: 6, md: 10 }}>
            <Heading as="h1" size="lg" mb={2} textAlign="center">
              Welcome Back
            </Heading>
            <Text fontSize="sm" color="gray.600" textAlign="center" mb={6}>
              Sign in to continue to your dashboard
            </Text>

            <form onSubmit={handleSubmit(submit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="you@example.com"
                    {...register("email")}
                    size="lg"
                    borderRadius="md"
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    size="lg"
                    borderRadius="md"
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  isLoading={isSubmitting}
                  size="lg"
                  width="100%"
                  borderRadius="md"
                >
                  Login
                </Button>
              </Stack>
            </form>

            <HStack mt={4} justify="space-between">
              <Link href="/auth/forgot/options" color="brand.500" fontSize="sm">
                Forgot Password?
              </Link>
              <Text fontSize="sm">
                New user? {" "}
                <Link href="/auth/signup" color="brand.500">
                  Create an account
                </Link>
              </Text>
            </HStack>
          </Box>

          <Divider />

          <Box p={4} bg="gray.50" textAlign="center">
            <Text fontSize="xs" color="gray.500">
              Design reference: <code>{designPdf}</code>
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
