import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { MobileShell } from "@/components/mobile-shell";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, MapPin, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$dentistId")({
  component: BookPage,
  ssr: false,
});

const TIMES = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00", "18:00"];

function BookPage() {
  const { dentistId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: dentist } = useQuery({
    queryKey: ["dentist", dentistId],
    queryFn: () => api.get<any>(`/dentists/${dentistId}`),
  });

  const { data: children = [] } = useQuery({
    queryKey: ["children", user?.id],
    enabled: !!user,
    queryFn: () => api.get<any[]>("/children"),
  });

  const [childId, setChildId] = useState("");
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const book = useMutation({
    mutationFn: () =>
      api.post("/appointments", {
        child_id: childId,
        dentist_id: dentistId,
        appointment_date: date,
        appointment_time: time,
        reason,
      }),
    onSuccess: () => {
      toast.success("Visit booked! 🎉");
      qc.invalidateQueries({ queryKey: ["appointments"] });
      navigate({ to: "/appointments" });
    },
    onError: (e: any) => toast.error(e.message),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!childId) return toast.error("Please choose a child");
    if (!time) return toast.error("Please pick a time slot");
    book.mutate();
  }

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8">
        <button
          onClick={() => navigate({ to: "/dentists/$id", params: { id: dentistId } })}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dentist
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
          {/* Left: Booking form */}
          <div>
            <h1 className="text-3xl font-bold mb-1">Book a visit</h1>
            {dentist && (
              <p className="text-muted-foreground mb-8">
                with {dentist.name} · {dentist.clinic_name}
              </p>
            )}

            <form onSubmit={submit} className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Choose a child</Label>
                {children.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-6 text-muted-foreground text-sm">
                    Add a child profile first.{" "}
                    <button type="button" onClick={() => navigate({ to: "/children" })} className="text-primary font-semibold underline">
                      Add now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {children.map((c: any) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setChildId(c.id)}
                        className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                          childId === c.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        <div className="text-2xl mb-2">{c.avatar_emoji ?? "🧒"}</div>
                        <div className="font-semibold text-sm">{c.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Date</Label>
                  <Input
                    type="date"
                    value={date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 rounded-xl bg-card"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Time slot</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {TIMES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-xl py-2.5 text-sm font-medium border transition-colors ${
                          time === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Reason (optional)</Label>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. routine check-up, tooth pain, cleaning…"
                  className="rounded-xl bg-card min-h-[100px]"
                />
              </div>

              <Button disabled={book.isPending} className="w-full h-12 rounded-2xl shadow-[var(--shadow-soft)] text-base" size="lg">
                {book.isPending ? "Booking…" : "Confirm booking →"}
              </Button>
            </form>
          </div>

          {/* Right: Dentist summary */}
          {dentist && (
            <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)] sticky top-24">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-mint flex items-center justify-center text-3xl shrink-0">
                  👩‍⚕️
                </div>
                <div>
                  <p className="font-bold text-lg">{dentist.name}</p>
                  <p className="text-sm text-muted-foreground">{dentist.specialty}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-sunshine text-sunshine" /> {dentist.rating}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <BadgeCheck className="h-3.5 w-3.5" /> {dentist.experience_years}+ yrs
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {dentist.clinic_name}, {dentist.city}
                </p>
                <div className="flex justify-between pt-1">
                  <span className="text-muted-foreground">Consultation fee</span>
                  <span className="font-bold text-primary">₹{dentist.consultation_fee}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
