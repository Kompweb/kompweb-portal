import { Mail, Phone, MapPin, Clock, Instagram, Youtube } from "lucide-react";
import { Link } from "wouter";

export function Contact() {
  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full bg-white/[0.03] blur-[120px] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-semibold mb-6">
          <Mail size={11} />
          Contact Us
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Let's build something<br />
          <span className="text-white/35">great together.</span>
        </h1>
        <p className="text-white/50 text-base md:text-sm max-w-lg leading-relaxed">
          Have a project in mind or just want to explore what's possible? We respond to every inquiry within 24 hours.
        </p>
      </section>

      {/* Main content */}
      <section className="px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — info cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Info tiles */}
            {[
              {
                icon: <Phone size={16} className="text-white/60" />,
                label: "Phone",
                value: "+1 (844) 861-0845",
                href: "tel:+18448610845",
              },
              {
                icon: <MapPin size={16} className="text-white/60" />,
                label: "Location",
                value: "Remote — Serving clients worldwide",
                href: null,
              },
              {
                icon: <Clock size={16} className="text-white/60" />,
                label: "Response Time",
                value: "Within 24 hours, Mon–Fri",
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-white/80 text-sm hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">Follow Us</p>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  {
                    label: "Instagram",
                    href: "https://instagram.com/kompweb",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com/company/kompweb",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    href: "https://youtube.com/@kompweb",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "TikTok",
                    href: "https://tiktok.com/@kompweb",
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                <Link href="/submit" className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2">
                  → Submit a Project Request
                </Link>
                <Link href="/about" className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2">
                  → About KOMPWEB Studios
                </Link>
                <Link href="/services/web-design" className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2">
                  → View Our Services
                </Link>
              </div>
            </div>

          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Mail size={14} className="text-white/60" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Send us a message</p>
                  <p className="text-white/35 text-xs">We'll get back to you within 24 hours.</p>
                </div>
              </div>
              <div className="p-2">
                <iframe
                  src={`${import.meta.env.BASE_URL}zoho-contact.html`}
                  title="Contact Form"
                  style={{ border: "none", width: "100%", height: "520px", background: "transparent" }}
                  scrolling="no"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
