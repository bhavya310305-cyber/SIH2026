export default function ProjectTable({ projects, onSelect }) {
  const badge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "High Risk":
        return "bg-red-100 text-red-700";
      case "Ongoing":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      {/* Table Header */}
      <div className="grid grid-cols-12 border-b border-border bg-surface px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <div className="col-span-2">Project ID</div>
        <div className="col-span-4">Project</div>
        <div className="col-span-2">District</div>
        <div className="col-span-2 text-right">Amount</div>
        <div className="col-span-2 text-center">Status</div>
      </div>

      {/* Rows */}
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project)}
          className="grid w-full grid-cols-12 items-center border-b border-border px-5 py-4 text-left transition-all duration-200 hover:bg-blue-50 last:border-0"
        >
          <div className="col-span-2 text-xs font-medium text-primary">
            {project.id}
          </div>

          <div className="col-span-4">
            <p className="font-semibold text-primary-deep">{project.name}</p>
          </div>

          <div className="col-span-2 text-sm text-primary-deep">
            {project.district}
          </div>

          <div className="col-span-2 text-right text-sm font-semibold text-primary-deep">
            {project.budget}
          </div>

          <div className="col-span-2 flex justify-center">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badge(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}