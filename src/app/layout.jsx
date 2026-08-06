"use client";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import CommandPalette from "../components/CommandPalette";
import ScrollProgress from "../components/ScrollProgress";
import MouseFollower from "../components/MouseFollower";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const STANDALONE_PATHS = ["/upload", "/admin", "/account"];
function isStandalonePath(path) {
  return STANDALONE_PATHS.some((p) => path.startsWith(p));
}

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setIsStandalone(isStandalonePath(window.location.pathname));
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    const seen = sessionStorage.getItem("portfolio_seen");
    if (!seen) {
      setShowLoader(true);
      sessionStorage.setItem("portfolio_seen", "1");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0; padding: 0;
          background: #0B0D12; color: #ffffff;
          font-family: 'Inter', 'SF Pro Display', system-ui, -apple-system, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::selection { background: rgba(79,142,247,0.35); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0B0D12; }
        ::-webkit-scrollbar-thumb { background: rgba(79,142,247,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(79,142,247,0.5); }
        a { color: inherit; text-decoration: none; }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-35px,25px) scale(0.9); }
          66% { transform: translate(20px,-30px) scale(1.08); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes counters { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(79,142,247,0); }
          50% { box-shadow: 0 0 20px 4px rgba(79,142,247,0.15); }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .gradient-text {
          background: linear-gradient(90deg, #4F8EF7, #7C3AED, #EC4899);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
        .glass {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .card-hover {
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        .section-fade { opacity: 0; transform: translateY(20px); }
        .section-fade.visible { animation: fadeUp 0.7s ease forwards; }
      `}</style>

      {showLoader && loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {!isMobile && <MouseFollower />}
      <ScrollProgress />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <Toaster theme="dark" position="bottom-right" />

      <div
        style={{
          opacity: loading && showLoader ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        {isStandalone ? (
          children
        ) : (
          <>
            <Navigation onCommandPalette={() => setCmdOpen(true)} />
            <main style={{ minHeight: "100vh" }}>{children}</main>
            <Footer />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}
