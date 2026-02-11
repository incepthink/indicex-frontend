"use client";

import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default" }}
      className="py-24 px-4"
    >
      <Box className="max-w-4xl mx-auto text-center">
        <Typography
          variant="overline"
          sx={{
            color: "secondary.main",
            fontWeight: 600,
            letterSpacing: "0.2em",
            fontSize: "0.9rem",
          }}
        >
          About Us
        </Typography>

        <Typography
          variant="h2"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mt: 1.5,
            mb: 3,
            lineHeight: 1.15,
          }}
        >
          About{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            IndiceX
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1.2rem",
            maxWidth: 680,
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          A next-generation investment platform bringing the world&apos;s most
          important market indices on-chain using stablecoins.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
