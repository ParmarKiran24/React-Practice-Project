"use client";
import React from "react";
import {
  Box,
  Stack,
  Text,
  Button,
  Checkbox,
  Input,
  Link,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Declaration form
 * - Shows declaration text (read-only)
 * - User must check "I accept" and type their name as signature
 * - On submit, returns { accepted: true, signatureName, acceptedAt }
 *
 * Design reference/local PDF path (will be converted to URL by your toolchain):
 *   /mnt/data/Declartion.pdf
 * See: /mnt/data/Declartion.pdf. :contentReference[oaicite:1]{index=1}
 */

// zod schema
const DeclarationSchema = z.object({
  accepted: z.boolean().refine((val) => val === true, { message: "You must accept the declaration to continue." }),
  signatureName: z.string().min(2, "Please enter your full name as signature"),
});

type DeclarationForm = z.infer<typeof DeclarationSchema>;

export default function Declaration({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<DeclarationForm>;
  onSubmit?: (payload: { accepted: true; signatureName: string; acceptedAt: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DeclarationForm>({
    resolver: zodResolver(DeclarationSchema),
    defaultValues: {
      accepted: false,
      signatureName: "",
      ...defaultValues,
    },
  });

  // local design PDF path — your infra will transform to a URL
  const designPdfUrl = "/mnt/data/Declartion.pdf";

  const submit = (data: DeclarationForm) => {
    const payload = {
      accepted: true as const,
      signatureName: data.signatureName,
      acceptedAt: new Date().toISOString(),
    };
    console.log("Declaration accepted:", payload);
    onSubmit?.(payload);
  };

  // Example short version of the declaration text. Replace this with the full text
  // or load it from your backend if you want to keep the PDF authoritative.
  const declarationText = `
I hereby declare that the information provided by me in this application form is true and correct to the best of my knowledge and belief. 
I understand that any false information or misrepresentation may lead to cancellation of my candidature or admission at any stage.
I accept all the terms and conditions as mentioned in the prospectus and agree to abide by them.
  `.trim();

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="lg" fontWeight={600}>
          Declaration
        </Text>

        <Box border="1px solid" borderColor="gray.100" p={4} borderRadius="md" maxH="320px" overflowY="auto">
          <Text whiteSpace="pre-wrap" lineHeight="tall" color="gray.800">
            {declarationText}
          </Text>

          <Box as="hr" my={4} borderTop="1px solid" borderColor="gray.200" />

          <Text fontSize="sm" color="gray.600">
            Full declaration (PDF):{" "}
            <Link href={designPdfUrl} target="_blank" rel="noopener noreferrer" color="brand.500">
              Open Declaration PDF
            </Link>
          </Text>
        </Box>

        <FormControl isInvalid={!!errors.signatureName}>
          <FormLabel>Type your full name (Signature) *</FormLabel>
          <Input placeholder="Full name as signature" {...register("signatureName")} />
          <FormErrorMessage>{errors.signatureName?.message}</FormErrorMessage>
        </FormControl>

        <Box>
          <input type="checkbox" id="accept" {...register("accepted")} />
          <label htmlFor="accept"><Text as="span" ml={2}>I accept the declaration and the terms stated above *</Text></label>
          {errors.accepted && <Text color="red.500" fontSize="sm" mt={2}>{(errors.accepted as any)?.message}</Text>}
        </Box>

        <Stack direction="row" justify="space-between">
          <Button variant="ghost">Previous</Button>
          <Button colorScheme="brand" type="submit" loading={isSubmitting}>
            Final Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
