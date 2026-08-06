"use client";
import { useState, useRef, useEffect } from "react";
import {
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
  Download,
  CheckCircle,
  Code,
  Server,
  Star,
  Clock,
} from "lucide-react";

const personas = [
  {
    id: "recruiter",
    icon: Briefcase,
    label: "I'm a Recruiter",
    color: "#4F8EF7",
    description: "Technical teams, engineering roles, full-time opportunities",
    badge: "Looking to hire",
  },
  {
    id: "client",
    icon: Users,
    label: "I'm a Potential Client",
    color: "#10B981",
    description: "Project collaboration, freelance work, consulting",
    badge: "Need a builder",
  },
  {
    id: "investor",
    icon: TrendingUp,
    label: "I'm an Investor",
    color: "#7C3AED",
    description: "GoPremiere, startup opportunities, partnerships",
    badge: "Exploring opportunity",
  },
];

const techSkills = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native / Expo",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Authentication (JWT, NextAuth)",
      "FFmpeg / HLS",
    ],
  },
  {
    category: "Cloud & Infra",
    items: ["AWS S3", "AWS EC2", "Docker", "CI/CD", "Vercel", "Git / GitHub"],
  },
  {
    category: "Product",
    items: [
      "System Design",
      "UI/UX",
      "Figma",
      "Product Strategy",
      "Technical Writing",
    ],
  },
];

const experience = [
  {
    title: "Founder & Lead Engineer",
    company: "GoPremiere",
    period: "2024 – Present",
    type: "Startup",
    color: "#4F8EF7",
    highlights: [
      "Architected and built the entire platform stack from zero",
      "Designed and implemented HLS video transcoding pipeline with FFmpeg",
      "Built producer portal, admin dashboard, and role-based auth system",
      "Sole engineer managing database design, APIs, and frontend",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance",
    period: "2023 – Present",
    type: "Freelance",
    color: "#10B981",
    highlights: [
      "Delivered multiple client projects from scope to deployment",
      "Built bridal website with editorial layouts and booking flow",
      "Developed custom authentication systems for multi-role platforms",
      "Provided technical consulting for early-stage product decisions",
    ],
  },
];

const clientContent = {
  headline: "Let's build your product",
  subtext:
    "I specialize in full-stack web and mobile development — from backend APIs to polished frontend experiences. I work with startups and small teams who need a senior engineer who can own the product end-to-end.",
  services: [
    {
      icon: Code,
      label: "Full Stack Development",
      desc: "Complete web applications from database to UI",
    },
    {
      icon: Server,
      label: "Backend Engineering",
      desc: "APIs, infrastructure, and data pipelines",
    },
    {
      icon: Star,
      label: "MVP Development",
      desc: "Validate your idea fast with a focused, well-built product",
    },
    {
      icon: Clock,
      label: "Technical Consulting",
      desc: "Architecture reviews and technical decision support",
    },
  ],
};

const investorContent = {
  headline: "GoPremiere",
  subtext:
    "A professional streaming platform for independent filmmakers. Built from zero as the sole founder and engineer — with a working producer portal, automated video processing pipeline, and admin dashboard.",
  metrics: [
    { label: "Months in development", value: "6+" },
    { label: "Core features shipped", value: "4" },
    { label: "Team size", value: "1" },
    { label: "Status", value: "MVP" },
  ],
  vision:
    "The long-term vision for GoPremiere is to become the definitive professional platform for independent film — monetizing through producer subscriptions, revenue sharing, and a curated viewer streaming experience.",
};

export default function ResumePage() {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "#0B0D12", minHeight: "100vh" }}>
      <style>{`
        @keyframes rsFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rs-in { animation: rsFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-3xl mx-auto text-center ${mounted ? "rs-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(124,58,237,0.9)" }}
          >
            Resume
          </p>
          <h1
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
            }}
          >
            What brings you here?
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
            I'll give you the experience most relevant to why you're here.
          </p>
        </div>
      </section>

      {/* Persona selector */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {personas.map((persona, i) => {
              const Icon = persona.icon;
              const isSelected = selected === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelected(isSelected ? null : persona.id)}
                  className={`text-left rounded-2xl p-6 transition-all duration-300 ${mounted ? "rs-in" : "opacity-0"}`}
                  style={{
                    background: isSelected
                      ? `${persona.color}0D`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isSelected ? persona.color + "40" : "rgba(255,255,255,0.08)"}`,
                    boxShadow: isSelected
                      ? `0 0 32px ${persona.color}15`
                      : "none",
                    animationDelay: `${i * 0.08}s`,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${persona.color}15`,
                      color: persona.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-sm" style={{ color: "#fff" }}>
                      {persona.label}
                    </h3>
                    {isSelected && (
                      <CheckCircle size={14} style={{ color: persona.color }} />
                    )}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {persona.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic content based on selection */}
      {selected === "recruiter" && (
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Download CTA */}
            <div
              className="rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4"
              style={{
                background: "rgba(79,142,247,0.06)",
                border: "1px solid rgba(79,142,247,0.18)",
              }}
            >
              <div>
                <h3 className="font-bold" style={{ color: "#fff" }}>
                  Download my CV
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Full resume with all experience and education details
                </p>
              </div>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
                  color: "#fff",
                }}
                onClick={() => alert("CV download would be available here")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Download size={16} /> Download CV
              </button>
            </div>

            {/* Skills */}
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ letterSpacing: "-0.01em" }}
              >
                Technical Skills
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {techSkills.map((cat) => (
                  <div
                    key={cat.category}
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <h4
                      className="text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{ color: "rgba(79,142,247,0.8)" }}
                    >
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md text-xs"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.65)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ letterSpacing: "-0.01em" }}
              >
                Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div
                    key={exp.title}
                    className="rounded-2xl p-7"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="font-bold text-lg"
                          style={{ color: "#fff" }}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-sm" style={{ color: exp.color }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-sm font-medium"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          {exp.period}
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: `${exp.color}12`,
                            color: exp.color,
                            border: `1px solid ${exp.color}20`,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ background: exp.color }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Get in touch <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {selected === "client" && (
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                {clientContent.headline}
              </h2>
              <p
                className="text-base max-w-2xl mx-auto"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {clientContent.subtext}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {clientContent.services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={svc.label}
                    className="rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        color: "#10B981",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: "#fff" }}>
                      {svc.label}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #10B981, #4F8EF7)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Book a consultation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {selected === "investor" && (
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span className="gradient-text">GoPremiere</span>
              </h2>
              <p
                className="text-base leading-relaxed max-w-2xl"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {investorContent.subtext}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {investorContent.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl p-5 text-center"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    border: "1px solid rgba(124,58,237,0.18)",
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ color: "#7C3AED" }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3 className="font-bold mb-3" style={{ color: "#fff" }}>
                Vision
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {investorContent.vision}
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/gopremiere"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #4F8EF7)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Explore GoPremiere <ArrowRight size={16} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>
      )}

      {!selected && (
        <div className="px-6 pb-24 text-center">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            Select who you are above to see the relevant experience ↑
          </p>
        </div>
      )}
    </div>
  );
}
