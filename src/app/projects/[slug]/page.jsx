// [slug]/page.jsx

"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Tag,
  ImagePlus,
  Layers,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Cpu,
  MonitorSmartphone,
} from "lucide-react";
import { getProjectBySlug } from "../../../data/projects";
import { groupTechByLayer } from "../../../data/techStackInfo";

const LAYER_ICON = {
  frontend: MonitorSmartphone,
  backend: Server,
  data: Database,
  cache: Layers,
  cloud: Cloud,
  security: ShieldCheck,
  specialized: Cpu,
};

const IMAGE_SLOTS = [
  "Hero / cover shot",
  "Core screen or dashboard",
  "Key flow in action",
  "Detail or admin view",
];

export default function ProjectCaseStudy() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!project) {
    return (
      <div
        style={{ background: "#0B0D12", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <a href="/projects" className="text-sm" style={{ color: "#4F8EF7" }}>
            ← Back to projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0B0D12", minHeight: "100vh" }}>
      <style>{`
        @keyframes csFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cs-in { animation: csFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Back button */}
      <div className="fixed top-20 left-6 z-40">
        <a
          href="/projects"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            background: "rgba(11,13,18,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <ArrowLeft size={14} /> Projects
        </a>
      </div>

      {/* ── HERO ─── */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${project.color}10 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)`,
          }}
        />

        <div className={`max-w-4xl mx-auto ${mounted ? "cs-in" : "opacity-0"}`}>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {project.category}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {project.status}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {project.year}
            </span>
          </div>

          <h1
            className="font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {project.tagline}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Role", value: project.role },
              { label: "Timeline", value: project.year },
              { label: "Status", value: project.status },
              { label: "Category", value: project.category.split(" / ")[0] },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="text-xs mb-1"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {m.label}
                </div>
                <div className="text-sm font-medium" style={{ color: "#fff" }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: `${project.color}12`,
                  color: project.color,
                  border: `1px solid ${project.color}20`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ─── */}
      <section className="px-6 pb-16">
        <div className={`max-w-4xl mx-auto ${mounted ? "cs-in" : "opacity-0"}`}>
          <div className="grid sm:grid-cols-2 gap-4">
            {IMAGE_SLOTS.map((label, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 aspect-[4/3]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px dashed ${project.color}40`,
                }}
              >
                <ImagePlus size={22} style={{ color: `${project.color}90` }} />
                <span
                  className="text-xs font-medium px-4 text-center"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {label}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  Image to be added
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ─── */}
      <section className="px-6 pb-28">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Overview */}
          <div>
            <h2
              className="text-2xl font-bold mb-5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Overview
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.9" }}
            >
              {project.overview}
            </p>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          {/* The Problem */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-1 h-6 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${project.color}, transparent)`,
                }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ letterSpacing: "-0.01em" }}
              >
                The Problem
              </h2>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{
                background: `${project.color}08`,
                border: `1px solid ${project.color}18`,
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)", lineHeight: "1.85" }}
              >
                {project.problem}
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-1 h-6 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, #10B981, transparent)`,
                }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ letterSpacing: "-0.01em" }}
              >
                The Solution
              </h2>
            </div>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.9" }}
            >
              {project.solution}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h2
              className="text-2xl font-bold mb-5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Architecture
            </h2>
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: "1.9",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                }}
              >
                {project.architecture}
              </p>
            </div>
          </div>

          {/* Tech Stack, layer by layer */}
          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ letterSpacing: "-0.01em" }}
            >
              Technology Stack, Layer by Layer
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              What each piece of the stack is responsible for, from what the
              user sees down to where it runs.
            </p>
            <div className="space-y-4">
              {groupTechByLayer(project.tech).map((group) => {
                const Icon = LAYER_ICON[group.key] || Layers;
                return (
                  <div
                    key={group.key}
                    className="rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Icon size={16} style={{ color: project.color }} />
                      <h4
                        className="text-sm font-semibold"
                        style={{ color: "#fff" }}
                      >
                        {group.label}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <div key={item.name} className="flex flex-col gap-0.5">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {item.name}
                          </span>
                          <span
                            className="text-xs leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                          >
                            {item.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenges */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(236,72,153,0.05)",
                border: "1px solid rgba(236,72,153,0.12)",
              }}
            >
              <h3
                className="font-bold mb-5 flex items-center gap-2"
                style={{ color: "#EC4899" }}
              >
                <Tag size={16} /> Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((c, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: "1.6",
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background: "rgba(236,72,153,0.15)",
                        color: "#EC4899",
                      }}
                    >
                      {i + 1}
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(16,185,129,0.05)",
                border: "1px solid rgba(16,185,129,0.12)",
              }}
            >
              <h3
                className="font-bold mb-5 flex items-center gap-2"
                style={{ color: "#10B981" }}
              >
                <Tag size={16} /> Solutions
              </h3>
              <ul className="space-y-3">
                {project.solutions.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm"
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: "1.6",
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background: "rgba(16,185,129,0.15)",
                        color: "#10B981",
                      }}
                    >
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2
              className="text-2xl font-bold mb-6"
              style={{ letterSpacing: "-0.01em" }}
            >
              Results
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                    }}
                  >
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h2
              className="text-2xl font-bold mb-5"
              style={{ letterSpacing: "-0.01em" }}
            >
              Lessons Learned
            </h2>
            <div className="space-y-4">
              {project.lessons.map((l, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl p-5"
                  style={{
                    background: "rgba(79,142,247,0.04)",
                    border: "1px solid rgba(79,142,247,0.1)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                    style={{
                      background: "rgba(79,142,247,0.15)",
                      color: "#4F8EF7",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.links?.live || project.links?.github) && (
            <div className="flex gap-4 pt-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View Live <ExternalLink size={15} />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  GitHub <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── NEXT PROJECT ─── */}
      <section
        className="px-6 pb-24"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-4xl mx-auto pt-16 text-center">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            More work
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <ArrowLeft size={15} /> All Projects
          </a>
        </div>
      </section>
    </div>
  );
}
