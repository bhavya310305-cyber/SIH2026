const ProjectsByDistrict = ({
  districtStatistics = [],
  highRiskByDistrict = [],
}) => {
  const riskMap = new Map(
    highRiskByDistrict.map((item) => [
      item.district,
      Number(item.high_risk_projects || 0),
    ])
  );

  const rows = districtStatistics.map((item) => {
    const total = Number(item.total_projects || 0);
    const completed = Number(item.completed_projects || 0);

    const completion =
      item.completion_percentage !== null &&
      item.completion_percentage !== undefined
        ? Number(item.completion_percentage)
        : total > 0
          ? Math.round((completed / total) * 100)
          : 0;

    return {
      ...item,
      total,
      completed,
      completion,
      highRisk: riskMap.get(item.district) || 0,
    };
  });

  return (
    <article
      className="
        rounded-[12px]
        border border-[#E3EAF0]
        bg-white
        px-[24px] py-[20px]
        shadow-[0_4px_14px_rgba(18,52,77,0.05)]

        max-md:px-[18px]
        max-md:py-[17px]
      "
    >
      {/* Header */}
      <div className="mb-[18px]">
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
          Projects by District
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
          District-wise project distribution and completion
        </p>
      </div>

      {rows.length > 0 ? (
        <div className="space-y-[16px]">
          {rows.map((item) => (
            <div key={item.district}>
              <div className="flex items-center justify-between gap-[14px]">
                <div className="min-w-0">
                  <div className="flex items-center gap-[8px]">
                    <span
                      className="
                        truncate
                        text-[13px]
                        font-semibold
                        text-[#244760]

                        max-md:text-[12px]
                      "
                    >
                      {item.district || "Unknown District"}
                    </span>

                    {item.highRisk > 0 && (
                      <span
                        className="
                          shrink-0
                          rounded-full
                          bg-[#FFF0EE]
                          px-[8px] py-[4px]
                          text-[9px]
                          font-semibold
                          text-[#C95D51]
                        "
                      >
                        {item.highRisk} High Risk
                      </span>
                    )}
                  </div>

                  <span
                    className="
                      mt-[4px]
                      block
                      text-[10px]
                      text-[#98A5AF]
                    "
                  >
                    {item.completed} completed of {item.total} projects
                  </span>
                </div>

                <span
                  className="
                    shrink-0
                    text-[12px]
                    font-semibold
                    text-[#47657A]
                  "
                >
                  {item.completion}%
                </span>
              </div>

              <div className="mt-[9px] h-[7px] overflow-hidden rounded-full bg-[#EAF0F4]">
                <div
                  className="h-full rounded-full bg-[#4E8D6A]"
                  style={{
                    width: `${Math.min(
                      Math.max(item.completion, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[120px] items-center justify-center text-center">
          <div>
            <p className="m-0 text-[13px] font-semibold text-[#486276]">
              No district data available
            </p>

            <p className="mt-[5px] text-[11px] leading-[1.5] text-[#96A3AD]">
              District-level project statistics will appear here when data is
              available.
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProjectsByDistrict;