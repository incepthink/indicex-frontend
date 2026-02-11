"use client";

import { Box, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const pillars = [
  {
    icon: <DescriptionIcon sx={{ fontSize: 32, color: "secondary.main" }} />,
    title: "Public Contracts",
    description:
      "All smart contracts are open-source and deployed on public blockchains — anyone can audit the code that governs your assets.",
  },
  {
    icon: (
      <AccountBalanceWalletIcon
        sx={{ fontSize: 32, color: "secondary.main" }}
      />
    ),
    title: "Verifiable Holdings",
    description:
      "Every asset backing an index token is verifiable on-chain in real time. No hidden reserves, no trust assumptions.",
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 32, color: "secondary.main" }} />,
    title: "Transparent Pricing",
    description:
      "Index prices are derived from on-chain oracle feeds — no opaque markups, no hidden spreads, no surprises.",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 32, color: "secondary.main" }} />,
    title: "Published Rules",
    description:
      "Rebalancing criteria, inclusion rules, and methodology are publicly documented and enforced by smart contracts.",
  },
];

const Trust = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "background.default" }}
      className="py-24 px-4"
    >
      <Box className="max-w-6xl mx-auto">
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
            Trust & Transparency
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
            Built on{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Openness
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
            Public contracts, verifiable holdings, transparent pricing, and
            published rules — so you never have to take our word for it.
          </Typography>
        </Box>

        {/* Trust Pillar Cards */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Box
              key={pillar.title}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                borderTop: "3px solid",
                borderColor: "secondary.main",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(52, 74, 134, 0.12)",
                },
              }}
              className="p-6"
            >
              <Box
                sx={{
                  bgcolor: "rgba(52, 74, 134, 0.06)",
                  borderRadius: 2,
                  width: 56,
                  height: 56,
                }}
                className="flex items-center justify-center mb-5"
              >
                {pillar.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  mb: 1.5,
                }}
              >
                {pillar.title}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.925rem",
                  lineHeight: 1.65,
                }}
              >
                {pillar.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Trust;
