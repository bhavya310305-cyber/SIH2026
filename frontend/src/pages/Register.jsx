import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, Landmark } from "lucide-react";

import {
  cardVariant,
  containerVariant,
  itemVariant,
} from "../utils/authMotion";

const ROLES = ["Ministry", "District", "State", "Agency"];

const AGENCY_TYPES = [
  "Public Works Department",
  "Municipal Corporation",
  "Panchayati Raj Institution",
  "Rural Development Agency",
  "Other Government Agency",
];

function Register() {
  const [role, setRole] = useState("MP");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration later
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-surface-tint md:bg-primary-deep font-sans">
      {/* Background Image */}
      <img
        src="/images/image.png"
        alt="Parliament House of India"
        className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-90 md:block"
      />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <motion.section
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[450px] max-h-[88vh] overflow-y-auto rounded-[20px] border border-white/40 bg-white/90 p-6 shadow-[var(--shadow-card)] backdrop-blur-[10px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        >
          {/* Header */}
          <div className="flex flex-col items-center px-6 pt-6 pb-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-deep">
              <Landmark className="h-6 w-6" />
            </span>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              MPLADS AI Monitoring Platform
            </p>

            <h1 className="mt-2 text-2xl font-extrabold text-primary-deep">
              Request Official Access
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Applications are reviewed before account activation.
            </p>
          </div>

          {/* Role Selector */}
          <motion.div
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-4 gap-1 rounded-lg border border-border bg-card p-1"
          >
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`h-9 rounded-md text-xs font-semibold transition-all duration-200 ${
                  role === r
                    ? "bg-primary-deep text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:text-primary-deep"
                }`}
              >
                {r}
              </button>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="mt-6 space-y-5"
          >
            <motion.div variants={itemVariant}>
              <Field
                id="fullName"
                label="Full Name"
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <Field
                id="email"
                label="Official Email"
                type="email"
                placeholder="name@gov.in"
              />
            </motion.div>

            {role === "MP" && (
              <motion.div
                key="mp"
                variants={itemVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Field
                  id="constituency"
                  label="Parliamentary Constituency"
                  placeholder="Enter constituency"
                />
              </motion.div>
            )}

            {role === "District" && (
              <motion.div
                key="district"
                variants={itemVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-5"
              >
                <Field
                  id="district"
                  label="District"
                  placeholder="Enter district"
                />

                <Field
                  id="designation"
                  label="Designation"
                  placeholder="Enter designation"
                />
              </motion.div>
            )}

            {role === "State" && (
              <motion.div
                key="state"
                variants={itemVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Field
                  id="designation"
                  label="Designation"
                  placeholder="Enter designation"
                />
              </motion.div>
            )}

            {role === "Agency" && (
              <motion.div
                key="agency"
                variants={itemVariant}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-5"
              >
                <Field
                  id="agencyName"
                  label="Agency Name"
                  placeholder="Enter agency name"
                />

                <div>
                  <label
                    htmlFor="agencyType"
                    className="mb-2 block text-sm font-semibold text-primary-deep"
                  >
                    Agency Type
                  </label>

                  <select
                    id="agencyType"
                    defaultValue=""
                    className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary-deep focus:ring-1 focus:ring-primary-deep"
                  >
                    <option value="" disabled>
                      Select agency type
                    </option>

                    {AGENCY_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  id="agencyDistrict"
                  label="District"
                  placeholder="Enter district"
                />
              </motion.div>
            )}

            <motion.div variants={itemVariant}>
              <Field
                id="state"
                label="State"
                placeholder="Enter state"
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="Create a password"
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <Field
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
              />
            </motion.div>

            <motion.div variants={itemVariant}>
              <div className="flex gap-3 rounded-lg border border-primary/20 bg-accent p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <p className="text-xs leading-relaxed text-primary-deep">
                  <span className="font-semibold">
                    Account Status: Pending Verification
                  </span>
                  <br />
                  Your application will be reviewed by the Ministry or State
                  Nodal Authority before access is granted.
                </p>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariant}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-deep text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary"
            >
              Submit Request
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:underline"
            >
              Official Login
            </Link>
          </p>
        </motion.section>
      </div>
    </main>
  );
}

function Field({ id, label, type = "text", placeholder }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-primary-deep"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary-deep focus:ring-1 focus:ring-primary-deep"
      />
    </div>
  );
}

export default Register;