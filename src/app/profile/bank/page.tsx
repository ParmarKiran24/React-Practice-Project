"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import BankDetails from "@/components/forms/BankDetails";
import mockDataFile from "@/data/mockData.json";

export default function BankPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues(user.profile?.bank || {});
    } else {
      setDefaultValues(mockDataFile.users[0].profile.bank);
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.bank = data;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Bank details saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/declaration");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <BankDetails defaultValues={defaultValues} onNext={handleNext} />;
}
