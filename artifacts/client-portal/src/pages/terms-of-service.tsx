import { Mail } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";

export function TermsOfService() {
  const { openContactModal } = useContactModal();
  return (
    <div className="max-w-3xl mx-auto px-6 py-14 text-white">
      <div className="mb-10">
        <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm">Effective Date: March 23, 2026 &nbsp;·&nbsp; Kompweb Studios · kompweb.com</p>
      </div>

      <div className="flex flex-col gap-10 text-sm text-white/70 leading-relaxed">

        <section>
          <h2 className="text-white font-semibold text-base mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using any website, platform, or service operated by Kompweb Studios ("Kompweb", "we", "our", or "us"), including kompweb.com and associated client portals, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">2. Services Provided</h2>
          <p className="mb-3">Kompweb Studios provides digital services including but not limited to:</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "Web design and development",
              "AI agent development and automation",
              "SEO and digital marketing",
              "Analytics setup and conversion tracking",
              "Branding and content strategy",
              "CRM integration and workflow automation",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            The scope, timeline, and deliverables for any specific engagement will be defined in a separate project agreement or statement of work ("SOW") agreed upon by both parties.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">3. Client Responsibilities</h2>
          <p className="mb-3">As a client or user of our services, you agree to:</p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "Provide accurate and complete information when submitting project requests",
              "Respond to requests for feedback, approvals, or content within agreed timeframes",
              "Ensure you have legal rights to any content, assets, or materials you provide to us",
              "Not use our services for any unlawful, harmful, or deceptive purpose",
              "Keep your login credentials confidential and notify us of any unauthorized access",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">4. Payments & Fees</h2>
          <p className="mb-3">
            Payment terms for services are outlined in individual project agreements. Unless otherwise specified:
          </p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "A deposit may be required before work begins",
              "Invoices are due within the timeframe stated on the invoice",
              "Late payments may incur additional fees as specified in the project agreement",
              "Refunds are subject to the terms of the individual project agreement",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">5. Intellectual Property</h2>
          <p className="mb-3">
            Upon full payment for a project, Kompweb Studios transfers ownership of the final deliverables to the client, unless otherwise stated in the project agreement. The following remain the property of Kompweb Studios:
          </p>
          <ul className="list-none flex flex-col gap-2">
            {[
              "Proprietary tools, frameworks, and methodologies used in delivery",
              "OpenClaw Control systems and AI automation infrastructure",
              "Template components and reusable code libraries developed independently",
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">
            You grant Kompweb Studios a non-exclusive license to display completed work in our portfolio unless you request otherwise in writing.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">6. Confidentiality</h2>
          <p>
            Both parties agree to keep confidential any non-public business information shared during the course of a project. This obligation survives the termination of any project agreement. We will not disclose your business data, strategies, or proprietary information to third parties without your written consent, except as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Kompweb Studios shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services — including loss of revenue, data, or business opportunities — even if we have been advised of the possibility of such damages. Our total liability in any matter is limited to the amounts paid by you for the specific service giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee specific business outcomes, search engine rankings, conversion rates, or revenue results from our work. Any projections or estimates we provide are for planning purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">9. Termination</h2>
          <p>
            Either party may terminate a project engagement with written notice as specified in the applicable project agreement. Upon termination, you are responsible for payment of all work completed to date. Kompweb Studios reserves the right to suspend or terminate access to any platform or portal for violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">10. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with applicable law. Any disputes arising from these terms or our services shall be resolved through good-faith negotiation, and if unresolved, through binding arbitration or the appropriate legal jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">11. Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes are published constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-white font-semibold text-base mb-3">12. Contact</h2>
          <p>For questions about these Terms of Service, please reach out to us:</p>
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
