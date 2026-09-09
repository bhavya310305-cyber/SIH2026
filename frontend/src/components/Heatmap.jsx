import { FileText, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const INSIGHT_CARDS = [
  {
    icon: MapPin,
    t: "Risk Heatmap",
    d: "Identify vulnerable districts and projects at a glance.",
  },
  {
    icon: FileText,
    t: "Project Insights",
    d: "Track progress, payments and fund utilization.",
  },
  {
    icon: ShieldCheck,
    t: "Geo-tagged Verification",
    d: "Validate works with photos, location and field data.",
  },
];

function Heatmap() {
  return (
    <section className="bg-surface-tint">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <img
              src="/images/India.png"
              alt="India district-level risk heatmap"
              className="mx-auto h-60 w-auto object-contain"
            />

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-success" />
                Low Risk
              </span>

              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-saffron" />
                Moderate Risk
              </span>

              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-destructive" />
                High Risk
              </span>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {INSIGHT_CARDS.map((c) => (
              <motion.div
                key={c.t}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)] min-h-[110px]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                  <c.icon className="h-5 w-5" />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-primary-deep">
                    {c.t}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {c.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Heatmap;