import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  CalendarDays,
  Building2,
} from "lucide-react";

import DALayout from "../../components/da/DALayout";

/*
 * Temporary analysis data for the prototype.
 *
 * Later this should come from:
 * GET /api/da/projects/:projectId/analysis
 *
 * Important:
 * AI findings should explain observed deviations.
 * They should NOT declare fraud as proven.
 */
const ANALYSIS_DATA = {
  "MPLADS-1024": {
    project_id: "MPLADS-1024",
    project_name: "Community Hall Construction",
    implementing_agency: "Public Works Department",

    priority: "Priority Alert",
    detected_on: "15 Sep 2026",
    anomaly_type: "Progress–Expenditure Mismatch",

    sanctioned_amount: 5000000,
    expenditure_amount: 3900000,

    fund_utilization: 78,
    physical_progress: 42,

    summary:
      "Financial utilization is significantly ahead of the recorded physical progress of the project.",

    explanation:
      "The project has utilized 78% of the sanctioned amount while reported physical progress is 42%. The 36 percentage-point difference indicates that expenditure is advancing substantially faster than recorded execution progress.",

    metrics: [
      {
        label: "Fund Utilization",
        value: "78%",
        context: "₹39.00 lakh spent out of ₹50.00 lakh sanctioned",
      },
      {
        label: "Physical Progress",
        value: "42%",
        context: "Latest recorded project progress",
      },
      {
        label: "Progress Difference",
        value: "36 percentage points",
        context: "Fund utilization minus physical progress",
      },
    ],
  },

  "MPLADS-1031": {
    project_id: "MPLADS-1031",
    project_name: "Rural Road Improvement",
    implementing_agency: "Rural Development Department",

    priority: "Priority Alert",
    detected_on: "14 Sep 2026",
    anomaly_type: "Project Delay",

    sanctioned_amount: 8200000,
    expenditure_amount: 4100000,

    fund_utilization: 50,
    physical_progress: 46,

    summary:
      "Project execution is considerably behind the expected progress for the current stage of the schedule.",

    explanation:
      "The project timeline indicates that execution progress is behind the planned position. Continued delay may increase the probability of missing the expected completion timeline.",

    metrics: [
      {
        label: "Physical Progress",
        value: "46%",
        context: "Latest recorded progress",
      },
      {
        label: "Planned Progress",
        value: "74%",
        context: "Expected progress at the current project stage",
      },
      {
        label: "Schedule Gap",
        value: "28 percentage points",
        context: "Difference between planned and recorded progress",
      },
    ],
  },

  "MPLADS-1018": {
    project_id: "MPLADS-1018",
    project_name: "Drinking Water Facility",
    implementing_agency:
      "Public Health Engineering Department",

    priority: "Early Warning",
    detected_on: "13 Sep 2026",
    anomaly_type: "Cost Deviation",

    sanctioned_amount: 7200000,
    expenditure_amount: 6100000,

    fund_utilization: 84.7,
    physical_progress: 68,

    summary:
      "The expenditure pattern is increasing faster than the recorded execution progress.",

    explanation:
      "Approximately 84.7% of the sanctioned amount has already been utilized while physical progress stands at 68%. The difference is not currently classified as a priority alert, but the expenditure trend requires continued monitoring.",

    metrics: [
      {
        label: "Fund Utilization",
        value: "84.7%",
        context: "₹61.00 lakh spent out of ₹72.00 lakh sanctioned",
      },
      {
        label: "Physical Progress",
        value: "68%",
        context: "Latest recorded project progress",
      },
      {
        label: "Difference",
        value: "16.7 percentage points",
        context: "Financial utilization ahead of physical progress",
      },
    ],
  },

  "MPLADS-1042": {
    project_id: "MPLADS-1042",
    project_name: "School Building Extension",
    implementing_agency: "Public Works Department",

    priority: "Early Warning",
    detected_on: "12 Sep 2026",
    anomaly_type: "Schedule Deviation",

    sanctioned_amount: 6400000,
    expenditure_amount: 3050000,

    fund_utilization: 47.7,
    physical_progress: 39,

    summary:
      "Physical progress is below the expected level for the elapsed project duration.",

    explanation:
      "Recorded progress is currently 39%, compared with the expected project-stage progress of 52%. The project is therefore showing an emerging schedule deviation that should continue to be monitored.",

    metrics: [
      {
        label: "Physical Progress",
        value: "39%",
        context: "Latest recorded progress",
      },
      {
        label: "Expected Progress",
        value: "52%",
        context: "Expected progress at the current project stage",
      },
      {
        label: "Schedule Gap",
        value: "13 percentage points",
        context: "Expected progress minus recorded progress",
      },
    ],
  },
};

const DAProjectAnalysis = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const analysis = ANALYSIS_DATA[projectId];

  /*
   * Unknown project / analysis not available
   */
  if (!analysis) {
    return (
      <DALayout>
        <div className="w-full">
          <button
            type="button"
            onClick={() => navigate("/da/alerts")}
            className="
              inline-flex
              items-center
              gap-[6px]
              text-[12px]
              font-semibold
              text-[#37617A]
            "
          >
            <ArrowLeft size={15} strokeWidth={1.8} />
            Back to AI Alerts
          </button>

          <div
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
            <p className="text-[16px] font-semibold text-[#153A58]">
              Analysis not available
            </p>

            <p className="mt-[5px] text-[12px] text-[#8194A0]">
              No AI monitoring analysis is available for this project.
            </p>
          </div>
        </div>
      </DALayout>
    );
  }

  return (
    <DALayout>
      <div className="w-full">
        {/* =====================================================
            BACK
        ====================================================== */}
        <button
          type="button"
          onClick={() => navigate(-1)}
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
          Back
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
                AI Project Analysis
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
                {analysis.project_name}
              </h1>

              <p
                className="
                  mt-[5px]
                  text-[12px]
                  font-medium
                  text-[#6E8492]
                "
              >
                {analysis.project_id}
              </p>
            </div>

            <PriorityBadge priority={analysis.priority} />
          </div>

          <div
            className="
              mt-[17px]
              flex
              flex-wrap
              gap-x-[28px]
              gap-y-[10px]
              border-t
              border-[#E8EDF0]
              pt-[14px]
            "
          >
            <MetaItem
              icon={Building2}
              label="Implementing Agency"
              value={analysis.implementing_agency}
            />

            <MetaItem
              icon={CalendarDays}
              label="Detected On"
              value={analysis.detected_on}
            />
          </div>
        </section>

        {/* =====================================================
            DETECTED ISSUE
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
            <div className="flex items-center gap-[9px]">
              <AlertTriangle
                size={17}
                strokeWidth={1.8}
                className={
                  analysis.priority === "Priority Alert"
                    ? "text-[#B94D45]"
                    : "text-[#A5721D]"
                }
              />

              <h2
                className="
                  text-[18px]
                  font-semibold
                  text-[#153A58]
                "
              >
                {analysis.anomaly_type}
              </h2>
            </div>
          </div>

          <div
            className="
              px-[20px]
              py-[16px]

              max-sm:px-[16px]
            "
          >
            <p
              className="
                text-[14px]
                font-semibold
                leading-[1.55]
                text-[#355B72]
              "
            >
              {analysis.summary}
            </p>

            <p
              className="
                mt-[8px]
                max-w-[920px]
                text-[12px]
                leading-[1.7]
                text-[#687E8C]
              "
            >
              {analysis.explanation}
            </p>
          </div>
        </section>

        {/* =====================================================
            OBSERVED VALUES
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
            <h2 className="text-[18px] font-semibold text-[#153A58]">
              Observed Values
            </h2>

            <p className="mt-[2px] text-[11px] text-[#8295A1]">
              Project values used to explain the detected deviation
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-3
              divide-x
              divide-[#E8EDF0]

              max-md:grid-cols-1
              max-md:divide-x-0
              max-md:divide-y
            "
          >
            {analysis.metrics.map((metric) => (
              <MetricItem
                key={metric.label}
                label={metric.label}
                value={metric.value}
                context={metric.context}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            PROJECT FINANCIAL POSITION
        ====================================================== */}
        <section
          className="
            mt-[14px]
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            px-[20px]
            py-[17px]
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]

            max-sm:px-[16px]
          "
        >
          <h2 className="text-[18px] font-semibold text-[#153A58]">
            Financial & Progress Position
          </h2>

          <div
            className="
              mt-[15px]
              grid
              grid-cols-4
              gap-[24px]

              max-lg:grid-cols-2
              max-sm:grid-cols-1
            "
          >
            <ValueItem
              label="Sanctioned Amount"
              value={formatCurrency(
                analysis.sanctioned_amount
              )}
            />

            <ValueItem
              label="Expenditure"
              value={formatCurrency(
                analysis.expenditure_amount
              )}
            />

            <ValueItem
              label="Fund Utilization"
              value={`${analysis.fund_utilization}%`}
            />

            <ValueItem
              label="Physical Progress"
              value={`${analysis.physical_progress}%`}
            />
          </div>
        </section>

        {/* =====================================================
            MONITORING NOTE
        ====================================================== */}
        <section
          className="
            mt-[14px]
            rounded-[10px]
            border
            border-[#DDE6EB]
            bg-[#F8FAFB]
            px-[17px]
            py-[13px]
          "
        >
          <p
            className="
              text-[11px]
              leading-[1.65]
              text-[#647B89]
            "
          >
            <span className="font-semibold text-[#385C73]">
              Monitoring note:
            </span>{" "}
            This AI-generated flag indicates an unusual pattern or
            deviation that may require administrative review. It does
            not by itself establish fraud, misuse of funds, or
            non-compliance.
          </p>
        </section>
      </div>
    </DALayout>
  );
};

/* ============================================================
   PRIORITY BADGE
============================================================ */
const PriorityBadge = ({ priority }) => {
  const styles = {
    "Priority Alert":
      "bg-[#FCE8E6] text-[#B94D45]",

    "Early Warning":
      "bg-[#FFF2DD] text-[#98691F]",
  };

  return (
    <span
      className={`
        inline-flex
        shrink-0
        whitespace-nowrap
        rounded-full
        px-[10px]
        py-[6px]
        text-[10px]
        font-semibold

        ${
          styles[priority] ||
          "bg-[#EEF1F3] text-[#667984]"
        }
      `}
    >
      {priority}
    </span>
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
   METRIC
============================================================ */
const MetricItem = ({
  label,
  value,
  context,
}) => {
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
          tracking-[0.5px]
          text-[#8799A4]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[5px]
          text-[23px]
          font-semibold
          text-[#153A58]
        "
      >
        {value}
      </p>

      <p
        className="
          mt-[4px]
          text-[10px]
          leading-[1.5]
          text-[#8395A0]
        "
      >
        {context}
      </p>
    </div>
  );
};

/* ============================================================
   VALUE ITEM
============================================================ */
const ValueItem = ({ label, value }) => {
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

      <p
        className="
          mt-[4px]
          text-[17px]
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
   HELPERS
============================================================ */
const formatCurrency = (amount) => {
  if (
    amount === undefined ||
    amount === null ||
    Number.isNaN(Number(amount))
  ) {
    return "—";
  }

  return `₹${Number(amount).toLocaleString(
    "en-IN"
  )}`;
};

export default DAProjectAnalysis;