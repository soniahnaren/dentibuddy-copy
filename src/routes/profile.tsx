import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { api, getApiBaseUrl, setApiBaseUrl } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Baby, Lightbulb, LogOut, Mail, ChevronRight, Calendar, MapPin, Check, Server, Stethoscope, ClipboardList, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  ssr: false,
});

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'];

function ProfilePage() {
  const { user, signOut, refreshUser } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [selectedCity, setSelectedCity] = useState(user?.city ?? '');
  const [saved, setSaved] = useState(false);
  const [serverUrl, setServerUrl] = useState(getApiBaseUrl());
  const [serverSaved, setServerSaved] = useState(false);

  useEffect(() => {
    setSelectedCity(user?.city ?? '');
  }, [user?.city]);

  function handleSaveServer() {
    setApiBaseUrl(serverUrl);
    setServerSaved(true);
    setTimeout(() => setServerSaved(false), 2000);
    toast.success("Backend Server URL updated!");
  }

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

  const cityMutation = useMutation({
    mutationFn: (city: string) => api.patch('/auth/me', { city }),
    onSuccess: async () => {
      await refreshUser();
      qc.invalidateQueries({ queryKey: ['dentists'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      toast.success(selectedCity ? `Location set to ${selectedCity}` : 'Location cleared');
    },
    onError: (e: any) => toast.error(e.message ?? 'Failed to save location'),
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
                  {user?.city && (
                    <p className="text-sm opacity-90 inline-flex items-center gap-1.5 mt-0.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" /> {user.city}
                    </p>
                  )}
                </div>
              </div>
              {user?.role !== 'doctor' && (
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Kids" value={children.length} />
                  <Stat label="Visits" value={appointments.length} />
                </div>
              )}
            </div>

            {/* Location picker — patients only */}
            {user?.role === 'patient' && (
              <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-sm">My Location</p>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Set your city so only doctors near you show up when you search.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedCity('')}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors border ${
                      selectedCity === ''
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:text-foreground bg-card'
                    }`}
                  >
                    Any city
                  </button>
                  {CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors border ${
                        selectedCity === city
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:text-foreground bg-card'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <Button
                  size="sm"
                  className={`w-full rounded-xl gap-1.5 ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  onClick={() => cityMutation.mutate(selectedCity)}
                  disabled={cityMutation.isPending}
                >
                  {saved ? <><Check className="h-3.5 w-3.5" /> Saved!</> :
                   cityMutation.isPending ? 'Saving…' :
                   'Save location'}
                </Button>
              </div>
            )}

            {/* Server IP settings for mobile / local network
            <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-primary" />
                <p className="font-semibold text-sm">Server / Backend IP</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Configure your computer's IP address (e.g. <code>http://192.168.31.129:3001/api</code>) when running on mobile.
              </p>
              <div className="space-y-3">
                <Input
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="http://192.168.31.129:3001/api"
                  className="h-10 text-xs rounded-xl bg-background font-mono"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className={`flex-1 rounded-xl text-xs ${serverSaved ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={handleSaveServer}
                  >
                    {serverSaved ? <><Check className="h-3.5 w-3.5 mr-1" /> Applied!</> : 'Apply Server URL'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs rounded-xl"
                    onClick={() => {
                      setServerUrl('/api');
                      setApiBaseUrl('');
                      toast.success('Reset to default /api');
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div> */}

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

          {/* Right: doctor clinic editor OR patient quick links */}
          {user?.role === 'doctor' ? (
            <div className="space-y-4">
              <DoctorClinicEditor />
              <div className="space-y-3">
                <Row to="/doctor" icon={<Stethoscope className="h-5 w-5" />} label="Dashboard" description="Your stats, schedule and patients" />
                <Row to="/doctor/appointments" icon={<ClipboardList className="h-5 w-5" />} label="Appointments" description="Accept, complete and manage bookings" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">Quick links</p>
              <Row to="/children" icon={<Baby className="h-5 w-5" />} label="My kids" description="Manage your children's profiles" />
              <Row to="/appointments" icon={<Calendar className="h-5 w-5" />} label="Visits" description="View and manage dental appointments" />
              <Row to="/tips" icon={<Lightbulb className="h-5 w-5" />} label="Dental tips" description="Daily care advice for healthy smiles" />
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}

interface ClinicForm {
  name: string;
  clinic_name: string;
  specialty: string;
  city: string;
  address: string;
  phone: string;
  consultation_fee: number | string;
  experience_years: number | string;
  bio: string;
  available_today: boolean;
}

function DoctorClinicEditor() {
  const qc = useQueryClient();
  const { data: profile, isLoading } = useQuery<any>({
    queryKey: ["doctor-profile"],
    queryFn: () => api.get("/doctor/profile"),
  });
  const [form, setForm] = useState<ClinicForm | null>(null);

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name ?? "",
      clinic_name: profile.clinic_name ?? "",
      specialty: profile.specialty ?? "",
      city: profile.city ?? "",
      address: profile.address ?? "",
      phone: profile.phone ?? "",
      consultation_fee: profile.consultation_fee ?? 0,
      experience_years: profile.experience_years ?? 0,
      bio: profile.bio ?? "",
      available_today: !!profile.available_today,
    });
  }, [profile]);

  const mutation = useMutation({
    mutationFn: (body: ClinicForm) => api.patch("/doctor/profile", body),
    onSuccess: (updated: any) => {
      qc.setQueryData(["doctor-profile"], updated);
      qc.invalidateQueries({ queryKey: ["dentists"] });
      toast.success("Clinic profile updated");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });

  if (isLoading || !form) {
    return (
      <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
        <p className="text-sm text-muted-foreground">Loading clinic profile…</p>
      </div>
    );
  }

  const set = <K extends keyof ClinicForm>(k: K, v: ClinicForm[K]) => setForm((f) => (f ? { ...f, [k]: v } : f));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); mutation.mutate(form); }}
      className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] space-y-4"
    >
      <div className="flex items-center gap-2">
        <Stethoscope className="h-4 w-4 text-primary" />
        <h3 className="font-semibold">Clinic profile</h3>
        <span className="text-xs text-muted-foreground ml-auto">Shown to patients in the directory</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField label="Display name">
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} required className="h-11 rounded-xl bg-background" placeholder="Dr. Riya Sharma" />
        </FormField>
        <FormField label="Specialty">
          <Input value={form.specialty} onChange={(e) => set("specialty", e.target.value)} className="h-11 rounded-xl bg-background" placeholder="Pediatric Dentist" />
        </FormField>
        <FormField label="Clinic name">
          <Input value={form.clinic_name} onChange={(e) => set("clinic_name", e.target.value)} required className="h-11 rounded-xl bg-background" placeholder="Bright Smiles Dental" />
        </FormField>
        <FormField label="City">
          <Input value={form.city} onChange={(e) => set("city", e.target.value)} required className="h-11 rounded-xl bg-background" placeholder="Chennai" />
        </FormField>
        <FormField label="Phone">
          <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="h-11 rounded-xl bg-background" placeholder="+91 98765 43210" />
        </FormField>
        <FormField label="Consultation fee (₹)">
          <Input type="number" min={0} value={form.consultation_fee} onChange={(e) => set("consultation_fee", e.target.value)} className="h-11 rounded-xl bg-background" placeholder="500" />
        </FormField>
        <FormField label="Experience (years)">
          <Input type="number" min={0} value={form.experience_years} onChange={(e) => set("experience_years", e.target.value)} className="h-11 rounded-xl bg-background" placeholder="5" />
        </FormField>
        <FormField label="Address">
          <Input value={form.address} onChange={(e) => set("address", e.target.value)} className="h-11 rounded-xl bg-background" placeholder="12 MG Road" />
        </FormField>
      </div>

      <FormField label="About / bio">
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          rows={3}
          placeholder="Tell parents about your clinic and approach to kids' dental care…"
          className="w-full rounded-xl bg-background border border-input px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </FormField>

      <label className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.available_today}
          onChange={(e) => set("available_today", e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        <span className="text-sm font-medium">Available today</span>
        <span className="text-xs text-muted-foreground ml-auto">Highlights you as open for same-day visits</span>
      </label>

      <Button type="submit" disabled={mutation.isPending} className="w-full h-11 rounded-xl gap-1.5">
        <Save className="h-4 w-4" /> {mutation.isPending ? "Saving…" : "Save clinic profile"}
      </Button>
    </form>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
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
