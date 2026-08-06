"use client";
import { useState } from "react";
import {
  Film,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  ExternalLink,
  ArrowLeft,
  Play,
  FileText,
  MessageSquare,
  Copy,
  Loader2,
  Users,
  Tag,
  Flag,
  Shield,
  AlertCircle,
  Star,
  Building2,
  Hash,
  RefreshCw,
  Info,
  Link2,
} from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import {
  Sidebar,
  StatusBadge,
  ProcessingBadge,
} from "@/components/admin/AdminShared";

export default function MovieDetailsPage({ params }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const [adminNotes, setAdminNotes] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const { data: movie, isLoading } = useQuery({
    queryKey: ["admin-movie-detail", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/movies/${id}`);
      if (!res.ok) throw new Error("Movie not found");
      const data = await res.json();
      setAdminNotes(data.admin_notes || "");
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ status, notes }) => {
      const res = await fetch(`/api/admin/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, admin_notes: notes }),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin-movie-detail", id]);
      queryClient.invalidateQueries(["admin-movies"]);
      toast.success(`Status updated to "${data.status}"`);
    },
    onError: () => toast.error("Failed to update. Please try again."),
  });

  const copyToClipboard = (text, label) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success(`${label} copied!`);
    }
  };

  const tabs = [
    { id: "details", label: "Movie Details" },
    { id: "producer", label: "Producer Info" },
    { id: "rights", label: "Rights & Ownership" },
    { id: "files", label: "Files & Downloads" },
    { id: "admin", label: "Admin Controls" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex">
        <Sidebar active="movies" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-3"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
            <p className="text-gray-600 text-sm">Loading movie details…</p>
          </div>
        </div>
        <style
          jsx
          global
        >{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const castList = movie?.cast_names
    ? movie.cast_names
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <Toaster position="top-right" richColors />
      <Sidebar active="movies" />

      <main className="flex-1 overflow-y-auto">
        {/* ── Hero Banner ── */}
        <div className="relative bg-zinc-950 border-b border-white/5">
          {movie?.poster_url && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={movie.poster_url}
                alt=""
                className="w-full h-full object-cover opacity-[0.08] blur-2xl scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black" />
            </div>
          )}

          <div className="relative z-10 px-8 py-8">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <a
                href="/admin/movies"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Back to Movies
              </a>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      status: "Pending Review",
                      notes: adminNotes,
                    })
                  }
                  disabled={updateMutation.isPending}
                  className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <RefreshCw size={13} /> Pending
                </button>
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      status: "Approved",
                      notes: adminNotes,
                    })
                  }
                  disabled={updateMutation.isPending}
                  className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 size={13} /> Approve
                </button>
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      status: "Rejected",
                      notes: adminNotes,
                    })
                  }
                  disabled={updateMutation.isPending}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <XCircle size={13} /> Reject
                </button>
              </div>
            </div>

            {/* Movie hero */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-28 h-40 bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {movie?.poster_url ? (
                    <img
                      src={movie.poster_url}
                      alt={movie?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Film size={28} className="text-zinc-700" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <StatusBadge status={movie?.status} />
                  <ProcessingBadge status={movie?.processing_status} />
                  {movie?.age_rating && (
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 font-bold tracking-wider">
                      {movie.age_rating}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">
                  {movie?.title}
                </h1>
                <p className="text-gray-400 text-sm mb-3">
                  {[
                    movie?.genre,
                    movie?.language,
                    movie?.duration,
                    movie?.release_year,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                  {movie?.production_company && (
                    <span className="flex items-center gap-1">
                      <Building2 size={11} /> {movie.production_company}
                    </span>
                  )}
                  {movie?.country_of_production && (
                    <span className="flex items-center gap-1">
                      <Flag size={11} /> {movie.country_of_production}
                    </span>
                  )}
                  {movie?.created_at && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> Submitted{" "}
                      {format(new Date(movie.created_at), "MMM dd, yyyy")}
                    </span>
                  )}
                </div>
                <div className="mt-3 inline-flex items-center gap-2 bg-black/50 border border-white/5 rounded-lg px-3 py-1.5">
                  <Hash size={11} className="text-gray-700" />
                  <span className="text-xs font-mono text-gray-500">
                    {movie?.submission_reference}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        movie?.submission_reference,
                        "Reference ID",
                      )
                    }
                    className="text-gray-700 hover:text-red-400 transition-colors"
                  >
                    <Copy size={11} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 mt-8 border-b border-white/5 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-red-500 text-white"
                      : "border-transparent text-gray-600 hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="px-8 py-8">
          {/* ─── MOVIE DETAILS TAB ─── */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-5">
                {/* Synopsis */}
                <Section
                  title="Synopsis"
                  icon={<FileText size={15} className="text-red-400" />}
                >
                  <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                    {movie?.synopsis || (
                      <span className="text-gray-700 italic">
                        No synopsis provided.
                      </span>
                    )}
                  </p>
                </Section>

                {/* Cast */}
                {castList.length > 0 && (
                  <Section
                    title={`Cast (${castList.length} member${castList.length !== 1 ? "s" : ""})`}
                    icon={<Users size={15} className="text-red-400" />}
                  >
                    <div className="flex flex-wrap gap-2">
                      {castList.map((actor, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-white/8 rounded-full text-sm text-gray-300 hover:border-red-500/25 transition-colors"
                        >
                          <User size={11} className="text-red-400" /> {actor}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Production Team */}
                <Section
                  title="Production Team"
                  icon={<Film size={15} className="text-red-400" />}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <CrewCard role="Director" name={movie?.director_name} />
                    <CrewCard role="Producer" name={movie?.producer_name} />
                    <CrewCard role="Writer" name={movie?.writer_name} />
                    <CrewCard
                      role="Production Company"
                      name={movie?.production_company}
                    />
                    <CrewCard role="Studio" name={movie?.studio_name} />
                    <CrewCard
                      role="Country"
                      name={movie?.country_of_production}
                    />
                  </div>
                </Section>

                {/* Trailer */}
                {movie?.trailer_link && (
                  <Section
                    title="Trailer Link"
                    icon={<Play size={15} className="text-red-400" />}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={movie.trailer_link}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-sm font-bold transition-all"
                      >
                        <Play size={14} className="fill-white" /> Watch Trailer
                      </a>
                      <button
                        onClick={() =>
                          copyToClipboard(movie.trailer_link, "Trailer URL")
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-white/8 hover:border-red-500/25 rounded-xl text-sm font-semibold text-gray-400 hover:text-white transition-all"
                      >
                        <Copy size={14} /> Copy URL
                      </button>
                    </div>
                  </Section>
                )}
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {movie?.thumbnail_url && (
                  <div className="rounded-2xl overflow-hidden border border-white/5 aspect-video bg-zinc-900 shadow-xl">
                    <img
                      src={movie.thumbnail_url}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <Section
                  title="Film Info"
                  icon={<Info size={15} className="text-red-400" />}
                >
                  <MetaRow
                    label="Genre"
                    value={movie?.genre}
                    icon={<Tag size={11} />}
                  />
                  <MetaRow
                    label="Language"
                    value={movie?.language}
                    icon={<Globe size={11} />}
                  />
                  <MetaRow
                    label="Duration"
                    value={movie?.duration}
                    icon={<Clock size={11} />}
                  />
                  <MetaRow
                    label="Release Year"
                    value={movie?.release_year}
                    icon={<Calendar size={11} />}
                  />
                  <MetaRow
                    label="Age Rating"
                    value={movie?.age_rating}
                    icon={<Star size={11} />}
                  />
                  <MetaRow
                    label="Country"
                    value={movie?.country_of_production}
                    icon={<Flag size={11} />}
                  />
                  <MetaRow
                    label="Subtitles"
                    value={
                      movie?.subtitle_available
                        ? "✓ Available"
                        : "Not Available"
                    }
                    icon={<Film size={11} />}
                  />
                </Section>
              </div>
            </div>
          )}

          {/* ─── PRODUCER INFO TAB ─── */}
          {activeTab === "producer" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl">
              <Section
                title="Personal Details"
                icon={<User size={15} className="text-red-400" />}
              >
                <MetaRow
                  label="Full Name"
                  value={movie?.producer_full_name || movie?.producer_name}
                  icon={<User size={11} />}
                />
                <MetaRow
                  label="Studio / Company"
                  value={movie?.studio_name}
                  icon={<Building2 size={11} />}
                />
                <MetaRow
                  label="Email"
                  value={movie?.email}
                  icon={<Mail size={11} />}
                  copyable
                  onCopy={() => copyToClipboard(movie?.email, "Email")}
                />
                <MetaRow
                  label="Phone"
                  value={movie?.phone}
                  icon={<Phone size={11} />}
                  copyable
                  onCopy={() => copyToClipboard(movie?.phone, "Phone")}
                />
                <MetaRow
                  label="Country"
                  value={movie?.country}
                  icon={<Globe size={11} />}
                />
                <MetaRow
                  label="State / City"
                  value={movie?.state_city}
                  icon={<MapPin size={11} />}
                />
              </Section>

              <Section
                title="Online Presence"
                icon={<Globe size={15} className="text-red-400" />}
              >
                {movie?.website ? (
                  <a
                    href={movie.website}
                    target="_blank"
                    className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-white/5 hover:border-red-500/20 transition-all group mb-4"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe
                        size={14}
                        className="text-gray-500 group-hover:text-red-400 transition-colors flex-shrink-0"
                      />
                      <span className="text-sm text-gray-300 truncate">
                        {movie.website}
                      </span>
                    </div>
                    <ExternalLink
                      size={13}
                      className="text-gray-700 group-hover:text-red-400 flex-shrink-0 ml-2"
                    />
                  </a>
                ) : (
                  <p className="text-gray-700 text-sm italic mb-4">
                    No website provided
                  </p>
                )}

                {movie?.social_media && (
                  <div>
                    <p className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-2">
                      Social Media
                    </p>
                    <div className="bg-zinc-900 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-gray-400 font-mono break-all leading-relaxed">
                        {typeof movie.social_media === "object"
                          ? JSON.stringify(movie.social_media, null, 2)
                          : movie.social_media}
                      </p>
                    </div>
                  </div>
                )}
              </Section>
            </div>
          )}

          {/* ─── RIGHTS TAB ─── */}
          {activeTab === "rights" && (
            <div className="space-y-5 max-w-3xl">
              <Section
                title="Copyright & License Description"
                icon={<Shield size={15} className="text-red-400" />}
              >
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {movie?.copyright_description || (
                    <span className="text-gray-700 italic">Not provided</span>
                  )}
                </p>
              </Section>

              <Section
                title="Distribution Permission Details"
                icon={<Flag size={15} className="text-red-400" />}
              >
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {movie?.distribution_permission || (
                    <span className="text-gray-700 italic">Not provided</span>
                  )}
                </p>
              </Section>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-sm text-emerald-300 mb-1">
                      Ownership Confirmed
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Producer confirmed legal ownership or licensed rights to
                      upload this film
                    </p>
                  </div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-sm text-emerald-300 mb-1">
                      Review Agreed
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Producer agreed to GoPremiere's review and processing
                      terms
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── FILES & DOWNLOADS TAB ─── */}
          {activeTab === "files" && (
            <div className="space-y-6">
              {/* Main movie file */}
              <Section
                title="Main Movie File"
                icon={<Film size={15} className="text-red-400" />}
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <DownloadCard
                    label="Original Movie File"
                    sublabel="Full quality original upload"
                    url={movie?.original_file_url}
                    highlight
                  />
                  {movie?.downloadable_mp4_url && (
                    <DownloadCard
                      label="Downloadable MP4"
                      sublabel="Optimized for download"
                      url={movie.downloadable_mp4_url}
                    />
                  )}
                </div>
              </Section>

              {/* Optimized versions */}
              <Section
                title="Optimized Streaming Versions (HLS Adaptive)"
                icon={<ZapIcon />}
              >
                <div className="grid sm:grid-cols-3 gap-3">
                  <QualityCard
                    quality="1080p"
                    label="Full HD"
                    bitrate="3000–4500 kbps"
                    url={movie?.optimized_1080p_url}
                  />
                  <QualityCard
                    quality="720p"
                    label="HD"
                    bitrate="1200–2500 kbps"
                    url={movie?.optimized_720p_url}
                  />
                  <QualityCard
                    quality="480p"
                    label="SD"
                    bitrate="500–1000 kbps"
                    url={movie?.optimized_480p_url}
                  />
                </div>
              </Section>

              {/* HLS Streaming URL */}
              <Section
                title="HLS Streaming URL"
                icon={<Link2 size={15} className="text-red-400" />}
              >
                {movie?.hls_master_url ? (
                  <div className="bg-zinc-900 rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-red-600/10 border border-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Play
                          size={14}
                          className="text-red-400 fill-red-400 ml-0.5"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                          master.m3u8
                        </p>
                        <p className="text-xs text-gray-400 font-mono truncate">
                          {movie.hls_master_url}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            movie.hls_master_url,
                            "HLS Master URL",
                          )
                        }
                        className="px-3 py-1.5 bg-zinc-800 border border-white/5 hover:border-red-500/25 rounded-lg text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-all font-semibold"
                      >
                        <Copy size={12} /> Copy URL
                      </button>
                      <a
                        href={movie.hls_master_url}
                        target="_blank"
                        className="px-3 py-1.5 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 rounded-lg text-xs text-red-400 flex items-center gap-1.5 transition-all font-semibold"
                      >
                        <ExternalLink size={12} /> Open
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-900 rounded-2xl p-5 border border-white/5 flex items-center gap-3">
                    <AlertCircle
                      size={16}
                      className="text-yellow-500 flex-shrink-0"
                    />
                    <p className="text-sm text-gray-500">
                      HLS stream not yet generated. Processing may still be in
                      progress.
                    </p>
                  </div>
                )}
              </Section>

              {/* Images & Documents */}
              <Section
                title="Images & Supporting Documents"
                icon={<FileText size={15} className="text-red-400" />}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <DownloadCard
                    label="Movie Poster"
                    sublabel="Primary promotional art"
                    url={movie?.poster_url}
                    preview
                  />
                  <DownloadCard
                    label="Thumbnail"
                    sublabel="16:9 thumbnail"
                    url={movie?.thumbnail_url}
                    preview
                  />
                  {movie?.subtitle_url && (
                    <DownloadCard
                      label="Subtitle File"
                      sublabel="SRT / VTT captions"
                      url={movie.subtitle_url}
                    />
                  )}
                  {movie?.agreement_document_url && (
                    <DownloadCard
                      label="Agreement / Contract"
                      sublabel="Signed legal document"
                      url={movie.agreement_document_url}
                    />
                  )}
                </div>
              </Section>
            </div>
          )}

          {/* ─── ADMIN CONTROLS TAB ─── */}
          {activeTab === "admin" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
              {/* Status control */}
              <Section
                title="Submission Status Control"
                icon={<Tag size={15} className="text-red-400" />}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xs text-gray-600">Current:</span>
                  <StatusBadge status={movie?.status} />
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        status: "Approved",
                        notes: adminNotes,
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="w-full px-4 py-4 bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15 rounded-xl font-bold flex items-center gap-3 transition-all text-sm disabled:opacity-50"
                  >
                    <CheckCircle2 size={18} />
                    <div className="text-left">
                      <p className="leading-tight">Approve Submission</p>
                      <p className="text-xs font-normal text-emerald-700 mt-0.5">
                        Mark this film as approved for streaming
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        status: "Pending Review",
                        notes: adminNotes,
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="w-full px-4 py-4 bg-yellow-500/8 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/15 rounded-xl font-bold flex items-center gap-3 transition-all text-sm disabled:opacity-50"
                  >
                    <RefreshCw size={18} />
                    <div className="text-left">
                      <p className="leading-tight">Set to Pending Review</p>
                      <p className="text-xs font-normal text-yellow-700 mt-0.5">
                        Move back to the review queue
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        status: "Rejected",
                        notes: adminNotes,
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="w-full px-4 py-4 bg-red-500/8 border border-red-500/20 text-red-400 hover:bg-red-500/15 rounded-xl font-bold flex items-center gap-3 transition-all text-sm disabled:opacity-50"
                  >
                    <XCircle size={18} />
                    <div className="text-left">
                      <p className="leading-tight">Reject Submission</p>
                      <p className="text-xs font-normal text-red-700 mt-0.5">
                        Reject and notify the producer
                      </p>
                    </div>
                  </button>
                </div>
              </Section>

              {/* Admin Notes */}
              <div className="space-y-4">
                <Section
                  title="Internal Admin Notes"
                  icon={<MessageSquare size={15} className="text-red-400" />}
                >
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={7}
                    placeholder="Add internal notes about content quality, rights review, technical issues, or reasons for approval/rejection…"
                    className="w-full bg-black border border-white/8 rounded-xl p-4 text-sm text-gray-300 placeholder:text-gray-700 outline-none focus:border-red-500/40 transition-colors resize-none mb-3 leading-relaxed"
                  />
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        status: movie?.status,
                        notes: adminNotes,
                      })
                    }
                    disabled={updateMutation.isPending}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {updateMutation.isPending ? (
                      <div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                    ) : (
                      <MessageSquare size={15} />
                    )}
                    Save Notes
                  </button>
                </Section>

                {/* Submission metadata */}
                <Section
                  title="Submission Metadata"
                  icon={<Info size={15} className="text-red-400" />}
                >
                  <MetaRow
                    label="Reference"
                    value={movie?.submission_reference}
                    icon={<Hash size={11} />}
                    copyable
                    onCopy={() =>
                      copyToClipboard(movie?.submission_reference, "Reference")
                    }
                  />
                  <MetaRow
                    label="Submitted"
                    value={
                      movie?.created_at &&
                      format(new Date(movie.created_at), "MMM dd, yyyy HH:mm")
                    }
                    icon={<Calendar size={11} />}
                  />
                  <MetaRow
                    label="Updated"
                    value={
                      movie?.updated_at &&
                      format(new Date(movie.updated_at), "MMM dd, yyyy HH:mm")
                    }
                    icon={<RefreshCw size={11} />}
                  />
                </Section>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ── Sub-components ── */

function Section({ title, icon, children }) {
  return (
    <div className="bg-zinc-950 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        {icon}
        <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function MetaRow({ label, value, icon, copyable, onCopy }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 gap-3">
      <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        {typeof value === "string" || typeof value === "number" ? (
          <span className="text-sm text-gray-300 text-right truncate">
            {value || "—"}
          </span>
        ) : (
          value || <span className="text-sm text-gray-700">—</span>
        )}
        {copyable && onCopy && (
          <button
            onClick={onCopy}
            className="text-gray-700 hover:text-red-400 transition-colors flex-shrink-0"
          >
            <Copy size={11} />
          </button>
        )}
      </div>
    </div>
  );
}

function CrewCard({ role, name }) {
  return (
    <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 hover:border-red-500/15 transition-colors">
      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1.5">
        {role}
      </p>
      <p className="font-semibold text-gray-200 text-sm leading-snug">
        {name || "—"}
      </p>
    </div>
  );
}

function DownloadCard({ label, sublabel, url, highlight, preview }) {
  if (!url) {
    return (
      <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 opacity-40">
        <p className="text-sm font-bold text-gray-600">{label}</p>
        <p className="text-xs text-gray-700 mt-0.5">Not available</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all hover:-translate-y-0.5 ${highlight ? "border-red-500/20 bg-red-600/5 hover:border-red-500/40" : "border-white/5 bg-zinc-900 hover:border-white/10"}`}
    >
      {preview && (
        <div className="w-full h-24 bg-zinc-800 overflow-hidden">
          <img src={url} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`text-sm font-bold truncate ${highlight ? "text-red-300" : "text-gray-200"}`}
          >
            {label}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">{sublabel}</p>
        </div>
        <a
          href={url}
          target="_blank"
          download
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black transition-all ${
            highlight
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-zinc-800 hover:bg-zinc-700 text-gray-300 border border-white/5 hover:border-red-500/20"
          }`}
        >
          <Download size={12} /> Download
        </a>
      </div>
    </div>
  );
}

function QualityCard({ quality, label, bitrate, url }) {
  const available = Boolean(url);
  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-4 transition-all ${available ? "border-white/8 bg-zinc-900 hover:border-red-500/20" : "border-white/5 bg-zinc-900/40 opacity-50"}`}
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-2xl font-black">{quality}</span>
          <span
            className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider ${available ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-800 text-gray-600 border-white/5"}`}
          >
            {available ? "Ready" : "Pending"}
          </span>
        </div>
        <p className="text-xs text-gray-600">
          {label} · {bitrate}
        </p>
      </div>
      {available ? (
        <a
          href={url}
          target="_blank"
          download
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all"
        >
          <Download size={13} /> Download {quality}
        </a>
      ) : (
        <div className="w-full py-2.5 bg-zinc-800 border border-white/5 rounded-lg text-xs text-gray-700 font-bold text-center flex items-center justify-center gap-2">
          <AlertCircle size={12} /> Not Available
        </div>
      )}
    </div>
  );
}

function ZapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#f87171"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
