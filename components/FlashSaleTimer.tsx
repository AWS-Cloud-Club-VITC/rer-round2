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
      className="border-y border-brand-strong/15 bg-brand text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-5 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="flex items-center gap-3 text-center md:text-left">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15">
            <Sparkle width={19} height={19} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
              Today only
            </p>
            <p className="mt-0.5 text-base font-semibold sm:text-lg">
              Flash sale: save 20% on low-waste essentials
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2" aria-label="Sale ends at midnight">
          {units.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-2">
              <div className="min-w-12 rounded-lg border border-white/20 bg-black/10 px-2.5 py-1.5 text-center shadow-sm">
                <span className="block text-lg font-bold leading-none tabular-nums">
                  {unit.value}
                </span>
                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/65">
                  {unit.label}
                </span>
              </div>
              {index < units.length - 1 && (
                <span aria-hidden className="text-lg font-bold text-white/70">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <a
          href="#shop"
          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-brand transition-transform hover:scale-[1.03] active:scale-95"
        >
          Shop the sale
          <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
