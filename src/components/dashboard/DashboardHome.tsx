"use client";
import React from "react";
import { Box, Grid, Text, Flex, Center } from "@chakra-ui/react";

export default function DashboardHome() {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="700" mb={6}>
        Welcome Back 👋
      </Text>

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
