import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Clock, User, CheckCircle, XCircle, ClipboardList, ThumbsUp } from "lucide-react";

export const Route = createFileRoute("/doctor")({
  component: DoctorPage,
  ssr: false,
});

interface DoctorAppt {
  id: string;
  parent: { id: string; full_name: string; email: string } | null;
  child: { name: string; avatar_emoji: string; date_of_birth: string | null } | null;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  is_emergency?: boolean;
  created_at: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: 'bg-sunshine/20',      text: 'text-yellow-700',  label: 'Pending Acceptance' },
  confirmed: { bg: 'bg-mint/20',          text: 'text-mint-foreground', label: 'Confirmed' },
  completed: { bg: 'bg-primary/10',       text: 'text-primary',     label: 'Completed' },
  cancelled: { bg: 'bg-destructive/10',   text: 'text-destructive', label: 'Cancelled' },
};

function DoctorPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('pending');

  useEffect(() => {
    if (user && user.role !== 'doctor') navigate({ to: '/home' });
  }, [user, navigate]);

  const { data: profile } = useQuery({
    queryKey: ['doctor-profile'],
    queryFn: () => api.get('/doctor/profile'),
    enabled: user?.role === 'doctor',
  });

  const { data: appointments = [], isLoading } = useQuery<DoctorAppt[]>({
    queryKey: ['doctor-appointments'],
    queryFn: () => api.get('/doctor/appointments'),
    enabled: user?.role === 'doctor',
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/doctor/appointments/${id}`, { status }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['doctor-appointments'] });
      const msgs: Record<string, string> = { confirmed: 'Appointment accepted', completed: 'Marked as completed', cancelled: 'Appointment cancelled' };
      toast.success(msgs[vars.status] ?? 'Updated');
    },
    onError: (e: any) => toast.error(e.message ?? 'Failed to update'),
  });

  const counts = {
    pending:   appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  const tabs = [
    { key: 'pending' as const,   label: 'Pending',   count: counts.pending,   dot: true },
    { key: 'confirmed' as const, label: 'Confirmed', count: counts.confirmed, dot: false },
    { key: 'completed' as const, label: 'Completed', count: counts.completed, dot: false },
    { key: 'cancelled' as const, label: 'Cancelled', count: counts.cancelled, dot: false },
    { key: 'all' as const,       label: 'All',       count: appointments.length, dot: false },
  ];

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader
          title="My Appointments"
          subtitle={(profile as any)?.clinic_name ? `${(profile as any).name} · ${(profile as any).clinic_name}` : 'Doctor Dashboard'}
        />

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {([
            { label: 'Pending',   count: counts.pending,   bg: 'bg-sunshine/20',    color: 'text-yellow-700' },
            { label: 'Confirmed', count: counts.confirmed, bg: 'bg-mint/20',         color: 'text-mint-foreground' },
            { label: 'Completed', count: counts.completed, bg: 'bg-primary/10',      color: 'text-primary' },
            { label: 'Cancelled', count: counts.cancelled, bg: 'bg-destructive/10',  color: 'text-destructive' },
          ] as const).map(s => (
            <div key={s.label} className={`rounded-2xl ${s.bg} px-3 py-3 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                filter === t.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.dot && t.count > 0 && (
                <span className="h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
              )}
              {t.label} ({t.count})
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-16">Loading appointments…</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <ClipboardList className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No appointments in this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((a) => {
              const style = STATUS_STYLES[a.status];
              return (
                <div key={a.id} className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-xl shrink-0">
                        {a.child?.avatar_emoji ?? '🧒'}
                      </div>
                      <div>
                        <p className="font-semibold">{a.child?.name ?? 'Unknown patient'}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <User className="h-3 w-3" /> {a.parent?.full_name ?? a.parent?.email ?? '—'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {a.is_emergency && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-coral/20 text-coral">
                          🚨 Emergency
                        </span>
                      )}
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {a.appointment_date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {a.appointment_time}
                    </span>
                  </div>

                  {a.reason && (
                    <p className="text-sm text-muted-foreground bg-muted rounded-xl px-3 py-2 mb-3">
                      {a.reason}
                    </p>
                  )}

                  {/* Action buttons based on current status */}
                  {a.status === 'pending' && (
                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Button
                        size="sm"
                        className="flex-1 rounded-xl gap-1.5"
                        onClick={() => statusMutation.mutate({ id: a.id, status: 'confirmed' })}
                        disabled={statusMutation.isPending}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => statusMutation.mutate({ id: a.id, status: 'cancelled' })}
                        disabled={statusMutation.isPending}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Decline
                      </Button>
                    </div>
                  )}

                  {a.status === 'confirmed' && (
                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Button
                        size="sm"
                        className="flex-1 rounded-xl gap-1.5"
                        onClick={() => statusMutation.mutate({ id: a.id, status: 'completed' })}
                        disabled={statusMutation.isPending}
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Mark Completed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 rounded-xl gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => statusMutation.mutate({ id: a.id, status: 'cancelled' })}
                        disabled={statusMutation.isPending}
                      >
                        <XCircle className="h-3.5 w-3.5" /> Cancel
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
