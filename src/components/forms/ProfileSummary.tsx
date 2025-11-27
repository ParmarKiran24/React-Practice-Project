"use client";

import {
  Box,
  Text,
  Stack,
  Grid,
  Flex,
  Button,
  Image,
  Link,
  VStack,
  HStack,
} from "@chakra-ui/react";
export default function ProfileSummary({
  data,
  onSubmit,
  onEditSection,
}: {
  data: any; // full profile data from DB or context
  onSubmit?: () => void;
  onEditSection?: (section: string) => void;
}) {
  const {
    personal = {},
    address = { current: {}, permanent: {} },
    reservation = {},
    qualification = [],
    bank = {},
    photo,
    signature,
    documents = [],
  } = data || {};

  return (
    <Box maxW="1100px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>
          Profile Summary
        </Text>

        {/* ------------------------ PERSONAL ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>
              Personal Details
            </Text>
            <Button size="sm" onClick={() => onEditSection?.("personal")}>
              Edit
            </Button>
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
            <Field label="Full Name" value={`${personal?.firstName || ''} ${personal?.middleName || ''} ${personal?.lastName || ''}`} />
            <Field label="Gender" value={personal?.gender} />
            <Field label="Date of Birth" value={personal?.dob} />
            <Field label="Blood Group" value={personal?.bloodGroup} />
            <Field label="Father's Name" value={personal?.fatherName} />
            <Field label="Mother's Name" value={personal?.motherName} />
            <Field label="Email" value={personal?.email} />
            <Field label="Mobile" value={personal?.mobile} />
            <Field label="WhatsApp" value={personal?.whatsapp} />
            <Field label="Aadhar" value={personal?.aadhar} />
          </Grid>
        </Box>

        {/* ------------------------ ADDRESS ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>
              Address Details
            </Text>
            <Button size="sm" onClick={() => onEditSection?.("address")}>
              Edit
            </Button>
          </Flex>
          <Stack gap={4}>
            <Box>
              <Text fontWeight={600} mb={2}>Current Address</Text>
              <Grid templateColumns="repeat(3,1fr)" gap={4}>
                <Field label="Address 1" value={address?.current?.address1} />
                <Field label="Address 2" value={address?.current?.address2} />
                <Field label="Village/City" value={address?.current?.village} />
                <Field label="District" value={address?.current?.district} />
                <Field label="State" value={address?.current?.state} />
                <Field label="Country" value={address?.current?.country} />
                <Field label="Pincode" value={address?.current?.pincode} />
              </Grid>
            </Box>
            <Box as="hr" my={2} />
            <Box>
              <Text fontWeight={600} mb={2}>Permanent Address</Text>
              <Grid templateColumns="repeat(3,1fr)" gap={4}>
                <Field label="Address 1" value={address?.permanent?.address1} />
                <Field label="Address 2" value={address?.permanent?.address2} />
                <Field label="Village/City" value={address?.permanent?.village} />
                <Field label="District" value={address?.permanent?.district} />
                <Field label="State" value={address?.permanent?.state} />
                <Field label="Country" value={address?.permanent?.country} />
                <Field label="Pincode" value={address?.permanent?.pincode} />
              </Grid>
            </Box>
          </Stack>
        </Box>

        {/* ------------------------ RESERVATION ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>Reservation Details</Text>
            <Button size="sm" onClick={() => onEditSection?.("reservation")}>Edit</Button>
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
            {Object.entries(reservation || {}).map(([key, val]) => (
              <Field key={key} label={formatLabel(key)} value={val?.toString() ?? "-"} />
            ))}
          </Grid>
        </Box>

        {/* ------------------------ QUALIFICATION ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>Qualification Details</Text>
            <Button size="sm" onClick={() => onEditSection?.("qualification")}>Edit</Button>
          </Flex>
          <Box overflowX="auto">
            <VStack gap={0} align="stretch">
              <HStack gap={0} bg="gray.50" p={3} fontWeight={600} fontSize="sm">
                <Box flex="1">Type</Box>
                <Box flex="1">Course</Box>
                <Box flex="1">Board/University</Box>
                <Box flex="1">Result</Box>
                <Box flex="1">Percentage</Box>
                <Box flex="1">Passing</Box>
              </HStack>
              {(qualification || []).map((q: any, i: number) => (
                <HStack key={i} gap={0} p={3} borderTopWidth="1px" borderTopColor="gray.200" fontSize="sm">
                  <Box flex="1">{q?.qualificationType || '-'}</Box>
                  <Box flex="1">{q?.qualificationName || '-'}</Box>
                  <Box flex="1">{q?.boardUniversity || '-'}</Box>
                  <Box flex="1">{q?.resultType || '-'}</Box>
                  <Box flex="1">{q?.percentage || '-'}</Box>
                  <Box flex="1">{q?.passingMonthYear || '-'}</Box>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>

        {/* ------------------------ BANK ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>Bank Details</Text>
            <Button size="sm" onClick={() => onEditSection?.("bank")}>Edit</Button>
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
            <Field label="Bank Name" value={bank?.bankName} />
            <Field label="Account Holder" value={bank?.accountHolderName} />
            <Field label="Branch" value={bank?.branchName} />
            <Field label="IFSC" value={bank?.ifsc} />
            <Field label="Account No" value={bank?.accountNumber} />
          </Grid>
        </Box>

        {/* ------------------------ PHOTO & SIGNATURE ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>Photo & Signature</Text>
            <Button size="sm" onClick={() => onEditSection?.("photo")}>Edit</Button>
          </Flex>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
            <Box>
              <Text mb={2}>Photo</Text>
              {photo ? (
                <Image
                  src={typeof photo === 'string' ? photo : (photo?.url ?? (photo instanceof File ? URL.createObjectURL(photo) : '/placeholder.png'))}
                  alt="Photo"
                  maxH="200px"
                  borderRadius="md"
                  objectFit="contain"
                />
              ) : (
                <Text color="gray.500">No photo uploaded</Text>
              )}
            </Box>
            <Box>
              <Text mb={2}>Signature</Text>
              {signature ? (
                <Image
                  src={typeof signature === 'string' ? signature : (signature?.url ?? (signature instanceof File ? URL.createObjectURL(signature) : '/placeholder.png'))}
                  alt="Signature"
                  maxH="100px"
                  borderRadius="md"
                  objectFit="contain"
                />
              ) : (
                <Text color="gray.500">No signature uploaded</Text>
              )}
            </Box>
          </Grid>
        </Box>

        {/* ------------------------ DOCUMENT LIST ------------------------ */}
        <Box border="1px solid" borderColor="gray.200" borderRadius="md" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg" fontWeight={600}>Uploaded Documents</Text>
            <Button size="sm" onClick={() => onEditSection?.("documents")}>Edit</Button>
          </Flex>
          <Stack gap={3}>
            {(documents || []).map((d: any, i: number) => (
              <Flex
                key={i}
                p={3}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                justify="space-between"
                align="center"
              >
                <Text>{d?.name || 'Document'}</Text>
                <Link
                  color="brand.500"
                  href={d?.url ?? (d?.file ? URL.createObjectURL(d.file) : '#')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </Link>
              </Flex>
            ))}
          </Stack>
        </Box>

        {/* ------------------------ FINAL SUBMIT ------------------------ */}
        <Flex justify="space-between">
          <Button variant="outline" onClick={() => onEditSection?.("previous")}>
            Previous
          </Button>

          <Button colorScheme="brand" size="lg" onClick={onSubmit}>
            Submit Application
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

/* ---------- Small helper field renderer ---------- */
function Field({ label, value }: { label: string; value: any }) {
  return (
    <Box>
      <Text fontSize="sm" color="gray.600">
        {label}
      </Text>
      <Text fontWeight={600}>{value || "-"}</Text>
    </Box>
  );
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
