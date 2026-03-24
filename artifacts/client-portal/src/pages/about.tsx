import { useContactModal } from "@/context/contact-modal-context";

export function About() {
  const { openContactModal } = useContactModal();
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-6 py-12 md:py-14 text-white">

      {/* Header */}
      <div className="mb-12">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Company</p>
        <h1 className="text-4xl md:text-3xl font-bold mb-4">About Kompweb Studios</h1>
        <p className="text-white/55 text-base leading-relaxed">
          We are an AI-first freelance design and development studio helping modern businesses build smarter, faster, and more measurable digital systems.
        </p>
      </div>

      <div className="flex flex-col gap-12 leading-relaxed">

        {/* Mission */}
        <section>
          <h2 className="text-white font-semibold text-lg md:text-base mb-3">Our Mission</h2>
          <p className="text-white/70 text-base md:text-sm">
            At Kompweb Studios, we believe the best websites and digital systems are not just visually compelling — they are intelligent. Our mission is to build AI-powered infrastructure that works for your business 24/7: capturing leads, automating follow-ups, tracking performance, and continuously improving without constant manual input.
          </p>
        </section>

        {/* What we do */}
        <section>
          <h2 className="text-white font-semibold text-lg md:text-base mb-3">What We Do</h2>
          <p className="text-white/70 text-base md:text-sm mb-4">
            We work with businesses that want more than a static website. Our engagements typically combine design, development, automation, and analytics into a unified growth system. Our core service areas include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Web Design", "Conversion-focused design built for clarity, speed, and brand authority."],
              ["Development", "Custom web applications, portals, and platforms — built to scale."],
              ["AI Agents", "Intelligent automation that handles repetitive tasks and surfaces insights."],
              ["SEO & Marketing", "Technical SEO, content strategy, and performance marketing."],
              ["Analytics Setup", "Google Analytics, Tag Manager, and conversion tracking done right."],
              ["CRM Automation", "Zoho, HubSpot, and custom CRM workflows that close more deals."],
              ["Branding", "Logos, visual systems, and brand positioning that stick."],
              ["App Development", "Lightweight web apps and internal tools that solve real problems."],
            ].map(([title, desc]) => (
              <div key={title} className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex flex-col gap-1.5">
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-white/45 text-sm md:text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-white font-semibold text-lg md:text-base mb-3">Our Approach</h2>
          <p className="text-white/70 text-base md:text-sm mb-4">
            We don't believe in bloated timelines or vague deliverables. Every project we take on is scoped clearly, built efficiently, and measured by outcomes. Our process is straightforward:
          </p>
          <div className="flex flex-col gap-4">
            {[
              ["Discover", "We learn your business, goals, audience, and competitive landscape before writing a single line of code."],
              ["Design", "Wireframes and visual concepts aligned to your brand and conversion goals — reviewed and approved by you."],
              ["Build", "Clean, performant code. Mobile-first. Accessible. Fast."],
              ["Automate", "AI agents, CRM integrations, and analytics baked in from day one — not bolted on after."],
              ["Measure", "We set up tracking to understand what's working and what to improve. The system learns over time."],
            ].map(([step, desc], i) => (
              <div key={step} className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white/40 text-xs font-bold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-base md:text-sm mb-1">{step}</p>
                  <p className="text-white/45 text-sm md:text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OpenClaw */}
        <section>
          <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.04] flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src="/images/openclaw-mascot.png" alt="OpenClaw" className="w-9 h-9 object-contain" />
              <div>
                <p className="text-white font-semibold text-base md:text-sm">OpenClaw Control</p>
                <p className="text-white/40 text-sm md:text-xs">Built into every Kompweb project</p>
              </div>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: "rgba(220,38,38,0.18)", color: "#f87171", border: "1px solid rgba(220,38,38,0.35)" }}>Proprietary</span>
            </div>
            <p className="text-white/55 text-sm md:text-xs leading-relaxed">
              OpenClaw Control is our in-house AI performance layer — a suite of automation, SEO monitoring, and analytics tooling that we integrate into every client project. It continuously tracks site health, keyword performance, and user behavior, surfacing actionable insights without requiring manual reporting. Think of it as an always-on digital operations team embedded in your website.
            </p>
          </div>
        </section>

        {/* Tech */}
        <section>
          <h2 className="text-white font-semibold text-lg md:text-base mb-4">Technologies We Work With</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "JavaScript", color: "#F7DF1E" },
              { name: "TypeScript", color: "#3178C6" },
              { name: "React", color: "#61DAFB" },
              { name: "Next.js", color: "#FFFFFF" },
              { name: "Node.js", color: "#339933" },
              { name: "Python", color: "#3776AB" },
              { name: "WordPress", color: "#21759B" },
              { name: "Docker", color: "#2496ED" },
              { name: "Figma", color: "#F24E1E" },
              { name: "Google Cloud", color: "#4285F4" },
              { name: "Notion", color: "#FFFFFF" },
              { name: "Slack", color: "#AAAAAA" },
              { name: "Twilio", color: "#F22F46" },
              { name: "HubSpot", color: "#FF7A59" },
              { name: "Semrush", color: "#FF642D" },
              { name: "Zoho CRM", color: "#E42527" },
            ].map(({ name, color }) => (
              <span
                key={name}
                className="text-sm md:text-xs px-3 py-1.5 rounded-xl font-medium border"
                style={{ color, background: `${color}12`, borderColor: `${color}30` }}
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold text-base md:text-sm mb-1">Ready to work together?</p>
              <p className="text-white/45 text-sm md:text-xs">Tell us about your project and we'll get back to you within 24 hours.</p>
            </div>
            <button
              onClick={openContactModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 md:h-9 px-5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors shrink-0"
            >
              Get in Touch
            </button>
          </div>
        </section>

      </div>

      <div className="mt-14 pt-8 border-t border-white/[0.06]">
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Kompweb Studios. All rights reserved.</p>
      </div>
    </div>
  );
}
