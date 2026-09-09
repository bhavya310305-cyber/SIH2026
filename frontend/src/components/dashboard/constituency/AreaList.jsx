const RISK_STYLES = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

export default function AreaList({
  areas,
  selectedId,
  onSelect,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border p-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Administrative Areas
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Select an area to view its development status.
        </p>
      </div>

      <div className="divide-y divide-border">
        {areas.map((area) => {
          const selected = area.id === selectedId;

          return (
            <button
              key={area.id}
              onClick={() => onSelect(area.id)}
              className={`flex w-full items-center justify-between px-5 py-3.5 text-left transition-all ${
                selected
                  ? "border-l-[3px] border-primary bg-primary/10"
                  : "border-l-[3px] border-transparent hover:bg-accent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    RISK_STYLES[area.risk]
                  }`}
                />

                <div>
                  <p className="text-sm font-semibold text-primary-deep">
                    {area.name}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    {area.district}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-primary-deep">
                  {area.completion}%
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Complete
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}