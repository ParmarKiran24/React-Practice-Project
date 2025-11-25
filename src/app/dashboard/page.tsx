"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHome from "../../components/dashboard/DashboardHome";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  );
}
