import React from 'react'
import { Button } from '@chakra-ui/react'

type Props = React.ComponentProps<typeof Button>

export default function ButtonPrimary(props: Props) {
  return (
    <Button
      bg="var(--brand-500)"
      color="white"
      _hover={{ bg: 'var(--brand-700)' }}
      borderRadius="full"
      px={6}
      {...props}
    />
  )
}
