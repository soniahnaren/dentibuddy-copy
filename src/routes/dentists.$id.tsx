import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MobileShell } from "@/components/mobile-shell";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
    queryFn: () => api.get<any>(`/dentists/${id}`),
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
      <div className="bg-gradient-to-b from-primary/20 via-mint/20 to-transparent">
        <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8">
          <button
            onClick={() => navigate({ to: "/dentists" })}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dentists
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 min-w-0">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-card flex items-center justify-center text-4xl sm:text-5xl shadow-[var(--shadow-soft)] shrink-0">
              👩‍⚕️
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{d.name}</h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-0.5">{d.specialty}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1 font-semibold shrink-0">
                  {d.rating ? (
                    <><Star className="h-4 w-4 fill-sunshine text-sunshine" /> {d.rating}</>
                  ) : (
                    <span className="text-muted-foreground">New clinic</span>
                  )}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground shrink-0">
                  <BadgeCheck className="h-4 w-4 shrink-0" /> {d.experience_years}+ yrs experience
                </span>
                {d.available_today && (
                  <span className="rounded-full bg-mint text-mint-foreground text-[10px] sm:text-xs font-bold uppercase px-2.5 py-0.5 shrink-0">
                    Available today
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-5 py-5 lg:px-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 lg:gap-8 items-start">
        {/* Left: About + Clinic */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">About</p>
            <p className="leading-relaxed text-muted-foreground">{d.bio || "Experienced pediatric dental specialist dedicated to children's oral health."}</p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Clinic</p>
            <p className="font-bold text-lg">{d.clinic_name}</p>
            <p className="text-muted-foreground flex items-center gap-2 mt-1.5">
              <MapPin className="h-4 w-4 shrink-0" /> {d.address || d.city}, {d.city}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <InfoStat icon={<IndianRupee className="h-4 w-4" />} label="Consultation" value={`₹${d.consultation_fee}`} />
            <InfoStat icon={<Clock className="h-4 w-4" />} label="Experience" value={`${d.experience_years} yrs`} />
            <InfoStat icon={<Star className="h-4 w-4" />} label="Rating" value={d.rating ? `${d.rating} / 5` : "New"} />
          </div>

          <ReviewsSection dentistId={d.id} avgRating={d.rating} numReviews={d.num_reviews ?? 0} />
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
            {d.phone && (
              <Button variant="outline" className="w-full h-12 rounded-2xl" asChild>
                <a href={`tel:${d.phone}`}><Phone className="h-4 w-4 mr-2" /> Call clinic</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

interface ReviewItem {
  id: string;
  parent_id: string | null;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function ReviewsSection({ dentistId, avgRating, numReviews }: { dentistId: string; avgRating: number | null; numReviews: number }) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: reviews = [] } = useQuery<ReviewItem[]>({
    queryKey: ["reviews", dentistId],
    queryFn: () => api.get<ReviewItem[]>(`/dentists/${dentistId}/reviews`),
  });

  const { data: canReviewData } = useQuery<{ can_review: boolean }>({
    queryKey: ["can-review", dentistId, user?.id],
    enabled: user?.role === "patient",
    queryFn: () => api.get<{ can_review: boolean }>(`/dentists/${dentistId}/can-review`),
  });
  const canReview = !!canReviewData?.can_review;

  const myReview = reviews.find((r) => r.parent_id === user?.id) ?? null;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (myReview) { setRating(myReview.rating); setComment(myReview.comment ?? ""); }
  }, [myReview?.id]);

  const mutation = useMutation({
    mutationFn: () => api.post(`/dentists/${dentistId}/reviews`, { rating, comment }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews", dentistId] });
      qc.invalidateQueries({ queryKey: ["dentist", dentistId] });
      qc.invalidateQueries({ queryKey: ["dentists"] });
      toast.success(myReview ? "Your review was updated" : "Thanks for your review!");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to submit review"),
  });

  return (
    <div className="rounded-2xl bg-card border border-border p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Reviews</p>
        {numReviews > 0 && avgRating != null && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 fill-sunshine text-sunshine" /> {avgRating}
            <span className="text-muted-foreground font-normal">· {numReviews} review{numReviews === 1 ? "" : "s"}</span>
          </span>
        )}
      </div>

      {/* Rating widget — patients who have completed a visit */}
      {user?.role === "patient" && (
        canReview ? (
          <div className="rounded-xl bg-muted/40 p-4 mb-5">
            <p className="text-sm font-medium mb-2">{myReview ? "Update your rating" : "Rate this dentist"}</p>
            <div className="flex gap-1 mb-3" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                  className="p-0.5"
                >
                  <Star className={`h-7 w-7 transition-colors ${(hover || rating) >= n ? "fill-sunshine text-sunshine" : "text-muted-foreground/40"}`} />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              placeholder="Share how your visit went (optional)…"
              className="w-full rounded-xl bg-background border border-input px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-3"
            />
            <Button
              size="sm"
              className="rounded-xl"
              disabled={rating < 1 || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? "Submitting…" : myReview ? "Update review" : "Submit review"}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground bg-muted/40 rounded-xl px-4 py-3 mb-5">
            You can rate this dentist after a completed visit.
          </p>
        )
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">No reviews yet — be the first after your visit.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold text-sm">{r.reviewer_name}{r.parent_id === user?.id ? " (you)" : ""}</p>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`h-3.5 w-3.5 ${r.rating >= n ? "fill-sunshine text-sunshine" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
              {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
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
