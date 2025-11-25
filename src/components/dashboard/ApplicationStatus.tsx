"use client";

import {
  Box,
  Stack,
  Text,
  Flex,
  Badge,
  Button,
  Divider,
  Link,
  Progress,
} from "@chakra-ui/react";

export default function ApplicationStatus({
  data,
  onEditSection,
}: {
  data: {
    applicationId: string;
    status: "pending" | "submitted" | "verified" | "approved" | "rejected";
    submittedAt?: string;
    verifiedAt?: string;
    approvedAt?: string;
    rejectedAt?: string;
    pdfUrl?: string;
    declarationUrl?: string;
  };
  onEditSection?: (section: string) => void;
}) {
  const statusColor: Record<typeof data.status, string> = {
    pending: "orange",
    submitted: "blue",
    verified: "purple",
    approved: "green",
    rejected: "red",
  };

  // fallback local file URLs (your infra will transform /mnt/data/... to served URLs)
  const pdfDownloadUrl = data.pdfUrl ?? "/mnt/data/Profile Summary.pdf";
  const declUrl = data.declarationUrl ?? "/mnt/data/Declartion.pdf";

  const progressVal =
    data.status === "pending"
      ? 25
      : data.status === "submitted"
      ? 50
      : data.status === "verified"
      ? 75
      : data.status === "approved"
      ? 100
      : 100;

  return (
    <Box maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight="700">
          Application Status
        </Text>

        {/* Status Card */}
        <Box
          p={5}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Text color="gray.700" fontSize="sm">
            Application ID
          </Text>
          <Text fontSize="xl" fontWeight="700">
            {data.applicationId}
          </Text>

          <Flex align="center" mt={4} gap={3}>
            <Text fontWeight={600}>Current Status:</Text>
            <Badge colorScheme={statusColor[data.status]} fontSize="0.9rem" px={3} py={1}>
              {data.status.toUpperCase()}
            </Badge>
          </Flex>

          <Box mt={5}>
            <Text fontSize="sm" color="gray.600" mb={2}>
              Progress
            </Text>
            <Progress
              value={progressVal}
              height="10px"
              colorScheme={statusColor[data.status]}
              borderRadius="md"
            />
          </Box>

          <Divider my={5} />

          <Stack gap={2}>
            <Flex justify="space-between">
              <Text color="gray.600">Application Submitted:</Text>
              <Text>{data.submittedAt ?? "—"}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text color="gray.600">Verified:</Text>
              <Text>{data.verifiedAt ?? "—"}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text color="gray.600">Approved:</Text>
              <Text>{data.approvedAt ?? "—"}</Text>
            </Flex>

            <Flex justify="space-between">
              <Text color="gray.600">Rejected:</Text>
              <Text>{data.rejectedAt ?? "—"}</Text>
            </Flex>
          </Stack>

          <Divider my={5} />

          <Stack gap={3}>
            <Text fontSize="sm" color="gray.600">
              Downloads
            </Text>

            <Flex gap={4}>
              <Button as={Link} href={pdfDownloadUrl} isExternal colorScheme="blue">
                Download Application PDF
              </Button>

              <Button as={Link} href={declUrl} isExternal colorScheme="purple" variant="outline">
                Declaration PDF
              </Button>
            </Flex>
          </Stack>

          {/* Edit button */}
          {data.status === "pending" || data.status === "rejected" ? (
            <Flex mt={6} justify="flex-end">
              <Button
                colorScheme="gray"
                onClick={() => onEditSection?.("personal")}
              >
                Edit Application
              </Button>
            </Flex>
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
}
