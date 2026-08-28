"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Close, Leaf } from "./Icons";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";

const RATINGS_KEY = "ecomart-product-ratings";

function RatingDialog() {
  const { purchasedItems, closeRating, pushToast } = useStore();
  const closeButton = useRef<HTMLButtonElement>(null);
  const initialRatings = useMemo(
    () => Object.fromEntries(purchasedItems.map(({ product }) => [product.id, 4])),
    [purchasedItems],
  );
  const [ratings, setRatings] = useState<Record<string, number>>(initialRatings);

  useEffect(() => {
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeRating();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [closeRating]);

  function submitRatings() {
    try {
      const previous = JSON.parse(
        window.localStorage.getItem(RATINGS_KEY) ?? "{}",
      ) as Record<string, number>;
      window.localStorage.setItem(
        RATINGS_KEY,
        JSON.stringify({ ...previous, ...ratings }),
      );
    } catch {
      /* Feedback still succeeds in memory if storage is unavailable. */
    }
    closeRating();
    pushToast({
      title: "Thanks for your feedback!",
      detail: "Your ratings help other conscious shoppers.",
      icon: "leaf",
    });
  }

  return (
    <div
      className="fixed inset-0 z-[85] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeRating();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-title"
        aria-describedby="rating-description"
        className="animate-pop-in flex max-h-[min(42rem,calc(100dvh-2rem))] w-full max-w-xl flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-pop"
      >
        <header className="flex items-start gap-4 border-b border-line px-5 py-5 sm:px-6">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
            <Leaf filled width={20} height={20} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Order complete
            </p>
            <h2 id="rating-title" className="mt-1 text-xl font-semibold text-ink">
              How was your purchase?
            </h2>
            <p id="rating-description" className="mt-1 text-sm text-muted">
              Rate the products you just purchased.
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
              closeRating();
            }}
            onClick={(event) => {
              // Keyboard activation fires click without pointerdown.
              event.stopPropagation();
              closeRating();
            }}
            aria-label="Close rating popup"
            className="relative z-10 ml-auto grid h-10 w-10 shrink-0 touch-manipulation place-items-center rounded-full border border-transparent text-muted transition-colors hover:border-line hover:bg-surface-2 hover:text-ink active:scale-90"
          >
            <Close width={17} height={17} />
          </button>
        </header>

        <div className="min-h-0 flex-1 divide-y divide-[var(--line)] overflow-y-auto px-5 sm:px-6">
          {purchasedItems.map(({ product }) => {
            const rating = ratings[product.id] ?? 4;
            return (
              <div key={product.id} className="flex gap-4 py-5">
                <div className={`tint-${product.tint} art-panel relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-line`}>
                  <ProductArt art={product.art} className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="truncate text-sm font-semibold text-ink">{product.name}</h3>
                    <span className="shrink-0 text-[12px] font-bold tabular-nums text-brand">{rating} / 5</span>
                  </div>
                  <label className="mt-2 block">
                    <span className="sr-only">Your rating for {product.name}: {rating} out of 5</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={rating}
                      onChange={(event) => setRatings((current) => ({ ...current, [product.id]: Number(event.target.value) }))}
                      aria-label={`Rate ${product.name}`}
                      className="eco-range"
                      style={{ "--fill": `${((rating - 1) / 4) * 100}%` } as React.CSSProperties}
                    />
                  </label>
                  <div className="flex justify-between text-[10px] font-semibold text-muted"><span>1</span><span>Your rating: {rating} / 5</span><span>5</span></div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="border-t border-line bg-surface-2/50 px-5 py-4 sm:px-6">
          <button type="button" onClick={submitRatings} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-all hover:bg-brand-strong active:scale-[0.98]">
            <Check width={16} height={16} />
            Submit {purchasedItems.length === 1 ? "Rating" : "Ratings"}
          </button>
          <p className="mt-2 text-center text-[11px] text-muted">Optional — close anytime to skip.</p>
        </footer>
      </section>
    </div>
  );
}

export function RatingModal() {
  const { purchasedItems, ratingOpen } = useStore();
  if (!ratingOpen || purchasedItems.length === 0) return null;

  // Mount a fresh dialog for every checkout so repeated purchases never
  // inherit slider state from an earlier order.
  return <RatingDialog />;
}
