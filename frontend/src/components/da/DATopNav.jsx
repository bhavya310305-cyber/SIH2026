import {
  Bell,
  CalendarDays,
  Menu,
  UserRound,
} from "lucide-react";

const DATopNav = ({ onMenuClick }) => {
  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-between
        gap-[18px]
        px-[22px]

        max-md:px-[12px]
      "
    >
      {/* Left Side */}
      <div className="flex min-w-0 items-center gap-[12px]">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="
            hidden
            h-[36px]
            w-[36px]
            shrink-0
            items-center
            justify-center
            rounded-[8px]
            border
            border-[#E1E8ED]
            bg-white
            text-[#315B77]
            transition-colors

            hover:bg-[#F5F8FA]

            max-lg:flex
          "
        >
          <Menu size={18} strokeWidth={1.8} />
        </button>

        {/* District Authority Identity */}
        <div className="min-w-0">
          <h2
            className="
              truncate
              text-[14px]
              font-semibold
              text-[#153A58]

              max-sm:text-[13px]
            "
          >
            District Administration
          </h2>

          <p
            className="
              mt-[2px]
              truncate
              text-[10px]
              font-medium
              text-[#8797A2]

              max-sm:hidden
            "
          >
            MPLADS District Monitoring
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-[12px]">
        {/* Financial Year */}
        <div
          className="
            flex
            items-center
            gap-[7px]
            rounded-[8px]
            border
            border-[#E2E9EE]
            bg-[#F8FAFC]
            px-[10px]
            py-[7px]

            max-sm:hidden
          "
        >
          <CalendarDays
            size={14}
            strokeWidth={1.8}
            className="text-[#56798F]"
          />

          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.5px] text-[#91A0AA]">
              Financial Year
            </p>

            <p className="mt-[1px] text-[10px] font-semibold text-[#365C74]">
              2024–25
            </p>
          </div>
        </div>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            flex
            h-[36px]
            w-[36px]
            items-center
            justify-center
            rounded-[8px]
            border
            border-[#E2E9EE]
            bg-white
            text-[#537086]
            transition-colors

            hover:bg-[#F5F8FA]
          "
        >
          <Bell size={16} strokeWidth={1.8} />

          <span
            className="
              absolute
              right-[8px]
              top-[7px]
              h-[5px]
              w-[5px]
              rounded-full
              bg-[#C75850]
            "
          />
        </button>

        {/* Profile */}
        <div
          className="
            flex
            items-center
            gap-[9px]
            border-l
            border-[#E6EBEF]
            pl-[12px]
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
              rounded-full
              bg-[#E7F0F6]
              text-[#245E84]
            "
          >
            <UserRound size={17} strokeWidth={1.8} />
          </div>

          <div className="max-sm:hidden">
            <p className="text-[11px] font-semibold text-[#214760]">
              Rajesh Sharma
            </p>

            <p className="mt-[1px] text-[9px] text-[#8B9AA5]">
              District Authority
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DATopNav;