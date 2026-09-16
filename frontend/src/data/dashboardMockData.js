const dashboardMockData = {
  total_projects: 24,
  active_projects: 3,
  completed_projects: 18,
  not_started_projects: 2,
  on_hold_projects: 1,
  completion_percentage: 75,
  total_estimated_cost: 65000000,
  total_sanctioned_amount: 63000000,
  high_risk_projects: 2,
  high_risk_by_district: [
    { district: "KAMPTEE", high_risk_projects: 1 },
    { district: "HINGNA", high_risk_projects: 1 },
  ],
  district_statistics: [
    {
      district: "HINGNA",
      total_projects: 4,
      completed_projects: 3,
      completion_percentage: 75,
    },
    {
      district: "KATOL",
      total_projects: 2,
      completed_projects: 1,
      completion_percentage: 50,
    },
    {
      district: "KAMPTEE",
      total_projects: 5,
      completed_projects: 4,
      completion_percentage: 80,
    },
    {
      district: "NAGPUR URBAN",
      total_projects: 6,
      completed_projects: 5,
      completion_percentage: 83.33,
    },
    {
      district: "PARSEONI",
      total_projects: 3,
      completed_projects: 2,
      completion_percentage: 66.67,
    },
    {
      district: "SAVNER",
      total_projects: 3,
      completed_projects: 2,
      completion_percentage: 66.67,
    },
    {
      district: "UMRED",
      total_projects: 1,
      completed_projects: 1,
      completion_percentage: 100,
    },
  ],
};

export default dashboardMockData;
export { dashboardMockData };
