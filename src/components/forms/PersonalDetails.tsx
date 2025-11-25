"use client";
import {
  Box,
  Grid,
  Flex,
  Input,
  Select,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// -----------------------------
// Schema (from your PDF)
// -----------------------------
const PersonalSchema = z.object({
  firstName: z.string().min(1, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  bloodGroup: z.string().optional(),

  fatherName: z.string().min(1, "Required"),
  motherName: z.string().min(1, "Required"),
  fatherOccupation: z.string().optional(),
  motherOccupation: z.string().optional(),

  email: z.string().email("Invalid Email"),
  mobile: z.string().regex(/^\d{10}$/, "10-digit Mobile required"),
  whatsapp: z.string().regex(/^\d{10}$/, "10-digit WhatsApp required"),
  aadhar: z.string().regex(/^\d{12}$/, "12-digit Aadhar required"),
});

type PersonalForm = z.infer<typeof PersonalSchema>;

export default function PersonalDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<PersonalForm>;
  onNext?: (data: PersonalForm) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalForm>({
    resolver: zodResolver(PersonalSchema),
    defaultValues: defaultValues || {},
  });

  const submit = (data: PersonalForm) => {
    onNext?.(data);
    console.log("Personal details saved:", data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        {/* Row 1 — Name */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name *</FormLabel>
            <Input {...register("firstName")} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Middle Name</FormLabel>
            <Input {...register("middleName")} />
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Last Name *</FormLabel>
            <Input {...register("lastName")} />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        {/* Row 2 — Gender, DOB, Blood Group */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.gender}>
            <FormLabel>Gender *</FormLabel>
            <Select placeholder="Select Gender" {...register("gender")}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.dob}>
            <FormLabel>Date of Birth *</FormLabel>
            <Input type="date" {...register("dob")} />
            <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Blood Group</FormLabel>
            <Select placeholder="Select Blood Group" {...register("bloodGroup")}>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </Select>
          </FormControl>
        </Grid>

        {/* Row 3 — Parents Info */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.fatherName}>
            <FormLabel>Father’s Name *</FormLabel>
            <Input {...register("fatherName")} />
            <FormErrorMessage>{errors.fatherName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.motherName}>
            <FormLabel>Mother’s Name *</FormLabel>
            <Input {...register("motherName")} />
            <FormErrorMessage>{errors.motherName?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        {/* Row 4 — Parent Occupations */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Father Occupation</FormLabel>
            <Input {...register("fatherOccupation")} />
          </FormControl>

          <FormControl>
            <FormLabel>Mother Occupation</FormLabel>
            <Input {...register("motherOccupation")} />
          </FormControl>
        </Grid>

        {/* Row 5 — Contact Info */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email *</FormLabel>
            <Input type="email" {...register("email")} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.mobile}>
            <FormLabel>Mobile No *</FormLabel>
            <Input maxLength={10} {...register("mobile")} />
            <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.whatsapp}>
            <FormLabel>WhatsApp No *</FormLabel>
            <Input maxLength={10} {...register("whatsapp")} />
            <FormErrorMessage>{errors.whatsapp?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        {/* Row 6 — Aadhar */}
        <Grid templateColumns={{ base: "1fr", md: "1fr" }}>
          <FormControl isInvalid={!!errors.aadhar}>
            <FormLabel>Aadhar No *</FormLabel>
            <Input maxLength={12} {...register("aadhar")} />
            <FormErrorMessage>{errors.aadhar?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        {/* Footer buttons */}
        <Flex justify="space-between" mt={2}>
          <Button variant="ghost">Previous</Button>
          <Button type="submit" colorScheme="brand">
            Save & Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
