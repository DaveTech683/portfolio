"use client";
import { useEffect, useRef, useState } from "react";

export default function MouseFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleHoverOn = () => setIsHovering(true);
    const handleHoverOff = () => setIsHovering(false);

    const interactiveEls = "a, button, [data-cursor-hover]";
    document.querySelectorAll(interactiveEls).forEach((el) => {
      el.addEventListener("mouseenter", handleHoverOn);
      el.addEventListener("mouseleave", handleHoverOff);
    });

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Lag the ring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const size = isHovering ? 36 : 20;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
      document.querySelectorAll(interactiveEls).forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverOn);
        el.removeEventListener("mouseleave", handleHoverOff);
      });
    };
  }, [isHovering]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "#4F8EF7",
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          border: `1.5px solid rgba(79,142,247,${isHovering ? 0.7 : 0.4})`,
          background: isHovering ? "rgba(79,142,247,0.08)" : "transparent",
          transition:
            "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
        }}
      />
    </>
  );
}
