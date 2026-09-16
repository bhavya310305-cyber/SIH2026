import { useState } from "react";
import DASidebar from "./DASidebar";
import DATopNav from "./DATopNav";

const DALayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#F4F7FB]">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[190px] bg-[#07345C] lg:block">
        <DASidebar />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <DASidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Area */}
      <div className="min-h-screen w-full lg:pl-[190px]">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 h-[66px] w-full border-b border-[#E2E9F0] bg-white max-md:h-[60px]">
          <DATopNav
            onMenuClick={() => setMobileSidebarOpen(true)}
          />
        </header>

        {/* Page Content */}
        <main className="w-full min-w-0">
          <div
            className="
              mx-auto
              w-full
              max-w-[1480px]
              px-[23px]
              pb-[30px]
              pt-[18px]

              max-lg:px-[18px]

              max-md:px-[12px]
              max-md:pb-[22px]
              max-md:pt-[12px]

              max-[480px]:px-[9px]
              max-[480px]:pb-[20px]
              max-[480px]:pt-[10px]
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DALayout;