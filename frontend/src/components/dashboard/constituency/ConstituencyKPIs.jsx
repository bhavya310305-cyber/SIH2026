import {
  IndianRupee,
  Wallet,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function ConstituencyKPIs({ summary, loading }) {
  const KPIS = [
    {
      icon: IndianRupee,
      value: loading ? "..." : summary.sanctionedAmount ?? "",
      label: "Sanctioned",
      accent: "bg-primary",
      iconTone: "text-primary",
    },
    {
      icon: Wallet,
      value: loading ? "..." : summary.expenditure ?? "",
      label: "Expenditure",
      accent: "bg-primary",
      iconTone: "text-primary",
    },
    {
      icon: CheckCircle2,
      value: loading ? "..." : `${summary.completion ?? ""}%`,
      label: "Completion",
      accent: "bg-primary",
      iconTone: "text-primary",
    },
    {
      icon: ShieldAlert,
      value: loading ? "..." : summary.priorityAreas ?? "",
      label: "Priority Areas",
      accent: "bg-destructive",
      iconTone: "text-destructive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="relative p-5">
            <span
              className={`absolute left-0 top-0 h-[3px] w-full ${kpi.accent} opacity-80`}
            />

            <kpi.icon
              size={15}
              className={kpi.iconTone}
              strokeWidth={1.9}
            />

            <h3 className="mt-3 text-2xl font-bold text-primary-deep">
              {kpi.value}
            </h3>

            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}