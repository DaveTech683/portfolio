"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Zap,
  Shield,
  Globe,
  Film,
  Users,
  Server,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

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

const features = [
  {
    icon: Film,
    color: "#4F8EF7",
    title: "Producer Portal",
    desc: "A guided, multi-step film submission experience. Metadata, rights, poster, and film file — all in one professional flow.",
  },
  {
    icon: Server,
    color: "#10B981",
    title: "HLS Streaming Pipeline",
    desc: "Automated FFmpeg transcoding to 1080p, 720p, and 480p HLS streams with adaptive bitrate playback.",
  },
  {
    icon: Shield,
    color: "#7C3AED",
    title: "Rights Management",
    desc: "Copyright documentation, distribution agreements, and producer verification built into every submission.",
  },
  {
    icon: Globe,
    color: "#F59E0B",
    title: "Global Distribution",
    desc: "Films submitted from any country, in any language, reach a global streaming audience.",
  },
  {
    icon: Users,
    color: "#EC4899",
    title: "Admin Dashboard",
    desc: "Full content operations tooling for internal teams — review, approve, reject, and manage the entire catalog.",
  },
  {
    icon: Zap,
    color: "#06B6D4",
    title: "Adaptive Streaming",
    desc: "HLS.js player with automatic quality selection based on network conditions for a seamless viewing experience.",
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: [
      "Producer portal & submission flow",
      "Admin dashboard",
      "PostgreSQL database design",
      "Authentication system (producers + admins)",
    ],
  },
  {
    phase: "Phase 2",
    title: "Media Pipeline",
    status: "in-progress",
    items: [
      "FFmpeg HLS transcoding pipeline",
      "S3 storage integration",
      "Multi-quality stream generation",
      "Processing status tracking",
    ],
  },
  {
    phase: "Phase 3",
    title: "Viewer Platform",
    status: "planned",
    items: [
      "Public streaming interface",
      "Film discovery & search",
      "User accounts and watchlists",
      "Mobile-responsive player",
    ],
  },
  {
    phase: "Phase 4",
    title: "Growth",
    status: "planned",
    items: [
      "Creator analytics dashboard",
      "Revenue sharing model",
      "Partnership API",
      "International content moderation",
    ],
  },
];

export default function GoPremierePage() {
  const [heroRef, heroVisible] = useFadeIn();
  const [featuresRef, featuresVisible] = useFadeIn();
  const [roadmapRef, roadmapVisible] = useFadeIn();
  const [stackRef, stackVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  return (
    <div style={{ background: "#0B0D12", minHeight: "100vh" }}>
      <style>{`
        @keyframes gpFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gp-in { animation: gpFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes gpOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-40px) scale(1.1); }
        }
        @keyframes gpOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,30px) scale(0.92); }
        }
      `}</style>

      {/* HERO */}
      <section
        ref={heroRef}
        className="pt-36 pb-24 px-6 relative overflow-hidden"
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(79,142,247,0.14) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "gpOrb1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500,
            height: 500,
            bottom: "-5%",
            right: "0%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "gpOrb2 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          className={`max-w-5xl mx-auto text-center relative z-10 ${heroVisible ? "gp-in" : "opacity-0"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(79,142,247,0.1)",
              border: "1px solid rgba(79,142,247,0.25)",
            }}
          >
            <Play size={13} fill="#4F8EF7" style={{ color: "#4F8EF7" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "#4F8EF7" }}
            >
              Now in Development
            </span>
          </div>

          <h1
            className="font-black mb-5"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            <span className="gradient-text">Go</span>Premiere
          </h1>
          <p
            className="text-xl md:text-2xl font-medium mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            The streaming platform built for independent filmmakers.
          </p>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            GoPremiere gives independent film producers a professional home to
            submit, distribute, and monetize their work — with Netflix-quality
            streaming infrastructure and a world-class editorial review process.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
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
              Submit a Film <ArrowRight size={18} />
            </a>
            <a
              href="/projects/gopremiere"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base transition-all duration-200"
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
              Read Case Study <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section
        className="py-16 px-6"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <blockquote
            className="text-2xl md:text-3xl font-semibold leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "-0.01em",
            }}
          >
            "Independent filmmakers deserve a professional platform that treats
            their work with the same respect as major studio releases. That's
            what GoPremiere is."
          </blockquote>
          <p
            className="mt-4 text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            — Founder's note
          </p>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-14 ${featuresVisible ? "gp-in" : "opacity-0"}`}>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(79,142,247,0.9)" }}
            >
              Platform
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Built for the full journey
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`rounded-2xl p-7 transition-all duration-300 ${featuresVisible ? "gp-in" : "opacity-0"}`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${feat.color}25`;
                    e.currentTarget.style.background = `${feat.color}05`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${feat.color}12`, color: feat.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#fff" }}>
                    {feat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section
        ref={roadmapRef}
        className="py-24 px-6"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`mb-14 ${roadmapVisible ? "gp-in" : "opacity-0"}`}>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(16,185,129,0.9)" }}
            >
              Roadmap
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building in public
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {roadmap.map((phase, i) => (
              <div
                key={phase.phase}
                className={`rounded-2xl p-6 ${roadmapVisible ? "gp-in" : "opacity-0"}`}
                style={{
                  background:
                    phase.status === "done"
                      ? "rgba(16,185,129,0.06)"
                      : phase.status === "in-progress"
                        ? "rgba(79,142,247,0.06)"
                        : "rgba(255,255,255,0.025)",
                  border: `1px solid ${phase.status === "done" ? "rgba(16,185,129,0.2)" : phase.status === "in-progress" ? "rgba(79,142,247,0.2)" : "rgba(255,255,255,0.07)"}`,
                  animationDelay: `${i * 0.09}s`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {phase.phase}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background:
                        phase.status === "done"
                          ? "rgba(16,185,129,0.15)"
                          : phase.status === "in-progress"
                            ? "rgba(79,142,247,0.15)"
                            : "rgba(255,255,255,0.06)",
                      color:
                        phase.status === "done"
                          ? "#10B981"
                          : phase.status === "in-progress"
                            ? "#4F8EF7"
                            : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {phase.status === "done"
                      ? "Complete"
                      : phase.status === "in-progress"
                        ? "In Progress"
                        : "Planned"}
                  </span>
                </div>
                <h3 className="font-bold mb-4" style={{ color: "#fff" }}>
                  {phase.title}
                </h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      <CheckCircle
                        size={12}
                        className="flex-shrink-0 mt-0.5"
                        style={{
                          color:
                            phase.status === "done"
                              ? "#10B981"
                              : phase.status === "in-progress"
                                ? "#4F8EF7"
                                : "rgba(255,255,255,0.2)",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section ref={stackRef} className="py-24 px-6">
        <div
          className={`max-w-4xl mx-auto text-center ${stackVisible ? "gp-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "rgba(245,158,11,0.9)" }}
          >
            Technology
          </p>
          <h2
            className="text-4xl font-bold mb-10"
            style={{ letterSpacing: "-0.02em" }}
          >
            Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js",
              "React",
              "Node.js",
              "PostgreSQL",
              "FFmpeg",
              "HLS.js",
              "AWS S3",
              "Docker",
              "Redis",
              "NextAuth.js",
              "Tailwind CSS",
              "Framer Motion",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(79,142,247,0.1)";
                  e.currentTarget.style.borderColor = "rgba(79,142,247,0.25)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="py-24 px-6 text-center relative"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(79,142,247,0.07) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-2xl mx-auto relative z-10 ${ctaVisible ? "gp-in" : "opacity-0"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Interested in GoPremiere?
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Whether you're a filmmaker, an investor, or a potential partner —
            I'd love to talk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
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
              Partner with us <ArrowRight size={16} />
            </a>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
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
              <Film size={15} /> Submit a film
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
