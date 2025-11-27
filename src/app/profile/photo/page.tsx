"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import PhotoSignature from "@/components/forms/PhotoSignature";
import mockDataFile from "@/data/mockData.json";

export default function PhotoPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues({
        photo: user.profile?.photo || null,
        signature: user.profile?.signature || null,
      });
    } else {
      setDefaultValues({
        photo: mockDataFile.users[0].profile.photo,
        signature: mockDataFile.users[0].profile.signature,
      });
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.photo = data.photo;
      user.profile.signature = data.signature;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Photo & Signature saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/documents");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <PhotoSignature onNext={handleNext} />;
}