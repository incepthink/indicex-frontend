"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Wallet,
  ChevronDown,
  CheckCircle,
  Loader2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  vaults,
  formatTvl,
  formatReturn,
  formatNav,
  generateChartData,
} from "@/data/vaults";

type ChartTab = "NAV Price" | "Vault Balance" | "30D Return";
type TimeRange = "7D" | "30D" | "90D" | "1Y";
type PanelTab = "deposit" | "withdraw";
type PageTab = "performance" | "overview";

const VaultDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const vault = vaults.find((v) => v.id === id);

  const [pageTab, setPageTab] = useState<PageTab>("performance");
  const [chartTab, setChartTab] = useState<ChartTab>("NAV Price");
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");
  const [panelTab, setPanelTab] = useState<PanelTab>("deposit");
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAction, setLastAction] = useState<PanelTab>("deposit");

  // Simulated wallet state
  const [isConnected, setIsConnected] = useState(false);
  const address = isConnected
    ? "0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B"
    : undefined;

  const chartData = useMemo(
    () => (vault ? generateChartData(vault.nav, timeRange) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vault?.nav, timeRange],
  );

  const periodReturn = useMemo(() => {
    if (!chartData.length) return 0;
    const first = chartData[0].value;
    const last = chartData[chartData.length - 1].value;
    return ((last - first) / first) * 100;
  }, [chartData]);

  const annualizedReturn = useMemo(() => {
    const days =
      timeRange === "7D"
        ? 7
        : timeRange === "30D"
          ? 30
          : timeRange === "90D"
            ? 90
            : 365;
    return periodReturn * (365 / days);
  }, [periodReturn, timeRange]);

  if (!vault) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Vault not found.</p>
      </div>
    );
  }

  const maxWeight = Math.max(...vault.holdings.map((h) => h.weight));
  const displayedHoldings = vault.holdings.slice(0, 10);
  const remainingHoldings = vault.totalHoldings - displayedHoldings.length;

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsProcessing(true);
    setLastAction(panelTab);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setAmount("");
    }, 1500);
  };

  const fillAmount = (pct: number) => {
    const balance = 10000;
    setAmount((balance * pct).toFixed(2));
  };

  return (
    <>
      {/* Header Strip */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <button
            onClick={() => router.push("/vaults")}
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vaults
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-lg shrink-0">
                {vault.abbr}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {vault.name}
                </h1>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="bg-muted border border-border text-muted-foreground text-xs px-2.5 py-0.5 rounded-full">
                    {vault.category}
                  </span>
                  <span className="bg-muted border border-border text-muted-foreground text-xs px-2.5 py-0.5 rounded-full">
                    {vault.riskLevel}
                  </span>
                  {vault.acceptedTokens.map((t) => (
                    <span
                      key={t}
                      className="bg-accent text-primary text-xs font-semibold px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 border-b border-border -mb-px">
            {(["performance", "overview"] as PageTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setPageTab(tab)}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  pageTab === tab
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab === "performance" ? "Vault Performance" : "Overview"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-6">
            {pageTab === "performance" ? (
              <PerformanceTab
                vault={vault}
                chartData={chartData}
                chartTab={chartTab}
                setChartTab={setChartTab}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                periodReturn={periodReturn}
                annualizedReturn={annualizedReturn}
                maxWeight={maxWeight}
                displayedHoldings={displayedHoldings}
                remainingHoldings={remainingHoldings}
              />
            ) : (
              <OverviewTab vault={vault} />
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-96 shrink-0 space-y-6 lg:sticky lg:top-20 lg:self-start">
            <DepositWithdrawPanel
              vault={vault}
              panelTab={panelTab}
              setPanelTab={setPanelTab}
              amount={amount}
              setAmount={setAmount}
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              isProcessing={isProcessing}
              isConnected={isConnected}
              onConnect={() => setIsConnected(true)}
              onSubmit={handleSubmit}
              fillAmount={fillAmount}
            />
            <PositionPanel
              vault={vault}
              isConnected={isConnected}
              address={address}
              onConnect={() => setIsConnected(true)}
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader className="flex flex-col items-center text-center pt-4">
            <div className="w-20 h-20 rounded-full bg-ix-green/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-ix-green" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Transaction Successful
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm text-center mt-2">
              {lastAction === "deposit"
                ? `Your deposit of ${amount || "—"} has been processed and your ind${vault.abbr} tokens have been minted.`
                : `Your withdrawal has been processed and funds have been returned to your wallet.`}
            </DialogDescription>
          </DialogHeader>
          <button
            onClick={() => setShowSuccess(false)}
            className="w-full py-2.5 rounded-lg font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ─── Performance Tab ─── */
function PerformanceTab({
  vault,
  chartData,
  chartTab,
  setChartTab,
  timeRange,
  setTimeRange,
  periodReturn,
  annualizedReturn,
  maxWeight,
  displayedHoldings,
  remainingHoldings,
}: {
  vault: NonNullable<ReturnType<typeof vaults.find>>;
  chartData: { date: string; value: number }[];
  chartTab: ChartTab;
  setChartTab: (t: ChartTab) => void;
  timeRange: TimeRange;
  setTimeRange: (t: TimeRange) => void;
  periodReturn: number;
  annualizedReturn: number;
  maxWeight: number;
  displayedHoldings: NonNullable<ReturnType<typeof vaults.find>>["holdings"];
  remainingHoldings: number;
}) {
  return (
    <>
      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-border">
          <StatCell
            label="1Y Return"
            value={formatReturn(vault.return1y)}
            colored
            positive={vault.return1y >= 0}
          />
          <StatCell label="Vault Age" value={`${vault.ageInDays} days`} />
          <StatCell label="TVL" value={formatTvl(vault.tvl)} />
          <StatCell label="Vault Capacity" value={`${vault.capacityPct}%`} />
        </div>
      </motion.div>

      {/* Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-semibold text-foreground">
            Performance Breakdown
          </h3>
          <button className="text-primary text-sm font-medium hover:underline">
            View Activities →
          </button>
        </div>

        <div className="flex flex-wrap gap-6 mb-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              Max Daily Drawdown
            </p>
            <p className="text-sm font-semibold text-ix-red mt-0.5">
              {vault.maxDailyDrawdown.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              Avg Daily Volume
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              {formatTvl(vault.avgDailyVolume)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            {(["NAV Price", "Vault Balance", "30D Return"] as ChartTab[]).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    chartTab === t
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ),
            )}
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            {(["7D", "30D", "90D", "1Y"] as TimeRange[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  timeRange === t
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(222, 78%, 51%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(222, 78%, 51%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(0, 0%, 16%)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(233, 12%, 60%)", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(233, 12%, 60%)", fontSize: 11 }}
                domain={["auto", "auto"]}
                tickFormatter={(v: number) => `$${v.toFixed(2)}`}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 7%)",
                  border: "1px solid hsl(0, 0%, 16%)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "hsl(233, 12%, 60%)", fontSize: 11 }}
                itemStyle={{ color: "hsl(0, 0%, 100%)", fontWeight: 600 }}
                formatter={(value: number) => [`$${value.toFixed(4)}`, "NAV"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(222, 78%, 51%)"
                strokeWidth={2}
                fill="url(#areaGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-6 mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Period Return</p>
            <p
              className={`text-sm font-bold ${
                periodReturn >= 0 ? "text-ix-green" : "text-ix-red"
              }`}
            >
              {formatReturn(periodReturn)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Annualized</p>
            <p
              className={`text-sm font-bold ${
                annualizedReturn >= 0 ? "text-ix-green" : "text-ix-red"
              }`}
            >
              {formatReturn(annualizedReturn)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Index Composition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-5 sm:p-6"
      >
        <h3 className="text-base font-semibold text-foreground">
          Index Composition
        </h3>
        <p className="text-sm text-muted-foreground mt-1 mb-5">
          Top {displayedHoldings.length} holdings by weight
        </p>
        <div className="space-y-3">
          {displayedHoldings.map((h, i) => (
            <div key={h.ticker} className="flex items-center gap-3">
              <span className="w-5 text-xs font-mono text-muted-foreground text-right">
                {i + 1}
              </span>
              <span className="w-36 text-sm font-medium text-foreground truncate">
                {h.name}
              </span>
              <span className="w-14 text-xs font-mono text-muted-foreground">
                {h.ticker}
              </span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(h.weight / maxWeight) * 100}%` }}
                />
              </div>
              <span className="w-12 text-sm font-semibold text-foreground text-right">
                {h.weight.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        {remainingHoldings > 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            + {remainingHoldings} more holdings
          </p>
        )}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="p-5 sm:p-6 pb-0">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Type
                </th>
                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Amount
                </th>
                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:table-cell">
                  Wallet
                </th>
                <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-right pr-5 sm:pr-6">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {vault.activity.map((a, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0">
                  <td className="px-5 sm:px-6 py-3">
                    <span
                      className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        a.type === "Deposit"
                          ? "bg-ix-green/10 text-ix-green border-ix-green/30"
                          : "bg-ix-red/10 text-ix-red border-ix-red/30"
                      }`}
                    >
                      {a.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm font-semibold text-foreground">
                    {a.amount.toLocaleString()} {a.token}
                  </td>
                  <td className="px-3 py-3 text-xs font-mono text-muted-foreground hidden sm:table-cell">
                    {a.user}
                  </td>
                  <td className="px-3 py-3 text-xs text-muted-foreground text-right pr-5 sm:pr-6">
                    {a.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Overview Tab ─── */
function OverviewTab({
  vault,
}: {
  vault: NonNullable<ReturnType<typeof vaults.find>>;
}) {
  const metadata = [
    { label: "Inception Date", value: vault.inceptionDate },
    { label: "Rebalance Frequency", value: vault.rebalance },
    { label: "Management Fee", value: `${vault.fee}%` },
    { label: "Oracle Provider", value: vault.oracle },
    { label: "Smart Contract", value: vault.contract, mono: true },
    { label: "Blockchain", value: vault.blockchain },
    { label: "Accepted Tokens", value: vault.acceptedTokens.join(", ") },
    { label: "Total Holdings", value: vault.totalHoldings.toString() },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <h3 className="text-base font-semibold text-foreground mb-3">
        About this Vault
      </h3>
      <p className="text-muted-foreground leading-7 mb-8">
        {vault.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
        {metadata.map((m) => (
          <div key={m.label}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
              {m.label}
            </p>
            <p
              className={`text-sm font-semibold text-foreground ${
                m.mono ? "font-mono text-xs" : ""
              }`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Stat Cell ─── */
function StatCell({
  label,
  value,
  colored,
  positive,
}: {
  label: string;
  value: string;
  colored?: boolean;
  positive?: boolean;
}) {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
        {label}
      </p>
      <p
        className={`text-xl font-bold ${
          colored
            ? positive
              ? "text-ix-green"
              : "text-ix-red"
            : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ─── Deposit/Withdraw Panel ─── */
function DepositWithdrawPanel({
  vault,
  panelTab,
  setPanelTab,
  amount,
  setAmount,
  selectedToken,
  setSelectedToken,
  isProcessing,
  isConnected,
  onConnect,
  onSubmit,
  fillAmount,
}: {
  vault: NonNullable<ReturnType<typeof vaults.find>>;
  panelTab: PanelTab;
  setPanelTab: (t: PanelTab) => void;
  amount: string;
  setAmount: (v: string) => void;
  selectedToken: string;
  setSelectedToken: (v: string) => void;
  isProcessing: boolean;
  isConnected: boolean;
  onConnect: () => void;
  onSubmit: () => void;
  fillAmount: (pct: number) => void;
}) {
  const [showTokenSelect, setShowTokenSelect] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="glow-line h-px" />
      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["deposit", "withdraw"] as PanelTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setPanelTab(t)}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
              panelTab === t
                ? "bg-card text-primary border-primary"
                : "bg-panel-bg text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* Amount Input */}
        <div className="border border-border rounded-lg flex items-stretch focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent text-lg font-semibold text-foreground px-4 py-3 outline-none placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {panelTab === "deposit" ? (
            <div className="relative">
              <button
                onClick={() => setShowTokenSelect(!showTokenSelect)}
                className="border-l border-border bg-panel-bg px-3 flex items-center gap-1.5 text-sm font-semibold text-foreground h-full"
              >
                <div className="w-4 h-4 rounded-full bg-primary" />
                {selectedToken}
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {showTokenSelect && (
                <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10 min-w-25">
                  {vault.acceptedTokens.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedToken(t);
                        setShowTokenSelect(false);
                      }}
                      className="w-full px-3 py-2 text-sm text-foreground hover:bg-muted text-left"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="border-l border-border bg-panel-bg px-3 flex items-center text-sm font-semibold text-foreground">
              ind{vault.abbr}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Balance: 10,000.00{" "}
          {panelTab === "deposit" ? selectedToken : `ind${vault.abbr}`}
        </p>

        {/* Quick Fill */}
        <div className="flex gap-2 mt-3">
          {[0.25, 0.5, 0.75, 1].map((pct) => (
            <button
              key={pct}
              onClick={() => fillAmount(pct)}
              className="border border-border rounded-md px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary hover:bg-accent transition-colors"
            >
              {pct === 1 ? "MAX" : `${pct * 100}%`}
            </button>
          ))}
        </div>

        <div className="h-px bg-border my-4" />

        {/* Summary */}
        <div className="bg-panel-bg rounded-lg p-3 space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You receive</span>
            <span className="font-semibold text-foreground">
              {amount
                ? panelTab === "deposit"
                  ? `${(parseFloat(amount) / vault.nav).toFixed(4)} ind${vault.abbr}`
                  : `${(parseFloat(amount) * vault.nav).toFixed(2)} USDC`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">NAV per Token</span>
            <span className="font-semibold text-foreground">
              {formatNav(vault.nav)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Annual Fee</span>
            <span className="font-semibold text-foreground">{vault.fee}%</span>
          </div>
          {panelTab === "deposit" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Est. 1Y Return</span>
              <span className="font-semibold text-ix-green">
                {formatReturn(vault.return1y)}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        {isConnected ? (
          <button
            onClick={onSubmit}
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            className={`w-full py-3 rounded-lg font-semibold text-sm mt-4 transition-colors flex items-center justify-center gap-2 ${
              panelTab === "deposit"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-foreground text-background hover:bg-foreground/90"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : panelTab === "deposit" ? (
              "Deposit"
            ) : (
              "Withdraw"
            )}
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="w-full py-3 rounded-lg font-semibold text-sm mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Connect Wallet
          </button>
        )}

        <p className="text-xs text-center text-muted-foreground mt-3">
          Smart contract audited. Funds deployed on-chain.
        </p>
      </div>
    </div>
  );
}

/* ─── Position Panel ─── */
function PositionPanel({
  vault,
  isConnected,
  address,
  onConnect,
}: {
  vault: NonNullable<ReturnType<typeof vaults.find>>;
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="glow-line h-px" />
      <div className="p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Your Position
        </h3>
        {isConnected && address ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Wallet</span>
              <span className="font-mono text-xs text-foreground">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                ind{vault.abbr} Balance
              </span>
              <span className="font-semibold text-foreground">1,234.5678</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">USD Value</span>
              <span className="font-semibold text-foreground">
                ${(1234.5678 * vault.nav).toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <Wallet className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Connect your wallet to view your position
            </p>
            <button
              onClick={onConnect}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaultDetail;
