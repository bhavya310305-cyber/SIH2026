import { useMemo, useState } from "react";
import {
  ArrowRight,
  RotateCcw,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DALayout from "../../components/da/DALayout";

/*
 * Temporary AI alert data.
 *
 * Only projects requiring attention are shown here.
 *
 * High Risk   -> Priority Alert
 * Medium Risk -> Early Warning
 *
 * Low-risk projects remain available in Project Monitoring
 * and are not shown as alerts.
 */
const ALERTS = [
  {
    id: 1,
    project_id: "MPLADS-1024",
    project_name: "Community Hall Construction",
    implementing_agency: "Public Works Department",
    priority: "Priority Alert",
    anomaly_type: "Progress–Expenditure Mismatch",
    finding:
      "78% fund utilization recorded while physical progress is 42%.",
    detected_on: "15 Sep 2026",
  },
  {
    id: 2,
    project_id: "MPLADS-1031",
    project_name: "Rural Road Improvement",
    implementing_agency: "Rural Development Department",
    priority: "Priority Alert",
    anomaly_type: "Project Delay",
    finding:
      "Project progress is significantly behind the expected completion schedule.",
    detected_on: "14 Sep 2026",
  },
  {
    id: 3,
    project_id: "MPLADS-1018",
    project_name: "Drinking Water Facility",
    implementing_agency:
      "Public Health Engineering Department",
    priority: "Early Warning",
    anomaly_type: "Cost Deviation",
    finding:
      "Current expenditure trend is higher than comparable works of similar scope.",
    detected_on: "13 Sep 2026",
  },
  {
    id: 4,
    project_id: "MPLADS-1042",
    project_name: "School Building Extension",
    implementing_agency: "Public Works Department",
    priority: "Early Warning",
    anomaly_type: "Schedule Deviation",
    finding:
      "Physical progress is below the expected level for the elapsed project duration.",
    detected_on: "12 Sep 2026",
  },
];

const DAAIAlerts = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [anomalyType, setAnomalyType] = useState("");
  const [agency, setAgency] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    priority: "",
    anomalyType: "",
    agency: "",
  });

  /*
   * SUMMARY
   */
  const priorityAlerts = ALERTS.filter(
    (item) => item.priority === "Priority Alert"
  ).length;

  const earlyWarnings = ALERTS.filter(
    (item) => item.priority === "Early Warning"
  ).length;

  /*
   * FILTER OPTIONS
   */
  const priorities = useMemo(() => {
    return [
      ...new Set(
        ALERTS.map((item) => item.priority)
      ),
    ];
  }, []);

  const anomalyTypes = useMemo(() => {
    return [
      ...new Set(
        ALERTS.map((item) => item.anomaly_type)
      ),
    ].sort();
  }, []);

  const agencies = useMemo(() => {
    return [
      ...new Set(
        ALERTS.map(
          (item) => item.implementing_agency
        )
      ),
    ].sort();
  }, []);

  /*
   * FILTER ALERTS
   */
  const filteredAlerts = useMemo(() => {
    return ALERTS.filter((alert) => {
      const searchValue =
        appliedFilters.search
          .trim()
          .toLowerCase();

      const matchesSearch =
        !searchValue ||
        alert.project_id
          .toLowerCase()
          .includes(searchValue) ||
        alert.project_name
          .toLowerCase()
          .includes(searchValue);

      const matchesPriority =
        !appliedFilters.priority ||
        alert.priority ===
          appliedFilters.priority;

      const matchesAnomaly =
        !appliedFilters.anomalyType ||
        alert.anomaly_type ===
          appliedFilters.anomalyType;

      const matchesAgency =
        !appliedFilters.agency ||
        alert.implementing_agency ===
          appliedFilters.agency;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesAnomaly &&
        matchesAgency
      );
    });
  }, [appliedFilters]);

  /*
   * APPLY FILTERS
   */
  const handleApplyFilters = () => {
    setAppliedFilters({
      search,
      priority,
      anomalyType,
      agency,
    });
  };

  /*
   * RESET FILTERS
   */
  const handleResetFilters = () => {
    setSearch("");
    setPriority("");
    setAnomalyType("");
    setAgency("");

    setAppliedFilters({
      search: "",
      priority: "",
      anomalyType: "",
      agency: "",
    });
  };

  /*
   * OPEN PROJECT ANALYSIS
   */
  const handleViewAnalysis = (projectId) => {
    navigate(`/da/alerts/${projectId}`);
  };

  return (
    <DALayout>
      <div className="w-full">
        {/* =====================================================
            PAGE HEADING
        ====================================================== */}
        <div className="mb-[18px]">
          <h1
            className="
              text-[28px]
              font-semibold
              leading-[1.2]
              tracking-[-0.35px]
              text-[#153A58]

              max-md:text-[25px]
            "
          >
            AI Alerts
          </h1>

          <p
            className="
              mt-[5px]
              text-[13px]
              leading-[1.5]
              text-[#718794]
            "
          >
            Projects where significant deviations or
            unusual patterns require monitoring attention.
          </p>
        </div>

        {/* =====================================================
            SUMMARY
        ====================================================== */}
        <section
          className="
            grid
            grid-cols-2
            gap-[12px]

            max-md:grid-cols-1
          "
        >
          <SummaryCard
            label="Priority Alerts"
            value={priorityAlerts}
            description="Projects requiring priority review"
            valueClass="text-[#C2413A]"
          />

          <SummaryCard
            label="Early Warnings"
            value={earlyWarnings}
            description="Projects showing emerging deviations"
            valueClass="text-[#B7791F]"
          />
        </section>

        {/* =====================================================
            FILTERS
        ====================================================== */}
        <section
          className="
            mt-[14px]
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            px-[18px]
            py-[15px]
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]
          "
        >
          <div
            className="
              grid
              grid-cols-[minmax(250px,1.4fr)_repeat(3,minmax(150px,0.8fr))_auto]
              gap-[10px]

              max-xl:grid-cols-2
              max-md:grid-cols-1
            "
          >
            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                strokeWidth={1.8}
                className="
                  absolute
                  left-[13px]
                  top-1/2
                  -translate-y-1/2
                  text-[#8396A3]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleApplyFilters();
                  }
                }}
                placeholder="Search Project ID or Project Name"
                className="
                  h-[42px]
                  w-full
                  rounded-[8px]
                  border
                  border-[#DDE6EB]
                  bg-white
                  pl-[40px]
                  pr-[13px]
                  text-[13px]
                  text-[#294E65]
                  outline-none

                  placeholder:text-[#98A7B0]

                  focus:border-[#6F9EBB]
                "
              />
            </div>

            {/* Priority */}
            <select
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value)
              }
              className={selectClasses}
            >
              <option value="">
                All Priorities
              </option>

              {priorities.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* Anomaly Type */}
            <select
              value={anomalyType}
              onChange={(event) =>
                setAnomalyType(
                  event.target.value
                )
              }
              className={selectClasses}
            >
              <option value="">
                All Detected Issues
              </option>

              {anomalyTypes.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* Implementing Agency */}
            <select
              value={agency}
              onChange={(event) =>
                setAgency(event.target.value)
              }
              className={selectClasses}
            >
              <option value="">
                All Implementing Agencies
              </option>

              {agencies.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* Buttons */}
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="
                  h-[42px]
                  rounded-[8px]
                  bg-[#07345C]
                  px-[19px]
                  text-[12px]
                  font-semibold
                  text-white

                  hover:bg-[#0B416F]
                "
              >
                Apply
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                aria-label="Reset filters"
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  items-center
                  justify-center
                  rounded-[8px]
                  border
                  border-[#DDE6EB]
                  bg-white
                  text-[#607C8F]

                  hover:bg-[#F5F8FA]
                "
              >
                <RotateCcw
                  size={16}
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            ALERT LIST
        ====================================================== */}
        <section
          className="
            mt-[14px]
            overflow-hidden
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]
          "
        >
          <div
            className="
              border-b
              border-[#E8EDF0]
              px-[20px]
              py-[14px]
            "
          >
            <h2
              className="
                text-[19px]
                font-semibold
                text-[#153A58]
              "
            >
              Monitoring Alerts
            </h2>

            <p
              className="
                mt-[3px]
                text-[11px]
                text-[#7D909C]
              "
            >
              {filteredAlerts.length} project
              {filteredAlerts.length === 1
                ? ""
                : "s"}{" "}
              currently require attention
            </p>
          </div>

          <div className="overflow-x-auto">
            <table
              className="
                w-full
                min-w-[1200px]
                border-collapse
              "
            >
              <thead>
                <tr className="bg-[#F7F9FB]">
                  <TableHeading>
                    Priority
                  </TableHeading>

                  <TableHeading>
                    Project
                  </TableHeading>

                  <TableHeading>
                    Implementing Agency
                  </TableHeading>

                  <TableHeading>
                    Detected Issue
                  </TableHeading>

                  <TableHeading>
                    AI Finding
                  </TableHeading>

                  <TableHeading>
                    Detected On
                  </TableHeading>

                  <th
                    className="
                      px-[15px]
                      py-[12px]
                      text-right
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.4px]
                      text-[#6E8492]
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="
                        border-t
                        border-[#EDF1F3]

                        hover:bg-[#FAFCFD]
                      "
                    >
                      {/* Priority */}
                      <td className="px-[15px] py-[15px]">
                        <PriorityBadge
                          priority={
                            alert.priority
                          }
                        />
                      </td>

                      {/* Project */}
                      <td
                        className="
                          max-w-[230px]
                          px-[15px]
                          py-[15px]
                        "
                      >
                        <p
                          className="
                            text-[13px]
                            font-semibold
                            text-[#153E59]
                          "
                        >
                          {alert.project_name}
                        </p>

                        <p
                          className="
                            mt-[3px]
                            text-[11px]
                            font-medium
                            text-[#718794]
                          "
                        >
                          {alert.project_id}
                        </p>
                      </td>

                      {/* Agency */}
                      <td
                        className="
                          max-w-[210px]
                          px-[15px]
                          py-[15px]
                          text-[12px]
                          leading-[1.5]
                          text-[#577184]
                        "
                      >
                        {
                          alert.implementing_agency
                        }
                      </td>

                      {/* Detected Issue */}
                      <td
                        className="
                          max-w-[190px]
                          px-[15px]
                          py-[15px]
                          text-[12px]
                          font-medium
                          text-[#385C73]
                        "
                      >
                        {alert.anomaly_type}
                      </td>

                      {/* Finding */}
                      <td
                        className="
                          max-w-[320px]
                          px-[15px]
                          py-[15px]
                          text-[12px]
                          leading-[1.5]
                          text-[#657B89]
                        "
                      >
                        {alert.finding}
                      </td>

                      {/* Detected On */}
                      <td
                        className="
                          whitespace-nowrap
                          px-[15px]
                          py-[15px]
                          text-[12px]
                          text-[#657B89]
                        "
                      >
                        {alert.detected_on}
                      </td>

                      {/* Action */}
                      <td
                        className="
                          px-[15px]
                          py-[15px]
                          text-right
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleViewAnalysis(
                              alert.project_id
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            gap-[6px]
                            whitespace-nowrap
                            rounded-[7px]
                            border
                            border-[#BDD5E3]
                            bg-[#F7FBFD]
                            px-[12px]
                            py-[7px]
                            text-[12px]
                            font-semibold
                            text-[#23698F]

                            hover:border-[#8DB8CF]
                            hover:bg-[#EDF6FA]
                          "
                        >
                          View Analysis

                          <ArrowRight
                            size={14}
                            strokeWidth={1.9}
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="
                        px-[20px]
                        py-[55px]
                        text-center
                      "
                    >
                      <p
                        className="
                          text-[14px]
                          font-semibold
                          text-[#536F81]
                        "
                      >
                        No alerts found
                      </p>

                      <p
                        className="
                          mt-[4px]
                          text-[12px]
                          text-[#8B9AA4]
                        "
                      >
                        Try changing the selected filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DALayout>
  );
};

/* ============================================================
   SUMMARY CARD
============================================================ */
const SummaryCard = ({
  label,
  value,
  description,
  valueClass = "text-[#153A58]",
}) => {
  return (
    <div
      className="
        rounded-[12px]
        border
        border-[#E1E8ED]
        bg-white
        px-[22px]
        py-[18px]
        shadow-[0_3px_12px_rgba(18,52,77,0.035)]
      "
    >
      <p
        className="
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.7px]
          text-[#8295A1]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-[6px]
          text-[36px]
          font-semibold
          leading-none
          ${valueClass}
        `}
      >
        {value}
      </p>

      <p
        className="
          mt-[7px]
          text-[11px]
          text-[#8B9AA4]
        "
      >
        {description}
      </p>
    </div>
  );
};

/* ============================================================
   TABLE HEADING
============================================================ */
const TableHeading = ({ children }) => {
  return (
    <th
      className="
        px-[15px]
        py-[12px]
        text-left
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.4px]
        text-[#6E8492]
      "
    >
      {children}
    </th>
  );
};

/* ============================================================
   PRIORITY BADGE
============================================================ */
const PriorityBadge = ({ priority }) => {
  const styles = {
    "Priority Alert":
      "border border-[#F2C3BE] bg-[#FCE8E6] text-[#B9382F]",

    "Early Warning":
      "border border-[#F1D6A4] bg-[#FFF3DC] text-[#A96B0C]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        whitespace-nowrap
        rounded-full
        px-[12px]
        py-[7px]
        text-[12px]
        font-semibold
        leading-none

        ${
          styles[priority] ||
          "border border-[#DCE4E9] bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {priority}
    </span>
  );
};

/* ============================================================
   SHARED SELECT STYLE
============================================================ */
const selectClasses = `
  h-[42px]
  rounded-[8px]
  border
  border-[#DDE6EB]
  bg-white
  px-[12px]
  text-[13px]
  text-[#456579]
  outline-none

  focus:border-[#6F9EBB]
`;

export default DAAIAlerts;