"use client";

import { useState } from "react";

const tabs = [
  "Balances",
  "Positions",
  "Open Orders",
  "TWAP",
  "Trade History",
  "Funding History",
  "Order History",
];
const columns = [
  "Coin",
  "Size",
  "Position Value ▾",
  "Entry Price",
  "Mark Price",
  "PNL (ROE %)",
  "Liq. Price",
  "Margin",
  "Funding",
];

const PositionsPanel = () => {
  const [activeTab, setActiveTab] = useState("Positions");

  return (
    <div className="border-t border-border bg-panel-bg">
      <div className="flex items-center justify-between px-3 border-b border-border">
        <div className="flex items-center gap-0">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-2.5 text-[12px] relative ${
                activeTab === t
                  ? "text-foreground"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              {t}
              {activeTab === t && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </button>
          ))}
        </div>
        <button className="text-[11px] text-text-secondary hover:text-foreground flex items-center gap-1">
          Filter{" "}
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
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border">
              {columns.map((c) => (
                <th
                  key={c}
                  className="text-left px-3 py-2 font-normal text-text-secondary text-[11px] whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-text-muted text-[12px]"
              >
                No open positions yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsPanel;
