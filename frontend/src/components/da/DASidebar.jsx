import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Overview",
    path: "/da/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Project Monitoring",
    path: "/da/projects",
    icon: ClipboardList,
  },
  {
    label: "AI Alerts",
    path: "/da/alerts",
    icon: AlertTriangle,
  },
  {
    label: "Analytics & Reports",
    path: "/da/reports",
    icon: BarChart3,
  },
];

const DASidebar = ({
  mobileOpen = false,
  onClose = () => {},
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-40
            bg-[#071D30]/45
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[190px]
          flex-col
          bg-[#07345C]
          text-white
          transition-transform
          duration-200

          lg:static
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Mobile Close */}
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            absolute
            right-[8px]
            top-[8px]
            flex
            h-[30px]
            w-[30px]
            items-center
            justify-center
            rounded-[7px]
            text-white/70
            transition-colors
            hover:bg-white/10
            hover:text-white
            lg:hidden
          "
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        {/* Brand */}
        <div
          className="
            border-b
            border-white/10
            px-[16px]
            pb-[18px]
            pt-[18px]
          "
        >
          <div
            className="
              flex
              h-[38px]
              w-[38px]
              items-center
              justify-center
              rounded-[10px]
              border
              border-white/15
              bg-white/[0.07]
            "
          >
            <BarChart3
              size={19}
              strokeWidth={1.7}
              className="text-[#C6D9E7]"
            />
          </div>

          <h1
            className="
              mt-[11px]
              text-[18px]
              font-semibold
              tracking-[0.1px]
              text-white
            "
          >
            MPLADS
          </h1>

          <p
            className="
              mt-[2px]
              text-[10px]
              font-semibold
              uppercase
              tracking-[1.2px]
              text-[#9FBBD0]
            "
          >
            District Authority
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-[9px] py-[15px]">
          <div className="space-y-[5px]">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                      flex
                      min-h-[44px]
                      items-center
                      gap-[10px]
                      rounded-[8px]
                      px-[12px]
                      text-[12px]
                      font-medium
                      leading-none
                      whitespace-nowrap
                      transition-colors

                      ${
                        isActive
                          ? "bg-white text-[#07345C] shadow-[0_3px_10px_rgba(0,0,0,0.08)]"
                          : "text-[#C7D8E4] hover:bg-white/[0.08] hover:text-white"
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                        className={
                          isActive
                            ? "shrink-0 text-[#175A85]"
                            : "shrink-0 text-[#AFC6D7]"
                        }
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        <div
          className="
            border-t
            border-white/10
            px-[9px]
            pb-[14px]
            pt-[10px]
          "
        >
          <button
            type="button"
            className="
              flex
              min-h-[42px]
              w-full
              items-center
              gap-[10px]
              rounded-[8px]
              px-[12px]
              text-left
              text-[12px]
              font-medium
              text-[#C7D8E4]
              transition-colors
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span className="whitespace-nowrap">
              Logout
            </span>
          </button>

          {/* Footer Branding */}
          <div
            className="
              mt-[10px]
              border-t
              border-white/[0.08]
              px-[10px]
              pt-[12px]
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                leading-[1.4]
                tracking-[0.2px]
                text-[#B8CDDC]
              "
            >
              MPLADS Monitoring
            </p>

            <p
              className="
                mt-[3px]
                text-[9px]
                font-medium
                leading-[1.4]
                text-[#789BB2]
              "
            >
              AI Monitoring & Analytics
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DASidebar;