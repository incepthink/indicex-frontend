export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface Asset {
  name: string;
  mark: number;
  oracle: number;
  change: string;
  changePct: string;
  volume: string;
  openInterest: string;
  funding: string;
  badges: string[];
  symbol: string;
}

export const assets: Record<string, Asset> = {
  "S&P500-USDC": {
    name: "S&P500-USDC",
    symbol: "SP500",
    mark: 6451.8,
    oracle: 6449.8,
    change: "-92.0",
    changePct: "-1.41%",
    volume: "$159,223,273.90",
    openInterest: "$104,688,455.23",
    funding: "0.0006%",
    badges: ["xyz", "50x"],
  },
  "S&P500-DAI": {
    name: "S&P500-DAI",
    symbol: "SP500",
    mark: 6451.3,
    oracle: 6449.2,
    change: "-92.5",
    changePct: "-1.45%",
    volume: "$98,234,122.00",
    openInterest: "$87,412,903.00",
    funding: "0.0048%",
    badges: ["xyz", "50x"],
  },
};

function generateCandles(
  startPrice: number,
  count: number,
  offset: number = 0,
): Candle[] {
  const candles: Candle[] = [];
  let prevClose = startPrice;
  const baseTime = 1711900800; // some base timestamp
  for (let i = 0; i < count; i++) {
    const open = prevClose + (Math.random() - 0.5) * 10;
    const high = open + Math.random() * 13 + 2;
    const low = open - Math.random() * 13 - 2;
    const close = open + (Math.random() - 0.5) * 20;
    const clampedClose = Math.max(6200, Math.min(6600, close));
    const clampedOpen = Math.max(6200, Math.min(6600, open));
    const clampedHigh = Math.max(clampedOpen, Math.max(clampedClose, high));
    const clampedLow = Math.min(clampedOpen, Math.min(clampedClose, low));
    const volume = Math.floor(Math.random() * 12000 + 500);
    candles.push({
      time: baseTime + (i + offset) * 3600,
      open: +clampedOpen.toFixed(1),
      high: +clampedHigh.toFixed(1),
      low: +clampedLow.toFixed(1),
      close: +clampedClose.toFixed(1),
      volume,
    });
    prevClose = clampedClose;
  }
  return candles;
}

export const candleDataUSDC = generateCandles(6469, 150, 0);
export const candleDataDAI = generateCandles(6465, 150, 0);

export const askEntriesUSDC: OrderBookEntry[] = [
  { price: 6454.0, size: 5.038, total: 31.415 },
  { price: 6453.9, size: 0.657, total: 26.377 },
  { price: 6453.8, size: 3.288, total: 25.72 },
  { price: 6453.7, size: 6.188, total: 22.432 },
  { price: 6453.6, size: 0.231, total: 16.244 },
  { price: 6453.3, size: 0.077, total: 16.013 },
  { price: 6453.0, size: 3.097, total: 15.936 },
  { price: 6452.7, size: 3.806, total: 12.839 },
  { price: 6452.3, size: 2.586, total: 9.033 },
  { price: 6452.2, size: 0.114, total: 6.447 },
  { price: 6452.1, size: 6.333, total: 6.333 },
];

export const bidEntriesUSDC: OrderBookEntry[] = [
  { price: 6452.0, size: 7.134, total: 7.134 },
  { price: 6451.9, size: 1.817, total: 8.951 },
  { price: 6451.7, size: 2.947, total: 11.898 },
  { price: 6451.6, size: 9.215, total: 21.113 },
  { price: 6451.4, size: 11.404, total: 32.517 },
  { price: 6451.3, size: 4.942, total: 37.459 },
  { price: 6451.2, size: 1.126, total: 38.585 },
  { price: 6451.1, size: 3.284, total: 41.869 },
  { price: 6451.0, size: 4.632, total: 46.501 },
  { price: 6450.9, size: 10.392, total: 56.893 },
  { price: 6450.8, size: 0.002, total: 56.895 },
];

export const askEntriesDAI: OrderBookEntry[] = askEntriesUSDC.map((e) => ({
  ...e,
  price: +(e.price - 0.5).toFixed(1),
}));

export const bidEntriesDAI: OrderBookEntry[] = bidEntriesUSDC.map((e) => ({
  ...e,
  price: +(e.price - 0.5).toFixed(1),
}));

export const dropdownAssets = [
  {
    symbol: "S&P500-USDC",
    lastPrice: "6,451.8",
    change24h: "-1.41%",
    funding8h: "0.0006%",
    volume: "$159.2M",
    oi: "$104.7M",
  },
  {
    symbol: "S&P500-DAI",
    lastPrice: "6,451.3",
    change24h: "-1.45%",
    funding8h: "0.0048%",
    volume: "$98.2M",
    oi: "$87.4M",
  },
  {
    symbol: "BTC-USDC",
    lastPrice: "67,234.5",
    change24h: "+2.31%",
    funding8h: "0.0100%",
    volume: "$1.2B",
    oi: "$890.5M",
  },
  {
    symbol: "ETH-USDC",
    lastPrice: "3,456.2",
    change24h: "+1.05%",
    funding8h: "0.0080%",
    volume: "$456.7M",
    oi: "$321.2M",
  },
];
