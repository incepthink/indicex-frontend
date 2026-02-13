"use client";

import { Box, Typography, Chip } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MemoryIcon from "@mui/icons-material/Memory";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const indices = [
  {
    icon: <ShowChartIcon sx={{ fontSize: 32 }} />,
    title: "Tokenized U.S. Large Cap Index",
    tag: "Flagship",
    description:
      "Gain diversified exposure to the top U.S. large-cap equities — tokenized on-chain for seamless, borderless investing.",
  },
  {
    icon: <MemoryIcon sx={{ fontSize: 32 }} />,
    title: "U.S. Technology Leaders Index",
    tag: "High Growth",
    description:
      "Concentrated access to America's most innovative technology companies, rebalanced and verifiable on-chain.",
  },
  {
    icon: <PublicIcon sx={{ fontSize: 32 }} />,
    title: "Global Sector Indices",
    tag: "Diversified",
    description:
      "Target specific sectors across global markets — from healthcare to energy — through single-token exposure.",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
    title: "Thematic Growth Indices",
    tag: "Emerging",
    description:
      "Invest in tomorrow's trends today — AI, clean energy, digital infrastructure, and more, all on-chain.",
  },
  {
    icon: <TuneIcon sx={{ fontSize: 32 }} />,
    title: "Custom Strategy Indices",
    tag: "Tailored",
    description:
      "Build your own index with custom weightings and rules — fully programmable, fully transparent, fully yours.",
  },
];

const WhatInvestIn = () => {
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
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            Investment Products
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
            What You Can{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Invest In
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.15rem",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            From flagship large-cap indices to fully custom strategies — access
            institutional-grade index products, powered by blockchain.
          </Typography>
        </Box>

        {/* Top row — 3 cards */}
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {indices.slice(0, 3).map((index) => (
            <IndexCard key={index.title} {...index} />
          ))}
        </Box>

        {/* Bottom row — 2 cards centered */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full md:max-w-[calc(66.666%+0.75rem)] mx-auto">
          {indices.slice(3).map((index) => (
            <IndexCard key={index.title} {...index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const IndexCard = ({
  icon,
  title,
  tag,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  tag: string;
  description: string;
}) => (
  <Box
    sx={{
      bgcolor: "background.paper",
      border: "1px solid",
      borderColor: "rgba(0, 0, 0, 0.08)",
      borderRadius: 3,
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "primary.main",
        transform: "translateY(-4px)",
        boxShadow: "0 12px 32px rgba(31, 94, 228, 0.1)",
        "& .card-arrow": {
          opacity: 1,
          transform: "translateX(0)",
        },
        "& .card-icon-box": {
          bgcolor: "primary.main",
          color: "#fff",
        },
      },
    }}
    className="p-6"
  >
    <Box className="flex items-start justify-between mb-4">
      <Box
        className="card-icon-box flex items-center justify-center"
        sx={{
          bgcolor: "rgba(31, 94, 228, 0.08)",
          borderRadius: 2.5,
          width: 56,
          height: 56,
          color: "primary.main",
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </Box>
      <Chip
        label={tag}
        size="small"
        sx={{
          bgcolor: "rgba(31, 94, 228, 0.08)",
          color: "primary.main",
          fontWeight: 600,
          fontSize: "0.75rem",
          height: 26,
        }}
      />
    </Box>

    <Typography
      variant="h6"
      sx={{
        color: "text.primary",
        fontWeight: 600,
        fontSize: "1.1rem",
        mb: 1.5,
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
        mb: 2,
      }}
    >
      {description}
    </Typography>

    {/* <Box
      className="card-arrow flex items-center gap-1"
      sx={{
        color: "primary.main",
        fontWeight: 600,
        fontSize: "0.85rem",
        opacity: 0,
        transform: "translateX(-8px)",
        transition: "all 0.3s ease",
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "0.85rem" }}>
        Learn more
      </Typography>
      <ArrowForwardIcon sx={{ fontSize: 16 }} />
    </Box> */}
  </Box>
);

export default WhatInvestIn;
