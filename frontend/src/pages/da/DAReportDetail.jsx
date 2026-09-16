import {
  ArrowLeft,
  Download,
  FileText,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import DALayout from "../../components/da/DALayout";

import {
  downloadReportPdf,
  getReportById,
} from "../../data/daReportsData";

const DAReportDetail = () => {
  const navigate = useNavigate();

  const { reportId } = useParams();

  const report =
    getReportById(reportId);

  if (!report) {
    return (
      <DALayout>
        <div className="w-full">
          <button
            type="button"
            onClick={() =>
              navigate("/da/reports")
            }
            className="
              inline-flex
              items-center
              gap-[6px]
              text-[12px]
              font-semibold
              text-[#4D7187]
            "
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.8}
            />

            Back to Reports
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
            <p
              className="
                text-[16px]
                font-semibold
                text-[#153A58]
              "
            >
              Report not available
            </p>
          </div>
        </div>
      </DALayout>
    );
  }

  return (
    <DALayout>
      <div className="w-full">
        {/* TOP ACTIONS */}
        <div
          className="
            mb-[14px]
            flex
            items-center
            justify-between
            gap-[15px]
          "
        >
          <button
            type="button"
            onClick={() =>
              navigate("/da/reports")
            }
            className="
              inline-flex
              items-center
              gap-[6px]
              text-[12px]
              font-semibold
              text-[#4D7187]

              hover:text-[#153A58]
            "
          >
            <ArrowLeft
              size={15}
              strokeWidth={1.8}
            />

            Back to Analytics & Reports
          </button>

          <button
            type="button"
            onClick={() =>
              downloadReportPdf(report)
            }
            className="
              inline-flex
              items-center
              gap-[7px]
              rounded-[8px]
              bg-[#07345C]
              px-[14px]
              py-[9px]
              text-[12px]
              font-semibold
              text-white

              hover:bg-[#0B416F]
            "
          >
            <Download
              size={15}
              strokeWidth={1.8}
            />

            Download PDF
          </button>
        </div>

        {/* =====================================================
            REPORT PAPER
        ====================================================== */}
        <article
          className="
            mx-auto
            max-w-[1050px]
            rounded-[12px]
            border
            border-[#DDE5EA]
            bg-white
            shadow-[0_4px_18px_rgba(18,52,77,0.05)]
          "
        >
          {/* REPORT HEADER */}
          <header
            className="
              border-b
              border-[#DDE5EA]
              px-[34px]
              py-[28px]

              max-sm:px-[20px]
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
                <div
                  className="
                    mb-[10px]
                    flex
                    items-center
                    gap-[8px]
                  "
                >
                  <FileText
                    size={16}
                    strokeWidth={1.8}
                    className="text-[#397291]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[1px]
                      text-[#708795]
                    "
                  >
                    MPLADS District Monitoring Report
                  </p>
                </div>

                <h1
                  className="
                    text-[27px]
                    font-semibold
                    leading-[1.25]
                    text-[#153A58]
                  "
                >
                  {report.name}
                </h1>

                <p
                  className="
                    mt-[6px]
                    text-[12px]
                    text-[#718794]
                  "
                >
                  {report.description}
                </p>
              </div>

              <div
                className="
                  shrink-0
                  text-right

                  max-md:text-left
                "
              >
                <p
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.5px]
                    text-[#8999A3]
                  "
                >
                  Reporting Period
                </p>

                <p
                  className="
                    mt-[3px]
                    text-[12px]
                    font-semibold
                    text-[#385C73]
                  "
                >
                  {report.period}
                </p>

                <p
                  className="
                    mt-[10px]
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.5px]
                    text-[#8999A3]
                  "
                >
                  Generated On
                </p>

                <p
                  className="
                    mt-[3px]
                    text-[12px]
                    font-semibold
                    text-[#385C73]
                  "
                >
                  {report.generatedOn}
                </p>
              </div>
            </div>
          </header>

          <div
            className="
              px-[34px]
              py-[26px]

              max-sm:px-[20px]
            "
          >
            {/* EXECUTIVE SUMMARY */}
            <section>
              <h2
                className="
                  text-[17px]
                  font-semibold
                  text-[#153A58]
                "
              >
                Executive Summary
              </h2>

              <p
                className="
                  mt-[8px]
                  max-w-[900px]
                  text-[12px]
                  leading-[1.7]
                  text-[#607988]
                "
              >
                {report.summary}
              </p>
            </section>

            {/* KEY INDICATORS */}
            <section className="mt-[26px]">
              <h2
                className="
                  text-[17px]
                  font-semibold
                  text-[#153A58]
                "
              >
                Key Indicators
              </h2>

              <div
                className="
                  mt-[12px]
                  grid
                  grid-cols-3
                  gap-[10px]

                  max-md:grid-cols-2
                  max-sm:grid-cols-1
                "
              >
                {report.metrics.map(
                  (metric) => (
                    <div
                      key={metric.label}
                      className="
                        rounded-[9px]
                        border
                        border-[#E2E9ED]
                        bg-[#F8FAFB]
                        px-[15px]
                        py-[13px]
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.5px]
                          text-[#81939E]
                        "
                      >
                        {metric.label}
                      </p>

                      <p
                        className="
                          mt-[5px]
                          text-[20px]
                          font-semibold
                          text-[#153A58]
                        "
                      >
                        {metric.value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* REPORT SECTIONS */}
            {report.sections.map(
              (section) => (
                <section
                  key={section.title}
                  className="
                    mt-[26px]
                    border-t
                    border-[#E5EBEF]
                    pt-[20px]
                  "
                >
                  <h2
                    className="
                      text-[17px]
                      font-semibold
                      text-[#153A58]
                    "
                  >
                    {section.title}
                  </h2>

                  {section.items && (
                    <div
                      className="
                        mt-[12px]
                        overflow-hidden
                        rounded-[9px]
                        border
                        border-[#E2E9ED]
                      "
                    >
                      {section.items.map(
                        (item) => (
                          <div
                            key={item.label}
                            className="
                              flex
                              items-center
                              justify-between
                              gap-[20px]
                              border-b
                              border-[#E8EDF0]
                              px-[15px]
                              py-[11px]

                              last:border-b-0
                            "
                          >
                            <p
                              className="
                                text-[11px]
                                text-[#637C8B]
                              "
                            >
                              {item.label}
                            </p>

                            <p
                              className="
                                text-[12px]
                                font-semibold
                                text-[#315C77]
                              "
                            >
                              {item.value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {section.text && (
                    <p
                      className="
                        mt-[9px]
                        max-w-[900px]
                        text-[12px]
                        leading-[1.7]
                        text-[#607988]
                      "
                    >
                      {section.text}
                    </p>
                  )}
                </section>
              )
            )}
          </div>

          {/* REPORT FOOTER */}
          <footer
            className="
              border-t
              border-[#E5EBEF]
              px-[34px]
              py-[14px]
              text-[9px]
              text-[#8999A3]

              max-sm:px-[20px]
            "
          >
            System-generated MPLADS monitoring report •
            District Authority Monitoring
          </footer>
        </article>
      </div>
    </DALayout>
  );
};

export default DAReportDetail;