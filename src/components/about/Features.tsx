"use client";

import { Box, Typography } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VisibilityIcon from "@mui/icons-material/Visibility";

const platformFeatures = [
  {
    icon: <TokenIcon sx={{ fontSize: 28 }} />,
    title: "Tokenized Indices",
    description:
      "Own diversified market exposure through on-chain index tokens — fractionalized, liquid, and composable with DeFi.",
  },
  {
    icon: <ShowChartIcon sx={{ fontSize: 28 }} />,
    title: "Real-Time NAV",
    description:
      "Track net asset value in real time using institutional-grade oracle feeds — no end-of-day surprises.",
  },
  {
    icon: <AutorenewIcon sx={{ fontSize: 28 }} />,
    title: "Automated Rebalancing",
    description:
      "Smart contracts handle periodic portfolio rebalancing automatically, keeping allocations aligned without manual intervention.",
  },
  {
    icon: <VisibilityIcon sx={{ fontSize: 28 }} />,
    title: "On-Chain Transparency",
    description:
      "Every transaction, rebalance, and holding is verifiable on the blockchain — fully auditable by anyone, anytime.",
  },
];

const Features = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default" }}
      className="py-24 px-4"
    >
      <Box className="max-w-6xl mx-auto">
        <Box className="text-center mb-16">
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            What We Offer
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              mt: 1.5,
              mb: 3,
            }}
          >
            Platform{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Features
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.15rem",
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Everything you need for modern, on-chain index investing — built
            with transparency and automation at the core.
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "rgba(75, 73, 69, 0.06)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "secondary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(52, 74, 134, 0.08)",
                  "& .feature-icon": {
                    bgcolor: "primary.main",
                    color: "#fff",
                  },
                },
              }}
              className="p-6"
            >
              <Box
                className="feature-icon flex items-center justify-center mb-5"
                sx={{
                  bgcolor: "rgba(52, 74, 134, 0.08)",
                  borderRadius: 2.5,
                  width: 52,
                  height: 52,
                  color: "primary.main",
                  transition: "all 0.3s ease",
                }}
              >
                {feature.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  mb: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {feature.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
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

export default Features;
