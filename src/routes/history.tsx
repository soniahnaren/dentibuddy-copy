import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { api } from "@/lib/api";
import { Calendar, Clock, MapPin, History } from "lucide-react";

export const Route = createFileRoute("/history")({
  component: PatientHistoryPage,
  ssr: false,
});

interface Appt {
  id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  children: { name: string; avatar_emoji: string } | null;
  dentists: { name: string; clinic_name: string; city: string } | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-sunshine/20 text-yellow-700',
  confirmed: 'bg-mint text-mint-foreground',
  cancelled: 'bg-destructive/10 text-destructive',
  completed: 'bg-primary/10 text-primary',
};

const STATUS_LABELS: Record<string, string> = {
  pending:   'Awaiting Acceptance',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

function PatientHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const { data: history = [], isLoading } = useQuery<Appt[]>({
    queryKey: ['patient-history'],
    queryFn: () => api.get('/patient/history'),
  });

  const filtered = filter === 'all' ? history : history.filter(a => a.status === filter);
  const counts = {
    confirmed: history.filter(a => a.status === 'confirmed').length,
    completed: history.filter(a => a.status === 'completed').length,
    cancelled: history.filter(a => a.status === 'cancelled').length,
  };

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader title="Visit History" subtitle="All your past and upcoming dental visits" />

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {([
            { label: 'Upcoming', count: counts.confirmed, bg: 'bg-mint/20', color: 'text-mint-foreground' },
            { label: 'Completed', count: counts.completed, bg: 'bg-primary/10', color: 'text-primary' },
            { label: 'Cancelled', count: counts.cancelled, bg: 'bg-destructive/10', color: 'text-destructive' },
          ] as const).map(s => (
            <div key={s.label} className={`rounded-2xl ${s.bg} px-4 py-3 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {(['all', 'confirmed', 'completed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? `All (${history.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f as keyof typeof counts]})`}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-16">Loading history…</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <History className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No visits found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((a) => (
              <div key={a.id} className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-xl shrink-0">
                      {a.children?.avatar_emoji ?? '🧒'}
                    </div>
                    <div>
                      <p className="font-semibold">{a.children?.name ?? 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {a.dentists?.name ?? '—'} · {a.dentists?.clinic_name}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold uppercase px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLORS[a.status]}`}>
                    {STATUS_LABELS[a.status] ?? a.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {a.appointment_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {a.appointment_time}
                  </span>
                </div>

                {a.reason && (
                  <p className="text-sm text-muted-foreground bg-muted rounded-xl px-3 py-2 mt-3">
                    {a.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
