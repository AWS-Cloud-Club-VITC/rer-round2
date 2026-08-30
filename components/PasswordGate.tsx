"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowRight } from "./Icons";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if authenticated in current browser session
    const auth = sessionStorage.getItem("ecomart_site_access");
    if (auth === "granted") {
      setIsAuthenticated(true);
    }
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      sessionStorage.setItem("ecomart_site_access", "granted");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Blank screen state while checking sessionStorage (prevents flash of content)
  if (!isLoaded) {
    return <div className="min-h-dvh bg-canvas" />;
  }

  if (!isAuthenticated) {
    return (
      <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-canvas px-4 py-16 text-ink">
        {/* Subtle background glow matching theme */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="animate-drift absolute -left-28 -top-28 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
          <div className="animate-drift absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
        </div>

        <section className="relative z-10 w-full max-w-md rounded-[2rem] border border-line bg-surface/90 p-8 shadow-lift backdrop-blur sm:p-10 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-brand mb-6">
            <Lock width={28} height={28} />
          </div>

          <h1 className="text-2xl font-bold text-ink sm:text-3xl">Protected Access</h1>
          <p className="mt-2 text-sm text-muted">
            Please enter the password to view the website.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 text-left">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                autoFocus
                className={`w-full rounded-2xl border ${
                  error ? "border-red-500 ring-2 ring-red-500/20" : "border-line focus:border-brand focus:ring-2 focus:ring-brand/20"
                } bg-canvas px-4 py-3.5 pr-11 text-base text-ink outline-none transition-all placeholder:text-muted`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff width={18} height={18} /> : <Eye width={18} height={18} />}
              </button>
            </div>

            {error && (
              <p className="mt-2.5 text-xs font-semibold text-red-500 text-center animate-shake">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="group mt-5 flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-ring)] transition-all hover:bg-brand-strong active:scale-[0.98]"
            >
              Enter Website
              <ArrowRight className="transition-transform group-hover:translate-x-1" width={18} height={18} />
            </button>
          </form>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
