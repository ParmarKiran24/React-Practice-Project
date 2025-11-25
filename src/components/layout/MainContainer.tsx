"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * MainContainer now accepts children so page content is rendered inside it.
 * This is required for Next.js app-router layout to show the current page.
 */
export default function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      {/* Page content injected here */}
      <Box maxW="1100px" mx="auto" p={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
