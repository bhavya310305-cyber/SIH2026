import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Building2,
  CalendarDays,
  IndianRupee,
  FileText,
} from "lucide-react";
import { getProjectUpdates } from "../../../api/projectApi";

export default function ProjectDetailModal({ project, onClose }) {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!project) return undefined;

    let active = true;
    const projectId = project.project_id ?? project.id;

    getProjectUpdates(projectId)
      .then((response) => {
        if (!active) return;
        const updateData = response?.data ?? response;
        const updates = Array.isArray(updateData)
          ? (updateData[0] ?? null)
          : (updateData?.latest_update ?? updateData?.update ?? updateData);
        setRequest({ projectId, updates, error: "" });
      })
      .catch((requestError) => {
        if (active) {
          setRequest({
            projectId,
            updates: null,
            error:
              requestError.response?.data?.message ||
              "Unable to load project updates.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [project]);

  if (!project) return null;

  const projectId = project.project_id ?? project.id;
  const isCurrentRequest = request?.projectId === projectId;
  const updates = isCurrentRequest ? request.updates : null;
  const loading = !isCurrentRequest;
  const error = isCurrentRequest ? request.error : "";

  const statusColor =
    project.status === "Completed"
      ? "bg-green-100 text-green-700"
      : project.status === "High Risk"
        ? "bg-red-100 text-red-700"
        : project.status === "Ongoing"
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-100 text-blue-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-bold text-primary-deep">
              {project.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Project ID : {project.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor}`}
            >
              {project.status}
            </span>

            <p className="text-sm text-muted-foreground">{project.district}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info icon={MapPin} label="Village" value={project.village} />

            <Info
              icon={Building2}
              label="Implementing Agency"
              value={project.agency}
            />

            <Info
              icon={IndianRupee}
              label="Sanctioned Amount"
              value={project.budget}
            />

            <Info
              icon={CalendarDays}
              label="Work Started"
              value={project.startDate}
            />

            <Info
              icon={CalendarDays}
              label="Expected Completion"
              value={project.expectedDate}
            />
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-border p-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              <h3 className="font-semibold text-primary-deep">
                Project Description
              </h3>
            </div>

            <p className="text-sm leading-6 text-muted-foreground">
              {loading ? "Loading..." : error || updates?.description || ""}
            </p>
          </div>

          {/* Images */}
          {(updates?.photographs ?? updates?.photos ?? updates?.images)
            ?.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold text-primary-deep">
                Project Images
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {(updates.photographs ?? updates.photos ?? updates.images).map(
                  (img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Project"
                      className="h-28 w-full rounded-xl object-cover"
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>

      <p className="text-sm font-semibold text-primary-deep">{value}</p>
    </div>
  );
}
