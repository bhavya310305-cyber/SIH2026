import {
  ArrowRight,
  Download,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DALayout from "../../components/da/DALayout";

import {
  reportsData,
  downloadReportPdf,
} from "../../data/daReportsData";

const DAReports = () => {
  const navigate = useNavigate();

  /*
   * Prototype monitoring data.
   * Later this will come from the DA analytics API.
   */
  const projectStatus = {
    completed: 8,
    ongoing: 3,
    delayed: 1,
  };

  const progress = {
    financial: 69.6,
    physical: 72,
  };

  const reports = reportsData;

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
            Analytics & Reports
          </h1>

          <p
            className="
              mt-[5px]
              text-[13px]
              leading-[1.5]
              text-[#718794]
            "
          >
            District-level MPLADS monitoring trends and
            system-generated analytical reports.
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
            label="Fund Utilization"
            value="69.6%"
            description="₹19.85 Cr utilized from ₹28.50 Cr sanctioned"
          />

          <SummaryCard
            label="Delayed Projects"
            value="1"
            description="Out of 12 projects currently monitored"
            valueClass="text-[#A5721D]"
          />
        </section>

        {/* =====================================================
            ANALYTICS
        ====================================================== */}
        <section
          className="
            mt-[14px]
            grid
            grid-cols-2
            gap-[14px]

            max-lg:grid-cols-1
          "
        >
          {/* PROJECT STATUS */}
          <div
            className="
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
              "
            >
              <h2
                className="
                  text-[17px]
                  font-semibold
                  text-[#153A58]
                "
              >
                Project Status
              </h2>

              <p
                className="
                  mt-[2px]
                  text-[11px]
                  text-[#8295A1]
                "
              >
                Current status of district MPLADS works
              </p>
            </div>

            <div className="px-[20px] py-[20px]">
              {/* Status Distribution */}
              <div
                className="
                  flex
                  h-[12px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-[#EEF2F4]
                "
              >
                <div
                  className="h-full bg-[#4C9A70]"
                  style={{
                    width: `${
                      (projectStatus.completed / 12) *
                      100
                    }%`,
                  }}
                />

                <div
                  className="h-full bg-[#4D8EBA]"
                  style={{
                    width: `${
                      (projectStatus.ongoing / 12) *
                      100
                    }%`,
                  }}
                />

                <div
                  className="h-full bg-[#C68A36]"
                  style={{
                    width: `${
                      (projectStatus.delayed / 12) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div
                className="
                  mt-[20px]
                  grid
                  grid-cols-3
                  gap-[12px]
                "
              >
                <StatusValue
                  label="Completed"
                  value={projectStatus.completed}
                  dotClass="bg-[#4C9A70]"
                />

                <StatusValue
                  label="Ongoing"
                  value={projectStatus.ongoing}
                  dotClass="bg-[#4D8EBA]"
                />

                <StatusValue
                  label="Delayed"
                  value={projectStatus.delayed}
                  dotClass="bg-[#C68A36]"
                />
              </div>
            </div>
          </div>

          {/* FINANCIAL VS PHYSICAL */}
          <div
            className="
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
              "
            >
              <h2
                className="
                  text-[17px]
                  font-semibold
                  text-[#153A58]
                "
              >
                Financial vs Physical Progress
              </h2>

              <p
                className="
                  mt-[2px]
                  text-[11px]
                  text-[#8295A1]
                "
              >
                Overall district progress comparison
              </p>
            </div>

            <div className="px-[20px] py-[20px]">
              <ProgressRow
                label="Fund Utilization"
                value={progress.financial}
              />

              <div className="mt-[19px]">
                <ProgressRow
                  label="Physical Progress"
                  value={progress.physical}
                />
              </div>

              <p
                className="
                  mt-[18px]
                  border-t
                  border-[#E9EEF1]
                  pt-[12px]
                  text-[10px]
                  leading-[1.5]
                  text-[#84949E]
                "
              >
                District-level comparison based on the
                latest available project and expenditure
                data.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            GENERATED REPORTS
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
                text-[18px]
                font-semibold
                text-[#153A58]
              "
            >
              Generated Reports
            </h2>

            <p
              className="
                mt-[2px]
                text-[11px]
                text-[#8295A1]
              "
            >
              Automatically generated district monitoring
              reports
            </p>
          </div>

          <div className="overflow-x-auto">
            <table
              className="
                w-full
                min-w-[950px]
                border-collapse
              "
            >
              <thead>
                <tr className="bg-[#F7F9FB]">
                  <TableHeading>
                    Report
                  </TableHeading>

                  <TableHeading>
                    Period
                  </TableHeading>

                  <TableHeading>
                    Generated On
                  </TableHeading>

                  <th
                    className="
                      px-[16px]
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
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="
                      border-t
                      border-[#EDF1F3]

                      hover:bg-[#FAFCFD]
                    "
                  >
                    {/* REPORT */}
                    <td
                      className="
                        px-[16px]
                        py-[15px]
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-[10px]
                        "
                      >
                        <div
                          className="
                            flex
                            h-[34px]
                            w-[34px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-[8px]
                            bg-[#EDF4F8]
                            text-[#397291]
                          "
                        >
                          <FileText
                            size={15}
                            strokeWidth={1.8}
                          />
                        </div>

                        <div>
                          <p
                            className="
                              text-[13px]
                              font-semibold
                              text-[#153E59]
                            "
                          >
                            {report.name}
                          </p>

                          <p
                            className="
                              mt-[3px]
                              text-[10px]
                              text-[#81939E]
                            "
                          >
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* PERIOD */}
                    <td
                      className="
                        px-[16px]
                        py-[15px]
                        text-[12px]
                        text-[#587184]
                      "
                    >
                      {report.period}
                    </td>

                    {/* GENERATED DATE */}
                    <td
                      className="
                        px-[16px]
                        py-[15px]
                        text-[12px]
                        text-[#587184]
                      "
                    >
                      {report.generatedOn}
                    </td>

                    {/* ACTIONS */}
                    <td
                      className="
                        px-[16px]
                        py-[15px]
                        text-right
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-end
                          gap-[7px]
                        "
                      >
                        {/* DOWNLOAD */}
                        <button
                          type="button"
                          onClick={() =>
                            downloadReportPdf(report)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-[6px]
                            whitespace-nowrap
                            rounded-[7px]
                            border
                            border-[#D2DEE5]
                            bg-white
                            px-[11px]
                            py-[7px]
                            text-[11px]
                            font-semibold
                            text-[#526F82]
                            transition-colors

                            hover:border-[#AFC5D1]
                            hover:bg-[#F7FAFC]
                          "
                        >
                          <Download
                            size={13}
                            strokeWidth={1.8}
                          />

                          Download
                        </button>

                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/da/reports/${report.id}`
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
                            px-[11px]
                            py-[7px]
                            text-[11px]
                            font-semibold
                            text-[#23698F]
                            transition-colors

                            hover:border-[#8DB8CF]
                            hover:bg-[#EDF6FA]
                          "
                        >
                          View

                          <ArrowRight
                            size={13}
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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
        px-[18px]
        py-[15px]
        shadow-[0_3px_12px_rgba(18,52,77,0.035)]
      "
    >
      <p
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.6px]
          text-[#8295A1]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-[5px]
          text-[25px]
          font-semibold
          leading-none
          ${valueClass}
        `}
      >
        {value}
      </p>

      <p
        className="
          mt-[6px]
          text-[10px]
          text-[#8B9AA4]
        "
      >
        {description}
      </p>
    </div>
  );
};

/* ============================================================
   STATUS VALUE
============================================================ */
const StatusValue = ({
  label,
  value,
  dotClass,
}) => {
  return (
    <div>
      <div
        className="
          flex
          items-center
          gap-[6px]
        "
      >
        <span
          className={`
            h-[7px]
            w-[7px]
            rounded-full
            ${dotClass}
          `}
        />

        <p
          className="
            text-[10px]
            font-medium
            text-[#718794]
          "
        >
          {label}
        </p>
      </div>

      <p
        className="
          mt-[5px]
          text-[20px]
          font-semibold
          text-[#153A58]
        "
      >
        {value}
      </p>
    </div>
  );
};

/* ============================================================
   PROGRESS ROW
============================================================ */
const ProgressRow = ({
  label,
  value,
}) => {
  return (
    <div>
      <div
        className="
          flex
          items-center
          justify-between
          gap-[12px]
        "
      >
        <p
          className="
            text-[11px]
            font-medium
            text-[#637C8B]
          "
        >
          {label}
        </p>

        <p
          className="
            text-[13px]
            font-semibold
            text-[#315C77]
          "
        >
          {value}%
        </p>
      </div>

      <div
        className="
          mt-[7px]
          h-[7px]
          overflow-hidden
          rounded-full
          bg-[#E5EBEF]
        "
      >
        <div
          className="
            h-full
            rounded-full
            bg-[#3B83AA]
          "
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
};

/* ============================================================
   TABLE HEADING
============================================================ */
const TableHeading = ({
  children,
}) => {
  return (
    <th
      className="
        px-[16px]
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

export default DAReports;