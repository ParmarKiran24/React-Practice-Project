"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import Declaration from "@/components/forms/Declaration";

export default function DeclarationPage() {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (payload: any) => {
    // Save declaration to localStorage
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!user.profile) user.profile = {};
      user.profile.declaration = payload;
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Declaration saved!",
      status: "success",
      duration: 2000,
    });

    // Navigate to summary page for review
    router.push("/profile/summary");
  };

  return <Declaration onSubmit={handleSubmit} />;
}
