import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Sparkles, Stethoscope, MessageCircle, Siren, Calendar, Star, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  ssr: false,
});

function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/home" });
  }, [user, loading, navigate]);

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

      {/* Social proof strip */}
      <section className="border-t border-border bg-card">
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

function FeatureCard({
  icon,
  tone,
  title,
  body,
}: {
  icon: React.ReactNode;
  tone: string;
  title: string;
  body: string;
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
