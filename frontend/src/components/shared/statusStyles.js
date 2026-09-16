export const STATUS_STYLES = {
    NOT_STARTED: { bg: "bg-muted-foreground/10", text: "text-muted-foreground", label: "Not Started" },
    ONGOING: { bg: "bg-primary/10", text: "text-primary", label: "Ongoing" },
    COMPLETED: { bg: "bg-success/10", text: "text-success", label: "Completed" },
    ON_HOLD: { bg: "bg-saffron/10", text: "text-saffron", label: "On Hold" },
    CANCELLED: { bg: "bg-destructive/10", text: "text-destructive", label: "Cancelled" },
};

export const FLAG_STYLES = {
    DELAYED: { bg: "bg-saffron/10", text: "text-saffron", label: "Delayed" },
    COST_OVERRUN: { bg: "bg-destructive/10", text: "text-destructive", label: "Cost Overrun" },
    PAYMENT_AHEAD: { bg: "bg-destructive/10", text: "text-destructive", label: "Payment Ahead" },
    STALLED: { bg: "bg-saffron/10", text: "text-saffron", label: "Stalled" },
};