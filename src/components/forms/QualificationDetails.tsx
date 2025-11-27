"use client";
import React from "react";
import {
  Box,
  Grid,
  Flex,
  Input,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// -----------------------------
// Zod schema (qualification rows)
// -----------------------------
const QualificationRow = z.object({
  qualificationType: z.string().min(1, "Select qualification type"),
  qualificationName: z.string().min(1, "Enter qualification name"),
  boardUniversity: z.string().min(1, "Board / University required"),
  resultType: z.string().min(1, "Select result type"),
  percentage: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter valid percentage (e.g. 75 or 75.50)")
    .transform((s) => s.trim()),
  passingMonthYear: z.string().min(1, "Enter passing month/year"),
});

const QualificationSchema = z.object({
  qualifications: z
    .array(QualificationRow)
    .min(1, "Add at least one qualification"),
});

type QualificationForm = z.infer<typeof QualificationSchema>;

// -----------------------------
// Component
// -----------------------------
export default function QualificationDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<QualificationForm>;
  onNext?: (data: QualificationForm) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QualificationForm>({
    resolver: zodResolver(QualificationSchema),
    defaultValues: defaultValues || {
      qualifications: [
        {
          qualificationType: "",
          qualificationName: "",
          boardUniversity: "",
          resultType: "",
          percentage: "",
          passingMonthYear: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const submit = (data: QualificationForm) => {
    console.log("Qualifications saved:", data);
    onNext?.(data);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(submit)}
      maxW="1100px"
      mx="auto"
      p={4}
    >
      <Stack gap={6}>
        <Flex justify="space-between" align="center">
          <Text fontSize="lg" fontWeight={600}>
            Qualification Details
          </Text>
          <Button size="sm" onClick={() => append({ qualificationType: "", qualificationName: "", boardUniversity: "", resultType: "", percentage: "", passingMonthYear: "" })}>
            + Add New Qualification
          </Button>
        </Flex>

        {/* Table header (responsive grid) */}
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 120px 120px" }}
          gap={3}
          alignItems="center"
          bg="gray.50"
          p={3}
          borderRadius="md"
        >
          <Text fontWeight={600}>Qualification Type</Text>
          <Text fontWeight={600}>Qualification Name / Course</Text>
          <Text fontWeight={600}>Board / University</Text>
          <Text fontWeight={600}>Result Type</Text>
          <Text fontWeight={600}>% / Passing</Text>
        </Grid>

        {/* Rows */}
        {fields.map((field, idx) => (
          <Grid
            key={field.id}
            templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 120px 120px" }}
            gap={3}
            alignItems="center"
            borderWidth="1px"
            borderColor="gray.100"
            p={3}
            borderRadius="md"
          >
            {/* Qualification Type */}
            <FormControl
              isInvalid={!!errors?.qualifications?.[idx]?.qualificationType}
            >
              <FormLabel srOnly>Qualification Type</FormLabel>
              <select {...register(`qualifications.${idx}.qualificationType` as const)} style={{ width: "100%", padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }}>
                <option value="">Select</option>
                <option value="10th">10th Standard</option>
                <option value="12th">12th Standard</option>
                <option value="diploma">Diploma</option>
                <option value="ug">Undergraduate</option>
                <option value="pg">Postgraduate</option>
                <option value="other">Other</option>
              </select>
              <FormErrorMessage>
                {
                  errors?.qualifications?.[idx]?.qualificationType
                    ?.message as any
                }
              </FormErrorMessage>
            </FormControl>

            {/* Qualification Name */}
            <FormControl
              isInvalid={!!errors?.qualifications?.[idx]?.qualificationName}
            >
              <FormLabel srOnly>Qualification Name</FormLabel>
              <Input
                size="sm"
                placeholder="e.g. SSC / HSC / B.Sc"
                {...register(
                  `qualifications.${idx}.qualificationName` as const
                )}
              />
              <FormErrorMessage>
                {
                  errors?.qualifications?.[idx]?.qualificationName
                    ?.message as any
                }
              </FormErrorMessage>
            </FormControl>

            {/* Board / University */}
            <FormControl
              isInvalid={!!errors?.qualifications?.[idx]?.boardUniversity}
            >
              <FormLabel srOnly>Board / University</FormLabel>
              <Input
                size="sm"
                placeholder="Board or University name"
                {...register(`qualifications.${idx}.boardUniversity` as const)}
              />
              <FormErrorMessage>
                {errors?.qualifications?.[idx]?.boardUniversity?.message as any}
              </FormErrorMessage>
            </FormControl>

            {/* Result Type */}
            <FormControl
              isInvalid={!!errors?.qualifications?.[idx]?.resultType}
            >
              <FormLabel srOnly>Result Type</FormLabel>
              <select {...register(`qualifications.${idx}.resultType` as const)} style={{ width: "100%", padding: 6, borderRadius: 6, border: "1px solid #E2E8F0" }}>
                <option value="">Result</option>
                <option value="passed">Passed</option>
                <option value="appearing">Appearing</option>
                <option value="failed">Failed</option>
                <option value="other">Other</option>
              </select>
              <FormErrorMessage>
                {errors?.qualifications?.[idx]?.resultType?.message as any}
              </FormErrorMessage>
            </FormControl>

            {/* Percentage & Passing - combined column */}
            <Flex gap={2} align="center">
              <FormControl
                isInvalid={!!errors?.qualifications?.[idx]?.percentage}
              >
                <FormLabel srOnly>Percentage</FormLabel>
                <Input
                  size="sm"
                  placeholder="% (e.g. 75.00)"
                  {...register(`qualifications.${idx}.percentage` as const)}
                />
                <FormErrorMessage>
                  {errors?.qualifications?.[idx]?.percentage?.message as any}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors?.qualifications?.[idx]?.passingMonthYear}
              >
                <FormLabel srOnly>Passing Month/Year</FormLabel>
                <Input
                  size="sm"
                  placeholder="June-2024"
                  {...register(
                    `qualifications.${idx}.passingMonthYear` as const
                  )}
                />
                <FormErrorMessage>
                  {
                    errors?.qualifications?.[idx]?.passingMonthYear
                      ?.message as any
                  }
                </FormErrorMessage>
              </FormControl>

              {/* Delete Row button */}
              <Button
                variant="ghost"
                colorScheme="red"
                size="sm"
                onClick={() => remove(idx)}
                aria-label="Delete qualification"
              >
                ✕
              </Button>
            </Flex>
          </Grid>
        ))}

        {/* Show top-level error */}
        {errors?.qualifications && Array.isArray(errors.qualifications) && (
          <Text color="red.500" fontSize="sm">
            {(errors as any).qualifications?.message ?? ""}
          </Text>
        )}

        {/* Footer actions */}
        <Flex justify="space-between" mt={2}>
          <Button variant="ghost">Previous</Button>
          <Button colorScheme="brand" type="submit">
            Save & Next
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
