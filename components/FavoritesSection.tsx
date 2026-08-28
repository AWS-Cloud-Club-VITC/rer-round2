"use client";

import { useMemo } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { Heart } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useStore } from "./store";

export function FavoritesSection({
  onOpenProduct,
}: {
  onOpenProduct: (product: Product) => void;
}) {
  const { favorites } = useStore();
  const savedProducts = useMemo(
    () =>
      favorites
        .map((id) => PRODUCTS.find((product) => product.id === id))
        .filter((product): product is Product => Boolean(product)),
    [favorites],
  );

  // The section is only shown after the shopper saves something, keeping the
  // browse-first homepage clean while still providing a clear saved-items view.
  if (savedProducts.length === 0) return null;

  return (
    <section
      id="favourites"
      aria-labelledby="favourites-heading"
      className="scroll-mt-24 border-t border-line bg-brand-soft/35 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <Heart filled width={13} height={13} />
              Your saved list
            </span>
            <h2
              id="favourites-heading"
              className="display mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink"
            >
              Favourites worth coming back to
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Keep your sustainable swaps in one place. Remove a heart at any
              time to update this list.
            </p>
          </div>

          <a
            href="#shop"
            className="shrink-0 self-start rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:border-brand hover:text-brand sm:self-auto"
          >
            Continue shopping
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
