"use client";
import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Input,
  Textarea,
  Button,
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
 * See: /mnt/data/Reservation Details.pdf
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

// Helper component for radio groups
function RadioGroup({ options, value, onChange, error }: any) {
  return (
    <Box>
      <HStack gap={6}>
        {options.map((opt: any) => (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input
              type="radio"
              name={opt.name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
            />
            {opt.label}
          </label>
        ))}
      </HStack>
      {error && <Text color="red.500" fontSize="sm" mt={1}>{error}</Text>}
    </Box>
  );
}

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
            <select {...register("domicileType")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
              <option value="">Select domicile</option>
              <option value="homeState">Home State</option>
              <option value="otherState">Other State</option>
              <option value="localDistrict">Local / District</option>
              <option value="permanent">Permanent</option>
              <option value="temporary">Temporary</option>
              <option value="indianNational">Indian National</option>
            </select>
            <FormErrorMessage>{errors.domicileType?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.domicileState}>
            <FormLabel>Domicile State *</FormLabel>
            <select {...register("domicileState")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Gujarat">Gujarat</option>
            </select>
            <FormErrorMessage>{errors.domicileState?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.category}>
            <FormLabel>Category *</FormLabel>
            <select {...register("category")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
              <option value="">Select Category</option>
              <option value="GEN">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="EWS">EWS</option>
              <option value="Other">Other</option>
            </select>
            <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
          <FormControl isInvalid={!!errors.religion}>
            <FormLabel>Religion *</FormLabel>
            <select {...register("religion")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Other">Other</option>
            </select>
            <FormErrorMessage>{errors.religion?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.caste}>
            <FormLabel>Caste *</FormLabel>
            <Input placeholder="Select/Enter Caste" {...register("caste")} />
            <FormErrorMessage>{errors.caste?.message}</FormErrorMessage>
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you have a caste certificate?</FormLabel>
            <Controller
              name="casteCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "casteCertificate" },
                    { value: "no", label: "No", name: "casteCertificate" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.casteCertificate?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you have a NCL certificate?</FormLabel>
            <Controller
              name="nclCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "nclCertificate" },
                    { value: "no", label: "No", name: "nclCertificate" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.nclCertificate?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you have an EWS certificate?</FormLabel>
            <Controller
              name="ewsCertificate"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "ewsCertificate" },
                    { value: "no", label: "No", name: "ewsCertificate" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.ewsCertificate?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you have caste validity?</FormLabel>
            <Controller
              name="casteValidity"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "casteValidity" },
                    { value: "no", label: "No", name: "casteValidity" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.casteValidity?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you have caste validity receipt?</FormLabel>
            <Controller
              name="casteValidityReceipt"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "casteValidityReceipt" },
                    { value: "no", label: "No", name: "casteValidityReceipt" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.casteValidityReceipt?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Are you an orphan?</FormLabel>
            <Controller
              name="orphan"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "orphan" },
                    { value: "no", label: "No", name: "orphan" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.orphan?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <FormControl isInvalid={!!errors.physicallyDisabled}>
          <FormLabel>Are you physically disabled?</FormLabel>
          <Controller
            name="physicallyDisabled"
            control={control}
            render={({ field }) => (
              <RadioGroup
                options={[
                  { value: "yes", label: "Yes", name: "physicallyDisabled" },
                  { value: "no", label: "No", name: "physicallyDisabled" },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.physicallyDisabled?.message}
              />
            )}
          />
        </FormControl>

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

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>
              Are you a child of Defense Personnel/Ex Servicemen?
            </FormLabel>
            <Controller
              name="defenseChild"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "defenseChild" },
                    { value: "no", label: "No", name: "defenseChild" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.defenseChild?.message}
                />
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
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "freedomFighter" },
                    { value: "no", label: "No", name: "freedomFighter" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.freedomFighter?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>
            Has your family been displaced due to a govt project?
          </FormLabel>
          <Controller
            name="displacedDueToProject"
            control={control}
            render={({ field }) => (
              <RadioGroup
                options={[
                  { value: "yes", label: "Yes", name: "displacedDueToProject" },
                  { value: "no", label: "No", name: "displacedDueToProject" },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.displacedDueToProject?.message}
              />
            )}
          />
        </FormControl>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>
              Do you belong to the Sports category (Sportsperson)?
            </FormLabel>
            <Controller
              name="sportsCategory"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "sportsCategory" },
                    { value: "no", label: "No", name: "sportsCategory" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.sportsCategory?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Are you an NCC student/cadet?</FormLabel>
            <Controller
              name="ncc"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "ncc" },
                    { value: "no", label: "No", name: "ncc" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.ncc?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel>Are you a member of NSS?</FormLabel>
          <Controller
            name="nss"
            control={control}
            render={({ field }) => (
              <RadioGroup
                options={[
                  { value: "yes", label: "Yes", name: "nss" },
                  { value: "no", label: "No", name: "nss" },
                ]}
                value={field.value}
                onChange={field.onChange}
                error={errors.nss?.message}
              />
            )}
          />
        </FormControl>

        {sports === "yes" && (
          <FormControl>
            <FormLabel>Please provide details</FormLabel>
            <Textarea
              placeholder="Sports details (achievements, level, year, etc.)"
              {...register("sportsDetails")}
            />
          </FormControl>
        )}

        <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
          <FormControl>
            <FormLabel>Do you belong to an agriculture-based family?</FormLabel>
            <Controller
              name="agricultureFamily"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "agricultureFamily" },
                    { value: "no", label: "No", name: "agricultureFamily" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.agricultureFamily?.message}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Do you belong to any 'Minority' community?</FormLabel>
            <Controller
              name="minorityCommunity"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  options={[
                    { value: "yes", label: "Yes", name: "minorityCommunity" },
                    { value: "no", label: "No", name: "minorityCommunity" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.minorityCommunity?.message}
                />
              )}
            />
          </FormControl>
        </Grid>

        {minority === "yes" && (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
            <FormControl>
              <FormLabel>Religious Minority</FormLabel>
              <select {...register("religiousMinority")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
                <option value="">Select</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
              </select>
            </FormControl>

            <FormControl>
              <FormLabel>Linguistic Minority</FormLabel>
              <select {...register("linguisticMinority")} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
                <option value="">Select</option>
                <option value="Marathi">Marathi</option>
                <option value="Urdu">Urdu</option>
                <option value="Tamil">Tamil</option>
                <option value="Other">Other</option>
              </select>
            </FormControl>
          </Grid>
        )}

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
