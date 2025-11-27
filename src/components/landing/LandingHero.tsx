"use client";
import React from "react";
import { Box, Heading, Text, Stack, Button, Image, HStack, VStack, Icon, IconButton } from "@chakra-ui/react";
import { FaUniversity, FaBook, FaGraduationCap, FaAward, FaUsers, FaSchool, FaUserGraduate, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function LandingHero({
  onGetStarted,
  onPrograms,
}: {
  onGetStarted?: () => void;
  onPrograms?: () => void;
}) {
  const stats = [
    { icon: FaUniversity, number: "30", label: "Affiliated Universities" },
    { icon: FaBook, number: "30", label: "Total UG Programmes" },
    { icon: FaGraduationCap, number: "30", label: "Total PG Programmes" },
    { icon: FaAward, number: "30", label: "Diploma Courses" },
    { icon: FaSchool, number: "30", label: "Affiliated Colleges" },
    { icon: FaUsers, number: "30", label: "Affiliated Agri. Tech. School" },
    { icon: FaUserGraduate, number: "30", label: "Total Students" },
  ];

  return (
    <Box bg="gray.50" py={12}>
      <Box maxW="1200px" mx="auto" px={6}>
        <Text fontSize="sm" color="gray.600" mb={2}>
          Vasantrao Naik Marathwada Krishi Vidyapeeth
        </Text>
        
        <Stack direction={{ base: "column", lg: "row" }} gap={8} align="start">
          <VStack align="start" flex="1" gap={6}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.2">
              Student Lifecycle
              <br />
              Management
            </Heading>

            <Text fontSize="md" color="gray.600" maxW="500px">
              A comprehensive digital platform to manage every stage of a
              student's academic journey — from admission to graduation.
            </Text>

            <VStack align="start" gap={4} w="full" maxW="400px">
              {stats.map((stat, index) => (
                <HStack key={index} gap={4} w="full">
                  <Icon as={stat.icon} boxSize={6} color="gray.700" />
                  <Text fontSize="2xl" fontWeight="700" minW="60px">
                    {stat.number}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>

          <Box flex="1" position="relative">
            <HStack gap={3} position="absolute" top={4} right={4} zIndex={2}>
              <Button
                aria-label="Previous"
                variant="outline"
                borderRadius="full"
                borderColor="gray.800"
                borderWidth="2px"
                bg="white"
                color="gray.800"
                w="40px"
                h="40px"
                p={0}
                minW="auto"
                _hover={{ bg: "gray.50" }}
              >
                <FaChevronLeft />
              </Button>
              <Button
                aria-label="Next"
                variant="outline"
                borderRadius="full"
                borderColor="gray.800"
                borderWidth="2px"
                bg="white"
                color="gray.800"
                w="40px"
                h="40px"
                p={0}
                minW="auto"
                _hover={{ bg: "gray.50" }}
              >
                <FaChevronRight />
              </Button>
            </HStack>

            <Box
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="lg"
              bg="gray.200"
            >
              <Image
                src="/campus-image.jpg"
                alt="Campus view"
                w="full"
                h="400px"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
