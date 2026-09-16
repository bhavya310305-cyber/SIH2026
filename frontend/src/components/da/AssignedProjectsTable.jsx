import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const STATUS_STYLES = {
    NOT_STARTED: { bg: "bg-muted-foreground/10", text: "text-muted-foreground", label: "Not Started" },
    ONGOING: { bg: "bg-primary/10", text: "text-primary", label: "Ongoing" },
    COMPLETED: { bg: "bg-success/10", text: "text-success", label: "Completed" },
    ON_HOLD: { bg: "bg-saffron/10", text: "text-saffron", label: "On Hold" },
    CANCELLED: { bg: "bg-destructive/10", text: "text-destructive", label: "Cancelled" },
};

// TODO: replace with GET /projects?ida=<current agency>
const MOCK_PROJECTS = [
    { project_id: "MPLADS/RJ/2024/0243", project_name: "Community hall with sanitation block", district: "PALI", current_status: "ONGOING", progress_percentage: 41, sanctioned_amount: 3000000 },
    { project_id: "MPLADS/BR/2024/0118", project_name: "Construction of village approach road (1.8 km)", district: "ARARIA", current_status: "ONGOING", progress_percentage: 62, sanctioned_amount: 4000000 },
    { project_id: "MPLADS/AP/2025/0009", project_name: "Upgradation of primary school building", district: "PURNIA", current_status: "ON_HOLD", progress_percentage: 20, sanctioned_amount: 2100000 },
];

function formatAmount(v) {
    return `₹${(v / 100000).toFixed(2)} L`;
}

export default function AssignedProjectsTable({ projects = MOCK_PROJECTS, onRowClick }) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        if (!query.trim()) return projects;
        const q = query.toLowerCase();
        return projects.filter(
            (p) => p.project_id.toLowerCase().includes(q) || p.project_name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q)
        );
    }, [projects, query]);

    return (
        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-4 border-b border-border">
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by project ID, name, or district"
                        className="w-full rounded-md border border-border bg-background py-2 pl-10 pr-3 text-sm outline-none focus:border-primary"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                            <th className="px-5 py-3 font-semibold">Project ID</th>
                            <th className="px-5 py-3 font-semibold">Project Name</th>
                            <th className="px-5 py-3 font-semibold">District</th>
                            <th className="px-5 py-3 font-semibold">Progress</th>
                            <th className="px-5 py-3 font-semibold">Sanctioned</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filtered.map((p) => {
                            const status = STATUS_STYLES[p.current_status] ?? STATUS_STYLES.NOT_STARTED;
                            return (
                                <tr
                                    key={p.project_id}
                                    onClick={() => onRowClick?.(p.project_id)}
                                    className="cursor-pointer hover:bg-accent transition-colors"
                                >
                                    <td className="px-5 py-3 font-semibold text-primary">{p.project_id}</td>
                                    <td className="px-5 py-3 text-primary-deep">{p.project_name}</td>
                                    <td className="px-5 py-3 text-muted-foreground">{p.district}</td>
                                    <td className="px-5 py-3 text-muted-foreground">{p.progress_percentage}%</td>
                                    <td className="px-5 py-3 text-muted-foreground">{formatAmount(p.sanctioned_amount)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.bg} ${status.text}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted-foreground">
                                    No projects match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}