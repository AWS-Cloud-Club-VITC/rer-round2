"use client";

import { useState } from "react";
import { Cart, Heart, Leaf, Recycle, Sparkle } from "./Icons";
import { useStore } from "./store";

export function EcoReceiptRail() {
  const { cart, cartCount, subtotal, favorites, groveMode, groveTrees, setCartOpen } = useStore();
  const [expanded, setExpanded] = useState(false);
  const co2 = cart.reduce((sum, line) => sum + parseFloat(line.product.impact.co2) * line.qty, 0);

  return (
    <aside className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-2xl border border-r-0 border-line bg-surface/95 shadow-lift backdrop-blur transition-[width] duration-300 2xl:block ${expanded ? "w-72" : "w-14"}`} aria-label="Eco receipt summary">
      <div className="flex min-h-72">
        <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-controls="eco-receipt-content" aria-label={expanded ? "Collapse eco receipt" : "Expand eco receipt"} className="flex w-14 shrink-0 flex-col items-center border-r border-line bg-brand-soft/50 py-4 transition-colors hover:bg-brand-soft">
          <Recycle width={18} height={18} className="text-brand" />
          <span className="mt-4 [writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">Eco receipt</span>
          <span className="mt-auto rounded-full bg-brand px-2 py-1 text-[10px] font-bold text-white">{cartCount}</span>
        </button>
        <div id="eco-receipt-content" aria-hidden={!expanded} className={`w-58 p-4 transition-opacity duration-150 ${expanded ? "visible opacity-100" : "invisible pointer-events-none opacity-0"}`}>
          <div className="flex items-start justify-between border-b border-dashed border-line pb-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Live order log</p><p className="mt-1 text-sm font-semibold text-ink">Your eco receipt</p></div><Sparkle width={16} height={16} className="text-brand" /></div>
          <dl className="divide-y divide-dashed divide-line text-[12px]">
            <div className="flex items-center justify-between py-3"><dt className="flex items-center gap-2 text-muted"><Cart width={14} height={14} />Cart</dt><dd className="font-bold tabular-nums text-ink">{cartCount} · ${subtotal.toFixed(2)}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="flex items-center gap-2 text-muted"><Heart width={14} height={14} />Saved</dt><dd className="font-bold tabular-nums text-ink">{favorites.length}</dd></div>
            <div className="flex items-center justify-between py-3"><dt className="flex items-center gap-2 text-muted"><Leaf width={14} height={14} />CO₂ avoided</dt><dd className="font-bold tabular-nums text-brand">{co2.toFixed(1)} kg</dd></div>
          </dl>
          <p className={`mt-3 rounded-lg px-2.5 py-2 text-[11px] font-semibold ${groveMode ? "bg-brand text-white" : "bg-surface-2 text-muted"}`}>{groveMode ? `Grove Mode: ${groveTrees} tree${groveTrees === 1 ? "" : "s"} planted` : "Three logo taps unlock Grove Mode"}</p>
          <button type="button" onClick={() => setCartOpen(true)} className="mt-3 w-full border border-brand bg-brand-soft py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-brand hover:text-white">Open cart</button>
        </div>
      </div>
    </aside>
  );
}
