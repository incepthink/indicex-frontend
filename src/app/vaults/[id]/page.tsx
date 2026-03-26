"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Wallet,
  Activity,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { vaults, formatTvl, formatReturn, formatNav } from "@/data/vaults";

const chartTabs = ["NAV Price", "Vault Balance", "30D Return"] as const;
const timeRanges = ["7D", "30D", "90D", "1Y"] as const;

function generateChartData(nav: number, range: string) {
  const days =
    range === "7D" ? 7 : range === "30D" ? 30 : range === "90D" ? 90 : 365;
  const startFactor =
    range === "7D"
      ? 0.997
      : range === "30D"
        ? 0.963
        : range === "90D"
          ? 0.935
          : 0.8;
  const startNav = nav * startFactor;
  const points = Math.min(
    days,
    range === "1Y" ? 52 : range === "90D" ? 30 : days,
  );
  const data = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const value =
      startNav + (nav - startNav) * t + (Math.random() - 0.5) * 0.003;
    const date = new Date();
    date.setDate(date.getDate() - Math.round(days * (1 - t)));
    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: parseFloat(value.toFixed(4)),
    });
  }
  return data;
}

export default function VaultDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const vault = vaults.find((v) => v.id === id);

  const [pageTab, setPageTab] = useState<"performance" | "overview">(
    "performance",
  );
  const [chartTab, setChartTab] =
    useState<(typeof chartTabs)[number]>("NAV Price");
  const [timeRange, setTimeRange] =
    useState<(typeof timeRanges)[number]>("30D");
  const [depositWithdraw, setDepositWithdraw] = useState<
    "deposit" | "withdraw"
  >("deposit");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState("USDC");

  const chartData = useMemo(
    () => (vault ? generateChartData(vault.nav, timeRange) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vault?.nav, timeRange, chartTab],
  );

  if (!vault) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <h2 className="text-xl font-bold text-black mb-2">Vault not found</h2>
        <button
          onClick={() => router.push("/vaults")}
          className="text-primary text-sm font-medium hover:underline"
        >
          ← Back to Vaults
        </button>
      </div>
    );
  }

  const parsedAmount = parseFloat(depositAmount) || 0;
  const receiveTokens =
    parsedAmount > 0 ? (parsedAmount / vault.nav).toFixed(4) : "0.0000";
  const periodReturn =
    chartData.length >= 2
      ? (
          ((chartData[chartData.length - 1].value - chartData[0].value) /
            chartData[0].value) *
          100
        ).toFixed(2)
      : "0.00";
  const periodReturnNum = parseFloat(periodReturn);
  const maxWeight = Math.max(...vault.holdings.map((h) => h.weight));

  return (
    <>
      {/* Header strip — consistent card background to avoid MUI layout bleed */}
      <div className="bg-card border-b border-border">
        {/* Back */}
        <div className="px-8 pt-5 pb-2">
          <button
            onClick={() => router.back()}
            className="text-sm text-primary font-medium hover:underline"
          >
            ← Back to Vaults
          </button>
        </div>

        {/* Header */}
        <div className="px-8 pb-0 pt-2 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-base text-primary">
              {vault.abbr}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">{vault.name}</h1>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                  {vault.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                  {vault.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Deposit Token:
              </span>
              {vault.acceptedTokens.map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold px-2 py-0.5 rounded bg-accent text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Page tabs */}
        <div className="mt-5 border-b border-border px-8 flex gap-0">
          {(["performance", "overview"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setPageTab(tab)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                pageTab === tab
                  ? "text-primary border-primary font-semibold"
                  : "text-muted-foreground border-transparent hover:text-black"
              }`}
            >
              {tab === "performance" ? "Vault Performance" : "Overview"}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-5 px-8 py-5 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-4">
          {pageTab === "performance" ? (
            <>
              {/* Stats row */}
              <div className="bg-card border border-border rounded-xl px-6 py-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border">
                  {[
                    {
                      label: "1Y Return",
                      value: formatReturn(vault.return1y),
                      color:
                        vault.return1y >= 0
                          ? "text-success"
                          : "text-destructive",
                    },
                    {
                      label: "Vault Age",
                      value: `${vault.ageInDays} days`,
                      color: "text-black",
                    },
                    {
                      label: "TVL",
                      value: formatTvl(vault.tvl),
                      color: "text-black",
                    },
                    {
                      label: "Vault Capacity",
                      value: `${vault.capacityPct}%`,
                      color: "text-black",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className={`${i > 0 ? "md:pl-5" : ""} ${i < 3 ? "md:pr-5" : ""}`}
                    >
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-semibold">
                        {s.label}
                      </p>
                      <p className={`text-xl font-bold ${s.color}`}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart card */}
              <div className="bg-card border border-border rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-black">
                    Performance Breakdown
                  </h3>
                  <span className="text-sm text-primary cursor-pointer hover:underline">
                    View Activities →
                  </span>
                </div>
                <div className="flex gap-8 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Max Daily Drawdown
                    </p>
                    <p className="text-sm font-semibold text-destructive">
                      {vault.maxDailyDrawdown}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Avg Daily Volume
                    </p>
                    <p className="text-sm font-semibold text-black">
                      ${vault.avgDailyVolume.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex gap-1">
                    {chartTabs.map((t) => (
                      <button
                        key={t}
                        onClick={() => setChartTab(t)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-150 ${
                          chartTab === t
                            ? "bg-black text-card"
                            : "text-muted-foreground hover:text-black"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {timeRanges.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeRange(t)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-150 ${
                          timeRange === t
                            ? "bg-black text-card"
                            : "text-muted-foreground hover:text-black"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="hsl(222, 78%, 51%)"
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(222, 78%, 51%)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="var(--border)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickLine={false}
                      axisLine={false}
                      domain={["auto", "auto"]}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        color: "var(--foreground)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(222, 78%, 51%)"
                      strokeWidth={1.5}
                      fill="url(#areaGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-6 mt-3 text-sm">
                  <span>
                    Period Return:{" "}
                    <span
                      className={
                        periodReturnNum >= 0
                          ? "text-success font-semibold"
                          : "text-destructive font-semibold"
                      }
                    >
                      {periodReturnNum >= 0 ? "+" : ""}
                      {periodReturn}%
                    </span>
                  </span>
                  <span>
                    Annualized:{" "}
                    <span className="text-success font-semibold">
                      {formatReturn(vault.return1y)}
                    </span>
                  </span>
                </div>
              </div>

              {/* Index composition */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-black">Index Composition</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Top {vault.holdings.length} holdings by weight
                </p>
                <div className="mt-4 space-y-2.5">
                  {vault.holdings.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs w-5 text-muted-foreground font-mono">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-black w-36 truncate">
                        {h.name}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground w-14">
                        {h.ticker}
                      </span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(h.weight / maxWeight) * 80}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-black w-10 text-right">
                        {h.weight}%
                      </span>
                    </div>
                  ))}
                </div>
                {vault.totalHoldings > vault.holdings.length && (
                  <p className="text-sm text-muted-foreground mt-3">
                    + {vault.totalHoldings - vault.holdings.length} more
                    holdings
                  </p>
                )}
              </div>

              {/* Recent activity */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-black">Recent Activity</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left text-xs uppercase tracking-wide text-muted-foreground pb-2">
                          Type
                        </th>
                        <th className="text-left text-xs uppercase tracking-wide text-muted-foreground pb-2">
                          Amount
                        </th>
                        <th className="text-left text-xs uppercase tracking-wide text-muted-foreground pb-2">
                          Wallet
                        </th>
                        <th className="text-left text-xs uppercase tracking-wide text-muted-foreground pb-2">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vault.activity.map((a, i) => (
                        <tr
                          key={i}
                          className={
                            i < vault.activity.length - 1
                              ? "border-b border-border/40"
                              : ""
                          }
                        >
                          <td className="py-3">
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                                a.type === "Deposit"
                                  ? "bg-success/10 text-success border-success/30"
                                  : "bg-destructive/10 text-destructive border-destructive/30"
                              }`}
                            >
                              {a.type}
                            </span>
                          </td>
                          <td className="py-3 text-sm font-semibold text-black">
                            ${a.amount.toLocaleString()} {a.token}
                          </td>
                          <td className="py-3 text-xs font-mono text-muted-foreground">
                            {a.user}
                          </td>
                          <td className="py-3 text-xs text-muted-foreground">
                            {a.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Overview tab */
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-black mb-3">
                About this Vault
              </h3>
              <p className="text-sm text-muted-foreground leading-7 mb-5">
                {vault.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  ["Inception Date", vault.inceptionDate],
                  ["Rebalance Frequency", vault.rebalance],
                  ["Management Fee", vault.fee],
                  ["Oracle Provider", vault.oracle],
                  ["Smart Contract", vault.contract, true],
                  ["Blockchain", vault.blockchain],
                  ["Accepted Tokens", vault.acceptedTokens.join(", ")],
                  ["Total Holdings", vault.totalHoldings.toString()],
                ].map(([label, value, mono]) => (
                  <div key={label as string}>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    <p
                      className={`text-sm font-semibold text-black ${mono ? "font-mono text-xs" : ""}`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="w-full lg:w-96 shrink-0 space-y-4 lg:sticky lg:top-20">
          {/* Deposit/Withdraw panel */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="flex border-b border-border">
              {(["deposit", "withdraw"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDepositWithdraw(tab)}
                  className={`flex-1 py-3 text-sm font-semibold text-center cursor-pointer transition-colors duration-150 border-b-2 ${
                    depositWithdraw === tab
                      ? "bg-card text-primary border-primary"
                      : "bg-surface-muted text-muted-foreground border-transparent"
                  }`}
                >
                  {tab === "deposit" ? "Deposit" : "Withdraw"}
                </button>
              ))}
            </div>
            <div className="px-5 py-4">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">
                Amount
              </label>
              <div className="border border-border rounded-lg overflow-hidden flex hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-150">
                <input
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="flex-1 px-3 py-3 text-lg font-semibold outline-none bg-card text-black"
                />
                {depositWithdraw === "deposit" ? (
                  <div className="border-l border-border px-3 bg-surface-muted flex items-center gap-1.5 cursor-pointer text-sm font-semibold text-black">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    {selectedToken}
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </div>
                ) : (
                  <div className="border-l border-border px-3 bg-surface-muted flex items-center text-sm font-semibold text-muted-foreground">
                    ind{vault.abbr}
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                {depositWithdraw === "deposit"
                  ? `Balance: 10,000 ${selectedToken}`
                  : `Balance: 0 ind${vault.abbr} tokens`}
              </p>

              <div className="flex gap-2 mt-3">
                {[
                  { label: "25%", val: "2500" },
                  { label: "50%", val: "5000" },
                  { label: "75%", val: "7500" },
                  { label: "MAX", val: "10000" },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setDepositAmount(b.val)}
                    className="border border-border rounded-md px-2.5 py-1 text-xs font-semibold text-muted-foreground cursor-pointer hover:border-primary hover:text-primary hover:bg-accent transition-all duration-100"
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              <div className="my-4 border-t border-border/50" />

              <div className="bg-surface-muted rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">
                    You receive
                  </span>
                  <span className="font-semibold text-black">
                    {depositWithdraw === "deposit"
                      ? `${receiveTokens} ind${vault.abbr}`
                      : `~$${parsedAmount > 0 ? (parsedAmount * vault.nav).toFixed(2) : "0"} USDC`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>NAV per Token</span>
                  <span>{formatNav(vault.nav)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Annual Fee</span>
                  <span>{vault.fee} / yr</span>
                </div>
                {depositWithdraw === "deposit" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Est. 1Y Return
                    </span>
                    <span className="font-semibold text-success">
                      +{vault.return1y}%
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => alert("This requires wallet connection")}
                className={`mt-4 w-full py-3 rounded-lg font-semibold text-sm transition-opacity duration-150 hover:opacity-90 ${
                  depositWithdraw === "deposit"
                    ? "bg-primary text-primary-foreground"
                    : "bg-black text-card"
                }`}
              >
                {depositWithdraw === "deposit" ? "Deposit" : "Withdraw"}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Smart contract audited. Funds deployed on-chain.
              </p>
            </div>
          </div>

          {/* Your Position */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-black mb-4">Your Position</h3>
            <div className="py-5 flex flex-col items-center">
              <Wallet size={28} className="text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Connect your wallet to view your position
              </p>
              <button
                onClick={() => alert("This requires wallet connection")}
                className="mt-3 border border-primary text-primary rounded-lg px-4 py-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-150"
              >
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Vault Health */}
          {/* <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-black mb-3">Vault Health</h3>
            <div className="space-y-3">
              {[
                {
                  icon: Activity,
                  label: "Oracle Feed",
                  status: "Live & Active",
                },
                {
                  icon: ShieldCheck,
                  label: "Smart Contract",
                  status: "Verified",
                },
                {
                  icon: RefreshCw,
                  label: "Rebalancing",
                  status: "On Schedule",
                },
              ].map(({ icon: Icon, label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={15} className="text-muted-foreground" />
                    <span className="text-sm text-black">{label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs font-semibold text-success">
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
