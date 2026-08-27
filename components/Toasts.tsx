"use client";

import { Cart, Check, Close, Heart, Leaf } from "./Icons";
import { useStore } from "./store";

const ICONS = {
  cart: Cart,
  heart: Heart,
  "heart-off": Heart,
  leaf: Leaf,
  check: Check,
} as const;

export function Toasts() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      // Bottom-left on desktop so the stack never covers the cart drawer,
      // which slides in from the right.
      className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-2 sm:bottom-6 sm:left-6 sm:translate-x-0"
    >
      {toasts.map((toast) => {
        const Icon = ICONS[(toast.icon ?? "check") as keyof typeof ICONS] ?? Check;
        return (
          <div
            key={toast.id}
            className="animate-toast-in pointer-events-auto flex items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-lift"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon width={17} height={17} />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[13.5px] font-semibold leading-snug text-ink">
                {toast.title}
              </p>
              {toast.detail && (
                <p className="mt-0.5 text-[12px] leading-snug text-muted">
                  {toast.detail}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <Close width={14} height={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
