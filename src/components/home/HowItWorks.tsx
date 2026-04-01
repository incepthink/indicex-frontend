import { motion } from "framer-motion";
import {
  Wallet,
  ArrowDownToLine,
  Coins,
  BarChart3,
  ArrowUpFromLine,
  Target,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const vaultSteps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    desc: "Link your Web3 wallet in one click",
  },
  {
    icon: ArrowDownToLine,
    title: "Deposit Stablecoins",
    desc: "Send USDC or USDT to a vault",
  },
  {
    icon: Coins,
    title: "Receive Index Tokens",
    desc: "Get tokens tracking your chosen index",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    desc: "Monitor returns on-chain anytime",
  },
  {
    icon: ArrowUpFromLine,
    title: "Redeem Instantly",
    desc: "Withdraw to stablecoins anytime",
  },
];

const perpSteps = [
  { icon: Wallet, title: "Connect Wallet", desc: "Link your Web3 wallet" },
  {
    icon: ArrowDownToLine,
    title: "Deposit Collateral",
    desc: "Fund with USDC or USDT",
  },
  { icon: Target, title: "Choose a Pair", desc: "S&P500-USDC or S&P500-DAI" },
  {
    icon: TrendingUp,
    title: "Open Position",
    desc: "Long or short with up to 50× leverage",
  },
  {
    icon: TrendingDown,
    title: "Close & Settle",
    desc: "Close anytime, settle in stablecoins",
  },
];

const StepRow = ({
  steps,
  label,
}: {
  steps: typeof vaultSteps;
  label: string;
}) => (
  <div>
    <h3 className="text-sm font-semibold text-primary uppercase tracking-[0.15em] mb-8">
      {label}
    </h3>
    <div className="relative flex flex-col md:flex-row gap-6 md:gap-0">
      {/* Connection line */}
      <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

      {steps.map((step, i) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 flex flex-col items-center text-center px-2">
            <div className="w-12 h-12 rounded-full bg-panel-bg border border-border flex items-center justify-center mb-4">
              <step.icon size={20} className="text-primary" />
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">
              {step.title}
            </div>
            <div className="text-xs text-text-secondary leading-relaxed">
              {step.desc}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative bg-page-bg py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            From wallet to market in minutes
          </h2>
        </motion.div>

        <div className="space-y-20">
          <StepRow steps={vaultSteps} label="Index Vaults" />
          <StepRow steps={perpSteps} label="Perpetual Trading" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
