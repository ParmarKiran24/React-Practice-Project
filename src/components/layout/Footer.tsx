import React from 'react'
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import img from '../../assets/image 4.png'
import SocialMedia from '../../assets/Frame 163.png'
export default function Footer() {
  return (
    <Box as="footer" bg="white" py={8} borderTop="3px solid var(--brand-500)">
      <Box maxW="1200px" mx="auto" px={6}>
        {/* Top row: logo left, social right */}
        <Flex justify="space-between" align="center" mb={6}>
          <Flex align="center" gap={3}>
            <Box>
              <NextImage src={img} alt="logo" width={110} height={32} />
            </Box>
            <Text fontSize="sm" color="gray.600">VNMKV Student Portal</Text>
          </Flex>

          <Box>
            <NextImage src={SocialMedia} alt="social-icons" width={100} height={28} />
          </Box>
        </Flex>

        {/* Middle: three equal columns */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} textAlign={{ base: 'left', md: 'left' }} mb={8}>
          <Box>
            <Heading as="h4" size="sm" mb={3}>Contact Us</Heading>
            <Text fontSize="sm" color="gray.700">Mahatma Phule Krishi Vidyapeeth,<br />Rahuri,<br />Ahilyanagar, Maharashtra - 413722</Text>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={3}>Important Links</Heading>
            <Box as="ul" pl={0} style={{ listStyle: 'none' }}>
              <Box as="li" mb={2}><Text fontSize="sm">About Us</Text></Box>
              <Box as="li" mb={2}><Text fontSize="sm">Privacy Policy</Text></Box>
              <Box as="li" mb={2}><Text fontSize="sm">Disclaimer</Text></Box>
              <Box as="li"><Text fontSize="sm">Terms & Conditions</Text></Box>
            </Box>
          </Box>

          <Box>
            <Heading as="h4" size="sm" mb={3}>Helpdesk</Heading>
            <Text fontSize="sm" color="gray.700">Phone : +91-9823009846<br />Timing : 10:00 am to 6:00 pm (All Days)</Text>
          </Box>
        </Grid>

        {/* Center title */}
        <Text fontWeight={600} mb={6}>MPKV Student Portal</Text>

        {/* Bottom: legal text stacked and right-aligned */}
        <Flex justify="flex-end" direction="column" align="flex-end">
          <Text fontWeight={400}>MPKV, Rahuri. All Rights Reserved.</Text>
          <Text fontSize="xs" color="gray.600">Designed, Developed and Hosted by Analytica Business Solutions (ABS)</Text>
        </Flex>
      </Box>
    </Box>
  )
}