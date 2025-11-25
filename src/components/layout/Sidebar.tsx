"use client";
import React from "react";
import { Box, VStack, Text, Link } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Box
      w="250px"
      bg="white"
      h="100vh"
      borderRight="1px solid"
      borderColor="gray.200"
      p={6}
      position="sticky"
      top={0}
    >
      <Text fontSize="lg" fontWeight="700" mb={8}>
        Student Panel
      </Text>

      <VStack align="stretch" gap={4}>
        <Link href="/dashboard" fontWeight="600" color="brand.600">
          Dashboard
        </Link>
        <Link href="/profile/summary">Profile</Link>
        <Link href="/profile/personal">Application Form</Link>
        <Link href="/profile/documents">Upload Documents</Link>
        <Link href="/profile/payment">Payment</Link>
        <Link href="/profile/status">Application Status</Link>
        <Link href="/logout" color="red.500">
          Logout
        </Link>
      </VStack>
    </Box>
  );
}
