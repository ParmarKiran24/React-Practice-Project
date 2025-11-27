"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import PersonalDetails from "@/components/forms/PersonalDetails";
import mockDataFile from "@/data/mockData.json";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PersonalPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Load existing data from localStorage
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues(user.profile?.personal || {});
    } else {
      setDefaultValues(mockDataFile.users[0].profile.personal);
    }
  }, []);

  const handleNext = (data: any) => {
    // Save to localStorage
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.personal = data;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Personal details saved!",
      status: "success",
      duration: 2000,
    });

    // Navigate to next step
    router.push("/profile/qualification");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <PersonalDetails defaultValues={defaultValues} onNext={handleNext} />
    </ProtectedRoute>
  );
}
