"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

const disclosures = [
  "IndiceX is a decentralized protocol and does not act as a broker, dealer, or financial advisor. Participation in DeFi protocols involves inherent risks.",
  "Smart contract risk: Despite audits, smart contracts may contain vulnerabilities that could result in loss of funds. Users interact with contracts at their own risk.",
  "Oracle risk: IndiceX relies on external price oracles. Oracle failures or manipulations could lead to incorrect pricing and potential losses.",
  "Market risk: Index values fluctuate based on underlying asset performance. Past performance does not guarantee future results.",
  "Regulatory risk: The regulatory landscape for DeFi is evolving. Changes in regulations may affect the availability or operation of the protocol in certain jurisdictions.",
  "Liquidity risk: While the protocol is designed for instant withdrawals, extreme market conditions may temporarily affect liquidity.",
  "No deposit insurance: Assets deposited into IndiceX vaults are not insured by any government agency or traditional financial protection scheme.",
  "Tax obligations: Users are responsible for understanding and complying with all applicable tax laws in their jurisdiction related to digital asset transactions.",
  "Counterparty risk: While IndiceX is non-custodial, underlying index components may involve exposure to third-party protocols or assets with their own risk profiles.",
  "Technology risk: Blockchain networks may experience congestion, downtime, or forks that could affect transaction execution and settlement.",
];

const ComplianceRiskDisclosure = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-page-bg py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
          >
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Compliance &{" "}
            <span className="text-gradient-primary">Risk Disclosure</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Please read the following disclosures carefully before using the
            IndiceX protocol. Understanding these risks is essential.
          </motion.p>
        </div>
      </section>

      {/* Disclosures */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {disclosures.map((disclosure, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center shrink-0">
                <ShieldAlert size={16} className="text-ix-red" />
              </div>
              <p className="text-sm text-muted-foreground leading-6">
                {disclosure}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground py-8 mt-8">
          IndiceX does not provide financial advice. Please consult a licensed
          financial advisor before investing.
        </p>
      </section>
    </>
  );
};

export default ComplianceRiskDisclosure;
