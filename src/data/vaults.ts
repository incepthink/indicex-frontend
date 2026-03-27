export interface Holding {
  name: string;
  ticker: string;
  weight: number;
}

export interface Activity {
  type: "Deposit" | "Withdrawal";
  amount: number;
  token: string;
  user: string;
  time: string;
}

export interface Vault {
  id: string;
  abbr: string;
  name: string;
  description: string;
  category: string;
  riskLevel: string;
  tvl: number;
  nav: number;
  return30d: number;
  return1y: number;
  depositors: number;
  capacityPct: number;
  maxTvl: number;
  ageInDays: number;
  acceptedTokens: string[];
  inceptionDate: string;
  rebalance: string;
  fee: string;
  oracle: string;
  contract: string;
  blockchain: string;
  maxDailyDrawdown: number;
  avgDailyVolume: number;
  holdings: Holding[];
  totalHoldings: number;
  activity: Activity[];
}

export const vaults: Vault[] = [
  {
    id: "sp500",
    abbr: "SP",
    name: "HashCase NIFTY FIFTY",
    description:
      "Tracks the S&P 500 — broad exposure to 500 of the largest U.S. companies. The benchmark for the American market.",
    category: "Large Cap",
    riskLevel: "Low",
    tvl: 18400000,
    nav: 1.0412,
    return30d: 3.8,
    return1y: 24.1,
    depositors: 1204,
    capacityPct: 73,
    maxTvl: 25000000,
    ageInDays: 391,
    acceptedTokens: ["USDC", "USDT"],
    inceptionDate: "March 1, 2024",
    rebalance: "Quarterly",
    fee: "0.25%",
    oracle: "Chainlink",
    contract: "0x4f3a...c82b",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -0.48,
    avgDailyVolume: 142000,
    holdings: [
      { name: "Apple", ticker: "AAPL", weight: 7.2 },
      { name: "Microsoft", ticker: "MSFT", weight: 6.8 },
      { name: "NVIDIA", ticker: "NVDA", weight: 6.1 },
      { name: "Amazon", ticker: "AMZN", weight: 4.9 },
      { name: "Meta", ticker: "META", weight: 2.8 },
      { name: "Alphabet A", ticker: "GOOGL", weight: 2.4 },
      { name: "Alphabet C", ticker: "GOOG", weight: 2.1 },
      { name: "Berkshire B", ticker: "BRK.B", weight: 1.8 },
      { name: "Eli Lilly", ticker: "LLY", weight: 1.6 },
      { name: "Broadcom", ticker: "AVGO", weight: 1.5 },
    ],
    totalHoldings: 500,
    activity: [
      {
        type: "Deposit",
        amount: 12400,
        token: "USDC",
        user: "0x3f2a...b8c1",
        time: "2 mins ago",
      },
      {
        type: "Deposit",
        amount: 5000,
        token: "USDT",
        user: "0x8d1c...a24f",
        time: "14 mins ago",
      },
      {
        type: "Withdrawal",
        amount: 8200,
        token: "USDC",
        user: "0x2b9e...f371",
        time: "31 mins ago",
      },
      {
        type: "Deposit",
        amount: 25000,
        token: "USDC",
        user: "0x7a4d...c192",
        time: "1 hr ago",
      },
      {
        type: "Deposit",
        amount: 3500,
        token: "USDT",
        user: "0x1e8f...d045",
        time: "2 hrs ago",
      },
      {
        type: "Withdrawal",
        amount: 15000,
        token: "USDC",
        user: "0x5c3b...e781",
        time: "3 hrs ago",
      },
      {
        type: "Deposit",
        amount: 9800,
        token: "USDC",
        user: "0x6d2a...b437",
        time: "5 hrs ago",
      },
      {
        type: "Deposit",
        amount: 4200,
        token: "USDT",
        user: "0x9f1c...3e28",
        time: "8 hrs ago",
      },
    ],
  },
  {
    id: "nasdaq100",
    abbr: "NQ",
    name: "Blackrock Vault",
    description:
      "Tracks the NASDAQ-100 — 100 of the largest non-financial companies on Nasdaq, dominated by global tech leaders.",
    category: "Large Cap",
    riskLevel: "Medium",
    tvl: 14200000,
    nav: 1.0681,
    return30d: 6.1,
    return1y: 31.4,
    depositors: 987,
    capacityPct: 57,
    maxTvl: 25000000,
    ageInDays: 356,
    acceptedTokens: ["USDC", "USDT"],
    inceptionDate: "April 1, 2024",
    rebalance: "Quarterly",
    fee: "0.25%",
    oracle: "Chainlink",
    contract: "0x7c1d...a93e",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -0.91,
    avgDailyVolume: 118000,
    holdings: [
      { name: "Apple", ticker: "AAPL", weight: 9.1 },
      { name: "Microsoft", ticker: "MSFT", weight: 8.7 },
      { name: "NVIDIA", ticker: "NVDA", weight: 8.2 },
      { name: "Amazon", ticker: "AMZN", weight: 6.3 },
      { name: "Meta", ticker: "META", weight: 4.2 },
      { name: "Alphabet A", ticker: "GOOGL", weight: 3.8 },
      { name: "Tesla", ticker: "TSLA", weight: 3.1 },
      { name: "Broadcom", ticker: "AVGO", weight: 2.9 },
      { name: "Costco", ticker: "COST", weight: 2.4 },
      { name: "Netflix", ticker: "NFLX", weight: 2.1 },
    ],
    totalHoldings: 100,
    activity: [
      {
        type: "Deposit",
        amount: 8000,
        token: "USDC",
        user: "0x1a2b...c3d4",
        time: "5 mins ago",
      },
      {
        type: "Deposit",
        amount: 20000,
        token: "USDT",
        user: "0x5e6f...g7h8",
        time: "22 mins ago",
      },
      {
        type: "Withdrawal",
        amount: 4500,
        token: "USDC",
        user: "0x9i0j...k1l2",
        time: "45 mins ago",
      },
      {
        type: "Deposit",
        amount: 11000,
        token: "USDC",
        user: "0x3m4n...o5p6",
        time: "2 hrs ago",
      },
    ],
  },
  {
    id: "djia",
    abbr: "DJ",
    name: "Vanguard Vault",
    description:
      "Tracks the DJIA — 30 iconic blue-chip U.S. companies. The oldest and most recognized U.S. market benchmark.",
    category: "Large Cap",
    riskLevel: "Low",
    tvl: 9100000,
    nav: 1.0298,
    return30d: 2.9,
    return1y: 18.7,
    depositors: 743,
    capacityPct: 46,
    maxTvl: 20000000,
    ageInDays: 300,
    acceptedTokens: ["USDC", "USDT"],
    inceptionDate: "May 1, 2024",
    rebalance: "Quarterly",
    fee: "0.20%",
    oracle: "Chainlink",
    contract: "0x2b8c...d14a",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -0.31,
    avgDailyVolume: 74000,
    holdings: [
      { name: "UnitedHealth", ticker: "UNH", weight: 10.2 },
      { name: "Goldman Sachs", ticker: "GS", weight: 7.8 },
      { name: "Microsoft", ticker: "MSFT", weight: 6.9 },
      { name: "Home Depot", ticker: "HD", weight: 6.4 },
      { name: "Caterpillar", ticker: "CAT", weight: 5.1 },
      { name: "Salesforce", ticker: "CRM", weight: 4.7 },
      { name: "Visa", ticker: "V", weight: 4.3 },
      { name: "Amgen", ticker: "AMGN", weight: 3.9 },
      { name: "Boeing", ticker: "BA", weight: 3.2 },
      { name: "McDonald's", ticker: "MCD", weight: 3.0 },
    ],
    totalHoldings: 30,
    activity: [
      {
        type: "Deposit",
        amount: 6200,
        token: "USDC",
        user: "0x4q5r...s6t7",
        time: "10 mins ago",
      },
      {
        type: "Deposit",
        amount: 3000,
        token: "USDT",
        user: "0x8u9v...w0x1",
        time: "1 hr ago",
      },
    ],
  },
  {
    id: "russell2000",
    abbr: "RU",
    name: "Russell 2000 Vault",
    description:
      "Tracks the Russell 2000 — 2,000 small-cap U.S. companies. Higher growth potential with more volatility.",
    category: "Small Cap",
    riskLevel: "Medium",
    tvl: 3800000,
    nav: 1.0187,
    return30d: 1.4,
    return1y: 12.3,
    depositors: 512,
    capacityPct: 38,
    maxTvl: 10000000,
    ageInDays: 269,
    acceptedTokens: ["USDC", "USDT"],
    inceptionDate: "June 1, 2024",
    rebalance: "Semi-Annual",
    fee: "0.30%",
    oracle: "Chainlink",
    contract: "0x9f2e...b47d",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -1.12,
    avgDailyVolume: 31000,
    holdings: [
      { name: "Sprouts Farmers", ticker: "SFM", weight: 0.5 },
      { name: "Casella Waste", ticker: "CWST", weight: 0.4 },
      { name: "Saia Inc", ticker: "SAIA", weight: 0.4 },
      { name: "Onto Innovation", ticker: "ONTO", weight: 0.3 },
      { name: "Glacier Bancorp", ticker: "GBCI", weight: 0.3 },
    ],
    totalHoldings: 2000,
    activity: [
      {
        type: "Deposit",
        amount: 2100,
        token: "USDC",
        user: "0x2y3z...a4b5",
        time: "30 mins ago",
      },
      {
        type: "Withdrawal",
        amount: 1500,
        token: "USDT",
        user: "0x6c7d...e8f9",
        time: "4 hrs ago",
      },
    ],
  },
  {
    id: "cleanenergy",
    abbr: "CE",
    name: "Clean Energy Vault",
    description:
      "Tracks leading global clean energy companies — solar, wind, and EV infrastructure for the energy transition.",
    category: "Sector",
    riskLevel: "Medium",
    tvl: 1930000,
    nav: 0.9842,
    return30d: -1.6,
    return1y: 8.9,
    depositors: 284,
    capacityPct: 19,
    maxTvl: 10000000,
    ageInDays: 237,
    acceptedTokens: ["USDC"],
    inceptionDate: "July 1, 2024",
    rebalance: "Semi-Annual",
    fee: "0.35%",
    oracle: "Chainlink",
    contract: "0x3g4h...i5j6",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -1.44,
    avgDailyVolume: 16000,
    holdings: [
      { name: "First Solar", ticker: "FSLR", weight: 8.3 },
      { name: "Enphase Energy", ticker: "ENPH", weight: 7.1 },
      { name: "SolarEdge", ticker: "SEDG", weight: 5.9 },
      { name: "Vestas Wind", ticker: "VWSYF", weight: 5.4 },
      { name: "Plug Power", ticker: "PLUG", weight: 4.2 },
    ],
    totalHoldings: 35,
    activity: [
      {
        type: "Deposit",
        amount: 800,
        token: "USDC",
        user: "0x7k8l...m9n0",
        time: "1 hr ago",
      },
    ],
  },
  {
    id: "financials",
    abbr: "FN",
    name: "Financial Sector Vault",
    description:
      "Tracks top U.S. financial institutions — banks, insurance companies, and asset managers in one vault.",
    category: "Sector",
    riskLevel: "Low",
    tvl: 2800000,
    nav: 1.0334,
    return30d: 4.7,
    return1y: 19.6,
    depositors: 317,
    capacityPct: 28,
    maxTvl: 10000000,
    ageInDays: 206,
    acceptedTokens: ["USDC", "USDT"],
    inceptionDate: "August 1, 2024",
    rebalance: "Quarterly",
    fee: "0.25%",
    oracle: "Chainlink",
    contract: "0x1o2p...q3r4",
    blockchain: "Ethereum L2",
    maxDailyDrawdown: -0.62,
    avgDailyVolume: 23000,
    holdings: [
      { name: "JPMorgan Chase", ticker: "JPM", weight: 11.2 },
      { name: "Berkshire B", ticker: "BRK.B", weight: 9.8 },
      { name: "Visa", ticker: "V", weight: 8.4 },
      { name: "Mastercard", ticker: "MA", weight: 7.6 },
      { name: "Bank of America", ticker: "BAC", weight: 6.1 },
    ],
    totalHoldings: 68,
    activity: [
      {
        type: "Deposit",
        amount: 5500,
        token: "USDC",
        user: "0x4s5t...u6v7",
        time: "20 mins ago",
      },
      {
        type: "Deposit",
        amount: 9000,
        token: "USDT",
        user: "0x8w9x...y0z1",
        time: "3 hrs ago",
      },
    ],
  },
];

export function formatTvl(tvl: number): string {
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(2)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(1)}K`;
  return `$${tvl}`;
}

export function formatReturn(r: number): string {
  return r >= 0 ? `+${r}%` : `${r}%`;
}

export function formatNav(nav: number): string {
  return `$${nav.toFixed(4)}`;
}
