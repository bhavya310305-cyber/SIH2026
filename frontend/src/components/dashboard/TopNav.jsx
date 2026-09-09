import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ProfileDrawer from "./ProfileDrawer";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

    const handleLogout = () => {
    // Later replace with API logout
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    };

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card"
        style={{ height: 64, paddingLeft: 28, paddingRight: 28 }}
      >
        {/* Left */}
        <div>
          <p className="text-[15px] font-semibold text-primary-deep">
            Hon. Rahul Sharma
          </p>
          <p className="text-[11px] font-medium text-muted-foreground">
            Nagpur Parliamentary Constituency
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          {/* <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((o) => !o);
                setProfileMenu(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-accent"
            >
              <Bell size={18} className="text-muted-foreground" />

              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-11 z-50 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <p className="text-[13px] font-semibold text-primary-deep">
                    Notifications
                  </p>

                  <span className="rounded bg-primary px-1.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
                    {unreadCount}
                  </span>
                </div>

                <ul>
                  {NOTIFICATIONS.map((n) => (
                    <li
                      key={n.id}
                      className={`cursor-pointer border-b border-border px-4 py-2.5 transition-colors last:border-0 hover:bg-accent ${
                        n.unread ? "bg-primary/5" : ""
                      }`}
                    >
                      <p
                        className={`text-[12px] leading-snug ${
                          n.unread
                            ? "font-semibold text-primary-deep"
                            : "text-muted-foreground"
                        }`}
                      >
                        {n.message}
                      </p>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {n.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          <div className="mx-1 h-7 w-px bg-border" />

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileMenu((o) => !o);
                setNotifOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-deep text-xs font-bold text-primary-foreground">
                RS
              </div>

              <ChevronDown size={14} className="text-muted-foreground" />
            </button>

            {profileMenu && (
              <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-semibold text-primary-deep">
                    Rahul Sharma
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Member of Parliament
                  </p>
                </div>

                <button
                  onClick={() => {
                    setDrawerOpen(true);
                    setProfileMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-primary-deep transition-colors hover:bg-accent"
                >
                  My Profile
                </button>

                <div className="border-t border-border">
                  <button 
                   onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Click Outside */}
        {(notifOpen || profileMenu) && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => {
              setNotifOpen(false);
              setProfileMenu(false);
            }}
          />
        )}
      </header>

      {/* Profile Drawer */}
      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}