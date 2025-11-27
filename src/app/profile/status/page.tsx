"use client";

import { useRouter } from "next/navigation";
import ApplicationStatus from "@/components/dashboard/ApplicationStatus";

// Mock values — replace with real DB values from Drizzle
const mockData: {
  applicationId: string;
  status: "pending" | "submitted" | "verified" | "approved" | "rejected";
  submittedAt?: string;
  verifiedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  pdfUrl?: string;
  declarationUrl?: string;
} = {
  applicationId: "APPL-2025-0001",
  status: "submitted",
  submittedAt: "2025-02-18",
  verifiedAt: undefined,
  approvedAt: undefined,
  rejectedAt: undefined,

  // Local paths to your uploaded PDFs — your infra will convert them to served URLs:
  pdfUrl: "/mnt/data/Profile Summary.pdf",
  declarationUrl: "/mnt/data/Declartion.pdf",
};

export default function StatusPage() {
  const router = useRouter();

  return (
    <ApplicationStatus
      data={mockData}
      onEditSection={(section) => router.push(`/profile/${section}`)}
    />
  );
}
