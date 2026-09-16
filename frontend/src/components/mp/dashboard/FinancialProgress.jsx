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

const FinancialProgress = ({
  totalSanctioned,
  totalExpenditure,
}) => {
  const sanctioned =
    totalSanctioned !== null && totalSanctioned !== undefined
      ? Number(totalSanctioned)
      : null;

  const expenditure =
    totalExpenditure !== null && totalExpenditure !== undefined
      ? Number(totalExpenditure)
      : null;

  const hasFinancialData =
    sanctioned !== null &&
    expenditure !== null &&
    !Number.isNaN(sanctioned) &&
    !Number.isNaN(expenditure) &&
    sanctioned > 0;

  const utilizationPercentage = hasFinancialData
    ? Math.min((expenditure / sanctioned) * 100, 100)
    : null;

  const balance = hasFinancialData
    ? Math.max(sanctioned - expenditure, 0)
    : null;

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
      {/* Header */}
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
          Financial Progress
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
          Sanctioned funds and expenditure utilization
        </p>
      </div>

      {/* Main amount */}
      <div className="mt-[32px]">
        <span
          className="
            block
            text-[12px]
            font-medium
            text-[#7E8F9D]
          "
        >
          Total Expenditure
        </span>

        <div className="mt-[9px] flex items-end justify-between gap-[12px]">
          <span
            className="
              text-[32px]
              font-semibold
              leading-none
              tracking-[-0.5px]
              text-[#153A58]

              max-md:text-[28px]
            "
          >
            {formatCurrency(totalExpenditure)}
          </span>

          <span
            className="
              text-[12px]
              font-semibold
              text-[#4B8C68]
            "
          >
            {utilizationPercentage !== null
              ? `${utilizationPercentage.toFixed(1)}% utilized`
              : "Utilization unavailable"}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-[22px]">
        <div className="h-[9px] w-full overflow-hidden rounded-full bg-[#EAF0F4]">
          <div
            className="
              h-full
              rounded-full
              bg-[#4D8D69]
              transition-[width]
              duration-300
            "
            style={{
              width:
                utilizationPercentage !== null
                  ? `${utilizationPercentage}%`
                  : "0%",
            }}
          />
        </div>
      </div>

      {/* Bottom stats */}
      <div
        className="
          mt-[30px]
          grid grid-cols-2
          divide-x divide-[#E9EEF2]
          border-t border-[#EEF2F5]
          pt-[20px]
        "
      >
        <div className="pr-[18px]">
          <span
            className="
              block
              text-[11px]
              font-medium
              text-[#8D9CA8]
            "
          >
            Total Sanctioned
          </span>

          <strong
            className="
              mt-[7px]
              block
              text-[17px]
              font-semibold
              text-[#173C59]
            "
          >
            {formatCurrency(totalSanctioned)}
          </strong>
        </div>

        <div className="pl-[20px]">
          <span
            className="
              block
              text-[11px]
              font-medium
              text-[#8D9CA8]
            "
          >
            Remaining Balance
          </span>

          <strong
            className="
              mt-[7px]
              block
              text-[17px]
              font-semibold
              text-[#173C59]
            "
          >
            {formatCurrency(balance)}
          </strong>
        </div>
      </div>

      {!hasFinancialData && (
        <p
          className="
            mt-[18px]
            text-[11px]
            leading-[1.5]
            text-[#96A3AD]
          "
        >
          Expenditure data will appear here once it is available from project
          progress records.
        </p>
      )}
    </article>
  );
};

export default FinancialProgress;