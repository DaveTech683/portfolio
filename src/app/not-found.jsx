"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: "#0B0D12" }}
    >
      <style>{`
        @keyframes nfFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nfGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .nf-in { animation: nfFade 0.7s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "nfGlow 4s ease-in-out infinite",
        }}
      />

      <div
        className={`relative z-10 text-center max-w-lg ${mounted ? "nf-in" : "opacity-0"}`}
      >
        {/* Giant 404 */}
        <div className="relative mb-8">
          <div
            className="text-[10rem] font-black leading-none select-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,142,247,0.15), rgba(124,58,237,0.1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.05em",
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={48} style={{ color: "rgba(79,142,247,0.3)" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3" style={{ color: "#fff" }}>
          Page not found
        </h1>
        <p
          className="text-base mb-8"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          This page doesn't exist or has been moved. Let me help you find what
          you're looking for.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { label: "Home", href: "/", desc: "Back to start" },
            { label: "Projects", href: "/projects", desc: "See my work" },
            { label: "About", href: "/about", desc: "Learn about me" },
            { label: "Contact", href: "/contact", desc: "Get in touch" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl p-4 text-left transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(79,142,247,0.08)";
                e.currentTarget.style.borderColor = "rgba(79,142,247,0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="font-semibold text-sm mb-0.5"
                style={{ color: "#fff" }}
              >
                {link.label}
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {link.desc}
              </div>
            </a>
          ))}
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 40px rgba(79,142,247,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Home size={16} /> Go home
        </a>
      </div>
    </div>
  );
}
