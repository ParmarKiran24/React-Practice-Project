'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Box, Button, Input, Heading, Text } from '@chakra-ui/react'

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email')
})

type FormData = z.infer<typeof schema>

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log('submit', data)
    alert('Form submitted — check console')
  }

  return (
    <Box maxW="container.md" mx="auto" py={12}>
      <Heading mb={6}>Demo Form</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register('name')} />
          {errors.name && <Text color="red.500">{errors.name.message}</Text>}
        </Box>

        <Box mb={4}>
          <label htmlFor="email">Email</label>
          <Input id="email" {...register('email')} />
          {errors.email && <Text color="red.500">{errors.email.message}</Text>}
        </Box>

        <Button type="submit" colorScheme="blue">Submit</Button>
      </form>
    </Box>
  )
}
