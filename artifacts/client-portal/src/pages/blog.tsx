import { useState } from "react";
import { ArrowRight, Clock, Tag, CheckCircle2, AlertCircle, TrendingUp, Globe, Zap, BarChart3, Search, Bot, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const POSTS = [
  {
    slug: "ai-agents-for-small-business",
    tag: "AI & Automation",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    title: "How AI Agents Are Replacing Repetitive Work for Small Businesses",
    excerpt:
      "From automated lead follow-up to invoice generation, AI agents handle the work that used to eat 3–4 hours a day.",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    accentColor: "violet",
  },
  {
    slug: "crm-automation-guide",
    tag: "CRM & Growth",
    date: "Mar 11, 2026",
    readTime: "4 min read",
    title: "Stop Losing Leads: A Practical CRM Automation Guide",
    excerpt:
      "Most businesses lose 60% of inbound leads because nobody follows up fast enough. CRM automation closes that gap — automatically.",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    accentColor: "sky",
  },
  {
    slug: "web-design-conversion",
    tag: "Web Design",
    date: "Mar 4, 2026",
    readTime: "6 min read",
    title: "Why Most Business Websites Don't Convert (And How to Fix It)",
    excerpt:
      "A beautiful site that doesn't generate leads is just digital art. Here are the five conversion mistakes we see on almost every website.",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    accentColor: "emerald",
  },
  {
    slug: "google-tag-manager-setup",
    tag: "Analytics",
    date: "Feb 25, 2026",
    readTime: "7 min read",
    title: "The Right Way to Set Up Google Tag Manager in 2026",
    excerpt:
      "Most GTM setups we audit are broken — missing conversions, double-firing tags, and garbage data. Here's how to do it right.",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    accentColor: "amber",
  },
  {
    slug: "seo-for-service-businesses",
    tag: "SEO & Marketing",
    date: "Feb 17, 2026",
    readTime: "5 min read",
    title: "Local SEO for Service Businesses: What Actually Works in 2026",
    excerpt:
      "We've ranked hundreds of local service pages. The strategies that work have changed — here's what our data shows.",
    tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    accentColor: "rose",
  },
  {
    slug: "building-with-ai-tools",
    tag: "Behind the Build",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    title: "Behind the Build: How We Use AI Tools in Our Own Workflow",
    excerpt:
      "We don't just build AI systems for clients — we use them internally. An honest look at what saves time and what's still overhyped.",
    tagColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    accentColor: "fuchsia",
  },
];

const DEMO_TABS = [
  { id: "seo", label: "SEO Audit" },
  { id: "automation", label: "AI Automation" },
  { id: "web", label: "Web Strategy" },
];

const DEMO_CONTENT: Record<string, React.ReactNode> = {
  seo: (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
        <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
          <Search size={14} className="text-white/50" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Prompt</p>
          <p className="text-white/75 text-xs leading-relaxed">Audit this local HVAC company's website for SEO gaps. Flag quick wins and rank-blocking issues.</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">Site Audit — hvacpros.com</p>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Domain Authority", value: "28", status: "warn", note: "Below competitors" },
            { label: "Page Speed", value: "51", status: "bad", note: "Critical — fix first" },
            { label: "Local Rank", value: "#7", status: "warn", note: "Map pack target: top 3" },
          ].map(m => (
            <div key={m.label} className={`p-2 rounded-lg border text-center ${m.status === "bad" ? "border-red-500/20 bg-red-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
              <p className={`text-base font-bold ${m.status === "bad" ? "text-red-400" : "text-amber-400"}`}>{m.value}</p>
              <p className="text-white/40 text-[9px] leading-tight mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {[
            { label: "Google Business Profile incomplete", type: "bad", fix: "Add 15 missing service categories" },
            { label: "Zero local service area pages", type: "bad", fix: "Create pages for 6 target cities" },
            { label: "No schema markup on homepage", type: "warn", fix: "Add LocalBusiness + Service schema" },
            { label: "Title tags missing primary keyword", type: "warn", fix: "Rewrite 8 pages — template ready" },
            { label: "43 unlinked brand mentions found", type: "good", fix: "Convert to backlinks — high ROI" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              {item.type === "bad" ? <AlertCircle size={12} className="text-red-400 mt-0.5 shrink-0" /> :
               item.type === "warn" ? <AlertCircle size={12} className="text-amber-400 mt-0.5 shrink-0" /> :
               <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 shrink-0" />}
              <div>
                <p className="text-white/60 text-[11px] font-medium">{item.label}</p>
                <p className="text-white/30 text-[10px]">{item.fix}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          <TrendingUp size={11} className="text-emerald-400" />
          <p className="text-emerald-400 text-[11px] font-semibold">Projected outcome: +40–60% organic calls in 90 days</p>
        </div>
      </div>
    </div>
  ),
  automation: (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
        <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
          <Bot size={14} className="text-white/50" />
        </div>
        <div className="flex-1">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Prompt</p>
          <p className="text-white/75 text-xs leading-relaxed">Map the lead follow-up process for a real estate agency and identify automation opportunities.</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">Automation Map — Realty Group</p>

        <div className="space-y-2">
          {[
            { step: "Lead submits inquiry form", current: "Manual check twice daily", after: "Instant AI response + CRM entry", saved: "3–4 hrs/day", color: "violet" },
            { step: "Follow-up sequence", current: "Sales rep sends manually", after: "7-touch automated sequence", saved: "2 hrs/day", color: "sky" },
            { step: "Showing confirmation", current: "Phone / email tag", after: "Auto-confirm + calendar sync", saved: "1 hr/day", color: "emerald" },
            { step: "Post-visit review request", current: "Forgotten 80% of the time", after: "Triggered 3 days after visit", saved: "3× more reviews", color: "amber" },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
              <p className="text-white/60 text-[11px] font-semibold mb-1.5">{item.step}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <p className="text-white/20 mb-0.5">Before</p>
                  <p className="text-red-400/70">{item.current}</p>
                </div>
                <div>
                  <p className="text-white/20 mb-0.5">After KOMPWEB</p>
                  <p className="text-emerald-400">{item.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          <Zap size={11} className="text-violet-400" />
          <p className="text-violet-400 text-[11px] font-semibold">Total time recovered: ~6 hours/day per agent</p>
        </div>
      </div>
    </div>
  ),
  web: (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
        <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
          <Globe size={14} className="text-white/50" />
        </div>
        <div className="flex-1">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Prompt</p>
          <p className="text-white/75 text-xs leading-relaxed">Review this law firm's website and identify why conversion rates are below 1%. Give a prioritized fix list.</p>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
        <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">Conversion Audit — lawfirmsite.com</p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Conversion Rate", value: "0.7%", status: "bad" },
            { label: "Avg. Load Time", value: "6.2s", status: "bad" },
            { label: "Mobile Score", value: "43/100", status: "bad" },
            { label: "CTA Clarity", value: "Unclear", status: "warn" },
          ].map(m => (
            <div key={m.label} className={`p-2 rounded-lg border flex items-center justify-between ${m.status === "bad" ? "border-red-500/20 bg-red-500/5" : "border-amber-500/20 bg-amber-500/5"}`}>
              <p className="text-white/40 text-[9px]">{m.label}</p>
              <p className={`text-xs font-bold ${m.status === "bad" ? "text-red-400" : "text-amber-400"}`}>{m.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest">Priority Fixes</p>
          {[
            { n: "1", fix: "Add single, prominent CTA in hero — replace 4 competing buttons", impact: "Est. +1.8% CVR" },
            { n: "2", fix: "Compress images + move to CDN — 5.1s savings", impact: "Est. 31% fewer bounces" },
            { n: "3", fix: "Add Google review widget above the fold", impact: "Trust signal — high impact" },
            { n: "4", fix: "Simplify contact form to 3 fields", impact: "Est. 2× more submissions" },
          ].map((item) => (
            <div key={item.n} className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white/50 shrink-0 mt-0.5">{item.n}</span>
              <div>
                <p className="text-white/60 text-[11px] font-medium">{item.fix}</p>
                <p className="text-emerald-400 text-[10px]">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

const PILLARS = [
  {
    icon: <Bot size={18} className="text-violet-400" />,
    color: "border-violet-500/20 bg-violet-500/5",
    title: "AI-First Thinking",
    body: "Every guide is written through the lens of what AI can do for your business — not theory, but deployed systems and real workflows.",
  },
  {
    icon: <BarChart3 size={18} className="text-sky-400" />,
    color: "border-sky-500/20 bg-sky-500/5",
    title: "Data-Backed Insights",
    body: "Our articles are grounded in real client data — conversion rates, ranking timelines, and automation ROI from projects we've shipped.",
  },
  {
    icon: <Zap size={18} className="text-amber-400" />,
    color: "border-amber-500/20 bg-amber-500/5",
    title: "Practical & Actionable",
    body: "No fluff. Every piece ends with steps you can take this week — whether you work with us or implement it yourself.",
  },
  {
    icon: <Globe size={18} className="text-emerald-400" />,
    color: "border-emerald-500/20 bg-emerald-500/5",
    title: "Built for Service Businesses",
    body: "We write for the businesses we work with: agencies, contractors, e-commerce brands, and local service providers.",
  },
];

const FEATURED_POSTS = [POSTS[0], POSTS[2], POSTS[4]];

const TAG_TOPICS = ["AI & Automation", "Web Design", "SEO & Marketing", "CRM & Growth", "Analytics", "Behind the Build"];

export function Blog() {
  const [activeDemo, setActiveDemo] = useState("seo");

  return (
    <div className="flex-1 bg-[#0a0a0a]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-sky-600/8 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              KOMPWEB Insights
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-5">
              Build smarter.<br />
              <span className="text-white/40">Grow faster.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-base leading-relaxed mb-8 max-w-xl">
              Practical guides on AI automation, web design, and SEO — from the team that builds and ships these systems for real businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#articles" className="inline-flex items-center gap-2 h-10 px-5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors">
                Browse Articles <ArrowRight size={14} />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 h-10 px-5 border border-white/12 text-white/70 hover:text-white text-sm font-medium rounded-xl hover:border-white/25 transition-colors">
                Book a Free Call
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Interactive Demo ── */}
        <div className="py-16 md:py-20 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Your thinking partner</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-4">
                From strategy to results — faster than you'd expect
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-8">
                Before we build anything, we audit. SEO gaps, conversion blockers, automation opportunities — we map every angle so your investment targets the highest ROI first.
              </p>

              {/* Topic tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {DEMO_TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDemo(tab.id)}
                    className={`h-8 px-4 rounded-full text-xs font-semibold transition-all ${
                      activeDemo === tab.id
                        ? "bg-white text-black"
                        : "border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "3×", label: "More leads from SEO" },
                  { value: "6 hrs", label: "Recovered daily via AI" },
                  { value: "61%", label: "Less manual review time" },
                ].map(s => (
                  <div key={s.label} className="border border-white/[0.07] rounded-xl p-3 bg-white/[0.02]">
                    <p className="text-white text-lg font-bold mb-0.5">{s.value}</p>
                    <p className="text-white/30 text-[10px] leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: demo panel */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0f0f0f] p-4 shadow-2xl shadow-black/40 max-h-[480px] overflow-y-auto">
              {DEMO_CONTENT[activeDemo]}
            </div>
          </div>
        </div>

        {/* ── Topics strip ── */}
        <div className="py-10 border-b border-white/[0.06]">
          <p className="text-white/20 text-[10px] font-semibold uppercase tracking-widest text-center mb-6">Topics we cover</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TAG_TOPICS.map(topic => (
              <span key={topic} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/45 text-xs font-medium hover:border-white/15 hover:text-white/60 transition-all cursor-default">
                <Tag size={10} /> {topic}
              </span>
            ))}
          </div>
        </div>

        {/* ── Why Read This Blog ── */}
        <div className="py-16 border-b border-white/[0.06]">
          <div className="mb-10">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Built for growth</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Content you can actually use
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${p.color}`}>
                <div className="mb-4">{p.icon}</div>
                <h3 className="text-white text-sm font-bold mb-2">{p.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured Articles (case-study style) ── */}
        <div id="articles" className="py-16 border-b border-white/[0.06]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Featured reads</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">In-depth guides</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden hover:border-white/[0.18] hover:bg-white/[0.03] transition-all duration-200"
              >
                {/* Colored top bar */}
                <div className={`h-1 w-full ${
                  post.accentColor === "violet" ? "bg-gradient-to-r from-violet-500 to-violet-500/0" :
                  post.accentColor === "emerald" ? "bg-gradient-to-r from-emerald-500 to-emerald-500/0" :
                  post.accentColor === "rose" ? "bg-gradient-to-r from-rose-500 to-rose-500/0" :
                  "bg-gradient-to-r from-white/20 to-transparent"
                }`} />
                <div className="p-6">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wide mb-4 ${post.tagColor}`}>
                    <Tag size={8} /> {post.tag}
                  </span>
                  <h3 className="text-white text-base font-bold tracking-tight leading-snug mb-3 group-hover:text-white/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/35 text-xs leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/25 text-[10px]">
                      <span className="flex items-center gap-1"><Clock size={9} /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-white/30 text-[10px] font-semibold group-hover:text-white/60 transition-colors">
                      Read <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── All Articles Grid ── */}
        <div className="py-16 border-b border-white/[0.06]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">All articles</p>
              <h2 className="text-2xl font-bold text-white tracking-tight">Everything we've published</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${post.tagColor}`}>
                      <Tag size={7} /> {post.tag}
                    </span>
                    <span className="text-white/20 text-[10px] flex items-center gap-1"><Clock size={8} />{post.readTime}</span>
                  </div>
                  <h3 className="text-white/85 text-sm font-bold tracking-tight leading-snug mb-1.5 group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/30 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-white/15 group-hover:text-white/40 transition-colors mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="py-16 md:py-20">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-sky-600/5 pointer-events-none" />
            <div className="relative">
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Ready to grow?</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                Get a free strategy session
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                Not a sales call. A 30-minute working session where we look at your website, SEO, and automation opportunities together — and leave you with a prioritized action list.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 h-10 px-6 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors">
                  Book a Free Session <ArrowRight size={14} />
                </Link>
                <Link href="/submit" className="inline-flex items-center gap-2 h-10 px-6 border border-white/12 text-white/60 hover:text-white text-sm font-medium rounded-xl hover:border-white/25 transition-colors">
                  Start a Project
                </Link>
              </div>

              {/* Resource links */}
              <div className="mt-10 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {[
                  { label: "Services", desc: "Web design, SEO, AI systems, and more", href: "/services/web-design" },
                  { label: "About KOMPWEB", desc: "Who we are and how we work", href: "/about" },
                  { label: "Contact Us", desc: "Phone, location, and response time", href: "/contact" },
                ].map(r => (
                  <Link key={r.label} href={r.href} className="group flex items-start justify-between gap-3 p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all">
                    <div>
                      <p className="text-white/70 text-xs font-semibold mb-0.5 group-hover:text-white transition-colors">{r.label}</p>
                      <p className="text-white/30 text-[11px]">{r.desc}</p>
                    </div>
                    <ChevronRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors mt-0.5 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
