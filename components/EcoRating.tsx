"use client";

import { useId, useState } from "react";
import { Leaf } from "./Icons";
import type { Product } from "@/data/products";

const PILLARS = ["Carbon", "Materials", "Packaging", "Durability"] as const;

/**
 * Deterministic per-pillar breakdown derived from the product's overall score,
 * so every badge shows a stable, plausible split without duplicating data.
 */
function breakdown(product: Product) {
  let hash = 0;
  for (let i = 0; i < product.id.length; i++) {
    hash = (hash * 31 + product.id.charCodeAt(i)) % 997;
  }
  return PILLARS.map((label, i) => {
    const base = product.eco * 20;
    const swing = ((hash >> (i * 2)) % 3) - 1; // -1, 0 or 1
    const pct = Math.max(45, Math.min(99, base + swing * 6 + (i === 0 ? -2 : 2)));
    return { label, pct };
  });
}

export function LeafRow({
  eco,
  size = 14,
  className = "",
}: {
  eco: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Leaf
          key={i}
          filled={i < eco}
          width={size}
          height={size}
          className={
            i < eco ? "text-brand" : "text-line-strong"
          }
        />
      ))}
    </span>
  );
}

/**
 * Eco badge with a sustainability tooltip on hover/focus — one of the hidden
 * interactions participants are meant to discover by exploring the cards.
 */
export function EcoBadge({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pillars = breakdown(product);

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-label={`Eco rating ${product.eco} out of 5 leaves. Show breakdown.`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="group/eco inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm backdrop-blur transition-all duration-200 hover:border-brand hover:bg-brand-soft hover:shadow-md"
      >
        <LeafRow eco={product.eco} size={12} />
        <span className="tabular-nums text-muted group-hover/eco:text-brand">
          {product.eco}.0
        </span>
      </button>

      {open && (
        <span
          id={id}
          role="tooltip"
          // Anchored to the badge's left edge (not centred) so the panel opens
          // into the card and never spills past its edge or the viewport.
          className="animate-pop-in absolute bottom-[calc(100%+8px)] left-0 z-30 w-[min(14rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-surface p-3 text-left shadow-lift"
        >
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Eco score breakdown
          </span>
          {pillars.map((p) => (
            <span key={p.label} className="mb-1.5 block">
              <span className="flex items-center justify-between text-[11px] font-medium text-ink-soft">
                <span>{p.label}</span>
                <span className="tabular-nums text-muted">{p.pct}%</span>
              </span>
              <span className="mt-1 block h-1 w-full overflow-hidden rounded-full bg-surface-3">
                <span
                  className="block h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: `${p.pct}%` }}
                />
              </span>
            </span>
          ))}
          <span className="mt-2 block border-t border-line pt-2 text-[11px] leading-snug text-muted">
            {product.impact.note}
          </span>
        </span>
      )}
    </span>
  );
}
