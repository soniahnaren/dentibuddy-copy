import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Sparkles, Stethoscope, MessageCircle, Siren, Calendar, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // Doctor-only signup fields
  const [clinicName, setClinicName] = useState("");
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') navigate({ to: '/admin' });
    else if (user.role === 'doctor') navigate({ to: '/doctor' });
    else navigate({ to: '/home' });
  }, [user, navigate]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message ?? "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (role === "doctor") {
        await signUp(email, password, name, "doctor", {
          clinic_name: clinicName,
          city,
          specialty,
        });
      } else {
        await signUp(email, password, name, "patient");
      }
      toast.success(
        role === "doctor" ? "Doctor account created — welcome!" : "Account created — you're in!"
      );
    } catch (err: any) {
      toast.error(err.message ?? "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex w-full max-w-full overflow-x-hidden bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-primary to-primary-glow flex-col justify-between p-12 text-white shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">🦷</div>
          <span className="text-xl font-bold">DentiBuddy</span>
        </Link>

        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Your child's smile is our priority.
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Join thousands of parents who use DentiBuddy to find great dentists, get AI guidance, and keep little smiles healthy.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Stethoscope className="h-4 w-4" />, label: "Find dentists" },
              { icon: <MessageCircle className="h-4 w-4" />, label: "Ask Buddy AI" },
              { icon: <Calendar className="h-4 w-4" />, label: "Track visits" },
              { icon: <Siren className="h-4 w-4" />, label: "24/7 SOS" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-medium backdrop-blur">
                {f.icon} {f.label}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/60 text-sm">
          <Sparkles className="h-3.5 w-3.5 inline mr-1" />
          Free to use · No credit card required
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-background min-w-0 w-full">
        <div className="w-full max-w-md min-w-0">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-lg shadow-[var(--shadow-soft)]">🦷</div>
            <span className="text-lg font-bold">DentiBuddy</span>
          </Link>

          <h2 className="text-3xl font-bold mb-1">Welcome 👋</h2>
          <p className="text-muted-foreground mb-6">
            {role === "doctor"
              ? "Manage your clinic and appointments."
              : "Care for your child's smile in seconds."}
          </p>

          {/* Role selector — individual logins for patients and doctors */}
          <RoleToggle role={role} onChange={setRole} />

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 rounded-2xl h-11">
              <TabsTrigger value="login" className="rounded-xl">Log in</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={login} className="space-y-4">
                <Field label="Email" value={email} onChange={setEmail} type="email" placeholder={role === "doctor" ? "doctor@email.com" : "parent@email.com"} />
                <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
                <Button disabled={busy} className="w-full h-12 rounded-2xl" size="lg">
                  {busy ? "Logging in…" : role === "doctor" ? "Log in as Doctor" : "Log in as Patient"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signup} className="space-y-4">
                <Field label="Your name" value={name} onChange={setName} placeholder={role === "doctor" ? "Dr. Riya Sharma" : "Riya Sharma"} />
                <Field label="Email" value={email} onChange={setEmail} type="email" placeholder={role === "doctor" ? "doctor@email.com" : "parent@email.com"} />
                <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="At least 6 characters" />

                {role === "doctor" && (
                  <>
                    <Field label="Clinic name" value={clinicName} onChange={setClinicName} placeholder="Bright Smiles Dental" />
                    <Field label="City" value={city} onChange={setCity} placeholder="Chennai" />
                    <Field label="Specialty (optional)" value={specialty} onChange={setSpecialty} placeholder="Pediatric Dentist" required={false} />
                  </>
                )}

                <Button disabled={busy} className="w-full h-12 rounded-2xl" size="lg">
                  {busy ? "Creating…" : role === "doctor" ? "Create doctor account" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing you agree to our friendly Terms &amp; Privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

function RoleToggle({
  role, onChange,
}: {
  role: "patient" | "doctor";
  onChange: (r: "patient" | "doctor") => void;
}) {
  const options: { key: "patient" | "doctor"; label: string; icon: string }[] = [
    { key: "patient", label: "Patient", icon: "👨‍👩‍👧" },
    { key: "doctor", label: "Doctor", icon: "🩺" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-2xl bg-muted">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          onClick={() => onChange(o.key)}
          className={`flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold transition-colors ${
            role === o.key
              ? "bg-card text-foreground shadow-[var(--shadow-card)]"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={role === o.key}
        >
          <span>{o.icon}</span> {o.label}
        </button>
      ))}
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={inputType}
          placeholder={placeholder}
          required={required}
          className={`h-12 rounded-xl bg-card ${isPassword ? "pr-11" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            title={show ? "Hide password" : "Show password"}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
          </button>
        )}
      </div>
    </div>
  );
}
