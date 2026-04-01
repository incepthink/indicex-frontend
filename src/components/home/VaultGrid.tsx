import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";

const vaults = [
  {
    name: "HashCase NIFTY FIFTY",
    index: "S&P 500",
    description:
      "Tracks the S&P 500 — broad exposure to 500 of the largest U.S. companies. The benchmark for the American market.",
    category: "Large Cap",
    change: "+12.4%",
    positive: true,
  },
  {
    name: "Blackrock Vault",
    index: "NASDAQ-100",
    description:
      "Tracks the NASDAQ-100 — 100 of the largest non-financial companies on Nasdaq, dominated by global tech leaders.",
    category: "Large Cap",
    change: "+18.2%",
    positive: true,
  },
  {
    name: "Vanguard Vault",
    index: "DJIA",
    description:
      "Tracks the DJIA — 30 iconic blue-chip U.S. companies. The oldest and most recognized U.S. market benchmark.",
    category: "Large Cap",
    change: "+8.7%",
    positive: true,
  },
  {
    name: "Russell 2000 Vault",
    index: "Russell 2000",
    description:
      "Tracks the Russell 2000 — 2,000 small-cap U.S. companies. Higher growth potential with more volatility.",
    category: "Small Cap",
    change: "+6.1%",
    positive: true,
  },
  {
    name: "Clean Energy Vault",
    index: "Clean Energy",
    description:
      "Tracks leading global clean energy companies — solar, wind, and EV infrastructure for the energy transition.",
    category: "Sector",
    change: "+14.8%",
    positive: true,
  },
  {
    name: "Financial Sector Vault",
    index: "Financials",
    description:
      "Tracks top U.S. financial institutions — banks, insurance companies, and asset managers in one vault.",
    category: "Sector",
    change: "+9.3%",
    positive: true,
  },
];

const categoryColors: Record<string, string> = {
  "Large Cap": "bg-primary/10 text-primary",
  "Small Cap": "bg-ix-green/10 text-ix-green",
  Sector: "bg-base-blue/10 text-base-blue",
};

const VaultGrid = () => {
  return (
    <section id="vaults" className="relative bg-page-bg py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
            Index Vaults
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Real indices. Real exposure.
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Deposit stablecoins, hold tokens that track the world's most
            important indices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vaults.map((vault, i) => (
            <motion.div
              key={vault.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl border border-border bg-panel-bg p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColors[vault.category]}`}
                >
                  {vault.category}
                </span>
                <div className="flex items-center gap-1 text-ix-green text-sm font-medium">
                  <TrendingUp size={14} />
                  {vault.change}
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {vault.name}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                {vault.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap size={12} className="text-primary" />
                Tracking: {vault.index}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VaultGrid;
