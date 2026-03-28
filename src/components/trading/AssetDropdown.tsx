"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { dropdownAssets } from "@/data/mockData";

interface AssetDropdownProps {
  onSelect: (symbol: string) => void;
  onClose: () => void;
}

const tabs = [
  "All",
  "Perps",
  "Spot",
  "Crypto",
  "Tradfi",
  "HIP-3",
  "Trending",
  "Pre-launch",
];

const AssetDropdown = ({ onSelect, onClose }: AssetDropdownProps) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = dropdownAssets.filter((a) =>
    a.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-2xl max-h-[500px] overflow-hidden flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 bg-secondary rounded px-2 py-1.5">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search markets..."
            className="bg-transparent text-foreground text-[13px] outline-none flex-1 placeholder:text-text-muted"
            autoFocus
          />
          <button onClick={onClose}>
            <X className="w-4 h-4 text-text-muted hover:text-foreground" />
          </button>
        </div>
      </div>
      <div className="flex gap-1 px-3 py-2 border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-2 py-1 rounded text-[11px] whitespace-nowrap ${activeTab === t ? "bg-primary text-primary-foreground" : "text-text-secondary hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-text-muted text-[11px] border-b border-border">
              <th className="text-left px-3 py-1.5 font-normal">Symbol</th>
              <th className="text-right px-3 py-1.5 font-normal">Last Price</th>
              <th className="text-right px-3 py-1.5 font-normal">24h Change</th>
              <th className="text-right px-3 py-1.5 font-normal">8h Funding</th>
              <th className="text-right px-3 py-1.5 font-normal">Volume</th>
              <th className="text-right px-3 py-1.5 font-normal">
                Open Interest
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr
                key={a.symbol}
                className="hover:bg-surface-hover cursor-pointer border-b border-border"
                onClick={() => {
                  if (a.symbol === "S&P500-USDC" || a.symbol === "S&P500-DAI") {
                    onSelect(a.symbol);
                  }
                  onClose();
                }}
              >
                <td className="px-3 py-1.5 text-foreground font-medium">
                  {a.symbol}
                </td>
                <td className="px-3 py-1.5 text-right text-foreground">
                  {a.lastPrice}
                </td>
                <td
                  className={`px-3 py-1.5 text-right ${a.change24h.startsWith("-") ? "text-red" : "text-green"}`}
                >
                  {a.change24h}
                </td>
                <td className="px-3 py-1.5 text-right text-text-secondary">
                  {a.funding8h}
                </td>
                <td className="px-3 py-1.5 text-right text-text-secondary">
                  {a.volume}
                </td>
                <td className="px-3 py-1.5 text-right text-text-secondary">
                  {a.oi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 px-3 py-2 border-t border-border text-[11px] text-text-muted">
        <span>⌘K Open</span>
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>⌘S Favorite</span>
        <span>Esc Close</span>
      </div>
    </div>
  );
};

export default AssetDropdown;
