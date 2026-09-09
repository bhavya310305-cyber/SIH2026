import { FolderKanban, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

export default function SummaryChips({ projects = [] }) {
  const chips = [
    {
      label: `${projects.length} Total`,
      icon: FolderKanban,
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      label: `${projects.filter((project) => project.status === "Completed").length} Completed`,
      icon: CheckCircle2,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      label: `${projects.filter((project) => project.status === "Ongoing").length} Ongoing`,
      icon: Clock3,
      bg: "bg-amber-100",
      color: "text-amber-700",
    },
    {
      label: `${projects.filter((project) => project.status === "High Risk").length} High Risk`,
      icon: ShieldAlert,
      bg: "bg-red-100",
      color: "text-red-700",
    },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {chips.map((chip) => {
        const Icon = chip.icon;

        return (
          <div
            key={chip.label}
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${chip.bg}`}
          >
            <Icon size={14} className={chip.color} />
            <span className={`text-xs font-semibold ${chip.color}`}>
              {chip.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
