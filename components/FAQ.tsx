"use client";

import { useState } from "react";
import { FAQS } from "@/data/content";
import { Leaf, Plus } from "./Icons";

export function FAQ() {
  // Single-open accordion; clicking the open row collapses it.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line bg-surface-2/40 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
            <Leaf width={13} height={13} />
            Good to know
          </span>
          <h2 className="display mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink">
            Sustainability,
            <br />
            explained plainly
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            No vague claims and no green sticker on a bad product. Here is
            exactly how we decide what earns a place on EcoMart.
          </p>

          <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
            <p className="text-[13px] leading-relaxed text-muted">
              Still unsure about something?{" "}
              <span className="font-semibold text-brand">
                hello@ecomart.example
              </span>{" "}
              reaches a real person within a day.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[var(--line)] overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          {FAQS.map((item, i) => {
            const expanded = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center gap-4 px-5 py-4.5 text-left transition-colors duration-200 hover:bg-surface-2/60 sm:px-6 sm:py-5"
                  >
                    <span
                      className={`text-[15px] font-semibold leading-snug transition-colors duration-200 sm:text-base ${
                        expanded ? "text-brand" : "text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        expanded
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-line text-muted"
                      }`}
                    >
                      <Plus width={16} height={16} />
                    </span>
                  </button>
                </h3>

                {/* Grid-rows trick animates to the content's natural height */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`grid transition-all duration-300 ease-out ${
                    expanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pr-12 text-[14px] leading-relaxed text-muted sm:px-6 sm:pb-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
