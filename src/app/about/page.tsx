import Hero from "@/components/about/Hero";
import Mission from "@/components/about/Mission";
import Features from "@/components/about/Features";
import Values from "@/components/about/Values";
import Vision from "@/components/about/Vision";
import { Box } from "@mui/material";

const AboutPage = () => {
  return (
    <Box>
      <Hero />
      <Mission />
      <Features />
      <Values />
      <Vision />
    </Box>
  );
};

export default AboutPage;
