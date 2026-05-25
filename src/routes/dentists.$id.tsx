import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell } from "@/components/mobile-shell";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, MapPin, BadgeCheck, Phone, Clock, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/dentists/$id")({
  component: DentistDetail,
  ssr: false,
});

function DentistDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: d } = useQuery({
    queryKey: ["dentist", id],
    queryFn: async () => {
      const { data } = await supabase.from("dentists").select("*").eq("id", id).maybeSingle();
      return data;
    },
  });

  if (!d) {
    return (
      <MobileShell>
        <div className="max-w-screen-xl mx-auto px-6 py-16 text-center text-muted-foreground">Loading…</div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/20 via-mint/20 to-transparent">
        <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8">
          <button
            onClick={() => navigate({ to: "/dentists" })}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dentists
          </button>

          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-3xl bg-card flex items-center justify-center text-5xl shadow-[var(--shadow-soft)] shrink-0">
              👩‍⚕️
            </div>
            <div>
              <h1 className="text-3xl font-bold">{d.name}</h1>
              <p className="text-muted-foreground mt-1">{d.specialty}</p>
              <div className="flex items-center gap-5 mt-3 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Star className="h-4 w-4 fill-sunshine text-sunshine" /> {d.rating}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <BadgeCheck className="h-4 w-4" /> {d.experience_years}+ yrs experience
                </span>
                {d.available_today && (
                  <span className="rounded-full bg-mint text-mint-foreground text-xs font-bold uppercase px-3 py-1">
                    Available today
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 lg:gap-8 items-start">
        {/* Left: About + Clinic */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">About</p>
            <p className="leading-relaxed text-muted-foreground">{d.bio}</p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Clinic</p>
            <p className="font-bold text-lg">{d.clinic_name}</p>
            <p className="text-muted-foreground flex items-center gap-2 mt-1.5">
              <MapPin className="h-4 w-4 shrink-0" /> {d.address}, {d.city}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <InfoStat icon={<IndianRupee className="h-4 w-4" />} label="Consultation" value={`₹${d.consultation_fee}`} />
            <InfoStat icon={<Clock className="h-4 w-4" />} label="Experience" value={`${d.experience_years} yrs`} />
            <InfoStat icon={<Star className="h-4 w-4" />} label="Rating" value={`${d.rating} / 5`} />
          </div>
        </div>

        {/* Right: Booking CTA */}
        <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-soft)] sticky top-24">
          <p className="font-bold text-lg mb-1">Book a visit</p>
          <p className="text-sm text-muted-foreground mb-5">with {d.name}</p>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Consultation fee</span>
              <span className="font-semibold">₹{d.consultation_fee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Specialty</span>
              <span className="font-semibold">{d.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Availability</span>
              <span className={`font-semibold ${d.available_today ? "text-mint-foreground" : "text-muted-foreground"}`}>
                {d.available_today ? "Available today" : "By appointment"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full h-12 rounded-2xl shadow-[var(--shadow-soft)] text-base" size="lg">
              <Link to="/book/$dentistId" params={{ dentistId: d.id }}>Book visit →</Link>
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-2xl" asChild>
              <a href="tel:+910000000000"><Phone className="h-4 w-4 mr-2" /> Call clinic</a>
            </Button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function InfoStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 text-center shadow-[var(--shadow-card)]">
      <div className="flex justify-center text-primary mb-1">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold mt-0.5">{value}</p>
    </div>
  );
}
