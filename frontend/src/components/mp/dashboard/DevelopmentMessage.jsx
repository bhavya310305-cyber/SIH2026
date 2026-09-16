const DevelopmentMessage = () => {
  return (
    <article
      className="
        relative overflow-hidden
        rounded-[12px]
        border border-[#DCE9E1]
        bg-[#EAF5EE]
        px-[26px] py-[22px]
        shadow-[0_4px_14px_rgba(18,52,77,0.05)]

        max-md:px-[20px]
        max-md:py-[20px]
      "
    >
      {/* Main content */}
      <div className="relative z-10 max-w-[320px]">
        {/* Decorative plant icon */}
        <div
          className="
            flex h-[46px] w-[46px]
            items-center justify-center
            rounded-[11px]
            bg-[#D9ECDD]
            text-[#4F8B63]
          "
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 64 64"
            className="h-[28px] w-[28px]"
            fill="none"
          >
            <path
              d="M32 49V19"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M31.8 27C24.5 26.7 19 22 18 15C25.4 15.2 30.2 19.2 31.8 27Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M32.2 36C39.6 35.6 44.9 30.9 46 24C38.7 24.1 33.8 28.1 32.2 36Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M17 50H47"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M21 55H43"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h3
          className="
            mt-[16px]
            font-serif
            text-[26px]
            font-medium
            leading-[1.08]
            tracking-[-0.35px]
            text-[#143E5C]

            max-md:text-[23px]
          "
        >
          Development
          <br />
          Empowers People
        </h3>

        <p
          className="
            mt-[12px]
            max-w-[270px]
            text-[12px]
            font-medium
            leading-[1.65]
            text-[#4D7896]

            max-md:text-[11px]
          "
        >
          Your continuous support helps create better infrastructure and
          brighter opportunities for every citizen in your constituency.
        </p>

        <div
          className="
            mt-[16px]
            h-[3px] w-[38px]
            rounded-full
            bg-[#5D9C73]
          "
        />
      </div>

      {/* Faded botanical illustration */}
      <div
        className="
          pointer-events-none
          absolute bottom-[-10px] right-[-12px]
          h-[215px] w-[215px]
          text-[#85B695]/25

          max-md:h-[175px]
          max-md:w-[175px]
          max-md:right-[-28px]
        "
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 220 210"
          className="h-full w-full"
          fill="none"
        >
          <path
            d="M146 213C147 175 146 123 127 79C116 53 101 31 83 12"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M128 82C101 78 81 59 76 34C101 34 122 51 128 82Z"
            fill="currentColor"
          />

          <path
            d="M143 116C169 109 187 88 188 63C162 66 145 86 143 116Z"
            fill="currentColor"
          />

          <path
            d="M135 146C108 144 87 127 80 102C106 101 128 118 135 146Z"
            fill="currentColor"
          />

          <path
            d="M146 174C174 166 192 145 193 119C166 122 148 143 146 174Z"
            fill="currentColor"
          />

          <path
            d="M110 53C91 49 76 35 72 16C91 16 106 29 110 53Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </article>
  );
};

export default DevelopmentMessage;