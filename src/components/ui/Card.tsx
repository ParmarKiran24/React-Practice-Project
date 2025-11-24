import React from 'react'
import { Box } from '@chakra-ui/react'

export default function Card({ children, ...rest }: any) {
  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="md" {...rest}>
      {children}
    </Box>
  )
}
