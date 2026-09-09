import {
  ArrowRight,
  Building2,
  MapPin,
  ShieldAlert,
  UserRound,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

const STAKEHOLDERS = [
  {
    icon: Building2,
    title: "Ministry (MoSPI)",
    body: "National analytics, state comparison, policy insights.",
    head: "bg-primary-deep",
    link: "text-primary",
  },
  {
    icon: MapPin,
    title: "State Nodal Authority",
    body: "District monitoring, risk heatmap, inspection planning.",
    head: "bg-success",
    link: "text-success",
  },
  {
    icon: ShieldAlert,
    title: "District Authority",
    body: "Investigate alerts, verify projects, take corrective action.",
    head: "bg-saffron",
    link: "text-saffron",
  },
  {
    icon: UserRound,
    title: "Member of Parliament",
    body: "Track recommended works, fund utilization, progress updates.",
    head: "bg-violet",
    link: "text-violet",
  },
  {
    icon: Users,
    title: "Implementing Agency",
    body: "Upload data, progress reports, geo-tagged photos, bills.",
    head: "bg-teal",
    link: "text-teal",
  },
];

function Stakeholders() {
  return (
    <section id="stakeholders" className="bg-surface-tint">
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
            FOR A TRANSPARENT TOMORROW
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-extrabold leading-tight text-primary-deep"
          >
            Built for Every
            <br />
            Stakeholder
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-muted-foreground"
          >
            Role-based access ensures the right information reaches the right
            people — from national oversight to local execution.
          </motion.p>

          <motion.a
            variants={fadeUp}
            href="#about"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            Know More
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5"
        >
          {STAKEHOLDERS.map((stakeholder) => {
            const Icon = stakeholder.icon;

            return (
              <motion.article
                key={stakeholder.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]"
              >
                {/* Colored Header */}
                <div
                  className={`flex h-36 items-center justify-center ${stakeholder.head}`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-card/20"
                  >
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </motion.span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-primary-deep">
                    {stakeholder.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {stakeholder.body}
                  </p>

                  <a
                    href="#about"
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${stakeholder.link}`}
                  >
                    View Details
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Stakeholders;