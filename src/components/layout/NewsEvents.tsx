"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Heading, Text, Button, Flex, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function NewsEvents(){
  const router = useRouter();

  const handleViewMore = () => {
    router.push("/news");
  };

  const makeColumn = (title: string) => (
    <Box>
      <Heading as="h4" size="md" mb={6}>{title}</Heading>

      {/* item 1 */}
      <Box mb={6}>
        <Text fontSize="sm" mb={1}>City Council Approves New Public Park Development Project in Downtown Area</Text>
        <Text fontSize="xs" color="var(--accent)" mb={2}>21 minutes ago</Text>
        <Box mt={2}>
          <ChakraLink
            as={NextLink}
            href="/news"
            role="group"
            display="inline-flex"
            alignItems="center"
            gap={3}
            textDecoration="none"
            color="whiteAlpha.900"
            _hover={{ textDecoration: 'none' }}
            _groupHover={{ color: 'black' }}
          >
            <Text fontSize="sm" transition="color .18s">Read More</Text>
            <Box
              ml={3}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="28px"
              h="28px"
              borderRadius="full"
              border="1px solid rgba(255,255,255,0.9)"
              transition="transform .22s, border-color .22s, background .22s, box-shadow .22s"
              _groupHover={{ transform: 'translateY(-6px)', borderColor: 'black', bg: 'white', boxShadow: 'lg' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>
          </ChakraLink>
        </Box>
      </Box>

      {/* item 2 */}
      <Box mb={6}>
        <Text fontSize="sm" mb={1}>City Council Approves New Public Park Development Project in Downtown Area</Text>
        <Text fontSize="xs" color="var(--accent)" mb={2}>21 minutes ago</Text>
        <Box mt={2}>
          <ChakraLink as={NextLink} href="/news" role="group" display="inline-flex" alignItems="center" gap={3} textDecoration="none" color="whiteAlpha.900" _hover={{ textDecoration: 'none' }} _groupHover={{ color: 'black' }}>
            <Text fontSize="sm" transition="color .18s">Read More</Text>
            <Box ml={3} display="inline-flex" alignItems="center" justifyContent="center" w="28px" h="28px" borderRadius="full" border="1px solid rgba(255,255,255,0.9)" transition="transform .22s, border-color .22s, background .22s, box-shadow .22s" _groupHover={{ transform: 'translateY(-6px)', borderColor: 'black', bg: 'white', boxShadow: 'lg' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Box>
          </ChakraLink>
        </Box>
      </Box>

      {/* item 3 */}
      <Box mb={6}>
        <Text fontSize="sm" mb={1}>City Council Approves New Public Park Development Project in Downtown Area</Text>
        <Text fontSize="xs" color="var(--accent)" mb={2}>on 25 July 2025</Text>
        <Box mt={2}>
          <ChakraLink as={NextLink} href="/news" role="group" display="inline-flex" alignItems="center" gap={3} textDecoration="none" color="whiteAlpha.900" _hover={{ textDecoration: 'none' }} _groupHover={{ color: 'black' }}>
            <Text fontSize="sm" transition="color .18s">Read More</Text>
            <Box ml={3} display="inline-flex" alignItems="center" justifyContent="center" w="28px" h="28px" borderRadius="full" border="1px solid rgba(255,255,255,0.9)" transition="transform .22s, border-color .22s, background .22s, box-shadow .22s" _groupHover={{ transform: 'translateY(-6px)', borderColor: 'black', bg: 'white', boxShadow: 'lg' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Box>
          </ChakraLink>
        </Box>
      </Box>

      <Box>
        <Button
          onClick={handleViewMore}
          variant="ghost"
          mt={4}
          px={6}
          py={2}
          borderRadius="999px"
          border="2px solid"
          borderColor="white"
          color="white"
          bg="transparent"
          w={{ base: '160px', md: '140px' }}
          mx="auto"
          _hover={{ bg: 'var(--accent)',borderColor: 'var(--accent)' }}
        >
          View More
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box as="section" bg="var(--brand-700)" color="white" py={12}>
      <Heading textAlign="center" mb={8}>News & Events</Heading>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} maxW="1100px" mx="auto" px={4}>
        {makeColumn('Upcoming Events')}
        {makeColumn('News/ Updates')}
        {makeColumn('Recruitment')}
      </Grid>
    </Box>
  );
}