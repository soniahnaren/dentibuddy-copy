import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Sparkles, Stethoscope, MessageCircle, Siren, Calendar, Star, Shield, Database, CheckCircle, Loader2, Copy, Check } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Landing,
  ssr: false,
});

const DEMO_ACCOUNTS = [
  { role: "Admin",   email: "admin@dentibuddy.com",   password: "admin123",   emoji: "🛡️", color: "from-primary/20 to-primary/10",   badge: "bg-primary/10 text-primary" },
  { role: "Doctor",  email: "doctor@dentibuddy.com",  password: "doctor123",  emoji: "👨‍⚕️", color: "from-mint/30 to-mint/10",         badge: "bg-mint text-mint-foreground" },
  { role: "Patient", email: "patient@dentibuddy.com", password: "patient123", emoji: "👨‍👧", color: "from-sunshine/20 to-sunshine/10", badge: "bg-sunshine text-sunshine-foreground" },
];

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") navigate({ to: "/admin" });
      else if (user.role === "doctor") navigate({ to: "/doctor" });
      else navigate({ to: "/home" });
    }
  }, [user, loading, navigate]);

  async function handleSeed() {
    setSeeding(true);
    try {
      await api.post("/seed", {});
      setSeeded(true);
      toast.success("Demo data seeded! Use any account below to log in.");
    } catch (err: any) {
      toast.error(err.message ?? "Seed failed");
    } finally {
      setSeeding(false);
    }
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-lg shadow-[var(--shadow-soft)]">
              🦷
            </div>
            <span className="text-lg font-bold tracking-tight">DentiBuddy</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="rounded-xl">
              <Link to="/auth">Log in</Link>
            </Button>
            <Button asChild className="rounded-xl shadow-[var(--shadow-soft)]">
              <Link to="/auth">Get started free</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center bg-gradient-to-br from-primary/10 via-background to-mint/20">
        <div className="max-w-screen-xl mx-auto px-5 py-10 lg:px-6 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-mint px-4 py-1.5 text-sm font-medium text-mint-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered pediatric care
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
              Bright smiles for{" "}
              <span className="text-primary">little</span> humans.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Book trusted pediatric dentists, get instant AI guidance, manage your
              children's dental records, and handle emergencies — all in one friendly app.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
              <Button asChild size="lg" className="h-13 px-8 rounded-2xl text-base shadow-[var(--shadow-soft)]">
                <Link to="/auth">Get started free →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 px-8 rounded-2xl text-base">
                <Link to="/auth">Log in</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required · Free to use
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-4">
            <FeatureCard
              icon={<Stethoscope className="h-6 w-6" />}
              tone="bg-secondary text-primary"
              title="Find dentists"
              body="Discover top-rated pediatric dentists near you and book in seconds."
            />
            <FeatureCard
              icon={<MessageCircle className="h-6 w-6" />}
              tone="bg-mint text-mint-foreground"
              title="Ask Buddy AI"
              body="Get instant answers to all your child's dental questions from our AI assistant."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              tone="bg-sunshine text-sunshine-foreground"
              title="Track visits"
              body="Keep all appointments organized and get reminders for upcoming check-ups."
            />
            <FeatureCard
              icon={<Siren className="h-6 w-6" />}
              tone="bg-coral text-coral-foreground"
              title="24/7 SOS"
              body="First-aid guidance for dental emergencies, available any time of day."
            />
          </div>
        </div>
      </section>

      {/* ── DEMO SEED PANEL ── */}
      <section className="border-t border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-5 py-8 lg:px-6 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">

            {/* Left: description + button */}
            <div className="lg:w-72 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Demo Setup</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Click to seed 3 demo accounts (admin, doctor, patient) plus 6 dentists and tips. Use any account below to log in instantly.
              </p>
              <Button
                onClick={handleSeed}
                disabled={seeding}
                className={`rounded-2xl gap-2 w-full lg:w-auto ${seeded ? "bg-green-600 hover:bg-green-700" : ""}`}
                size="lg"
              >
                {seeding ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Seeding…</>
                ) : seeded ? (
                  <><CheckCircle className="h-4 w-4" /> Seeded!</>
                ) : (
                  <><Database className="h-4 w-4" /> Load Demo Data</>
                )}
              </Button>
            </div>

            {/* Right: account cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <div
                  key={acc.role}
                  className={`rounded-2xl bg-gradient-to-br ${acc.color} border border-border p-4`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{acc.emoji}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${acc.badge}`}>
                      {acc.role}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <CredRow
                      label="Email"
                      value={acc.email}
                      copyKey={`${acc.role}-email`}
                      copied={copied}
                      onCopy={() => copyToClipboard(acc.email, `${acc.role}-email`)}
                    />
                    <CredRow
                      label="Password"
                      value={acc.password}
                      copyKey={`${acc.role}-pw`}
                      copied={copied}
                      onCopy={() => copyToClipboard(acc.password, `${acc.role}-pw`)}
                    />
                  </div>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 rounded-xl bg-background/60"
                  >
                    <Link to="/auth">Log in as {acc.role}</Link>
                  </Button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-t border-border bg-background">
        <div className="max-w-screen-xl mx-auto px-5 py-8 lg:px-6 lg:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 text-center">
          <Proof icon={<Star className="h-5 w-5 fill-sunshine text-sunshine" />} stat="4.9 / 5" label="Average rating from parents" />
          <Proof icon={<Shield className="h-5 w-5 text-primary" />} stat="100% secure" label="Your data is always private" />
          <Proof icon={<Stethoscope className="h-5 w-5 text-mint-foreground" />} stat="500+ dentists" label="Verified pediatric specialists" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        DentiBuddy · Made with 🦷 for happy kids · By continuing you agree to our Terms &amp; Privacy.
      </footer>
    </div>
  );
}

function CredRow({
  label, value, copyKey, copied, onCopy,
}: {
  label: string; value: string; copyKey: string; copied: string | null; onCopy: () => void;
}) {
  const isCopied = copied === copyKey;
  return (
    <div className="flex items-center justify-between gap-2 bg-background/50 rounded-xl px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xs font-mono font-medium truncate">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="shrink-0 p-1 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
      >
        {isCopied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

function FeatureCard({
  icon, tone, title, body,
}: {
  icon: React.ReactNode; tone: string; title: string; body: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
      <div className={`h-11 w-11 rounded-xl ${tone} flex items-center justify-center mb-4 shadow-[var(--shadow-card)]`}>
        {icon}
      </div>
      <p className="font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Proof({ icon, stat, label }: { icon: React.ReactNode; stat: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">{icon}</div>
      <p className="text-2xl font-bold">{stat}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
