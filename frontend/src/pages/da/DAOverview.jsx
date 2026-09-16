import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DALayout from "../../components/da/DALayout";

const DAOverview = () => {
  const navigate = useNavigate();

  return (
    <DALayout>
      <div className="w-full">
        {/* =====================================================
            HERO
        ====================================================== */}
        <section
          className="
            relative
            min-h-[195px]
            overflow-hidden
            rounded-[14px]
            bg-[#07345C]
            shadow-[0_5px_16px_rgba(18,52,77,0.07)]

            max-md:min-h-[180px]
            max-sm:min-h-[195px]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(10, 27, 38, 0.78) 0%,
                rgba(10, 27, 38, 0.64) 25%,
                rgba(10, 27, 38, 0.40) 43%,
                rgba(10, 27, 38, 0.14) 62%,
                rgba(10, 27, 38, 0.00) 78%
              ),
              url('/images/DAhero.png')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="
              relative
              z-10
              flex
              min-h-[195px]
              items-center
              px-[28px]
              py-[22px]

              max-md:min-h-[180px]
              max-md:px-[20px]

              max-sm:min-h-[195px]
              max-sm:px-[16px]
            "
          >
            <div className="max-w-[650px]">
              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[1.5px]
                  text-[#D9E4EA]

                  max-sm:text-[10px]
                "
              >
                District Monitoring Overview
              </p>

              <h1
                className="
                  mt-[6px]
                  text-[31px]
                  font-semibold
                  leading-[1.12]
                  tracking-[-0.5px]
                  text-white

                  max-md:text-[27px]
                  max-sm:text-[23px]
                "
              >
                Welcome, Rajesh Sharma
              </h1>

              <p
                className="
                  mt-[9px]
                  max-w-[600px]
                  text-[13px]
                  leading-[1.6]
                  text-white/90

                  max-md:max-w-[510px]
                  max-md:text-[12px]

                  max-sm:max-w-[95%]
                  max-sm:text-[11px]
                "
              >
                Monitor MPLADS works across the district, track fund
                utilization, review project progress, and identify projects
                requiring attention through AI-powered insights.
              </p>

              <div
                className="
                  mt-[14px]
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-white/25
                  bg-black/10
                  px-[11px]
                  py-[5px]
                  text-[10px]
                  font-medium
                  text-white/90

                  max-sm:text-[9px]
                "
              >
                District Authority
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            DISTRICT MONITORING STATUS
        ====================================================== */}
        <section
          className="
            mt-[14px]
            rounded-[12px]
            border
            border-[#E1E8ED]
            bg-white
            px-[18px]
            py-[14px]
            shadow-[0_3px_12px_rgba(18,52,77,0.035)]

            max-sm:px-[14px]
          "
        >
          <div
            className="
              grid
              grid-cols-[repeat(4,minmax(0,1fr))_minmax(180px,0.9fr)]
              items-center
              divide-x
              divide-[#E3E9ED]

              max-lg:grid-cols-3
              max-lg:gap-y-[15px]
              max-lg:divide-x-0

              max-md:grid-cols-2

              max-sm:grid-cols-1
              max-sm:gap-y-[12px]
            "
          >
            <StatusItem
              label="Total Projects"
              value="12"
              valueClass="text-[#123F5D]"
            />

            <StatusItem
              label="Completed"
              value="8"
              valueClass="text-[#15803D]"
            />

            <StatusItem
              label="Ongoing"
              value="3"
              valueClass="text-[#0369A1]"
            />

            <StatusItem
              label="Delayed"
              value="1"
              valueClass="text-[#D97706]"
            />

            <div
              className="
                flex
                items-center
                gap-[11px]
                px-[18px]

                max-lg:px-0
              "
            >
              <div
                className="
                  flex
                  h-[42px]
                  w-[42px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[11px]
                  bg-[#FCE7E5]
                  text-[#C25249]
                "
              >
                <AlertTriangle size={18} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[16px] font-semibold text-[#C2413A]">
                  2 AI Flagged
                </p>

                <p className="mt-[2px] text-[10px] text-[#8B9BA6]">
                  Require priority review
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT GRID
        ====================================================== */}
        <section
          className="
            mt-[14px]
            grid
            grid-cols-[minmax(0,1.55fr)_minmax(340px,0.9fr)]
            gap-[14px]

            max-lg:grid-cols-1
          "
        >
          {/* ===================================================
              DISTRICT MONITORING SUMMARY
          ==================================================== */}
          <div
            className="
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
                py-[15px]

                max-sm:px-[16px]
              "
            >
              <h2 className="text-[19px] font-semibold text-[#103C5C]">
                District Monitoring Summary
              </h2>

              <p className="mt-[2px] text-[11px] text-[#8295A1]">
                Financial and physical progress of MPLADS works in the district
              </p>
            </div>

            <div
              className="
                px-[20px]
                py-[17px]

                max-sm:px-[16px]
              "
            >
              {/* Financial Summary */}
              <div
                className="
                  grid
                  grid-cols-3
                  gap-x-[30px]
                  gap-y-[18px]

                  max-md:grid-cols-2
                  max-sm:grid-cols-1
                "
              >
                <div>
                  <p className="text-[11px] font-medium text-[#758B98]">
                    Total Sanctioned
                  </p>

                  <p
                    className="
                      mt-[4px]
                      text-[24px]
                      font-medium
                      leading-none
                      tracking-[-0.5px]
                      text-[#103C5C]
                    "
                  >
                    ₹28.50 Cr
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-[#758B98]">
                    Total Expenditure
                  </p>

                  <p
                    className="
                      mt-[4px]
                      text-[24px]
                      font-medium
                      leading-none
                      tracking-[-0.5px]
                      text-[#103C5C]
                    "
                  >
                    ₹19.85 Cr
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-[#758B98]">
                    Fund Utilization
                  </p>

                  <p
                    className="
                      mt-[4px]
                      text-[24px]
                      font-medium
                      leading-none
                      tracking-[-0.5px]
                      text-[#103C5C]
                    "
                  >
                    69.6%
                  </p>
                </div>
              </div>

              <div className="my-[18px] h-px bg-[#E5EBEF]" />

              {/* Physical Progress */}
              <div>
                <div className="flex items-end justify-between gap-[16px]">
                  <div>
                    <p className="text-[11px] font-medium text-[#758B98]">
                      Overall Physical Progress
                    </p>

                    <p className="mt-[3px] text-[24px] font-medium text-[#103C5C]">
                      72%
                    </p>
                  </div>

                  <p className="pb-[3px] text-[10px] text-[#7D909C]">
                    Across district MPLADS works
                  </p>
                </div>

                <div
                  className="
                    mt-[8px]
                    h-[8px]
                    overflow-hidden
                    rounded-full
                    bg-[#E4EBEF]
                  "
                >
                  <div
                    className="
                      h-full
                      w-[72%]
                      rounded-full
                      bg-[#2F82AD]
                    "
                  />
                </div>
              </div>

              <div
                className="
                  mt-[17px]
                  flex
                  items-center
                  justify-between
                  gap-[16px]
                  border-t
                  border-[#E5EBEF]
                  pt-[13px]

                  max-sm:flex-col
                  max-sm:items-start
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.5px]
                      text-[#8799A4]
                    "
                  >
                    Last Data Update
                  </p>

                  <p className="mt-[3px] text-[12px] font-semibold text-[#315C77]">
                    12 Sep 2026
                  </p>
                </div>

                <p className="text-[10px] text-[#8C9AA4]">
                  Latest project and expenditure data available
                </p>
              </div>
            </div>
          </div>

          {/* ===================================================
              MONITORING SHORTCUTS
          ==================================================== */}
          <div
            className="
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
                py-[15px]
              "
            >
              <h2 className="text-[19px] font-semibold text-[#103C5C]">
                Monitoring Shortcuts
              </h2>

              <p className="mt-[2px] text-[11px] text-[#8295A1]">
                Review projects, AI findings, and analytical reports
              </p>
            </div>

            <div className="px-[14px] py-[7px]">
              <QuickAction
                icon={ClipboardList}
                title="Project Monitoring"
                description="Review all MPLADS works in the district"
                onClick={() => navigate("/da/projects")}
              />

              <QuickAction
                icon={AlertTriangle}
                title="AI Alerts"
                description="Review anomalies and projects requiring attention"
                onClick={() => navigate("/da/alerts")}
              />

              <QuickAction
                icon={BarChart3}
                title="Analytics & Reports"
                description="Analyse expenditure, progress, trends, and reports"
                onClick={() => navigate("/da/reports")}
                last
              />
            </div>
          </div>
        </section>
      </div>
    </DALayout>
  );
};

/* ============================================================
   STATUS ITEM
============================================================ */
const StatusItem = ({
  label,
  value,
  valueClass,
}) => {
  return (
    <div
      className="
        px-[18px]
        first:pl-[4px]

        max-lg:px-0
      "
    >
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.7px]
          text-[#8194A0]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-[4px]
          text-[24px]
          font-semibold
          leading-none
          ${valueClass}
        `}
      >
        {value}
      </p>
    </div>
  );
};

/* ============================================================
   QUICK ACTION
============================================================ */
const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
  last = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        gap-[12px]
        px-[7px]
        py-[11px]
        text-left
        transition-colors
        duration-150

        hover:bg-[#F7FAFC]

        ${last ? "" : "border-b border-[#E8EDF0]"}
      `}
    >
      <div
        className="
          flex
          h-[38px]
          w-[38px]
          shrink-0
          items-center
          justify-center
          rounded-[9px]
          bg-[#EAF3F8]
          text-[#26719B]
        "
      >
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-[#153E59]">
          {title}
        </p>

        <p className="mt-[2px] truncate text-[10px] text-[#8294A0]">
          {description}
        </p>
      </div>

      <ArrowRight
        size={15}
        strokeWidth={1.8}
        className="
          shrink-0
          text-[#8DA0AC]
          transition-all
          duration-150

          group-hover:translate-x-[2px]
          group-hover:text-[#26719B]
        "
      />
    </button>
  );
};

export default DAOverview;