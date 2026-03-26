"use client";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Vaults", href: "/vaults" },
  {
    label: "Compliance & Risk Disclosure",
    href: "/compliance-risk-disclosure",
  },
  { label: "FAQ", href: "/faq" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.45rem 1rem",
            marginInline: "auto",
            width: "100%",
          }}
        >
          <Box sx={{ fontSize: "1.9rem", fontWeight: "bold" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              IndiceX
            </Link>
          </Box>

          {/* Desktop nav links — hidden below md via CSS */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "4rem",
              fontSize: "1.2rem",
              fontWeight: 500,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#0A0B0D", textDecoration: "none" }}
                className="hover:bg-[rgba(0,0,0,0.1)] p-3 px-5 rounded-full"
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Mobile hamburger button — hidden at md and above via CSS */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={() => setMobileOpen(true)}
            edge="end"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </AppBar>

      {/* Spacer so content isn't hidden behind the fixed AppBar */}
      <Box sx={{ height: "56px" }} />

      {/* Mobile drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#FFFFFF",
            color: "#0A0B0D",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.3rem 1rem",
          }}
        >
          <Box
            component={Link}
            onClick={() => setMobileOpen(false)}
            href="/"
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IndiceX
          </Box>
          <IconButton
            color="inherit"
            aria-label="close menu"
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
