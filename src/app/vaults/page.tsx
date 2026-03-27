"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { vaults, formatTvl, formatReturn } from "@/data/vaults";

const categories = ["All", "Large Cap", "Small Cap", "Sector"];

type SortKey = "tvl" | "return30d" | "return1y" | null;
type SortDir = "asc" | "desc";

export default function VaultsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const totalTvl = vaults.reduce((s, v) => s + v.tvl, 0);
  const totalDepositors = vaults.reduce((s, v) => s + v.depositors, 0);

  const filtered = useMemo(() => {
    let list =
      activeTab === "All"
        ? vaults
        : vaults.filter((v) => v.category === activeTab);
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        return sortDir === "asc" ? av - bv : bv - av;
      });
    }
    return list;
  }, [activeTab, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <ArrowUpDown size={12} className="text-muted-foreground ml-1" />;
    return sortDir === "asc" ? (
      <ArrowUp size={12} className="text-primary ml-1" />
    ) : (
      <ArrowDown size={12} className="text-primary ml-1" />
    );
  }

  return (
    <div className="min-h-screen b">
      {/* Hero */}
      <section className=" border-b border-border py-14 text-center">
        {/* <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase mb-3">
          IndiceX VAULTS
        </p> */}
        <h1 className="text-4xl font-bold text-primary mb-2">IndiceX Vaults</h1>
        <p className="text-[0.95rem] text-muted-foreground mt-2 mb-8 max-w-lg mx-auto">
          Deposit stablecoins into tokenized U.S. market indices vaults. Earn
          returns on-chain.
        </p>
        <div className="inline-flex mx-auto border border-border rounded-xl divide-x divide-border overflow-hidden bg-card shadow-sm">
          <div className="px-12 py-5 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
              Total Value Locked
            </p>
            <p className="text-3xl font-bold text-black">
              {formatTvl(totalTvl)}
            </p>
          </div>
          <div className="px-12 py-5 text-center">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5">
              Total Depositors
            </p>
            <p className="text-3xl font-bold text-black">
              {totalDepositors.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="border-b border-border px-8 flex gap-0 mt-0 bg-card">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveTab(c)}
            className={`px-5 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-colors duration-150 ${
              activeTab === c
                ? "text-primary border-primary font-semibold"
                : "text-muted-foreground border-transparent hover:text-black"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-card border-b border-border px-8 py-3 flex items-center justify-between">
        <div className="flex gap-3">
          {["Return Period: 30D", "Deposit Asset: All", "Risk: All"].map(
            (label) => (
              <button
                key={label}
                className="border border-border rounded-lg px-3 py-1.5 text-sm font-medium bg-card text-black cursor-pointer hover:border-primary transition-colors duration-150"
              >
                {label} ▾
              </button>
            ),
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          Showing {filtered.length} vaults
        </span>
      </div>

      {/* Table */}
      <div className="bg-card mx-8 mt-6 rounded-2xl border border-border overflow-hidden mb-8">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-muted border-b border-border">
                <th className="text-left px-6 py-3 text-[0.73rem] font-semibold uppercase  text-muted-foreground">
                  Vault
                </th>
                <th
                  className="text-left px-4  text-[0.73rem] font-semibold uppercase  text-muted-foreground cursor-pointer select-none w-48"
                  onClick={() => toggleSort("tvl")}
                >
                  <span className="inline-flex items-center">
                    TVL <SortIcon col="tvl" />
                  </span>
                </th>
                <th
                  className="text-left   text-[0.73rem] font-semibold uppercase  text-muted-foreground cursor-pointer select-none w-32"
                  onClick={() => toggleSort("return30d")}
                >
                  <span className="inline-flex items-center">
                    30D Return <SortIcon col="return30d" />
                  </span>
                </th>
                <th
                  className="text-left   text-[0.73rem] font-semibold uppercase  text-muted-foreground cursor-pointer select-none w-32"
                  onClick={() => toggleSort("return1y")}
                >
                  <span className="inline-flex items-center">
                    1Y Return <SortIcon col="return1y" />
                  </span>
                </th>
                <th className="text-left px-4  text-[0.73rem] font-semibold uppercase  text-muted-foreground w-28">
                  Age
                </th>
                <th className="text-left   text-[0.73rem] font-semibold uppercase  text-muted-foreground w-28">
                  Depositors
                </th>
                {/* <th className="text-right px-6  text-[0.73rem] font-semibold uppercase  text-muted-foreground w-28">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr
                  key={v.id}
                  onClick={() => router.push(`/vaults/${v.id}`)}
                  className={`px-6 py-4 hover:bg-surface-hover cursor-pointer transition-colors duration-100 ${
                    i < filtered.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center font-bold text-[0.8rem] text-primary">
                        {v.abbr}
                      </div>
                      <div>
                        <p className="font-semibold text-[0.95rem] text-black">
                          {v.name}
                        </p>
                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium mt-0.5">
                          {v.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-[0.95rem] text-black">
                      {formatTvl(v.tvl)}
                    </p>
                    <div className="mt-1.5 h-1 w-32 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${v.capacityPct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {v.capacityPct}% capacity
                    </p>
                  </td>
                  <td
                    className={`px-4 py-4 font-semibold text-[0.9rem] tabular-nums ${v.return30d >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {formatReturn(v.return30d)}
                  </td>
                  <td
                    className={`px-4 py-4 font-semibold text-[0.9rem] tabular-nums ${v.return1y >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {formatReturn(v.return1y)}
                  </td>
                  <td className="px-1 py-4 font-medium text-sm text-black">
                    {v.ageInDays} days
                  </td>
                  <td className="px-6 py-4 font-medium text-sm text-black">
                    {v.depositors.toLocaleString()}
                  </td>
                  {/* <td className="pr-2 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/vaults/${v.id}`);
                      }}
                      className="border border-border rounded-lg px-3 py-1.5 text-sm font-semibold text-black bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150"
                    >
                      View Vault
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {filtered.map((v) => (
            <div
              key={v.id}
              onClick={() => router.push(`/vaults/${v.id}`)}
              className="p-4 hover:bg-surface-hover cursor-pointer transition-colors duration-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center font-bold text-[0.8rem] text-primary">
                  {v.abbr}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-black">{v.name}</p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium mt-0.5">
                    {v.category}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">TVL</p>
                  <p className="font-semibold text-black">{formatTvl(v.tvl)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">30D</p>
                  <p
                    className={`font-semibold ${v.return30d >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {formatReturn(v.return30d)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">1Y</p>
                  <p
                    className={`font-semibold ${v.return1y >= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {formatReturn(v.return1y)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="px-6 py-3 bg-surface-muted border-t border-border text-sm text-muted-foreground text-center">
          Want to list your vault?{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Contact Us →
          </span>
        </div> */}
      </div>
    </div>
  );
}
