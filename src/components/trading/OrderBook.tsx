"use client";

import { useState } from "react";
import type { OrderBookEntry } from "@/data/mockData";

interface OrderBookProps {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  spread: { value: number; pct: string };
  assetName: string;
}

const OrderBook = ({ asks, bids, spread, assetName }: OrderBookProps) => {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">(
    "orderbook",
  );
  const maxTotal = Math.max(
    ...asks.map((a) => a.total),
    ...bids.map((b) => b.total),
  );

  return (
    <div className="bg-panel-bg border-b border-border xl-custom:border-b-0 xl-custom:border-r">
      {/* Tabs */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("orderbook")}
            className={`text-[12px] pb-1 ${activeTab === "orderbook" ? "text-foreground border-b-2 border-primary" : "text-text-secondary"}`}
          >
            Order Book
          </button>
          <button
            onClick={() => setActiveTab("trades")}
            className={`text-[12px] pb-1 ${activeTab === "trades" ? "text-foreground border-b-2 border-primary" : "text-text-secondary"}`}
          >
            Trades
          </button>
        </div>
        <button className="text-text-muted text-[14px]">⋮</button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
        <select className="bg-secondary text-foreground text-[11px] border border-border rounded px-1.5 py-0.5 outline-none">
          <option>0.1</option>
          <option>0.5</option>
          <option>1.0</option>
        </select>
        <select className="bg-secondary text-foreground text-[11px] border border-border rounded px-1.5 py-0.5 outline-none">
          <option>{assetName.split("-")[0]}</option>
        </select>
      </div>

      {/* Header */}
      <div className="grid grid-cols-3 px-3 py-1 text-[11px] text-text-muted border-b border-border">
        <span>Price</span>
        <span className="text-right">Size ({assetName.split("-")[0]})</span>
        <span className="text-right">Total ({assetName.split("-")[0]})</span>
      </div>

      {/* Asks */}
      <div className="flex flex-col-reverse">
        {asks.map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-3 px-3 text-[12px] hover:bg-surface-hover relative"
            style={{ height: "22px", lineHeight: "22px" }}
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-red"
              style={{
                width: `${(entry.total / maxTotal) * 100}%`,
                opacity: 0.15,
              }}
            />
            <span className="text-red relative z-10">
              {entry.price.toFixed(1)}
            </span>
            <span className="text-right text-foreground relative z-10">
              {entry.size.toFixed(3)}
            </span>
            <span className="text-right text-foreground relative z-10">
              {entry.total.toFixed(3)}
            </span>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div
        className="flex items-center justify-center gap-4 px-3 text-[11px] text-text-secondary border-y border-border"
        style={{ height: "24px" }}
      >
        <span>Spread</span>
        <span>{spread.value.toFixed(1)}</span>
        <span>{spread.pct}</span>
      </div>

      {/* Bids */}
      <div>
        {bids.map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-3 px-3 text-[12px] hover:bg-surface-hover relative"
            style={{ height: "22px", lineHeight: "22px" }}
          >
            <div
              className="absolute right-0 top-0 bottom-0 bg-green"
              style={{
                width: `${(entry.total / maxTotal) * 100}%`,
                opacity: 0.15,
              }}
            />
            <span className="text-green relative z-10">
              {entry.price.toFixed(1)}
            </span>
            <span className="text-right text-foreground relative z-10">
              {entry.size.toFixed(3)}
            </span>
            <span className="text-right text-foreground relative z-10">
              {entry.total.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
