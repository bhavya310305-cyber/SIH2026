const MPHero = () => {
  return (
    <section
      className="
        relative flex min-h-[205px] items-center justify-between
        overflow-hidden rounded-[14px]
        bg-cover
        px-[40px] py-[32px]
        shadow-[0_5px_18px_rgba(26,58,82,0.08)]

        max-lg:min-h-[195px]
        max-lg:px-[30px]

        max-md:min-h-[220px]
        max-md:items-end
        max-md:px-[22px]
        max-md:py-[25px]

        max-[480px]:min-h-[205px]
        max-[480px]:rounded-[10px]
        max-[480px]:px-[18px]
        max-[480px]:py-[22px]
      "
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(4,35,59,0.42) 0%, rgba(4,35,59,0.17) 50%, rgba(4,35,59,0.06) 100%), url('/images/dashboardParliament.png')",
        backgroundPosition: "center 45%",
      }}
    >
      {/* Left content */}
      <div className="relative z-10 max-w-[570px]">
        <span
          className="
            mb-[10px] inline-block
            text-[13px]
            font-medium
            tracking-[0.2px]
            text-[#E7EFF5]

            max-md:text-[12px]
            max-[480px]:text-[11px]
          "
        >
          Member of Parliament
        </span>

        <h1
          className="
            m-0
            font-serif
            text-[32px]
            font-medium
            leading-[1.15]
            tracking-[-0.4px]
            text-white

            max-lg:text-[29px]
            max-md:text-[27px]
            max-[480px]:text-[23px]
          "
        >
          Namaste, Shri Rajesh Sharma
        </h1>

        <p
          className="
            mt-[10px]
            text-[14px]
            font-medium
            text-[#ECF2F6]

            max-md:text-[13px]
            max-[480px]:text-[12px]
          "
        >
          Jaipur Rural, Rajasthan
        </p>
      </div>

      {/* Right quote - same content as selected design */}
      <div
        className="
          relative z-10
          max-w-[290px]
          pr-[12px]
          text-right
          text-white

          max-md:hidden
        "
      >
        <span
          className="
            block h-[24px]
            font-serif
            text-[46px]
            leading-none
            text-white/80
          "
        >
          “
        </span>

        <p
          className="
            m-0
            font-serif
            text-[16px]
            italic
            leading-[1.55]
            text-white
          "
        >
          Development is the path
          <br />
          to empowered communities.
        </p>
      </div>
    </section>
  );
};

export default MPHero;