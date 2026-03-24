import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Send, Search, Mail, LogIn, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useContactModal } from "@/context/contact-modal-context";
import { Footer } from "@/components/footer";

interface LayoutProps {
  children: ReactNode;
}

function getSession(): { name: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem("kw_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const { openContactModal } = useContactModal();
  const session = getSession();
  const isAdmin = session?.email === "admin@kompweb.com";
  const isClient = !!session && !isAdmin;
  const isLoggedIn = !!session;

  const handleSignOut = () => {
    sessionStorage.removeItem("kw_user");
    setLocation("/");
  };

  const navItems = [
    ...(isClient ? [{ href: "/submit", label: "Submit Request", icon: Send }] : []),
    ...(isClient ? [{ href: "/track",  label: "Track Project",  icon: Search }] : []),
    ...(isAdmin  ? [{ href: "/admin",  label: "Admin Portal",   icon: LayoutDashboard }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="h-14 w-14 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="/images/kompweb-icon.png"
                alt="Kompweb Studios"
                className="w-full h-full object-cover scale-[1.55] origin-center"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/[0.08]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}

            <button
              onClick={openContactModal}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-white/50 hover:text-white hover:bg-white/10"
            >
              <Mail size={16} />
              Contact Us
            </button>

            {isLoggedIn && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 text-white/30 hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            )}
          </nav>

          {/* Mobile right-side actions */}
          <div className="md:hidden flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {isClient && (
                  <Link
                    href="/track"
                    className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/10 border border-white/10 px-4 py-2 rounded-full hover:bg-white/15 transition-all"
                  >
                    <Search size={14} />
                    Track
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/10 border border-white/10 px-4 py-2 rounded-full hover:bg-white/15 transition-all"
                  >
                    <LayoutDashboard size={14} />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-red-400 px-3 py-2 rounded-full hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm font-medium text-white/70 bg-white/10 border border-white/10 px-4 py-2 rounded-full hover:bg-white/15 transition-all"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            )}
          </div>

        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
