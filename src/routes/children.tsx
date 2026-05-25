import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth-context";
import { MobileShell, PageHeader } from "@/components/mobile-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Baby } from "lucide-react";
import { toast } from "sonner";

const EMOJIS = ["🧒", "👦", "👧", "👶", "🧑‍🦱", "👨‍🦰"];

export const Route = createFileRoute("/children")({
  component: ChildrenPage,
  ssr: false,
});

function ChildrenPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ["children", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("children").select("*").order("created_at")).data ?? [],
  });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [emoji, setEmoji] = useState("🧒");

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("children").insert({
        parent_id: user!.id, name, date_of_birth: dob || null, avatar_emoji: emoji,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`${name} added!`);
      setOpen(false); setName(""); setDob(""); setEmoji("🧒");
      qc.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("children").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed");
      qc.invalidateQueries({ queryKey: ["children"] });
    },
  });

  return (
    <MobileShell>
      <div className="max-w-screen-xl mx-auto px-5 pb-6 lg:px-6 lg:py-8">
        <PageHeader
          title="My kids"
          subtitle="Manage your children's profiles"
          right={
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-2xl gap-2">
                  <Plus className="h-4 w-4" /> Add a child
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl max-w-md">
                <DialogTitle>Add a child</DialogTitle>
                <div className="space-y-4 mt-2">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl mt-1.5" placeholder="e.g. Aarav" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date of birth</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-12 rounded-xl mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Avatar</Label>
                    <div className="flex gap-2 mt-2">
                      {EMOJIS.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setEmoji(e)}
                          className={`h-12 w-12 rounded-xl text-2xl flex items-center justify-center border-2 transition-colors ${
                            emoji === e ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button disabled={!name || add.isPending} onClick={() => add.mutate()} className="w-full rounded-2xl h-12">
                    {add.isPending ? "Adding…" : "Save child"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          }
        />

        {data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center max-w-lg mx-auto">
            <Baby className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-semibold">No children yet</p>
            <p className="text-muted-foreground mt-2">Add a child profile to start booking dental visits.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {data.map((c: any) => (
              <div key={c.id} className="rounded-2xl bg-card border border-border p-5 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-3xl shrink-0">
                    {c.avatar_emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg truncate">{c.name}</p>
                    {c.date_of_birth && (
                      <p className="text-sm text-muted-foreground">
                        Age {Math.max(0, new Date().getFullYear() - new Date(c.date_of_birth).getFullYear())} years
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => del.mutate(c.id)}
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
