import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useListProjects } from "@workspace/api-client-react";
import { Search, FolderOpen, Clock, CheckCheck, AlertCircle, Loader2, X, ChevronRight, Sparkles } from "lucide-react";

function getSession() {
  try {
    const raw = sessionStorage.getItem("kw_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const STATUS_LABEL: Record<string, string> = {
  submitted:      "Submitted",
  in_review:      "In Review",
  in_progress:    "In Progress",
  needs_feedback: "Needs Feedback",
  delivered:      "Delivered",
  cancelled:      "Cancelled",
};

const STATUS_COLOR: Record<string, string> = {
  submitted:      "bg-blue-500/15 text-blue-400 border-blue-500/25",
  in_review:      "bg-amber-500/15 text-amber-400 border-amber-500/25",
  in_progress:    "bg-violet-500/15 text-violet-400 border-violet-500/25",
  needs_feedback: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  delivered:      "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  cancelled:      "bg-red-500/15 text-red-400 border-red-500/25",
};

const STATUS_GLOW: Record<string, string> = {
  submitted:      "shadow-blue-500/10",
  in_review:      "shadow-amber-500/10",
  in_progress:    "shadow-violet-500/15",
  needs_feedback: "shadow-orange-500/10",
  delivered:      "shadow-emerald-500/15",
  cancelled:      "shadow-red-500/10",
};

const STATUS_BORDER_LEFT: Record<string, string> = {
  submitted:      "border-l-blue-500/50",
  in_review:      "border-l-amber-500/50",
  in_progress:    "border-l-violet-500/60",
  needs_feedback: "border-l-orange-500/50",
  delivered:      "border-l-emerald-500/60",
  cancelled:      "border-l-red-500/40",
};

const STATUS_ID_BG: Record<string, string> = {
  submitted:      "bg-blue-500/10 border-blue-500/20 text-blue-400",
  in_review:      "bg-amber-500/10 border-amber-500/20 text-amber-400",
  in_progress:    "bg-violet-500/10 border-violet-500/20 text-violet-400",
  needs_feedback: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  delivered:      "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  cancelled:      "bg-red-500/10 border-red-500/20 text-red-400",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  submitted:      <Clock size={11} />,
  in_review:      <Search size={11} />,
  in_progress:    <FolderOpen size={11} />,
  needs_feedback: <AlertCircle size={11} />,
  delivered:      <CheckCheck size={11} />,
  cancelled:      <AlertCircle size={11} />,
};

export function TrackLookup() {
  const [, setLocation] = useLocation();
  const session = getSession();

  const { data: projects, isLoading, error } = useListProjects(
    session?.email ? { clientEmail: session.email } : undefined,
    { query: { enabled: !!session?.email } }
  );

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  return (
    <div
      className="flex-1 bg-[#0a0a0a] flex flex-col items-center py-16 px-4 relative cursor-pointer min-h-screen overflow-hidden"
      onClick={handleClose}
    >
      {/* Ambient color blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-violet-600/8 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-indigo-600/6 blur-[90px]" />
      </div>

      {/* X close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.07] border border-white/[0.12] text-white/50 hover:bg-white/[0.14] hover:text-white transition-all"
        aria-label="Close"
      >
        <X size={20} strokeWidth={2} />
      </button>

      {/* Content */}
      <div
        className="flex flex-col items-center w-full max-w-2xl cursor-default relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-6 shadow-lg shadow-violet-500/5">
            <Sparkles size={11} />
            My Projects
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-3 leading-tight">
            Your projects
          </h1>
          {session?.name && (
            <p className="text-white/40 text-sm">
              Logged in as <span className="text-white/70 font-semibold">{session.name}</span>
            </p>
          )}
        </div>

        {/* Project list */}
        {isLoading && (
          <div className="flex items-center gap-3 text-white/40 py-16">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading your projects…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
            <AlertCircle size={16} />
            Could not load projects. Please try again.
          </div>
        )}

        {!isLoading && !error && projects && projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-5">
              <FolderOpen size={22} className="text-white/20" />
            </div>
            <p className="text-white/40 text-sm font-medium mb-2">No projects yet</p>
            <p className="text-white/25 text-xs mb-6">
              Once you submit a request, it will appear here.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Submit a request
            </Link>
          </div>
        )}

        {!isLoading && !error && projects && projects.length > 0 && (
          <div className="w-full flex flex-col gap-3">
            {projects.map((p) => (
              <Link key={p.id} href={`/track/${p.id}`}>
                <div
                  className={`
                    flex items-center gap-4 p-5 rounded-2xl
                    border border-l-4 border-white/[0.08]
                    ${STATUS_BORDER_LEFT[p.status] ?? "border-l-white/10"}
                    bg-white/[0.025]
                    hover:bg-white/[0.05] hover:border-white/[0.14]
                    shadow-lg ${STATUS_GLOW[p.status] ?? ""}
                    transition-all duration-200 cursor-pointer group
                  `}
                >
                  {/* ID badge — tinted by status */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${STATUS_ID_BG[p.status] ?? "bg-white/[0.06] border-white/[0.08] text-white/40"}`}>
                    <span className="text-xs font-mono font-bold">#{p.id}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-base truncate mb-1.5">{p.title}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${STATUS_COLOR[p.status] ?? "bg-white/10 text-white/40 border-white/10"}`}>
                        {STATUS_ICON[p.status]}
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                      <span className="text-white/30 text-xs">·</span>
                      <span className="text-white/40 text-xs capitalize">{p.projectType?.replace(/_/g, " ")}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={18} className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </div>
              </Link>
            ))}

            {/* Submit another */}
            <div className="mt-8">
              <Link
                href="/submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-semibold hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-200 transition-all"
              >
                <span className="text-lg leading-none">+</span> Submit a new project request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
