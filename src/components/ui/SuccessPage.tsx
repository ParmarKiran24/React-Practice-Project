"use client";

import React from "react";
import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  HStack,
  Link,
  Image,
} from "@chakra-ui/react";

/**
 * SuccessPage component
 * - Shows confirmation after final submit
 * - Links to important docs (we use local path which your infra will convert to a URL)
 *
 * Local file paths (will be converted to real URLs by your toolchain):
 *  - Declaration PDF: /mnt/data/Declartion.pdf
 *  - Profile Summary PDF (design reference): /mnt/data/Profile Summary.pdf
 *
 * Replace `onGoToDashboard` and `onViewProfile` handlers with real router pushes.
 */

export default function SuccessPage({
  applicationId,
  onGoToDashboard,
  onViewProfile,
  downloadUrl,
}: {
  applicationId?: string;
  onGoToDashboard?: () => void;
  onViewProfile?: () => void;
  downloadUrl?: string; // optional URL (S3 / generated PDF); fallback to local declaration PDF if not provided
}) {
  // local path (developer toolchain will convert to URL)
  const declarationPdfLocal = "/mnt/data/Declartion.pdf";
  const profileDesignPdfLocal = "/mnt/data/Profile Summary.pdf";

  const finalDownloadUrl = downloadUrl ?? declarationPdfLocal;

  return (
    <Box maxW="900px" mx="auto" p={6}>
      <VStack gap={6} align="stretch" bg="white" p={8} borderRadius="md" boxShadow="sm">
        <HStack gap={4}>
          <Box fontSize="40px" color="green.500">✓</Box>
          <Heading size="lg">Application Submitted Successfully</Heading>
        </HStack>

        <Text color="gray.700" fontSize="md">
          Thank you — your application has been submitted. Application ID:{" "}
          <Text as="span" fontWeight={700}>{applicationId ?? "APPL-XXXXX"}</Text>
        </Text>

        <Text color="gray.600">
          We have received your data and documents. You will be able to download or print your
          submitted application from below. If you need to make any changes, you can edit your profile.
        </Text>

        <HStack gap={3}>
          <Button colorScheme="brand" onClick={() => onViewProfile?.()}>
            View Profile Summary
          </Button>

          <Button variant="outline" onClick={() => onGoToDashboard?.()}>
            Go to Dashboard
          </Button>

          <Button
            onClick={() => {
              // open download URL in new tab — the local path will be converted by your infra
              window.open(finalDownloadUrl, "_blank");
            }}
          >
            <Box as="span" mr={2}>⬇</Box>
            Download Application (PDF)
          </Button>
        </HStack>

        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Helpful Documents
          </Text>

          <HStack gap={4}>
            <Link href={declarationPdfLocal} target="_blank" rel="noopener noreferrer" color="brand.500">
              Declaration PDF
            </Link>

            <Link href={profileDesignPdfLocal} target="_blank" rel="noopener noreferrer" color="brand.500">
              Profile Summary (design)
            </Link>
          </HStack>
        </Box>

        <Box>
          <Text fontSize="sm" color="gray.500">
            Note: These links point to local files you uploaded during development. Your deployment
            pipeline will transform <code>/mnt/data/...</code> paths into publicly accessible URLs.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
