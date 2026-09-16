
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, Landmark } from "lucide-react";

import {
  cardVariant,
  containerVariant,
  itemVariant,
} from "../utils/authMotion";

import api from "../api/axios";

const ROLES = ["MP", "District", "State", "Agency"];

const AGENCY_TYPES = [
  "Public Works Department",
  "Municipal Corporation",
  "Panchayati Raj Institution",
  "Rural Development Agency",
  "Other Government Agency",
];

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("MP");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",

    constituency: "",
    designation: "",

    agencyName: "",
    agencyType: "",

    district: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,

        agency_name:
          role === "Agency" ? formData.agencyName : null,

        agency_type:
          role === "Agency" ? formData.agencyType : null,

        parliamentry_constituency:
          role === "MP" ? formData.constituency : null,

        designation:
          role === "District" || role === "State"
            ? formData.designation
            : null,

        district:
          role === "District" || role === "Agency"
            ? formData.district
            : null,

        state: formData.state,
      };

      console.log("Sending signup payload:", payload);

      const response = await api.post("/auth/signup", payload);

      console.log("Signup response:", response.data);

      setSuccess(
        "Registration successful. Your account is pending verification."
      );

      // Optional: redirect after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            "Registration failed."
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Make sure the backend is running."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-surface-tint md:bg-primary-deep font-sans">

      <img
        src="/images/image.png"
        alt="Parliament House of India"
        className="absolute inset-0 hidden h-full w-full object-cover object-center opacity-90 md:block"
      />

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

            {/* Name */}

            <motion.div variants={itemVariant}>
              <Field
                id="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </motion.div>

            {/* Email */}

            <motion.div variants={itemVariant}>
              <Field
                id="email"
                label="Official Email"
                type="email"
                placeholder="name@gov.in"
                value={formData.email}
                onChange={handleChange}
              />
            </motion.div>

            {/* MP */}

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
                  value={formData.constituency}
                  onChange={handleChange}
                />
              </motion.div>
            )}

            {/* District */}

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
                  value={formData.district}
                  onChange={handleChange}
                />

                <Field
                  id="designation"
                  label="Designation"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleChange}
                />

              </motion.div>
            )}

            {/* State */}

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
                  value={formData.designation}
                  onChange={handleChange}
                />
              </motion.div>
            )}

            {/* Agency */}

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
                  value={formData.agencyName}
                  onChange={handleChange}
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
                    value={formData.agencyType}
                    onChange={handleChange}
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
                  id="district"
                  label="District"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={handleChange}
                />

              </motion.div>
            )}

            {/* State */}

            <motion.div variants={itemVariant}>
              <Field
                id="state"
                label="State"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
              />
            </motion.div>

            {/* Password */}

            <motion.div variants={itemVariant}>
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </motion.div>

            {/* Confirm Password */}

            <motion.div variants={itemVariant}>
              <Field
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </motion.div>

            {/* Error */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* Account Status */}

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

            {/* Submit */}

            <motion.button
              variants={itemVariant}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-deep text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? "Submitting..." : "Submit Request"}

              {!loading && (
                <ArrowRight className="h-4 w-4" />
              )}

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

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
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
        value={value}
        onChange={onChange}
        required
        className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary-deep focus:ring-1 focus:ring-primary-deep"
      />

    </div>
  );
}

export default Register;

