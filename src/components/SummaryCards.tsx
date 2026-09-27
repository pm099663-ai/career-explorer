import { Building2, GitBranch, IndianRupee, Users } from "lucide-react";
import type { DashboardStats } from "../lib/stats";
import { formatINR, formatNumber } from "../lib/format";

export function SummaryCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      label: "Total colleges",
      value: formatNumber(stats.totalColleges, "0"),
      icon: Building2,
      sub: "MP engineering & technical",
    },
    {
      label: "Total branches",
      value: formatNumber(stats.totalBranches, "0"),
      icon: GitBranch,
      sub: "Across listed colleges",
    },
    {
      label: "Total seats",
      value: formatNumber(stats.totalSeats),
      icon: Users,
      sub: "Upload seat matrix for totals",
    },
    {
      label: "Lowest annual fee",
      value: stats.lowestFeeCollege
        ? formatINR(stats.lowestFeeCollege.fee)
        : "Fee not available",
      icon: IndianRupee,
      sub: stats.lowestFeeCollege?.name ?? "Add verified fee data",
    },
    {
      label: "Highest annual fee",
      value: stats.highestFeeCollege
        ? formatINR(stats.highestFeeCollege.fee)
        : "Fee not available",
      icon: IndianRupee,
      sub: stats.highestFeeCollege?.name ?? "Add verified fee data",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="card-shadow rounded-xl border border-slate-200/80 bg-card p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {card.label}
            </span>
            <card.icon className="h-4 w-4 text-brand-500" aria-hidden />
          </div>
          <p className="text-xl font-semibold text-ink">{card.value}</p>
          <p className="mt-1 line-clamp-2 text-xs text-muted">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
