"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

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

const blogPosts = [
  {
    slug: "building-hls-streaming-pipeline",
    title: "Building an HLS Streaming Pipeline with FFmpeg and Node.js",
    excerpt:
      "A deep dive into the architecture and engineering decisions behind GoPremiere's video processing infrastructure — from raw upload to adaptive bitrate stream.",
    category: "Architecture",
    readTime: "12 min read",
    date: "Coming soon",
    color: "#4F8EF7",
    featured: true,
    tags: ["FFmpeg", "HLS", "Node.js", "AWS S3"],
  },
  {
    slug: "full-stack-mental-model",
    title: "The Full Stack Mental Model: Why Every Layer Matters",
    excerpt:
      "What I've learned from building complete products alone — and why understanding every layer of the stack makes you a dramatically better engineer at any level.",
    category: "Engineering",
    readTime: "8 min read",
    date: "Coming soon",
    color: "#10B981",
    featured: true,
    tags: ["Career", "Full Stack", "Product"],
  },
  {
    slug: "design-for-independent-filmmakers",
    title: "Designing Software for Independent Filmmakers",
    excerpt:
      "The user research, product decisions, and UX challenges of building a platform for an industry that's been underserved by technology for decades.",
    category: "Product",
    readTime: "10 min read",
    date: "Coming soon",
    color: "#7C3AED",
    featured: false,
    tags: ["Product Design", "UX", "GoPremiere"],
  },
  {
    slug: "auth-done-right",
    title: "Authentication Done Right: Role-Based Access Control in Next.js",
    excerpt:
      "How to build a secure, multi-role authentication system with NextAuth.js and PostgreSQL — without cutting corners on security or developer experience.",
    category: "Security",
    readTime: "15 min read",
    date: "Coming soon",
    color: "#EC4899",
    featured: false,
    tags: ["NextAuth.js", "Security", "PostgreSQL"],
  },
  {
    slug: "solo-founder-engineering",
    title: "Engineering as a Solo Founder: What I've Learned",
    excerpt:
      "Hard lessons from building GoPremiere alone — how to make architectural decisions, manage scope, avoid burnout, and ship features that actually matter.",
    category: "Startups",
    readTime: "9 min read",
    date: "Coming soon",
    color: "#F59E0B",
    featured: false,
    tags: ["Startups", "Solo Founder", "Lessons"],
  },
  {
    slug: "react-performance-patterns",
    title: "React Performance Patterns I Actually Use in Production",
    excerpt:
      "Not the textbook answers — the real optimizations that made a measurable difference in production apps. Memoization, virtualization, and when to stop optimizing.",
    category: "React",
    readTime: "11 min read",
    date: "Coming soon",
    color: "#06B6D4",
    featured: false,
    tags: ["React", "Performance", "Optimization"],
  },
];

const categories = [
  "All",
  "Architecture",
  "Engineering",
  "Product",
  "Security",
  "Startups",
  "React",
];

export default function BlogPage() {
  const [selected, setSelected] = useState("All");
  const [heroRef, heroVisible] = useFadeIn();
  const [postsRef, postsVisible] = useFadeIn();

  const filtered =
    selected === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === selected);
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div style={{ background: "#0B0D12", minHeight: "100vh" }}>
      <style>{`
        @keyframes blFade {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bl-in { animation: blFade 0.65s cubic-bezier(.2,.8,.2,1) both; }
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
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(79,142,247,0.06) 0%, transparent 100%)",
          }}
        />
        <div
          className={`max-w-7xl mx-auto ${heroVisible ? "bl-in" : "opacity-0"}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(79,142,247,0.8)" }}
          >
            Writing
          </p>
          <h1
            className="font-bold mb-5"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Blog
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Thoughts on software engineering, product development, startups, and
            the lessons I'm learning building GoPremiere. Writing in progress —
            coming soon.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="px-6 pb-10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <Tag
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
                color: selected === cat ? "#4F8EF7" : "rgba(255,255,255,0.45)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <section ref={postsRef} className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {featured.map((post, i) => (
                <div
                  key={post.slug}
                  className={`group rounded-2xl p-8 transition-all duration-300 ${postsVisible ? "bl-in" : "opacity-0"}`}
                  style={{
                    background: `linear-gradient(135deg, ${post.color}08, rgba(255,255,255,0.02))`,
                    border: `1px solid ${post.color}20`,
                    animationDelay: `${i * 0.08}s`,
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: `${post.color}15`,
                        color: post.color,
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: "rgba(79,142,247,0.1)",
                        color: "#4F8EF7",
                        border: "1px solid rgba(79,142,247,0.2)",
                      }}
                    >
                      ✦ Featured
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold mb-3 leading-snug"
                    style={{ color: "#fff" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 text-xs"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {post.readTime}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-xs"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.35)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rest */}
          <div className="space-y-3">
            {rest.map((post, i) => (
              <div
                key={post.slug}
                className={`group flex items-start gap-6 rounded-2xl p-6 transition-all duration-300 ${postsVisible ? "bl-in" : "opacity-0"}`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${(featured.length + i) * 0.07}s`,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = `${post.color}25`;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                  style={{ background: post.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <h3 className="font-bold" style={{ color: "#fff" }}>
                      {post.title}
                    </h3>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: `${post.color}12`, color: post.color }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div
            className="mt-16 text-center rounded-2xl py-12 px-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: "#fff" }}>
              Writing in progress
            </h3>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Articles are being written. Check back soon — or follow on{" "}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4F8EF7" }}
              >
                Twitter/X
              </a>{" "}
              for updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
