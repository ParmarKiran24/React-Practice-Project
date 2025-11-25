import React from "react";
import SuccessPage from "@/components/ui/SuccessPage";
import { useRouter } from "next/navigation";

/**
 * Success page route wrapper
 * - Replace applicationId fetch or props as needed
 * - The local PDF path(s) used inside the component (e.g. /mnt/data/Declartion.pdf)
 *   will be converted to a real URL by your infra.
 */

export default function SuccessRoutePage() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    // replace with your route for dashboard
    router.push("/dashboard");
  };

  const handleViewProfile = () => {
    router.push("/profile/summary");
  };

  // If you generate a PDF on server after submission, pass its URL via downloadUrl prop.
  // For now we point to the local declaration PDF (your infra will convert it).
  const downloadUrl = "/mnt/data/Declartion.pdf";

  const applicationId = "APPL-2025-0001"; // replace with real id from server

  return (
    <SuccessPage
      applicationId={applicationId}
      onGoToDashboard={handleGoToDashboard}
      onViewProfile={handleViewProfile}
      downloadUrl={downloadUrl}
    />
  );
}
