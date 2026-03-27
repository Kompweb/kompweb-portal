import { useState, useEffect } from "react";
import { Lock, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RequireAdminProps {
  children: React.ReactNode;
}

const SESSION_KEY = "kw_admin";

export function getAdminKey(): string {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return "";
    return JSON.parse(raw)?.key ?? "";
  } catch {
    return "";
  }
}

export function clearAdminSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const key = getAdminKey();
    if (key) {
      setAuthed(true);
    }
    setChecked(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ key: password }));
        setAuthed(true);
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!checked) return null;

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display tracking-tight">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-1">
              This area is restricted to KOMPWEB staff only.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Admin Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
              autoComplete="current-password"
              autoFocus
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-3 py-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full rounded-xl"
            disabled={loading || !password}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying…
              </>
            ) : (
              "Sign In to Admin"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          KOMPWEB Studios · Restricted Area
        </p>
      </div>
    </div>
  );
}
