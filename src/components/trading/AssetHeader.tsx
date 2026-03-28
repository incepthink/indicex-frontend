import { ChevronDown, Star } from "lucide-react";
import type { Asset } from "@/data/mockData";

interface AssetHeaderProps {
  asset: Asset;
  onToggleDropdown: () => void;
}

const AssetHeader = ({ asset, onToggleDropdown }: AssetHeaderProps) => {
  const isNegative = asset.change.startsWith("-");

  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-border bg-panel-bg min-h-[48px] overflow-x-auto">
      <Star className="w-4 h-4 text-text-muted cursor-pointer hover:text-yellow-500 flex-shrink-0" />
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center text-[10px] font-bold text-primary-foreground">
          S
        </div>
        <button
          onClick={onToggleDropdown}
          className="flex items-center gap-1 hover:opacity-80"
        >
          <span className="font-semibold text-foreground text-[15px]">
            {asset.name}
          </span>
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        </button>
        <span className="text-[11px] border border-border rounded px-1.5 py-0.5 text-text-secondary">
          {asset.badges[0]}
        </span>
        <span className="text-[11px] bg-primary rounded px-1.5 py-0.5 text-primary-foreground font-medium">
          {asset.badges[1]}
        </span>
      </div>

      <div className="h-6 w-px bg-border flex-shrink-0" />

      {[
        { label: "Mark", value: asset.mark.toLocaleString() },
        { label: "Oracle", value: asset.oracle.toLocaleString() },
        {
          label: "24h Change",
          value: `${asset.change} / ${asset.changePct}`,
          color: isNegative ? "text-red" : "text-green",
        },
        { label: "24h Volume", value: asset.volume },
        { label: "Open Interest", value: asset.openInterest },
        { label: "Funding / Countdown", value: `${asset.funding}  00:02:33` },
      ].map((stat) => (
        <div key={stat.label} className="flex flex-col gap-0 flex-shrink-0">
          <span className="text-[10px] text-text-muted leading-tight">
            {stat.label}
          </span>
          <span
            className={`text-[12px] leading-tight font-medium ${stat.color || "text-foreground"}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AssetHeader;
