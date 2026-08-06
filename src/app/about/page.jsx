import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code,
  Lightbulb,
  Users,
  Zap,
  Target,
  Heart,
} from "lucide-react";

function useFadeIn(threshold = 0.12) {
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
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const principles = [
  {
    icon: Code,
    title: "Engineering with empathy",
    desc: "I write code for humans first, machines second. Clean, readable, and maintainable by default.",
  },
  {
    icon: Lightbulb,
    title: "Product thinking",
    desc: "Every technical decision has a product consequence. I stay aware of both dimensions at once.",
  },
  {
    icon: Users,
    title: "User obsession",
    desc: "The best code is the code users never have to think about. UX is not a department, it's everyone's job.",
  },
  {
    icon: Target,
    title: "Clarity over cleverness",
    desc: "Simple solutions that work reliably beat clever solutions that require a PhD to maintain.",
  },
  {
    icon: Zap,
    title: "Bias toward shipping",
    desc: "Done and iterating beats perfect and waiting. I ship fast, measure, and improve continuously.",
  },
  {
    icon: Heart,
    title: "Care in the details",
    desc: "Micro-interactions, error messages, edge cases — the details are where trust is built or lost.",
  },
];

const timeline = [
  {
    period: "2024 – Present",
    title: "Founded GoPremiere & Lagoslist",
    description:
      "Started building a professional streaming platform for independent filmmakers. Architected and built the entire stack — producer portal, HLS transcoding pipeline, admin dashboard, and viewer experience, as the sole engineer and founder.",
    tags: ["Founder", "Full Stack", "Streaming Infrastructure"],
    highlight: true,
  },
  {
    period: "2023 – 2024",
    title: "Full Stack Product Engineering",
    description:
      "Built complete web products for clients across different industries. Developed skills in rapid MVP delivery, translating business requirements into working software, and balancing technical excellence with business constraints.",
    tags: ["React", "Node.js", "PostgreSQL", "Product Delivery"],
    highlight: false,
  },
  {
    period: "2022 - 2023",
    title: "Deep Dive into the Stack",
    description:
      "Invested heavily in learning the full software development lifecycle. Moved from frontend-only to building complete backends, designing databases, and understanding deployment infrastructure. This was the year everything clicked.",
    tags: ["Systems Thinking", "Backend", "Architecture"],
    highlight: false,
  },
  {
    period: "2021 – 2022",
    title: "The Beginning",
    description:
      "Started with curiosity about how websites worked. Opened a text editor, wrote my first HTML, and never stopped. Within months I was learning React, and within a year I had built my first real-world project for an actual client.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    highlight: false,
  },
];

export default function AboutPage() {
  const [heroRef, heroVisible] = useFadeIn(0.05);
  const [storyRef, storyVisible] = useFadeIn();
  const [principlesRef, principlesVisible] = useFadeIn();
  const [timelineRef, timelineVisible] = useFadeIn();
  const [ctaRef, ctaVisible] = useFadeIn();

  return (
    <div style={{ background: "#000a16", minHeight: "100vh" }}>
      <style>{`
        @keyframes aboutFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-in { animation: aboutFade 0.7s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="pt-36 pb-24 px-6 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,142,247,0.08) 0%, transparent 100%)",
          }}
        />

        <div
          className={`max-w-4xl mx-auto ${heroVisible ? "about-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(79,142,247,0.8)" }}
          >
            About Me
          </p>

          <h1
            className="font-bold leading-[1.05] mb-8"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Engineer. Builder.
            <br />
            <span className="gradient-text">Founder.</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.55)", lineHeight: "1.75" }}
          >
            I'm a software engineer who builds products from first principles. I
            write the backend, design the database, implement the API, and ship
            the frontend. I think in systems, design for humans, and care deeply
            about craft.
          </p>
        </div>
      </section>

      {/* ── THE STORY ────────────────────────────────── */}
      <section
        ref={storyRef}
        className="py-20 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className={`max-w-4xl mx-auto ${storyVisible ? "about-in" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ letterSpacing: "-0.02em", color: "#fff" }}
              >
                How it started
              </h2>
              <div
                className="space-y-5 text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <p>
                  I didn't start with a plan to become a software engineer. I
                  started with curiosity, that moment when you view page source
                  and suddenly realize a website is just text in a file, and
                  text in a file can become anything.
                </p>
                <p>
                  That curiosity turned into obsession. I built terrible
                  websites at first. Then less terrible ones. Then I started
                  taking on real clients. Then I started building real products.
                  Then I started{" "}
                  <span style={{ color: "#fff" }}>founding them.</span>
                </p>
                <p>
                  Today I think in terms of systems. Every feature I build, I'm
                  thinking about the database schema, the API contract, the
                  React component, and the user experience simultaneously. That
                  full-stack mental model is my greatest engineering asset.
                </p>
              </div>
            </div>
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ letterSpacing: "-0.02em", color: "#fff" }}
              >
                How I think
              </h2>
              <div
                className="space-y-5 text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <p>
                  I approach every product problem with three lenses: the user's
                  experience, the business's goals, and the technical
                  constraints. The best solutions hold all three in mind without
                  sacrificing any.
                </p>
                <p>
                  I've learned that software engineering is mostly problem
                  decomposition, breaking hard problems into tractable ones,
                  then solving them one by one. The code is almost secondary.
                  The thinking is everything.
                </p>
                <p>
                  What excites me most is the moment a product clicks for a user.
                  that instant where software becomes invisible and the human
                  goal is just... achieved. That's what I build toward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────── */}
      <section
        ref={principlesRef}
        className="py-24 px-6"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-14 ${principlesVisible ? "about-in" : "opacity-0"}`}
          >
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(124,58,237,0.9)" }}
            >
              How I work
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ letterSpacing: "-0.02em", color: "#fff" }}
            >
              Engineering principles
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`rounded-2xl p-6 transition-all duration-300 ${principlesVisible ? "about-in" : "opacity-0"}`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    animationDelay: `${i * 0.07}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(79,142,247,0.05)";
                    e.currentTarget.style.borderColor = "rgba(79,142,247,0.18)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(79,142,247,0.1)",
                      color: "#4F8EF7",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "#fff" }}>
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── JOURNEY / TIMELINE ───────────────────────── */}
      <section ref={timelineRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`mb-14 ${timelineVisible ? "about-in" : "opacity-0"}`}
          >
            <p
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "rgba(16,185,129,0.9)" }}
            >
              The journey
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ letterSpacing: "-0.02em", color: "#fff" }}
            >
              Product timeline
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(79,142,247,0.3), rgba(124,58,237,0.15), transparent)",
              }}
            />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div
                  key={item.period}
                  className={`flex gap-8 ${timelineVisible ? "about-in" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: item.highlight
                          ? "linear-gradient(135deg, #4F8EF7, #7C3AED)"
                          : "rgba(255,255,255,0.06)",
                        border: item.highlight
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: item.highlight
                          ? "0 0 20px rgba(79,142,247,0.35)"
                          : "none",
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background: item.highlight
                            ? "#fff"
                            : "rgba(255,255,255,0.3)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-6">
                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: "#fff" }}
                      >
                        {item.title}
                      </h3>
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: item.highlight
                              ? "rgba(79,142,247,0.12)"
                              : "rgba(255,255,255,0.05)",
                            color: item.highlight
                              ? "#4F8EF7"
                              : "rgba(255,255,255,0.4)",
                            border: `1px solid ${item.highlight ? "rgba(79,142,247,0.2)" : "rgba(255,255,255,0.07)"}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEYOND THE CODE ──────────────────────────── */}
      <section
        className="py-20 px-6"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              label: "When I'm not coding",
              value:
                "I'm reading product blogs, watching engineering talks, or thinking about why apps are designed the way they are. I can't turn it off.",
            },
            {
              label: "What I believe",
              value:
                "Software is a craft. The best engineers are also writers, communicators, and product thinkers. Technical excellence alone isn't enough.",
            },
            {
              label: "What's next",
              value:
                "Growing GoPremiere and Lagoslist into a real business, exploring AI integration in creative tools, and taking on select freelance clients while doing it.",
            },
          ].map((item) => (
            <div key={item.label}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {item.label}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section ref={ctaRef} className="py-24 px-6 text-center">
        <div
          className={`max-w-2xl mx-auto ${ctaVisible ? "about-in" : "opacity-0"}`}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ letterSpacing: "-0.02em", color: "#fff" }}
          >
            Ready to build something?
          </h2>
          <p
            className="mb-8 text-base"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Whether you have a project in mind or just want to talk shop, my
            inbox is open.
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
              Get in touch <ArrowRight size={16} />
            </a>
            <a
              href="/projects"
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
              View my work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
