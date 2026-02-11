"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#344A86", // Chambray
    },
    secondary: {
      main: "#C2964B", // Tussock
    },
    background: {
      default: "#E1DDD6", // Silver Feather
      paper: "#FFFFFF",
    },
    text: {
      primary: "#4B4945", // Charred
      secondary: "#6B6862", // Warm Stone
    },
    info: {
      main: "#407794", // Harbour Blue
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#344A86",
          "&:hover": {
            backgroundColor: "#2a3d6e",
          },
        },
        outlined: {
          borderColor: "#344A86",
          color: "#344A86",
          "&:hover": {
            borderColor: "#2a3d6e",
            backgroundColor: "rgba(52, 74, 134, 0.04)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#344A86",
        },
      },
    },
  },
});

export default theme;
