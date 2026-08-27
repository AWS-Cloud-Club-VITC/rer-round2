"use client";

import { useEffect, useRef, useState } from "react";
import { IMPACT_PILLARS, IMPACT_STATS } from "@/data/content";
import { Leaf, Recycle, Sparkle } from "./Icons";

/** Counts from 0 to `target` once the section scrolls into view. */
function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Reduced motion collapses the duration so the very first frame lands on
    // the final value, keeping every setState inside the rAF callback.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 0 : duration;

    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = ms <= 0 ? 1 : Math.min(1, (now - t0) / ms);
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}

function StatCard({
  stat,
  active,
  index,
}: {
  stat: (typeof IMPACT_STATS)[number];
  active: boolean;
  index: number;
}) {
  const value = useCountUp(stat.value, active);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6"
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="flex items-baseline gap-1">
        <span className="display text-[clamp(1.9rem,4.5vw,2.6rem)] font-semibold tabular-nums text-ink">
          {value.toLocaleString("en-US")}
        </span>
        <span className="text-lg font-semibold text-brand">{stat.suffix}</span>
      </div>

      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {stat.label}
      </p>

      <span className="mt-4 block h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <span
          className="block h-full rounded-full bg-brand transition-[width] duration-1000 ease-out"
          style={{ width: active ? `${stat.progress}%` : "0%" }}
        />
      </span>

      {/* Revealed on hover — a small reward for lingering */}
      <p className="mt-3 max-h-0 overflow-hidden text-[12px] leading-snug text-muted opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
        {stat.detail}
      </p>
    </div>
  );
}

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [grove, setGrove] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-drift absolute -right-24 top-10 h-96 w-96 rounded-full bg-brand/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          {/* Left column */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Recycle width={13} height={13} />
              Collective impact
            </span>
            <h2 className="display mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink">
              What we&apos;ve saved,
              <br />
              together
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              Every EcoMart order is measured against the conventional product
              it replaced. These are the totals across our community so far this
              year.
            </p>

            {/* Decorative emblem — hidden interaction: it is clickable */}
            <button
              type="button"
              onClick={() => setGrove((v) => !v)}
              aria-expanded={grove}
              aria-label="Reveal the EcoMart grove statistic"
              className="group relative mt-8 grid h-40 w-40 place-items-center rounded-full border border-line bg-surface transition-all duration-500 hover:border-brand hover:shadow-lift active:scale-95"
            >
              <span
                aria-hidden
                className="absolute inset-3 rounded-full border border-dashed border-line-strong transition-transform duration-[3000ms] group-hover:rotate-180"
              />
              <span
                aria-hidden
                className={`absolute inset-8 rounded-full bg-brand-soft transition-transform duration-500 ${
                  grove ? "scale-110" : "group-hover:scale-105"
                }`}
              />
              {grove ? (
                <span className="animate-pop-in relative px-4 text-center">
                  <span className="block text-xl font-semibold tabular-nums text-brand">
                    7,250
                  </span>
                  <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                    trees planted
                  </span>
                </span>
              ) : (
                <Leaf
                  filled
                  width={44}
                  height={44}
                  className="relative text-brand transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
                />
              )}
            </button>
            <p
              className={`mt-3 max-w-[16rem] text-[12px] leading-snug transition-all duration-500 ${
                grove
                  ? "text-brand opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              One order, one tree. Planted across three restoration sites with
              our partners.
            </p>
          </div>

          {/* Stat grid */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {IMPACT_STATS.map((stat, i) => (
                <StatCard
                  key={stat.id}
                  stat={stat}
                  active={active}
                  index={i}
                />
              ))}
            </div>

            {/* Scoring pillars */}
            <div className="mt-4 rounded-3xl border border-line bg-surface p-5 shadow-card sm:p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Sparkle width={15} height={15} className="text-brand" />
                How every product is scored
              </h3>
              <dl className="mt-4 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {IMPACT_PILLARS.map((pillar, i) => (
                  <div key={pillar.label} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-[11px] font-bold text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <dt className="text-[13px] font-semibold text-ink">
                        {pillar.label}
                      </dt>
                      <dd className="mt-0.5 text-[12px] leading-snug text-muted">
                        {pillar.detail}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
