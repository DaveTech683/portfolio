import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Command } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },

  // { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navigation({ onCommandPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(11,13,18,.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg,#4F8EF7,#7C3AED)",
            }}
          >
            Dv
          </div>

          <span className="hidden sm:block text-white font-semibold text-sm">
            Portfolio
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">

          {navLinks.map((link) => {

            const active = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3 py-2 rounded-md text-sm transition-all duration-300"
                style={{
                  color: active
                    ? "#fff"
                    : "rgba(255,255,255,.6)",

                  background: active
                    ? "rgba(79,142,247,.12)"
                    : "transparent",

                  border: active
                    ? "1px solid rgba(79,142,247,.25)"
                    : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,.06)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color =
                      "rgba(255,255,255,.6)";
                  }
                }}
              >
                {link.label === "GoPremiere" ? (
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg,#4F8EF7,#7C3AED)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 600,
                    }}
                  >
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          <button
            onClick={() => onCommandPalette?.()}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
            style={{
              color: "rgba(255,255,255,.45)",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <Command size={13} />
            K
          </button>

          <Link
            to="/resume"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{
              background:
                "linear-gradient(135deg,#4F8EF7,#7C3AED)",
            }}
          >
            Resume
          </Link>

          <button
            className="md:hidden p-2 rounded-lg text-white"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "500px" : "0px",
          background: "rgba(11,13,18,.96)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="px-6 py-4 space-y-2"
          style={{
            borderTop: "1px solid rgba(255,255,255,.08)",
          }}
        >
          {navLinks.map((link) => {

            const active = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 rounded-lg text-sm transition-all"
                style={{
                  color: active ? "#fff" : "rgba(255,255,255,.7)",
                  background: active
                    ? "rgba(79,142,247,.12)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/resume"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 px-3 py-3 rounded-lg text-center text-white font-semibold"
            style={{
              background:
                "linear-gradient(135deg,#4F8EF7,#7C3AED)",
            }}
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
}