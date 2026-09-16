import {
  IndianRupee,
  CircleCheckBig,
  TriangleAlert,
  WalletCards,
} from "lucide-react";

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

const MPKPICards = ({
  totalSanctioned,
  totalExpenditure,
  completedProjects,
  totalProjects,
  highRiskProjects,
}) => {
  const cards = [
    {
      title: "Total Sanctioned",
      value: formatCurrency(totalSanctioned),
      icon: WalletCards,
      iconBg: "bg-[#E9F2FA]",
      iconColor: "text-[#2C6F9D]",
    },
    {
      title: "Total Expenditure",
      value: formatCurrency(totalExpenditure),
      icon: IndianRupee,
      iconBg: "bg-[#E9F8F1]",
      iconColor: "text-[#2E8B62]",
    },
    {
      title: "Completed Projects",
      value:
        completedProjects !== null &&
        completedProjects !== undefined &&
        totalProjects !== null &&
        totalProjects !== undefined
          ? `${completedProjects}/${totalProjects}`
          : "—",
      icon: CircleCheckBig,
      iconBg: "bg-[#EDF8EE]",
      iconColor: "text-[#3F8E55]",
    },
    {
      title: "High-Risk Projects",
      value:
        highRiskProjects !== null && highRiskProjects !== undefined
          ? highRiskProjects
          : "—",
      icon: TriangleAlert,
      iconBg: "bg-[#FFF0EE]",
      iconColor: "text-[#D85B4D]",
    },
  ];

  return (
    <section
      className="
        mt-[18px]
        grid grid-cols-4
        gap-[16px]

        max-lg:grid-cols-2
        max-md:gap-[12px]
        max-[480px]:grid-cols-1
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="
              flex min-h-[118px]
              items-center justify-between
              rounded-[12px]
              border border-[#E3EAF0]
              bg-white
              px-[22px] py-[20px]
              shadow-[0_4px_14px_rgba(18,52,77,0.06)]

              max-md:min-h-[105px]
              max-md:px-[18px]
              max-md:py-[16px]
            "
          >
            <div className="min-w-0 pr-[12px]">
              <p
                className="
                  m-0
                  text-[13px]
                  font-medium
                  leading-[1.3]
                  text-[#7A8996]

                  max-md:text-[12px]
                "
              >
                {card.title}
              </p>

              <h3
                className="
                  mt-[10px]
                  text-[26px]
                  font-semibold
                  leading-none
                  tracking-[-0.3px]
                  text-[#123A5B]

                  max-lg:text-[24px]
                  max-md:text-[22px]
                "
              >
                {card.value}
              </h3>
            </div>

            <div
              className={`
                flex h-[50px] w-[50px]
                shrink-0 items-center justify-center
                rounded-[12px]
                ${card.iconBg}
                ${card.iconColor}

                max-md:h-[44px]
                max-md:w-[44px]
              `}
            >
              <Icon size={24} strokeWidth={1.8} />
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default MPKPICards;