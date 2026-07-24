import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { MobileShell } from "@/components/mobile-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/chatbot")({
  component: ChatbotPage,
  ssr: false,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "How often should my 4-year-old brush?",
  "My child has tooth pain — what should I do?",
  "When should kids start flossing?",
  "Tips to help my toddler love brushing",
  "What foods damage children's teeth?",
  "When should kids first visit a dentist?",
];

function ChatbotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Buddy 🦷 — your friendly pediatric dental assistant. Ask me anything about your child's smile!" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    scrollRefMobile.current?.scrollTo({ top: scrollRefMobile.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const msgs = next.filter((m) => m.role !== "assistant" || messages.indexOf(m) > 0)
        .map((m) => ({ role: m.role, content: m.content }));
      const { reply } = await api.post<{ reply: string }>("/chat", { messages: msgs });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e: any) {
      toast.error(e.message ?? "Buddy is unavailable right now");
      setMessages([...next, { role: "assistant", content: "Sorry, I'm having a brief hiccup. Please try again in a moment." }]);
    } finally {
      setBusy(false);
    }
  }

  const renderMessages = (ref: React.RefObject<HTMLDivElement | null>) => (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          {m.role === "assistant" && (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-sm shrink-0 mr-3 mt-0.5">
              🦷
            </div>
          )}
          <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-[var(--shadow-card)] ${
            m.role === "user"
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-background border border-border rounded-bl-sm"
          }`}>
            {m.content}
          </div>
        </div>
      ))}
      {busy && (
        <div className="flex justify-start">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white text-sm shrink-0 mr-3 mt-0.5">
            🦷
          </div>
          <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]" />
            <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <MobileShell>
      {/* ── MOBILE layout (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col" style={{ height: "calc(100dvh - 56px - 80px)" }}>
        <div className="px-5 pt-5 pb-3 shrink-0">
          <h1 className="text-2xl font-bold tracking-tight">Buddy AI 🦷</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Your pediatric dental assistant</p>
        </div>
        <div className="flex-1 min-h-0 mx-4 mb-2 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
          {renderMessages(scrollRefMobile)}
          <div className="border-t border-border p-4 bg-card shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Buddy anything…"
                className="h-11 rounded-2xl bg-background"
              />
              <Button type="submit" size="icon" disabled={busy || !input.trim()} className="h-11 w-11 rounded-2xl shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (hidden lg:flex) ── */}
      <div className="hidden lg:flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
        <div className="max-w-screen-xl mx-auto w-full px-6 pt-8 pb-4 shrink-0">
          <h1 className="text-3xl font-bold tracking-tight">Buddy AI 🦷</h1>
          <p className="text-muted-foreground mt-1.5">Your pediatric dental assistant</p>
        </div>

        <div className="flex-1 min-h-0 max-w-screen-xl mx-auto w-full px-6 pb-6 grid grid-cols-[1fr_280px] gap-6">
          {/* Chat area */}
          <div className="flex flex-col min-h-0 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden">
            {renderMessages(scrollRef)}
            <div className="border-t border-border p-4 bg-card">
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Buddy anything about your child's dental health…"
                  className="h-12 rounded-2xl bg-background"
                />
                <Button type="submit" size="icon" disabled={busy || !input.trim()} className="h-12 w-12 rounded-2xl shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Try asking
              </h3>
              <div className="space-y-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={busy}
                    className="w-full text-left text-sm rounded-xl bg-secondary text-secondary-foreground px-3.5 py-2.5 hover:bg-accent transition-colors disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">About Buddy</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Buddy is an AI trained on pediatric dental guidelines. Always consult a qualified dentist for medical decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
