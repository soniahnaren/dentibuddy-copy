import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { MobileShell } from "@/components/mobile-shell";
import { api } from "@/lib/api";
import { Calendar, MessageCircle, Siren, Stethoscope, Lightbulb, Plus, ChevronRight, Star } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: HomePage,
  ssr: false,
});

function HomePage() {
  const { user } = useAuth();

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    enabled: !!user,
    queryFn: () => api.get<any[]>("/children"),
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments", user?.id],
    enabled: !!user,
    queryFn: () => api.get<any[]>("/appointments"),
  });

  const { data: featuredDentists = [] } = useQuery({
    queryKey: ["dentists"],
    queryFn: () => api.get<any[]>("/dentists"),
  });

  const { data: tips = [] } = useQuery({
    queryKey: ["tips"],
    queryFn: () => api.get<any[]>("/tips"),
  });

  const today = new Date().toISOString().slice(0, 10);
  const nextAppt = appointments
    .filter((a: any) => a.appointment_date >= today && a.status !== "cancelled")
    .sort((a: any, b: any) => a.appointment_date.localeCompare(b.appointment_date))[0] ?? null;

  const tip = tips.length > 0 ? tips[Math.floor(Math.random() * Math.min(tips.length, 20))] : null;
  const topDentists = featuredDentists.slice(0, 6);

  const firstName = (user?.full_name ?? user?.email ?? "there").split(" ")[0];

  return (
    <MobileShell>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-primary/15 via-primary/5 to-transparent">
        <div className="max-w-screen-xl mx-auto px-5 py-6 lg:px-6 lg:py-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto] lg:gap-8 lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground font-medium">Hi parent 👋</p>
              <h1 className="text-4xl font-bold mt-1">Hello, {firstName}</h1>
              <p className="text-muted-foreground mt-2">Let's keep little smiles bright today.</p>

              {nextAppt ? (
                <Link to="/appointments" className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-card border border-border px-5 py-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="h-11 w-11 rounded-xl bg-mint flex items-center justify-center text-mint-foreground shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Next visit</p>
                    <p className="font-semibold">{nextAppt.children?.name} · {nextAppt.dentists?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(nextAppt.appointment_date).toDateString()} at {nextAppt.appointment_time?.slice(0, 5)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 ml-4" />
                </Link>
              ) : (
                <Link to="/dentists" className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-card border border-border px-5 py-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="h-11 w-11 rounded-xl bg-sunshine flex items-center justify-center text-sunshine-foreground shrink-0">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">No upcoming visit</p>
                    <p className="text-xs text-muted-foreground">Click to book a pediatric dentist</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                </Link>
              )}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-2 lg:shrink-0">
              <Quick to="/dentists" icon={<Stethoscope className="h-5 w-5" />} label="Dentists" tone="bg-secondary text-primary" />
              <Quick to="/chatbot" icon={<MessageCircle className="h-5 w-5" />} label="Buddy AI" tone="bg-mint text-mint-foreground" />
              <Quick to="/emergency" icon={<Siren className="h-5 w-5" />} label="Emergency" tone="bg-coral text-coral-foreground" />
              <Quick to="/tips" icon={<Lightbulb className="h-5 w-5" />} label="Tips" tone="bg-sunshine text-sunshine-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
        {/* Left: Top rated dentists */}
        <div className="lg:col-span-2 space-y-5 lg:space-y-8">
          <section>
            <SectionHeader title="Top rated nearby" actionLabel="See all dentists" actionTo="/dentists" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
              {topDentists.map((d: any) => (
                <Link
                  key={d.id}
                  to="/dentists/$id"
                  params={{ id: d.id }}
                  className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-2xl shrink-0">
                    👩‍⚕️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{d.clinic_name} · {d.city}</p>
                    <p className="text-xs font-medium text-primary mt-1">₹{d.consultation_fee} · {d.experience_years}+ yrs</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold shrink-0">
                    <Star className="h-3.5 w-3.5 fill-sunshine text-sunshine" /> {d.rating}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Children + Tip */}
        <div className="space-y-6">
          <section>
            <SectionHeader title="My kids" actionLabel="Manage" actionTo="/children" />
            <div className="space-y-2">
              {children.map((c: any) => (
                <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-card border border-border px-4 py-3 shadow-[var(--shadow-card)]">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                    {c.avatar_emoji ?? "🧒"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{c.name}</p>
                    {c.date_of_birth && (
                      <p className="text-xs text-muted-foreground">
                        {Math.max(0, new Date().getFullYear() - new Date(c.date_of_birth).getFullYear())} yrs old
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <Link
                to="/children"
                className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-border px-4 py-3 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Add a child</span>
              </Link>
            </div>
          </section>

          {tip && (
            <section>
              <div className="rounded-2xl bg-gradient-to-br from-mint to-accent p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 text-mint-foreground/80 text-xs font-medium uppercase tracking-wide mb-2">
                  <Lightbulb className="h-3.5 w-3.5" /> Tip of the day
                </div>
                <p className="font-semibold text-mint-foreground">{tip.emoji} {tip.title}</p>
                <p className="mt-1.5 text-sm text-mint-foreground/80 leading-relaxed">{tip.content}</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </MobileShell>
  );
}

function Quick({ to, icon, label, tone }: { to: string; icon: React.ReactNode; label: string; tone: string }) {
  return (
    <Link to={to as any} className="flex flex-col items-center gap-2">
      <div className={`h-16 w-16 rounded-2xl ${tone} flex items-center justify-center shadow-[var(--shadow-card)]`}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}

function SectionHeader({ title, actionLabel, actionTo }: { title: string; actionLabel?: string; actionTo?: string }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {actionTo && (
        <Link to={actionTo as any} className="text-sm font-medium text-primary hover:underline">
          {actionLabel} →
        </Link>
      )}
    </div>
  );
}
