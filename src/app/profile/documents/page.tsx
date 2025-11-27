"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import DocumentDetails from "@/components/forms/DocumentDetails";
import mockDataFile from "@/data/mockData.json";

export default function DocumentsPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues(user.profile?.documents || []);
    } else {
      setDefaultValues(mockDataFile.users[0].profile.documents);
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.documents = data;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Documents saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/bank");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <DocumentDetails onNext={handleNext} />;
}
