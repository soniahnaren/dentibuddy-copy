import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { api } from "@/lib/api";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
  ssr: false,
});

function TipsPage() {
  const { data = [] } = useQuery({
    queryKey: ["tips"],
    queryFn: () => api.get<any[]>("/tips"),
  });

  const byCategory = data.reduce<Record<string, any[]>>((acc, t: any) => {
    const cat = t.category ?? "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(t);
    return acc;
  }, {});

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader title="Dental tips" subtitle="Daily care for healthy little smiles" />

        {Object.entries(byCategory).length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {data.map((t: any) => <TipCard key={t.id} tip={t} />)}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(byCategory).map(([cat, tips]) => (
              <section key={cat}>
                <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {tips.map((t: any) => <TipCard key={t.id} tip={t} />)}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}

function TipCard({ tip }: { tip: any }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow">
      <div className="h-12 w-12 rounded-xl bg-mint flex items-center justify-center text-2xl mb-4">
        {tip.emoji}
      </div>
      <p className="font-semibold text-base mb-1.5">{tip.title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
      <span className="text-xs uppercase font-bold text-primary mt-3 inline-block">{tip.category}</span>
    </div>
  );
}
