export const CONSTITUENCY_KPIS = {
  population: "18.2 Lakh",
  villages: 126,
  urbanWards: 42,
};

export const AREAS = [
  {
    id: "nagpur-urban",
    name: "Nagpur Urban",
    district: "Nagpur District",
    completion: 91,
    risk: "low",
    villages: 22,
    totalProjects: 19,
    highRiskProjects: 0,
    aiObservation: "No irregularities detected. Fund utilization is on track.",
  },
  {
    id: "kamptee",
    name: "Kamptee",
    district: "Nagpur District",
    completion: 48,
    risk: "high",
    villages: 18,
    totalProjects: 12,
    highRiskProjects: 2,
    aiObservation: "Flagged: 2 projects show payment ahead of physical progress.",
  },
  {
    id: "hingna",
    name: "Hingna",
    district: "Nagpur District",
    completion: 74,
    risk: "moderate",
    villages: 15,
    totalProjects: 14,
    highRiskProjects: 1,
    aiObservation: "1 project delayed beyond planned completion date.",
  },
  {
    id: "parseoni",
    name: "Parseoni",
    district: "Nagpur District",
    completion: 82,
    risk: "low",
    villages: 20,
    totalProjects: 16,
    highRiskProjects: 0,
    aiObservation: "No irregularities detected. Progress is consistent with estimates.",
  },
  {
    id: "savner",
    name: "Savner",
    district: "Nagpur District",
    completion: 77,
    risk: "moderate",
    villages: 17,
    totalProjects: 13,
    highRiskProjects: 1,
    aiObservation: "1 project shows a minor cost overrun (18% above estimate).",
  },
];

// "Priority" = moderate or high risk — the MP should look at these first.
export const PRIORITY_AREA_COUNT = AREAS.filter((a) => a.risk !== "low").length;

export const RISK_STYLES = {
  low: { dot: "bg-success", pillBg: "bg-success/10", pillText: "text-success", label: "Healthy" },
  moderate: { dot: "bg-saffron", pillBg: "bg-saffron/10", pillText: "text-saffron", label: "Moderate Risk" },
  high: { dot: "bg-destructive", pillBg: "bg-destructive/10", pillText: "text-destructive", label: "High Risk" },
};