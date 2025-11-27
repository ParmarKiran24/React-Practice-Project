"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/toast";
import ProfileSummary from "@/components/forms/ProfileSummary";
import mockDataFile from "@/data/mockData.json";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SummaryPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Try to get user data from localStorage (set during login)
    const storedUser = localStorage.getItem("mockUser");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfileData(user.profile);
    } else {
      // Fallback to first user in mockData.json
      setProfileData(mockDataFile.users[0].profile);
    }
  }, []);

  const handleEditSection = (section: string) => {
    // Map section names to their respective routes
    const sectionRoutes: Record<string, string> = {
      personal: "/profile/personal",
      address: "/profile/address",
      contact: "/profile/personal",
      qualification: "/profile/qualification",
      reservation: "/profile/reservation",
      photo: "/profile/photo",
      bank: "/profile/bank",
      documents: "/profile/documents",
    };

    const route = sectionRoutes[section];
    if (route) {
      router.push(route);
    }
  };

  const handleSubmit = () => {
    // Update localStorage with final data
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.profile = profileData;
      user.profile.submittedAt = new Date().toISOString();
      user.profile.status = "submitted";
      localStorage.setItem("mockUser", JSON.stringify(user));
    }

    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted.",
      status: "success",
      duration: 3000,
    });

    // Redirect to success page
    router.push("/profile/success");
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }
  return (
    <ProtectedRoute>
      <ProfileSummary
        data={profileData}
        onSubmit={handleSubmit}
        onEditSection={handleEditSection}
      />
    </ProtectedRoute>
  );
}

// How to feed real data

// When the user reaches this page:

// Fetch from DB:

// const profile = await db.query.profiles.findFirst({ where: eq(profiles.userId, session.user.id) });


// Pass the result to the component:

// <ProfileSummary data={profile} ... />


// Each document should include:

// { name: "SSC Certificate", url: "https://s3/.../file.pdf" }


// Photo/signature should include:

// photo: { url: "https://s3/..." }