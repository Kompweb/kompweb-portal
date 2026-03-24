import { useParams, Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";

interface ServiceData {
  name: string;
  tagline: string;
  description: string;
  accent: string;
  accentText: string;
  accentBorder: string;
  accentBg: string;
  icon: string;
  features: { title: string; body: string }[];
  bullets: string[];
  cta: string;
}

const SERVICES: Record<string, ServiceData> = {
  "web-design": {
    name: "Web Design",
    tagline: "Sites that convert, not just impress.",
    description:
      "We design high-performance websites built around your business goals — not just aesthetics. Every layout, color, and copy decision is made with one question in mind: does this move a visitor closer to becoming a customer?",
    accent: "from-sky-500/20 via-sky-500/5 to-transparent",
    accentText: "text-sky-400",
    accentBorder: "border-sky-500/20",
    accentBg: "bg-sky-500/10",
    icon: "🖥️",
    features: [
      { title: "Conversion-First Layouts", body: "Every page is architected around a clear journey — from first impression to CTA." },
      { title: "Mobile-Native Design", body: "Built mobile-first, tested across all devices, smooth on every screen size." },
      { title: "Brand Consistency", body: "Fonts, colors, and tone that match your brand across every page and touchpoint." },
      { title: "Fast Load Times", body: "Optimized assets and architecture that score green on Core Web Vitals." },
      { title: "CMS Integration", body: "Edit your content yourself — no developer needed for routine updates." },
      { title: "SEO-Ready Structure", body: "Clean semantic HTML, metadata, and schema markup built in from day one." },
    ],
    bullets: ["Custom design (no templates)", "Figma prototypes before dev", "Up to 10 pages included", "Copywriting guidance", "Launch support & handoff"],
    cta: "Start a web design project",
  },
  "development": {
    name: "Development",
    tagline: "Engineered to scale, built to last.",
    description:
      "From landing pages to full-stack web apps, we write clean, maintainable code that your business can grow into. We use modern tooling (React, Next.js, Node, Postgres) and build with performance and reliability at the core.",
    accent: "from-violet-500/20 via-violet-500/5 to-transparent",
    accentText: "text-violet-400",
    accentBorder: "border-violet-500/20",
    accentBg: "bg-violet-500/10",
    icon: "⚙️",
    features: [
      { title: "Full-Stack Builds", body: "Frontend, backend, database, and APIs — we handle the whole stack." },
      { title: "API Integrations", body: "Connect your site to CRMs, payment processors, analytics, and third-party services." },
      { title: "Performance Optimization", body: "Lighthouse scores, query optimization, and caching strategies that keep your app fast." },
      { title: "Scalable Architecture", body: "Code designed for growth — easy to extend, maintain, and hand off to an internal team." },
      { title: "Auth & Security", body: "Secure authentication flows, role-based access, and data protection built in." },
      { title: "Deployment & DevOps", body: "CI/CD pipelines, environment config, and cloud hosting setup handled for you." },
    ],
    bullets: ["React / Next.js / Node", "REST & GraphQL APIs", "PostgreSQL / MySQL", "Cloud hosting setup", "Code documentation included"],
    cta: "Start a development project",
  },
  "seo-marketing": {
    name: "SEO / Marketing",
    tagline: "Rank higher. Get found. Grow faster.",
    description:
      "We combine technical SEO, content strategy, and conversion tracking to grow your organic traffic in a way that compounds over time. No shortcuts, no black-hat tactics — just sustainable growth driven by data.",
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/20",
    accentBg: "bg-emerald-500/10",
    icon: "📈",
    features: [
      { title: "Technical SEO Audit", body: "We find and fix crawl errors, broken links, slow pages, and indexing issues." },
      { title: "Keyword Research", body: "Targeting the terms your customers actually search — not just high-volume vanity keywords." },
      { title: "On-Page Optimization", body: "Title tags, meta descriptions, headers, and internal linking structure overhauled." },
      { title: "Content Strategy", body: "A content calendar built around topics that drive qualified traffic to your site." },
      { title: "Local SEO", body: "Google Business Profile, local citations, and geo-targeted content for location-based businesses." },
      { title: "Monthly Reporting", body: "Clear reports showing rank changes, traffic growth, and actions taken." },
    ],
    bullets: ["Full site SEO audit", "Competitor gap analysis", "Monthly content plan", "Backlink strategy", "Google Search Console setup"],
    cta: "Grow my organic traffic",
  },
  "ai-agents": {
    name: "AI Agents",
    tagline: "Automate the work. Keep the results.",
    description:
      "We build custom AI agents that handle repetitive, high-volume tasks inside your business — lead qualification, customer responses, content creation, reporting, and more. Your team handles strategy. The agents handle execution.",
    accent: "from-fuchsia-500/20 via-fuchsia-500/5 to-transparent",
    accentText: "text-fuchsia-400",
    accentBorder: "border-fuchsia-500/20",
    accentBg: "bg-fuchsia-500/10",
    icon: "🤖",
    features: [
      { title: "Lead Qualification Agents", body: "Automatically score, tag, and route incoming leads before a human ever touches them." },
      { title: "Customer Response Agents", body: "Draft responses to common inquiries, FAQs, and support tickets with AI — reviewed before sending." },
      { title: "Content Generation Pipelines", body: "Blog posts, social captions, email sequences — generated from your brand voice on schedule." },
      { title: "Data Processing Agents", body: "Aggregate, clean, and summarize data from multiple sources into actionable reports." },
      { title: "CRM Update Automation", body: "Agents that update contact records, log activity, and trigger follow-up sequences automatically." },
      { title: "Custom Agent Workflows", body: "We build to your process — any repetitive multi-step workflow can be automated with the right agent." },
    ],
    bullets: ["Custom-built for your workflow", "Integrated with your existing tools", "Human-in-the-loop controls", "Ongoing monitoring & tuning", "Built on GPT-4 / Claude / Gemini"],
    cta: "Build my AI agent",
  },
  "automation": {
    name: "Automation",
    tagline: "Less manual work. More consistent output.",
    description:
      "We map your business processes and replace the manual, repetitive parts with automated workflows — using tools like Make, n8n, Zapier, and custom scripts. The result: faster operations, fewer errors, and a team that can focus on what matters.",
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/20",
    accentBg: "bg-amber-500/10",
    icon: "⚡",
    features: [
      { title: "Process Mapping", body: "We document your current workflow and identify every step that can be automated." },
      { title: "CRM Automation", body: "Deals move through stages automatically — triggers, tasks, and notifications fire without manual input." },
      { title: "Email & Follow-Up Sequences", body: "Time-based and behavior-based sequences that run in the background, 24/7." },
      { title: "Form & Lead Routing", body: "Every form submission is automatically processed, assigned, and logged without human touch." },
      { title: "Invoice & Document Generation", body: "Proposals, invoices, and contracts auto-generated from data you already have." },
      { title: "Cross-Platform Sync", body: "Keep your CRM, spreadsheet, project management, and comms tools in sync automatically." },
    ],
    bullets: ["Make / n8n / Zapier", "Custom scripts & webhooks", "Error handling & fallbacks", "Full documentation", "Training your team on the workflows"],
    cta: "Automate my business",
  },
  "analytics": {
    name: "Analytics",
    tagline: "Know what's working. Double down on it.",
    description:
      "We implement, clean up, and interpret your analytics stack so you can make decisions based on real data — not gut feeling. From GA4 setup to custom dashboards, we turn raw numbers into actionable insights.",
    accent: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    accentText: "text-cyan-400",
    accentBorder: "border-cyan-500/20",
    accentBg: "bg-cyan-500/10",
    icon: "📊",
    features: [
      { title: "GA4 Setup & Audit", body: "Full configuration of Google Analytics 4 — events, conversions, and audiences set up properly." },
      { title: "Google Tag Manager", body: "Clean GTM container with organized tags, triggers, and variables — no code spaghetti." },
      { title: "Conversion Tracking", body: "Every form, phone call, purchase, and micro-conversion tracked and attributed correctly." },
      { title: "Custom Dashboards", body: "Looker Studio or GA4 dashboards that show your KPIs at a glance — not a wall of numbers." },
      { title: "Funnel Analysis", body: "See exactly where users drop off in your conversion funnel and what to fix first." },
      { title: "Monthly Analytics Reviews", body: "Monthly calls where we walk through the numbers and tell you what to do next." },
    ],
    bullets: ["GA4 + GTM implementation", "E-commerce & lead gen tracking", "Audience segmentation", "Attribution modeling", "Heatmaps & session recording"],
    cta: "Set up my analytics",
  },
  "branding": {
    name: "Branding",
    tagline: "Look the part. Own the space.",
    description:
      "We create brand identities that are distinctive, flexible, and built to work across every channel — from your website and social media to business cards and signage. Your brand is your first impression — we make sure it counts.",
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
    accentText: "text-rose-400",
    accentBorder: "border-rose-500/20",
    accentBg: "bg-rose-500/10",
    icon: "✦",
    features: [
      { title: "Logo Design", body: "Versatile logo marks in vector format — works at 16px favicon and 16-foot billboard." },
      { title: "Color System", body: "Primary, secondary, and neutral palette with accessibility contrast ratios validated." },
      { title: "Typography", body: "Font pairing and hierarchy that expresses your brand's personality consistently." },
      { title: "Brand Guidelines", body: "A documented system so you (and anyone you hire) always presents the brand correctly." },
      { title: "Social Media Kit", body: "Profile images, cover photos, post templates, and story frames in every format you need." },
      { title: "Brand Voice & Messaging", body: "Tagline, positioning statement, and tone-of-voice guidelines for your copy." },
    ],
    bullets: ["3 initial logo concepts", "Unlimited revisions (up to 3 rounds)", "Full source files (AI, SVG, PNG)", "Brand book PDF", "Social media asset pack"],
    cta: "Build my brand",
  },
};

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { openContactModal } = useContactModal();
  const service = slug ? SERVICES[slug] : undefined;

  if (!service) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] p-8">
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Service not found.</p>
          <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors flex items-center justify-center gap-1">
            <ArrowLeft size={13} /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0a0a0a] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/60 text-sm md:text-xs transition-colors mb-8">
          <ArrowLeft size={13} /> All services
        </Link>

        {/* Hero */}
        <div className={`relative rounded-2xl border ${service.accentBorder} overflow-hidden mb-8 p-6 md:p-10 bg-gradient-to-br ${service.accent}`}>
          <div className="flex items-start gap-4 md:gap-5">
            <div className={`shrink-0 w-14 h-14 rounded-2xl ${service.accentBg} border ${service.accentBorder} flex items-center justify-center text-2xl`}>
              {service.icon}
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${service.accentText}`}>Service</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{service.name}</h1>
              <p className="text-white/50 text-base font-medium">{service.tagline}</p>
            </div>
          </div>
          <p className="mt-5 text-white/55 text-base md:text-sm leading-relaxed max-w-2xl">{service.description}</p>
          <button
            onClick={openContactModal}
            className="mt-6 inline-flex items-center gap-2 h-11 md:h-10 px-5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-colors"
          >
            {service.cta} <ArrowRight size={13} />
          </button>
        </div>

        {/* Features grid */}
        <div className="mb-8">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">What's included</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((f) => (
              <div key={f.title} className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] transition-colors">
                <div className={`w-8 h-8 rounded-lg ${service.accentBg} border ${service.accentBorder} flex items-center justify-center mb-3`}>
                  <Zap size={13} className={service.accentText} />
                </div>
                <p className="text-white text-base md:text-sm font-semibold mb-1.5">{f.title}</p>
                <p className="text-white/40 text-sm md:text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package bullets + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Package includes</p>
            <ul className="space-y-3">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${service.accentText}`} />
                  <span className="text-white/60 text-sm md:text-xs leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-6 rounded-2xl border ${service.accentBorder} bg-gradient-to-br ${service.accent} flex flex-col justify-between`}>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${service.accentText}`}>Ready to start?</p>
              <p className="text-white text-xl font-bold mb-2">Let's talk about your project.</p>
              <p className="text-white/45 text-sm md:text-xs leading-relaxed mb-6">
                Every engagement starts with a free strategy call. We'll learn about your goals and recommend the right approach.
              </p>
            </div>
            <button
              onClick={openContactModal}
              className="w-full h-11 md:h-10 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              {service.cta} <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Other services */}
        <div className="mt-10">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Other services</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SERVICES)
              .filter(([s]) => s !== slug)
              .map(([s, d]) => (
                <Link
                  key={s}
                  href={`/services/${s}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 md:py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white hover:border-white/[0.18] text-sm md:text-xs transition-all"
                >
                  {d.name}
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
