"use client";
import React from "react";
import { Box, Heading, Text, Stack, Button, Image } from "@chakra-ui/react";

export default function LandingHero({
  onGetStarted,
  onPrograms,
}: {
  onGetStarted?: () => void;
  onPrograms?: () => void;
}) {
  // local design PDF path (your infra will convert to a URL)
  const designPdf = "/mnt/data/Landing Page.pdf";

  return (
    <Box bg="white" borderRadius="md" p={{ base: 6, md: 12 }} boxShadow="sm">
      <Stack direction={{ base: "column", md: "row" }} gap={8} align="center">
        <Box flex="1">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to the Admission Portal
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Complete your application, upload documents, and track your status — all in one place.
            Built for students and administrators with a clean, accessible UI.
          </Text>

          <Stack direction={{ base: "column", sm: "row" }} gap={3}>
            <Button colorScheme="brand" onClick={onGetStarted}>
              Get Started
            </Button>
            <Button variant="outline" onClick={onPrograms}>
              View Programmes
            </Button>
            <Button as="a" href={designPdf} target="_blank" rel="noopener noreferrer" variant="ghost">
              View Design (PDF)
            </Button>
          </Stack>
        </Box>

        <Box flex="1" textAlign="center">
          {/* Placeholder image — replace with your hero asset from /public */}
          <Image
            src="/hero-placeholder.png"
            alt="Landing hero"
            maxW={{ base: "80%", md: "100%" }}
            mx="auto"
            fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23EDF2F7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='20'%3EHero Image%3C/text%3E%3C/svg%3E"
          />
        </Box>
      </Stack>
    </Box>
  );
}
