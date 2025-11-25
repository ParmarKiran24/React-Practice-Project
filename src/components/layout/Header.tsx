"use client";
import React from "react";
import NextImage from 'next/image';
import img from '../../assets/image 4.png';
import { Box, Flex, HStack, Button, Text } from '@chakra-ui/react';
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <Box as="header" bg="white" boxShadow="sm" w="100%">
      <Flex
        maxW="1100px"
        mx="auto"
        py={4}
        px={2}
        align="center"
        justify="space-between"
      >
        <HStack gap={3} align="center">
          <Box w="50px" h="45px" borderRadius="8px" overflow="hidden">
            <NextImage src={img} alt="header-logo" width={50} height={45} />
          </Box>
          <Text fontWeight={700}>MPKV Student Portal</Text>
        </HStack>

        <HStack gap={4}>
          {/* LOGIN BUTTON */}
          <Button
            variant="ghost"
            color="gray.600"
            borderRadius="full"
            px={6}
            onClick={() => router.push("/auth/signin")}
          >
            Login
          </Button>

          {/* REGISTER BUTTON */}
          <Button
            bg="var(--brand-500)"
            color="white"
            _hover={{ bg: 'var(--brand-700)' }}
            borderRadius="full"
            px={6}
            onClick={() => router.push("/auth/signup")}
          >
            Register
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
