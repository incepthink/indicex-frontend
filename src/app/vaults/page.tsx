"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react";
import { vaults, formatTvl, formatReturn } from "@/data/vaults";
import type { Vault } from "@/data/vaults";

type Category = "All" | "Large Cap" | "Small Cap" | "Sector";
type SortKey = "tvl" | "return30d" | "return1y" | "depositors" | "ageInDays";
type SortDir = "asc" | "desc";

const categories: Category[] = ["All", "Large Cap", "Small Cap", "Sector"];

const returnPeriods = ["30D", "90D", "1Y", "All Time"];
const depositAssets = ["All Assets", "USDC", "USDT"];
const riskLevels = ["All Risk", "Low", "Medium", "High"];

function FilterDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-card border border-border text-foreground rounded-lg px-4 py-2.5 pr-10 text-sm font-medium cursor-pointer hover:border-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

function VaultAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-sm shrink-0">
      {initials}
    </div>
  );
}

function ReturnValue({ value }: { value: number }) {
  return (
    <span
      className={`font-semibold tabular-nums ${value >= 0 ? "text-ix-green" : "text-ix-red"}`}
    >
      {formatReturn(value)}
    </span>
  );
}

function CapacityBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
    </div>
  );
}

function SortHeader({
  label,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  className = "",
}: {
  label: string;
  sortKey: SortKey;
  currentSort: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const isActive = currentSort === sortKey;
  const Icon = isActive
    ? currentDir === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-1 uppercase text-xs font-semibold tracking-wider transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"} ${className}`}
    >
      {label}
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
}

export default function VaultsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [returnPeriod, setReturnPeriod] = useState("30D");
  const [depositAsset, setDepositAsset] = useState("All Assets");
  const [riskLevel, setRiskLevel] = useState("All Risk");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filteredVaults = useMemo(() => {
    let result = [...vaults];
    if (activeCategory !== "All") {
      result = result.filter((v) => v.category === activeCategory);
    }
    result.sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      return (a[sortKey] - b[sortKey]) * mul;
    });
    return result;
  }, [activeCategory, sortKey, sortDir]);

  const totalTvl = vaults.reduce((s, v) => s + v.tvl, 0);
  const totalDepositors = vaults.reduce((s, v) => s + v.depositors, 0);

  return (
    <div className="dark bg-background min-h-screen font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-hero"
          >
            IndiceX Vaults
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl"
          >
            Deposit stablecoins. Receive on-chain index exposure. Redeem
            anytime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <div className="bg-card border border-border rounded-xl p-5 flex-1 max-w-xs card-shine relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px glow-line" />
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Total Value Locked
              </div>
              <p className="text-3xl font-bold text-foreground tabular-nums animate-count-up">
                {formatTvl(totalTvl)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex-1 max-w-xs card-shine relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px glow-line" />
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Users className="w-4 h-4 text-primary" />
                Total Depositors
              </div>
              <p className="text-3xl font-bold text-foreground tabular-nums animate-count-up">
                {totalDepositors.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <FilterDropdown
            options={returnPeriods}
            value={returnPeriod}
            onChange={setReturnPeriod}
          />
          <FilterDropdown
            options={depositAssets}
            value={depositAsset}
            onChange={setDepositAsset}
          />
          <FilterDropdown
            options={riskLevels}
            value={riskLevel}
            onChange={setRiskLevel}
          />
          <span className="ml-auto text-sm text-muted-foreground">
            {filteredVaults.length} vault
            {filteredVaults.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-panel-bg">
                <th className="text-left px-5 py-4">
                  <span className="uppercase text-xs font-semibold tracking-wider text-muted-foreground">
                    Vault
                  </span>
                </th>
                <th className="text-right px-5 py-4">
                  <SortHeader
                    label="TVL"
                    sortKey="tvl"
                    currentSort={sortKey}
                    currentDir={sortDir}
                    onSort={handleSort}
                    className="justify-end"
                  />
                </th>
                <th className="text-right px-5 py-4">
                  <SortHeader
                    label="30D Return"
                    sortKey="return30d"
                    currentSort={sortKey}
                    currentDir={sortDir}
                    onSort={handleSort}
                    className="justify-end"
                  />
                </th>
                <th className="text-right px-5 py-4">
                  <SortHeader
                    label="1Y Return"
                    sortKey="return1y"
                    currentSort={sortKey}
                    currentDir={sortDir}
                    onSort={handleSort}
                    className="justify-end"
                  />
                </th>
                <th className="text-right px-5 py-4">
                  <SortHeader
                    label="Age"
                    sortKey="ageInDays"
                    currentSort={sortKey}
                    currentDir={sortDir}
                    onSort={handleSort}
                    className="justify-end"
                  />
                </th>
                <th className="text-right px-5 py-4">
                  <SortHeader
                    label="Depositors"
                    sortKey="depositors"
                    currentSort={sortKey}
                    currentDir={sortDir}
                    onSort={handleSort}
                    className="justify-end"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVaults.map((v, i) => (
                <motion.tr
                  key={v.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  onClick={() => router.push(`/vaults/${v.id}`)}
                  className="border-b border-border last:border-b-0 hover:bg-row-bg cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <VaultAvatar name={v.name} />
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {v.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {v.abbr}
                          </span>
                          <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                            {v.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-semibold text-foreground tabular-nums">
                      {formatTvl(v.tvl)}
                    </p>
                    <CapacityBar pct={v.capacityPct} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ReturnValue value={v.return30d} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ReturnValue value={v.return1y} />
                  </td>
                  <td className="px-5 py-4 text-right text-muted-foreground tabular-nums">
                    {v.ageInDays}d
                  </td>
                  <td className="px-5 py-4 text-right text-foreground tabular-nums">
                    {v.depositors.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredVaults.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onClick={() => router.push(`/vaults/${v.id}`)}
              className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <VaultAvatar name={v.name} />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {v.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">
                      {v.abbr}
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                      {v.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">TVL</p>
                  <p className="font-semibold text-foreground text-sm tabular-nums">
                    {formatTvl(v.tvl)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">30D</p>
                  <p className="text-sm">
                    <ReturnValue value={v.return30d} />
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">1Y</p>
                  <p className="text-sm">
                    <ReturnValue value={v.return1y} />
                  </p>
                </div>
              </div>
              <CapacityBar pct={v.capacityPct} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
