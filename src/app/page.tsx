import Hero from "@/components/home/Hero";
import Why from "@/components/home/Why";
import WhatInvestIn from "@/components/home/WhatInvestIn";
import HowItWorks from "@/components/home/HowItWorks";
import Different from "@/components/home/Different";
import Built from "@/components/home/Built";
import Trust from "@/components/home/Trust";
import Final from "@/components/home/Final";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Hero />
      <Why />
      <WhatInvestIn />
      <HowItWorks />
      <Built />
      <Different />
      <Trust />
      <Final />
    </Box>
  );
}
