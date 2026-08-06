"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | fading | done

  useEffect(() => {
    const steps = [
      { target: 30, delay: 200 },
      { target: 65, delay: 400 },
      { target: 85, delay: 300 },
      { target: 100, delay: 250 },
    ];

    let current = 0;
    const runStep = () => {
      if (current >= steps.length) {
        setTimeout(() => {
          setPhase("fading");
          setTimeout(() => {
            setPhase("done");
            onComplete?.();
          }, 600);
        }, 200);
        return;
      }
      const step = steps[current];
      setTimeout(() => {
        setProgress(step.target);
        current++;
        runStep();
      }, step.delay);
    };

    const startTimer = setTimeout(runStep, 300);
    return () => clearTimeout(startTimer);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#0B0D12",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      <style>{`
        @keyframes loadPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, 20px) scale(0.9); }
        }
      `}</style>

      {/* Background orbs */}
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,142,247,0.15) 0%, transparent 70%)",
          top: "20%",
          left: "30%",
          animation: "orbFloat1 6s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          bottom: "25%",
          right: "25%",
          animation: "orbFloat2 8s ease-in-out infinite",
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
          style={{
            background: "linear-gradient(135deg, #4F8EF7, #7C3AED)",
            boxShadow: "0 0 40px rgba(79,142,247,0.3)",
            animation: "loadPulse 2s ease-in-out infinite",
          }}
        >
          D
        </div>

        <div className="text-center">
          <p
            className="text-xs font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Loading Portfolio
          </p>

          {/* Progress bar */}
          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #4F8EF7, #7C3AED)",
              }}
            />
          </div>
          <p
            className="text-xs mt-3"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
