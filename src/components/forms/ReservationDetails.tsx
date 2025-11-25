"use client";
import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Select,
  Input,
  Textarea,
  Button,
  Radio,
  RadioGroup,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Reservation details schema
 * Fields based on Reservation Details PDF (Domicile, Category, certificates, PWD, orphan, sports, NCC, NSS, minority, etc).
 * See: /mnt/data/Reservation Details.pdf. :contentReference[oaicite:1]{index=1}
 */
const ReservationSchema = z.object({
  domicileType: z.string().min(1, "Select domicile type"),
  domicileState: z.string().min(1, "Select domicile state"),
  category: z.string().min(1, "Select category"),
  religion: z.string().min(1, "Select religion"),
  caste: z.string().min(1, "Select caste"),
  casteCertificate: z.enum(["yes", "no"]).optional(),
  nclCertificate: z.enum(["yes", "no"]).optional(),
  ewsCertificate: z.enum(["yes", "no"]).optional(),
  casteValidity: z.enum(["yes", "no"]).optional(),
  casteValidityReceipt: z.enum(["yes", "no"]).optional(),

  orphan: z.enum(["yes", "no"]).optional(),
  physicallyDisabled: z.enum(["yes", "no"]).optional(),
  disabilityDetails: z.string().optional(),

  defenseChild: z.enum(["yes", "no"]).optional(),
  freedomFighter: z.enum(["yes", "no"]).optional(),
  displacedDueToProject: z.enum(["yes", "no"]).optional(),

  sportsCategory: z.enum(["yes", "no"]).optional(),
  sportsDetails: z.string().optional(),

  ncc: z.enum(["yes", "no"]).optional(),
  nss: z.enum(["yes", "no"]).optional(),

  agricultureFamily: z.enum(["yes", "no"]).optional(),
  minorityCommunity: z.enum(["yes", "no"]).optional(),
  religiousMinority: z.string().optional(),
  linguisticMinority: z.string().optional(),
});

type ReservationForm = z.infer<typeof ReservationSchema>;

export default function ReservationDetails({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<ReservationForm>;
  onNext?: (data: ReservationForm) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationForm>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: defaultValues || {
      domicileType: "",
      domicileState: "",
      category: "",
      religion: "",
      caste: "",
      casteCertificate: "no",
      nclCertificate: "no",
      ewsCertificate: "no",
      casteValidity: "no",
      casteValidityReceipt: "no",
      orphan: "no",
      physicallyDisabled: "no",
      disabilityDetails: "",
      defenseChild: "no",
      freedomFighter: "no",
      displacedDueToProject: "no",
      sportsCategory: "no",
      sportsDetails: "",
      ncc: "no",
      nss: "no",
      agricultureFamily: "no",
      minorityCommunity: "no",
      religiousMinority: "",
      linguisticMinority: "",
    },
  });

  // watch some conditionals
  const minority = watch("minorityCommunity");
  const physDisabled = watch("physicallyDisabled");
  const sports = watch("sportsCategory");

  useEffect(() => {
    // if minority toggled off, clear the related fields (small UX convenience)
    if (minority !== "yes") {
      // no direct setValue here to avoid adding dependency on setValue; consumer can reset/save as needed
    }
  }, [minority]);

  const submit = (data: ReservationForm) => {
    console.log("Reservation saved:", data);
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
        <Text fontSize="lg" fontWeight={600}>
          Reservation Details
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.domicileType}>
            <FormLabel>Domicile Type *</FormLabel>
            <Select {...register("domicileType")} placeholder="Select domicile">
              <option value="homeState">Home State</option>
              <option value="otherState">Other State</option>
              <option value="localDistrict">Local / District</option>
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
              <option value="indianNational">Indian National</option>
            </Select>
            <FormErrorMessage>{errors.domicileType?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.domicileState}>
            <FormLabel>Domicile State *</FormLabel>
            <Select {...register("domicileState")} placeholder="Select State">
              {/* Replace with actual state list or API */}
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
            </Select>
            <FormErrorMessage>{errors.domicileState?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.category}>
            <FormLabel>Category *</FormLabel>
            <Select {...register("category")} placeholder="Select Category">
              <option value="GEN">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="EWS">EWS</option>
              <option value="Other">Other</option>
            </Select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.religion}>
            <FormLabel>Religion *</FormLabel>
            <Select {...register("religion")} placeholder="Select Religion">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Other</option>
            </Select>
            <FormErrorMessage>{errors.religion?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.caste}>
            <FormLabel>Caste *</FormLabel>
            <Input placeholder="Select/Enter Caste" {...register("caste")} />
            <FormErrorMessage>{errors.caste?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Do you have a caste certificate?</FormLabel>
            <Controller
              name="casteCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you have a NCL certificate?</FormLabel>
            <Controller
              name="nclCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you have an EWS certificate?</FormLabel>
            <Controller
              name="ewsCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you have caste validity?</FormLabel>
            <Controller
              name="casteValidity"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you have caste validity receipt?</FormLabel>
            <Controller
              name="casteValidityReceipt"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Are you an orphan?</FormLabel>
            <Controller
              name="orphan"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl isInvalid={!!errors.physicallyDisabled}>
            <FormLabel>Are you physically disabled?</FormLabel>
            <Controller
              name="physicallyDisabled"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors.physicallyDisabled?.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>

        {/* conditional details for PWD */}
        {physDisabled === "yes" && (
          <FormControl isInvalid={!!errors.disabilityDetails}>
            <FormLabel>Please provide details</FormLabel>
            <Textarea
              placeholder="Provide disability details"
              {...register("disabilityDetails")}
            />
            <FormErrorMessage>
              {errors.disabilityDetails?.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>
              Are you a child of Defense Personnel/Ex Servicemen?
            </FormLabel>
            <Controller
              name="defenseChild"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              Is your parent/grandparent a recognized Freedom Fighter?
            </FormLabel>
            <Controller
              name="freedomFighter"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>
              Has your family been displaced due to a govt project?
            </FormLabel>
            <Controller
              name="displacedDueToProject"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>
              Do you belong to the Sports category (Sportsperson)?
            </FormLabel>
            <Controller
              name="sportsCategory"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Are you an NCC student/cadet?</FormLabel>
            <Controller
              name="ncc"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Are you a member of NSS?</FormLabel>
            <Controller
              name="nss"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </Grid>

        {/* sports details conditional */}
        {sports === "yes" && (
          <FormControl>
            <FormLabel>Please provide details</FormLabel>
            <Textarea
              placeholder="Sports details (achievements, level, year, etc.)"
              {...register("sportsDetails")}
            />
          </FormControl>
        )}

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you belong to an agriculture-based family?</FormLabel>
            <Controller
              name="agricultureFamily"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you belong to any 'Minority' community?</FormLabel>
            <Controller
              name="minorityCommunity"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <HStack gap={6}>
                    <Radio value="yes">Yes</Radio>
                    <Radio value="no">No</Radio>
                  </HStack>
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* conditional: show select for minority types */}
          {minority === "yes" && (
            <>
              <FormControl>
                <FormLabel>Religious Minority</FormLabel>
                <Select placeholder="Select" {...register("religiousMinority")}>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Linguistic Minority</FormLabel>
                <Select
                  placeholder="Select"
                  {...register("linguisticMinority")}
                >
                  <option>Marathi</option>
                  <option>Urdu</option>
                  <option>Tamil</option>
                  <option>Other</option>
                </Select>
              </FormControl>
            </>
          )}
        </Grid>

        {/* Footer */}
        <HStack justifyContent="space-between" pt={2}>
          <Button variant="ghost">Previous</Button>
          <Button type="submit" colorScheme="brand">
            Save & Next
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
