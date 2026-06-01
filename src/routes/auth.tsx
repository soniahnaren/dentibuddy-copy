import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Sparkles, Stethoscope, MessageCircle, Siren, Calendar } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [tab, setTab] = useState("login");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
      await signUp(email, password, name);
      toast.success("Account created — you're in!");
    } catch (err: any) {
      toast.error(err.message ?? "Sign up failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-primary to-primary-glow flex-col justify-between p-12 text-white">
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
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-lg">🦷</div>
            <span className="text-lg font-bold">DentiBuddy</span>
          </Link>

          <h2 className="text-3xl font-bold mb-1">Welcome 👋</h2>
          <p className="text-muted-foreground mb-8">Care for your child's smile in seconds.</p>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 rounded-2xl h-11">
              <TabsTrigger value="login" className="rounded-xl">Log in</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={login} className="space-y-4">
                <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="parent@email.com" />
                <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
                <Button disabled={busy} className="w-full h-12 rounded-2xl" size="lg">
                  {busy ? "Logging in…" : "Log in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signup} className="space-y-4">
                <Field label="Your name" value={name} onChange={setName} placeholder="Riya Sharma" />
                <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="parent@email.com" />
                <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="At least 6 characters" />
                <Button disabled={busy} className="w-full h-12 rounded-2xl" size="lg">
                  {busy ? "Creating…" : "Create account"}
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

function Field({
  label, value, onChange, type = "text", placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required
        className="h-12 rounded-xl bg-card"
      />
    </div>
  );
}
