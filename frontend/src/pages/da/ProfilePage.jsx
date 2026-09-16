import IDALayout from "../../components/da/DALayout";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  const fields = [
    { icon: Building2, label: "Agency", value: "Rural Works Division" },
    {
      icon: MapPin,
      label: "Districts Covered",
      value: "Araria, Pali, Sitamarhi, Purnia, Gaya",
    },
    {
      icon: Mail,
      label: "Official Email",
      value: "r.sharma@ruralworks.gov.in",
    },
    { icon: Phone, label: "Phone", value: "+91 98XXXXXX10" },
  ];

  return (
    <IDALayout>
      <div className="flex flex-col gap-6 max-w-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-deep">Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your registered agency and contact details.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4 border-b border-border pb-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-deep text-primary-foreground font-bold text-lg">
              RS
            </div>
            <div>
              <p className="text-base font-bold text-primary-deep">
                Executive Engineer, R. Sharma
              </p>
              <p className="text-xs text-muted-foreground">
                Implementing Agency Official
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {fields.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon
                    size={15}
                    className="text-primary"
                    strokeWidth={1.8}
                  />
                </span>
                <div>
                  <p className="text-[11px] text-muted-foreground">{f.label}</p>
                  <p className="text-sm font-medium text-primary-deep">
                    {f.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IDALayout>
  );
}
