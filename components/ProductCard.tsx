"use client";

import { Cart, Heart } from "./Icons";
import { EcoBadge } from "./EcoRating";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";
import type { Product } from "@/data/products";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  return (
    <article
      className={`tint-${product.tint} group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-lift focus-within:-translate-y-1.5 focus-within:shadow-lift`}
    >
      {/* Artwork */}
      <div className="art-panel relative aspect-4/3 overflow-hidden">
        <ProductArt
          art={product.art}
          className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
        />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-canvas">
            {product.badge}
          </span>
        )}

        {/* Favourite */}
        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remove ${product.name} from favourites`
              : `Save ${product.name} to favourites`
          }
          className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-all duration-200 active:scale-90 ${
            favorite
              ? "border-transparent bg-rose-500 text-white shadow-md"
              : "border-line bg-surface/85 text-muted hover:border-rose-400 hover:text-rose-500"
          }`}
        >
          <Heart
            filled={favorite}
            width={17}
            height={17}
            className={favorite ? "animate-bump" : ""}
          />
        </button>

        {/* Eco badge — hover it for the score breakdown */}
        <div className="absolute bottom-3 left-3 z-10">
          <EcoBadge product={product} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {product.category}
        </p>

        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">
          {/* Stretched target makes the whole card clickable without nesting buttons */}
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="text-left after:absolute after:inset-0 after:content-[''] hover:text-brand focus-visible:outline-none"
          >
            {product.name}
          </button>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <span className="text-lg font-semibold tabular-nums text-ink">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="relative z-10 inline-flex h-10 items-center gap-1.5 rounded-full bg-surface-2 px-4 text-[13px] font-semibold text-ink transition-all duration-200 hover:bg-brand hover:text-white active:scale-95"
          >
            <Cart width={15} height={15} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
