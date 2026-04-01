"use client";

import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  Zap,
  Eye,
  DollarSign,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Non-Custodial",
    description:
      "Your assets remain in your wallet at all times. No intermediaries, no counterparty risk.",
  },
  {
    icon: BarChart3,
    title: "Diversified Exposure",
    description:
      "Access broad market indices spanning equities, commodities, and crypto — all from one protocol.",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description:
      "On-chain execution means trades settle in seconds, not days. No clearing houses required.",
  },
  {
    icon: Eye,
    title: "On-Chain Transparency",
    description:
      "Every rebalance, fee, and allocation is verifiable on-chain. Full auditability by default.",
  },
  {
    icon: DollarSign,
    title: "Stablecoin-Native",
    description:
      "Deposit and withdraw in USDC. No need to bridge between volatile assets to participate.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Rebalancing",
    description:
      "Automated portfolio rebalancing keeps your exposure aligned with target allocations continuously.",
  },
];

const Features = () => {
  return (
    <section className="bg-page-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Platform
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Why <span className="text-gradient-primary">IndiceX</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 card-shine"
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-primary mb-4">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
