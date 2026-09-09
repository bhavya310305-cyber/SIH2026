import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Landmark, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "Stakeholders", id: "stakeholders" },
  { label: "Contact", id: "contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    setMenuOpen(false);

    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border">
      {/* Desktop Navbar */}
      <div className="mx-auto max-w-7xl h-20 px-4 sm:px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5 text-primary-deep" />
          </div>

          <div className="leading-tight">
            <h1 className="text-base sm:text-lg font-bold text-primary-deep">
              MPLADS AI Monitoring Platform
            </h1>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Transparent · Accountable · Efficient
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative pb-1 text-sm font-medium cursor-pointer transition-colors"
              >
                <span
                  className={
                    active === item.id
                      ? "text-primary-deep"
                      : "text-muted-foreground hover:text-primary-deep"
                  }
                >
                  {item.label}
                </span>

                <span
                  className={`absolute left-0 -bottom-[6px] h-[2px] w-full bg-primary transition-transform duration-300 origin-left ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Desktop Login */}
          <Link 
          to="/login"
          className="hidden lg:flex items-center gap-2 rounded-md bg-primary-deep px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">

            Login
            <ArrowRight size={16} />
          </Link>

          {/* Mobile Menu Button */}
          <Link
          to="/login"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent transition"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-primary-deep" />
            ) : (
              <Menu className="w-6 h-6 text-primary-deep" />
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-border bg-white"
          >
            <div className="px-6 py-4 flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-3 text-sm font-medium transition ${
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary-deep"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary-deep py-3 text-sm font-semibold text-primary-foreground">
                Login
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;