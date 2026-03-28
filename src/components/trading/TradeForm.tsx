"use client";

import { useState } from "react";

interface TradeFormProps {
  orderSide: "long" | "short";
  setOrderSide: (s: "long" | "short") => void;
  orderType: "market" | "limit" | "pro";
  setOrderType: (t: "market" | "limit" | "pro") => void;
  marginMode: "isolated" | "classic";
  setMarginMode: (m: "isolated" | "classic") => void;
  sliderValue: number;
  setSliderValue: (v: number) => void;
  assetName: string;
}

const TradeForm = ({
  orderSide,
  setOrderSide,
  orderType,
  setOrderType,
  marginMode,
  setMarginMode,
  sliderValue,
  setSliderValue,
  assetName,
}: TradeFormProps) => {
  const [reduceOnly, setReduceOnly] = useState(false);
  const [tpsl, setTpsl] = useState(false);

  const symbol = assetName.split("-")[0];

  return (
    <div className="bg-panel-bg flex flex-col">
      {/* Margin mode */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
        {(["isolated", "classic"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setMarginMode(mode)}
            className={`px-3 h-7 rounded text-[12px] capitalize ${
              marginMode === mode
                ? "bg-foreground text-background font-medium"
                : "border border-border text-text-secondary hover:text-foreground"
            }`}
          >
            {mode === "isolated" ? "Isolated" : "Classic"}
          </button>
        ))}
        <button className="px-3 h-7 rounded text-[12px] bg-primary text-primary-foreground font-medium">
          20x
        </button>
      </div>

      {/* Order type tabs */}
      <div className="flex items-center gap-0 px-3 border-b border-border">
        {(["market", "limit", "pro"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setOrderType(t)}
            className={`px-3 py-2 text-[12px] capitalize relative ${
              orderType === t
                ? "text-foreground"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            {t === "pro" ? "Pro ▾" : t.charAt(0).toUpperCase() + t.slice(1)}
            {orderType === t && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Buy/Sell toggle */}
      <div className="flex px-3 pt-3 gap-0">
        <button
          onClick={() => setOrderSide("long")}
          className={`flex-1 h-9 rounded-l text-[13px] font-medium ${
            orderSide === "long"
              ? "bg-green text-primary-foreground"
              : "bg-surface-hover text-text-muted"
          }`}
        >
          Buy / Long
        </button>
        <button
          onClick={() => setOrderSide("short")}
          className={`flex-1 h-9 rounded-r text-[13px] font-medium ${
            orderSide === "short"
              ? "bg-red text-primary-foreground"
              : "bg-surface-hover text-text-muted"
          }`}
        >
          Sell / Short
        </button>
      </div>

      {/* Info rows */}
      <div className="px-3 pt-3 space-y-1">
        <div className="flex justify-between text-[12px]">
          <span className="text-text-secondary">Available to Trade</span>
          <span className="text-foreground">0.00 USDC</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-text-secondary">Current Position</span>
          <span className="text-foreground">0.000 {symbol}</span>
        </div>
      </div>

      {/* Limit price input */}
      {orderType === "limit" && (
        <div className="px-3 pt-3">
          <div className="flex items-center justify-between bg-secondary border border-border rounded px-2 py-1.5">
            <span className="text-[11px] text-text-secondary">Price</span>
            <input
              type="number"
              className="bg-transparent text-right text-foreground text-[13px] outline-none w-24"
              placeholder="0.0"
            />
            <span className="text-[11px] text-text-secondary ml-1">USD</span>
          </div>
        </div>
      )}

      {/* Size input */}
      <div className="px-3 pt-3">
        <div className="flex items-center justify-between bg-secondary border border-border rounded px-2 py-1.5">
          <span className="text-[11px] text-text-secondary">Size</span>
          <input
            type="number"
            className="bg-transparent text-right text-foreground text-[13px] outline-none flex-1 mx-2"
            placeholder="0"
          />
          <span className="text-[11px] text-text-secondary flex items-center gap-0.5">
            {symbol}{" "}
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-3 pt-3">
        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(+e.target.value)}
          className="w-full h-1 rounded-full appearance-none cursor-pointer accent-primary"
          style={{
            background: `linear-gradient(to right, hsl(222,78%,51%) ${sliderValue}%, hsl(0,0%,12%) ${sliderValue}%)`,
          }}
        />
        <div className="flex justify-between text-[10px] text-text-muted mt-1">
          {[0, 25, 50, 75, 100].map((v) => (
            <button
              key={v}
              onClick={() => setSliderValue(v)}
              className="hover:text-foreground"
            >
              {v === 0 ? "○" : "●"}
            </button>
          ))}
        </div>
        <div className="text-right text-[11px] text-foreground mt-0.5">
          {sliderValue} %
        </div>
      </div>

      {/* Checkboxes */}
      <div className="px-3 pt-2 space-y-1.5">
        <label className="flex items-center gap-2 text-[12px] text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={reduceOnly}
            onChange={(e) => setReduceOnly(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-border accent-primary"
          />
          Reduce Only
        </label>
        <label className="flex items-center gap-2 text-[12px] text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={tpsl}
            onChange={(e) => setTpsl(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-border accent-primary"
          />
          Take Profit / Stop Loss
        </label>
      </div>

      {/* Connect button */}
      <div className="px-3 pt-3">
        <button className="w-full h-11 rounded bg-primary text-primary-foreground font-medium text-[14px] hover:bg-primary-hover transition-colors">
          Connect
        </button>
      </div>

      {/* Order details */}
      <div className="px-3 pt-3 space-y-1 text-[12px]">
        {[
          { label: "Liquidation Price", value: "N/A" },
          { label: "Order Value", value: "N/A" },
          { label: "Margin Required", value: "N/A" },
          { label: "Slippage", value: "Est: 0% / Max: 8.00%" },
        ].map((row) => (
          <div key={row.label} className="flex justify-between">
            <span className="text-text-secondary">{row.label}</span>
            <span className="text-foreground">{row.value}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span className="text-text-secondary">Fees</span>
          <div className="text-right">
            <span className="text-foreground">✦ 0.0090% / 0.0030%</span>
            <br />
            <span className="text-text-muted text-[11px]">
              0.0450% / 0.0150%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-3 pt-3 pb-2 mt-2 border-t border-border space-y-2">
        <button className="w-full h-9 rounded border border-border text-foreground text-[13px] hover:bg-surface-hover">
          Deposit
        </button>
        <div className="flex gap-2">
          <button className="flex-1 h-8 rounded border border-border text-text-secondary text-[11px] hover:bg-surface-hover">
            Perps ⇄ Spot
          </button>
          <button className="flex-1 h-8 rounded border border-border text-text-secondary text-[11px] hover:bg-surface-hover">
            Withdraw
          </button>
        </div>
      </div>

      {/* Account section */}
      <div className="px-3 py-3 border-t border-border space-y-1 text-[12px]">
        <div className="text-foreground font-medium text-[13px] mb-2">
          Account Equity
        </div>
        {[
          { label: "Spot", value: "$0.00" },
          { label: "Perps", value: "$0.00" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-text-secondary">{r.label}</span>
            <span className="text-foreground">{r.value}</span>
          </div>
        ))}
        <div className="text-foreground font-medium text-[13px] mt-3 mb-2">
          Perps Overview
        </div>
        {[
          { label: "Balance", value: "$0.00" },
          { label: "Unrealized PNL", value: "$0.00" },
          { label: "Cross Margin Ratio", value: "0.00%", color: "text-red" },
          { label: "Maintenance Margin", value: "$0.00" },
          { label: "Cross Account Leverage", value: "0.00x" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-text-secondary">{r.label}</span>
            <span className={r.color || "text-foreground"}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeForm;
