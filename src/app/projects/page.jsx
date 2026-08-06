import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { projects } from "../../data/projects";
import CodeBackground from "../../components/ui/CodeBackground";

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

const categories = [
  "All",
  "Startup / Platform",
  "Product / Web App",
  "Backend / Infrastructure",
  "Internal Tool / Dashboard",
  "Security / Backend",
  "Client / Web Design",
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState("All");
  const [heroRef, heroVisible] = useFadeIn();
  const [gridRef, gridVisible] = useFadeIn();

  const filtered =
    selected === "All"
      ? projects
      : projects.filter((p) => p.category === selected);

  return (
    <div  style={{
        background: "#0B0D12",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
    }}>
       <CodeBackground />
        <div
    style={{
      position: "relative",
      zIndex: 1,
    }}
  ></div>
      <style>{`
        @keyframes projFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .proj-in { animation: projFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
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
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-7xl mx-auto ${heroVisible ? "proj-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(124,58,237,0.9)" }}
          >
            Work
          </p>
          <h1
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Products & Projects
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            A collection of the products I've designed, engineered, and shipped, ranging
            from founding level work to client projects and infrastructure
            builds.
          </p>
        </div>
      </section>

      {/* Filter pills */}
      <div className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter
              size={14}
              style={{ color: "rgba(255,255,255,0.25)", marginRight: 4 }}
            />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background:
                    selected === cat
                      ? "rgba(79,142,247,0.15)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${selected === cat ? "rgba(79,142,247,0.35)" : "rgba(255,255,255,0.08)"}`,
                  color:
                    selected === cat ? "#4F8EF7" : "rgba(255,255,255,0.45)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <section ref={gridRef} className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((project, i) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${gridVisible ? "proj-in" : "opacity-0"}`}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${i * 0.08}s`,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${project.color}35`;
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Top gradient accent */}
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)`,
                  }}
                />

                {/* Fake hero image area */}
                <div
                  className="h-44 w-full relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}12, ${project.color}06, rgba(11,13,18,0.9))`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-7xl font-black select-none"
                      style={{
                        color: `${project.color}18`,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {project.title.charAt(0)}
                    </div>
                  </div>
                  {/* Tags overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(11,13,18,0.8)",
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: "rgba(11,13,18,0.7)",
                        color: "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-opacity-100"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold" style={{ color: "#fff" }}>
                      {project.title}
                    </h3>
                    <span
                      className="text-xs flex-shrink-0 mt-1"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {project.tagline}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-xs"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span
                          className="px-2 py-0.5 text-xs"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {project.role}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: "rgba(255,255,255,0.3)" }}>
                No projects in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
