import { X, Mail, MapPin, Landmark, ShieldCheck } from "lucide-react";

export default function ProfileDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-card shadow-2xl border-l border-border animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-primary-deep">
              My Profile
            </h2>
            <p className="text-sm text-muted-foreground">
              Official Member Profile
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-accent transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Identity */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-deep text-3xl font-bold text-white shadow-md">
              RS
            </div>

            <h3 className="mt-4 text-2xl font-bold text-primary-deep">
              Rahul Sharma
            </h3>

            <div className="mt-2 flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">
              <ShieldCheck size={16} className="text-green-700" />
              <span className="text-xs font-semibold text-green-700">
                Verified MP
              </span>
            </div>
          </div>

          {/* Information Card */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <InfoRow
              icon={<Landmark size={18} className="text-primary" />}
              label="Parliamentary Constituency"
              value="Nagpur"
            />

            <InfoRow
              icon={<MapPin size={18} className="text-primary" />}
              label="State"
              value="Maharashtra"
            />

            {/* <InfoRow
              icon={<Landmark size={18} className="text-primary" />}
              label="Lok Sabha Term"
              value="2024 – 2029"
            /> */}

            <InfoRow
              icon={<Mail size={18} className="text-primary" />}
              label="Official Email"
              value="rahul.sharma@gov.in"
              last
            />
          </div>

          {/* About MPLADS */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <h4 className="text-sm font-bold text-primary-deep">
              MPLADS Access
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              You are authorized to monitor MPLADS projects, constituency
              development, and AI-generated risk insights for
              your parliamentary constituency.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon, label, value, last = false }) {
  return (
    <div
      className={`flex items-start gap-3 px-5 py-4 ${
        !last ? "border-b border-border" : ""
      }`}
    >
      <div className="mt-0.5">{icon}</div>

      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold text-primary-deep">
          {value}
        </p>
      </div>
    </div>
  );
}