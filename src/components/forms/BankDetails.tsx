"use client";
import React from "react";
import {
  Box,
  Grid,
  Stack,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Bank Details form based on Bank Details.pdf
 * Fields: Bank select, Account holder, Branch name, IFSC, Account No, Confirm Account No
 * Also optional: Cancelled cheque upload (client-side preview/validation can be added later)
 *
 * Reference: /mnt/data/Bank Details.pdf. :contentReference[oaicite:1]{index=1}
 */

// zod schema
const BankSchema = z.object({
  bankName: z.string().min(1, "Select Bank"),
  accountHolderName: z.string().min(2, "Account holder name required"),
  branchName: z.string().min(1, "Branch name required"),
  ifsc: z
    .string()
    .min(1, "IFSC required")
    // Basic IFSC pattern: 4 letters, '0', 6 alphanumeric (case-insensitive)
    .regex(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, "Enter a valid IFSC code (e.g. SBIN0001234)"),
  accountNumber: z
    .string()
    .min(6, "Account number too short")
    .max(18, "Account number too long")
    .regex(/^\d+$/, "Account number must be digits only"),
  confirmAccountNumber: z.string(),
  // optional file input (we accept File or null)
  cancelledCheque: z
    .any()
    .optional()
    .refine(
      (f) => {
        if (!f) return true;
        // allow File instance or FileList
        const file = f instanceof File ? f : f?.[0];
        if (!file) return true;
        return file.size <= 1024 * 1024 * 2; // <= 2MB for example
      },
      { message: "Cancelled cheque must be <= 2 MB" }
    ),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers do not match",
  path: ["confirmAccountNumber"],
});

type BankForm = z.infer<typeof BankSchema>;

export default function BankDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<BankForm>;
  onNext?: (data: BankForm) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BankForm>({
    resolver: zodResolver(BankSchema),
    defaultValues: defaultValues || {
      bankName: "",
      accountHolderName: "",
      branchName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      cancelledCheque: undefined,
    },
  });

  const submit = (data: BankForm) => {
    // if cancelledCheque is FileList, normalize to single File
    const normalized = { ...data } as any;
    if (normalized.cancelledCheque && normalized.cancelledCheque.length) {
      normalized.cancelledCheque = normalized.cancelledCheque[0];
    }
    console.log("Bank details saved:", normalized);
    onNext?.(normalized);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="lg" fontWeight={600}>
          Bank Account Details
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <FormControl isInvalid={!!errors.bankName}>
            <FormLabel>Select Bank *</FormLabel>
            <Select placeholder="Select" {...register("bankName")}>
              {/* replace with your actual bank list / API */}
              <option value="State Bank of India">State Bank of India</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Other">Other</option>
            </Select>
            <FormErrorMessage>{errors.bankName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.accountHolderName}>
            <FormLabel>Account Holder Name *</FormLabel>
            <Input {...register("accountHolderName")} placeholder="Name" />
            <FormErrorMessage>{errors.accountHolderName?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <FormControl isInvalid={!!errors.branchName}>
            <FormLabel>Branch Name *</FormLabel>
            <Input {...register("branchName")} placeholder="Branch Name" />
            <FormErrorMessage>{errors.branchName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.ifsc}>
            <FormLabel>IFSC Code *</FormLabel>
            <Input {...register("ifsc")} placeholder="e.g. SBIN0001234" maxLength={11} />
            <FormErrorMessage>{errors.ifsc?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <FormControl isInvalid={!!errors.accountNumber}>
            <FormLabel>Account Number *</FormLabel>
            <Input {...register("accountNumber")} placeholder="Account Number" />
            <FormErrorMessage>{errors.accountNumber?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmAccountNumber}>
            <FormLabel>Confirm Account Number *</FormLabel>
            <Input {...register("confirmAccountNumber")} placeholder="Confirm Account Number" />
            <FormErrorMessage>{errors.confirmAccountNumber?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <FormControl isInvalid={!!errors.cancelledCheque}>
          <FormLabel>Upload Cancelled Cheque (optional)</FormLabel>
          <Controller
            control={control}
            name="cancelledCheque"
            render={({ field }) => (
              <Input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
          <FormErrorMessage>{(errors.cancelledCheque as any)?.message}</FormErrorMessage>
        </FormControl>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} alignItems="center">
          <Button variant="ghost">Previous</Button>
          <Button colorScheme="brand" type="submit">
            Save & Next
          </Button>
        </Grid>
      </Stack>
    </Box>
  );
}
