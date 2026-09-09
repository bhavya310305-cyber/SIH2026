import { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    MapPin,
    // IndianRupee,
    // FileBarChart2,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Projects", icon: FolderKanban, path: "/dashboard/projects" },
    { label: "Constituency", icon: MapPin, path: "/dashboard/constituency" },
    // { label: "Funds", icon: IndianRupee, path: "/dashboard/funds" },
    // { label: "Reports", icon: FileBarChart2, path: "/dashboard/reports" },
];

export default function Sidebar({ collapsed, setCollapsed }) {

    const toggleCollapse = useCallback(() => {setCollapsed((prev) => !prev); }, [setCollapsed]);
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    };


    return (
        <aside
            className="fixed top-0 left-0 h-screen z-40 flex flex-col bg-[#0F2742] border-r border-[#1E3A5F] transition-all duration-300"
            style={{ width: collapsed ? 72 : 240 }}
        >
            {/* ── Brand ── */}
            <div
                className="flex items-center gap-3 border-b border-border"
                style={{ padding: collapsed ? "20px 16px" : "20px 20px" }}
            >
                <div className="shrink-0 flex items-center justify-center rounded-lg bg-primary-deep h-9 w-9">
                    <span className="text-primary-foreground font-bold text-xs">MP</span>
                </div>
                {!collapsed && (
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold leading-tight text-white">MPLADS</p>
                        <p className="text-[11px] leading-tight text-slate-300">AI Monitoring</p>
                    </div>
                )}
            </div>

            {/* ── Navigation ── */}
            <nav className="flex-1 py-4 px-3 space-y-1">
                {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={path === "/dashboard"}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                                collapsed
                                ? "justify-center px-0 py-2.5"
                                : "px-3 py-2.5"
                            } ${
                                isActive
                                ? "bg-[#173556] text-white shadow-sm"
                                : "text-slate-300 hover:bg-[#173556] hover:text-white"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    size={18}
                                    strokeWidth={isActive ? 2.2 : 1.8}
                                    className={`shrink-0 ${
                                        isActive
                                            ? "text-[#60A5FA]"
                                            : "text-slate-400 group-hover:text-white"
                                        }`}
                                />
                                {!collapsed && <span>{label}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* ── Bottom ── */}
            <div className="border-t border-border px-3 py-3 space-y-1">
                {/* <button
                    className={`group w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-primary-deep transition-all duration-150 ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}`}
                >
                    <Settings size={18} strokeWidth={1.8} className="shrink-0 text-muted-foreground group-hover:text-primary-deep" />
                    {!collapsed && <span>Settings</span>}
                </button> */}
                <button
                    onClick={handleLogout}
                    className={`group w-full flex items-center gap-3 rounded-lg text-[13px] font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-150 ${collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"}`}
                >
                    <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>

            {/* ── Collapse Toggle ── */}
            <button
                onClick={toggleCollapse}
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-50 w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                aria-label="Toggle sidebar"
            >
                {collapsed ? (
                    <ChevronRight size={12} className="text-slate-600" />
                ) : (
                    <ChevronLeft size={12} className="text-slate-600" />
                )}
            </button>
        </aside>
    );
}