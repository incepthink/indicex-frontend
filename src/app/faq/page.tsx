"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is IndiceX?",
    answer:
      "IndiceX is a non-custodial, on-chain index exposure platform built on Base. It allows users to gain diversified exposure to global market indices using stablecoins, with full transparency and no counterparty risk.",
  },
  {
    question: "How does IndiceX work?",
    answer:
      "Users deposit USDC into index vaults that track specific market indices. The protocol automatically allocates and rebalances holdings according to the index methodology, all executed transparently on-chain via smart contracts.",
  },
  {
    question: "Is IndiceX custodial?",
    answer:
      "No. IndiceX is fully non-custodial. Your assets remain in smart contracts that you interact with directly from your wallet. We never take custody of user funds.",
  },
  {
    question: "What blockchain is IndiceX built on?",
    answer:
      "IndiceX is built on Base, an Ethereum L2 that provides low transaction costs and fast settlement times while inheriting the security of the Ethereum mainnet.",
  },
  {
    question: "What are the fees?",
    answer:
      "IndiceX charges a small management fee and performance fee that varies by vault. All fees are transparently displayed before you deposit and are deducted automatically on-chain. There are no hidden costs.",
  },
  {
    question: "How do I get started?",
    answer:
      "Connect your wallet, ensure you have USDC on Base, navigate to the Vaults page, select an index strategy, and deposit. Your exposure begins immediately upon deposit confirmation.",
  },
  {
    question: "What risks should I be aware of?",
    answer:
      "On-chain investing carries smart contract risk, oracle risk, and market risk. Index values can fluctuate, and there is no guarantee of returns. Please review our Compliance & Risk Disclosure page for full details.",
  },
  {
    question: "Can I withdraw at any time?",
    answer:
      "Yes. IndiceX vaults are designed for instant liquidity. You can withdraw your funds at any time, subject to on-chain settlement which typically completes within seconds.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleChange = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            Support
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            Frequently Asked{" "}
            <span className="text-gradient-primary">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Everything you need to know about IndiceX, from getting started to
            understanding how our protocol works.
          </motion.p>
        </div>
      </section>

      {/* Accordion */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`bg-card border rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "border-primary" : "border-border"
                }`}
              >
                <button
                  onClick={() => handleChange(i)}
                  className="flex items-center justify-between w-full px-6 py-5 cursor-pointer text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors duration-200 ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 ml-4 transition-all duration-300 ${
                      isOpen
                        ? "text-primary rotate-180"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-muted-foreground text-sm leading-7">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FAQ;
