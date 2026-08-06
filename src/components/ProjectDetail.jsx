import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  ImagePlus,
  Layers,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Cpu,
  MonitorSmartphone,
} from "lucide-react";
import { groupTechByLayer } from "../data/techStackInfo";
import CodeBackground from "./ui/CodeBackground";

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

const LAYER_ICON = {
  frontend: MonitorSmartphone,
  backend: Server,
  data: Database,
  cache: Layers,
  cloud: Cloud,
  security: ShieldCheck,
  specialized: Cpu,
};

// Labels for the 4 placeholder image slots. If a project later supplies a
// real `project.images` array (e.g. [{ src, alt, label }]), that takes
// priority — until then these render as manual-upload placeholders.
const DEFAULT_IMAGE_SLOTS = [
  "Hero / cover shot",
  "Core screen or dashboard",
  "Key flow in action",
  "Detail or admin view",
];

function ImagePlaceholder({ label, color }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 aspect-[4/3]"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px dashed ${color}40`,
      }}
    >
      <ImagePlus size={22} style={{ color: `${color}90` }} />
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
  );
}

function SectionLabel({ children, color }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
      style={{ color: `${color}` }}
    >
      {children}
    </p>
  );
}

export default function ProjectDetail({ project, onBack }) {
  const [heroRef, heroVisible] = useFadeIn();
  const [galleryRef, galleryVisible] = useFadeIn();
  const [bodyRef, bodyVisible] = useFadeIn();
  const [stackRef, stackVisible] = useFadeIn();

  if (!project) return null;

  const color = project.color || "#4F8EF7";
  const images =
    project.images && project.images.length >= 4
      ? project.images
      : DEFAULT_IMAGE_SLOTS.map((label) => ({ label }));

  const layers = groupTechByLayer(project.tech || []);

  return (
    <div
      style={{
        background: "#0B0D12",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CodeBackground />
      <style>{`
        @keyframes pdFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pd-in { animation: pdFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero */}
        <section ref={heroRef} className="pt-32 pb-14 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${color}14 0%, transparent 100%)`,
            }}
          />
          <div className={`max-w-5xl mx-auto ${heroVisible ? "pd-in" : "opacity-0"}`}>
            <a
              href="/projects"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-medium mb-8 transition-opacity hover:opacity-70"
              style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
            >
              <ArrowLeft size={14} />
              All projects
            </a>

            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${color}18`,
                  color,
                  border: `1px solid ${color}35`,
                }}
              >
                {project.category}
              </span>
              <span
                className="px-2.5 py-1 rounded-full text-xs"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {project.status}
              </span>
            </div>

            <h1
              className="font-bold mb-4"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                color: "#fff",
              }}
            >
              {project.title}
            </h1>
            <p
              className="text-lg max-w-2xl mb-6"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {project.tagline}
            </p>

            <div className="flex items-center gap-6 flex-wrap text-sm">
              <div>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>Role </span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{project.role}</span>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>Year </span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{project.year}</span>
              </div>
              {project.links?.live && (
                <a
                  href={project.links.live}
                  className="inline-flex items-center gap-1 font-medium transition-opacity hover:opacity-75"
                  style={{ color, textDecoration: "none" }}
                >
                  View live <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Image gallery — manual upload placeholders */}
        <section ref={galleryRef} className="px-6 pb-20">
          <div
            className={`max-w-5xl mx-auto ${galleryVisible ? "pd-in" : "opacity-0"}`}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {images.slice(0, 4).map((img, i) =>
                img.src ? (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden aspect-[4/3]"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder key={i} label={img.label} color={color} />
                ),
              )}
            </div>
          </div>
        </section>

        {/* Overview / Problem / Solution */}
        <section ref={bodyRef} className="px-6 pb-20">
          <div
            className={`max-w-3xl mx-auto space-y-16 ${bodyVisible ? "pd-in" : "opacity-0"}`}
          >
            <div>
              <SectionLabel color={color}>Overview</SectionLabel>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {project.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <SectionLabel color={color}>The Problem</SectionLabel>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {project.problem}
                </p>
              </div>
              <div>
                <SectionLabel color={color}>The Solution</SectionLabel>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture narrative */}
            <div>
              <SectionLabel color={color}>
                Architecture — Frontend to Cloud
              </SectionLabel>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {project.architecture}
              </p>
            </div>

            {/* Challenges & Solutions */}
            {project.challenges?.length > 0 && (
              <div>
                <SectionLabel color={color}>Challenges &amp; How They Were Solved</SectionLabel>
                <div className="space-y-4">
                  {project.challenges.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p
                        className="text-sm font-medium mb-2"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {c}
                      </p>
                      {project.solutions?.[i] && (
                        <p
                          className="text-sm leading-relaxed pl-4"
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            borderLeft: `2px solid ${color}50`,
                          }}
                        >
                          {project.solutions[i]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons */}
            {project.lessons?.length > 0 && (
              <div>
                <SectionLabel color={color}>Lessons Learned</SectionLabel>
                <ul className="space-y-2.5">
                  {project.lessons.map((l, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed flex gap-3"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      <span style={{ color }}>—</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results */}
            {project.results?.length > 0 && (
              <div>
                <SectionLabel color={color}>Results</SectionLabel>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {project.results.map((r, i) => (
                    <li
                      key={i}
                      className="text-sm rounded-lg px-4 py-3"
                      style={{
                        background: `${color}0d`,
                        border: `1px solid ${color}25`,
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Tech stack, grouped by layer */}
        <section ref={stackRef} className="px-6 pb-28">
          <div
            className={`max-w-3xl mx-auto ${stackVisible ? "pd-in" : "opacity-0"}`}
          >
            <SectionLabel color={color}>Technology Stack, Layer by Layer</SectionLabel>
            <p
              className="text-sm mb-8"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              What each piece of the stack is responsible for, from what the
              user sees down to where it runs.
            </p>

            <div className="space-y-6">
              {layers.map((group) => {
                const Icon = LAYER_ICON[group.key] || Layers;
                return (
                  <div
                    key={group.key}
                    className="rounded-xl p-5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Icon size={16} style={{ color }} />
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
        </section>
      </div>
    </div>
  );
}