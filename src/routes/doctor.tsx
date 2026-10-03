import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar, User, XCircle, ThumbsUp, Users, Stethoscope, RefreshCw, Siren, TrendingUp, TrendingDown, Minus, AlertCircle, CalendarClock, Search } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/doctor")({
  component: DoctorPage,
  ssr: false,
});

interface DoctorAppt {
  id: string;
  parent: { id: string; full_name: string; email: string } | null;
  child: { id: string; name: string; avatar_emoji: string; date_of_birth: string | null } | null;
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
  const [patientSearch, setPatientSearch] = useState('');

  useEffect(() => {
    if (user && user.role !== 'doctor') navigate({ to: '/home' });
  }, [user, navigate]);

  const { data: profile } = useQuery({
    queryKey: ['doctor-profile'],
    queryFn: () => api.get('/doctor/profile'),
    enabled: user?.role === 'doctor',
  });

  const { data: appointments = [] } = useQuery<DoctorAppt[]>({
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

  // ── Dashboard metrics derived from this doctor's appointments ──
  const isoDay = (d: Date) => d.toISOString().slice(0, 10);
  const today = isoDay(new Date());
  const yesterday = isoDay(new Date(Date.now() - 864e5));

  const activeOn = (iso: string) => appointments.filter(a => a.appointment_date === iso && a.status !== 'cancelled').length;
  const todaysCount = activeOn(today);
  const todayDelta = todaysCount - activeOn(yesterday);

  const stats = {
    totalPatients: new Set(
      appointments.map(a => a.child?.id ?? a.child?.name).filter(Boolean)
    ).size,
    todaysAppointments: todaysCount,
    treatmentsScheduled: appointments.filter(a => a.status === 'confirmed' && a.appointment_date >= today).length,
    followUpsDue: appointments.filter(a => a.status === 'completed').length,
    urgentCases: appointments.filter(a => a.is_emergency && (a.status === 'pending' || a.status === 'confirmed')).length,
  };

  const trendLabel =
    todayDelta === 0 ? 'same as yesterday'
    : todayDelta > 0 ? `+${todayDelta} vs yesterday`
    : `${todayDelta} vs yesterday`;

  const statCards = [
    { label: 'Total patients',       value: stats.totalPatients,       icon: Users,       bg: 'bg-primary/10',  color: 'text-primary',         sub: 'unique seen',       trend: 0 },
    { label: "Today's appointments", value: stats.todaysAppointments,  icon: Calendar,    bg: 'bg-mint/20',     color: 'text-mint-foreground', sub: trendLabel,          trend: todayDelta },
    { label: 'Treatments scheduled', value: stats.treatmentsScheduled, icon: Stethoscope, bg: 'bg-secondary',   color: 'text-primary',         sub: 'confirmed upcoming', trend: 0 },
    { label: 'Follow-ups due',       value: stats.followUpsDue,        icon: RefreshCw,   bg: 'bg-sunshine/20', color: 'text-yellow-700',      sub: 'completed visits',  trend: 0 },
    { label: 'Urgent cases',         value: stats.urgentCases,         icon: Siren,       bg: 'bg-coral/20',    color: 'text-coral',           sub: 'need triage',       trend: 0 },
  ] as const;

  // Appointments per day for the last 7 days (excludes cancelled).
  const weekSeries = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 864e5);
    const iso = isoDay(d);
    return {
      day: d.toLocaleDateString(undefined, { weekday: 'short' }),
      count: activeOn(iso),
      isToday: iso === today,
    };
  });

  // Status breakdown for the donut (only non-zero slices).
  const statusData = [
    { name: 'Pending',   value: counts.pending,   color: 'var(--sunshine)' },
    { name: 'Confirmed', value: counts.confirmed, color: 'var(--primary)' },
    { name: 'Completed', value: counts.completed, color: 'var(--mint)' },
    { name: 'Cancelled', value: counts.cancelled, color: 'var(--coral)' },
  ].filter(d => d.value > 0);

  // Things that need the doctor to act: all pending, plus confirmed emergencies. Emergencies first.
  const needsAttention = appointments
    .filter(a => a.status === 'pending' || (a.is_emergency && a.status === 'confirmed'))
    .sort((a, b) => Number(!!b.is_emergency) - Number(!!a.is_emergency))
    .slice(0, 5);

  // Today's confirmed/pending visits, earliest first.
  const todaySchedule = appointments
    .filter(a => a.appointment_date === today && a.status !== 'cancelled')
    .sort((a, b) => (a.appointment_time || '').localeCompare(b.appointment_time || ''));

  // ── Patient roster — every child ever seen (any status), newest visit first ──
  const ageFromDob = (dob: string | null) =>
    dob ? Math.max(0, new Date().getFullYear() - new Date(dob).getFullYear()) : null;

  const patientMap = new Map<string, {
    id: string; name: string; avatar: string; dob: string | null;
    parentName: string; visits: number; lastVisit: string; lastStatus: DoctorAppt['status'];
  }>();
  for (const a of appointments) {
    const key = a.child?.id ?? a.child?.name;
    if (!key) continue;
    const existing = patientMap.get(key);
    if (!existing) {
      patientMap.set(key, {
        id: key,
        name: a.child?.name ?? 'Patient',
        avatar: a.child?.avatar_emoji ?? '🧒',
        dob: a.child?.date_of_birth ?? null,
        parentName: a.parent?.full_name || a.parent?.email || '—',
        visits: 1,
        lastVisit: a.appointment_date,
        lastStatus: a.status,
      });
    } else {
      existing.visits += 1;
      if (a.appointment_date > existing.lastVisit) {
        existing.lastVisit = a.appointment_date;
        existing.lastStatus = a.status;
      }
    }
  }
  const q = patientSearch.trim().toLowerCase();
  const patients = Array.from(patientMap.values())
    .filter(p => !q || p.name.toLowerCase().includes(q) || p.parentName.toLowerCase().includes(q))
    .sort((a, b) => b.lastVisit.localeCompare(a.lastVisit));

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader
          title="Dashboard"
          subtitle={(profile as any)?.clinic_name ? `${(profile as any).name} · ${(profile as any).clinic_name}` : 'Doctor Dashboard'}
        />

        {/* Dashboard stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {statCards.map(s => {
            const Icon = s.icon;
            const TrendIcon = s.trend > 0 ? TrendingUp : s.trend < 0 ? TrendingDown : Minus;
            const trendColor = s.trend > 0 ? 'text-mint-foreground' : s.trend < 0 ? 'text-coral' : 'text-muted-foreground';
            return (
              <div key={s.label} className="rounded-2xl bg-card border border-border p-4 shadow-[var(--shadow-card)]">
                <div className={`h-9 w-9 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs font-medium text-foreground/80 mt-0.5 leading-tight">{s.label}</p>
                <p className={`text-[11px] mt-1 flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="h-3 w-3 shrink-0" /> {s.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          {/* 7-day appointments bar chart */}
          <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold mb-4">Appointments · last 7 days</h3>
            <div className="h-56 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekSeries} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} width={32} />
                  <RTooltip
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)', fontSize: 13 }}
                    labelStyle={{ fontWeight: 600, color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
                    {weekSeries.map((d, i) => (
                      <Cell key={i} fill={d.isToday ? 'var(--primary)' : 'var(--primary-glow)'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status donut */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold mb-4">Status breakdown</h3>
            {statusData.length === 0 ? (
              <p className="text-sm text-muted-foreground py-16 text-center">No appointments yet.</p>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-40 w-40 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={64} paddingAngle={2} stroke="none">
                        {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <RTooltip
                        contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)', fontSize: 13 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="space-y-2 flex-1 min-w-0">
                  {statusData.map(d => (
                    <li key={d.name} className="flex items-center gap-2 text-sm">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ background: d.color }} />
                      <span className="text-muted-foreground flex-1 truncate">{d.name}</span>
                      <span className="font-semibold">{d.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action panels row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Needs your attention */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 text-coral" />
              <h3 className="font-semibold">Needs your attention</h3>
              {needsAttention.length > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-coral/15 text-coral ml-auto">{needsAttention.length}</span>
              )}
            </div>
            {needsAttention.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">All caught up 🎉</p>
            ) : (
              <div className="space-y-2.5">
                {needsAttention.map(a => (
                  <div key={a.id} className="flex items-center gap-3 rounded-xl bg-muted/50 px-3 py-2.5">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-lg shrink-0">
                      {a.child?.avatar_emoji ?? '🧒'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate flex items-center gap-1.5">
                        {a.child?.name ?? 'Patient'}
                        {a.is_emergency && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-coral/20 text-coral">🚨</span>}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{a.appointment_date} · {a.appointment_time}</p>
                    </div>
                    {a.status === 'pending' ? (
                      <div className="flex gap-1.5 shrink-0">
                        <Button size="sm" className="h-8 rounded-lg px-2.5" onClick={() => statusMutation.mutate({ id: a.id, status: 'confirmed' })} disabled={statusMutation.isPending}>
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 rounded-lg px-2.5 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => statusMutation.mutate({ id: a.id, status: 'cancelled' })} disabled={statusMutation.isPending}>
                          <XCircle className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-mint-foreground shrink-0">Confirmed</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's schedule */}
          <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Today's schedule</h3>
              {todaySchedule.length > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary ml-auto">{todaySchedule.length}</span>
              )}
            </div>
            {todaySchedule.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No visits scheduled today.</p>
            ) : (
              <div className="space-y-2.5">
                {todaySchedule.map(a => (
                  <div key={a.id} className="flex items-center gap-3">
                    <div className="text-sm font-semibold tabular-nums w-14 shrink-0 text-primary">{(a.appointment_time || '').slice(0, 5)}</div>
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-base shrink-0">
                      {a.child?.avatar_emoji ?? '🧒'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{a.child?.name ?? 'Patient'}</p>
                      <p className="text-xs text-muted-foreground truncate">{a.reason || 'Check-up'}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[a.status].bg} ${STATUS_STYLES[a.status].text}`}>
                      {a.status === 'pending' ? 'Pending' : 'Confirmed'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Patients roster ── */}
        <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Patients</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{patientMap.size}</span>
            </div>
            <div className="relative sm:ml-auto sm:w-64">
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Search patient or parent…"
                className="h-10 rounded-xl pl-9 bg-background"
              />
            </div>
          </div>

          {patientMap.size === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No patients yet.</p>
          ) : patients.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No patients match "{patientSearch}".</p>
          ) : (
            <>
              {/* Column headers (desktop) */}
              <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-3 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <span>Patient</span>
                <span>Parent</span>
                <span className="text-center">Visits</span>
                <span className="text-right">Last visit</span>
              </div>
              <div className="divide-y divide-border">
                {patients.map(p => {
                  const age = ageFromDob(p.dob);
                  const st = STATUS_STYLES[p.lastStatus];
                  return (
                    <div key={p.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto_auto] gap-x-4 gap-y-1 items-center px-3 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-lg shrink-0">
                          {p.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          {age !== null && <p className="text-xs text-muted-foreground">{age} yrs old</p>}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate order-last sm:order-none col-span-2 sm:col-span-1 flex items-center gap-1">
                        <User className="h-3 w-3 shrink-0 sm:hidden" /> {p.parentName}
                      </p>
                      <div className="text-sm font-semibold text-center tabular-nums sm:w-16">
                        {p.visits}
                        <span className="text-xs font-normal text-muted-foreground sm:hidden"> visits</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}>{p.lastVisit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </MobileShell>
  );
}
