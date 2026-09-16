import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const amount = Number(value);

  if (Number.isNaN(amount)) return "—";

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatStatus = (status) => {
  if (!status) return "Unknown";

  const statusMap = {
    COMPLETED: "Completed",
    ONGOING: "Ongoing",
    IN_PROGRESS: "In Progress",
    ON_HOLD: "On Hold",
    NOT_STARTED: "Not Started",
  };

  return statusMap[status] || status;
};

const getStatusStyle = (status) => {
  const formattedStatus = formatStatus(status);

  switch (formattedStatus) {
    case "Completed":
      return "bg-[#EAF7EF] text-[#3B8157]";

    case "Ongoing":
    case "In Progress":
      return "bg-[#EAF2F9] text-[#3F6F96]";

    case "On Hold":
      return "bg-[#FFF0EE] text-[#C95D51]";

    case "Not Started":
      return "bg-[#FFF5E3] text-[#B77A20]";

    default:
      return "bg-[#F1F4F6] text-[#697A87]";
  }
};

const getRiskStyle = (risk) => {
  switch (risk) {
    case "High":
    case "High Risk":
      return "bg-[#FFF0EE] text-[#C9584D]";

    case "Medium":
      return "bg-[#FFF5E3] text-[#B77A20]";

    case "Low":
      return "bg-[#EAF7EF] text-[#3B8157]";

    default:
      return "bg-[#F1F4F6] text-[#697A87]";
  }
};

const getProgressColor = (progress) => {
  if (progress >= 75) return "bg-[#4D8D69]";
  if (progress >= 40) return "bg-[#D69A22]";
  return "bg-[#D86659]";
};

const ProjectsTable = ({
  projects = [],
  totalProjects = 0,
  currentPage = 1,
  totalPages = 1,
  onPrevious,
  onNext,
}) => {

    const navigate = useNavigate();

  return (
    <section
      className="
        mt-[16px]
        overflow-hidden
        rounded-[12px]
        border border-[#E3EAF0]
        bg-white
        shadow-[0_4px_14px_rgba(18,52,77,0.05)]
      "
    >
      {/* =========================
          Table Header
      ========================== */}
      <div
        className="
          flex items-center justify-between
          gap-[16px]
          border-b border-[#EDF1F4]
          px-[22px] py-[15px]

          max-md:flex-col
          max-md:items-start
          max-md:px-[16px]
        "
      >
        <div>
          <h2
            className="
              m-0
              text-[21px]
              font-semibold
              tracking-[-0.2px]
              text-[#153A58]

              max-md:text-[19px]
            "
          >
            Projects ({totalProjects})
          </h2>

          <p
            className="
              mt-[5px]
              text-[13px]
              font-medium
              text-[#8A99A6]

              max-md:text-[12px]
            "
          >
            Sanctioned works and their current implementation status
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] font-medium text-[#7E8F9D]">
            Sort by
          </span>

          <select
            defaultValue="latest"
            className="
              h-[36px]
              rounded-[7px]
              border border-[#DCE5EC]
              bg-white
              px-[10px]
              text-[12px]
              font-medium
              text-[#456075]
              outline-none

              focus:border-[#8FAFC5]
            "
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {projects.length > 0 ? (
        <>
          {/* =========================
              Desktop / Tablet Table
          ========================== */}
          <div className="overflow-x-auto max-md:hidden">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="px-[20px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Project ID
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Project Name
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    District
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Sanctioned Amount
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Progress
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Status
                  </th>

                  <th className="px-[14px] py-[11px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    Risk
                  </th>

                  <th className="px-[14px] py-[11px] pr-[20px] text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-[#738896]">
                    View
                  </th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => {
                  const hasProgress =
                    project.progress_percentage !== null &&
                    project.progress_percentage !== undefined &&
                    project.progress_percentage !== "";

                  const progress = hasProgress
                    ? Number(project.progress_percentage)
                    : null;

                  return (
                    <tr
                      key={project.project_id}
                      className="
                        border-t border-[#EDF1F4]
                        transition-colors
                        hover:bg-[#FBFCFD]
                      "
                    >
                      {/* Project ID */}
                      <td className="px-[20px] py-[14px] text-[13px] font-semibold text-[#47657A]">
                        {project.project_id || "—"}
                      </td>

                      {/* Project Name */}
                      <td className="px-[14px] py-[14px]">
                        <div className="max-w-[250px]">
                          <span className="block text-[14px] font-semibold leading-[1.35] text-[#183D5A]">
                            {project.project_name || "Unnamed Project"}
                          </span>
                        </div>
                      </td>

                      {/* District */}
                      <td className="px-[14px] py-[14px] text-[13px] font-medium text-[#657985]">
                        {project.district || "—"}
                      </td>

                      {/* Sanctioned Amount */}
                      <td className="px-[14px] py-[14px] text-[13px] font-semibold text-[#2B4D67]">
                        {formatCurrency(project.sanctioned_amount)}
                      </td>

                      {/* Progress */}
                      <td className="px-[14px] py-[14px]">
                        <div className="w-[130px]">
                          <div className="mb-[5px] text-[12px] font-semibold text-[#3F5F75]">
                            {progress !== null ? `${progress}%` : "—"}
                          </div>

                          <div className="h-[6px] overflow-hidden rounded-full bg-[#E8EEF2]">
                            {progress !== null && (
                              <div
                                className={`h-full rounded-full ${getProgressColor(
                                  progress
                                )}`}
                                style={{
                                  width: `${Math.min(
                                    Math.max(progress, 0),
                                    100
                                  )}%`,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-[14px] py-[14px]">
                        <span
                          className={`
                            inline-flex
                            whitespace-nowrap
                            rounded-full
                            px-[10px] py-[5px]
                            text-[11px]
                            font-semibold
                            ${getStatusStyle(project.current_status)}
                          `}
                        >
                          {formatStatus(project.current_status)}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="px-[14px] py-[14px]">
                        <span
                          className={`
                            inline-flex
                            whitespace-nowrap
                            rounded-full
                            px-[10px] py-[5px]
                            text-[11px]
                            font-semibold
                            ${getRiskStyle(project.risk_level)}
                          `}
                        >
                          {project.risk_level || "—"}
                        </span>
                      </td>

                      {/* View */}
                      <td className="px-[14px] py-[14px] pr-[20px]">
                        <button
                          type="button"
                           onClick={() =>
                                navigate(`/dashboard/projects/${project.project_id}`)
                            }
                          className="
                            inline-flex
                            h-[32px]
                            items-center
                            gap-[6px]
                            rounded-[7px]
                            border border-[#CBD9E3]
                            bg-white
                            px-[11px]
                            text-[12px]
                            font-semibold
                            text-[#315E7F]
                            transition-colors

                            hover:bg-[#F7FAFC]
                          "
                        >
                          <Eye size={15} strokeWidth={1.8} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =========================
              Mobile Project Cards
          ========================== */}
          <div className="hidden max-md:block">
            {projects.map((project) => {
              const hasProgress =
                project.progress_percentage !== null &&
                project.progress_percentage !== undefined &&
                project.progress_percentage !== "";

              const progress = hasProgress
                ? Number(project.progress_percentage)
                : null;

              return (
                <article
                  key={project.project_id}
                  className="
                    border-b border-[#EDF1F4]
                    px-[16px] py-[15px]
                    last:border-b-0
                  "
                >
                  {/* Mobile Header */}
                  <div className="flex items-start justify-between gap-[12px]">
                    <div className="min-w-0">
                      <span className="text-[12px] font-semibold text-[#7F91A0]">
                        {project.project_id || "—"}
                      </span>

                      <h3 className="mt-[4px] text-[16px] font-semibold leading-[1.35] text-[#183D5A]">
                        {project.project_name || "Unnamed Project"}
                      </h3>
                    </div>

                    <span
                      className={`
                        shrink-0
                        whitespace-nowrap
                        rounded-full
                        px-[9px] py-[4px]
                        text-[11px]
                        font-semibold
                        ${getStatusStyle(project.current_status)}
                      `}
                    >
                      {formatStatus(project.current_status)}
                    </span>
                  </div>

                  {/* Mobile Details */}
                  <div className="mt-[14px] grid grid-cols-2 gap-x-[14px] gap-y-[12px]">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.4px] text-[#9AA6AF]">
                        District
                      </span>

                      <span className="mt-[4px] block text-[13px] font-medium text-[#607581]">
                        {project.district || "—"}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.4px] text-[#9AA6AF]">
                        Sanctioned
                      </span>

                      <span className="mt-[4px] block text-[13px] font-semibold text-[#2B4D67]">
                        {formatCurrency(project.sanctioned_amount)}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Progress */}
                  <div className="mt-[14px]">
                    <div className="mb-[6px] flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[#7F91A0]">
                        Progress
                      </span>

                      <span className="text-[12px] font-semibold text-[#3F5F75]">
                        {progress !== null ? `${progress}%` : "—"}
                      </span>
                    </div>

                    <div className="h-[6px] overflow-hidden rounded-full bg-[#E8EEF2]">
                      {progress !== null && (
                        <div
                          className={`h-full rounded-full ${getProgressColor(
                            progress
                          )}`}
                          style={{
                            width: `${Math.min(
                              Math.max(progress, 0),
                              100
                            )}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="mt-[14px] flex items-center justify-between">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-[10px] py-[5px]
                        text-[11px]
                        font-semibold
                        ${getRiskStyle(project.risk_level)}
                      `}
                    >
                      {project.risk_level || "Risk unavailable"}
                    </span>

                    <button
                      type="button"

                      onClick={() =>
                        navigate(`/dashboard/projects/${project.project_id}`)
                        }
                      className="
                        inline-flex
                        h-[32px]
                        items-center
                        gap-[6px]
                        rounded-[7px]
                        border border-[#CBD9E3]
                        bg-white
                        px-[11px]
                        text-[12px]
                        font-semibold
                        text-[#315E7F]

                        hover:bg-[#F7FAFC]
                      "
                    >
                      <Eye size={15} strokeWidth={1.8} />
                      View
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =========================
              Pagination
          ========================== */}
          <div
            className="
              flex items-center justify-between
              gap-[14px]
              border-t border-[#EDF1F4]
              px-[20px] py-[13px]

              max-md:flex-col
              max-md:items-start
              max-md:px-[16px]
            "
          >
            <p className="m-0 text-[12px] font-medium text-[#7E8F9D]">
              Showing page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={onPrevious}
                disabled={currentPage <= 1}
                className="
                  h-[32px]
                  rounded-[7px]
                  border border-[#DCE5EC]
                  bg-white
                  px-[11px]
                  text-[12px]
                  font-semibold
                  text-[#47657A]
                  transition-colors

                  hover:bg-[#F7FAFC]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Previous
              </button>

              <span
                className="
                  flex
                  h-[32px]
                  min-w-[32px]
                  items-center
                  justify-center
                  rounded-[7px]
                  bg-[#EAF2F8]
                  px-[8px]
                  text-[12px]
                  font-semibold
                  text-[#245F88]
                "
              >
                {currentPage}
              </span>

              <button
                type="button"
                onClick={onNext}
                disabled={currentPage >= totalPages}
                className="
                  h-[32px]
                  rounded-[7px]
                  border border-[#DCE5EC]
                  bg-white
                  px-[11px]
                  text-[12px]
                  font-semibold
                  text-[#47657A]
                  transition-colors

                  hover:bg-[#F7FAFC]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        /* =========================
            Empty State
        ========================== */
        <div className="flex min-h-[180px] items-center justify-center px-[20px] py-[30px] text-center">
          <div>
            <p className="m-0 text-[15px] font-semibold text-[#486276]">
              No projects available
            </p>

            <p className="mt-[5px] text-[13px] leading-[1.5] text-[#96A3AD]">
              Projects will appear here when project data is available.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsTable;