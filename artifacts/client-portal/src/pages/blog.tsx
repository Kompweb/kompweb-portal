import { ArrowRight, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

const POSTS = [
  {
    slug: "ai-agents-for-small-business",
    tag: "AI & Automation",
    date: "Mar 18, 2026",
    readTime: "5 min read",
    title: "How AI Agents Are Replacing Repetitive Work for Small Businesses",
    excerpt:
      "From automated lead follow-up to invoice generation, AI agents handle the work that used to eat 3–4 hours a day. Here's how we set them up for our clients.",
    accent: "from-violet-500/20 to-transparent",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    slug: "crm-automation-guide",
    tag: "CRM & Growth",
    date: "Mar 11, 2026",
    readTime: "4 min read",
    title: "Stop Losing Leads: A Practical CRM Automation Guide",
    excerpt:
      "Most businesses lose 60% of inbound leads because nobody follows up fast enough. CRM automation closes that gap — automatically, every time.",
    accent: "from-sky-500/20 to-transparent",
    tagColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  {
    slug: "web-design-conversion",
    tag: "Web Design",
    date: "Mar 4, 2026",
    readTime: "6 min read",
    title: "Why Most Business Websites Don't Convert (And How to Fix It)",
    excerpt:
      "A beautiful site that doesn't generate leads is just digital art. We break down the five conversion mistakes we see on almost every business website.",
    accent: "from-emerald-500/20 to-transparent",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    slug: "google-tag-manager-setup",
    tag: "Analytics",
    date: "Feb 25, 2026",
    readTime: "7 min read",
    title: "The Right Way to Set Up Google Tag Manager in 2026",
    excerpt:
      "Most GTM setups we audit are broken — missing conversions, double-firing tags, and garbage data. Here's how to do it properly from scratch.",
    accent: "from-amber-500/20 to-transparent",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    slug: "seo-for-service-businesses",
    tag: "SEO & Marketing",
    date: "Feb 17, 2026",
    readTime: "5 min read",
    title: "Local SEO for Service Businesses: What Actually Works in 2026",
    excerpt:
      "We've ranked hundreds of local service pages. The strategies that work have changed significantly — here's what our data shows for this year.",
    accent: "from-rose-500/20 to-transparent",
    tagColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    slug: "building-with-ai-tools",
    tag: "Behind the Build",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    title: "Behind the Build: How We Use AI Tools in Our Own Workflow",
    excerpt:
      "We don't just build AI systems for clients — we use them internally. This is an honest look at what we use, what saves time, and what's still overhyped.",
    accent: "from-fuchsia-500/20 to-transparent",
    tagColor: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  },
];

export function Blog() {
  return (
    <div className="flex-1 bg-[#0a0a0a] py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-3">Kompweb Blog</p>
          <h1 className="text-3xl md:text-2xl font-bold text-white tracking-tight mb-3">
            Insights on AI, Design & Growth
          </h1>
          <p className="text-white/40 text-base md:text-sm max-w-xl">
            Practical guides, behind-the-scenes breakdowns, and industry insights from the Kompweb team.
          </p>
        </div>

        {/* ── Featured post ── */}
        <Link href={`/blog/${POSTS[0].slug}`} className={`relative rounded-2xl border border-white/[0.08] overflow-hidden mb-6 bg-gradient-to-br ${POSTS[0].accent} bg-white/[0.02] group cursor-pointer block hover:border-white/[0.18] transition-all duration-200`}>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide ${POSTS[0].tagColor}`}>
                <Tag size={9} /> {POSTS[0].tag}
              </span>
              <span className="text-white/30 text-xs flex items-center gap-1"><Clock size={10} /> {POSTS[0].readTime}</span>
              <span className="text-white/30 text-xs">{POSTS[0].date}</span>
            </div>
            <h2 className="text-2xl md:text-2xl font-bold text-white tracking-tight mb-3 leading-snug group-hover:text-white/80 transition-colors">
              {POSTS[0].title}
            </h2>
            <p className="text-white/45 text-base md:text-sm leading-relaxed mb-5 max-w-2xl">
              {POSTS[0].excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-white/60 text-sm font-medium group-hover:text-white transition-colors">
              Read article <ArrowRight size={13} />
            </span>
          </div>
        </Link>

        {/* ── Grid of remaining posts ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POSTS.slice(1).map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden group cursor-pointer hover:border-white/[0.18] transition-all duration-200 block"
            >
              {/* Accent gradient strip */}
              <div className={`h-[2px] w-full bg-gradient-to-r ${post.accent}`} />

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold uppercase tracking-wide ${post.tagColor}`}>
                    <Tag size={8} /> {post.tag}
                  </span>
                </div>

                <h3 className="text-base md:text-sm font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-white/75 transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/35 text-sm md:text-xs leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-white/25 text-xs flex items-center gap-1">
                    <Clock size={9} /> {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white/25 text-xs group-hover:text-white/50 transition-colors">
                    {post.date} <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Coming soon notice ── */}
        <div className="mt-10 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01] text-center">
          <p className="text-white/25 text-sm">More articles coming soon — follow us on social for updates.</p>
        </div>

      </div>
    </div>
  );
}
