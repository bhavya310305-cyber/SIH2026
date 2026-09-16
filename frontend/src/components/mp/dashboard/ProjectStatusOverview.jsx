import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ProjectStatusOverview = ({
  totalProjects,
  completedProjects,
  activeProjects,
  onHoldProjects,
  notStartedProjects,
}) => {
  const chartData = [
    {
      name: "Completed",
      value: Number(completedProjects || 0),
      color: "#4F9569",
    },
    {
      name: "Ongoing",
      value: Number(activeProjects || 0),
      color: "#4D7FA8",
    },
    {
      name: "On Hold",
      value: Number(onHoldProjects || 0),
      color: "#D96E64",
    },
    {
      name: "Not Started",
      value: Number(notStartedProjects || 0),
      color: "#D6A24C",
    },
  ].filter((item) => item.value > 0);

  const safeTotal =
    totalProjects !== null && totalProjects !== undefined
      ? Number(totalProjects)
      : chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <article
      className="
        min-h-[240px]
        rounded-[12px]
        border border-[#E3EAF0]
        bg-white
        px-[26px] py-[24px]
        shadow-[0_4px_14px_rgba(18,52,77,0.05)]

        max-md:px-[18px]
        max-md:py-[18px]
      "
    >
      {/* Heading */}
      <div className="mb-[20px]">
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
          Project Status Overview
        </h2>

        <p
          className="
            mt-[6px]
            text-[12px]
            font-medium
            text-[#8A99A6]

            max-md:text-[11px]
          "
        >
          Current lifecycle status of sanctioned projects
        </p>
      </div>

      {/* Chart + Legend */}
      <div
        className="
          grid grid-cols-[220px_1fr]
          items-center gap-[28px]

          max-md:grid-cols-1
          max-md:gap-[14px]
        "
      >
        {/* Donut */}
        <div className="relative h-[210px] w-[220px] max-md:mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={64}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center value */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              flex flex-col
              items-center justify-center
              text-center
            "
          >
            <span
              className="
                text-[30px]
                font-semibold
                leading-none
                text-[#153A58]
              "
            >
              {safeTotal}
            </span>

            <span
              className="
                mt-[6px]
                text-[10px]
                font-medium
                uppercase
                tracking-[0.8px]
                text-[#98A5AF]
              "
            >
              Total Projects
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 gap-[13px]">
          {chartData.map((item) => (
            <div
              key={item.name}
              className="
                flex items-center
                justify-between
                border-b border-[#EEF2F5]
                pb-[10px]
                last:border-b-0
                last:pb-0
              "
            >
              <div className="flex items-center gap-[10px]">
                <span
                  className="h-[10px] w-[10px] rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span
                  className="
                    text-[13px]
                    font-medium
                    text-[#5F7382]
                  "
                >
                  {item.name}
                </span>
              </div>

              <span
                className="
                  text-[14px]
                  font-semibold
                  text-[#173B58]
                "
              >
                {item.value}
              </span>
            </div>
          ))}

          {chartData.length === 0 && (
            <div className="flex min-h-[130px] items-center justify-center">
              <span className="text-[12px] text-[#98A5AF]">
                No project status data available
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectStatusOverview;