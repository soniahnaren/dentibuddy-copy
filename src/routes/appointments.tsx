import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { api } from "@/lib/api";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/appointments")({
  component: AppointmentsPage,
  ssr: false,
});

function AppointmentsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["appointments", user?.id],
    enabled: !!user,
    queryFn: () => api.get<any[]>("/appointments"),
  });

  const cancel = useMutation({
    mutationFn: (id: string) => api.patch(`/appointments/${id}`, { status: "cancelled" }),
    onSuccess: () => {
      toast.success("Visit cancelled");
      qc.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = data.filter((a: any) => a.appointment_date >= today && a.status !== "cancelled" && a.status !== "completed");
  const past = data.filter((a: any) => a.appointment_date < today || a.status === "cancelled" || a.status === "completed");

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader title="Visits" subtitle="Your booked dental appointments" />

        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center max-w-md mx-auto">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-xl font-semibold">No visits yet</p>
            <p className="text-muted-foreground mt-2">Book your child's first dental check-up.</p>
            <Button asChild className="mt-6 rounded-2xl">
              <Link to="/dentists">Find a dentist</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">
                Upcoming · {upcoming.length}
              </h2>
              {upcoming.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-sm">No upcoming visits</p>
                  <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                    <Link to="/dentists">Book one now</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((a: any) => (
                    <ApptCard key={a.id} appt={a} onCancel={() => cancel.mutate(a.id)} cancellable />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">
                Past &amp; cancelled · {past.length}
              </h2>
              {past.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                  <p className="text-sm">No past visits yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {past.map((a: any) => <ApptCard key={a.id} appt={a} />)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function ApptCard({ appt, onCancel, cancellable }: { appt: any; onCancel?: () => void; cancellable?: boolean }) {
  const cancelled = appt.status === "cancelled";
  return (
    <div className={`rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] ${cancelled ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shrink-0">
          {appt.children?.avatar_emoji ?? "🧒"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{appt.children?.name} · {appt.dentists?.name}</p>
          <p className="text-sm text-muted-foreground truncate">{appt.dentists?.clinic_name}, {appt.dentists?.city}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {new Date(appt.appointment_date).toDateString()}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {appt.appointment_time?.slice(0, 5)}
            </span>
          </div>
          {appt.reason && <p className="mt-1.5 text-sm text-muted-foreground italic">"{appt.reason}"</p>}
        </div>
        {cancellable && (
          <button onClick={onCancel} aria-label="Cancel" className="text-muted-foreground hover:text-destructive transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`text-xs uppercase font-bold rounded-full px-3 py-1 ${
          appt.status === "cancelled"  ? "bg-destructive/10 text-destructive" :
          appt.status === "pending"    ? "bg-sunshine/20 text-yellow-700" :
          appt.status === "completed"  ? "bg-primary/10 text-primary" :
                                         "bg-mint text-mint-foreground"
        }`}>
          {appt.status === "pending" ? "Awaiting doctor acceptance" : appt.status}
        </span>
        {appt.is_emergency && (
          <span className="text-xs uppercase font-bold rounded-full px-3 py-1 bg-coral/20 text-coral flex items-center gap-1">
            🚨 Emergency Priority
          </span>
        )}
      </div>
    </div>
  );
}
