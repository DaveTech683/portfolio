"use client";
import {
  Play,
  LayoutDashboard,
  Film,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export function Sidebar({ active }) {
  const navItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Overview",
      href: "/admin/dashboard",
    },
    {
      id: "movies",
      icon: <Film size={18} />,
      label: "Movies",
      href: "/admin/movies",
    },
    {
      id: "producers",
      icon: <Users size={18} />,
      label: "Producers",
      href: "#",
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      label: "Settings",
      href: "#",
    },
  ];

  return (
    <aside className="w-60 border-r border-white/5 bg-zinc-950 hidden lg:flex flex-col flex-shrink-0 min-h-screen">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Play size={14} className="fill-white text-white ml-0.5" />
          </div>
          <div>
            <span className="font-black text-sm">
              Go<span className="text-red-500">Premiere</span>
            </span>
            <p className="text-[10px] text-gray-600 -mt-0.5">Admin Panel</p>
          </div>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              active === item.id
                ? "bg-red-600/10 text-red-400 border border-red-500/20"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={18} /> Back to Site
        </a>
      </div>
    </aside>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    "Pending Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/25",
    Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    Rejected: "bg-red-500/10 text-red-400 border-red-500/25",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status] || styles["Pending Review"]}`}
    >
      {status || "Unknown"}
    </span>
  );
}

export function ProcessingBadge({ status }) {
  const map = {
    Pending: "text-gray-500",
    Processing: "text-blue-400",
    Processed: "text-emerald-400",
    "Failed Processing": "text-red-400",
  };
  return (
    <span className={`text-xs font-semibold ${map[status] || "text-gray-600"}`}>
      {status || "—"}
    </span>
  );
}
