"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  Image,
  Text,
  Input,
  Flex,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";

/**
 * Photo & Signature component
 * - Photo: 600x600 px recommended, <= 150KB, jpg/jpeg/png
 * - Signature: between 300x100 and 600x300 px, <= 150KB, jpg/jpeg/png
 *
 * Reference design: /mnt/data/Photo Sign.pdf. :contentReference[oaicite:1]{index=1}
 */

type FormValues = {
  photo?: FileList | null;
  signature?: FileList | null;
};

const MAX_SIZE_BYTES = 150 * 1024; // 150 KB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function PhotoSignature({
  defaultValues,
  onNext,
}: {
  defaultValues?: { photo?: File | null; signature?: File | null };
  onNext?: (data: { photo?: File | null; signature?: File | null }) => void;
}) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    defaultValues?.photo ? URL.createObjectURL(defaultValues.photo) : null
  );
  const [signaturePreview, setSignaturePreview] = useState<string | null>(
    defaultValues?.signature ? URL.createObjectURL(defaultValues.signature) : null
  );

  // validation helpers
  const validateImageFile = (file: File | null, kind: "photo" | "signature") =>
    new Promise<{ ok: boolean; message?: string }>((resolve) => {
      if (!file) return resolve({ ok: true });

      // type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return resolve({ ok: false, message: "Only JPG / JPEG / PNG files are allowed." });
      }

      // size
      if (file.size > MAX_SIZE_BYTES) {
        return resolve({ ok: false, message: "File must be 150 KB or smaller." });
      }

      // check dimensions by loading into an Image
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const w = img.width;
          const h = img.height;

          if (kind === "photo") {
            // Prefer exactly 600x600 but allow tolerance; require at least square-ish
            // Enforce minimum 560 and maximum 640 to be forgiving, but require square
            if (w < 560 || h < 560) {
              return resolve({
                ok: false,
                message: `Photo resolution too small. Aim for ~600×600 px.`,
              });
            }
            // check aspect ratio ~1:1 (tolerance 6%)
            const ar = Math.abs(w / h - 1);
            if (ar > 0.06) {
              return resolve({ ok: false, message: `Photo should be square (approx 600×600 px).` });
            }
            return resolve({ ok: true });
          } else {
            // signature: width between 300 - 600, height between 100 - 300, ensure ratio roughly >= 2.0? keep loose
            if (w < 300 || w > 600 || h < 100 || h > 300) {
              return resolve({
                ok: false,
                message: `Signature must be between 300×100 px and 600×300 px.`,
              });
            }
            return resolve({ ok: true });
          }
        };
        // If image cannot load
        img.onerror = () => {
          return resolve({ ok: false, message: "Unable to read image dimensions." });
        };
        img.src = String(reader.result);
      };
      reader.onerror = () => {
        return resolve({ ok: false, message: "Unable to read file." });
      };
      reader.readAsDataURL(file);
    });

  const handleFileChange =
    (kind: "photo" | "signature") =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      const file = files && files.length ? files[0] : null;

      // clear previous error for this field
      clearErrors(kind === "photo" ? "photo" : "signature");

      const { ok, message } = await validateImageFile(file, kind);
      if (!ok) {
        setError(kind === "photo" ? "photo" : "signature", {
          type: "manual",
          message,
        });
        // clear preview
        if (kind === "photo") setPhotoPreview(null);
        else setSignaturePreview(null);
        return;
      }

      // set preview
      const url = file ? URL.createObjectURL(file) : null;
      if (kind === "photo") setPhotoPreview(url);
      else setSignaturePreview(url);

      // clear errors
      clearErrors(kind === "photo" ? "photo" : "signature");
    };

  const submit = async (data: FormValues) => {
    // final validation pass (in case user bypassed onChange)
    const photoFile = data.photo && data.photo.length ? data.photo[0] : null;
    const signatureFile = data.signature && data.signature.length ? data.signature[0] : null;

    // validate both
    const vPhoto = await validateImageFile(photoFile, "photo");
    if (!vPhoto.ok) {
      setError("photo", { type: "manual", message: vPhoto.message });
      return;
    }
    const vSig = await validateImageFile(signatureFile, "signature");
    if (!vSig.ok) {
      setError("signature", { type: "manual", message: vSig.message });
      return;
    }

    // Everything ok — call onNext with normalized File objects
    const normalized = {
      photo: photoFile ?? null,
      signature: signatureFile ?? null,
    };
    console.log("Photo & Signature ready:", normalized);
    onNext?.(normalized);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="lg" fontWeight={600}>
          Upload Photo & Signature
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          {/* Photo block */}
          <Box>
            <FormControl isInvalid={!!errors.photo}>
              <FormLabel>Photograph (2×2 in — approx 600×600 px) *</FormLabel>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("photo")}
                onChange={handleFileChange("photo")}
              />
              <FormErrorMessage>{(errors.photo as any)?.message}</FormErrorMessage>
            </FormControl>

            <Text fontSize="sm" color="gray.600" mt={2}>
              Accepts JPG/JPEG/PNG. Max 150 KB. Recommended 600×600 px.
            </Text>

            <Box mt={3} borderRadius="8px" overflow="hidden" border="1px dashed" borderColor="gray.200" p={2}>
              {photoPreview ? (
                <Image src={photoPreview} alt="Photo preview" maxH="220px" objectFit="contain" />
              ) : (
                <Flex align="center" justify="center" minH="140px">
                  <Text color="gray.500">No photo selected</Text>
                </Flex>
              )}
            </Box>
          </Box>

          {/* Signature block */}
          <Box>
            <FormControl isInvalid={!!errors.signature}>
              <FormLabel>Signature (between 300×100 and 600×300 px) *</FormLabel>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("signature")}
                onChange={handleFileChange("signature")}
              />
              <FormErrorMessage>{(errors.signature as any)?.message}</FormErrorMessage>
            </FormControl>

            <Text fontSize="sm" color="gray.600" mt={2}>
              Accepts JPG/JPEG/PNG. Max 150 KB. Signature should be clear on white background.
            </Text>

            <Box mt={3} borderRadius="8px" overflow="hidden" border="1px dashed" borderColor="gray.200" p={2}>
              {signaturePreview ? (
                <Image src={signaturePreview} alt="Signature preview" maxH="120px" objectFit="contain" />
              ) : (
                <Flex align="center" justify="center" minH="100px">
                  <Text color="gray.500">No signature selected</Text>
                </Flex>
              )}
            </Box>
          </Box>
        </Grid>

        <Flex justify="space-between" mt={2}>
          <Button variant="ghost">Previous</Button>
          <Button colorScheme="brand" type="submit">
            Save & Next
          </Button>
        </Flex>
      </Stack>

      {/* Helpful developer note with local PDF path (we'll transform it to URL on your side if needed) */}
      <Box mt={4} fontSize="sm" color="gray.600">
        Guidance & design reference: <code>/mnt/data/Photo Sign.pdf</code>. :contentReference[oaicite:2]{index=2}
      </Box>
    </Box>
  );
}
