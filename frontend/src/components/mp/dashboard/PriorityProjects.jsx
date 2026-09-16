const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "—";
  }

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
};

const getStatusStyle = (status) => {
  switch (status) {
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

const PriorityProjects = ({ projects = [] }) => {
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
      {/* Header */}
      <div
        className="
          flex items-center justify-between
          gap-[16px]
          border-b border-[#EDF1F4]
          px-[22px] py-[16px]

          max-md:px-[16px]
          max-md:py-[14px]
        "
      >
        <div>
          <h2
            className="
              m-0
              text-[18px]
              font-semibold
              tracking-[-0.2px]
              text-[#153A58]

              max-md:text-[16px]
            "
          >
            Priority Projects
          </h2>

          <p
            className="
              mt-[5px]
              text-[12px]
              font-medium
              text-[#8A99A6]

              max-md:text-[11px]
            "
          >
            Projects requiring closer monitoring
          </p>
        </div>

        <button
          type="button"
          className="
            shrink-0
            rounded-[7px]
            border border-[#DCE5EC]
            bg-white
            px-[14px] py-[8px]
            text-[11px]
            font-semibold
            text-[#285A7E]
            transition-colors
            hover:bg-[#F6F9FB]
          "
        >
          View All
        </button>
      </div>

      {projects.length > 0 ? (
        <>
          {/* Desktop / Tablet table */}
          <div className="overflow-x-auto max-md:hidden">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="px-[22px] py-[12px] text-left text-[11px] font-semibold uppercase tracking-[0.45px] text-[#8798A5]">
                    Project
                  </th>

                  <th className="px-[14px] py-[12px] text-left text-[11px] font-semibold uppercase tracking-[0.45px] text-[#8798A5]">
                    District
                  </th>

                  <th className="px-[14px] py-[12px] text-left text-[11px] font-semibold uppercase tracking-[0.45px] text-[#8798A5]">
                    Sanctioned Amount
                  </th>

                  <th className="px-[14px] py-[12px] text-left text-[11px] font-semibold uppercase tracking-[0.45px] text-[#8798A5]">
                    Status
                  </th>

                  <th className="px-[14px] py-[12px] pr-[22px] text-left text-[11px] font-semibold uppercase tracking-[0.45px] text-[#8798A5]">
                    Risk
                  </th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.project_id}
                    className="border-t border-[#EDF1F4]"
                  >
                    <td className="px-[22px] py-[14px]">
                      <div className="max-w-[260px]">
                        <span className="block truncate text-[13px] font-semibold text-[#183D5A]">
                          {project.project_name || "Unnamed Project"}
                        </span>

                        <span className="mt-[4px] block text-[10px] font-medium text-[#97A4AE]">
                          {project.project_id || "—"}
                        </span>
                      </div>
                    </td>

                    <td className="px-[14px] py-[14px] text-[12px] font-medium text-[#657985]">
                      {project.district || "—"}
                    </td>

                    <td className="px-[14px] py-[14px] text-[12px] font-semibold text-[#2B4D67]">
                      {formatCurrency(project.sanctioned_amount)}
                    </td>

                    <td className="px-[14px] py-[14px]">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-[10px] py-[5px]
                          text-[10px]
                          font-semibold
                          ${getStatusStyle(project.current_status)}
                        `}
                      >
                        {project.current_status || "Unknown"}
                      </span>
                    </td>

                    <td className="px-[14px] py-[14px] pr-[22px]">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-[#FFF0EE]
                          px-[10px] py-[5px]
                          text-[10px]
                          font-semibold
                          text-[#C9584D]
                        "
                      >
                        High Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="hidden max-md:block">
            {projects.map((project) => (
              <article
                key={project.project_id}
                className="
                  border-b border-[#EDF1F4]
                  px-[16px] py-[15px]
                  last:border-b-0
                "
              >
                <div className="flex items-start justify-between gap-[12px]">
                  <div className="min-w-0">
                    <h3
                      className="
                        m-0
                        text-[14px]
                        font-semibold
                        leading-[1.35]
                        text-[#183D5A]
                      "
                    >
                      {project.project_name || "Unnamed Project"}
                    </h3>

                    <span className="mt-[4px] block text-[10px] text-[#96A4AE]">
                      {project.project_id || "—"}
                    </span>
                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-[#FFF0EE]
                      px-[9px] py-[4px]
                      text-[9px]
                      font-semibold
                      text-[#C9584D]
                    "
                  >
                    High Risk
                  </span>
                </div>

                <div className="mt-[13px] grid grid-cols-2 gap-x-[14px] gap-y-[11px]">
                  <div>
                    <span className="block text-[9px] font-medium uppercase tracking-[0.4px] text-[#9AA6AF]">
                      District
                    </span>

                    <span className="mt-[4px] block text-[11px] font-medium text-[#607581]">
                      {project.district || "—"}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] font-medium uppercase tracking-[0.4px] text-[#9AA6AF]">
                      Amount
                    </span>

                    <span className="mt-[4px] block text-[11px] font-semibold text-[#2B4D67]">
                      {formatCurrency(project.sanctioned_amount)}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] font-medium uppercase tracking-[0.4px] text-[#9AA6AF]">
                      Status
                    </span>

                    <span
                      className={`
                        mt-[5px]
                        inline-flex
                        rounded-full
                        px-[8px] py-[4px]
                        text-[9px]
                        font-semibold
                        ${getStatusStyle(project.current_status)}
                      `}
                    >
                      {project.current_status || "Unknown"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div
          className="
            flex min-h-[120px]
            items-center justify-center
            px-[20px] py-[24px]
            text-center
          "
        >
          <div>
            <p className="m-0 text-[13px] font-semibold text-[#486276]">
              No priority projects available
            </p>

            <p className="mt-[5px] text-[11px] leading-[1.5] text-[#96A3AD]">
              High-risk projects will appear here when monitoring data is
              available.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PriorityProjects;