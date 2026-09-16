import { useState } from "react";
import { UploadCloud } from "lucide-react";

const STATUS_OPTIONS = ["NOT_STARTED", "ONGOING", "COMPLETED", "ON_HOLD", "CANCELLED"];

const INITIAL = {
    projectId: "",
    progress: "",
    status: "ONGOING",
    expenditure: "",
    amountPaid: "",
    description: "",
    updateDate: "",
    location: "",
};

// TODO: replace with the agency's actual assigned project list (GET /projects?ida=...)
const PROJECT_OPTIONS = [
    { id: "MPLADS/RJ/2024/0243", name: "Community hall with sanitation block — PALI" },
    { id: "MPLADS/BR/2024/0118", name: "Village approach road (1.8 km) — ARARIA" },
];

export default function ProgressSubmissionForm() {
    const [form, setForm] = useState(INITIAL);
    const [photo, setPhoto] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: POST to /progress-updates with { project_id, progress_percentage, status,
        // expenditure, amount_paid, description, update_date, location, photograph }
        console.log({ ...form, photo });
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] space-y-5">
            <div>
                <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Select Project</label>
                <select
                    name="projectId"
                    value={form.projectId}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                >
                    <option value="">Choose a project</option>
                    {PROJECT_OPTIONS.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-primary-deep">
                        Current Progress
                        <span className="text-primary">{form.progress || 0}%</span>
                    </label>
                    <input
                        type="range"
                        name="progress"
                        min="0"
                        max="100"
                        value={form.progress || 0}
                        onChange={handleChange}
                        className="w-full accent-primary"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s.replace("_", " ")}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Expenditure (₹)</label>
                    <input
                        type="number"
                        name="expenditure"
                        min="0"
                        value={form.expenditure}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Amount Paid (₹)</label>
                    <input
                        type="number"
                        name="amountPaid"
                        min="0"
                        value={form.amountPaid}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Update Date</label>
                    <input
                        type="date"
                        name="updateDate"
                        value={form.updateDate}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Ward 15, Forbesganj Block"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    />
                </div>
            </div>

            <div>
                <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Update Description</label>
                <textarea
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the work completed since the last update"
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary resize-none"
                />
            </div>

            <div>
                <label className="mb-1.5 block text-xs font-semibold text-primary-deep">Photograph</label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background py-6 text-center hover:bg-accent transition-colors">
                    <UploadCloud size={20} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                        {photo ? photo.name : "Click to upload a site photograph"}
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                </label>
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
                Submit Progress
            </button>
        </form>
    );
}