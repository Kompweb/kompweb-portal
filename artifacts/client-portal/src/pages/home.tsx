import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Lock, LogIn, LogOut, Mail, Search, LayoutDashboard } from "lucide-react";
import { Footer } from "@/components/footer";

// ─── Platform / Integration Partners ──────────────────────────────────────────
const integrations = [
  { name: "Google Cloud", icon: "/images/google-cloud-logo.png",                  color: "#4285F4" },
  { name: "Notion",       icon: "https://cdn.simpleicons.org/notion/FFFFFF",        color: "#FFFFFF" },
  { name: "Slack",        icon: "/images/slack-logo.png",                          color: "#AAAAAA" },
  { name: "Twilio",       icon: "/images/twilio-logo.png",                         color: "#F22F46" },
  { name: "HubSpot",      icon: "https://cdn.simpleicons.org/hubspot/FF7A59",       color: "#FF7A59" },
  { name: "Semrush",      icon: "https://cdn.simpleicons.org/semrush/FF642D",       color: "#FF642D" },
  { name: "Wix",          icon: "/images/wix-logo.png",                            color: "#F7B731" },
  { name: "Shippify",     icon: "https://logo.clearbit.com/shippify.com",           color: "#00C65E" },
];

// ─── Core Tech Stack ───────────────────────────────────────────────────────────
const techs = [
  { name: "JavaScript", color: "#F7DF1E", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", color: "#3178C6", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "React",      color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js",    color: "#FFFFFF", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "Node.js",    color: "#339933", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Python",     color: "#3776AB", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "WordPress",  color: "#21759B", icon: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Docker",     color: "#2496ED", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Figma",      color: "#F24E1E", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
];

const loginSchema = z.object({
  email: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

const USERS = [
  { identifier: "admin@kompweb.com", password: "kompweb2024", redirect: "/admin",  name: "Admin",       email: "admin@kompweb.com"  },
  { identifier: "client",            password: "1234",         redirect: "/track",  name: "Test Client", email: "client@kompweb.com" },
];

function getSession() {
  try { return JSON.parse(sessionStorage.getItem("kw_user") ?? "null") as { name: string; email: string } | null; }
  catch { return null; }
}

export function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [loginOpen, setLoginOpen] = useState(false);
  const [session, setSession] = useState(getSession);

  const handleSignOut = () => {
    sessionStorage.removeItem("kw_user");
    setSession(null);
  };

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onLogin = (data: LoginValues) => {
    const match = USERS.find(
      (u) => u.identifier === data.email && u.password === data.password
    );
    if (match) {
      const user = { name: match.name, email: match.email };
      sessionStorage.setItem("kw_user", JSON.stringify(user));
      setSession(user);
      setLoginOpen(false);
      setLocation(match.redirect);
    } else {
      toast({ variant: "destructive", title: "Invalid credentials", description: "Check your username and password." });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Login Modal ── */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="bg-[#111] border-white/10 text-white w-[calc(100%-24px)] max-w-[360px] rounded-2xl py-5 px-5">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white text-base font-semibold">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <Lock size={12} className="text-white/60" />
              </div>
              Client Login
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-3 mt-1">
            <div className="space-y-1">
              <Label className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Email or Username</Label>
              <Input
                type="text"
                placeholder="you@company.com or username"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9 rounded-xl text-sm focus:border-white/30 focus:ring-0"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-400 text-xs">{loginForm.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9 rounded-xl text-sm focus:border-white/30"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-400 text-xs">{loginForm.formState.errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={loginForm.formState.isSubmitting}
              className="w-full h-10 bg-white text-black hover:bg-white/90 font-semibold rounded-xl transition-all text-sm"
            >
              Sign In <ArrowRight size={14} className="ml-2" />
            </Button>
          </form>

        </DialogContent>
      </Dialog>

      {/* ── SPLIT SECTION ── */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">

        {/* Left — branding + tech stack */}
        <div className="lg:w-[55%] flex flex-col justify-between p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          {/* Logo + auth button row */}
          <div>
            <div className="flex items-start justify-between mb-10">
              <Link href="/">
                <img
                  src="/images/kompweb-logo-full.png"
                  alt="Kompweb Studios"
                  className="w-40 md:w-52 lg:w-64 object-contain hover:opacity-80 transition-opacity cursor-pointer"
                />
              </Link>

              {/* Auth area — changes based on session */}
              <div className="flex items-center gap-2 mt-[50px] mr-0 lg:mt-[60px] lg:mr-[50px]">
                {session ? (
                  <>
                    {session.email === "admin@kompweb.com" ? (
                      <button
                        onClick={() => setLocation("/admin")}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 flex-shrink-0"
                      >
                        <LayoutDashboard size={14} />
                        Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => setLocation("/track")}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 flex-shrink-0"
                      >
                        <Search size={14} />
                        Track Project
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 flex-shrink-0"
                      title="Sign out"
                    >
                      <LogOut size={14} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="flex items-center gap-2 lg:gap-3 bg-white text-black hover:bg-white/90 rounded-xl lg:rounded-2xl px-4 py-2 lg:px-7 lg:py-3.5 text-sm lg:text-base font-bold transition-all duration-150 flex-shrink-0 shadow-[0_0_28px_rgba(255,255,255,0.20)] hover:shadow-[0_0_44px_rgba(255,255,255,0.32)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <LogIn size={14} className="lg:hidden" />
                    <LogIn size={18} className="hidden lg:block" />
                    Client Login
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
              AI-first.<br />
              <span className="text-white/40">Built to perform.</span>
            </h1>
            <p className="text-base md:text-sm max-w-md leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 0 40px rgba(167,139,250,0.25)" }}>
              From AI agents and automation to full-stack web —{" "}
              <span className="text-white font-semibold">we build intelligent systems</span>{" "}
              that work for your business 24/7.
            </p>
          </div>

          {/* OpenClaw AI Badge + Integrations + Tech */}
          <div className="my-10">
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-red-500/40 rounded-2xl px-5 py-3.5 mb-6 backdrop-blur-sm transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
            >
              <img
                src="/images/openclaw-mascot.png"
                alt="OpenClaw"
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <div className="text-left">
                <p className="text-white font-semibold text-sm leading-tight">OpenClaw Control</p>
                <p className="text-white/40 text-xs group-hover:text-white/60 transition-colors">AI-driven performance, SEO &amp; automation — built into every project</p>
              </div>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(220,38,38,0.18)", color: "#f87171", border: "1px solid rgba(220,38,38,0.35)" }}>OpenClaw</span>
            </button>

            <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-3">
              Platforms &amp; integrations
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {integrations.map((item) => (
                <div
                  key={item.name}
                  title={item.name}
                  className="group flex items-center gap-2 rounded-xl px-3.5 py-2 border transition-all duration-150 cursor-pointer select-none hover:scale-[1.05] hover:-translate-y-px active:scale-[0.97]"
                  style={{ background: `${item.color}12`, borderColor: `${item.color}30` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = `${item.color}22`;
                    el.style.borderColor = `${item.color}65`;
                    el.style.boxShadow = `0 0 14px ${item.color}35`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = `${item.color}12`;
                    el.style.borderColor = `${item.color}30`;
                    el.style.boxShadow = "none";
                  }}
                >
                  <img src={item.icon} alt={item.name} className="w-4 h-4 object-contain rounded-sm" loading="lazy" />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: item.color }}>{item.name}</span>
                </div>
              ))}
            </div>

            <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-4">
              Technologies we work with
            </p>
            <div className="flex flex-wrap gap-3">
              {techs.map((tech) => (
                <div
                  key={tech.name}
                  title={tech.name}
                  className="group flex items-center gap-2 border rounded-xl px-3 py-2 transition-all duration-150 cursor-pointer select-none hover:scale-[1.05] hover:-translate-y-px active:scale-[0.97]"
                  style={{ background: `${tech.color}0f`, borderColor: `${tech.color}28` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = `${tech.color}20`;
                    el.style.borderColor = `${tech.color}60`;
                    el.style.boxShadow = `0 0 14px ${tech.color}30`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.background = `${tech.color}0f`;
                    el.style.borderColor = `${tech.color}28`;
                    el.style.boxShadow = "none";
                  }}
                >
                  <img src={tech.icon} alt={tech.name} className="w-4 h-4 object-contain" loading="lazy" />
                  <span className="text-white/60 group-hover:text-white/90 text-xs font-medium transition-colors">{tech.name}</span>
                </div>
              ))}
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-150 cursor-pointer select-none hover:scale-[1.05] hover:-translate-y-px active:scale-[0.97]"
                style={{ background: "rgba(220,38,38,0.10)", border: "1px solid rgba(220,38,38,0.20)" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(220,38,38,0.20)";
                  el.style.borderColor = "rgba(220,38,38,0.55)";
                  el.style.boxShadow = "0 0 14px rgba(220,38,38,0.30)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(220,38,38,0.10)";
                  el.style.borderColor = "rgba(220,38,38,0.20)";
                  el.style.boxShadow = "none";
                }}
              >
                <img src="/images/openclaw-mascot.png" alt="OpenClaw" className="w-3 h-3 object-contain" />
                <span className="text-xs font-medium" style={{ color: "#f87171" }}>OpenClaw AI</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right — Zoho CRM contact form */}
        <div id="contact" className="lg:w-[45%] bg-white/[0.03] border-l border-white/[0.06] flex flex-col justify-start p-8 md:p-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Mail size={16} className="text-white/60" />
            </div>
            <h2 className="text-white font-bold text-2xl tracking-tight">Get in Touch</h2>
          </div>

          <iframe
            src={`${import.meta.env.BASE_URL}zoho-contact.html`}
            title="Contact Form"
            style={{ border: "none", width: "100%", height: "545px", background: "transparent" }}
            scrolling="no"
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer scrollToContact />
    </div>
  );
}
