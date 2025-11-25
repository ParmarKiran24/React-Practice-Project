"use client";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  Select,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddressSchema = z.object({
  current: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    tehsil: z.string().optional(),
    village: z.string().min(1, "Village/City required"),
    address1: z.string().min(3, "Address 1 is required"),
    address2: z.string().optional(),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pin code"),
  }),
  sameAsCurrent: z.boolean().optional(),
  permanent: z
    .object({
      country: z.string().min(1, "Country is required"),
      state: z.string().min(1, "State is required"),
      district: z.string().min(1, "District is required"),
      tehsil: z.string().optional(),
      village: z.string().min(1, "Village/City required"),
      address1: z.string().min(3, "Address 1 is required"),
      address2: z.string().optional(),
      pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pin code"),
    })
    .optional(),
});

type AddressForm = z.infer<typeof AddressSchema>;

export default function AddressDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<AddressForm>;
  onNext?: (data: AddressForm) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(AddressSchema),
    defaultValues: defaultValues ?? {
      current: {
        country: "",
        state: "",
        district: "",
        tehsil: "",
        village: "",
        address1: "",
        address2: "",
        pincode: "",
      },
      sameAsCurrent: false,
      permanent: {
        country: "",
        state: "",
        district: "",
        tehsil: "",
        village: "",
        address1: "",
        address2: "",
        pincode: "",
      },
    },
  });

  const same = watch("sameAsCurrent");
  const curr = watch("current");

  // copy current → permanent when same toggle enabled
  useEffect(() => {
    if (same) {
      setValue("permanent", { ...curr });
    }
  }, [same, curr, setValue]);

  const submit = (data: AddressForm) => {
    if (onNext) onNext(data);
    else console.log("Address saved:", data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(submit)} maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Box>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <FormControl isInvalid={!!errors?.current?.address1}>
              <FormLabel>Current Address 1 *</FormLabel>
              <Textarea rows={2} {...register("current.address1")} />
              <FormErrorMessage>
                {errors?.current?.address1?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Current Address 2</FormLabel>
              <Textarea rows={2} {...register("current.address2")} />
            </FormControl>
          </Grid>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
            gap={4}
            mt={3}
          >
            <FormControl isInvalid={!!errors?.current?.country}>
              <FormLabel>Country *</FormLabel>
              <Input {...register("current.country")} placeholder="India" />
              <FormErrorMessage>
                {errors?.current?.country?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.current?.state}>
              <FormLabel>State *</FormLabel>
              <Input {...register("current.state")} />
              <FormErrorMessage>
                {errors?.current?.state?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.current?.district}>
              <FormLabel>District *</FormLabel>
              <Input {...register("current.district")} />
              <FormErrorMessage>
                {errors?.current?.district?.message}
              </FormErrorMessage>
            </FormControl>
          </Grid>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
            gap={4}
            mt={3}
          >
            <FormControl>
              <FormLabel>Tehsil</FormLabel>
              <Input {...register("current.tehsil")} />
            </FormControl>
            <FormControl isInvalid={!!errors?.current?.village}>
              <FormLabel>Village / City *</FormLabel>
              <Input {...register("current.village")} />
              <FormErrorMessage>
                {errors?.current?.village?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.current?.pincode}>
              <FormLabel>Pincode *</FormLabel>
              <Input {...register("current.pincode")} maxLength={6} />
              <FormErrorMessage>
                {errors?.current?.pincode?.message}
              </FormErrorMessage>
            </FormControl>
          </Grid>
        </Box>

        <Box borderTop="1px dashed" pt={4}>
          <Controller
            control={control}
            name="sameAsCurrent"
            render={({ field }) => (
              <Checkbox {...field}>Permanent Address same as Current</Checkbox>
            )}
          />

          {/* Permanent block */}
          <Box
            mt={4}
            opacity={same ? 0.7 : 1}
            pointerEvents={same ? "none" : "auto"}
          >
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              <FormControl isInvalid={!!errors?.permanent?.address1}>
                <FormLabel>Permanent Address 1 *</FormLabel>
                <Textarea rows={2} {...register("permanent.address1")} />
                <FormErrorMessage>
                  {errors?.permanent?.address1?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Permanent Address 2</FormLabel>
                <Textarea rows={2} {...register("permanent.address2")} />
              </FormControl>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
              gap={4}
              mt={3}
            >
              <FormControl isInvalid={!!errors?.permanent?.country}>
                <FormLabel>Country *</FormLabel>
                <Input {...register("permanent.country")} />
                <FormErrorMessage>
                  {errors?.permanent?.country?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.permanent?.state}>
                <FormLabel>State *</FormLabel>
                <Input {...register("permanent.state")} />
                <FormErrorMessage>
                  {errors?.permanent?.state?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.permanent?.district}>
                <FormLabel>District *</FormLabel>
                <Input {...register("permanent.district")} />
                <FormErrorMessage>
                  {errors?.permanent?.district?.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
              gap={4}
              mt={3}
            >
              <FormControl>
                <FormLabel>Tehsil</FormLabel>
                <Input {...register("permanent.tehsil")} />
              </FormControl>
              <FormControl isInvalid={!!errors?.permanent?.village}>
                <FormLabel>Village / City *</FormLabel>
                <Input {...register("permanent.village")} />
                <FormErrorMessage>
                  {errors?.permanent?.village?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.permanent?.pincode}>
                <FormLabel>Pincode *</FormLabel>
                <Input {...register("permanent.pincode")} maxLength={6} />
                <FormErrorMessage>
                  {errors?.permanent?.pincode?.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
          </Box>
        </Box>

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
