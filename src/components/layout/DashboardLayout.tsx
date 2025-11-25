"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" bg="gray.50">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right content section */}
      <Flex direction="column" flex={1}>
        {/* Top header */}
        <TopHeader />

        {/* Page content */}
        <Box p={6}>{children}</Box>
      </Flex>
    </Flex>
  );
}
