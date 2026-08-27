"use client";

import { useState } from "react";
import { FEATURED, type Product } from "@/data/products";
import { ArrowRight, Cart, ChevronLeft, ChevronRight, Sparkle } from "./Icons";
import { LeafRow } from "./EcoRating";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";

export function FeaturedCarousel({
  onOpenProduct,
}: {
  onOpenProduct: (p: Product) => void;
}) {
  const { addToCart } = useStore();
  const [index, setIndex] = useState(0);
  const count = FEATURED.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <section
      id="featured"
      aria-roledescription="carousel"
      aria-label="Featured sustainable picks"
      className="border-t border-line bg-surface-2/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Sparkle width={13} height={13} />
              Editor&apos;s selection
            </span>
            <h2 className="display mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink">
              Featured Sustainable Picks
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous featured product"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90"
            >
              <ChevronLeft width={18} height={18} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next featured product"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90"
            >
              <ChevronRight width={18} height={18} />
            </button>
          </div>
        </div>

        {/* Track */}
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {FEATURED.map((product, i) => (
              <div
                key={product.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${product.name}`}
                aria-hidden={i !== index}
                className="grid w-full shrink-0 sm:grid-cols-2"
              >
                <div
                  className={`tint-${product.tint} art-panel relative aspect-16/10 sm:aspect-auto sm:min-h-[340px]`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 grid place-items-center"
                  >
                    <div className="h-[68%] w-[68%] rounded-full border border-[var(--t3)]/15" />
                    <div className="absolute h-[44%] w-[44%] rounded-full border border-[var(--t3)]/20" />
                  </div>
                  <ProductArt
                    art={product.art}
                    className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
                    {product.name}
                  </h3>
                  <div className="mt-3 flex items-center gap-2.5">
                    <LeafRow eco={product.eco} size={14} />
                    <span className="text-[12.5px] font-medium text-muted">
                      {product.eco}.0 eco score
                    </span>
                  </div>
                  <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted">
                    {product.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-semibold tabular-nums text-ink">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => addToCart(product)}
                      className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-brand-strong active:scale-95"
                    >
                      <Cart width={16} height={16} />
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => onOpenProduct(product)}
                      className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-5 text-[13px] font-semibold text-ink transition-all duration-200 hover:border-brand hover:text-brand active:scale-95"
                    >
                      Details
                      <ArrowRight
                        width={15}
                        height={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {FEATURED.map((product, i) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${product.name}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-brand"
                  : "w-2 bg-line-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
