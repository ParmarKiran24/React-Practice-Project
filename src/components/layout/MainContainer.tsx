"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import BackButton from "../ui/BackButton";

/**
 * MainContainer now accepts children so page content is rendered inside it.
 * This is required for Next.js app-router layout to show the current page.
 * Header/Footer only shown on public pages, Back button on auth/profile pages
 */
export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes where we show header and footer
  const publicRoutes = ["/", "/landing", "/programmes", "/news"];
  const showHeaderFooter = publicRoutes.includes(pathname);

  // Routes where we show back button instead
  const authRoutes = pathname.startsWith("/auth") || pathname.startsWith("/profile") || pathname.startsWith("/dashboard");

  return (
    <Box bg="gray.50" minH="100vh">
      {showHeaderFooter && <Header />}
      
      <Box maxW="1100px" mx="auto" p={4}>
        {authRoutes && !showHeaderFooter && (
          <Box mb={4}>
            <BackButton />
          </Box>
        )}
        {children}
      </Box>
      
      {showHeaderFooter && <Footer />}
    </Box>
  );
}
