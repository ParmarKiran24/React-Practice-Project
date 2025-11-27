"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHome from "../../components/dashboard/DashboardHome";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
