"use client";
import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  Stack,
  Input,
  Button,
  Text,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";

/**
 * DocumentDetails.tsx
 * - Accordion list of documents with file upload controls
 * - Accepts .pdf, .jpg, .jpeg, .png
 * - Shows preview for images and filename for PDFs
 * - Validates max file size (2 MB default; adjust as needed)
 *
 * Design reference: /mnt/data/Document Details.pdf. :contentReference[oaicite:1]{index=1}
 *
 * NOTE: I include the local file path below so your toolchain can transform it into a served url:
 * const designPdfUrl = "/mnt/data/Document Details.pdf";
 */

type DocRow = {
  id: string;
  name: string; // shown title
  accept: string; // accept attribute for input
  required?: boolean;
  file?: File | null;
  error?: string | null;
};

type FormValues = {
  docs: DocRow[];
};

const DEFAULT_DOCS: DocRow[] = [
  { id: "ssc", name: "SSC / 10th Certificate", accept: ".pdf,image/*", required: true, file: null, error: null },
  { id: "hsc", name: "Random Certificate", accept: ".pdf,image/*", required: false, file: null, error: null },
  // you can add more rows or let users add custom uploads
];

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per document (adjust as needed)
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

export default function DocumentDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<FormValues>;
  onNext?: (data: { docs: { id: string; file: File | null }[] }) => void;
}) {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      docs: defaultValues?.docs ?? DEFAULT_DOCS,
    },
  });

  const [rows, setRows] = useState<DocRow[]>(defaultValues?.docs ?? DEFAULT_DOCS);

  const validateAndSetFile = (fileList: FileList | null, idx: number) => {
    const file = fileList && fileList.length ? fileList[0] : null;
    let error: string | null = null;

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        error = "Only PDF / JPG / PNG files are allowed.";
      } else if (file.size > MAX_FILE_SIZE) {
        error = `File too large. Max ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)} MB.`;
      }
    } else {
      // If required, keep null file (we'll validate on submit)
      error = null;
    }

    setRows((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], file, error };
      return copy;
    });
  };

  const removeFile = (idx: number) => {
    setRows((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], file: null, error: null };
      return copy;
    });
  };

  const addCustomDoc = () => {
    setRows((prev) => [
      ...prev,
      {
        id: `custom_${Date.now()}`,
        name: "Additional Document",
        accept: ".pdf,image/*",
        required: false,
        file: null,
        error: null,
      },
    ]);
  };

  const submit = (values: any) => {
    // Validate required rows
    const errors = rows.map((r) => {
      if (r.required && !r.file) {
        return `${r.name} is required`;
      }
      return null;
    });

    const firstError = errors.find(Boolean);
    if (firstError) {
      // simple UI-level alert: set first missing field error
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          error: r.required && !r.file ? `${r.name} is required` : r.error,
        }))
      );
      return;
    }

    // Normalize output: id + File|null
    const normalized = rows.map((r) => ({ id: r.id, file: r.file ?? null }));
    onNext?.({ docs: normalized });
    console.log("Document uploads ready:", normalized);
  };

  // local path that your toolchain will convert to a URL
  const designPdfUrl = "/mnt/data/Document Details.pdf";

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="1100px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="lg" fontWeight={600}>
          Document Uploads
        </Text>

        <Accordion allowMultiple defaultIndex={[0]}>
          {rows.map((row, idx) => (
            <AccordionItem key={row.id} border="1px solid" borderColor="gray.100" borderRadius="md" mb={3}>
              <h3>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {row.name} {row.required ? <Text as="span" color="red.500"> *</Text> : null}
                    {row.file ? (
                      <Text fontSize="sm" color="green.600" ml={2} as="span">
                        ({row.file.name})
                      </Text>
                    ) : null}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <Grid templateColumns={{ base: "1fr", md: "1fr 220px" }} gap={4} alignItems="center">
                  <FormControl isInvalid={!!row.error}>
                    <FormLabel>Upload {row.name}</FormLabel>
                    <Input
                      type="file"
                      accept={row.accept}
                      onChange={(e) => validateAndSetFile(e.target.files, idx)}
                    />
                    <FormErrorMessage>{row.error}</FormErrorMessage>

                    <Text fontSize="sm" color="gray.600" mt={2}>
                      Accepted: PDF, JPG, PNG. Max {(MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)} MB.
                    </Text>
                  </FormControl>

                  <Box>
                    {row.file ? (
                      <>
                        {row.file.type === "application/pdf" ? (
                          <Box>
                            <Text fontSize="sm" mb={2}>
                              PDF uploaded: {row.file.name}
                            </Text>
                            <HStack>
                              <Button
                                size="sm"
                                onClick={() => {
                                  // open local blob preview in new tab
                                  const url = URL.createObjectURL(row.file as Blob);
                                  window.open(url, "_blank");
                                }}
                              >
                                Preview
                              </Button>
                              <IconButton
                                aria-label="Remove file"
                                icon={<SmallCloseIcon />}
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFile(idx)}
                                title="Remove file"
                              />
                            </HStack>
                          </Box>
                        ) : (
                          <Box textAlign="center">
                            <Image
                              src={URL.createObjectURL(row.file as Blob)}
                              alt={row.name}
                              maxH="150px"
                              objectFit="contain"
                              borderRadius="md"
                              mb={2}
                            />
                            <HStack justify="center">
                              <Button
                                size="sm"
                                onClick={() => {
                                  const url = URL.createObjectURL(row.file as Blob);
                                  window.open(url, "_blank");
                                }}
                              >
                                Open
                              </Button>
                              <IconButton
                                aria-label="Remove file"
                                icon={<SmallCloseIcon />}
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFile(idx)}
                                title="Remove file"
                              />
                            </HStack>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Text fontSize="sm" color="gray.500">
                        No file uploaded
                      </Text>
                    )}
                  </Box>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <HStack gap={3}>
          <Button leftIcon={<AddIcon />} size="sm" onClick={addCustomDoc}>
            Add Another Document
          </Button>
          <Text fontSize="sm" color="gray.600">
            Tip: Upload all required certificates (marksheets, caste, domicile, etc.) in correct format.
          </Text>
        </HStack>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} alignItems="center">
          <Button variant="ghost">Previous</Button>
          <Button colorScheme="brand" type="submit">
            Save & Next
          </Button>
        </Grid>

        <Box fontSize="sm" color="gray.600">
          Design reference (local path, will be transformed to URL by your tool): <code>{designPdfUrl}</code>. :contentReference[oaicite:2]{index=2}
        </Box>
      </Stack>
    </Box>
  );
}
