import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { getFeaturedProjects } from "../data/projects";
import { stats } from "../data/skills";
import EngineeringConsole from "../components/EngineeringConsole";

/**
 * Design tokens
 * ─────────────
 * Corporate / mature direction: deep charcoal-navy (not pure black),
 * one restrained steel-blue accent, a warm neutral used only as a
 * single sparing highlight. No gradients on text or buttons, no
 * blurred orb backgrounds, no oversized animated counters.
 *
 * Fonts (add to your root layout / _document, or via next/font):
 *   Newsreader   — display serif, headlines only
 *   Inter        — body copy
 *   IBM Plex Mono — labels, meta, code, tags — the connective thread
 *                   back to the console panel in the hero
 */
const COLOR = {
  bg: "#000000",
  surface: "#141821",
  surfaceHover: "#171C24",
  border: "#232A34",
  borderStrong: "#333C49",
  textHi: "#EDEFF2",
  textMid: "#9CA5B3",
  textLow: "#5B6472",
  accent: "#7C98B8",
  accentDim: "rgba(124,152,184,0.10)",
  warm: "#C9AE8C",
};

const FONT = {
  display: "'Newsreader', Georgia, 'Times New Roman', serif",
  body:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};

const capabilities = [
  {
    label: "Full-Stack Development",
    desc: "Applications built end to end — schema through interface — by one person who owns the whole seam.",
  },
  {
    label: "Backend & Infrastructure",
    desc: "APIs, queues, and pipelines sized for the load you actually have, not the load you might someday have.",
  },
  {
    label: "Mobile",
    desc: "Cross-platform apps in React Native that don't feel cross-platform.",
  },
  {
    label: "Product Engineering",
    desc: "Scoping, sequencing, and shipping — the parts of building a product that aren't just writing code.",
  },
];

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <p
      className="text-xs uppercase mb-4"
      style={{
        fontFamily: FONT.mono,
        letterSpacing: "0.18em",
        color: COLOR.textLow,
      }}
    >
      {children}
    </p>
  );
}

const featuredProjects = getFeaturedProjects();

export default function HomePage() {
  return (
    <div style={{ background: COLOR.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .btn-primary { transition: background-color 0.2s ease, border-color 0.2s ease; }
        .btn-primary:hover { background: ${COLOR.surfaceHover}; border-color: ${COLOR.borderStrong}; }

        .work-row { transition: border-color 0.2s ease, padding-left 0.2s ease; }
        .work-row:hover { border-color: ${COLOR.borderStrong}; }
        .work-row:hover .work-arrow { transform: translate(2px,-2px); opacity: 1; }
        .work-arrow { transition: transform 0.2s ease, opacity 0.2s ease; opacity: 0.4; }

        .quiet-link { color: ${COLOR.textMid}; transition: color 0.2s ease; }
        .quiet-link:hover { color: ${COLOR.textHi}; }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-6 md:px-10 pt-24 md:pt-28 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Left: identity */}
          <div className="md:col-span-6">
            <p
              className="text-xs uppercase mb-6 flex items-center gap-2"
              style={{
                fontFamily: FONT.mono,
                letterSpacing: "0.18em",
                color: COLOR.textLow,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: COLOR.warm }}
              />
              David — Software Engineer
            </p>

            <h1
              className="mb-6"
              style={{
                fontFamily: FONT.display,
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 4.4vw, 3.6rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                color: COLOR.textHi,
              }}
            >
              I build the software behind
              <br />
              products people rely on.
            </h1>

            <p
              className="max-w-md mb-9 text-base md:text-[17px] leading-relaxed"
              style={{ fontFamily: FONT.body, color: COLOR.textMid }}
            >
              Full-stack engineer and product builder. I take systems from
              database schema to shipped interface, and I stay through the
              unglamorous parts — the ones that decide whether it actually
              works in production.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="/projects"
                className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium"
                style={{
                  fontFamily: FONT.body,
                  background: COLOR.surface,
                  border: `1px solid ${COLOR.border}`,
                  color: COLOR.textHi,
                }}
              >
                View selected work <ArrowRight size={15} />
              </a>
              <a
                href="/contact"
                className="quiet-link inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
                style={{ fontFamily: FONT.body }}
              >
                <Mail size={15} /> Get in touch
              </a>
            </div>

            <div
              className="flex items-center gap-5 text-sm"
              style={{ fontFamily: FONT.mono, color: COLOR.textLow }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link flex items-center gap-1.5"
              >
                <FaGithub size={14} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link flex items-center gap-1.5"
              >
                <FaLinkedin size={14} /> LinkedIn
              </a>
              <span style={{ color: COLOR.border }}>/</span>
              <span>Lagos, Nigeria — remote</span>
            </div>
          </div>

          {/* Right: the signature console, hero only */}
          <div className="md:col-span-6">
            <EngineeringConsole />
          </div>
        </div>
      </section>

      {/* ── META STRIP ───────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-6"
        style={{
          borderTop: `1px solid ${COLOR.border}`,
          borderBottom: `1px solid ${COLOR.border}`,
        }}
      >
        <div
          className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-10 gap-y-3"
          style={{ fontFamily: FONT.mono, fontSize: "12.5px", color: COLOR.textLow }}
        >
          {stats.map((stat, i) => (
            <span key={stat.label} className="flex items-center gap-2">
              <span style={{ color: COLOR.textHi, fontWeight: 500 }}>
                {stat.value}
                {stat.suffix}
              </span>
              <span style={{ letterSpacing: "0.03em" }}>{stat.label}</span>
              {i < stats.length - 1 && (
                <span
                  className="hidden md:inline ml-8"
                  style={{ color: COLOR.border }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────────── */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <SectionEyebrow>Selected Work</SectionEyebrow>
              <h2
                style={{
                  fontFamily: FONT.display,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: COLOR.textHi,
                  fontWeight: 500,
                }}
              >
                Products I've built
              </h2>
            </div>
            <a
              href="/projects"
              className="quiet-link flex items-center gap-1.5 text-sm"
              style={{ fontFamily: FONT.mono }}
            >
              All projects <ArrowRight size={14} />
            </a>
          </Reveal>

          <div style={{ borderTop: `1px solid ${COLOR.border}` }}>
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.05}>
                <a
                  href={`/projects/${project.slug}`}
                  className="work-row group flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-7"
                  style={{
                    borderBottom: `1px solid ${COLOR.border}`,
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="flex-shrink-0 md:w-16"
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: "13px",
                      color: COLOR.textLow,
                    }}
                  >
                    {project.year}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                      <h3
                        style={{
                          fontFamily: FONT.display,
                          fontSize: "1.3rem",
                          fontWeight: 500,
                          color: COLOR.textHi,
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: FONT.mono,
                          fontSize: "11px",
                          letterSpacing: "0.06em",
                          color: COLOR.textLow,
                        }}
                      >
                        {project.category.toUpperCase()} · {project.status.toUpperCase()}
                      </span>
                    </div>
                    <p
                      className="text-sm mb-2.5"
                      style={{ fontFamily: FONT.body, color: COLOR.textMid }}
                    >
                      {project.tagline}
                    </p>
                    <div
                      className="flex flex-wrap gap-x-3 gap-y-1"
                      style={{ fontFamily: FONT.mono, fontSize: "11.5px", color: COLOR.textLow }}
                    >
                      {project.tech.slice(0, 5).map((t, idx) => (
                        <span key={t}>
                          {t}
                          {idx < Math.min(project.tech.length, 5) - 1 && (
                            <span style={{ color: COLOR.border, marginLeft: 12 }} />
                          )}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span>+{project.tech.length - 5} more</span>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex-shrink-0 hidden md:block text-right"
                    style={{ fontFamily: FONT.mono, fontSize: "12px", color: COLOR.textLow }}
                  >
                    {project.role}
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="work-arrow flex-shrink-0"
                    style={{ color: COLOR.textMid }}
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-24"
        style={{
          borderTop: `1px solid ${COLOR.border}`,
          borderBottom: `1px solid ${COLOR.border}`,
          background: COLOR.surface,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-14 max-w-xl">
            <SectionEyebrow>Capabilities</SectionEyebrow>
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: COLOR.textHi,
                fontWeight: 500,
              }}
            >
              How I can help
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 0.06}
                className="flex gap-6 py-7"
                {...(i < capabilities.length - 2
                  ? { style: { borderBottom: `1px solid ${COLOR.border}` } }
                  : {})}
              >
                <span
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: "12px",
                    color: COLOR.textLow,
                    paddingTop: 4,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: FONT.body,
                      fontWeight: 600,
                      fontSize: "15px",
                      color: COLOR.textHi,
                    }}
                  >
                    {c.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-sm"
                    style={{ fontFamily: FONT.body, color: COLOR.textMid }}
                  >
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOPREMIERE CASE STUDY ────────────────────────── */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-6">
            <SectionEyebrow>Founder Project</SectionEyebrow>
            <h2
              className="mb-5"
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                fontWeight: 500,
                color: COLOR.textHi,
              }}
            >
              Building GoPremiere
            </h2>
            <p
              className="text-base leading-relaxed mb-7 max-w-md"
              style={{ fontFamily: FONT.body, color: COLOR.textMid }}
            >
              A streaming platform for independent filmmakers, built from
              scratch: producer portal, an automated transcoding pipeline,
              an operations dashboard, and the viewer experience on top of
              it — designed and engineered end to end.
            </p>
            <ul className="space-y-2.5 mb-8">
              {[
                "Producer submission portal with guided upload flow",
                "Automated FFmpeg → HLS transcoding pipeline",
                "Operations dashboard for content review",
                "Role-based access for producers, admins, viewers",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm"
                  style={{ fontFamily: FONT.body, color: COLOR.textMid }}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: COLOR.textLow }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              <a
                href="/gopremiere"
                className="quiet-link flex items-center gap-1.5 text-sm font-medium"
                style={{ fontFamily: FONT.body, color: COLOR.textHi }}
              >
                Explore GoPremiere <ArrowUpRight size={14} />
              </a>
              <a
                href="/projects/gopremiere"
                className="quiet-link flex items-center gap-1.5 text-sm"
                style={{ fontFamily: FONT.body }}
              >
                Read the case study <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          {/* static window chrome — echoes the hero console without repeating its motion */}
          <Reveal className="md:col-span-6" delay={0.1}>
            <div
              className="rounded-lg overflow-hidden"
              style={{
                background: COLOR.surface,
                border: `1px solid ${COLOR.border}`,
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: `1px solid ${COLOR.border}` }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: COLOR.borderStrong }}
                  />
                ))}
                <div
                  className="flex-1 mx-3 h-6 rounded px-3 flex items-center text-xs"
                  style={{
                    fontFamily: FONT.mono,
                    background: COLOR.bg,
                    color: COLOR.textLow,
                  }}
                >
                  gopremiere.com
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div
                  className="h-3 rounded w-1/3"
                  style={{ background: COLOR.accentDim }}
                />
                <div
                  className="h-24 rounded-md"
                  style={{ background: COLOR.bg, border: `1px solid ${COLOR.border}` }}
                />
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md"
                      style={{ background: COLOR.bg, border: `1px solid ${COLOR.border}` }}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-2 rounded-full" style={{ background: COLOR.border, width: "100%" }} />
                  <div className="h-2 rounded-full" style={{ background: COLOR.border, width: "80%" }} />
                  <div className="h-2 rounded-full" style={{ background: COLOR.border, width: "60%" }} />
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderTop: `1px solid ${COLOR.border}`, fontFamily: FONT.mono, fontSize: "11px", color: COLOR.textLow }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR.warm }} />
                live &amp; processing
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────── */}
      <section
        className="px-6 md:px-10 py-24"
        style={{ borderTop: `1px solid ${COLOR.border}` }}
      >
        <Reveal className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <SectionEyebrow>Get in touch</SectionEyebrow>
            <h2
              style={{
                fontFamily: FONT.display,
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                fontWeight: 500,
                color: COLOR.textHi,
                maxWidth: "22ch",
              }}
            >
              Open to freelance work, full-time roles, and technical
              co-founding.
            </h2>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium"
              style={{
                fontFamily: FONT.body,
                background: COLOR.surface,
                border: `1px solid ${COLOR.border}`,
                color: COLOR.textHi,
              }}
            >
              Get in touch <ArrowRight size={15} />
            </a>
            <a
              href="/resume"
              className="quiet-link inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
              style={{ fontFamily: FONT.body }}
            >
              View résumé
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}