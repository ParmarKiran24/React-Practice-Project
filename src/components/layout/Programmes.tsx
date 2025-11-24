"use client";
import React, { useState } from "react";
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'

export default function Programmes() {
  const tabs = ["Diploma Programmes", "UG Programmes", "PG Programmes", "PHD Programmes"];
  
  // use null for no active tab (so clicking same tab resets it)
  const [active, setActive] = useState<number | null>(0);

  const handleTabClick = (index: number) => {
    if (active === index) {
      setActive(null); // clicking same tab → unselect
    } else {
      setActive(index); // clicking new tab → activate
    }
  };

  return (
    <Box as="section" py={12}>
      <Flex direction="column" align="center" gap={6}>
        <Box w="100%" pb={6}>
          <Flex wrap="wrap" justify="center" gap={6}>
            {tabs.map((t, i) => {
              const isActive = active === i;
              return (
                <Button
                  key={i}
                  onClick={() => handleTabClick(i)}
                  variant="ghost"
                  bg="transparent"
                  color={isActive ? 'var(--brand-500)' : 'var(--muted)'}
                  fontWeight={isActive ? 600 : 400}
                  px={4}
                  py={2}
                  borderRadius={0}
                  borderBottom={isActive ? '3px solid var(--brand-500)' : '3px solid transparent'}
                  _hover={{ color: 'var(--brand-700)', bg: 'transparent' }}
                >
                  {t}
                </Button>
              );
            })}
          </Flex>
        </Box>

        <Flex wrap="wrap" justify="center" gap={8} maxW="1100px" w="100%">
          <Box w={{ base: '100%', md: '310px' }} p={6} borderRadius="15px" boxShadow="md" bg="white">
            <Heading as="h3" size="md" mb={3}>Diploma in Agriculture Course</Heading>
            <Text fontWeight={600} mb={2}>Course Overview:</Text>
            <Text mb={3}>The "Diploma in Agriculture" is a diploma-level programme aimed at training students in various aspects of agriculture.</Text>
            <Text fontWeight={600} mb={2}>Course Duration: <Text as="span" fontWeight={400}>2 Years</Text></Text>
            <Text fontWeight={600} mb={2}>Eligibility Criteria:</Text>
            <Box as="ul" pl={4} mb={4}><Box as="li">10th pass (or equivalent)</Box><Box as="li">Minimum aggregate marks (e.g., 50%)</Box></Box>
            <Button bg="transparent" border="2px solid var(--brand-500)" color="var(--brand-500)" w="100%" borderRadius="30px" py={3} _hover={{ bg: 'var(--brand-500)', color: 'white' }}>View Course Information</Button>
          </Box>

          <Box w={{ base: '100%', md: '310px' }} p={6} borderRadius="15px" boxShadow="md" bg="white">
            <Heading as="h3" size="md" mb={3}>Diploma in Agriculture Course</Heading>
            <Text fontWeight={600} mb={2}>Course Overview:</Text>
            <Text mb={3}>The “Polytechnic in Agriculture” is a diploma-level programme aimed at training students in crop science, horticulture, soil science, etc.</Text>
            <Text fontWeight={600} mb={2}>Course Duration: <Text as="span" fontWeight={400}>3 Years</Text></Text>
            <Text fontWeight={600} mb={2}>Eligibility Criteria:</Text>
            <Box as="ul" pl={4} mb={4}><Box as="li">10th standard (SSC) or equivalent</Box><Box as="li">Minimum aggregate marks (e.g., 50%)</Box></Box>
            <Button bg="transparent" border="2px solid var(--brand-500)" color="var(--brand-500)" w="100%" borderRadius="30px" py={3} _hover={{ bg: 'var(--brand-500)', color: 'white' }}>View Course Information</Button>
          </Box>

          <Box w={{ base: '100%', md: '310px' }} p={6} borderRadius="15px" boxShadow="md" bg="white">
            <Heading as="h3" size="md" mb={3}>Diploma in Agriculture Course</Heading>
            <Text fontWeight={600} mb={2}>Course Overview:</Text>
            <Text mb={3}>Provides skill-oriented horticulture training for gardeners, nursery workers & agriculture landscape workers.</Text>
            <Text fontWeight={600} mb={2}>Course Duration: <Text as="span" fontWeight={400}>1 Year</Text></Text>
            <Text fontWeight={600} mb={2}>Eligibility Criteria:</Text>
            <Box as="ul" pl={4} mb={4}><Box as="li">8th class pass</Box></Box>
            <Button variant="outline" border="2px solid var(--brand-500)" color="var(--brand-500)" w="100%" borderRadius="30px" py={3} _hover={{ bg: 'var(--brand-500)', color: 'white' }}>View Course Information</Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
