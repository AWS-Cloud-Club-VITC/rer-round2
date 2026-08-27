"use client";

import { useMemo, useState } from "react";
import {
  CATEGORIES,
  ECO_FILTERS,
  MAX_PRICE,
  PRODUCTS,
  SORT_OPTIONS,
  type Product,
  type SortValue,
} from "@/data/products";
import { Dropdown } from "./Dropdown";
import { Close, Search, Sliders } from "./Icons";
import { ProductCard } from "./ProductCard";
import { useStore } from "./store";

export function ProductSection({
  onOpenProduct,
}: {
  onOpenProduct: (p: Product) => void;
}) {
  const { query, setQuery } = useStore();

  const [category, setCategory] = useState<string>("All");
  const [minEco, setMinEco] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [sort, setSort] = useState<SortValue>("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = PRODUCTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q));

      return (
        matchesQuery &&
        (category === "All" || p.category === category) &&
        p.eco >= minEco &&
        p.price <= maxPrice
      );
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "eco":
        sorted.sort((a, b) => b.eco - a.eco || a.price - b.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
    }
    return sorted;
  }, [query, category, minEco, maxPrice, sort]);

  const filtersActive =
    query.trim() !== "" ||
    category !== "All" ||
    minEco !== 0 ||
    maxPrice !== MAX_PRICE ||
    sort !== "featured";

  function resetAll() {
    setQuery("");
    setCategory("All");
    setMinEco(0);
    setMaxPrice(MAX_PRICE);
    setSort("featured");
  }

  const pricePct = (maxPrice / MAX_PRICE) * 100;

  return (
    <section
      id="shop"
      className="scroll-mt-24 border-t border-line bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              The Marketplace
            </span>
            <h2 className="display mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-semibold text-ink">
              Find your next swap
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Twelve everyday products, each independently scored. Filter by
              what matters to you — price, category, or how deep the eco
              credentials go.
            </p>
          </div>

          <p
            aria-live="polite"
            className="shrink-0 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-muted"
          >
            <span className="font-semibold tabular-nums text-ink">
              {visible.length}
            </span>{" "}
            of {PRODUCTS.length} products
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-8 rounded-3xl border border-line bg-surface p-4 shadow-card sm:p-5">
          <div className="mb-4 flex items-center gap-2 border-b border-line pb-3">
            <Sliders width={16} height={16} className="text-brand" />
            <span className="text-sm font-semibold text-ink">Refine</span>
            {filtersActive && (
              <button
                type="button"
                onClick={resetAll}
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1.5 text-[12px] font-semibold text-ink-soft transition-colors hover:bg-brand hover:text-white"
              >
                <Close width={13} height={13} />
                Clear all
              </button>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            {/* Search */}
            <div className="lg:col-span-4">
              <label
                htmlFor="shop-search"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Search
              </label>
              <div className="group relative">
                <Search
                  width={16}
                  height={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-brand"
                />
                <input
                  id="shop-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “bottle” or “bamboo”…"
                  className="h-11 w-full rounded-xl border border-line bg-surface pl-10 pr-3 text-sm text-ink placeholder:text-muted transition-all duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-[var(--brand-ring)]"
                />
              </div>
            </div>

            {/* Category */}
            <Dropdown
              label="Category"
              className="lg:col-span-3"
              value={category}
              onChange={setCategory}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            />

            {/* Sort */}
            <Dropdown
              label="Sort by"
              className="lg:col-span-3"
              value={sort}
              onChange={(v) => setSort(v as SortValue)}
              options={SORT_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
            />

            {/* Price */}
            <div className="lg:col-span-2">
              <label
                htmlFor="price-range"
                className="mb-1.5 flex items-baseline justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Max price
                <span className="text-[13px] font-bold tabular-nums normal-case tracking-normal text-brand">
                  ${maxPrice}
                </span>
              </label>
              <input
                id="price-range"
                type="range"
                min={0}
                max={MAX_PRICE}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="eco-range mt-1.5"
                style={{ ["--fill" as string]: `${pricePct}%` }}
              />
            </div>
          </div>

          {/* Eco rating segmented filter */}
          <fieldset className="mt-4 border-t border-line pt-4">
            <legend className="sr-only">Filter by eco rating</legend>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Eco rating
              </span>
              {ECO_FILTERS.map((f) => {
                const active = minEco === f.value;
                return (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setMinEco(f.value)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 active:scale-95 ${
                      active
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-line bg-surface text-ink-soft hover:border-brand hover:text-brand"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={onOpenProduct}
              />
            ))}
          </div>
        ) : (
          <div className="animate-pop-in mt-8 rounded-3xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 text-muted">
              <Search width={24} height={24} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">
              Nothing matches those filters
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {query.trim()
                ? `We couldn't find anything for “${query.trim()}”. Try a broader term, or widen the price and rating filters.`
                : "Try widening the price range or lowering the minimum eco rating."}
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-strong active:scale-95"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
