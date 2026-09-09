import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Landmark,
  Lock,
  Mail,
} from "lucide-react";

import {
  cardVariant,
  containerVariant,
  itemVariant,
} from "../utils/authMotion";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration later
  };

  return (
    <main className="relative min-h-screen bg-surface-tint md:bg-primary-deep overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/image.png"
        alt="Parliament House of India"
        className="hidden md:block absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm font-semibold text-primary-deep md:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Login Card */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <motion.section
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[450px] rounded-none bg-transparent p-6 shadow-none md:rounded-[20px] md:border md:border-white/40 md:bg-white/90 md:shadow-[var(--shadow-card)] md:backdrop-blur-[10px]"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-deep">
              <Landmark className="h-6 w-6" />
            </span>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              MPLADS AI Monitoring Platform
            </p>

            <h1 className="mt-2 text-2xl font-extrabold text-primary-deep">
              Official Login
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in using your verified official account.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="mt-8 space-y-5"
          >
            <motion.div variants={itemVariant}>
              <Field
                id="email"
                label="Official Email"
                type="email"
                placeholder="name@gov.in"
                icon={Mail}
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
              />
            </motion.div>

            <motion.button
              variants={itemVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-deep text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New official?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Request Access
            </Link>
          </p>
        </motion.section>
      </div>
    </main>
  );
}

function Field({ id, label, type, placeholder, icon: Icon }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-primary-deep"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="h-12 w-full rounded-lg border border-border bg-card pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary-deep focus:ring-1 focus:ring-primary-deep"
        />
      </div>
    </div>
  );
}

export default Login;