import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  MapPinned,
  LogOut,
  PanelsTopLeft,
  X,
} from "lucide-react";

const MPSidebar = ({ mobileOpen = false, onClose }) => {
  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Projects",
      to: "/dashboard/projects",
      icon: FolderKanban,
    },
    {
      label: "Constituency",
      to: "/dashboard/constituency",
      icon: MapPinned,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/35 transition-opacity duration-200 lg:hidden
          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[156px] flex-col
          bg-[#07345C] px-[13px] pb-[18px] pt-[22px] text-white
          transition-transform duration-200 ease-out

          lg:static lg:z-auto lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="
            absolute right-[10px] top-[10px]
            flex h-[30px] w-[30px]
            items-center justify-center
            rounded-[6px]
            border border-white/10
            bg-white/10
            text-white
            lg:hidden
          "
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        {/* Brand */}
        <div className="flex min-h-[50px] items-center gap-[9px] border-b border-white/10 px-[5px] pb-[20px]">
          <div
            className="
              flex h-[35px] w-[35px] shrink-0
              items-center justify-center
              rounded-[8px]
              border border-white/10
              bg-white/10
              text-white
            "
          >
            <PanelsTopLeft size={22} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h2 className="m-0 text-[15px] font-bold leading-[1.1] tracking-[0.2px] text-white">
              MPLADS
            </h2>

            <span className="mt-[4px] block whitespace-nowrap text-[8px] font-medium leading-[1.25] text-[#B9CADA]">
              MP Monitoring Portal
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-[25px] flex flex-col gap-[7px]">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    flex min-h-[42px] w-full items-center
                    gap-[10px] rounded-[7px]
                    px-[12px]
                    text-[12px] font-medium
                    transition-all duration-150

                    ${
                      isActive
                        ? "bg-white font-semibold text-[#07345C] shadow-[0_3px_10px_rgba(0,0,0,0.08)]"
                        : "text-[#C9D7E4] hover:bg-white/[0.08] hover:text-white"
                    }
                  `
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto">
          <button
            type="button"
            className="
              flex h-[42px] w-full items-center
              gap-[10px]
              rounded-[7px]
              px-[12px]
              text-[12px] font-medium
              text-[#C9D7E4]
              transition-all duration-150
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            <LogOut
              size={18}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>Logout</span>
          </button>

          <div className="mt-[19px] px-[4px] pt-[15px] text-center text-[#8FAAC0]">
            <div className="mx-auto mb-[10px] h-[2px] w-[28px] rounded-full bg-[#5FA279]" />

            <span className="block text-[8px] font-semibold">
              MPLADS Monitoring System
            </span>

            <small className="mt-[3px] block text-[6.7px] leading-[1.25]">
              Monitoring &amp; Project Oversight
            </small>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MPSidebar;