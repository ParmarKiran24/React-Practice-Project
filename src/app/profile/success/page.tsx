"use client";
import React, { useState, useEffect } from "react";
import SuccessPage from "@/components/ui/SuccessPage";
import { useRouter } from "next/navigation";

export default function SuccessRoutePage() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState("APPL-2025-0001");

  useEffect(() => {
    // Get submission details from localStorage
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.profile?.submittedAt) {
        // Generate application ID from submission timestamp
        const timestamp = new Date(user.profile.submittedAt).getTime();
        setApplicationId(`APPL-${timestamp.toString().slice(-8)}`);
      }
    }
  }, []);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  const handleViewProfile = () => {
    router.push("/profile/summary");
  };

  const downloadUrl = "/mnt/data/Declartion.pdf";

  return (
    <SuccessPage
      applicationId={applicationId}
      onGoToDashboard={handleGoToDashboard}
      onViewProfile={handleViewProfile}
      downloadUrl={downloadUrl}
    />
  );
}
