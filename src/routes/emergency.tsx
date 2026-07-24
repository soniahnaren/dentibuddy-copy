import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { Phone, MessageCircle, Stethoscope, Siren, MapPin, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  component: EmergencyPage,
  ssr: false,
});

interface SymptomGuide {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium";
  summary: string;
  steps: string[];
  action: string;
}

const TRIAGE_GUIDES: SymptomGuide[] = [
  {
    id: "knocked-out",
    title: "Knocked-out Permanent Tooth",
    severity: "critical",
    summary: "Time-critical! Action within 30 minutes gives the best chance of saving the tooth.",
    steps: [
      "Find the tooth and hold it by the crown (top part), NOT the root.",
      "If dirty, rinse gently in cold milk or saline solution for 10 seconds. Do NOT scrub.",
      "Try putting it back into the socket if possible, holding it in place with clean gauze.",
      "If unable to reinsert, submerge the tooth in a small cup of milk or saliva.",
      "Go to an emergency pediatric dentist immediately."
    ],
    action: "Urgent visit needed within 30-60 mins"
  },
  {
    id: "severe-pain",
    title: "Severe Toothache & Throbbing Pain",
    severity: "high",
    summary: "May indicate pulp infection, deep decay, or abscess requiring prompt dental care.",
    steps: [
      "Rinse child's mouth thoroughly with warm salt water to clean debris.",
      "Use dental floss to gently remove any trapped food particles between teeth.",
      "Apply a cold ice pack to the outside of the cheek for 15 minutes to reduce swelling.",
      "Do NOT place aspirin or pain tablets directly on teeth or gums.",
      "Schedule an emergency priority dental visit."
    ],
    action: "Same-day dental consultation recommended"
  },
  {
    id: "chipped-broken",
    title: "Chipped or Broken Tooth",
    severity: "high",
    summary: "Save any broken fragments and protect the soft tissues inside mouth.",
    steps: [
      "Collect and save any broken tooth fragments in a small clean container with milk.",
      "Rinse child's mouth with warm water to clean the affected area.",
      "Apply a clean piece of gauze if there is minor bleeding.",
      "Apply a cold compress on face to suppress facial swelling.",
      "Visit dentist promptly to prevent nerve damage."
    ],
    action: "Visit dentist within 24 hours"
  },
  {
    id: "bleeding",
    title: "Soft Tissue Injury / Gum Bleeding",
    severity: "medium",
    summary: "Bleeding caused by trauma to tongue, lips, or inner cheeks.",
    steps: [
      "Clean area gently with a damp washcloth.",
      "Apply firm, continuous pressure to the bleeding site with clean gauze for 10 to 15 minutes.",
      "Offer ice pops or cold compress to reduce swelling and ease discomfort.",
      "If bleeding doesn't stop after 15 minutes of firm pressure, seek emergency medical care."
    ],
    action: "Apply pressure; seek emergency care if persistent"
  },
  {
    id: "jaw-swelling",
    title: "Facial / Jaw Swelling",
    severity: "critical",
    summary: "Facial swelling can signal a spreading dental infection or abscess.",
    steps: [
      "Apply a cool compress to the outside of the cheek.",
      "Do NOT apply heat to swollen facial areas.",
      "Check for fever, difficulty swallowing, or breathing issues.",
      "If breathing or swallowing is impaired, go to nearest ER immediately.",
      "Otherwise, visit emergency pediatric dentist immediately."
    ],
    action: "Immediate medical / dental evaluation required"
  }
];

function EmergencyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedGuideId, setSelectedGuideId] = useState<string>("knocked-out");

  const { data: dentists = [] } = useQuery<any[]>({
    queryKey: ["dentists", user?.city],
    queryFn: () => api.get<any[]>(`/dentists${user?.city ? `?city=${encodeURIComponent(user.city)}` : ""}`),
  });

  const emergencyDentists = dentists.filter((d) => d.available_today);

  const activeGuide = TRIAGE_GUIDES.find((g) => g.id === selectedGuideId) ?? TRIAGE_GUIDES[0];

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader title="Emergency SOS 🚨" subtitle="Interactive triage guide & emergency dentist dispatch" />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
          {/* Left: Life-threatening SOS & Emergency Doctors */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-gradient-to-br from-coral to-destructive p-6 text-coral-foreground shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 mb-1">
                <Siren className="h-5 w-5 animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-wide opacity-90">Life-Threatening Emergency</p>
              </div>
              <p className="text-3xl font-bold">Call 112</p>
              <p className="text-xs opacity-90 mt-2 leading-relaxed">
                For severe trauma, excessive bleeding, or breathing difficulty, call emergency services immediately.
              </p>
              <Button asChild variant="secondary" className="mt-4 rounded-2xl w-full h-12 text-sm font-bold">
                <a href="tel:112"><Phone className="h-4 w-4 mr-2" /> Call 112 Now</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="h-16 rounded-2xl flex-col gap-1">
                <Link to="/dentists">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Browse All Dentists</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 rounded-2xl flex-col gap-1">
                <Link to="/chatbot">
                  <MessageCircle className="h-5 w-5 text-mint-foreground" />
                  <span className="text-xs font-medium">Ask Buddy AI</span>
                </Link>
              </Button>
            </div>

            {/* Available Emergency Doctors list */}
            <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping" />
                  <h3 className="font-bold text-sm">Emergency Dentists Today</h3>
                </div>
                <span className="text-xs text-muted-foreground">{emergencyDentists.length} available</span>
              </div>

              {emergencyDentists.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  No emergency slots open today in {user?.city || "your area"}. Browse all dentists or ask Buddy AI.
                </p>
              ) : (
                <div className="space-y-3 mt-2">
                  {emergencyDentists.slice(0, 3).map((d) => (
                    <div key={d.id} className="p-3 rounded-xl bg-muted/50 border border-border/60 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm">{d.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {d.clinic_name} ({d.city})
                          </p>
                        </div>
                        <span className="text-xs bg-mint/20 text-mint-foreground font-semibold px-2 py-0.5 rounded-full shrink-0">
                          Open Today
                        </span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        {d.phone && (
                          <Button asChild size="sm" variant="outline" className="h-8 text-xs rounded-xl flex-1">
                            <a href={`tel:${d.phone}`}><Phone className="h-3 w-3 mr-1" /> Call Clinic</a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="h-8 text-xs rounded-xl flex-1 bg-coral hover:bg-coral/90 text-coral-foreground"
                          onClick={() => navigate({ to: `/book/${d.id}`, search: { emergency: true } })}
                        >
                          <Siren className="h-3 w-3 mr-1" /> SOS Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Interactive Symptom Triage */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Select Child's Symptom</p>
              <div className="flex flex-wrap gap-2">
                {TRIAGE_GUIDES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGuideId(g.id)}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-full transition-all border ${
                      selectedGuideId === g.id
                        ? g.severity === "critical"
                          ? "bg-coral text-coral-foreground border-coral"
                          : "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {g.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Triage Step Card */}
            <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)] space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      activeGuide.severity === "critical" ? "bg-coral/20 text-coral" : "bg-yellow-500/20 text-yellow-700"
                    }`}>
                      {activeGuide.severity} Priority
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">{activeGuide.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{activeGuide.summary}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Step-by-step First Aid Protocol</p>
                <div className="space-y-3">
                  {activeGuide.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-muted/40 p-3.5 rounded-xl text-sm">
                      <span className="h-6 w-6 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-secondary p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-coral shrink-0" />
                  <p className="text-xs font-medium">{activeGuide.action}</p>
                </div>
                {emergencyDentists.length > 0 ? (
                  <Button
                    className="w-full sm:w-auto rounded-xl bg-coral hover:bg-coral/90 text-coral-foreground font-semibold gap-1.5 shrink-0"
                    onClick={() => navigate({ to: `/book/${emergencyDentists[0].id}`, search: { emergency: true } })}
                  >
                    <Siren className="h-4 w-4" /> Book Priority SOS Slot →
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl gap-1.5 shrink-0"
                    onClick={() => navigate({ to: "/dentists" })}
                  >
                    Find Pediatric Dentist →
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
