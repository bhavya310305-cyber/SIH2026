import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import ConstituencySnapshot from "../components/dashboard/ConstituencySnapshot";
import KPICards from "../components/dashboard/KPICards";
import { getMonitoringMetrics } from "../api/dashboardApi";

export default function MPDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getMonitoringMetrics()
      .then((response) => {
        if (active) setMetrics(response?.data ?? null);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Unable to load monitoring metrics."
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeSection />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ConstituencySnapshot metrics={metrics} loading={loading} />
          </div>

          <div className="lg:col-span-8">
            <KPICards metrics={metrics} loading={loading} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}