import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import FilterBar from "../components/dashboard/projects/FilterBar";
import SummaryChips from "../components/dashboard/projects/SummaryChips";
import ProjectTable from "../components/dashboard/projects/ProjectTable";
import ProjectDetailModal from "../components/dashboard/projects/ProjectDetailModal";
import { getProjects } from "../api/projectApi";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("All Districts");
  const [status, setStatus] = useState("All Status");
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProjects()
      .then((response) => {
        if (!active) return;
        const records = Array.isArray(response)
          ? response
          : response?.data?.projects ?? response?.data ?? response?.projects ?? [];

        setProjects(
          (Array.isArray(records) ? records : []).map((project) => ({
            ...project,
            id: project.project_id ?? project.id,
            name: project.name ?? project.project_name,
            district: project.district,
            status: project.status ?? project.current_status,
            budget: project.budget ?? project.sanctioned_amount,
          }))
        );
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load projects."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const idMatch = String(p.id ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const districtMatch =
        district === "All Districts" || p.district === district;

      const statusMatch =
        status === "All Status" || p.status === status;

      return idMatch && districtMatch && statusMatch;
    });
  }, [projects, search, district, status]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-deep">
            My MPLADS Projects
          </h1>

          <p className="mt-1 text-muted-foreground">
            Monitor all sanctioned projects under your parliamentary constituency.
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <FilterBar
        search={search}
        setSearch={setSearch}
        district={district}
        setDistrict={setDistrict}
        status={status}
        setStatus={setStatus}
        projects={projects}
        />

        <SummaryChips projects={projects} />

        <ProjectTable
          projects={loading ? [] : filtered}
          onSelect={setSelected}
        />

        <ProjectDetailModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </DashboardLayout>
  );
}