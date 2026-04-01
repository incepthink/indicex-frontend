"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F5EE4", // Coinbase Blue
    },
    secondary: {
      main: "#0A0B0D", // Near Black
    },
    background: {
      default: "#0A0A0A", // Dark background
      paper: "#111111",
    },
    text: {
      primary: "#0A0B0D", // Near Black
      secondary: "#5B616E", // Medium Gray
    },
    info: {
      main: "#1F5EE4", // Coinbase Blue
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#0A0B0D",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2A2A2D",
          },
        },
        outlined: {
          borderColor: "#0A0B0D",
          color: "#0A0B0D",
          "&:hover": {
            borderColor: "#2A2A2D",
            backgroundColor: "rgba(10, 11, 13, 0.04)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#0A0B0D",
        },
      },
    },
  },
});

export default theme;
