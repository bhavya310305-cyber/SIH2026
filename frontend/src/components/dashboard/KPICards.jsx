import {
  IndianRupee,
  FolderKanban,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function KPICards({ metrics, loading }) {
  const KPIS = [
    {
      icon: IndianRupee,
      value: metrics?.total_sanctioned_amount,
      label: "Available MPLADS Funds",
      iconColor: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: FolderKanban,
      value: metrics?.active_projects,
      label: "Active Projects",
      iconColor: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: CheckCircle2,
      value: metrics?.completed_projects,
      label: "Completed Projects",
      iconColor: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: ShieldAlert,
      value: metrics?.high_risk_projects,
      label: "Projects Requiring Attention",
      iconColor: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-primary-deep">Key Metrics</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${kpi.bg}`}
            >
              <kpi.icon size={20} className={kpi.iconColor} strokeWidth={2} />
            </div>

            <div className="mt-5">
              <h3 className="text-3xl font-bold leading-none text-primary-deep">
                {loading ? "..." : (kpi.value ?? "")}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">{kpi.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
