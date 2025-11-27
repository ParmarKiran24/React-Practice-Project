"use client";
import React, { useState, useRef } from "react";
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
  VStack,
  SimpleGrid,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast({ title: "Enter complete OTP", status: "error" });
      return;
    }
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: modalEmail, otp: code }),
      });
      const json = await res.json();
      if (!json?.success) {
        toast({ title: "Invalid OTP", description: json?.error ?? "OTP verification failed", status: "error" });
        return;
      }
      toast({ title: "Email verified", status: "success" });
      setIsModalOpen(false);
      router.push("/auth/verify-email");
    } catch (err: any) {
      toast({ title: "Network error", description: String(err?.message ?? err), status: "error" });
    }
  };

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
      // open OTP modal and show masked email
      setModalEmail(data.email);
      setIsModalOpen(true);

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

  const maskEmail = (email: string) => {
    if (!email) return "";
    const parts = email.split("@");
    const name = parts[0];
    const domain = parts[1] ?? "";
    if (name.length <= 2) return `**@${domain}`;
    return `${name[0]}${"*".repeat(Math.max(1, name.length - 2))}${name.slice(-1)}@${domain}`;
  };

  return (
    <>
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
                onClick={() => setIsModalOpen(true)}
                height="48px"
              >
                Verify Email
              </Button>


              <Button
                borderRadius="full"
                bgColor="green.700"
               
                onClick={() => setIsModalOpen(true)}
                height="48px"
              >
                open popup
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

    {isModalOpen && (
      <Box position="fixed" inset={0} bg="blackAlpha.600" zIndex={1400} display="flex" alignItems="center" justifyContent="center">
        <Box bg="white" borderRadius="12px" p={8} maxW="760px" mx={4}>
          <Stack gap={4}  maxWidth={'550px'}>
            <Text fontSize="lg" fontWeight={600} textAlign="center">Two Step Authentication</Text>
            <Text textAlign="center" color="gray.600" fontSize="sm">
             A One-Time Password (OTP) has been sent to your registered email address: ****me@gmail.com. 
            </Text>
            <Text textAlign="center" fontWeight={600}>{maskEmail(modalEmail)}</Text>
            <Text textAlign="center" color="gray.600" fontSize="sm">
             Please enter the 6-digit OTP below to complete the verification.
            </Text>

            <SimpleGrid columns={7} gap={4} justifyItems="center" mt={4}>
              {/* first three inputs */}
              <Input
                value={otp[0]}
                onChange={(e) => handleOtpChange(e, 0)}
                onKeyDown={(e) => handleOtpKeyDown(e, 0)}
                ref={(el) => { inputRefs.current[0] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />
              <Input
                value={otp[1]}
                onChange={(e) => handleOtpChange(e, 1)}
                onKeyDown={(e) => handleOtpKeyDown(e, 1)}
                ref={(el) => { inputRefs.current[1] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />
              <Input
                value={otp[2]}
                onChange={(e) => handleOtpChange(e, 2)}
                onKeyDown={(e) => handleOtpKeyDown(e, 2)}
                ref={(el) => { inputRefs.current[2] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />

              {/* center separator */}
              <Box display="flex" alignItems="center" justifyContent="center" color="gray.300" fontSize="20px">—</Box>

              {/* last three inputs */}
              <Input
                value={otp[3]}
                onChange={(e) => handleOtpChange(e, 3)}
                onKeyDown={(e) => handleOtpKeyDown(e, 3)}
                ref={(el) => { inputRefs.current[3] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />
              <Input
                value={otp[4]}
                onChange={(e) => handleOtpChange(e, 4)}
                onKeyDown={(e) => handleOtpKeyDown(e, 4)}
                ref={(el) => { inputRefs.current[4] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />
              <Input
                value={otp[5]}
                onChange={(e) => handleOtpChange(e, 5)}
                onKeyDown={(e) => handleOtpKeyDown(e, 5)}
                ref={(el) => { inputRefs.current[5] = el! }}
                maxLength={1}
                textAlign="center"
                width="56px"
                height="56px"
                borderRadius="10px"
              />
            </SimpleGrid>

            <HStack justifyContent="space-between" pt={6}>
              <Button variant="outline" borderRadius="25px" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button bgColor="green.700" color="white" _hover={{ bg: "green.800" }} borderRadius="25px" onClick={verifyOtp}>Verify Email</Button>
            </HStack>
          </Stack>
        </Box>
      </Box>
    )}
    </>
  );
}
