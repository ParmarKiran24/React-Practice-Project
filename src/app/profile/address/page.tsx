"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import AddressDetails from "@/components/forms/AddressDetails";
import mockDataFile from "@/data/mockData.json";

export default function AddressPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues(user.profile?.address || {});
    } else {
      setDefaultValues(mockDataFile.users[0].profile.address);
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.address = data;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Address details saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/qualification");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <AddressDetails defaultValues={defaultValues} onNext={handleNext} />;
}
