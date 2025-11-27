"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Box } from "@chakra-ui/react";

interface BackButtonProps {
  label?: string;
  fallbackPath?: string;
}

export default function BackButton({ 
  label = "Back", 
  fallbackPath = "/" 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Try to go back in browser history
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to home or specified path if no history
      router.push(fallbackPath);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      size="md"
      px={4}
    >
      <Box as="span" display="inline-flex" mr={2}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>
      {label}
    </Button>
  );
}
