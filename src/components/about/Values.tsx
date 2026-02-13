"use client";

import { Box, Typography } from "@mui/material";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";

const values = [
  {
    icon: <HandshakeIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    title: "Trust",
    description:
      "Built on established market benchmarks and auditable smart contracts — never a black box.",
  },
  {
    icon: <LockOpenIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    title: "Openness",
    description:
      "Open methodologies, open data, and open-source infrastructure. Transparency is our default.",
  },
  {
    icon: <PersonIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    title: "Investor-First",
    description:
      "Every decision we make prioritizes the interests of our investors — fair access, low fees, no hidden agendas.",
  },
];

const Values = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "#0A0B0D" }}
      className="py-24 px-4"
    >
      <Box className="max-w-6xl mx-auto">
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
            Our Values
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
            What We{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Stand For
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.15rem",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            IndiceX is built on trust, openness, and investor-first
            infrastructure.
          </Typography>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <Box
              key={value.title}
              sx={{
                bgcolor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                transition: "all 0.3s ease",
                textAlign: "center",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                },
              }}
              className="p-8"
            >
              <Box
                className="flex items-center justify-center mx-auto mb-5"
                sx={{
                  bgcolor: "rgba(31, 94, 228, 0.15)",
                  borderRadius: "50%",
                  width: 64,
                  height: 64,
                }}
              >
                {value.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  mb: 1.5,
                }}
              >
                {value.title}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                {value.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Values;
