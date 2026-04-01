"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Vision = () => {
  return (
    <section className="relative bg-page-bg py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Looking Ahead
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            The Future of Finance is{" "}
            <span className="text-gradient-primary">Open</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            IndiceX is building the infrastructure for a world where anyone can
            access institutional-grade investment strategies — permissionlessly,
            transparently, and at near-zero cost. The next chapter of global
            finance starts on-chain.
          </p>
          <Link
            href="/vaults"
            className="inline-block bg-primary text-primary-foreground rounded-full px-8 py-3 font-semibold glow-primary hover:opacity-90 transition-opacity"
          >
            Explore Vaults
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
