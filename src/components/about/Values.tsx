"use client";

import { motion } from "framer-motion";

const values = [
  {
    num: "01",
    title: "Transparency",
    description:
      "Every action on the protocol is recorded on-chain. Open-source contracts, public allocations, verifiable fees.",
  },
  {
    num: "02",
    title: "Security",
    description:
      "Non-custodial architecture with audited smart contracts. Your keys, your assets — always.",
  },
  {
    num: "03",
    title: "Accessibility",
    description:
      "No minimums, no accreditation requirements. If you have a wallet, you can invest in global markets.",
  },
  {
    num: "04",
    title: "Innovation",
    description:
      "Pushing the boundaries of on-chain finance with novel index methodologies and composable DeFi primitives.",
  },
];

const Values = () => {
  return (
    <section className="bg-background py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Principles
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Our Core <span className="text-gradient-primary">Values</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {values.map((value, i) => (
            <motion.div
              key={value.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 relative"
            >
              <span className="text-5xl font-bold text-primary/20 absolute top-6 left-8">
                {value.num}
              </span>
              <div className="pt-12">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
