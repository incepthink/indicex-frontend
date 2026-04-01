"use client";

import { motion } from "framer-motion";

const Mission = () => {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Democratizing Access to{" "}
              <span className="text-gradient-primary">Global Markets</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-7">
              Traditional index investing has been gatekept by institutions,
              custodians, and opaque intermediaries. IndiceX removes those
              barriers by bringing diversified market exposure fully on-chain.
            </p>
            <p className="text-muted-foreground leading-7">
              Our protocol lets anyone — anywhere in the world — access
              institutional-grade index strategies using stablecoins, with full
              transparency and no counterparty risk.
            </p>
            <p className="text-muted-foreground leading-7">
              We believe the future of finance is open, composable, and
              accessible to all.
            </p>
          </motion.div>
        </div>

        <div className="glow-line h-px mt-16" />
      </div>
    </section>
  );
};

export default Mission;
