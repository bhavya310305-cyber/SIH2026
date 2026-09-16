import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

import MPLayout from "../components/mp/MPLayout";
import projectsMockData from "../data/projectsMockData";

/* =========================================================
   Helpers
========================================================= */

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "—";
  }

  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} L`;
  }

  return `₹ ${amount.toLocaleString("en-IN")}`;
};

const formatStatus = (status) => {
  const map = {
    COMPLETED: "Completed",
    ONGOING: "Ongoing",
    IN_PROGRESS: "In Progress",
    NOT_STARTED: "Not Started",
    ON_HOLD: "On Hold",
  };

  return map[status] || status || "Unknown";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-[#E5F4E9] text-[#34734F]";

    case "ONGOING":
    case "IN_PROGRESS":
      return "bg-[#E5F1FA] text-[#34709A]";

    case "NOT_STARTED":
      return "bg-[#FFF1DC] text-[#A16D25]";

    case "ON_HOLD":
      return "bg-[#FDE8E6] text-[#B6524A]";

    default:
      return "bg-[#EFF3F5] text-[#667B89]";
  }
};

const getRiskStyle = (risk) => {
  switch (risk) {
    case "High":
      return "bg-[#FDE8E6] text-[#B6524A]";

    case "Medium":
      return "bg-[#FFF0D8] text-[#A36A18]";

    case "Low":
      return "bg-[#E6F3E9] text-[#3D7755]";

    default:
      return "bg-[#EFF3F5] text-[#6C7E89]";
  }
};

const getCompletionPercentage = (completed, total) => {
  if (!total) return 0;

  return Math.round((completed / total) * 100);
};

/* =========================================================
   Page
========================================================= */

const ConstituencyPage = () => {
  const navigate = useNavigate();

  const projects = projectsMockData || [];

  const firstProject = projects[0] || {};

  /*
   * Build area data from existing project data.
   */
  const areaMap = {};

  projects.forEach((project) => {
    const areaName = project.district || "Unknown";

    if (!areaMap[areaName]) {
      areaMap[areaName] = {
        name: areaName,
        totalProjects: 0,
        completedProjects: 0,
        ongoingProjects: 0,
        highRiskProjects: 0,
      };
    }

    const area = areaMap[areaName];

    area.totalProjects += 1;

    if (project.current_status === "COMPLETED") {
      area.completedProjects += 1;
    }

    if (
      project.current_status === "ONGOING" ||
      project.current_status === "IN_PROGRESS"
    ) {
      area.ongoingProjects += 1;
    }

    if (project.risk_level === "High") {
      area.highRiskProjects += 1;
    }
  });

  const areas = Object.values(areaMap)
    .map((area) => ({
      ...area,

      completionPercentage: getCompletionPercentage(
        area.completedProjects,
        area.totalProjects
      ),
    }))
    .sort((a, b) => b.totalProjects - a.totalProjects);

  /*
   * Select first area by default.
   */
  const [selectedAreaName, setSelectedAreaName] = useState(
    areas[0]?.name || null
  );

  const selectedArea =
    areas.find((area) => area.name === selectedAreaName) ||
    areas[0] ||
    null;

  /*
   * Projects belonging to selected area.
   */
  const selectedAreaProjects = selectedArea
    ? projects.filter(
        (project) => project.district === selectedArea.name
      )
    : [];

  /*
   * Overall constituency KPIs.
   */
  const completedProjects = projects.filter(
    (project) => project.current_status === "COMPLETED"
  ).length;

  const ongoingProjects = projects.filter(
    (project) =>
      project.current_status === "ONGOING" ||
      project.current_status === "IN_PROGRESS"
  ).length;

  const highRiskProjects = projects.filter(
    (project) => project.risk_level === "High"
  ).length;

  const kpis = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: Building2,
      iconStyle: "bg-[#E7F1F8] text-[#28628A]",
    },

    {
      label: "Completed",
      value: completedProjects,
      icon: CheckCircle2,
      iconStyle: "bg-[#E5F4E9] text-[#347750]",
    },

    {
      label: "Ongoing",
      value: ongoingProjects,
      icon: Clock3,
      iconStyle: "bg-[#E6F1FA] text-[#36709A]",
    },

    {
      label: "High Risk",
      value: highRiskProjects,
      icon: AlertTriangle,
      iconStyle: "bg-[#FDE9E7] text-[#B8544C]",
    },
  ];

  return (
    <MPLayout>
      <div className="w-full">
        {/* =====================================================
            PAGE HEADING
        ====================================================== */}
        <div
          className="
            flex
            items-end
            justify-between
            gap-[20px]

            max-md:flex-col
            max-md:items-start
          "
        >
          <div>
            <h1
              className="
                text-[32px]
                font-semibold
                leading-[1.15]
                tracking-[-0.5px]
                text-[#153A58]

                max-md:text-[26px]
              "
            >
              Constituency Overview
            </h1>

            <p
              className="
                mt-[6px]
                text-[14px]
                text-[#718594]

                max-md:text-[13px]
              "
            >
              {firstProject.constituency || "—"}
              <span className="mx-[7px] text-[#AAB6BE]">
                •
              </span>
              {firstProject.state || "—"}
            </p>
          </div>

          <div className="flex items-start gap-[7px] text-[#56748A]">
            <MapPin
              size={16}
              strokeWidth={1.8}
              className="mt-[1px]"
            />

            <div>
              <p className="text-[12px] font-semibold">
                {firstProject.constituency || "—"}
              </p>

              <p className="mt-[2px] text-[11px] text-[#8A9AA5]">
                {firstProject.state || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            KPI CARDS
        ====================================================== */}
        <section
          className="
            mt-[16px]
            grid
            grid-cols-4
            gap-[12px]

            max-lg:grid-cols-2
            max-sm:grid-cols-1
          "
        >
          {kpis.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  flex
                  min-h-[106px]
                  items-center
                  gap-[14px]
                  rounded-[12px]
                  border
                  border-[#E2E9EE]
                  bg-white
                  px-[18px]
                  py-[14px]
                  shadow-[0_4px_14px_rgba(18,52,77,0.04)]
                "
              >
                <div
                  className={`
                    flex
                    h-[43px]
                    w-[43px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[10px]

                    ${item.iconStyle}
                  `}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-[12px] font-medium text-[#7D8F9B]">
                    {item.label}
                  </p>

                  <strong className="mt-[3px] block text-[23px] font-semibold text-[#183F5B]">
                    {item.value}
                  </strong>
                </div>
              </div>
            );
          })}
        </section>

        {/* =====================================================
            AREA + PROJECTS
        ====================================================== */}
        <section
          className="
            mt-[14px]
            grid
            grid-cols-[minmax(0,1.25fr)_minmax(390px,0.95fr)]
            gap-[14px]
            items-stretch

            max-xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
            max-lg:grid-cols-1
          "
        >
          {/* =================================================
              LEFT - CONSTITUENCY AREAS
          ================================================== */}
          <div
            className="
              overflow-hidden
              rounded-[12px]
              border
              border-[#E2E9EE]
              bg-white
              shadow-[0_4px_14px_rgba(18,52,77,0.04)]
            "
          >
            {/* Card Header */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-[16px]
                border-b
                border-[#EDF1F4]
                px-[20px]
                py-[15px]

                max-sm:items-start
              "
            >
              <div>
                <h2 className="text-[20px] font-semibold text-[#153A58]">
                  Constituency Area Overview
                </h2>

                <p className="mt-[2px] text-[12px] text-[#8798A4]">
                  Development distribution across constituency areas
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-[6px] text-[12px] font-medium text-[#53758C]">
                <MapPin size={15} strokeWidth={1.8} />
                {areas.length} Areas
              </div>
            </div>

            {/* Area Cards */}
            <div className="p-[16px]">
              {areas.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-3
                    gap-[10px]

                    max-xl:grid-cols-2
                    max-sm:grid-cols-1
                  "
                >
                  {areas.map((area) => {
                    const isSelected =
                      selectedArea?.name === area.name;

                    return (
                      <button
                        key={area.name}
                        type="button"
                        onClick={() =>
                          setSelectedAreaName(area.name)
                        }
                        className={`
                          relative
                          min-h-[168px]
                          overflow-hidden
                          rounded-[11px]
                          border
                          p-[15px]
                          text-left
                          transition-all
                          duration-150

                          ${
                            isSelected
                              ? "border-[#79ACCE] bg-[#EDF6FB] shadow-[0_5px_15px_rgba(44,105,145,0.08)]"
                              : "border-[#E0E8ED] bg-[#F9FBFC] hover:border-[#BFD3E0] hover:bg-[#F4F9FC]"
                          }
                        `}
                      >
                        {/* Decorative circle */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-[22px]
                            -top-[28px]
                            h-[78px]
                            w-[78px]
                            rounded-full
                            bg-[#DCEBF4]/55
                          "
                        />

                        <div className="relative z-10">
                          {/* Area Heading */}
                          <div className="flex items-start justify-between gap-[10px]">
                            <div className="min-w-0">
                              <h3 className="truncate text-[14px] font-semibold text-[#174464]">
                                {area.name}
                              </h3>

                              <p className="mt-[3px] text-[11px] text-[#8395A2]">
                                {area.totalProjects}{" "}
                                {area.totalProjects === 1
                                  ? "project"
                                  : "projects"}
                              </p>
                            </div>

                            {area.highRiskProjects > 0 && (
                              <div
                                className="
                                  flex
                                  h-[26px]
                                  w-[26px]
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-[#FCE7E4]
                                  text-[#C05A51]
                                "
                              >
                                <AlertTriangle
                                  size={14}
                                  strokeWidth={1.9}
                                />
                              </div>
                            )}
                          </div>

                          {/* Completion */}
                          <div className="mt-[17px]">
                            <div className="flex items-center justify-between gap-[10px]">
                              <span className="text-[11px] font-medium text-[#788C99]">
                                Completion
                              </span>

                              <strong className="text-[12px] font-semibold text-[#285F84]">
                                {area.completionPercentage}%
                              </strong>
                            </div>

                            <div className="mt-[6px] h-[6px] overflow-hidden rounded-full bg-[#E2E9EE]">
                              <div
                                className="h-full rounded-full bg-[#3B7FA9]"
                                style={{
                                  width: `${Math.min(
                                    area.completionPercentage,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>

                          {/* Status Pills */}
                          <div className="mt-[16px] flex flex-wrap gap-[6px]">
                            <span
                              className="
                                rounded-full
                                bg-[#E5F4E9]
                                px-[9px]
                                py-[4px]
                                text-[10px]
                                font-medium
                                text-[#34734F]
                              "
                            >
                              {area.completedProjects} Completed
                            </span>

                            <span
                              className="
                                rounded-full
                                bg-[#E6F1FA]
                                px-[9px]
                                py-[4px]
                                text-[10px]
                                font-medium
                                text-[#366E96]
                              "
                            >
                              {area.ongoingProjects} Ongoing
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex min-h-[350px] items-center justify-center">
                  <p className="text-[13px] text-[#8999A4]">
                    No constituency areas available.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT - PROJECTS OF SELECTED AREA
          ================================================== */}
          <div
            className="
              overflow-hidden
              rounded-[12px]
              border
              border-[#E2E9EE]
              bg-white
              shadow-[0_4px_14px_rgba(18,52,77,0.04)]
            "
          >
            {/* Header */}
            <div
              className="
                flex
                items-start
                justify-between
                gap-[14px]
                border-b
                border-[#EDF1F4]
                px-[18px]
                py-[15px]

                max-sm:flex-col
              "
            >
              <div className="min-w-0">
                <h2 className="truncate text-[20px] font-semibold text-[#153A58]">
                  Projects in {selectedArea?.name || "Selected Area"}
                </h2>

                <p className="mt-[2px] text-[12px] text-[#8798A4]">
                  {selectedArea?.totalProjects || 0} projects
                  {selectedArea && (
                    <>
                      <span className="mx-[6px]">•</span>
                      {selectedArea.completionPercentage}% completion
                    </>
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard/projects")
                }
                className="
                  inline-flex
                  h-[36px]
                  shrink-0
                  items-center
                  gap-[7px]
                  rounded-[8px]
                  bg-[#EAF4FB]
                  px-[12px]
                  text-[11px]
                  font-semibold
                  text-[#276A98]
                  transition-colors

                  hover:bg-[#DDEEF9]
                "
              >
                View All Projects

                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Projects */}
            <div className="p-[14px]">
              {selectedAreaProjects.length > 0 ? (
                <div className="space-y-[8px]">
                  {selectedAreaProjects.map((project) => (
                    <button
                      key={project.project_id}
                      type="button"
                      onClick={() =>
                        navigate(`/dashboard/projects/${project.project_id}`, {
                          state: {
                            from: "/dashboard/constituency",
                          },
                        })
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        gap-[12px]
                        rounded-[10px]
                        border
                        border-[#E2E9EE]
                        bg-white
                        px-[13px]
                        py-[11px]
                        text-left
                        transition-all

                        hover:border-[#BAD0DE]
                        hover:bg-[#F8FBFD]
                        hover:shadow-[0_4px_12px_rgba(28,71,99,0.05)]

                        max-sm:flex-wrap
                      "
                    >
                      {/* Project Main Info */}
                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            truncate
                            text-[13px]
                            font-semibold
                            text-[#174360]

                            group-hover:text-[#176C9F]
                          "
                        >
                          {project.project_name}
                        </p>

                        <div
                          className="
                            mt-[4px]
                            flex
                            flex-wrap
                            items-center
                            gap-x-[9px]
                            gap-y-[3px]
                          "
                        >
                          <span className="text-[10px] font-medium text-[#8495A1]">
                            {project.project_id}
                          </span>

                          <span className="text-[10px] text-[#B0BAC0]">
                            •
                          </span>

                          <span className="text-[10px] text-[#748A98]">
                            {project.ida || "Agency unavailable"}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div
                        className="
                          w-[92px]
                          shrink-0
                          text-right

                          max-sm:w-auto
                          max-sm:text-left
                        "
                      >
                        <span className="text-[11px] font-semibold text-[#244E69]">
                          {formatCurrency(
                            project.sanctioned_amount
                          )}
                        </span>
                      </div>

                      {/* Status */}
                      <span
                        className={`
                          min-w-[78px]
                          shrink-0
                          rounded-full
                          px-[9px]
                          py-[4px]
                          text-center
                          text-[10px]
                          font-semibold

                          ${getStatusStyle(
                            project.current_status
                          )}
                        `}
                      >
                        {formatStatus(
                          project.current_status
                        )}
                      </span>

                      {/* Risk */}
                      <span
                        className={`
                          min-w-[54px]
                          shrink-0
                          rounded-full
                          px-[8px]
                          py-[4px]
                          text-center
                          text-[10px]
                          font-semibold

                          ${getRiskStyle(
                            project.risk_level
                          )}
                        `}
                      >
                        {project.risk_level || "—"}
                      </span>

                      {/* Arrow */}
                      <ChevronRight
                        size={16}
                        strokeWidth={1.8}
                        className="
                          shrink-0
                          text-[#8DA0AD]
                          transition-transform

                          group-hover:translate-x-[2px]
                          group-hover:text-[#39759A]
                        "
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  className="
                    flex
                    min-h-[300px]
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <div>
                    <Building2
                      size={28}
                      strokeWidth={1.6}
                      className="mx-auto text-[#9BABB5]"
                    />

                    <p className="mt-[9px] text-[13px] font-medium text-[#718692]">
                      No projects available
                    </p>

                    <p className="mt-[3px] text-[11px] text-[#99A7B0]">
                      This area currently has no project records.
                    </p>
                  </div>
                </div>
              )}

              {/* Footer */}
              {selectedAreaProjects.length > 0 && (
                <div
                  className="
                    mt-[13px]
                    border-t
                    border-[#EDF1F4]
                    pt-[11px]
                  "
                >
                  <p className="text-[10px] leading-[1.5] text-[#8295A2]">
                    Showing {selectedAreaProjects.length}{" "}
                    {selectedAreaProjects.length === 1
                      ? "project"
                      : "projects"}{" "}
                    for{" "}
                    <span className="font-semibold text-[#55738A]">
                      {selectedArea?.name}
                    </span>
                    . Click any project to view its complete
                    monitoring details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </MPLayout>
  );
};

export default ConstituencyPage;