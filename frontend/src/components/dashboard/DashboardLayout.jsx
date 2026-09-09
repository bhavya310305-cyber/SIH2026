import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-[#EEF2F6]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className="flex min-h-screen flex-col transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}