import { Landmark } from "lucide-react";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

export default function WelcomeSection() {
    return (
        <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-6 bg-[linear-gradient(135deg,var(--primary-deep)_0%,var(--primary)_130%)]">
            <div className="relative z-10">
                <p className="text-[13px] font-medium text-primary-foreground/70">{getGreeting()}</p>
                <h1 className="mt-1 text-2xl sm:text-[28px] font-bold text-primary-foreground leading-tight">
                    Hon. Rahul Sharma
                </h1>
                <p className="mt-1.5 text-[13px] text-primary-foreground/80">
                    Nagpur Parliamentary Constituency &nbsp;·&nbsp; Maharashtra
                </p>
                <span className="mt-4 inline-flex items-center rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold text-primary-foreground/90 backdrop-blur-sm">
                    Financial Year 2026–27
                </span>
            </div>

            <div className="relative z-10 hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-foreground/25 bg-primary-foreground/10 backdrop-blur-sm">
                <Landmark size={26} className="text-primary-foreground" strokeWidth={1.8} />
            </div>

            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
            <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-primary-foreground/5" />
        </div>
    );
}