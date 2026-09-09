import { Search } from "lucide-react";

export default function FilterBar({
  search,
  setSearch,
  district,
  setDistrict,
  status,
  setStatus,
  projects = [],
}) {
  const districts = [
    ...new Set(projects.map((project) => project.district).filter(Boolean)),
  ];
  const statuses = [
    ...new Set(projects.map((project) => project.status).filter(Boolean)),
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Project ID"
            className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none"
        >
          <option>All Districts</option>
          {districts.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none"
        >
          <option>All Status</option>
          {statuses.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setDistrict("All Districts");
            setStatus("All Status");
          }}
          className="h-11 rounded-lg border border-border bg-white text-sm font-semibold text-primary-deep transition-all duration-200 hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
