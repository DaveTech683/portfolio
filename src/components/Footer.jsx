"use client";
import { Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";


const footerLinks = {
  Navigation: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Services", to: "/services" },
  ],
  Platform: [
    { label: "GoPremiere", to: "/gopremiere" },
    { label: "Blog", to: "/blog" },
    { label: "Resume", to: "/resume" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Sitemap", to: "/sitemap.xml" },
  ],
};

const socials = [
  { icon: FaGithub, to: "https://github.com/DaveTech683", label: "GitHub" },
  { icon: FaLinkedin, to: "https://www.linkedin.com/in/abiola-david-2b5319252", label: "LinkedIn" },
  { icon: FaTwitter, to: "https://x.com/The_Biola_David", label: "Twitter" },
  { icon: Mail, to: "mailto:abiolad267@gmail.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0B0D12 0%, #08090E 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
      {/* CTA Band */}
      <div
        className="py-16 px-6 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(79,142,247,0.05) 0%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(79,142,247,0.12) 0%, transparent 100%)",
          }}
        />
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 relative z-10"
          style={{ color: "#fff" }}
        >
          Let's build something{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4F8EF7, #7C3AED)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            remarkable.
          </span>
        </h2>
        <p
          className="text-base md:text-lg mb-8 max-w-xl mx-auto relative z-10"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Open to freelance projects, full-time roles, and founding
          partnerships.
        </p>
        <div className="flex items-center justify-center gap-4 relative z-10 flex-wrap">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(79,142,247,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in touch <ArrowUpRight size={16} />
          </Link>
          <Link
            to="mailto:abiolad267@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <Mail size={16} /> abiolad267@gmail.com
          </Link>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
                }}
              >
                D
              </div>
              <span className="font-semibold text-white">Portfolio</span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Software engineer, product builder, and founder. Building things
              that matter.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, to, label }) => (
                <Link
                  key={label}
                  to={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(79,142,247,0.15)";
                    e.currentTarget.style.color = "#4F8EF7";
                    e.currentTarget.style.borderColor = "rgba(79,142,247,0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {year} · Built with care and a lot of coffee ☕
          </p>
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
              style={{
                animation: "footerPulse 2s ease-in-out infinite",
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Available for new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
