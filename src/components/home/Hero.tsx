"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const pulseGlow = keyframes`
  0%   { box-shadow: 0 0 0px rgba(31, 94, 228, 0); }
  50%  { box-shadow: 0 0 20px rgba(31, 94, 228, 0.5); }
  100% { box-shadow: 0 0 0px rgba(31, 94, 228, 0); }
`;

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted is set on the DOM element (React JSX prop can be unreliable)
    video.muted = true;

    // Defer video loading until after initial paint
    const timer = setTimeout(() => {
      video.src = "/video/home-bg.mp4";
      video.load();
      video.play().catch(() => {});
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        marginTop: "-56px",
        paddingTop: "56px",
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-center text-center"
    >
      {/* Background video (hidden on mobile) */}
      {!isMobile && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/video/home-bg.png"
          onCanPlay={() => setVideoLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 0.8s ease-in",
          }}
        />
      )}

      {/* Background image (always visible on mobile, fallback on desktop) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/video/home-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isMobile ? 1 : videoLoaded ? 0 : 1,
          transition: "opacity 0.8s ease-in",
        }}
      />

      {/* Color overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backgroundColor: "#FFFFFF",
          opacity: 0.1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: 4,
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 4, sm: 6 },
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        }}
        className="flex flex-col items-center"
      >
        <Typography
          variant="h2"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            mb: 2,
            fontSize: { xs: "1.85rem", sm: "2.7rem", md: "3.8rem" },
          }}
        >
          IndiceX
        </Typography>

        <Typography
          variant="h2"
          sx={{
            color: "text.primary",
            fontWeight: 700,
            maxWidth: 720,
            lineHeight: 1.15,
            mb: 3,
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Global Index Investing.{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Powered by Stablecoins.
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontWeight: 500,
            maxWidth: 600,
            lineHeight: 1.6,
            mb: 5,
            fontSize: { xs: "0.95rem", sm: "1.15rem", md: "1.25rem" },
            px: { xs: 2, sm: 0 },
          }}
        >
          Access tokenized U.S. market indices on-chain. Invest instantly using
          stablecoins — no banks, no borders, no delays.
        </Typography>

        <Box className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.05rem",
              fontWeight: 600,
              bgcolor: "primary.main",
              animation: `${pulseGlow} 2.4s ease-in-out infinite`,
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
              "&:hover": {
                bgcolor: "#1A4FBF",
                transform: "scale(1.04)",
                boxShadow: "0 6px 24px rgba(31,94,228,0.45)",
                animation: "none",
              },
              "&:active": {
                transform: "scale(0.97)",
              },
            }}
          >
            Start Investing
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.05rem",
              fontWeight: 600,
              borderColor: "currentColor",
              transition: "all 0.2s ease",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '"→"',
                position: "absolute",
                right: 14,
                opacity: 0,
                transform: "translateX(-6px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              },
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                transform: "scale(1.03)",
                pr: 5.5,
                "&::after": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
              "&:active": {
                transform: "scale(0.97)",
              },
            }}
          >
            Explore Indices
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
