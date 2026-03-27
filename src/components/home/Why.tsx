"use client";

import { Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BoltIcon from "@mui/icons-material/Bolt";
import PublicIcon from "@mui/icons-material/Public";

const features = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 36, color: "primary.main" }} />,
    title: "Trusted Benchmarks",
    description:
      "Built on established, widely recognized market indices — not synthetic or unverified assets.",
  },
  {
    icon: <VisibilityIcon sx={{ fontSize: 36, color: "primary.main" }} />,
    title: "Fully Transparent",
    description:
      "Every transaction, rebalance, and holding is verifiable on-chain in real time.",
  },
  {
    icon: <BoltIcon sx={{ fontSize: 36, color: "primary.main" }} />,
    title: "Programmable Exposure",
    description:
      "Smart contract-driven index tokens that compose seamlessly with DeFi protocols.",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 36, color: "primary.main" }} />,
    title: "Borderless Access",
    description:
      "Invest from anywhere using stablecoins — no banks, no intermediaries, no delays.",
  },
];

const Why = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "#0A0B0D" }}
      className="py-20 px-4 h-screen flex flex-col items-center justify-center"
    >
      <Box className="max-w-6xl mx-auto">
        {/* Section Header */}
        <Box className="text-center mb-16">
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            Why IndiceX
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mt: 1.5,
              mb: 3,
            }}
          >
            Bridging Markets &{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Blockchain
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.15rem",
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            IndiceX bridges trusted market benchmarks with blockchain
            infrastructure — enabling seamless, transparent, programmable index
            exposure.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                },
              }}
              className="p-6"
            >
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  width: 56,
                  height: 56,
                }}
                className="flex items-center justify-center mb-5"
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  mb: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.925rem",
                  lineHeight: 1.65,
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Why;
