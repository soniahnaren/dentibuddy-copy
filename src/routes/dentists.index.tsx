import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/dentists/")({
  component: DentistsPage,
  ssr: false,
});

function DentistsPage() {
  const [q, setQ] = useState("");

  const { data = [] } = useQuery({
    queryKey: ["dentists"],
    queryFn: async () => {
      const { data } = await supabase.from("dentists").select("*").order("rating", { ascending: false });
      return data ?? [];
    },
  });

  const filtered = data.filter((d: any) => {
    const s = q.toLowerCase();
    return !s || d.name.toLowerCase().includes(s) || d.city?.toLowerCase().includes(s) || d.clinic_name.toLowerCase().includes(s);
  });

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8">
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Find a dentist</h1>
            <p className="text-muted-foreground mt-1">Trusted pediatric dentists near you</p>
          </div>
          <div className="relative w-full lg:w-80 lg:shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, clinic, or city"
              className="h-12 pl-11 rounded-2xl bg-card"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No dentists found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            {filtered.map((d: any) => (
              <Link
                key={d.id}
                to="/dentists/$id"
                params={{ id: d.id }}
                className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow block"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-4xl shrink-0">
                    👩‍⚕️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <p className="font-semibold text-lg truncate">{d.name}</p>
                        <p className="text-sm text-muted-foreground">{d.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-base font-bold shrink-0">
                        <Star className="h-4 w-4 fill-sunshine text-sunshine" /> {d.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {d.clinic_name} · {d.city}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold text-primary">₹{d.consultation_fee}</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <BadgeCheck className="h-3.5 w-3.5" /> {d.experience_years}+ yrs
                        </span>
                      </div>
                      {d.available_today && (
                        <span className="text-xs font-bold uppercase rounded-full bg-mint text-mint-foreground px-3 py-1">
                          Available today
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
