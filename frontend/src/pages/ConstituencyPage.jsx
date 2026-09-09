import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ConstituencyKPIs from "../components/dashboard/constituency/ConstituencyKPIs";
import AreaList from "../components/dashboard/constituency/AreaList";
import AreaDetailPanel from "../components/dashboard/constituency/AreaDetailPanel";
import { getMonitoringMetrics } from "../api/dashboardApi";

export default function ConstituencyPage() {
  const [metrics, setMetrics] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getMonitoringMetrics()
      .then((response) => {
        if (!active) return;
        const nextMetrics = response?.data ?? null;
        setMetrics(nextMetrics);
        setSelectedId(nextMetrics?.district_statistics?.[0]?.district ?? null);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load constituency metrics."
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

  const highRiskDistricts = metrics?.high_risk_by_district ?? [];
  const areas = (metrics?.district_statistics ?? []).map((district) => {
    const matchingRisk = highRiskDistricts.find(
      (item) =>
        item.district?.trim().toUpperCase() ===
        district.district?.trim().toUpperCase()
    );

    return {
      id: district.district,
      name: district.district,
      district: district.district,
      totalProjects: district.total_projects,
      highRisk: matchingRisk?.high_risk_projects ?? 0,
      completion: district.completion_percentage,
      risk: matchingRisk ? "high" : "low",
      observation: "",
    };
  });

  const selectedArea = areas.find((area) => area.id === selectedId);
  const summaryData = {
    sanctionedAmount: metrics?.total_sanctioned_amount,
    expenditure: metrics?.total_estimated_cost,
    completion: metrics?.completion_percentage,
    priorityAreas: metrics?.high_risk_projects,
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-deep">Constituency Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor administrative areas and identify regions requiring priority attention.
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <ConstituencyKPIs summary={summaryData} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AreaList areas={areas} selectedId={selectedId} onSelect={setSelectedId} />
          {selectedArea && <AreaDetailPanel area={selectedArea} />}
        </div>
      </div>
    </DashboardLayout>
  );
}