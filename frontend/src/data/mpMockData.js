export const mpDashboardMockData = {
  total_projects: 24,
  active_projects: 3,
  completed_projects: 18,
  not_started_projects: 2,
  on_hold_projects: 1,
  completion_percentage: 75,

  total_estimated_cost: 65000000,
  total_sanctioned_amount: 63000000,

  /*
   * We have not finalized the actual expenditure value yet.
   * Keep this null for design preview instead of inventing data.
   */
  total_expenditure: null,

  high_risk_projects: 2,

  priority_projects: [
    {
      project_id: "MPLADS-014",
      project_name: "Road Improvement Work",
      district: "Jaipur",
      sanctioned_amount: 4200000,
      current_status: "On Hold",
    },
    {
      project_id: "MPLADS-021",
      project_name: "Community Infrastructure Development",
      district: "Dausa",
      sanctioned_amount: 3500000,
      current_status: "Ongoing",
    },
  ],

  district_statistics: [
    {
      district: "Jaipur",
      total_projects: 8,
      completed_projects: 6,
      completion_percentage: 75,
    },
    {
      district: "Dausa",
      total_projects: 6,
      completed_projects: 4,
      completion_percentage: 67,
    },
    {
      district: "Alwar",
      total_projects: 5,
      completed_projects: 4,
      completion_percentage: 80,
    },
    {
      district: "Sikar",
      total_projects: 5,
      completed_projects: 4,
      completion_percentage: 80,
    },
  ],

  high_risk_by_district: [
    {
      district: "Jaipur",
      high_risk_projects: 1,
    },
    {
      district: "Dausa",
      high_risk_projects: 1,
    },
  ],
};