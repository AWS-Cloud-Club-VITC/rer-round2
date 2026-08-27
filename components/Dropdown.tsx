"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "./Icons";

export type Option = { value: string; label: string };

export function Dropdown({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-surface px-3.5 text-sm font-medium text-ink transition-all duration-200 hover:border-brand ${
          open ? "border-brand ring-4 ring-[var(--brand-ring)]" : "border-line"
        }`}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDown
          width={16}
          height={16}
          className={`shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="animate-pop-in absolute left-0 right-0 top-[calc(100%+6px)] z-40 max-h-64 overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-lift"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 ${
                    selected
                      ? "bg-brand-soft font-semibold text-brand"
                      : "text-ink-soft hover:bg-surface-2"
                  }`}
                >
                  {option.label}
                  {selected && <Check width={15} height={15} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
