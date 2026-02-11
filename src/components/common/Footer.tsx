import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Compliance & Risk Disclosure",
    href: "/compliance-risk-disclosure",
  },
  { label: "FAQ", href: "/faq" },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "primary.main", color: "#fff", pt: 6, pb: 3 }}
    >
      <Box maxWidth="xl" sx={{ px: 2, marginInline: "auto", width: "100%" }}>
        {/* Top section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 4,
            mb: 4,
          }}
        >
          {/* Logo & tagline */}
          <Box>
            <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold", mb: 1 }}>
              IndiceX
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 300 }}
            >
              Smart, diversified index investing — built for the modern
              investor.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography sx={{ fontWeight: "bold", mb: 1.5 }}>
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Typography variant="body2">support@indicex.com</Typography>
              <Typography variant="body2">+91 98347 80832</Typography>
              <Typography variant="body2">
                123 Finance Street, New York, NY 10001
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Bottom section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            &copy; {new Date().getFullYear()} IndiceX. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <a
              href="#"
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Terms of Service
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
