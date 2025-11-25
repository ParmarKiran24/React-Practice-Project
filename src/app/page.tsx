// src/app/page.tsx
import React from "react";
import Welcome from "@/components/layout/Welcome";
import Programmes from "@/components/layout/Programmes";
import NewsEvents from "@/components/layout/NewsEvents";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <Programmes />
      <NewsEvents />
    </>
  );
}
