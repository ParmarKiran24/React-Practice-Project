"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import QualificationDetails from "@/components/forms/QualificationDetails";
import mockDataFile from "@/data/mockData.json";

export default function QualificationPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Wrap array in object with qualifications property
      const qualArray = user.profile?.qualification || [];
      setDefaultValues({ qualifications: qualArray });
    } else {
      setDefaultValues({ qualifications: mockDataFile.users[0].profile.qualification });
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      // Extract the array from qualifications object
      user.profile.qualification = data.qualifications;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Qualification details saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/reservation");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <QualificationDetails defaultValues={defaultValues} onNext={handleNext} />;
}