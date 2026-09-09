import { Users, Home, Building2, IndianRupee } from "lucide-react";

export default function ConstituencySnapshot({ metrics, loading }) {
  const METRICS = [
    { icon: Users, value: metrics?.total_sanctioned_amount, label: "Sanctioned" },
    { icon: Home, value: metrics?.total_estimated_cost, label: "Expenditure" },
    { icon: Building2, value: metrics?.completion_percentage, label: "Completion", suffix: "%" },
    { icon: IndianRupee, value: metrics?.high_risk_projects, label: "Priority Areas" },
  ];
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Overview
        </p>
        <h2 className="mt-1 text-lg font-bold text-primary-deep">
          Constituency Snapshot
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-border bg-surface p-4 transition-all hover:shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <metric.icon
                size={18}
                className="text-primary"
                strokeWidth={1.8}
              />
            </div>

            <p className="text-xl font-bold text-primary-deep">
                {loading ? "..." : metric.value ?? ""}{metric.suffix && !loading ? metric.suffix : ""}
            </p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}