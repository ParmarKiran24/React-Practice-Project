"use client";
import React from "react";
import { Box, Container, Grid, Heading, Text, SimpleGrid, Icon, Stack } from "@chakra-ui/react";
import LandingHero from "@/components/landing/LandingHero";
import { FaUniversity, FaFileUpload, FaChartLine } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <Box bg="gray.50" minH="100vh" pb={12}>
      <Container maxW="container.lg" pt={12}>
        <LandingHero
          onGetStarted={() => router.push("/auth/signup")}
          onPrograms={() => router.push("/programmes")}
        />

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={10}>
          <Feature
            icon={<Icon as={FaUniversity} boxSize={6} />}
            title="Programs"
            desc="Explore courses and eligibility criteria."
          />
          <Feature
            icon={<Icon as={FaFileUpload} boxSize={6} />}
            title="Easy Uploads"
            desc="Upload documents securely with previews and validation."
          />
          <Feature
            icon={<Icon as={FaChartLine} boxSize={6} />}
            title="Track Status"
            desc="Monitor application progress from submission to approval."
          />
        </SimpleGrid>

        <Box mt={12} bg="white" p={6} borderRadius="md" boxShadow="sm">
          <Heading size="md" mb={3}>Why choose our portal?</Heading>
          <Text color="gray.600">
            The portal is built to reduce friction in admissions — guided forms, document checks, payment integration,
            and a single source of truth for each applicant.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) {
  return (
    <Stack gap={3} bg="white" p={6} borderRadius="md" boxShadow="sm" align="start">
      <Box>{icon}</Box>
      <Heading size="sm">{title}</Heading>
      <Text fontSize="sm" color="gray.600">{desc}</Text>
    </Stack>
  );
}
