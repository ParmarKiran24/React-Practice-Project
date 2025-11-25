"use client";

import { useRouter } from "next/navigation";
import ApplicationStatus from "@/components/dashboard/ApplicationStatus";

// Mock values — replace with real DB values from Drizzle
const mockData = {
  applicationId: "APPL-2025-0001",
  status: "submitted",
  submittedAt: "2025-02-18",
  verifiedAt: null,
  approvedAt: null,
  rejectedAt: null,

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
