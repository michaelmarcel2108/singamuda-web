"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message === "Invalid login credentials" ? "Email atau kata sandi salah." : error.message);
      setIsLoading(false);
    } else if (data.session) {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 font-sans relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-stone-800/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative w-full max-w-md p-8 md:p-10 bg-stone-900/60 backdrop-blur-xl rounded-3xl border border-stone-800 shadow-2xl z-10">
        
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-stone-800 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 group-hover:border-amber-500/50 transition-all duration-300">
                <span className="text-amber-500 font-bold text-xl">S</span>
              </div>
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-600 tracking-wider">
                SINGAMUDA
              </h1>
            </div>
          </Link>
          <p className="text-stone-400 mt-2 font-medium">Masuk ke panel admin</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 rounded-xl text-red-200 text-sm animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-stone-300 group-focus-within:text-amber-500 transition-colors">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 group-focus-within:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-stone-950/50 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                placeholder="admin@singamuda.com"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-sm font-semibold text-stone-300 group-focus-within:text-amber-500 transition-colors">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 group-focus-within:text-amber-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-stone-950/50 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_25px_rgba(217,119,6,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-800/60 text-center">
          <Link href="/" className="text-sm text-stone-500 hover:text-amber-500 transition-colors">
            &larr; Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}
