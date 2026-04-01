"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-page-bg overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-page-bg to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
        >
          About IndiceX
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
        >
          Built for the Future of
          <br />
          <span className="text-gradient-primary">Global Investing</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10"
        >
          IndiceX is a non-custodial, on-chain index exposure platform built on
          Base. Access diversified global market exposure through transparent,
          composable DeFi primitives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 bg-muted border border-border text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-ix-green" />
            Non-Custodial
          </div>
          <div className="flex items-center gap-2 bg-muted border border-border text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-base-blue" />
            Built on Base
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
