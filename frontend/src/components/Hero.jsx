import {
  ArrowRight,
  MapPin,
  PlayCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

const HERO_FEATURES = [
  {
    icon: MapPin,
    a: "AI-Driven Insights",
    b: "& Risk Detection",
  },
  {
    icon: TrendingUp,
    a: "Real-time Analytics",
    b: "& Dashboards",
  },
  {
    icon: MapPin,
    a: "Geo-tagged Evidence",
    b: "& Verification",
  },
  {
    icon: Users,
    a: "Role-based Access",
    b: "& Governance",
  },
];

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white h-[calc(100vh-80px)] flex items-center"
    >
      {/* Background Parliament Image */}
      <img
        src="/images/parliamentThird.jpg"
        alt="Parliament House of India"
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-right lg:w-3/4"
      />

      {/* Left Gradient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_92%,transparent)_38%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl w-full px-6 py-6 lg:py-8 lg:mb-2">
        {/* Quote (Optional) */}
        {/* 
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="ml-auto hidden w-fit rounded-lg bg-white/80 px-4 py-2 text-right text-sm italic leading-relaxed text-[#0B3D66] shadow-lg backdrop-blur lg:block"
        >
          "Better Data.
          <br />
          Better Decisions.
          <br />
          A Stronger India."
        </motion.p>
        */}

        {/* Left Content */}
        <motion.div
          className="max-w-2xl"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase"
          >
            AI + DATA + GOVERNANCE
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-2 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[#0F172A]"
          >
            Smarter Monitoring.
            <br />
            Stronger Public Infrastructure.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
          >
            An AI-powered platform to detect anomalies, fraud, delays and
            inefficiencies in MPLADS projects — ensuring every rupee builds a
            better tomorrow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-md bg-[#0B3D66] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#082F4D]"
            >
              Explore Platform
              <ArrowRight size={16} />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-md border border-[#0B3D66] bg-white px-6 py-3 text-sm font-semibold text-[#0B3D66] transition hover:bg-blue-50"
            >
              <PlayCircle size={16} />
              Learn More
            </a>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            variants={staggerContainer}
            className="mt-16 grid gap-5 sm:grid-cols-2"
          >
            {HERO_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.a}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                    <Icon size={18} className="text-emerald-600" />
                  </div>

                  <div className="text-md leading-snug">
                    <p className="font-semibold text-[#0F172A]">
                      {feature.a}
                    </p>
                    <p className="text-gray-500">{feature.b}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;