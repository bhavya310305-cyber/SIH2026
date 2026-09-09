import { motion, useInView, animate } from "framer-motion";
import { Landmark, FolderKanban, CheckCircle2, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Counter({ from = 0, to, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [isInView, from, to]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    icon: Landmark,
    value: 12480,
    prefix: "₹",
    suffix: " Cr",
    title: "Total Funds Sanctioned",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FolderKanban,
    value: 234892,
    title: "Total Projects",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CheckCircle2,
    value: 189743,
    title: "Completed Projects",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: AlertTriangle,
    value: 4842,
    title: "High-Risk Projects",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

function StatsBar() {
  return (
    <section className="relative  z-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
        >
          {STATS.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`p-6 ${
                  index !== STATS.length - 1
                    ? "border-r border-border"
                    : ""
                } ${index < 2 ? "border-b lg:border-b-0" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground leading-none">
                      {item.title}
                    </p>

                    <h3 className={`mt-2 text-2xl font-extrabold ${item.color}`}>
                      {item.prefix}
                      <Counter to={item.value} suffix={item.suffix || ""} />
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsBar;