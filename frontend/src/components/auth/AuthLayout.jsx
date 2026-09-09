import { Link } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Background Image */}
        {/* Full Background */}
{/* Full Background */}
{/* Full Background Image - No Zoom */}
<img
  src="/images/parliment.jpg"
  alt="Parliament of India"
  className="absolute inset-0 h-full w-full object-contain object-center bg-[#E9EEF5] pointer-events-none select-none"
/>

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-primary-deep hover:text-primary transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/88 p-8 shadow-2xl backdrop-blur-lg">
          {/* Header */}
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
              <Landmark className="h-7 w-7 text-primary-deep" />
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
              MPLADS AI Monitoring Platform
            </p>

            <h1 className="mt-2 text-2xl font-extrabold text-primary-deep">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;