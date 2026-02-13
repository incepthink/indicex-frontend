"use client";

import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const disclosures = [
  "IndiceX provides tokenized index exposure and does not constitute financial advice.",
  "All investments carry risk, including potential loss of capital.",
  "Index performance is subject to market volatility and pricing oracle risks.",
  "Smart contract risks include bugs, exploits, and operational failures.",
  "Users are responsible for understanding applicable local regulations.",
];

const ComplianceRiskDisclosurePage = () => {
  return (
    <Box>
      {/* Hero */}
      <Box
        component="section"
        sx={{ bgcolor: "background.default" }}
        className="pt-24 px-4"
      >
        <Box className="max-w-4xl mx-auto text-center">
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: "0.2em",
              fontSize: "0.9rem",
            }}
          >
            Legal
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              mt: 1.5,
              mb: 3,
              lineHeight: 1.15,
            }}
          >
            Compliance &{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Risk Disclosure
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1.2rem",
              maxWidth: 680,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Please review the following important disclosures before using the
            IndiceX platform.
          </Typography>
        </Box>
      </Box>

      {/* Disclosures */}
      <Box component="section" className="py-16 px-4">
        <Container maxWidth="md">
          <List disablePadding>
            {disclosures.map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  mb: 2,
                  py: 2.5,
                  px: 3,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <WarningAmberIcon sx={{ color: "primary.main" }} />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      color: "text.primary",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </Box>
  );
};

export default ComplianceRiskDisclosurePage;
