"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Text,
  Input,
  Button,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PaymentSchema = z.object({
  method: z.enum(["upi", "card", "netbanking", "offline"]),
  // card fields
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),

  // netbanking
  bank: z.string().optional(),

  // UPI
  upiId: z.string().optional(),

  // offline proof
  offlineFile: z.any().optional(),
});

type PaymentForm = z.infer<typeof PaymentSchema>;

export default function Payment({
  amount = 500,
  applicationId = "APPL-0001",
  onPaid,
}: {
  amount?: number;
  applicationId?: string;
  onPaid?: (payload: { status: "paid" | "pending"; transactionId?: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PaymentForm>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      method: "upi",
      upiId: "",
      bank: "",
    },
  });

  const toast = useToast();
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const method = watch("method") as PaymentForm["method"];
  const [mockTxn, setMockTxn] = useState<string | null>(null);
  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "success" | "failed">(
    "idle"
  );

  // Simple UPI QR generator using google chart API (we produce UPI string and point to QR)
  const generateUpiQr = (upiId: string, name: string, amt: number) => {
    // UPI string
    const upiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
      name
    )}&am=${amt}&cu=INR&tn=${encodeURIComponent(`Application ${applicationId}`)}`;
    // google chart API for QR (you can switch to your QR generator)
    const qr = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(upiString)}`;
    return { upiString, qr };
  };

  const onSubmit = async (values: PaymentForm) => {
    // Mock payment flow — replace with real integration
    if (values.method === "upi") {
      if (!values.upiId) {
        toast({ title: "UPI ID required", status: "error" });
        return;
      }
      const { upiString, qr } = generateUpiQr(values.upiId, "Institute", amount);
      setQrUrl(qr);
      // create mock transaction id
      const txn = `TXN-UPI-${Date.now()}`;
      setMockTxn(txn);
      toast({ title: "UPI QR generated — scan to pay", status: "info" });
      // set verification state to idle — user must scan and then press Verify Payment
      setVerificationState("idle");
      return;
    }

    if (values.method === "card") {
      // Mock validation — in real flow tokenise card with gateway
      if (!values.cardNumber || !values.cardName || !values.cardExpiry || !values.cardCvv) {
        toast({ title: "Enter all card details", status: "error" });
        return;
      }
      // simulate gateway call
      try {
        setMockTxn(`TXN-CARD-${Date.now()}`);
        toast({ title: "Card processed (mock)", status: "success" });
        onPaid?.({ status: "paid", transactionId: mockTxn ?? `TXN-CARD-${Date.now()}` });
      } catch (err) {
        toast({ title: "Payment failed", status: "error" });
      }
      return;
    }

    if (values.method === "netbanking") {
      if (!values.bank) {
        toast({ title: "Select bank", status: "error" });
        return;
      }
      // In real flow redirect to bank or open gateway popup
      setMockTxn(`TXN-NB-${Date.now()}`);
      toast({ title: "Netbanking started (mock)", status: "info" });
      onPaid?.({ status: "pending", transactionId: mockTxn ?? `TXN-NB-${Date.now()}` });
      return;
    }

    if (values.method === "offline") {
      // If offline, require a proof file optionally
      toast({ title: "Save offline payment details and upload proof", status: "info" });
      setMockTxn(`TXN-OFF-${Date.now()}`);
      onPaid?.({ status: "pending", transactionId: mockTxn ?? `TXN-OFF-${Date.now()}` });
      return;
    }
  };

  const verifyUpiPayment = async () => {
    // Mock verification — usually you'd call server to verify via txn id / payment gateway webhook
    if (!mockTxn) {
      toast({ title: "No transaction to verify", status: "error" });
      return;
    }
    setVerificationState("verifying");
    // simulate server check
    setTimeout(() => {
      const succeeded = Math.random() > 0.15; // 85% chance success for demo
      if (succeeded) {
        setVerificationState("success");
        toast({ title: "Payment verified", status: "success" });
        onPaid?.({ status: "paid", transactionId: mockTxn });
      } else {
        setVerificationState("failed");
        toast({ title: "Payment not found — try again", status: "error" });
      }
    }, 1300);
  };

  return (
    <Box maxW="900px" mx="auto" p={4}>
      <Stack gap={6}>
        <Text fontSize="2xl" fontWeight={700}>
          Payment
        </Text>

        {/* Invoice */}
        <Box bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.100">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Application ID
              </Text>
              <Text fontWeight={700} fontSize="lg">
                {applicationId}
              </Text>

              <Text mt={3} fontSize="sm" color="gray.600">
                Amount Due
              </Text>
              <Text fontSize="2xl" fontWeight={800}>
                ₹{amount.toFixed(2)}
              </Text>
            </Box>

            <Box>
              <Text fontSize="sm" color="gray.600">
                Due Date
              </Text>
              <Text fontWeight={600}>7 days from now</Text>

              <Text mt={3} fontSize="sm" color="gray.600">
                Payment Status
              </Text>
              <Text fontWeight={600} color="orange.600">
                Pending
              </Text>
            </Box>
          </Grid>
        </Box>

        <Box as="hr" my={4} borderTop="1px solid" borderColor="gray.200" />

        {/* Payment method */}
        <Box bg="white" p={4} borderRadius="md" border="1px solid" borderColor="gray.100">
          <Text fontSize="lg" fontWeight={600} mb={3}>
            Choose Payment Method
          </Text>

          <Stack gap={4}>
            <FormControl>
              <FormLabel>Method</FormLabel>
              <HStack gap={6}>
                <Box>
                  <input type="radio" id="upi" value="upi" {...register("method")} />
                  <label htmlFor="upi">UPI</label>
                </Box>
                <Box>
                  <input type="radio" id="card" value="card" {...register("method")} />
                  <label htmlFor="card">Card</label>
                </Box>
                <Box>
                  <input type="radio" id="netbanking" value="netbanking" {...register("method")} />
                  <label htmlFor="netbanking">Netbanking</label>
                </Box>
                <Box>
                  <input type="radio" id="offline" value="offline" {...register("method")} />
                  <label htmlFor="offline">Offline / Bank Transfer</label>
                </Box>
              </HStack>
            </FormControl>

            {/* UPI */}
            {method === "upi" && (
              <Box>
                <FormControl isInvalid={!!errors.upiId}>
                  <FormLabel>Enter UPI ID (eg. yourid@bank)</FormLabel>
                  <Input placeholder="yourid@bank" {...register("upiId")} />
                  <FormErrorMessage>{(errors.upiId as any)?.message}</FormErrorMessage>
                </FormControl>

                <HStack mt={4} gap={6}>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    colorScheme="brand"
                    loading={isSubmitting}
                  >
                    Generate UPI QR
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      // Quick demo populate with common UPI id
                      (document.querySelector('input[name="upiId"]') as HTMLInputElement | null)?.focus();
                      (document.querySelector('input[name="upiId"]') as HTMLInputElement | null)?.setAttribute(
                        "value",
                        "yourid@upi"
                      );
                      toast({ title: "Sample UPI filled (demo)", status: "info" });
                    }}
                  >
                    Fill Demo UPI
                  </Button>
                </HStack>

                {qrUrl && (
                  <Box mt={4} border="1px dashed" p={4} borderRadius="md" textAlign="center">
                    <Text fontSize="sm" color="gray.600" mb={2}>
                      Scan this QR with your UPI app to pay
                    </Text>
                    <Image src={qrUrl} alt="UPI QR" mx="auto" maxW="220px" />
                    <Text mt={3} fontSize="sm">
                      Transaction ID: <Text as="span" fontWeight={700}>{mockTxn}</Text>
                    </Text>

                    <HStack mt={3} gap={3} justify="center">
                      <Button onClick={verifyUpiPayment} loading={verificationState === "verifying"}>
                        Verify Payment
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setQrUrl(null);
                        setMockTxn(null);
                        setVerificationState("idle");
                      }}>
                        Cancel
                      </Button>
                    </HStack>

                    {verificationState === "success" && (
                      <Text mt={2} color="green.600">Payment verified successfully.</Text>
                    )}
                    {verificationState === "failed" && (
                      <Text mt={2} color="red.600">Payment not found. Try again or contact support.</Text>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {/* Card */}
            {method === "card" && (
              <Box>
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
                  <FormControl isInvalid={!!errors.cardNumber}>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="4111 1111 1111 1111" maxLength={19} {...register("cardNumber")} />
                    <FormErrorMessage>{(errors.cardNumber as any)?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.cardName}>
                    <FormLabel>Name on Card</FormLabel>
                    <Input placeholder="Full name" {...register("cardName")} />
                    <FormErrorMessage>{(errors.cardName as any)?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.cardExpiry}>
                    <FormLabel>Expiry (MM/YY)</FormLabel>
                    <Input placeholder="08/28" {...register("cardExpiry")} />
                    <FormErrorMessage>{(errors.cardExpiry as any)?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.cardCvv}>
                    <FormLabel>CVV</FormLabel>
                    <Input placeholder="123" maxLength={4} {...register("cardCvv")} />
                    <FormErrorMessage>{(errors.cardCvv as any)?.message}</FormErrorMessage>
                  </FormControl>
                </Grid>

                <HStack mt={4}>
                  <Button colorScheme="brand" onClick={handleSubmit(onSubmit)}>
                    Pay ₹{amount.toFixed(2)}
                  </Button>
                  <Button variant="outline" onClick={() => toast({ title: "Card demo — no real charge", status: "info" })}>
                    Demo Card
                  </Button>
                </HStack>
              </Box>
            )}

            {/* Netbanking */}
            {method === "netbanking" && (
              <Box>
                <FormControl isInvalid={!!errors.bank}>
                  <FormLabel>Select Bank</FormLabel>
                  <select {...register("bank")}>
                    <option value="">Select bank</option>
                    <option value="SBI">State Bank of India</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="AXIS">Axis Bank</option>
                  </select>
                  <FormErrorMessage>{(errors.bank as any)?.message}</FormErrorMessage>
                </FormControl>

                <HStack mt={4}>
                  <Button colorScheme="brand" onClick={handleSubmit(onSubmit)}>
                    Pay via Netbanking
                  </Button>
                </HStack>
              </Box>
            )}

            {/* Offline */}
            {method === "offline" && (
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Please transfer the application fee to the following account and upload the payment proof (bank transfer screenshot or scanned challan).
                </Text>

                <Box bg="gray.50" p={3} borderRadius="md" border="1px solid" borderColor="gray.100">
                  <Text fontWeight={600}>Account: Institute Name</Text>
                  <Text>Account No: 1234567890</Text>
                  <Text>IFSC: SBIN0000000</Text>
                  <Text>Branch: Pune</Text>
                </Box>

                <FormControl mt={3}>
                  <FormLabel>Upload Payment Proof (optional)</FormLabel>
                  <Input type="file" accept="image/*,application/pdf" {...register("offlineFile")} />
                </FormControl>

                <HStack mt={4}>
                  <Button colorScheme="brand" onClick={handleSubmit(onSubmit)}>
                    Save Offline Payment
                  </Button>
                </HStack>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Footer actions */}
        <HStack justify="space-between">
          <Button variant="ghost" onClick={() => window.history.back()}>
            Back
          </Button>

          <Button
            colorScheme="brand"
            onClick={() => {
              // If a QR was generated and verification succeeded, proceed to success flow
              if (verificationState === "success") {
                onPaid?.({ status: "paid", transactionId: mockTxn ?? "TXN" });
              } else {
                toast({
                  title: "Complete payment or verify it first",
                  description: "If you used UPI, scan the QR and press Verify Payment once you paid.",
                  status: "warning",
                });
              }
            }}
          >
            Proceed
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
