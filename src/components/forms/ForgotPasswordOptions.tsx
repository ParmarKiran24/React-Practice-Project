"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Stack,
  Button,
  Text,
  Link,
  Center,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

const BackArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function ForgotPasswordOptions() {
  const router = useRouter();

  return (
    <Center minH="100vh" bg="gray.50" py={8} px={4}>
      <Box
        w="full"
        maxW="520px"
        p={8}
        bg="white"
        borderRadius="12px"
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
      >
        <Stack gap={6}>
          {/* Back Button */}
          <HStack width="100%" mb={2}>
            <Link href="/auth/signin" _hover={{ textDecoration: "none" }}>
              <HStack gap={2} color="green.700" fontSize="sm" fontWeight={500}>
                <Box as="span" display="flex" alignItems="center">
                  <BackArrowIcon />
                </Box>
                <Text>Back to Login Page</Text>
              </HStack>
            </Link>
          </HStack>

          {/* Logo */}
          <Center>
            <Image src="/logo.png" alt="logo" boxSize="64px" objectFit="contain" />
          </Center>

          {/* Header Text */}
          <Text fontSize="16px" fontWeight={700} textAlign="center" lineHeight={1.5}>
            Vasantrao Naik Marathwada Krishi Vidyapeeth,
            <br />
            Parbhani - 431 402 (Maharashtra)
          </Text>

          {/* Main Content */}
          <VStack gap={4}>
            {/* Title */}
            <Text fontSize="20px" fontWeight={600} textAlign="center" color="gray.800">
              Forgot your Password?
            </Text>

            {/* Subtitle */}
            <Text fontSize="14px" textAlign="center" color="gray.600" lineHeight={1.6}>
              Select how you'd like to reset your password: receive an OTP on your registered email or answer your security question.
            </Text>

            {/* Options Buttons */}
            <VStack w="full" gap={3} pt={2}>
              {/* Email OTP Option */}
              <Button
                w="full"
                h="56px"
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="gray.800"
                border="2px solid #e0e0e0"
                borderRadius="25px"
                _hover={{
                  bg: "gray.50",
                  borderColor: "green.700",
                }}
                onClick={() => router.push("/auth/forgot/email-otp")}
              >
                <HStack w="full" justifyContent="space-between">
                  <Text>Verify with Email OTP</Text>
                  <Box display="flex" alignItems="center">
                    <ArrowRightIcon />
                  </Box>
                </HStack>
              </Button>

              {/* Security Question Option */}
              <Button
                w="full"
                h="56px"
                fontSize="16px"
                fontWeight={500}
                bg="white"
                color="gray.800"
                border="2px solid #e0e0e0"
                borderRadius="25px"
                _hover={{
                  bg: "gray.50",
                  borderColor: "green.700",
                }}
                onClick={() => router.push("/auth/forgot/security-question")}
              >
                <HStack w="full" justifyContent="space-between">
                  <Text>Verify with Security Question</Text>
                  <Box display="flex" alignItems="center">
                    <ArrowRightIcon />
                  </Box>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Box>
    </Center>
  );
}
