"use client";
import { useState } from "react";
import {
  Film,
  Search,
  Download,
  Eye,
  ChevronDown,
  Loader2,
  FileDown,
  SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Sidebar,
  StatusBadge,
  ProcessingBadge,
} from "@/components/admin/AdminShared";

export default function AdminMoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [processingFilter, setProcessingFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-movies",
      searchQuery,
      genreFilter,
      statusFilter,
      processingFilter,
      sortBy,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (genreFilter) params.append("genre", genreFilter);
      if (statusFilter) params.append("status", statusFilter);
      if (processingFilter)
        params.append("processing_status", processingFilter);
      if (sortBy) params.append("sort", sortBy);
      const res = await fetch(`/api/admin/movies?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
  });

  const handleExportCSV = () => {
    if (typeof window === "undefined") return;
    if (!data?.movies?.length) return;
    const headers = [
      "Title",
      "Producer",
      "Studio",
      "Email",
      "Phone",
      "Genre",
      "Language",
      "Duration",
      "Release Year",
      "Status",
      "Processing",
      "Upload Date",
      "Submission Ref",
    ];
    const rows = data.movies.map((m) => [
      m.title,
      m.producer_name,
      m.studio_name,
      m.email,
      m.phone,
      m.genre,
      m.language,
      m.duration,
      m.release_year,
      m.status,
      m.processing_status,
      format(new Date(m.created_at), "yyyy-MM-dd HH:mm:ss"),
      m.submission_reference,
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `gopremiere-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectClass =
    "w-full px-4 py-2.5 bg-black border border-white/8 rounded-xl text-white focus:outline-none focus:border-red-500/50 transition-colors text-sm";

  return (
    <div className="min-h-screen bg-black text-white flex">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <Sidebar active="movies" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-5">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">
              Management
            </p>
            <h1 className="text-3xl font-black mb-1">Movie Submissions</h1>
            <p className="text-gray-500 text-sm">
              Search, filter, and manage all uploaded films
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-5 py-2.5 bg-zinc-900 border border-white/8 rounded-xl text-white hover:bg-zinc-800 hover:border-red-500/20 transition-all flex items-center gap-2 text-sm font-semibold"
            >
              <FileDown size={16} /> Export CSV
            </button>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-black text-sm shadow-lg shadow-red-600/30">
              A
            </div>
          </div>
        </header>

        {/* Search & Filters */}
        <div className="bg-zinc-950 border border-white/5 rounded-3xl p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title, producer name, or studio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-black border border-white/8 rounded-xl text-white placeholder:text-gray-700 focus:outline-none focus:border-red-500/50 transition-colors text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-3 bg-black border border-white/8 rounded-xl text-white hover:bg-zinc-900 hover:border-red-500/20 transition-all flex items-center gap-2 font-semibold text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
              <ChevronDown
                size={15}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block font-semibold uppercase tracking-wider">
                  Genre
                </label>
                <select
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All Genres</option>
                  {[
                    "Action",
                    "Drama",
                    "Comedy",
                    "Horror",
                    "Thriller",
                    "Romance",
                    "Sci-Fi",
                    "Documentary",
                    "Animation",
                    "Adventure",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block font-semibold uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All Statuses</option>
                  <option>Pending Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block font-semibold uppercase tracking-wider">
                  Processing
                </label>
                <select
                  value={processingFilter}
                  onChange={(e) => setProcessingFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Processed</option>
                  <option>Failed Processing</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1.5 block font-semibold uppercase tracking-wider">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={selectClass}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A–Z</option>
                  <option value="producer">Producer A–Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Count */}
        {data && (
          <p className="text-gray-600 text-xs font-semibold mb-4 uppercase tracking-widest">
            {data.movies?.length || 0} submission
            {data.movies?.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Table */}
        <div className="bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left text-gray-600 text-xs uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">Movie</th>
                  <th className="px-4 py-4">Producer / Studio</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-4 py-4">Details</th>
                  <th className="px-4 py-4">Submitted</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Processing</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="py-24 text-center">
                      <Loader2
                        size={32}
                        className="mx-auto text-red-600"
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                      <p className="text-gray-700 text-sm mt-3">
                        Loading submissions…
                      </p>
                    </td>
                  </tr>
                ) : !data?.movies?.length ? (
                  <tr>
                    <td colSpan="8" className="py-24 text-center">
                      <Film size={48} className="mx-auto text-zinc-800 mb-4" />
                      <p className="text-gray-500 font-bold">No movies found</p>
                      <p className="text-gray-700 text-sm mt-1">
                        Try adjusting your search or filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  data.movies.map((movie) => (
                    <tr
                      key={movie.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors group"
                    >
                      <td className="px-6 py-4">
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
                            <p className="font-bold text-sm leading-tight">
                              {movie.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              {movie.genre} · {movie.language}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold">
                          {movie.producer_name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {movie.studio_name}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-400 truncate max-w-[150px]">
                          {movie.email}
                        </p>
                        <p className="text-xs text-gray-600">{movie.phone}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-400">
                          {movie.duration}
                        </p>
                        <p className="text-xs text-gray-600">
                          {movie.release_year}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-500">
                        {format(new Date(movie.created_at), "MMM dd, yyyy")}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={movie.status} />
                      </td>
                      <td className="px-4 py-4">
                        <ProcessingBadge status={movie.processing_status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/admin/movies/${movie.id}`}
                            className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-red-500/30 transition-all"
                            title="View Full Details"
                          >
                            <Eye size={14} />
                          </a>
                          {movie.original_file_url && (
                            <a
                              href={movie.original_file_url}
                              target="_blank"
                              className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-gray-500 hover:text-white hover:border-red-500/30 transition-all"
                              title="Download Movie"
                            >
                              <Download size={14} />
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
    </div>
  );
}
