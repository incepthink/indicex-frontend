import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/styling/ThemeProvider";
import WalletProvider from "@/providers/WalletProvider";
import Navbar from "@/components/common/Navbar";
import { Box, Container } from "@mui/material";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndiceX",
  description:
    "IndiceX - Smart, diversified index investing for the modern investor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <WalletProvider>
          <ThemeProvider>
            <Box
              sx={{ backgroundColor: "background.default", minHeight: "100vh" }}
            >
              <Navbar />
              {children}
              <Footer />
            </Box>
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
