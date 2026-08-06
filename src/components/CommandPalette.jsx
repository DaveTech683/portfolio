import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  FileText,
  User,
  Code,
  Mail,
  Briefcase,
  Zap,
  X,
} from "lucide-react";

const commands = [
  {
    id: "home",
    label: "Go to Home",
    description: "Back to the start",
    icon: Zap,
    href: "/",
    group: "Navigation",
  },
  {
    id: "about",
    label: "About Me",
    description: "My story and background",
    icon: User,
    href: "/about",
    group: "Navigation",
  },
  {
    id: "projects",
    label: "View Projects",
    description: "Case studies and builds",
    icon: Code,
    href: "/projects",
    group: "Navigation",
  },
  {
    id: "services",
    label: "Services",
    description: "What I offer",
    icon: Briefcase,
    href: "/services",
    group: "Navigation",
  },
  {
    id: "gopremiere",
    label: "GoPremiere",
    description: "My streaming startup",
    icon: Zap,
    href: "/gopremiere",
    group: "Navigation",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Writing and thoughts",
    icon: FileText,
    href: "/blog",
    group: "Navigation",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch",
    icon: Mail,
    href: "/contact",
    group: "Navigation",
  },
  {
    id: "resume",
    label: "Resume",
    description: "View my experience",
    icon: FileText,
    href: "/resume",
    group: "Navigation",
  },
  {
    id: "email",
    label: "Send Email",
    description: "hello@example.com",
    icon: Mail,
    href: "mailto:hello@example.com",
    group: "Quick Actions",
  },
  {
    id: "github",
    label: "GitHub",
    description: "See my code",
    icon: Code,
    href: "https://github.com",
    group: "Quick Actions",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Professional network",
    icon: User,
    href: "https://linkedin.com",
    group: "Quick Actions",
  },
];

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const inputRef = useRef(null);

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(0);

      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }

      if (e.key === "Enter" && filtered[selected]) {
        const cmd = filtered[selected];

        if (
          cmd.href.startsWith("http") ||
          cmd.href.startsWith("mailto")
        ) {
          window.open(cmd.href, "_blank");
        } else {
          navigate(cmd.href);
        }

        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, filtered, selected, navigate, onClose]);

  if (!isOpen) return null;

  const groups = {};

  filtered.forEach((cmd) => {
    if (!groups[cmd.group]) {
      groups[cmd.group] = [];
    }

    groups[cmd.group].push(cmd);
  });

  let globalIndex = 0;

  const handleNavigate = (cmd) => {
    if (
      cmd.href.startsWith("http") ||
      cmd.href.startsWith("mailto")
    ) {
      window.open(cmd.href, "_blank");
    } else {
      navigate(cmd.href);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(16,18,27,.98)",
          border: "1px solid rgba(255,255,255,.12)",
          maxHeight: "60vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <Search
            size={16}
            style={{
              color: "rgba(255,255,255,.35)",
            }}
          />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, pages, actions..."
            className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-white/30"
          />

          <button onClick={onClose}>
            <X
              size={14}
              style={{
                color: "rgba(255,255,255,.3)",
              }}
            />
          </button>
        </div>

        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(60vh - 56px)",
          }}
        >
          {filtered.length === 0 ? (
            <div
              className="py-10 text-center text-sm"
              style={{
                color: "rgba(255,255,255,.3)",
              }}
            >
              No results for "{query}"
            </div>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group}>
                <div
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    color: "rgba(255,255,255,.25)",
                  }}
                >
                  {group}
                </div>

                {items.map((cmd) => {
                  const idx = globalIndex++;
                  const isSelected = idx === selected;
                  const Icon = cmd.icon;

                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => handleNavigate(cmd)}
                      onMouseEnter={() => setSelected(idx)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                      style={{
                        background: isSelected
                          ? "rgba(79,142,247,.12)"
                          : "transparent",
                        borderLeft: isSelected
                          ? "2px solid #4F8EF7"
                          : "2px solid transparent",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          background: isSelected
                            ? "rgba(79,142,247,.2)"
                            : "rgba(255,255,255,.06)",
                        }}
                      >
                        <Icon
                          size={13}
                          style={{
                            color: isSelected
                              ? "#4F8EF7"
                              : "rgba(255,255,255,.45)",
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div
                          className="text-sm font-medium"
                          style={{
                            color: isSelected
                              ? "#fff"
                              : "rgba(255,255,255,.75)",
                          }}
                        >
                          {cmd.label}
                        </div>

                        <div
                          className="text-xs"
                          style={{
                            color: "rgba(255,255,255,.3)",
                          }}
                        >
                          {cmd.description}
                        </div>
                      </div>

                      {isSelected && (
                        <ArrowRight
                          size={14}
                          color="#4F8EF7"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div
          className="px-4 py-2 flex gap-4 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,.06)",
            color: "rgba(255,255,255,.25)",
          }}
        >
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}