"use client";

import { Box, Typography } from "@mui/material";

const Vision = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default" }}
      className="py-24 px-4"
    >
      <Box className="max-w-3xl mx-auto text-center">
        <Typography
          variant="overline"
          sx={{
            color: "secondary.main",
            fontWeight: 600,
            letterSpacing: "0.2em",
            fontSize: "0.9rem",
          }}
        >
          Our Vision
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            mt: 1.5,
            mb: 4,
            lineHeight: 1.2,
          }}
        >
          Making Global Investing{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Borderless, Programmable & Accessible
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1.15rem",
            lineHeight: 1.8,
            maxWidth: 620,
            mx: "auto",
          }}
        >
          We envision a world where anyone, anywhere, can access the
          world&apos;s best market indices with a single click — no
          intermediaries, no gatekeepers, no friction. Just open, programmable,
          on-chain finance for everyone.
        </Typography>
      </Box>
    </Box>
  );
};

export default Vision;
