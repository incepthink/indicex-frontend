"use client";

import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TokenIcon from "@mui/icons-material/Token";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const steps = [
  {
    number: "01",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "Deposit Stablecoins",
    description:
      "Connect your wallet and deposit USDC, USDT, or other supported stablecoins to get started.",
  },
  {
    number: "02",
    icon: <TokenIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "Receive Index Tokens",
    description:
      "Instantly receive tokenized index exposure representing your share of the underlying portfolio.",
  },
  {
    number: "03",
    icon: <ShowChartIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "Track in Real Time",
    description:
      "Monitor your portfolio performance, NAV, and holdings — all verifiable on-chain, 24/7.",
  },
  {
    number: "04",
    icon: <SwapHorizIcon sx={{ fontSize: 32, color: "#fff" }} />,
    title: "Redeem Anytime",
    description:
      "Burn your index tokens to redeem the underlying stablecoins at any time. No lock-ups, no delays.",
  },
];

const HowItWorks = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main" }}
      className="py-20 px-4"
    >
      <Box className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <Box className="text-center mb-20">
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            How It Works
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
            Four Simple{" "}
            <Box component="span" sx={{ color: "secondary.main" }}>
              Steps
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.15rem",
              maxWidth: 580,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            From stablecoins to diversified index exposure in minutes — fully
            on-chain, fully transparent.
          </Typography>
        </Box>

        {/* Steps - Desktop */}
        <Box className="hidden lg:flex items-start justify-center">
          {steps.map((step, index) => (
            <Box key={step.number} className="flex items-start">
              {/* Step Card */}
              <Box
                className="flex flex-col items-center text-center"
                sx={{ width: 220 }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                  }}
                  className="flex items-center justify-center mb-5"
                >
                  {step.icon}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "secondary.main",
                      color: "#fff",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                    className="flex items-center justify-center"
                  >
                    {step.number}
                  </Box>
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
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.925rem",
                    lineHeight: 1.65,
                    maxWidth: 240,
                    mx: "auto",
                  }}
                >
                  {step.description}
                </Typography>
              </Box>

              {/* Horizontal Arrow */}
              {index < steps.length - 1 && (
                <Box
                  sx={{ color: "secondary.main", mt: "26px" }}
                  className="flex items-center px-3 shrink-0"
                >
                  <Box
                    sx={{
                      height: 2,
                      width: 32,
                      bgcolor: "secondary.main",
                      opacity: 0.9,
                      borderRadius: 1,
                    }}
                  />
                  <ArrowForwardIcon sx={{ fontSize: 20, ml: -0.5 }} />
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Steps - Mobile */}
        <Box className="flex lg:hidden flex-col items-center">
          {steps.map((step, index) => (
            <Box key={step.number} className="flex flex-col items-center">
              {/* Step Card */}
              <Box className="flex flex-col items-center text-center">
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                  }}
                  className="flex items-center justify-center mb-5"
                >
                  {step.icon}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "secondary.main",
                      color: "#fff",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                    }}
                    className="flex items-center justify-center"
                  >
                    {step.number}
                  </Box>
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
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.925rem",
                    lineHeight: 1.65,
                    maxWidth: 240,
                    mx: "auto",
                  }}
                >
                  {step.description}
                </Typography>
              </Box>

              {/* Vertical Arrow */}
              {index < steps.length - 1 && (
                <Box
                  sx={{ color: "secondary.main" }}
                  className="flex justify-center py-6"
                >
                  <Box className="flex flex-col items-center">
                    <Box
                      sx={{
                        width: 2,
                        height: 24,
                        bgcolor: "secondary.main",
                        opacity: 0.9,
                        borderRadius: 1,
                      }}
                    />
                    <ArrowDownwardIcon sx={{ fontSize: 20, mt: -0.5 }} />
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;
