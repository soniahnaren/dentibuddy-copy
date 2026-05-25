import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Baby, Lightbulb, LogOut, Mail, ChevronRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  ssr: false,
});

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader title="My profile" />

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 lg:gap-8 items-start">
          {/* Left: Profile card */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-6 text-primary-foreground shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0">
                  👤
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-xl truncate">{user?.full_name || "Parent"}</p>
                  <p className="text-sm opacity-90 inline-flex items-center gap-1.5 mt-0.5 truncate">
                    <Mail className="h-3.5 w-3.5 shrink-0" /> {user?.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Kids" value={children.length} />
                <Stat label="Visits" value={appointments.length} />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={() => { signOut(); navigate({ to: "/" }); }}
            >
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              DentiBuddy v1.0 · Made with 🦷 for happy kids
            </p>
          </div>

          {/* Right: Quick links */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">Quick links</p>
            <Row to="/children" icon={<Baby className="h-5 w-5" />} label="My kids" description="Manage your children's profiles" />
            <Row to="/appointments" icon={<Calendar className="h-5 w-5" />} label="Visits" description="View and manage dental appointments" />
            <Row to="/tips" icon={<Lightbulb className="h-5 w-5" />} label="Dental tips" description="Daily care advice for healthy smiles" />
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/15 p-3 text-center backdrop-blur">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-wide opacity-90">{label}</p>
    </div>
  );
}

function Row({ to, icon, label, description }: { to: string; icon: React.ReactNode; label: string; description: string }) {
  return (
    <Link
      to={to as any}
      className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
    >
      <div className="h-11 w-11 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
}
