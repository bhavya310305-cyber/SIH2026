import {
  Database,
  Sparkles,
  Gauge,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

const STEPS = [
  {
    icon: Database,
    title: "Collect Data",
    body: "Sanctions, expenditure, payments, progress and more.",
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    body: "Detects anomalies, fraud patterns, delays and inefficiencies.",
  },
  {
    icon: Gauge,
    title: "Risk Scoring",
    body: "Assigns risk scores with clear explanations (why it's flagged).",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    body: "Role-based views for Ministry, State, District, MP and Implementing Agencies.",
  },
  {
    icon: ShieldCheck,
    title: "Action",
    body: "Enables investigation, verification and corrective measures.",
  },
];

function HowItWorks() {
  return (
    <section id="features" className="bg-[image:var(--gradient-hero)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Heading */}
        <motion.div
          className="max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] text-primary"
          >
            HOW IT WORKS
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold text-primary-deep"
          >
            From Data to Action
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-muted-foreground"
          >
            We analyze MPLADS project data using advanced AI to identify risks,
            generate alerts, and help authorities take timely action.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.li
                key={step.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`${
                  i > 0 ? "lg:border-l lg:border-border lg:pl-6" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary-deep">
                    0{i + 1}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-4 text-md font-bold text-primary-deep">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}

export default HowItWorks;