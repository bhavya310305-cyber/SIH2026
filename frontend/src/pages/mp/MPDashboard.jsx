import MPLayout from "../../components/mp/MPLayout";
import MPHero from "../../components/mp/dashboard/MPHero";
import MPKPICards from "../../components/mp/dashboard/MPKPICards";
import ProjectStatusOverview from "../../components/mp/dashboard/ProjectStatusOverview";
import FinancialProgress from "../../components/mp/dashboard/FinancialProgress";
import PriorityProjects from "../../components/mp/dashboard/PriorityProjects";
import ProjectsByDistrict from "../../components/mp/dashboard/ProjectsByDistrict";
import DevelopmentMessage from "../../components/mp/dashboard/DevelopmentMessage";

import { mpDashboardMockData } from "../../data/mpMockData";

const MPDashboard = () => {
  const dashboardData = mpDashboardMockData;

  return (
    <MPLayout>
      <div className="w-full">
        {/* Parliament Hero */}
        <MPHero />

        {/* KPI Cards */}
        <MPKPICards
          totalSanctioned={dashboardData.total_sanctioned_amount}
          totalExpenditure={dashboardData.total_expenditure}
          completedProjects={dashboardData.completed_projects}
          totalProjects={dashboardData.total_projects}
          highRiskProjects={dashboardData.high_risk_projects}
        />

        {/* Status + Financial Progress */}
        <section
          className="
            mt-[16px]
            grid grid-cols-2
            gap-[14px]

            max-lg:grid-cols-1
          "
        >
          <ProjectStatusOverview
            totalProjects={dashboardData.total_projects}
            completedProjects={dashboardData.completed_projects}
            activeProjects={dashboardData.active_projects}
            onHoldProjects={dashboardData.on_hold_projects}
            notStartedProjects={dashboardData.not_started_projects}
          />

          <FinancialProgress
            totalSanctioned={dashboardData.total_sanctioned_amount}
            totalExpenditure={dashboardData.total_expenditure}
          />
        </section>

        {/* Priority Projects */}
        <PriorityProjects
          projects={dashboardData.priority_projects || []}
        />

        {/* Bottom Row */}
        <section
          className="
            mt-[16px]
            grid grid-cols-[1.25fr_0.75fr]
            gap-[14px]

            max-lg:grid-cols-1
          "
        >
          <ProjectsByDistrict
            districtStatistics={
              dashboardData.district_statistics || []
            }
            highRiskByDistrict={
              dashboardData.high_risk_by_district || []
            }
          />

          <DevelopmentMessage />
        </section>
      </div>
    </MPLayout>
  );
};

export default MPDashboard;