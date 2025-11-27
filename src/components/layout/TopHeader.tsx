"use client";
import React from "react";
import { Flex, Text, Box, Spacer } from "@chakra-ui/react";

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

      <Box
        as="div"
        w="36px"
        h="36px"
        borderRadius="full"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight={600}
      >
        S
      </Box>
    </Flex>
  );
}
