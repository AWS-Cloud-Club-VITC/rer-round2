"use client";

import { useEffect, useState } from "react";
import { Cart, Check, Close, Heart, Leaf, Minus, Plus, Recycle } from "./Icons";
import { LeafRow } from "./EcoRating";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";
import type { Product } from "@/data/products";

const TABS = ["Overview", "Materials", "Environmental Impact"] as const;
type Tab = (typeof TABS)[number];

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  // The parent keys this component on the product id, so opening a different
  // product remounts it and these initial values apply afresh — no reset effect.
  const [tab, setTab] = useState<Tab>("Overview");
  const [qty, setQty] = useState(1);

  // Escape to close, and lock background scroll while open.
  useEffect(() => {
    if (!product) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [product, onClose]);

  if (!product) return null;

  const favorite = isFavorite(product.id);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Backdrop — clicking it closes */}
      <button
        type="button"
        aria-label="Close product details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
      />

      <div className="animate-pop-in relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-pop sm:max-h-[88vh] sm:rounded-3xl">
        <button
          // Takes focus on mount so Escape and Tab work immediately.
          autoFocus
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/90 text-ink-soft backdrop-blur transition-all duration-200 hover:border-brand hover:text-brand active:scale-90"
        >
          <Close width={18} height={18} />
        </button>

        <div className="grid min-h-0 flex-1 overflow-y-auto sm:grid-cols-2 sm:overflow-hidden">
          {/* Artwork */}
          <div
            className={`tint-${product.tint} art-panel relative aspect-4/3 shrink-0 sm:aspect-auto sm:h-full`}
          >
            <div aria-hidden className="absolute inset-0 grid place-items-center">
              <div className="h-[70%] w-[70%] rounded-full border border-[var(--t3)]/15" />
              <div className="absolute h-[46%] w-[46%] rounded-full border border-[var(--t3)]/20" />
            </div>
            <ProductArt
              art={product.art}
              className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-canvas">
                {product.badge}
              </span>
            )}
          </div>

          {/* Detail column */}
          <div className="flex min-h-0 flex-col sm:overflow-y-auto">
            <div className="p-5 pb-0 sm:p-7 sm:pb-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {product.category}
              </p>
              <h2
                id="product-modal-title"
                className="mt-1.5 pr-10 text-2xl font-semibold tracking-tight text-ink"
              >
                {product.name}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-2xl font-semibold tabular-nums text-ink">
                  ${product.price.toFixed(2)}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5">
                  <LeafRow eco={product.eco} size={13} />
                  <span className="text-[12px] font-semibold text-brand">
                    {product.eco}.0 eco score
                  </span>
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 px-5 sm:px-7">
              <div
                role="tablist"
                aria-label="Product details"
                className="flex gap-1 rounded-xl bg-surface-2 p-1"
              >
                {TABS.map((t) => {
                  const active = tab === t;
                  return (
                    <button
                      key={t}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setTab(t)}
                      className={`flex-1 rounded-lg px-2 py-2 text-[12px] font-semibold transition-all duration-200 sm:text-[13px] ${
                        active
                          ? "bg-surface text-brand shadow-sm"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {t === "Environmental Impact" ? "Impact" : t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab panels */}
            <div
              role="tabpanel"
              className="animate-fade-up flex-1 px-5 py-5 sm:px-7"
              key={tab}
            >
              {tab === "Overview" && (
                <div>
                  <p className="text-[14px] leading-relaxed text-ink-soft">
                    {product.description}
                  </p>
                  <ul className="mt-4 grid gap-2">
                    {[
                      "Ships plastic-free in recycled kraft",
                      "Carbon-neutral delivery included",
                      "30-day returns, 2-year repair cover",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2 text-[13px] text-muted"
                      >
                        <Check
                          width={15}
                          height={15}
                          className="mt-0.5 shrink-0 text-brand"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tab === "Materials" && (
                <ul className="grid gap-2.5">
                  {product.materials.map((m) => (
                    <li
                      key={m}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3.5 py-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                        <Leaf width={16} height={16} />
                      </span>
                      <span className="text-[13.5px] font-medium text-ink">
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "Environmental Impact" && (
                <div>
                  <dl className="grid grid-cols-3 gap-2.5">
                    {[
                      { k: "CO₂ saved", v: product.impact.co2 },
                      { k: "Replaces", v: product.impact.plastic },
                      { k: "Water saved", v: product.impact.water },
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="rounded-xl border border-line bg-surface-2/60 p-3 text-center"
                      >
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                          {row.k}
                        </dt>
                        <dd className="mt-1.5 text-[15px] font-semibold leading-tight text-ink">
                          {row.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 flex items-start gap-2.5 rounded-xl bg-brand-soft p-3.5 text-[13px] leading-relaxed text-ink-soft">
                    <Recycle
                      width={17}
                      height={17}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    {product.impact.note}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 mt-auto border-t border-line bg-surface/95 p-5 backdrop-blur sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 items-center gap-1 rounded-full border border-line bg-surface px-1.5">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 active:scale-90"
                  >
                    <Minus width={16} height={16} />
                  </button>
                  <span
                    aria-live="polite"
                    className="w-6 text-center text-sm font-semibold tabular-nums text-ink"
                  >
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 active:scale-90"
                  >
                    <Plus width={16} height={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, qty);
                    onClose();
                  }}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-ring)] transition-all duration-200 hover:bg-brand-strong active:scale-[0.97]"
                >
                  <Cart width={17} height={17} />
                  Add to Cart · ${(product.price * qty).toFixed(2)}
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  aria-pressed={favorite}
                  aria-label={
                    favorite ? "Remove from favourites" : "Save to favourites"
                  }
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-200 active:scale-90 ${
                    favorite
                      ? "border-transparent bg-rose-500 text-white"
                      : "border-line bg-surface text-muted hover:border-rose-400 hover:text-rose-500"
                  }`}
                >
                  <Heart filled={favorite} width={19} height={19} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
