"use client";
import React from "react";
import NextImage from 'next/image';
import img from '../../assets/image 4.png';
import { Box, Flex, HStack, Button, Text, Link, Icon } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();

  return (
    <Box as="header" bg="white" w="100%">
      {/* Top Bar */}
      {/* Main Header */}
      <Box borderBottom="1px solid" borderColor="gray.200">
        <Flex
          maxW="1200px"
          mx="auto"
          py={4}
          px={2}
          align="center"
          justify="space-between"
        >
          <HStack gap={3} align="center">
            <Box w="60px" h="60px" overflow="hidden">
              <NextImage src={img} alt="University Logo" width={60} height={60} />
            </Box>
            <Box>
              <Text fontWeight={700} fontSize="lg" color="#5B21B6">
                MPKV Student Portal
              </Text>
            </Box>
          </HStack>

        <HStack gap={4}>
          {/* LOGIN BUTTON */}
          <Button
            variant="ghost"
           color="gray.600"
            _hover={{ bg: 'var(--brand-500)', color:"white", borderWidth: '2px' }}
            borderRadius="full"
            borderWidth="2px"
            borderColor="#gray.600"
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
    </Box>
  );
}
