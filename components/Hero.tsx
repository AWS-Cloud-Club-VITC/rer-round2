"use client";

import { ArrowDown, ArrowRight, Leaf, Recycle, Sparkle, Truck } from "./Icons";
import { LeafRow } from "./EcoRating";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";

const TRUST = [
  { icon: Recycle, label: "Plastic-free packaging" },
  { icon: Truck, label: "Carbon-neutral delivery" },
  { icon: Leaf, label: "Verified 5-leaf scoring" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { groveMode } = useStore();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-drift absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" />
        <div className="animate-drift absolute -right-32 top-28 h-[460px] w-[460px] rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-28">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand shadow-sm">
            <Sparkle width={13} height={13} />
            SDG 12 · Responsible Consumption
          </span>

          <h1 className="display mt-6 text-[clamp(2.6rem,7vw,4.6rem)] font-semibold text-ink">
            Shop Better.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Live Sustainably.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-brand/20 sm:h-4"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
            EcoMart is a marketplace for everyday things that happen to be
            better for the planet. Every product is scored out of five leaves on
            carbon, materials, packaging and how long it actually lasts — so you
            can compare at a glance instead of decoding labels.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo("shop")}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-ring)] transition-all duration-200 hover:bg-brand-strong hover:shadow-xl active:scale-[0.97]"
            >
              Explore Products
              <ArrowRight
                width={17}
                height={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("impact")}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-7 text-sm font-semibold text-ink transition-all duration-200 hover:border-brand hover:text-brand active:scale-[0.97]"
            >
              See Our Impact
              <ArrowDown
                width={17}
                height={17}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[13px] font-medium text-muted"
              >
                <Icon width={16} height={16} className="text-brand" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="animate-fade-up relative [animation-delay:120ms]">
          <div className="tint-mint art-panel relative aspect-4/5 max-h-[520px] w-full overflow-hidden rounded-[2rem] border border-line shadow-lift sm:aspect-square lg:aspect-4/5">
            {/* Concentric rings */}
            <div aria-hidden className="absolute inset-0 grid place-items-center">
              <div className="h-[78%] w-[78%] rounded-full border border-[var(--t3)]/15" />
              <div className="absolute h-[56%] w-[56%] rounded-full border border-[var(--t3)]/20" />
              <div className="absolute h-[34%] w-[34%] rounded-full border border-[var(--t3)]/25" />
            </div>

            <ProductArt
              art="bottle"
              className={`absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ${
                groveMode ? "scale-110 -rotate-6" : ""
              }`}
            />

            {/* Floating stat chip */}
            <div className="absolute left-4 top-4 rounded-2xl border border-line bg-surface/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:left-6 sm:top-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                CO₂ saved
              </p>
              <p className="text-lg font-semibold tabular-nums text-ink">
                24,580 kg
              </p>
            </div>

            {/* Floating product chip */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-line bg-surface/92 p-3.5 shadow-card backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    Insulated Steel Bottle
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <LeafRow eco={4} size={12} />
                    <span className="text-[11px] text-muted">
                      replaces 156 bottles
                    </span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-brand px-3 py-1.5 text-sm font-semibold text-white">
                  $24
                </span>
              </div>
            </div>
          </div>

          {/* Offset accent badge */}
          <div className="absolute -left-3 top-1/3 hidden rotate-[-8deg] rounded-2xl border border-line bg-surface px-3 py-2 shadow-card sm:block">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
              <Leaf filled width={13} height={13} className="text-brand" />
              12 verified products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
