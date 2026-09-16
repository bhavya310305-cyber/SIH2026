export default function StatRow({ items }) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
      <div
        className="grid divide-y divide-border sm:divide-y-0 sm:divide-x"
        style={{ gridTemplateColumns: `repeat(1, minmax(0, 1fr))` }}
      >
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${items.length} divide-y divide-border sm:divide-y-0 sm:divide-x`}>
          {items.map((item) => (
            <div key={item.label} className="relative p-5">
              <span className={`absolute top-0 left-0 right-0 h-[3px] ${item.accent} opacity-70`} />
              <item.icon size={16} className={item.iconTone} strokeWidth={2} />
              <p className="mt-3 text-2xl font-extrabold leading-tight text-primary-deep">{item.value}</p>
              <div className="mt-0.5 flex items-center justify-between">
                <p className="text-[12px] text-muted-foreground">{item.label}</p>
                {item.sub && <span className="text-[11px] font-semibold text-muted-foreground">{item.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}