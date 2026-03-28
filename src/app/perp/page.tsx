"use client";

import { useState } from "react";
import AssetHeader from "@/components/trading/AssetHeader";
import AssetDropdown from "@/components/trading/AssetDropdown";
import ChartArea from "@/components/trading/ChartArea";
import PositionsPanel from "@/components/trading/PositionsPanel";
import OrderBook from "@/components/trading/OrderBook";
import TradeForm from "@/components/trading/TradeForm";
import {
  assets,
  candleDataUSDC,
  candleDataDAI,
  askEntriesUSDC,
  bidEntriesUSDC,
  askEntriesDAI,
  bidEntriesDAI,
} from "@/data/mockData";

const Index = () => {
  const [selectedAsset, setSelectedAsset] = useState<
    "S&P500-USDC" | "S&P500-DAI"
  >("S&P500-USDC");
  const [orderSide, setOrderSide] = useState<"long" | "short">("long");
  const [orderType, setOrderType] = useState<"market" | "limit" | "pro">(
    "market",
  );
  const [marginMode, setMarginMode] = useState<"isolated" | "classic">(
    "isolated",
  );
  const [sliderValue, setSliderValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const asset = assets[selectedAsset];
  const candles =
    selectedAsset === "S&P500-USDC" ? candleDataUSDC : candleDataDAI;
  const asks = selectedAsset === "S&P500-USDC" ? askEntriesUSDC : askEntriesDAI;
  const bids = selectedAsset === "S&P500-USDC" ? bidEntriesUSDC : bidEntriesDAI;

  const spreadVal = asks[asks.length - 1].price - bids[0].price;
  const spreadPct =
    ((spreadVal / asks[asks.length - 1].price) * 100).toFixed(3) + "%";

  return (
    <div className="dark flex flex-col w-full bg-page-bg min-h-screen -mt-14 pt-18">
      {/* Top section: chart + order book/trade form */}
      <div className="flex flex-col xl-custom:flex-row flex-1">
        {/* Left Panel */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-border relative">
          <div className="relative">
            <AssetHeader
              asset={asset}
              onToggleDropdown={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <AssetDropdown
                onSelect={(s) => setSelectedAsset(s as any)}
                onClose={() => setDropdownOpen(false)}
              />
            )}
          </div>
          <ChartArea
            candles={candles}
            watermark={`xyz:${asset.symbol}USD · 1h · IndiceX`}
          />
          <PositionsPanel />
        </div>

        {/* Right Panel */}
        <div className="w-full xl-custom:w-150 flex flex-col xl-custom:flex-row shrink-0">
          <div className="xl-custom:w-1/2 xl-custom:min-w-70">
            <OrderBook
              asks={asks}
              bids={bids}
              spread={{ value: spreadVal, pct: spreadPct }}
              assetName={selectedAsset}
            />
          </div>
          <div className="xl-custom:w-1/2 xl-custom:min-w-70">
            <TradeForm
              orderSide={orderSide}
              setOrderSide={setOrderSide}
              orderType={orderType}
              setOrderType={setOrderType}
              marginMode={marginMode}
              setMarginMode={setMarginMode}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              assetName={selectedAsset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
