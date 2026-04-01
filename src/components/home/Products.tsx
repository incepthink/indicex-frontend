import { motion } from "framer-motion";
import {
  Layers,
  LineChart,
  Shield,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";

const products = [
  {
    icon: Layers,
    title: "Index Vaults",
    description:
      "Deposit stablecoins, receive tokens that track real U.S. market indices. Auto-rebalancing, instant redemption.",
    features: [
      "USDC/USDT deposits",
      "Automatic rebalancing",
      "Instant redemption",
      "Non-custodial",
    ],
    cta: "Explore Vaults",
    href: "#vaults",
  },
  {
    icon: LineChart,
    title: "Perpetual Trading",
    description:
      "Trade perpetual futures on index assets like the S&P 500 — no expiry, 24/7, up to 50× leverage.",
    features: [
      "Up to 50× leverage",
      "No expiry dates",
      "Isolated & cross margin",
      "Market & limit orders",
    ],
    cta: "Start Trading",
    href: "#",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Products = () => {
  return (
    <section id="products" className="relative bg-page-bg py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
            Two Products, One Platform
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Everything you need to access
            <br />
            <span className="text-gradient-primary">
              global markets on-chain
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={itemVariants}
              className="group relative rounded-2xl border border-border bg-panel-bg p-8 md:p-10 hover:border-primary/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <product.icon className="text-primary" size={24} />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {product.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {f}
                    </div>
                  ))}
                </div>

                <a
                  href={product.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group/link"
                >
                  {product.cta}
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Shield,
              label: "Non-Custodial",
              desc: "Your keys, your assets",
            },
            { icon: Clock, label: "24/7 Markets", desc: "Trade without hours" },
            { icon: Zap, label: "Instant Settlement", desc: "No T+2 delays" },
            { icon: Layers, label: "Transparent", desc: "Public contracts" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-xl border border-border/50 bg-row-bg/50"
            >
              <item.icon
                className="mx-auto mb-3 text-text-secondary"
                size={20}
              />
              <div className="text-sm font-medium text-foreground">
                {item.label}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
