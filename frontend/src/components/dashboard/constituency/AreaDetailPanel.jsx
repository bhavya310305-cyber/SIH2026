import { MapPin, Home, Building2, ShieldAlert } from "lucide-react";

export default function AreaDetailPanel({ area }) {
  if (!area) return null;

  const badge = {
    low: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (area.completion / 100) * circumference;

  return (
    <div className="h-full rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border px-6 py-5">
        <div>
          <h2 className="text-2xl font-bold text-primary-deep">{area.name}</h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={15} />
            <span>{area.district}</span>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            badge[area.risk]
          }`}
        >
          {area.risk === "high"
            ? "High Risk"
            : area.risk === "medium"
              ? "Medium Risk"
              : "Low Risk"}
        </span>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-4">
            <StatColumn
              icon={<Home size={20} className="text-blue-600" />}
              bg="bg-blue-100"
              label="Villages"
              value={area.villages}
            />

            <StatColumn
              icon={<Building2 size={20} className="text-green-600" />}
              bg="bg-green-100"
              label="Projects"
              value={area.totalProjects}
              divider
            />

            <StatColumn
              icon={<ShieldAlert size={20} className="text-red-600" />}
              bg="bg-red-100"
              label="High-Risk Projects"
              value={area.highRisk}
              divider
            />

            <div className="flex flex-col items-center justify-center border-l border-border p-4">
              <div className="relative h-20 w-20">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {area.completion}%
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs font-medium text-muted-foreground">
                Completion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Observation */}
      <div className="px-6 pb-6">
        <div className="flex items-start gap-4 rounded-2xl bg-red-50 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <ShieldAlert size={22} className="text-red-600" />
          </div>

          <div>
            <h3 className="text-base font-bold text-red-600">AI Observation</h3>

            <p className="mt-1 text-sm leading-6 text-slate-700">
              {area.observation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatColumn({ icon, bg, label, value, divider = false }) {
  return (
    <div
      className={`flex flex-col justify-center p-4 ${
        divider ? "border-l border-border" : ""
      }`}
    >
      <div
        className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
      >
        {icon}
      </div>

      <p className="text-xs text-muted-foreground">{label}</p>

      <h3 className="mt-1 text-3xl font-bold leading-none text-primary-deep">
        {value}
      </h3>
    </div>
  );
}
