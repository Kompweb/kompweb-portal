import { useEffect } from "react";
import { X, Mail } from "lucide-react";
import { useContactModal } from "@/context/contact-modal-context";

export function ContactModal() {
  const { isOpen, closeContactModal } = useContactModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      onClick={closeContactModal}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.10] bg-[#0f0f0f] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.07]">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Mail size={15} className="text-white/60" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Get in Touch</p>
            <p className="text-white/35 text-xs">We'll get back to you within 24 hours.</p>
          </div>
          <button
            onClick={closeContactModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Zoho form iframe */}
        <div className="px-2 py-2">
          <iframe
            src={`${import.meta.env.BASE_URL}zoho-contact.html`}
            title="Contact Form"
            style={{ border: "none", width: "100%", height: "480px", background: "transparent" }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
