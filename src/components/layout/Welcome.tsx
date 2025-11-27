"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import img from "../../assets/image 2.png";
import i1 from "../../assets/College.png";
import i2 from "../../assets/content creation.png";
import i3 from "../../assets/University Building.png";
import i4 from "../../assets/Scholarship.png";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import type { StaticImageData } from "next/image";

type StatItem = {
  icon: string | StaticImageData;
  number: number;
  label: string;
};

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/auth/signup");
  };

  const handleViewProgrammes = () => {
    router.push("/programmes");
  };

  const stats: StatItem[] = [
    { number: 30, label: "Affiliated Universities", icon: i1 },
    { number: 30, label: "Total UG Programmes", icon: i2 },
    { number: 30, label: "Total PG Programmes", icon: i2 },
    { number: 30, label: "Diploma Courses", icon: i2 },
    { number: 30, label: "Affiliated Colleges", icon: i3 },
    { number: 30, label: "Affiliated Agri. Tech. School", icon: i3 },
    { number: 30, label: "Total Students", icon: i4 },
    { number: 30, label: "Research Stations", icon: "/icons/research.svg" },
    { number: 30, label: "Ph.D. Programmes", icon: "/icons/phd.svg" },
    { number: 30, label: "Constitutent Agri. Tech. School", icon: i3 }
  ];

  return (
    <Box as="section" maxW="var(--max-width)" mx="auto" py={{ base: 8, md: 12 }} px={4}>
      <Flex direction={{ base: "column", md: "row" }} gap={{ base: 8, md: 10 }}>
        {/* LEFT */}
        <Box flex={{ base: 'auto', md: '0 0 40%' }} mt={{ md: -6 }}>
          <Text color="var(--brand-500)" fontSize="sm" mb={2}>Mahatma Phule Krushi Vidyapeeth</Text>

          <Heading as="h1" fontSize={{ base: '2xl', md: '4xl' }} fontWeight={500} lineHeight={1.1} mb={6}>
            Student Lifecycle <br /> Management
          </Heading>

          <Box maxH="440px" overflowY="auto" pr={2}>
            <Flex direction="column" gap={4}>
              {stats.map((item, index) => (
                <Flex key={index} align="center" gap={3} p={3} borderRadius="8px">
                  <Box boxSize="40px" flexShrink={0}>
                    <Image src={item.icon} alt="" width={40} height={40} />
                  </Box>
                  <Box>
                    <Text fontSize="lg" fontWeight={700} color="var(--brand-500)">{item.number}</Text>
                    <Text color="var(--muted)" fontSize="sm">{item.label}</Text>
                  </Box>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box flex="1">
          <Flex justify="space-between" align="center" pl={{ md: 24 }}>
            <Text color="var(--muted)" maxW="450px">
              A comprehensive digital platform to manage every stage of a student's
              academic journey — from admission to graduation.
            </Text>

            <Flex gap={3}>
              <Button
                aria-label="prev"
                rounded="full"
                w={10}
                h={10}
                bg="white"
                color="var(--brand-700)"
                borderWidth="1px"
                borderColor="rgba(0,0,0,0.12)"
                _hover={{ bg: 'gray.50' }}
                boxShadow="sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>

              <Button
                aria-label="next"
                rounded="full"
                w={10}
                h={10}
                bg="white"
                color="var(--brand-700)"
                borderWidth="1px"
                borderColor="rgba(0,0,0,0.12)"
                _hover={{ bg: 'gray.50' }}
                boxShadow="sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </Flex>
          </Flex>

          <Box mt={6} borderRadius="16px" overflow="hidden" boxShadow="md" h={{ base: '260px', md: '490px' }}>
            <Image src={img} alt="Main Visual" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
