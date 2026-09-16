import { ChevronDown, Menu } from "lucide-react";

const MPTopNav = ({ onMenuClick }) => {
  return (
    <div className="flex h-full w-full items-center justify-between px-[28px] max-lg:px-[20px] max-md:px-[14px]">
      {/* Left side */}
      <div className="flex min-w-0 items-center">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="
            mr-[10px]
            hidden h-[38px] w-[38px]
            shrink-0 items-center justify-center
            rounded-[7px]
            border border-[#E1E8EF]
            bg-[#F3F6F9]
            text-[#173C5D]
            max-md:flex
          "
        >
          <Menu size={21} strokeWidth={1.8} />
        </button>

        {/* Portal title */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[15px] font-bold leading-none text-[#0D3557] max-md:text-[13px]">
            MPLADS
          </span>

          <span className="mt-[5px] text-[9px] font-medium text-[#8293A3] max-md:hidden">
            Member of Parliament Local Area Development Scheme
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-[18px] max-md:gap-0">
        {/* Financial Year */}
        <div className="flex flex-col items-end gap-[3px] max-md:hidden">
          <span className="text-[8px] font-medium text-[#93A2B0]">
            Financial Year
          </span>

          <button
            type="button"
            className="flex items-center gap-[5px] text-[11px] font-semibold text-[#244866]"
          >
            FY 2024-25
            <ChevronDown size={15} strokeWidth={1.8} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-[30px] w-px bg-[#E4E9EE] max-md:hidden" />

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-[9px] text-[#254760]"
        >
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#0A4D79] text-[10px] font-bold text-white max-md:h-[32px] max-md:w-[32px]">
            RS
          </div>

          <div className="flex flex-col items-start max-md:hidden">
            <span className="text-[10.5px] font-semibold leading-[1.2] text-[#183C59]">
              Shri Rajesh Sharma
            </span>

            <span className="mt-[3px] text-[8px] text-[#8A99A7]">
              Member of Parliament
            </span>
          </div>

          <ChevronDown
            size={16}
            strokeWidth={1.8}
            className="max-md:hidden"
          />
        </button>
      </div>
    </div>
  );
};

export default MPTopNav;