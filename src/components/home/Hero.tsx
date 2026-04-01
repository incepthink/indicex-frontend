"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-page-bg">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-base-blue/8 blur-[80px]" />

      {/* Horizontal glow line */}
      <div className="absolute top-1/2 left-0 right-0 h-px glow-line opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-ix-green animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Live on Base
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-gradient-hero">Trade & Invest in</span>
          <br />
          <span className="text-gradient-hero">Global Indices.</span>
          <br />
          <span className="text-gradient-primary">On-Chain.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Real-world market exposure — borderless, instant, non-custodial.
          <br className="hidden sm:block" />
          Index vaults and perpetual futures. No brokers, no banks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="hero"
            size="lg"
            className="rounded-full px-8 h-12 text-base gap-2"
          >
            Start Trading <ArrowRight size={18} />
          </Button>
          <Button
            variant="hero-outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base gap-2"
          >
            <TrendingUp size={18} /> Explore Vaults
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { label: "TVL", value: "$12.4M" },
            { label: "Markets", value: "6+" },
            { label: "Leverage", value: "50×" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white animate-count-up">
                {stat.value}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-page-bg to-transparent" />
    </section>
  );
};

export default Hero;
