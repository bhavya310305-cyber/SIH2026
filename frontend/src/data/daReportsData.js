import jsPDF from "jspdf";

export const reportsData = [
  {
    id: "district-summary",
    name: "District Monitoring Summary",
    description: "Overall status of MPLADS works in the district",
    period: "September 2026",
    generatedOn: "15 Sep 2026",

    summary:
      "This report provides a consolidated monitoring overview of MPLADS works in the district, covering project status, financial utilization, and physical progress.",

    metrics: [
      { label: "Total Projects", value: "12" },
      { label: "Completed", value: "8" },
      { label: "Ongoing", value: "3" },
      { label: "Delayed", value: "1" },
      { label: "Fund Utilization", value: "69.6%" },
      { label: "Physical Progress", value: "72%" },
    ],

    sections: [
      {
        title: "Financial Position",
        items: [
          {
            label: "Total Sanctioned Amount",
            value: "₹28.50 Cr",
          },
          {
            label: "Total Expenditure",
            value: "₹19.85 Cr",
          },
          {
            label: "Fund Utilization",
            value: "69.6%",
          },
        ],
      },
      {
        title: "Project Status",
        items: [
          { label: "Completed Projects", value: "8" },
          { label: "Ongoing Projects", value: "3" },
          { label: "Delayed Projects", value: "1" },
        ],
      },
    ],
  },

  {
    id: "fund-utilization",
    name: "Fund Utilization Report",
    description: "Sanctioned amount and expenditure analysis",
    period: "September 2026",
    generatedOn: "15 Sep 2026",

    summary:
      "This report summarizes the financial utilization of MPLADS funds across monitored works in the district.",

    metrics: [
      { label: "Sanctioned Amount", value: "₹28.50 Cr" },
      { label: "Expenditure", value: "₹19.85 Cr" },
      { label: "Fund Utilization", value: "69.6%" },
    ],

    sections: [
      {
        title: "Financial Summary",
        items: [
          {
            label: "Total Sanctioned",
            value: "₹28.50 Cr",
          },
          {
            label: "Total Expenditure",
            value: "₹19.85 Cr",
          },
          {
            label: "Unutilized Amount",
            value: "₹8.65 Cr",
          },
        ],
      },
      {
        title: "Monitoring Observation",
        text:
          "Overall fund utilization currently stands at 69.6%. Financial utilization should continue to be reviewed alongside recorded physical progress.",
      },
    ],
  },

  {
    id: "delayed-projects",
    name: "Delayed Projects Report",
    description: "Projects behind their expected execution schedule",
    period: "September 2026",
    generatedOn: "15 Sep 2026",

    summary:
      "This report summarizes MPLADS projects that are currently behind their expected execution schedule.",

    metrics: [
      { label: "Projects Monitored", value: "12" },
      { label: "Delayed Projects", value: "1" },
      { label: "Delay Share", value: "8.3%" },
    ],

    sections: [
      {
        title: "Delay Position",
        items: [
          {
            label: "Total Projects",
            value: "12",
          },
          {
            label: "Delayed Projects",
            value: "1",
          },
        ],
      },
      {
        title: "Monitoring Observation",
        text:
          "The delayed project should be monitored against its expected completion schedule and latest recorded physical progress.",
      },
    ],
  },

  {
    id: "ai-anomaly-summary",
    name: "AI Anomaly Summary",
    description: "Summary of priority alerts and early warnings",
    period: "September 2026",
    generatedOn: "15 Sep 2026",

    summary:
      "This report summarizes unusual patterns and deviations identified by the AI monitoring layer for administrative review.",

    metrics: [
      { label: "Priority Alerts", value: "2" },
      { label: "Early Warnings", value: "2" },
      { label: "Total AI Flags", value: "4" },
    ],

    sections: [
      {
        title: "Alert Position",
        items: [
          {
            label: "Priority Alerts",
            value: "2",
          },
          {
            label: "Early Warnings",
            value: "2",
          },
        ],
      },
      {
        title: "Monitoring Note",
        text:
          "AI-generated flags indicate unusual patterns or deviations requiring monitoring attention. They do not by themselves establish fraud, misuse of funds, or non-compliance.",
      },
    ],
  },
];

export const getReportById = (reportId) => {
  return reportsData.find(
    (report) => report.id === reportId
  );
};

export const downloadReportPdf = (report) => {
  if (!report) return;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  let y = 20;

  /*
   * REPORT HEADER
   */
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text(
    "MPLADS DISTRICT MONITORING",
    margin,
    y
  );

  y += 10;

  pdf.setFontSize(20);
  pdf.text(report.name, margin, y);

  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  pdf.text(
    `Period: ${report.period}`,
    margin,
    y
  );

  pdf.text(
    `Generated On: ${report.generatedOn}`,
    pageWidth - margin,
    y,
    { align: "right" }
  );

  y += 8;

  pdf.setDrawColor(220, 228, 233);
  pdf.line(
    margin,
    y,
    pageWidth - margin,
    y
  );

  y += 10;

  /*
   * EXECUTIVE SUMMARY
   */
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(
    "Executive Summary",
    margin,
    y
  );

  y += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  const summaryLines =
    pdf.splitTextToSize(
      report.summary,
      contentWidth
    );

  pdf.text(
    summaryLines,
    margin,
    y
  );

  y += summaryLines.length * 5 + 9;

  /*
   * KEY INDICATORS
   */
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(
    "Key Indicators",
    margin,
    y
  );

  y += 8;

  report.metrics.forEach((metric) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);

    pdf.text(
      metric.label,
      margin,
      y
    );

    pdf.setFont("helvetica", "bold");

    pdf.text(
      metric.value,
      pageWidth - margin,
      y,
      { align: "right" }
    );

    y += 7;
  });

  y += 4;

  /*
   * REPORT SECTIONS
   */
  report.sections.forEach((section) => {
    if (y > 255) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);

    pdf.text(
      section.title,
      margin,
      y
    );

    y += 8;

    if (section.items) {
      section.items.forEach((item) => {
        pdf.setFont(
          "helvetica",
          "normal"
        );
        pdf.setFontSize(9);

        pdf.text(
          item.label,
          margin,
          y
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.text(
          item.value,
          pageWidth - margin,
          y,
          { align: "right" }
        );

        y += 7;
      });
    }

    if (section.text) {
      pdf.setFont(
        "helvetica",
        "normal"
      );
      pdf.setFontSize(9);

      const lines =
        pdf.splitTextToSize(
          section.text,
          contentWidth
        );

      pdf.text(lines, margin, y);

      y += lines.length * 5;
    }

    y += 8;
  });

  /*
   * FOOTER
   */
  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(8);

  pdf.text(
    "System-generated MPLADS monitoring report",
    margin,
    285
  );

  pdf.save(
    `${report.id}-${report.period
      .replaceAll(" ", "-")
      .toLowerCase()}.pdf`
  );
};