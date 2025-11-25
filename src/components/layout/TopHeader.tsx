"use client";
import React from "react";
import { Flex, Text, Avatar, Spacer } from "@chakra-ui/react";

export default function TopHeader() {
  return (
    <Flex
      bg="white"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      align="center"
    >
      <Text fontSize="xl" fontWeight="600">
        Dashboard
      </Text>

      <Spacer />

      <Avatar name="Student" size="sm" />
    </Flex>
  );
}
