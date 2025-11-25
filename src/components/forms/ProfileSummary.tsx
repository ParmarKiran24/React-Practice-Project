"use client";

import {
  Box,
  Text,
  Stack,
  Grid,
  Flex,
  Divider,
  Button,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardHeader,
  CardBody,
  Link,
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
    personal,
    address,
    reservation,
    qualification,
    bank,
    photo,
    signature,
    documents,
  } = data;

  return (
    <Box maxW="1100px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>
          Profile Summary
        </Text>

        {/* ------------------------ PERSONAL ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>
                Personal Details
              </Text>
              <Button size="sm" onClick={() => onEditSection?.("personal")}>
                Edit
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
              <Field label="Full Name" value={`${personal.firstName} ${personal.middleName ?? ""} ${personal.lastName}`} />
              <Field label="Gender" value={personal.gender} />
              <Field label="Date of Birth" value={personal.dob} />
              <Field label="Blood Group" value={personal.bloodGroup} />
              <Field label="Father's Name" value={personal.fatherName} />
              <Field label="Mother's Name" value={personal.motherName} />
              <Field label="Email" value={personal.email} />
              <Field label="Mobile" value={personal.mobile} />
              <Field label="WhatsApp" value={personal.whatsapp} />
              <Field label="Aadhar" value={personal.aadhar} />
            </Grid>
          </CardBody>
        </Card>

        {/* ------------------------ ADDRESS ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>
                Address Details
              </Text>
              <Button size="sm" onClick={() => onEditSection?.("address")}>
                Edit
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontWeight={600}>Current Address</Text>
            <Grid templateColumns="repeat(3,1fr)" gap={4} mt={2}>
              <Field label="Address 1" value={address.current.address1} />
              <Field label="Address 2" value={address.current.address2} />
              <Field label="Village/City" value={address.current.village} />
              <Field label="District" value={address.current.district} />
              <Field label="State" value={address.current.state} />
              <Field label="Country" value={address.current.country} />
              <Field label="Pincode" value={address.current.pincode} />
            </Grid>

            <Divider my={4} />

            <Text fontWeight={600}>Permanent Address</Text>
            <Grid templateColumns="repeat(3,1fr)" gap={4} mt={2}>
              <Field label="Address 1" value={address.permanent.address1} />
              <Field label="Address 2" value={address.permanent.address2} />
              <Field label="Village/City" value={address.permanent.village} />
              <Field label="District" value={address.permanent.district} />
              <Field label="State" value={address.permanent.state} />
              <Field label="Country" value={address.permanent.country} />
              <Field label="Pincode" value={address.permanent.pincode} />
            </Grid>
          </CardBody>
        </Card>

        {/* ------------------------ RESERVATION ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>Reservation Details</Text>
              <Button size="sm" onClick={() => onEditSection?.("reservation")}>Edit</Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={4}>
              {Object.entries(reservation).map(([key, val]) => (
                <Field key={key} label={formatLabel(key)} value={val?.toString() ?? "-"} />
              ))}
            </Grid>
          </CardBody>
        </Card>

        {/* ------------------------ QUALIFICATION ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>Qualification Details</Text>
              <Button size="sm" onClick={() => onEditSection?.("qualification")}>Edit</Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th>Course</Th>
                  <Th>Board/University</Th>
                  <Th>Result</Th>
                  <Th>Percentage</Th>
                  <Th>Passing</Th>
                </Tr>
              </Thead>
              <Tbody>
                {qualification.map((q: any, i: number) => (
                  <Tr key={i}>
                    <Td>{q.qualificationType}</Td>
                    <Td>{q.qualificationName}</Td>
                    <Td>{q.boardUniversity}</Td>
                    <Td>{q.resultType}</Td>
                    <Td>{q.percentage}</Td>
                    <Td>{q.passingMonthYear}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {/* ------------------------ BANK ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>Bank Details</Text>
              <Button size="sm" onClick={() => onEditSection?.("bank")}>Edit</Button>
            </Flex>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }} gap={4}>
              <Field label="Bank Name" value={bank.bankName} />
              <Field label="Account Holder" value={bank.accountHolderName} />
              <Field label="Branch" value={bank.branchName} />
              <Field label="IFSC" value={bank.ifsc} />
              <Field label="Account No" value={bank.accountNumber} />
            </Grid>
          </CardBody>
        </Card>

        {/* ------------------------ PHOTO & SIGNATURE ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>Photo & Signature</Text>
              <Button size="sm" onClick={() => onEditSection?.("photo")}>Edit</Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
              <Box>
                <Text mb={2}>Photo</Text>
                <Image
                  src={photo?.url ?? URL.createObjectURL(photo)}
                  alt="Photo"
                  maxH="200px"
                  borderRadius="md"
                  objectFit="contain"
                />
              </Box>

              <Box>
                <Text mb={2}>Signature</Text>
                <Image
                  src={signature?.url ?? URL.createObjectURL(signature)}
                  alt="Signature"
                  maxH="100px"
                  borderRadius="md"
                  objectFit="contain"
                />
              </Box>
            </Grid>
          </CardBody>
        </Card>

        {/* ------------------------ DOCUMENT LIST ------------------------ */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight={600}>Uploaded Documents</Text>
              <Button size="sm" onClick={() => onEditSection?.("documents")}>Edit</Button>
            </Flex>
          </CardHeader>

          <CardBody>
            <Stack gap={3}>
              {documents.map((d: any, i: number) => (
                <Flex
                  key={i}
                  p={3}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  justify="space-between"
                  align="center"
                >
                  <Text>{d.name}</Text>
                  <Link
                    color="brand.500"
                    href={d.url ?? URL.createObjectURL(d.file)}
                    isExternal
                  >
                    View
                  </Link>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>

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
