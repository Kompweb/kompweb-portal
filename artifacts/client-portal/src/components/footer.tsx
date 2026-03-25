import { Link } from "wouter";
import { ArrowRight, CornerRightDown } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";

interface FooterProps {
  /** If true, service/CTA clicks scroll to the home #contact section instead of opening the modal */
  scrollToContact?: boolean;
}

export function Footer({ scrollToContact = false }: FooterProps) {
  const { openContactModal } = useContactModal();

  const handleContact = () => {
    if (scrollToContact) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      openContactModal();
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#050505]">

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <img
              src="/images/kompweb-logo-full.png"
              alt="Kompweb Studios"
              className="w-[132px] h-auto object-contain object-left hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>
          <p className="text-white/40 text-sm md:text-xs leading-relaxed max-w-xs">
            Websites, automation, AI systems, and growth infrastructure for modern brands.
          </p>
          <p className="text-white/20 text-sm md:text-xs">
            Clear systems. Better tracking. Stronger growth.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleContact}
              className="inline-flex items-center gap-1.5 h-8 px-4 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              <ArrowRight size={12} /> Book a Call
            </button>
            <span className="inline-flex items-center gap-1 text-white/35 text-xs cursor-default select-none">
              See Our Services <CornerRightDown size={24} />
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-2">
            {/* Instagram */}
            <a href="https://instagram.com/kompweb" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
               aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Meta / Facebook */}
            <a href="https://facebook.com/kompweb" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
               aria-label="Meta / Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/@kompweb" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
               aria-label="TikTok">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@kompweb" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
               aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com/company/kompweb" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] text-white/40 hover:bg-white/[0.12] hover:text-white transition-all"
               aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2 — Link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

          <div className="flex flex-col gap-2">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-0.5">Services</p>
            {[
              { label: "Web Design",    slug: "web-design"    },
              { label: "Development",   slug: "development"   },
              { label: "SEO / Marketing", slug: "seo-marketing" },
              { label: "AI Agents",     slug: "ai-agents"     },
              { label: "Automation",    slug: "automation"    },
              { label: "Analytics",     slug: "analytics"     },
              { label: "Branding",      slug: "branding"      },
            ].map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="text-white/45 text-sm md:text-xs text-left hover:text-white/75 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-0.5">Solutions</p>
            {["Lead Generation","Conversion Tracking","CRM Automation","Website Optimization","Content Strategy","App Development","Analytics Setup","Google Tag"].map(s => (
              <button
                key={s}
                onClick={handleContact}
                className="text-white/45 text-sm md:text-xs text-left hover:text-white/75 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-0.5">Company</p>
            <Link href="/about" className="text-white/45 text-sm md:text-xs hover:text-white/70 transition-colors">About</Link>
            <Link href="/blog" className="text-white/45 text-sm md:text-xs hover:text-white/70 transition-colors">Blog</Link>
            <Link href="/contact" className="text-white/45 text-sm md:text-xs hover:text-white/70 transition-colors">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-0.5">Legal</p>
            <a href="https://kompweb.com" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm md:text-xs hover:text-white/70 transition-colors uppercase tracking-widest">KOMPWEB.COM</a>
            <Link href="/privacy-policy" className="text-white/35 text-sm md:text-xs hover:text-white/65 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-white/35 text-sm md:text-xs hover:text-white/65 transition-colors">Terms of Service</Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} KOMPWEB. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Built for performance, speed, and measurable results.
          </p>
        </div>
      </div>

    </footer>
  );
}
