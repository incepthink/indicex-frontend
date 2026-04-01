"use client";
import Hero from "@/components/home/Hero";
import Why from "@/components/home/Why";
import WhatInvestIn from "@/components/home/WhatInvestIn";
import HowItWorks from "@/components/home/HowItWorks";
import Different from "@/components/home/Different";
import Built from "@/components/home/Built";
import Trust from "@/components/home/Trust";
import Final from "@/components/home/Final";
import { Box } from "@mui/material";
import Products from "@/components/home/Products";
import VaultGrid from "../components/home/VaultGrid";
import BuiltOnBase from "@/components/home/BuiltOnBase";

export default function Home() {
  return (
    <Box className="dark bg-background">
      <Hero />
      <Products />
      {/* <Why /> */}
      <VaultGrid />
      {/* <WhatInvestIn /> */}
      <HowItWorks />
      <BuiltOnBase />
      {/* <Built /> */}
      {/* <Different /> */}
      {/* <Trust /> */}
      <Final />
    </Box>
  );
}
