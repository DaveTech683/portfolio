"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code,
  Server,
  Smartphone,
  Layers,
  Cpu,
  Palette,
  Database,
  Zap,
  CheckCircle,
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

const services = [
  {
    icon: Layers,
    color: "#4F8EF7",
    title: "Full Stack Development",
    description:
      "End-to-end web applications built with modern technologies. From database design to pixel-perfect UI, everything shipped as a cohesive, production-ready product.",
    process: [
      "Requirements & scope definition",
      "Architecture & system design",
      "Iterative development with demos",
      "Testing, QA, and deployment",
      "Handover with full documentation",
    ],
    deliverables: [
      "Fully functional web application",
      "Clean, documented codebase",
      "Deployment to production",
      "README and architecture docs",
    ],
    timeline: "4–12 weeks",
    bestFor: "Startups, MVPs, and product companies needing end-to-end build",
  },
  {
    icon: Server,
    color: "#10B981",
    title: "Backend Engineering",
    description:
      "Robust, scalable backend systems. APIs, data pipelines, authentication, video processing, the infrastructure that makes products work at scale.",
    process: [
      "API design and spec",
      "Database schema design",
      "Implementation and testing",
      "Performance optimization",
      "Documentation and handoff",
    ],
    deliverables: [
      "RESTful or GraphQL API",
      "Database schema + migrations",
      "Auth system",
      "API documentation",
    ],
    timeline: "2–8 weeks",
    bestFor:
      "Products that need a solid backend foundation or existing apps that need a stronger API layer",
  },
  {
    icon: Smartphone,
    color: "#7C3AED",
    title: "Mobile App Development",
    description:
      "Cross-platform React Native apps built with Expo. Native feel, shared codebase, and production-ready for iOS and Android.",
    process: [
      "UX design and wireframes",
      "Expo setup and architecture",
      "Feature development",
      "Platform testing (iOS + Android)",
      "App store submission support",
    ],
    deliverables: [
      "React Native Expo app",
      "iOS + Android builds",
      "App store assets",
      "Push notification setup",
    ],
    timeline: "6–14 weeks",
    bestFor:
      "Businesses that need a mobile presence without building two separate native apps",
  },
  {
    icon: Cpu,
    color: "#F59E0B",
    title: "MVP Development",
    description:
      "Get your idea from concept to working product fast. I help founders validate their thesis with a focused, well-built MVP, not a throwaway prototype.",
    process: [
      "Idea to spec in 1 week",
      "Core feature scoping",
      "Rapid development sprints",
      "User testing support",
      "Iteration based on feedback",
    ],
    deliverables: [
      "Working MVP",
      "User feedback framework",
      "Iteration roadmap",
      "Technical debt assessment",
    ],
    timeline: "3–6 weeks",
    bestFor:
      "Early-stage founders who need to validate a product idea without burning months of runway",
  },
  {
    icon: Zap,
    color: "#EC4899",
    title: "Performance Optimization",
    description:
      "Slow apps lose users. I audit, identify bottlenecks, and implement fixes that measurably improve Core Web Vitals, load times, and runtime performance.",
    process: [
      "Lighthouse + profiling audit",
      "Bottleneck identification",
      "Optimization implementation",
      "Before/after measurement",
      "Ongoing monitoring setup",
    ],
    deliverables: [
      "Performance audit report",
      "Optimized codebase",
      "Monitoring dashboard",
      "Recommendations doc",
    ],
    timeline: "1–3 weeks",
    bestFor:
      "Teams with existing apps that are underperforming or failing Core Web Vitals",
  },
  {
    icon: Palette,
    color: "#06B6D4",
    title: "Technical Consulting",
    description:
      "Architecture reviews, tech stack decisions, code quality assessments, experienced perspective on the technical problems you're facing.",
    process: [
      "Discovery call",
      "Codebase / architecture review",
      "Written recommendations",
      "Follow-up Q&A session",
    ],
    deliverables: [
      "Written technical assessment",
      "Architecture recommendations",
      "Risk analysis",
      "1 hour follow-up call",
    ],
    timeline: "1–2 weeks",
    bestFor:
      "CTOs and tech leads who need a second opinion on technical decisions",
  },
];

export default function ServicesPage() {
  const [heroRef, heroVisible] = useFadeIn();
  const [gridRef, gridVisible] = useFadeIn();
  const [processRef, processVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  return (
    <div style={{ background: "#000a09", minHeight: "100vh" }}>
      <style>{`
        @keyframes svcFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .svc-in { animation: svcFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-36 pb-20 px-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-7xl mx-auto ${heroVisible ? "svc-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(16,185,129,0.9)" }}
          >
            Services
          </p>
          <h1
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            How I can help
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            From full product builds to targeted technical work, I bring technical and pure
            engineering depth to every engagement, with a focus on quality,
            communication, and real outcomes.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section ref={gridRef} className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className={`rounded-2xl p-8 transition-all duration-300 ${gridVisible ? "svc-in" : "opacity-0"}`}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  animationDelay: `${i * 0.07}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${svc.color}30`;
                  e.currentTarget.style.background = `${svc.color}04`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${svc.color}12`, color: svc.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {svc.timeline}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#fff" }}
                >
                  {svc.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {svc.description}
                </p>

                {/* Best for */}
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    background: `${svc.color}08`,
                    border: `1px solid ${svc.color}15`,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: svc.color }}
                  >
                    Best for
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {svc.bestFor}
                  </p>
                </div>

                {/* Deliverables */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-3"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    Deliverables
                  </p>
                  <div className="space-y-1.5">
                    {svc.deliverables.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        <CheckCircle
                          size={12}
                          style={{ color: svc.color, flexShrink: 0 }}
                        />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Working process */}
      <section
        ref={processRef}
        className="py-24 px-6"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`mb-14 ${processVisible ? "svc-in" : "opacity-0"}`}>
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(79,142,247,0.9)" }}
            >
              How it works
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Working with me
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery call",
                desc: "We discuss your project, goals, and timeline. No commitment needed, I want to make sure we're a good fit before anything else.",
              },
              {
                step: "02",
                title: "Proposal & scoping",
                desc: "I put together a detailed technical proposal with timeline, deliverables, and pricing. Everything is explicit so there are no surprises.",
              },
              {
                step: "03",
                title: "Build & iterate",
                desc: "I build in focused sprints with regular demos. You see real progress every week and can provide feedback continuously.",
              },
              {
                step: "04",
                title: "Ship & handoff",
                desc: "We launch together. I provide a full handoff with documentation, and offer continued support if needed.",
              },
            ].map((step, i) => (
              <div
                key={step.step}
                className={`${processVisible ? "svc-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="text-5xl font-black mb-4"
                  style={{
                    color: "rgba(79,142,247,0.15)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {step.step}
                </div>
                <h3 className="font-bold mb-2" style={{ color: "#fff" }}>
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 px-6 text-center">
        <div
          className={`max-w-2xl mx-auto ${ctaVisible ? "svc-in" : "opacity-0"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to start?
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Tell me about your project and let's figure out how I can help.
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
              Book a consultation <ArrowRight size={16} />
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              View my work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
