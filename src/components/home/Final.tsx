"use client";

import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Final = () => {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main" }}
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
          Get Started
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            mt: 1.5,
            mb: 3,
            lineHeight: 1.2,
          }}
        >
          The Future of Index Investing is{" "}
          <Box component="span" sx={{ color: "secondary.main" }}>
            On-Chain
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.75)",
            fontSize: "1.15rem",
            maxWidth: 540,
            mx: "auto",
            lineHeight: 1.7,
            mb: 5,
          }}
        >
          Start investing with IndiceX today. No banks, no borders — just
          seamless, transparent access to global indices powered by stablecoins.
        </Typography>

        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{
            bgcolor: "secondary.main",
            color: "#FFFFFF",
            px: 5,
            py: 1.75,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#b3873f",
            },
          }}
        >
          Start Investing
        </Button>
      </Box>
    </Box>
  );
};

export default Final;
