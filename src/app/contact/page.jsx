"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { toast } from "sonner";

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "abiolad267@gmail.com",
    href: "mailto:abiolad267@gmail.com",
    color: "#4F8EF7",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "www.linkedin.com/in/abiola-david-2b5319252",
    href: "https://www.linkedin.com/in/abiola-david-2b5319252",
    color: "#0A66C2",
  },
  {
    icon: FaXTwitter,
    label: "Twitter / X",
    value: "@The_Biola_David",
    href: "https://x.com/The_Biola_David",
    color: "#1DA1F2",
  },
];

const inquiryTypes = [
  "Freelance Project",
  "Full-time Opportunity",
  "GoPremiere / Investment",
  "Just saying hello",
  "Technical Question",
  "Other",
];

export default function ContactPage() {
  const [heroRef, heroVisible] = useFadeIn();
  const [formRef, formVisible] = useFadeIn();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", type: "", message: "" });
  };

  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <style>{`
        @keyframes ctFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ct-in { animation: ctFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .input-field:focus {
          border-color: rgba(79,142,247,0.45);
          background: rgba(79,142,247,0.05);
        }
        .input-field::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>

      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-36 pb-16 px-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(79,142,247,0.07) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-4xl mx-auto ${heroVisible ? "ct-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(79,142,247,0.8)" }}
          >
            Contact
          </p>
          <h1
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "white",
              WebkitBackgroundClip: "text",
            }}
          >
            Let's talk.
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Whether you have a project, an opportunity, or just want to chat
            about software and products, my inbox is always open.
          </p>
        </div>
      </section>

      {/* Main grid */}
      <section ref={formRef} className="px-6 pb-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Sidebar info */}
          <div
            className={`md:col-span-2 space-y-8 ${formVisible ? "ct-in" : "opacity-0"}`}
          >
            {/* Availability */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.18)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">
                  Available for work
                </span>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Currently open to freelance projects, full-time roles, and
                co-founding opportunities.
              </p>
            </div>

            {/* Location & time */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <MapPin
                    size={15}
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  />
                </div>
                <div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Location
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Africa 🌍 · Remote-first
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Clock size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
                </div>
                <div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Response time
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    Usually within 24 hours
                  </div>
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Find me at
              </p>
              <div className="space-y-3">
                {contactLinks.map(
                  ({ icon: Icon, label, value, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.4)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = color;
                          e.currentTarget.style.background = `${color}15`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.05)";
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div>
                        <div
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-sm transition-colors duration-150"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                              "rgba(255,255,255,0.55)";
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`md:col-span-3 ${formVisible ? "ct-in" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Name <span style={{ color: "#4F8EF7" }}>*</span>
                  </label>
                  <input
                    className="input-field"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-medium mb-2"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Email <span style={{ color: "#4F8EF7" }}>*</span>
                  </label>
                  <input
                    className="input-field"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  What's this about?
                </label>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type }))}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                      style={{
                        background:
                          form.type === type
                            ? "rgba(79,142,247,0.15)"
                            : "rgba(255,255,255,0.05)",
                        border: `1px solid ${form.type === type ? "rgba(79,142,247,0.35)" : "rgba(255,255,255,0.08)"}`,
                        color:
                          form.type === type
                            ? "#4F8EF7"
                            : "rgba(255,255,255,0.45)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Message <span style={{ color: "#4F8EF7" }}>*</span>
                </label>
                <textarea
                  className="input-field"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or what you have in mind..."
                  rows={6}
                  required
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: sending
                    ? "rgba(79,142,247,0.5)"
                    : "linear-gradient(135deg, #4F8EF7, #7C3AED)",
                  color: "#fff",
                  cursor: sending ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!sending) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(79,142,247,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {sending ? (
                  <>
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </button>

              <p
                className="text-xs text-center"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                I respond to every message personally, usually within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
