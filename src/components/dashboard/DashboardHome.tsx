"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, Text, Flex, Center, Button, Stack } from "@chakra-ui/react";

export default function DashboardHome() {
  const router = useRouter();

  const handleStartApplication = () => {
    router.push("/profile/personal");
  };

  const handleViewStatus = () => {
    router.push("/profile/status");
  };

  const handleViewProgrammes = () => {
    router.push("/programmes");
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="700" mb={6}>
        Welcome Back 👋
      </Text>

      {/* Quick Actions */}
      <Stack direction={{ base: "column", md: "row" }} gap={4} mb={8}>
        <Button
          colorScheme="brand"
          size="lg"
          onClick={handleStartApplication}
          flex={1}
        >
          Start New Application
        </Button>
        <Button
          variant="outline"
          colorScheme="brand"
          size="lg"
          onClick={handleViewStatus}
          flex={1}
        >
          View Application Status
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleViewProgrammes}
          flex={1}
        >
          Browse Programmes
        </Button>
      </Stack>

      {/* Widgets Row */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <DashboardCard title="Profile Completion" value="80%" />
        <DashboardCard title="Application Status" value="Submitted" />
        <DashboardCard title="Notifications" value="3 New" />
      </Grid>

      {/* Section 2 */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mt={10}>
        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Recent Activity
          </Text>
          <Text fontSize="sm" color="gray.600">No recent activity.</Text>
        </Box>

        <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Important Links
          </Text>
          <Text color="brand.500">• Download Prospectus</Text>
          <Text color="brand.500">• Support</Text>
        </Box>
      </Grid>
    </Box>
  );
}

function DashboardCard({ title, value }: any) {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="md"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <Text fontSize="md" color="gray.600">
        {title}
      </Text>
      <Text fontSize="2xl" fontWeight="700" mt={2}>
        {value}
      </Text>
    </Box>
  );
}
