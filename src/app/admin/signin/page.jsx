"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Play,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import useAuth from "@/utils/useAuth";
import { toast, Toaster } from "sonner";

export default function AdminSigninPage() {
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { signInWithCredentials } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
        callbackUrl: "/admin/dashboard",
        redirect: true,
      });
    } catch (err) {
      console.error(err);
      toast.error("Invalid admin credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-700/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-600/40 group-hover:scale-105 transition-transform">
              <Play size={30} className="fill-white text-white ml-1" />
            </div>
            <span className="text-2xl font-black">
              Go<span className="text-red-500">Premiere</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold mt-6 mb-1">Admin Portal</h1>
          <p className="text-gray-500 text-sm">
            Sign in to manage GoPremiere submissions
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-zinc-950 border border-white/8 rounded-3xl p-8 shadow-2xl space-y-5"
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={17}
              />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full bg-black border ${errors.email ? "border-red-500" : "border-white/10"} rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-gray-700 outline-none focus:border-red-500 transition-colors`}
                placeholder="admin@gopremiere.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={17}
              />
              <input
                type={showPw ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-black border ${errors.password ? "border-red-500" : "border-white/10"} rounded-2xl pl-11 pr-12 py-4 text-white placeholder:text-gray-700 outline-none focus:border-red-500 transition-colors`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
              >
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-black text-lg transition-all hover:shadow-xl hover:shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-gray-400 transition-colors"
            >
              ← Back to Public Site
            </a>
          </div>
        </form>

        <p className="text-center text-xs text-gray-700 mt-6">
          GoPremiere Admin Access Only • Unauthorized access is prohibited
        </p>
      </div>
    </div>
  );
}
