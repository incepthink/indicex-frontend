"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
} from "lightweight-charts";
import type { Candle } from "@/data/mockData";
import { Camera, Maximize2, BarChart3 } from "lucide-react";

interface ChartAreaProps {
  candles: Candle[];
  watermark: string;
}

const intervals = ["5y", "1y", "6m", "3m", "1m", "5d", "1D"];
const timeframes = ["5m", "1h", "D"];

const ChartArea = ({ candles, watermark }: ChartAreaProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [activeInterval, setActiveInterval] = useState("1D");
  const [activeTimeframe, setActiveTimeframe] = useState("1h");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    const chart = createChart(container, {
      layout: {
        background: { color: "#0a0a0a" },
        textColor: "#8b8fa8",
        fontFamily: "Geist, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#1a1a1a" },
        horzLines: { color: "#1a1a1a" },
      },
      crosshair: {
        mode: 0,
      },
      rightPriceScale: {
        borderColor: "#1f1f1f",
      },
      timeScale: {
        borderColor: "#1f1f1f",
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
    });

    const candleData = candles.map((c) => ({
      time: c.time as any,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    const volumeData = candles.map((c) => ({
      time: c.time as any,
      value: c.volume,
      color:
        c.close >= c.open ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)",
    }));

    candleSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    // Price line for last candle
    const lastCandle = candles[candles.length - 1];
    if (lastCandle) {
      candleSeries.createPriceLine({
        price: lastCandle.close,
        color: "#ef4444",
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: "",
      });
    }

    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (container) {
        chart.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      chart.remove();
    };
  }, [candles, watermark]);

  return (
    <div className="flex flex-col h-[558px]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-panel-bg">
        <div className="flex items-center gap-1">
          <div className="flex items-center border border-border rounded overflow-hidden mr-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-2 py-1 text-[11px] ${activeTimeframe === tf ? "text-foreground bg-surface-hover" : "text-text-secondary hover:text-foreground"}`}
              >
                {tf}
              </button>
            ))}
            <ChevronIcon />
          </div>
          {intervals.map((iv) => (
            <button
              key={iv}
              onClick={() => setActiveInterval(iv)}
              className={`px-1.5 py-1 text-[11px] rounded ${activeInterval === iv ? "text-foreground" : "text-text-secondary hover:text-foreground"}`}
            >
              {iv}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-text-secondary hover:text-foreground">
            <BarChart3 className="w-3 h-3" /> Indicators
          </button>
          <button className="p-1 text-text-secondary hover:text-foreground">
            <Camera className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 text-text-secondary hover:text-foreground">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* Volume label */}
      <div className="px-3 py-1 text-[11px] text-green bg-page-bg">
        Volume SMA 850.9
      </div>
      {/* Chart */}
      <div
        ref={chartContainerRef}
        className="flex-1 min-h-[350px] bg-page-bg"
      />
    </div>
  );
};

const ChevronIcon = () => (
  <svg
    className="w-3 h-3 text-text-muted mx-1"
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
);

export default ChartArea;
