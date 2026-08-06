"use client";

import { useEffect, useRef, useState } from "react";

/**
 * EngineeringConsole
 * ───────────────────
 * The hero's signature element: a real editor window, not a decorative
 * blurred code loop. Types out once on load, then rests with a blinking
 * cursor. Confined to the hero — do not reuse this animated version
 * elsewhere on the page (the GoPremiere section below reuses the static
 * "window chrome" only, for cohesion without repeating the motion).
 *
 * Drop-in: <EngineeringConsole /> — sized by its parent grid column.
 */

// Each line is pre-tokenized so we can type character-by-character while
// still color-coding keywords/strings/types without a highlighting lib.
const TOKENS = {
  kw: "#7C98B8", // keyword — steel blue, matches the page accent
  type: "#8AA292", // type / string — muted sage
  fn: "#C9AE8C", // function name — quiet warm neutral, used sparingly
  text: "#AEB6C2", // default token color
  comment: "#5B6472", // comment — low contrast
  punct: "#6B7280",
};

const LINES = [
  [{ t: "// portfolio.ts", c: TOKENS.comment }],
  [{ t: "", c: TOKENS.text }],
  [
    { t: "interface ", c: TOKENS.kw },
    { t: "Engineer ", c: TOKENS.fn },
    { t: "{", c: TOKENS.punct },
  ],
  [
    { t: "  name", c: TOKENS.text },
    { t: ": ", c: TOKENS.punct },
    { t: "string", c: TOKENS.type },
    { t: ";", c: TOKENS.punct },
  ],
  [
    { t: "  focus", c: TOKENS.text },
    { t: ": ", c: TOKENS.punct },
    { t: "string", c: TOKENS.type },
    { t: "[];", c: TOKENS.punct },
  ],
  [
    { t: "  availability", c: TOKENS.text },
    { t: ": ", c: TOKENS.punct },
    { t: "\"open\"", c: TOKENS.type },
    { t: " | ", c: TOKENS.punct },
    { t: "\"booked\"", c: TOKENS.type },
    { t: ";", c: TOKENS.punct },
  ],
  [{ t: "}", c: TOKENS.punct }],
  [{ t: "", c: TOKENS.text }],
  [
    { t: "const ", c: TOKENS.kw },
    { t: "david", c: TOKENS.fn },
    { t: ": Engineer = {", c: TOKENS.punct },
  ],
  [
    { t: "  name", c: TOKENS.text },
    { t: ": ", c: TOKENS.punct },
    { t: "\"David\"", c: TOKENS.type },
    { t: ",", c: TOKENS.punct },
  ],
  [
    { t: "  focus", c: TOKENS.text },
    { t: ": [", c: TOKENS.punct },
    { t: "\"full-stack\"", c: TOKENS.type },
    { t: ", ", c: TOKENS.punct },
    { t: "\"systems\"", c: TOKENS.type },
    { t: "],", c: TOKENS.punct },
  ],
  [
    { t: "  availability", c: TOKENS.text },
    { t: ": ", c: TOKENS.punct },
    { t: "\"open\"", c: TOKENS.type },
    { t: ",", c: TOKENS.punct },
  ],
  [{ t: "};", c: TOKENS.punct }],
  [{ t: "", c: TOKENS.text }],
  [
    { t: "export function ", c: TOKENS.kw },
    { t: "ship", c: TOKENS.fn },
    { t: "(idea: Idea) {", c: TOKENS.punct },
  ],
  [
    { t: "  return ", c: TOKENS.kw },
    { t: "build(design(idea));", c: TOKENS.text },
  ],
  [{ t: "}", c: TOKENS.punct }],
];

export default function EngineeringConsole() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current) {
      setVisibleLines(LINES.length);
      setDone(true);
      return;
    }

    let line = 0;
    let char = 0;
    let raf;
    let last = performance.now();
    const msPerChar = 14;

    const tick = (now) => {
      const lineText = LINES[line].map((tk) => tk.t).join("");
      if (now - last >= msPerChar) {
        last = now;
        if (char < lineText.length) {
          char += 1;
          setVisibleChars(char);
        } else {
          line += 1;
          char = 0;
          setVisibleLines(line);
          setVisibleChars(0);
          if (line >= LINES.length) {
            setDone(true);
            return;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const renderLine = (lineTokens, charLimit) => {
    let consumed = 0;
    return lineTokens.map((tk, i) => {
      if (consumed >= charLimit) return null;
      const remaining = charLimit - consumed;
      const slice = tk.t.slice(0, remaining);
      consumed += tk.t.length;
      if (!slice) return null;
      return (
        <span key={i} style={{ color: tk.c }}>
          {slice}
        </span>
      );
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* faint ambient glow behind the panel — restrained, not neon */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-10%",
          background:
            "radial-gradient(ellipse 60% 60% at 60% 30%, rgba(124,152,184,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: "#12161D",
          border: "1px solid #262D38",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        {/* window chrome */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            borderBottom: "1px solid #1E2530",
            background: "#0F1319",
          }}
        >
          <div className="flex gap-1.5">
            {["#3A4250", "#3A4250", "#3A4250"].map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-md text-xs"
            style={{
              fontFamily:
                "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
              background: "#171C24",
              color: "#8B93A1",
              border: "1px solid #232A34",
            }}
          >
            portfolio.ts
          </div>
        </div>

        {/* code body */}
        <div
          className="px-5 py-6 text-[13px] leading-[1.8] overflow-hidden"
          style={{
            fontFamily:
              "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
            minHeight: 340,
          }}
        >
          {LINES.map((lineTokens, idx) => {
            if (idx > visibleLines) return null;
            const isCurrent = idx === visibleLines && !done;
            const charLimit = isCurrent
              ? visibleChars
              : idx < visibleLines || done
                ? Infinity
                : 0;
            return (
              <div key={idx} className="flex">
                <span
                  className="select-none pr-4 text-right"
                  style={{ color: "#3D4652", width: 28, flexShrink: 0 }}
                >
                  {idx + 1}
                </span>
                <span style={{ whiteSpace: "pre" }}>
                  {renderLine(lineTokens, charLimit)}
                  {isCurrent && (
                    <span
                      className="inline-block"
                      style={{
                        width: 7,
                        height: 15,
                        background: "#7C98B8",
                        marginLeft: 1,
                        verticalAlign: "text-bottom",
                        animation: "consoleCursor 1s step-start infinite",
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
          {done && (
            <div className="flex">
              <span
                className="select-none pr-4 text-right"
                style={{ color: "#3D4652", width: 28, flexShrink: 0 }}
              />
              <span
                className="inline-block"
                style={{
                  width: 7,
                  height: 15,
                  background: "#7C98B8",
                  animation: "consoleCursor 1s step-start infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* status bar */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[11px]"
          style={{
            borderTop: "1px solid #1E2530",
            background: "#0F1319",
            fontFamily:
              "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
            color: "#5B6472",
          }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#8AA292" }}
            />
            available for work
          </span>
          <span>TypeScript</span>
        </div>
      </div>

      <style>{`
        @keyframes consoleCursor {
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; }
        }
      `}</style>
    </div>
  );
}