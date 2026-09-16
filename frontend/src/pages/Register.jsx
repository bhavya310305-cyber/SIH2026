import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Landmark,
} from "lucide-react";

import {
  cardVariant,
  containerVariant,
  itemVariant,
} from "../utils/authMotion";

/*
 * Current platform roles.
 *
 * Implementing Agency has been removed because
 * there is no separate IA dashboard in the prototype.
 */
const ROLES = [
  "MP",
  "Ministry",
  "District",
  "State",
];

function Register() {
  const [role, setRole] = useState("MP");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend integration later
  };

  return (
    <main
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-surface-tint
        font-sans

        md:bg-primary-deep
      "
    >
      {/* Background Image */}
      <img
        src="/images/image.png"
        alt="Parliament House of India"
        className="
          absolute
          inset-0
          hidden
          h-full
          w-full
          object-cover
          object-center
          opacity-90

          md:block
        "
      />

      {/* Back Button */}
      <Link
        to="/"
        className="
          absolute
          left-6
          top-6
          z-20
          inline-flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-white
          transition

          hover:text-gray-200
        "
      >
        <ArrowLeft className="h-4 w-4" />

        Back to Home
      </Link>

      {/* Page Container */}
      <div
        className="
          relative
          flex
          h-screen
          items-center
          justify-center
          px-4
          py-6
        "
      >
        <motion.section
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="
            flex
            h-[88vh]
            w-full
            max-w-[450px]
            flex-col
            overflow-hidden
            rounded-[20px]
            border
            border-white/40
            bg-white/90
            p-6
            shadow-[var(--shadow-card)]
            backdrop-blur-[10px]
          "
        >
          {/* =====================================================
              HEADER
          ====================================================== */}
          <div
            className="
              shrink-0
              px-6
              pb-4
              pt-2
              text-center
            "
          >
            <span
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-accent
                text-primary-deep
              "
            >
              <Landmark className="h-6 w-6" />
            </span>

            <p
              className="
                mt-4
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-muted-foreground
              "
            >
              MPLADS AI Monitoring Platform
            </p>

            <h1
              className="
                mt-2
                text-2xl
                font-extrabold
                text-primary-deep
              "
            >
              Request Official Access
            </h1>

            <p
              className="
                mt-2
                text-sm
                text-muted-foreground
              "
            >
              Applications are reviewed before account activation.
            </p>
          </div>

          {/* =====================================================
              ROLE SELECTOR
          ====================================================== */}
          <motion.div
            variants={itemVariant}
            initial="hidden"
            animate="visible"
            className="
              grid
              shrink-0
              grid-cols-4
              gap-1
              rounded-lg
              border
              border-border
              bg-card
              p-1
            "
          >
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`
                  h-9
                  rounded-md
                  text-xs
                  font-semibold
                  transition-all
                  duration-200

                  ${
                    role === r
                      ? "bg-primary-deep text-primary-foreground shadow-sm"
                      : "bg-card text-muted-foreground hover:text-primary-deep"
                  }
                `}
              >
                {r}
              </button>
            ))}
          </motion.div>

          {/* =====================================================
              SCROLLABLE FORM ONLY
          ====================================================== */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="
              mt-5
              min-h-0
              flex-1
              space-y-5
              overflow-y-auto
              pr-2

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-gray-300
            "
          >
            {/* Full Name */}
            <motion.div variants={itemVariant}>
              <Field
                id="fullName"
                label="Full Name"
                placeholder="Enter your full name"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariant}>
              <Field
                id="email"
                label="Official Email"
                type="email"
                placeholder="name@gov.in"
              />
            </motion.div>

            {/* ===================================================
                MP FIELDS
            ==================================================== */}
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

            {/* ===================================================
                DISTRICT AUTHORITY FIELDS
            ==================================================== */}
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

            {/* ===================================================
                STATE AUTHORITY FIELDS
            ==================================================== */}
            {role === "State" && (
              <motion.div
                key="stateRole"
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

            {/* State */}
            <motion.div variants={itemVariant}>
              <Field
                id="state"
                label="State"
                placeholder="Enter state"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariant}>
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="Create a password"
              />
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariant}>
              <Field
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
              />
            </motion.div>

            {/* Verification Information */}
            <motion.div variants={itemVariant}>
              <div
                className="
                  flex
                  gap-3
                  rounded-lg
                  border
                  border-primary/20
                  bg-accent
                  p-4
                "
              >
                <Info
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-primary
                  "
                />

                <p
                  className="
                    text-xs
                    leading-relaxed
                    text-primary-deep
                  "
                >
                  <span className="font-semibold">
                    Account Status: Pending Verification
                  </span>

                  <br />

                  Your application will be reviewed by the appropriate
                  authority before access is granted.
                </p>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={itemVariant}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              className="
                inline-flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-primary-deep
                text-sm
                font-semibold
                text-primary-foreground
                transition-colors

                hover:bg-primary
              "
            >
              Submit Request

              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.form>

          {/* =====================================================
              FOOTER
          ====================================================== */}
          <div
            className="
              shrink-0
              border-t
              border-border/60
              bg-white/30
              pt-4
            "
          >
            <p
              className="
                text-center
                text-sm
                text-muted-foreground
              "
            >
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  font-semibold
                  text-primary

                  hover:underline
                "
              >
                Official Login
              </Link>
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-primary-deep
        "
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-lg
          border
          border-border
          bg-card
          px-3
          text-sm
          text-foreground
          outline-none

          placeholder:text-muted-foreground

          focus:border-primary-deep
          focus:ring-1
          focus:ring-primary-deep
        "
      />
    </div>
  );
}

export default Register;