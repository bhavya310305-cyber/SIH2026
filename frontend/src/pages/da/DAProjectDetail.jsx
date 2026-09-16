import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";

import DALayout from "../../components/da/DALayout";
import projectsMockData from "../../data/projectsMockData";

const DAProjectDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  /*
   * Find selected project from mock data.
   * Later this can be replaced with API data.
   */
  const project = projectsMockData.find(
    (item) =>
      String(item.project_id) === String(projectId)
  );

  /*
   * PROJECT NOT FOUND
   */
  if (!project) {
    return (
      <DALayout>
        <div className="w-full">
          <button
            type="button"
            onClick={() => navigate("/da/projects")}
            className="
              inline-flex
              items-center
              gap-[6px]
              text-[12px]
              font-semibold
              text-[#4D7187]
            "
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to Project Monitoring
          </button>

          <section
            className="
              mt-[18px]
              rounded-[12px]
              border
              border-[#E1E8ED]
              bg-white
              px-[20px]
              py-[55px]
              text-center
            "
          >
            <h1
              className="
                text-[17px]
                font-semibold
                text-[#153A58]
              "
            >
              Project not found
            </h1>

            <p
              className="
                mt-[5px]
                text-[12px]
                text-[#8194A0]
              "
            >
              The selected project is not available in the current
              monitoring data.
            </p>
          </section>
        </div>
      </DALayout>
    );
  }

  /*
   * Handle different field names in mock data.
   */
  const implementingAgency =
    project.implementing_agency ||
    project.ida ||
    "—";

  const expenditure =
    project.expenditure_amount ??
    project.total_expenditure ??
    project.expenditure ??
    null;

  /*
   * Calculate fund utilization if both values are available.
   */
  const sanctionedAmount = Number(
    project.sanctioned_amount
  );

  const expenditureAmount = Number(expenditure);

  const fundUtilization =
    !Number.isNaN(sanctionedAmount) &&
    sanctionedAmount > 0 &&
    !Number.isNaN(expenditureAmount)
      ? (
          (expenditureAmount / sanctionedAmount) *
          100
        ).toFixed(1)
      : null;

  return (
    <DALayout>
      <div className="w-full">
        {/* =====================================================
            BACK
        ====================================================== */}
        <button
          type="button"
          onClick={() => navigate("/da/projects")}
          className="
            mb-[14px]
            inline-flex
            items-center
            gap-[6px]
            text-[12px]
            font-semibold
            text-[#4D7187]
            transition-colors

            hover:text-[#153A58]
          "
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Back to Project Monitoring
        </button>

        {/* =====================================================
            PROJECT HEADER
        ====================================================== */}
        <section
          className="
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            px-[20px]
            py-[18px]
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]

            max-sm:px-[16px]
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-[20px]

              max-md:flex-col
            "
          >
            <div>
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.6px]
                  text-[#80929E]
                "
              >
                Project Monitoring
              </p>

              <h1
                className="
                  mt-[5px]
                  text-[25px]
                  font-semibold
                  leading-[1.25]
                  tracking-[-0.3px]
                  text-[#153A58]

                  max-sm:text-[22px]
                "
              >
                {project.project_name}
              </h1>

              <p
                className="
                  mt-[5px]
                  text-[12px]
                  font-medium
                  text-[#6E8492]
                "
              >
                {project.project_id}
              </p>
            </div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-[7px]
              "
            >
              <StatusBadge
                status={project.current_status}
              />

              <RiskBadge
                risk={project.risk_level}
              />
            </div>
          </div>

          <div
            className="
              mt-[17px]
              flex
              flex-wrap
              gap-x-[30px]
              gap-y-[12px]
              border-t
              border-[#E8EDF0]
              pt-[14px]
            "
          >
            <MetaItem
              icon={Building2}
              label="Implementing Agency"
              value={implementingAgency}
            />

            <MetaItem
              icon={MapPin}
              label="District"
              value={project.district || "—"}
            />
          </div>
        </section>

        {/* =====================================================
            MONITORING SUMMARY
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
              border-[#E9EEF1]
              px-[20px]
              py-[14px]

              max-sm:px-[16px]
            "
          >
            <h2
              className="
                text-[18px]
                font-semibold
                text-[#153A58]
              "
            >
              Monitoring Summary
            </h2>

            <p
              className="
                mt-[2px]
                text-[11px]
                text-[#8295A1]
              "
            >
              Latest financial and physical position
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-4
              divide-x
              divide-[#E8EDF0]

              max-lg:grid-cols-2
              max-lg:divide-x-0

              max-sm:grid-cols-1
              max-sm:divide-y
            "
          >
            <ValueItem
              label="Sanctioned Amount"
              value={formatCurrency(
                project.sanctioned_amount
              )}
            />

            <ValueItem
              label="Expenditure"
              value={formatCurrency(expenditure)}
            />

            <ValueItem
              label="Fund Utilization"
              value={
                fundUtilization !== null
                  ? `${fundUtilization}%`
                  : "—"
              }
            />

            <ValueItem
              label="Physical Progress"
              value={
                project.progress_percentage !==
                  undefined &&
                project.progress_percentage !== null
                  ? `${project.progress_percentage}%`
                  : "—"
              }
            />
          </div>
        </section>

        {/* =====================================================
            PROJECT INFORMATION
        ====================================================== */}
        <section
          className="
            mt-[14px]
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
              border-[#E9EEF1]
              px-[20px]
              py-[14px]

              max-sm:px-[16px]
            "
          >
            <h2
              className="
                text-[18px]
                font-semibold
                text-[#153A58]
              "
            >
              Project Information
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-3
              gap-x-[30px]
              gap-y-[20px]
              px-[20px]
              py-[18px]

              max-lg:grid-cols-2
              max-sm:grid-cols-1
              max-sm:px-[16px]
            "
          >
            <DetailItem
              label="Project Status"
              value={formatStatus(
                project.current_status
              )}
            />

            <DetailItem
              label="Risk Level"
              value={
                project.risk_level
                  ? formatStatus(
                      project.risk_level
                    )
                  : "—"
              }
            />

            <DetailItem
              label="Work Start Date"
              value={formatDate(
                project.work_start_date
              )}
              icon={CalendarDays}
            />

            <DetailItem
              label="Assigned Date"
              value={formatDate(
                project.assigned_at
              )}
              icon={CalendarDays}
            />

            <DetailItem
              label="Created Date"
              value={formatDate(
                project.created_at
              )}
              icon={CalendarDays}
            />
          </div>
        </section>
      </div>
    </DALayout>
  );
};

/* ============================================================
   META ITEM
============================================================ */
const MetaItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-[8px]">
      <div
        className="
          flex
          h-[30px]
          w-[30px]
          items-center
          justify-center
          rounded-[7px]
          bg-[#EDF4F8]
          text-[#4D7187]
        "
      >
        <Icon size={14} strokeWidth={1.8} />
      </div>

      <div>
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.4px]
            text-[#8A9AA4]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[1px]
            text-[11px]
            font-semibold
            text-[#46677A]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   VALUE ITEM
============================================================ */
const ValueItem = ({ label, value }) => {
  return (
    <div
      className="
        px-[20px]
        py-[18px]

        max-sm:px-[16px]
      "
    >
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.45px]
          text-[#8799A4]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[5px]
          text-[20px]
          font-semibold
          text-[#315C77]
        "
      >
        {value}
      </p>
    </div>
  );
};

/* ============================================================
   DETAIL ITEM
============================================================ */
const DetailItem = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div>
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.45px]
          text-[#8799A4]
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[5px]
          flex
          items-center
          gap-[6px]
        "
      >
        {Icon && (
          <Icon
            size={13}
            strokeWidth={1.8}
            className="text-[#7790A0]"
          />
        )}

        <p
          className="
            text-[12px]
            font-semibold
            text-[#46677A]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   STATUS BADGE
============================================================ */
const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED:
      "bg-[#E7F4EC] text-[#34734F]",

    ONGOING:
      "bg-[#E7F2F8] text-[#2B6F98]",

    IN_PROGRESS:
      "bg-[#E7F2F8] text-[#2B6F98]",

    ON_HOLD:
      "bg-[#FFF2DD] text-[#99691F]",

    DELAYED:
      "bg-[#FCE8E6] text-[#B94D45]",

    NOT_STARTED:
      "bg-[#EEF1F3] text-[#667984]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-[10px]
        py-[6px]
        text-[10px]
        font-semibold

        ${
          styles[status] ||
          "bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {formatStatus(status)}
    </span>
  );
};

/* ============================================================
   RISK BADGE
============================================================ */
const RiskBadge = ({ risk }) => {
  if (!risk) {
    return null;
  }

  const normalizedRisk = risk
    .toString()
    .toLowerCase();

  const styles = {
    high:
      "bg-[#FCE8E6] text-[#B94D45]",

    medium:
      "bg-[#FFF2DD] text-[#98691F]",

    low:
      "bg-[#E9F4ED] text-[#42765A]",
  };

  return (
    <span
      className={`
        inline-flex
        whitespace-nowrap
        rounded-full
        px-[10px]
        py-[6px]
        text-[10px]
        font-semibold

        ${
          styles[normalizedRisk] ||
          "bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {formatStatus(risk)} Risk
    </span>
  );
};

/* ============================================================
   HELPERS
============================================================ */
const formatStatus = (status) => {
  if (!status) {
    return "—";
  }

  return status
    .toString()
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) => letter.toUpperCase()
    );
};

const formatCurrency = (amount) => {
  if (
    amount === undefined ||
    amount === null ||
    amount === "" ||
    Number.isNaN(Number(amount))
  ) {
    return "—";
  }

  return `₹${Number(amount).toLocaleString(
    "en-IN"
  )}`;
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default DAProjectDetail;