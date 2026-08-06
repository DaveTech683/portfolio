"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Film,
  Users,
  Settings,
  Search,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  Eye,
  Play,
  LogOut,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Sidebar,
  StatusBadge,
  ProcessingBadge,
} from "@/components/admin/AdminShared";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const { data: recentMovies, isLoading: moviesLoading } = useQuery({
    queryKey: ["recent-movies"],
    queryFn: async () => {
      const res = await fetch("/api/admin/movies?limit=5");
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar active="dashboard" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
              Overview
            </p>
            <h1 className="text-3xl font-black mb-1">Welcome Back, Admin</h1>
            <p className="text-gray-500 text-sm">
              Here's your GoPremiere submissions overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/movies"
              className="px-5 py-2.5 bg-zinc-900 border border-white/8 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <Film size={16} /> All Movies
            </a>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-black text-sm shadow-lg shadow-red-600/30">
              A
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard
            label="Total Submissions"
            value={statsLoading ? "—" : stats?.total || 0}
            icon={<Film size={18} />}
            color="red"
            trend="+12%"
          />
          <StatCard
            label="Pending Review"
            value={statsLoading ? "—" : stats?.pending || 0}
            icon={<Clock size={18} />}
            color="yellow"
            trend="Needs attention"
          />
          <StatCard
            label="Processed"
            value={statsLoading ? "—" : stats?.processed || 0}
            icon={<CheckCircle2 size={18} />}
            color="green"
            trend="Ready to review"
          />
          <StatCard
            label="Rejected"
            value={statsLoading ? "—" : stats?.rejected || 0}
            icon={<XCircle size={18} />}
            color="gray"
            trend="This month"
          />
        </div>

        {/* Recent Submissions */}
        <div className="bg-zinc-950 border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black">Recent Submissions</h2>
              <p className="text-gray-600 text-sm mt-0.5">
                Latest films submitted to GoPremiere
              </p>
            </div>
            <a
              href="/admin/movies"
              className="text-sm text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-600 text-xs uppercase tracking-widest font-bold border-b border-white/5">
                  <th className="pb-4 pr-4">Movie</th>
                  <th className="pb-4 pr-4">Producer</th>
                  <th className="pb-4 pr-4">Date</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4 pr-4">Processing</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {moviesLoading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <Loader2
                        className="mx-auto text-red-600"
                        size={28}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                    </td>
                  </tr>
                ) : !recentMovies?.movies?.length ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <Film size={40} className="mx-auto text-zinc-800 mb-3" />
                      <p className="text-gray-600 font-medium">
                        No submissions yet
                      </p>
                    </td>
                  </tr>
                ) : (
                  recentMovies.movies.map((movie) => (
                    <tr
                      key={movie.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                            {movie.poster_url && (
                              <img
                                src={movie.poster_url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{movie.title}</p>
                            <p className="text-xs text-gray-600">
                              {movie.genre}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm font-semibold">
                          {movie.producer_name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {movie.studio_name}
                        </p>
                      </td>
                      <td className="py-4 pr-4 text-sm text-gray-500">
                        {format(new Date(movie.created_at), "MMM dd, yyyy")}
                      </td>
                      <td className="py-4 pr-4">
                        <StatusBadge status={movie.status} />
                      </td>
                      <td className="py-4 pr-4">
                        <ProcessingBadge status={movie.processing_status} />
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/admin/movies/${movie.id}`}
                            className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-red-500/30 transition-all"
                            title="View Details"
                          >
                            <Eye size={15} />
                          </a>
                          {movie.original_file_url && (
                            <a
                              href={movie.original_file_url}
                              target="_blank"
                              className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-red-500/30 transition-all"
                              title="Download"
                            >
                              <Download size={15} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon, color, trend }) {
  const colors = {
    red: "text-red-400 bg-red-600/10 border-red-500/20",
    yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    gray: "text-gray-400 bg-white/5 border-white/10",
  };
  return (
    <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-4 ${colors[color]}`}
      >
        {icon}
      </div>
      <p className="text-gray-500 text-xs font-semibold mb-1">{label}</p>
      <p className="text-3xl font-black mb-2">{value}</p>
      <p className="text-xs text-gray-600 flex items-center gap-1">
        <TrendingUp size={11} /> {trend}
      </p>
    </div>
  );
}
