"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkle } from "./Icons";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(deadline: number): TimeLeft {
  const remaining = Math.max(0, deadline - Date.now());

  return {
    hours: Math.floor(remaining / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1_000),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const deadline = new Date();
    deadline.setHours(23, 59, 59, 999);

    const update = () => setTimeLeft(getTimeLeft(deadline.getTime()));
    update();
    const interval = window.setInterval(update, 1_000);

    return () => window.clearInterval(interval);
  }, []);

  const units = [
    { label: "Hours", value: timeLeft ? pad(timeLeft.hours) : "--" },
    { label: "Mins", value: timeLeft ? pad(timeLeft.minutes) : "--" },
    { label: "Secs", value: timeLeft ? pad(timeLeft.seconds) : "--" },
  ];

  return (
    <section
      aria-label="Flash sale"
      className="border-y border-[#25352d] bg-[#18221d] text-[#edf3ee]"
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-[#5c7165] bg-[#223128] text-[#b4d5bd] shadow-inner">
            <Sparkle width={17} height={17} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ab5a0]">
              Platform 12 · departure today
            </p>
            <p className="mt-1 truncate text-sm font-semibold tracking-tight text-white sm:text-base">
              LOW-WASTE EXPRESS <span className="mx-1 text-[#729a7c]">→</span> 20% OFF ESSENTIALS
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 font-mono" aria-label="Sale ends at midnight">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-1.5">
              <div className="min-w-13 border border-[#465a4d] bg-[#0d130f] px-2 py-1.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span key={unit.value} className="animate-pop-in block text-lg font-bold leading-none tabular-nums tracking-[0.12em] text-[#e5f2e7]">
                  {unit.value}
                </span>
                <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.12em] text-[#829987]">
                  {unit.label}
                </span>
              </div>
              {index < units.length - 1 && (
                <span aria-hidden className="-mt-3 text-base font-bold text-[#66806d]">
                  •
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href="#shop"
          className="group justify-self-center border border-[#87ac90] bg-[#dceadd] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#193720] transition-colors hover:bg-white md:justify-self-auto"
        >
          Board now
          <ArrowRight width={14} height={14} className="inline-block transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
