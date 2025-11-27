"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import ReservationDetails from "@/components/forms/ReservationDetails";
import mockDataFile from "@/data/mockData.json";

export default function ReservationPage() {
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDefaultValues(user.profile?.reservation || {});
    } else {
      setDefaultValues(mockDataFile.users[0].profile.reservation);
    }
  }, []);

  const handleNext = (data: any) => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.reservation = data;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Reservation details saved!",
      status: "success",
      duration: 2000,
    });

    router.push("/profile/photo");
  };

  if (!defaultValues) {
    return <div>Loading...</div>;
  }

  return <ReservationDetails defaultValues={defaultValues} onNext={handleNext} />;
}