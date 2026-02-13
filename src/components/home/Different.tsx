"use client";

import { Box, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const differentiators = [
  {
    icon: <LinkIcon sx={{ fontSize: 28 }} />,
    title: "On-Chain Diversification",
    traditional: "Fragmented portfolios across centralized brokers",
    indicex:
      "Spread risk across a basket of assets, all managed natively on-chain with full transparency.",
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 28 }} />,
    title: "Real Methodology",
    traditional: "Arbitrary token bundles or hype-driven picks",
    indicex:
      "Indices built on established, rules-based methodologies — transparent, auditable, and data-driven.",
  },
  {
    icon: <AccessTimeFilledIcon sx={{ fontSize: 28 }} />,
    title: "24/7 Access",
    traditional: "Markets close at 4 PM, locked out on weekends",
    indicex:
      "Invest, redeem, or rebalance at any time — markets never close, borders never apply.",
  },
  {
    icon: <FlashOnIcon sx={{ fontSize: 28 }} />,
    title: "Instant Settlement",
    traditional: "T+2 clearing delays through intermediaries",
    indicex:
      "Transactions settle on-chain in seconds. No waiting periods, no counterparty risk.",
  },
];

const Different = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "#0A0B0D" }}
      className="py-24 px-4"
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
            The Difference
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
            Why IndiceX is{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Different
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
            On-chain diversification, real methodology, 24/7 access, instant
            settlement — investing the way it should be.
          </Typography>
        </Box>

        {/* Differentiator Cards */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item) => (
            <Box
              key={item.title}
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: "4px solid",
                borderLeftColor: "primary.main",
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  transform: "translateY(-4px)",
                  "& .diff-icon-box": {
                    bgcolor: "primary.main",
                    color: "#fff",
                  },
                },
              }}
              className="p-6"
            >
              <Box className="flex items-start gap-4">
                <Box
                  className="diff-icon-box flex items-center justify-center shrink-0"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.06)",
                    borderRadius: 2.5,
                    width: 52,
                    height: 52,
                    color: "primary.main",
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.icon}
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      mb: 1.5,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Traditional way */}
                  <Box className="flex items-start gap-2 mb-2">
                    <Typography
                      component="span"
                      sx={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        bgcolor: "rgba(255,255,255,0.06)",
                        borderRadius: 1,
                        px: 1,
                        py: 0.25,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Old way
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        textDecoration: "line-through",
                      }}
                    >
                      {item.traditional}
                    </Typography>
                  </Box>

                  {/* IndiceX way */}
                  <Box className="flex items-start gap-2">
                    <Typography
                      component="span"
                      sx={{
                        color: "primary.main",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        bgcolor: "rgba(31, 94, 228, 0.15)",
                        borderRadius: 1,
                        px: 1,
                        py: 0.25,
                        whiteSpace: "nowrap",
                      }}
                    >
                      IndiceX
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.indicex}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Different;
