"use client";

import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SensorsIcon from "@mui/icons-material/Sensors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShieldIcon from "@mui/icons-material/Shield";

const features = [
  {
    icon: <VisibilityIcon sx={{ fontSize: 28 }} />,
    title: "Transparent Methodologies",
    description:
      "Every index rule, weighting, and rebalance trigger is published on-chain — fully auditable, never a black box.",
  },
  {
    icon: <AutorenewIcon sx={{ fontSize: 28 }} />,
    title: "Automated Rebalancing",
    description:
      "Smart contracts handle periodic rebalancing automatically, keeping your portfolio aligned without manual intervention.",
  },
  {
    icon: <SensorsIcon sx={{ fontSize: 28 }} />,
    title: "Robust Oracles",
    description:
      "Institutional-grade price feeds from multiple oracle networks ensure accurate, tamper-resistant data at all times.",
  },
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
    title: "Smart Vaults",
    description:
      "Non-custodial vault contracts securely hold underlying assets with on-chain proof of reserves you can verify anytime.",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 28 }} />,
    title: "Risk Controls",
    description:
      "Built-in circuit breakers, concentration limits, and slippage guards protect your capital from extreme market events.",
  },
];

const Built = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default" }}
      className="py-24 px-4"
    >
      <Box className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
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
            Infrastructure
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
            Built for{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Modern Investors
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.15rem",
              maxWidth: 620,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Transparent methodologies, automated rebalancing, robust oracles,
            smart vaults, and risk controls — everything you need to invest with
            confidence.
          </Typography>
        </Box>

        {/* Top row — 3 cards */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {features.slice(0, 3).map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Box>

        {/* Bottom row — 2 cards centered */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full md:max-w-[calc(66.666%+0.75rem)] mx-auto">
          {features.slice(3).map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      borderRadius: 3,
      border: "1px solid",
      borderColor: "rgba(75, 73, 69, 0.06)",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "secondary.main",
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(52, 74, 134, 0.08)",
        "& .feature-icon-box": {
          bgcolor: "primary.main",
          color: "#fff",
        },
      },
    }}
    className="p-6"
  >
    <Box
      className="feature-icon-box flex items-center justify-center mb-4"
      sx={{
        bgcolor: "rgba(52, 74, 134, 0.08)",
        borderRadius: 2.5,
        width: 52,
        height: 52,
        color: "primary.main",
        transition: "all 0.3s ease",
      }}
    >
      {icon}
    </Box>

    <Typography
      variant="h6"
      sx={{
        color: "text.primary",
        fontWeight: 600,
        fontSize: "1.05rem",
        mb: 1,
        lineHeight: 1.3,
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        color: "text.secondary",
        fontSize: "0.9rem",
        lineHeight: 1.65,
      }}
    >
      {description}
    </Typography>
  </Box>
);

export default Built;
