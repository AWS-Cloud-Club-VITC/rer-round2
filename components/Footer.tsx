"use client";

import { useState } from "react";
import { ArrowRight, Check, Leaf, Recycle, Truck } from "./Icons";
import { useStore } from "./store";

const COLUMNS = [
  {
    title: "Shop",
    links: ["All products", "Home & Kitchen", "Personal Care", "Fashion", "Electronics"],
  },
  {
    title: "Company",
    links: ["Our story", "Eco rating method", "Impact report", "Partners", "Careers"],
  },
  {
    title: "Support",
    links: ["Help centre", "Shipping & returns", "Repair programme", "Contact us"],
  },
];

const PROMISES = [
  { icon: Recycle, label: "Plastic-free packaging" },
  { icon: Truck, label: "Carbon-neutral delivery" },
  { icon: Leaf, label: "Verified eco scoring" },
];

export function Footer() {
  const { pushToast } = useStore();
  const [email, setEmail] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSignedUp(true);
    setEmail("");
    pushToast({
      title: "You're on the list 🌿",
      detail: "Monthly impact notes, no spam.",
      icon: "leaf",
    });
    setTimeout(() => setSignedUp(false), 3000);
  }

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 rounded-[2rem] border border-line bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="display text-2xl font-semibold text-ink sm:text-[28px]">
              One small swap a month
            </h2>
            <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">
              A short letter with one product worth switching to, plus what the
              community saved that month. Unsubscribe in a click.
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-full border border-line bg-canvas px-5 text-sm text-ink placeholder:text-muted transition-all duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-[var(--brand-ring)]"
            />
            <button
              type="submit"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-strong active:scale-95"
            >
              {signedUp ? (
                <>
                  <Check width={16} height={16} />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight
                    width={16}
                    height={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white">
                <Leaf filled width={19} height={19} />
              </span>
              <span className="text-[19px] font-semibold tracking-tight text-ink">
                Eco<span className="text-brand">Mart</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted">
              A marketplace for everyday products that are genuinely better for
              the planet — scored, verified and shipped without plastic.
            </p>
            <ul className="mt-5 grid gap-2">
              {PROMISES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[12.5px] font-medium text-muted"
                >
                  <Icon width={15} height={15} className="text-brand" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#shop"
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors duration-200 hover:text-brand"
                    >
                      <span className="h-px w-0 bg-brand transition-all duration-200 group-hover:w-3" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted">
            © 2026 EcoMart. A fictional storefront built for SDG 12 —
            Responsible Consumption and Production.
          </p>
          <p className="flex items-center gap-1.5 text-[12.5px] font-medium text-muted">
            <Leaf filled width={14} height={14} className="text-brand" />
            Certified climate-neutral since 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
