"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { ArrowRight, Cart, Leaf, Sparkle } from "./Icons";
import { useStore } from "./store";

const ROUTINES = [
  { value: "kitchen", label: "Kitchen reset", detail: "Refills, wraps and less single-use plastic." },
  { value: "daily", label: "Daily rituals", detail: "Small swaps for the bathroom and commute." },
  { value: "outdoors", label: "Out and about", detail: "Useful low-impact gear for every day." },
] as const;

const PRIORITIES = [
  { value: "plastic", label: "Cut plastic", detail: "Replace the disposables first." },
  { value: "longevity", label: "Buy for keeps", detail: "Choose the long-lasting option." },
  { value: "impact", label: "Maximise impact", detail: "Focus on the highest savings." },
] as const;

type Routine = (typeof ROUTINES)[number]["value"];
type Priority = (typeof PRIORITIES)[number]["value"];

const RECOMMENDATIONS: Record<Routine, Record<Priority, string[]>> = {
  kitchen: {
    plastic: ["food-wraps", "cleaning-kit", "cutlery-set"],
    longevity: ["cleaning-kit", "food-wraps", "steel-bottle"],
    impact: ["food-wraps", "cleaning-kit", "bamboo-toothbrush"],
  },
  daily: {
    plastic: ["bamboo-toothbrush", "soap-bar", "steel-bottle"],
    longevity: ["steel-bottle", "cotton-tote", "bamboo-toothbrush"],
    impact: ["steel-bottle", "soap-bar", "bamboo-toothbrush"],
  },
  outdoors: {
    plastic: ["steel-bottle", "cutlery-set", "cotton-tote"],
    longevity: ["ocean-backpack", "solar-lantern", "steel-bottle"],
    impact: ["solar-power-bank", "solar-lantern", "steel-bottle"],
  },
};

export function LowWasteQuiz() {
  const { addToCart, setQuery } = useStore();
  const [step, setStep] = useState(0);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const recommendations = useMemo(() => {
    if (!routine || !priority) return [];
    return RECOMMENDATIONS[routine][priority]
      .map((id) => PRODUCTS.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));
  }, [priority, routine]);

  const reset = () => {
    setRoutine(null);
    setPriority(null);
    setStep(0);
  };

  return (
    <section id="swap-quiz" className="border-t border-line bg-surface-2/45 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-line bg-surface p-5 shadow-card sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                <Sparkle width={13} height={13} />
                Personalised picks
              </span>
              <h2 className="display mt-3 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink">
                Find your next low-waste swap
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                Two quick choices, then we&apos;ll build a useful starting list around the habits you already have.
              </p>
            </div>

            <div className="mt-8 flex gap-2" aria-label={`Quiz step ${Math.min(step + 1, 2)} of 2`}>
              {[0, 1].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${item <= step ? "bg-brand" : "bg-surface-3"}`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-brand-soft/60 p-5 sm:p-7">
            {step === 0 && (
              <div className="animate-pop-in">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">01 · Start with your routine</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">Where would you like to waste less?</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {ROUTINES.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => { setRoutine(option.value); setStep(1); }}
                      className="rounded-2xl border border-line bg-surface p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-card active:scale-[0.98]"
                    >
                      <Leaf width={18} height={18} className="text-brand" />
                      <span className="mt-4 block text-sm font-semibold text-ink">{option.label}</span>
                      <span className="mt-1 block text-[12px] leading-snug text-muted">{option.detail}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="animate-pop-in">
                <button type="button" onClick={() => setStep(0)} className="text-[12px] font-semibold text-brand hover:text-brand-strong">← Back</button>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">02 · Choose a priority</p>
                <h3 className="mt-2 text-xl font-semibold text-ink">What matters most to you?</h3>
                <div className="mt-5 grid gap-3">
                  {PRIORITIES.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => { setPriority(option.value); setStep(2); }}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 text-left transition-all hover:border-brand hover:shadow-card active:scale-[0.98]"
                    >
                      <span><span className="block text-sm font-semibold text-ink">{option.label}</span><span className="mt-1 block text-[12px] text-muted">{option.detail}</span></span>
                      <ArrowRight width={17} height={17} className="shrink-0 text-brand" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-pop-in">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Your three-swap shortlist</p><h3 className="mt-2 text-xl font-semibold text-ink">A practical place to start</h3></div><button type="button" onClick={reset} className="text-[12px] font-semibold text-brand hover:text-brand-strong">Start again</button></div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {recommendations.map((product) => (
                    <article key={product.id} className="rounded-2xl border border-line bg-surface p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{product.category}</p>
                      <h4 className="mt-1 text-[13px] font-semibold leading-snug text-ink">{product.name}</h4>
                      <p className="mt-2 text-sm font-bold tabular-nums text-brand">${product.price.toFixed(2)}</p>
                      <button type="button" onClick={() => addToCart(product)} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand px-3 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-brand-strong"><Cart width={14} height={14} />Add</button>
                    </article>
                  ))}
                </div>
                <button type="button" onClick={() => { setQuery(""); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-5 text-[13px] font-semibold text-brand hover:text-brand-strong">Browse every sustainable swap →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
