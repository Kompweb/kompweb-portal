import { Mail } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";

export function PrivacyPolicy() {
  const { openContactModal } = useContactModal();
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 text-white">
      <div className="mb-10">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Effective Date: March 23, 2026 &nbsp;·&nbsp; Kompweb Studios · kompweb.com</p>
      </div>

      <div className="flex flex-col gap-10 text-sm text-white/70 leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-3">1. Overview</h2>
          <p>
            Kompweb Studios ("Kompweb", "we", "our", or "us") operates kompweb.com and related client portals. We are committed to protecting the personal information of our visitors, clients, and contacts. This Privacy Policy explains what data we collect, why we collect it, and how we handle it.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              ["Contact Information", "Name, email address, and phone number submitted through our contact or inquiry forms."],
              ["Project Details", "Files, descriptions, and any content you upload or share when submitting a project request."],
              ["Usage Data", "IP address, browser type, pages visited, and time spent on our site — collected automatically via analytics tools."],
              ["Marketing Data", "UTM parameters and referral sources to understand how visitors discover our services."],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span><span className="text-white/90 font-medium">{title}:</span> {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "Respond to inquiries and project requests",
              "Manage and deliver client projects",
              "Communicate project status and updates",
              "Improve our website and services",
              "Analyze traffic and marketing performance",
              "Comply with legal obligations",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">We do not sell, rent, or share your personal information with third parties for their own marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">4. Contact Form & CRM</h2>
          <p>
            Submissions made through our contact form are processed by <span className="text-white/90">Zoho CRM</span> and stored securely within our Zoho account. Data is used solely for communication related to your inquiry. You may request deletion of your record at any time by contacting us directly.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">5. Cookies & Analytics</h2>
          <p>
            Our website may use cookies and similar tracking technologies (including Google Analytics and Google Tag Manager) to understand how visitors interact with our site. You may disable cookies in your browser settings at any time. Continued use of our site with cookies enabled constitutes consent to their use.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">6. Data Storage & Security</h2>
          <p>
            Your data is stored on secure, access-controlled servers. We implement reasonable technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">7. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "Access the personal data we hold about you",
              "Request correction of inaccurate data",
              "Request deletion of your data (\"right to be forgotten\")",
              "Object to or restrict processing of your data",
              "Request a portable copy of your data",
              "Withdraw consent at any time where processing is based on consent",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">To exercise any of these rights, please contact us using the information below.</p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">8. Third-Party Services</h2>
          <p>
            We may use third-party platforms including but not limited to Google Cloud, Slack, Twilio, HubSpot, Notion, and Semrush in delivering our services. Each of these services maintains its own privacy policy and data practices. We are not responsible for the privacy practices of third-party providers.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">9. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes are posted constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or your data, please contact us:</p>
          <div className="mt-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-white font-medium">Kompweb Studios</p>
              <a href="https://kompweb.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors text-sm">kompweb.com</a>
            </div>
            <button
              onClick={openContactModal}
              className="inline-flex items-center gap-2 h-9 px-4 bg-white text-black text-xs font-semibold rounded-xl hover:bg-white/90 transition-colors shrink-0"
            >
              <Mail size={13} /> Contact Us
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
