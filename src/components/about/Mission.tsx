"use client";

import { Box, Typography } from "@mui/material";

const Mission = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main" }}
      className="py-24 px-4"
    >
      <Box className="max-w-5xl mx-auto">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — Label & Heading */}
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 600,
                letterSpacing: "0.2em",
                fontSize: "0.9rem",
              }}
            >
              Our Mission
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mt: 1.5,
                lineHeight: 1.2,
              }}
            >
              Bridging Traditional Markets &{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                Blockchain Finance
              </Box>
            </Typography>
          </Box>

          {/* Right — Description */}
          <Box>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              We bridge traditional markets and blockchain finance to offer
              transparent, instant, and global access to diversified index
              exposure.
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.1rem",
                lineHeight: 1.8,
              }}
            >
              Whether you&apos;re an experienced investor or just getting
              started, IndiceX removes the barriers — no banks, no borders, no
              delays. Just smart, on-chain index investing powered by
              stablecoins.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Mission;
