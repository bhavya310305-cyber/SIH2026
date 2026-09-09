import {
  ArrowRight,
  Clock,
  Copy,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

const AI_FEATURES = [
  { icon: ShieldCheck, label: "Fraud Detection" },
  { icon: Clock, label: "Delay Alerts" },
  { icon: Copy, label: "Duplicate Work Check" },
  { icon: TrendingUp, label: "Cost Overrun Analysis" },
  { icon: MapPin, label: "Geo-tagged Verification" },
];

function ExplainableAI() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] text-primary"
          >
            AI THAT BRINGS TRANSPARENCY
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-bold leading-tight text-primary-deep"
          >
            Smarter Insights.
            <br />
            Greater Impact.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
          >
            Our AI detects irregularities, highlights high-risk projects and
            provides clear, explainable reasons for every alert.
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
          >
            {AI_FEATURES.map((f) => (
              <motion.li
                key={f.label}
                variants={fadeUp}
                className="flex items-center gap-2 text-xs font-medium text-primary-deep"
              >
                <f.icon className="h-4 w-4 text-primary" />
                {f.label}
              </motion.li>
            ))}
          </motion.ul>

          <motion.a
            variants={fadeUp}
            href="#features"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-success px-6 py-3 text-sm font-semibold text-success-foreground transition-opacity hover:opacity-90"
          >
            Explore Features
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default ExplainableAI;