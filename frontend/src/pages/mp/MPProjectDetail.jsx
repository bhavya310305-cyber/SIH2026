import { useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CircleAlert,
  FileText,
  MapPin,
} from "lucide-react";

import MPLayout from "../../components/mp/MPLayout";
import projectsMockData from "../../data/projectsMockData";
import projectUpdatesMockData from "../../data/projectUpdatesMockData";

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "—";
  }

  return `₹ ${amount.toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatStatus = (status) => {
  const statusMap = {
    COMPLETED: "Completed",
    ONGOING: "Ongoing",
    IN_PROGRESS: "In Progress",
    ON_HOLD: "On Hold",
    NOT_STARTED: "Not Started",
  };

  return statusMap[status] || status || "Unknown";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-[#DDF4E7] text-[#28744A]";

    case "ONGOING":
    case "IN_PROGRESS":
      return "bg-[#DDEEF8] text-[#27678E]";

    case "ON_HOLD":
      return "bg-[#FFF0E0] text-[#A86818]";

    case "NOT_STARTED":
      return "bg-[#F1F3F5] text-[#657783]";

    default:
      return "bg-[#F1F3F5] text-[#657783]";
  }
};

const getRiskStyle = (risk) => {
  switch (risk) {
    case "High":
    case "High Risk":
      return "bg-[#FDE7E5] text-[#BB4B42]";

    case "Medium":
      return "bg-[#FFF1D8] text-[#A56B18]";

    case "Low":
      return "bg-[#E4F4EA] text-[#347653]";

    default:
      return "bg-[#EEF2F5] text-[#687B89]";
  }
};

const DetailRow = ({ label, value }) => {
  return (
    <div
      className="
        grid
        grid-cols-[145px_minmax(0,1fr)]
        gap-[14px]
        border-b border-[#EDF1F4]
        py-[10px]
        last:border-b-0

        max-sm:grid-cols-1
        max-sm:gap-[4px]
      "
    >
      <span className="text-[12px] font-medium text-[#788C9A]">
        {label}
      </span>

      <span className="text-[13px] font-semibold text-[#294B63]">
        {value}
      </span>
    </div>
  );
};

const MPProjectDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  const fromConstituency =
    location.state?.from === "/dashboard/constituency";

  const project = useMemo(() => {
    return projectsMockData.find(
      (item) => item.project_id === projectId
    );
  }, [projectId]);

  const projectUpdate = useMemo(() => {
    return projectUpdatesMockData.find(
      (item) => item.project_id === projectId
    );
  }, [projectId]);

  const handleBack = () => {
    if (fromConstituency) {
      navigate("/dashboard/constituency");
      return;
    }

    navigate("/dashboard/projects");
  };

  if (!project) {
    return (
      <MPLayout>
        <div className="flex min-h-[420px] items-center justify-center">
          <div className="text-center">
            <CircleAlert
              size={38}
              strokeWidth={1.6}
              className="mx-auto text-[#9AABB6]"
            />

            <h1 className="mt-[14px] text-[22px] font-semibold text-[#173D59]">
              Project not found
            </h1>

            <p className="mt-[6px] text-[13px] text-[#83939F]">
              The requested project could not be found.
            </p>

            <button
              type="button"
              onClick={handleBack}
              className="
                mt-[18px]
                rounded-[8px]
                bg-[#0F4F78]
                px-[18px]
                py-[9px]
                text-[13px]
                font-semibold
                text-white
                hover:bg-[#0B4266]
              "
            >
              {fromConstituency
                ? "Back to Constituency"
                : "Back to Projects"}
            </button>
          </div>
        </div>
      </MPLayout>
    );
  }

  return (
    <MPLayout>
      <div className="w-full">
        {/* Back Navigation */}
        <button
          type="button"
          onClick={handleBack}
          className="
            mb-[10px]
            inline-flex
            items-center
            gap-[7px]
            text-[13px]
            font-semibold
            text-[#597386]
            transition-colors
            hover:text-[#153A58]
          "
        >
          <ArrowLeft size={16} strokeWidth={1.8} />

          {fromConstituency
            ? "Back to Constituency"
            : "Back to Projects"}
        </button>

        {/* Project Header */}
        <section
          className="
            relative
            overflow-hidden
            rounded-[13px]
            bg-[#07345C]
            px-[22px]
            py-[16px]

            max-md:px-[18px]
            max-md:py-[15px]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-[80px]
              -top-[100px]
              h-[250px]
              w-[250px]
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-[35px]
              top-[20px]
              h-[120px]
              w-[120px]
              rounded-full
              border
              border-white/[0.06]
            "
          />

          <div className="relative z-10">
            <div
              className="
                flex
                items-start
                justify-between
                gap-[20px]

                max-md:flex-col
              "
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-[9px]">
                  <span className="text-[13px] font-semibold text-[#AFC7D8]">
                    {project.project_id}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-[11px]
                      py-[5px]
                      text-[11px]
                      font-semibold
                      ${getStatusStyle(project.current_status)}
                    `}
                  >
                    {formatStatus(project.current_status)}
                  </span>

                  {project.risk_level && (
                    <span
                      className={`
                        rounded-full
                        px-[11px]
                        py-[5px]
                        text-[11px]
                        font-semibold
                        ${getRiskStyle(project.risk_level)}
                      `}
                    >
                      {project.risk_level} Risk
                    </span>
                  )}
                </div>

                <h1
                  className="
                    mt-[7px]
                    text-[27px]
                    font-semibold
                    leading-[1.2]
                    tracking-[-0.4px]
                    text-white

                    max-md:text-[23px]
                  "
                >
                  {project.project_name}
                </h1>

                <div
                  className="
                    mt-[9px]
                    flex
                    flex-wrap
                    items-center
                    gap-x-[18px]
                    gap-y-[7px]
                  "
                >
                  <span className="inline-flex items-center gap-[6px] text-[12px] font-medium text-[#C5D7E3]">
                    <MapPin size={14} strokeWidth={1.8} />
                    {project.district || "District unavailable"}
                  </span>

                  <span className="inline-flex items-center gap-[6px] text-[12px] font-medium text-[#C5D7E3]">
                    <Building2 size={14} strokeWidth={1.8} />
                    {project.ida || "Implementing agency unavailable"}
                  </span>
                </div>
              </div>

              <div className="shrink-0 max-md:w-full">
                <span className="block text-right text-[11px] font-medium uppercase tracking-[0.6px] text-[#9DB9CC] max-md:text-left">
                  Sanctioned Amount
                </span>

                <strong className="mt-[3px] block text-right text-[20px] font-semibold text-white max-md:text-left">
                  {formatCurrency(project.sanctioned_amount)}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {/* Main Project Content */}
        <div
          className="
            mt-[12px]
            grid
            grid-cols-[minmax(300px,0.82fr)_minmax(0,1.7fr)]
            gap-[12px]

            max-lg:grid-cols-1
          "
        >
          {/* Left: Project Details */}
          <section
            className="
              rounded-[12px]
              border border-[#E3EAF0]
              bg-white
              shadow-[0_4px_14px_rgba(18,52,77,0.05)]
            "
          >
            <div className="border-b border-[#EDF1F4] px-[18px] py-[12px]">
              <div className="flex items-center gap-[9px]">
                <div
                  className="
                    flex
                    h-[30px]
                    w-[30px]
                    items-center
                    justify-center
                    rounded-[8px]
                    bg-[#EAF2F8]
                    text-[#245F88]
                  "
                >
                  <FileText size={16} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 className="text-[17px] font-semibold text-[#153A58]">
                    Project Details
                  </h2>

                  <p className="mt-[1px] text-[11px] text-[#8B9AA5]">
                    Sanction and implementation information
                  </p>
                </div>
              </div>
            </div>

            <div className="px-[18px] py-[4px]">
              <DetailRow
                label="District"
                value={project.district || "—"}
              />

              <DetailRow
                label="Village"
                value={project.village || "—"}
              />

              <DetailRow
                label="Implementing Agency"
                value={project.ida || "—"}
              />

              <DetailRow
                label="Sanctioned Amount"
                value={formatCurrency(project.sanctioned_amount)}
              />

              <DetailRow
                label="Estimated Cost"
                value={formatCurrency(project.estimated_cost)}
              />

              <DetailRow
                label="Work Started"
                value={formatDate(project.work_start_date)}
              />

              <DetailRow
                label="Expected Completion"
                value={formatDate(project.expected_completion_date)}
              />

              <DetailRow
                label="Current Status"
                value={formatStatus(project.current_status)}
              />
            </div>
          </section>

          {/* Right Column */}
          <div className="min-w-0 space-y-[12px]">
            {/* Description / Latest Update */}
            <section
              className="
                rounded-[12px]
                border border-[#E3EAF0]
                bg-white
                shadow-[0_4px_14px_rgba(18,52,77,0.05)]
              "
            >
              <div className="border-b border-[#EDF1F4] px-[20px] py-[12px]">
                <h2 className="text-[17px] font-semibold text-[#153A58]">
                  Project Description
                </h2>

                <p className="mt-[5px] text-[13px] leading-[1.5] text-[#5F7482]">
                  {projectUpdate?.description ||
                    "No project description is currently available."}
                </p>
              </div>

              <div className="px-[20px] py-[12px]">
                <div
                  className="
                    rounded-[10px]
                    border border-[#DCEBE4]
                    bg-[#F4FAF7]
                    px-[14px]
                    py-[11px]
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-[12px]

                      max-sm:flex-col
                    "
                  >
                    <div>
                      <span className="text-[12px] font-semibold text-[#3B7658]">
                        Latest Update
                      </span>

                      <p className="mt-[3px] text-[11px] font-medium text-[#779084]">
                        {formatDate(projectUpdate?.update_date)}
                      </p>
                    </div>

                    {projectUpdate?.status && (
                      <span
                        className={`
                          rounded-full
                          px-[10px]
                          py-[4px]
                          text-[10px]
                          font-semibold
                          ${getStatusStyle(projectUpdate.status)}
                        `}
                      >
                        {formatStatus(projectUpdate.status)}
                      </span>
                    )}
                  </div>

                  <p className="mt-[7px] text-[13px] leading-[1.5] text-[#4E695B]">
                    {projectUpdate?.description ||
                      "No progress update is currently available."}
                  </p>
                </div>

                {/* Monitoring Figures */}
                <div
                  className="
                    mt-[10px]
                    grid
                    grid-cols-3
                    divide-x
                    divide-[#E8EDF1]

                    max-sm:grid-cols-1
                    max-sm:divide-x-0
                    max-sm:divide-y
                  "
                >
                  <div className="pr-[16px] max-sm:pb-[10px] max-sm:pr-0">
                    <span className="block text-[11px] font-medium text-[#8797A3]">
                      Progress
                    </span>

                    <strong className="mt-[3px] block text-[16px] font-semibold text-[#244C68]">
                      {projectUpdate?.progress_percentage !== undefined &&
                      projectUpdate?.progress_percentage !== null
                        ? `${projectUpdate.progress_percentage}%`
                        : "—"}
                    </strong>
                  </div>

                  <div className="px-[16px] max-sm:px-0 max-sm:py-[10px]">
                    <span className="block text-[11px] font-medium text-[#8797A3]">
                      Expenditure
                    </span>

                    <strong className="mt-[3px] block text-[16px] font-semibold text-[#244C68]">
                      {formatCurrency(projectUpdate?.expenditure)}
                    </strong>
                  </div>

                  <div className="pl-[16px] max-sm:pl-0 max-sm:pt-[10px]">
                    <span className="block text-[11px] font-medium text-[#8797A3]">
                      Amount Paid
                    </span>

                    <strong className="mt-[3px] block text-[16px] font-semibold text-[#244C68]">
                      {formatCurrency(projectUpdate?.amount_paid)}
                    </strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Evidence */}
            <section
              className="
                rounded-[12px]
                border border-[#E3EAF0]
                bg-white
                shadow-[0_4px_14px_rgba(18,52,77,0.05)]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-[12px]
                  border-b border-[#EDF1F4]
                  px-[18px]
                  py-[11px]
                "
              >
                <div>
                  <h2 className="text-[17px] font-semibold text-[#153A58]">
                    Evidence Images
                  </h2>

                  <p className="mt-[1px] text-[11px] text-[#8B9AA5]">
                    Latest photographic evidence submitted for this project
                  </p>
                </div>

                <span className="text-[12px] font-semibold text-[#2C6D98]">
                  {projectUpdate?.photographs?.length || 0} Images
                </span>
              </div>

              <div className="p-[12px]">
                {projectUpdate?.photographs?.length > 0 ? (
                  <div
                    className="
                      grid
                      grid-cols-4
                      gap-[9px]

                      max-xl:grid-cols-3
                      max-sm:grid-cols-2
                    "
                  >
                    {projectUpdate.photographs.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="
                          aspect-[16/9]
                          overflow-hidden
                          rounded-[9px]
                          border border-[#E2E9EE]
                          bg-[#F3F6F8]
                        "
                      >
                        <img
                          src={image}
                          alt={`Project evidence ${index + 1}`}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-200
                            hover:scale-[1.03]
                          "
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      min-h-[100px]
                      items-center
                      justify-center
                      rounded-[9px]
                      border
                      border-dashed
                      border-[#DCE5EB]
                      bg-[#FAFBFC]
                      text-center
                    "
                  >
                    <div>
                      <CalendarDays
                        size={24}
                        strokeWidth={1.6}
                        className="mx-auto text-[#9AAAB5]"
                      />

                      <p className="mt-[7px] text-[12px] font-medium text-[#8495A1]">
                        No evidence images available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MPLayout>
  );
};

export default MPProjectDetail;