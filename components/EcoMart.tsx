"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { CartDrawer } from "./CartDrawer";
import { EcoReceiptRail } from "./EcoReceiptRail";
import { FAQ } from "./FAQ";
import { FavoritesSection } from "./FavoritesSection";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { FlashSaleTimer } from "./FlashSaleTimer";
import { Footer } from "./Footer";
import { GroveOverlay } from "./GroveOverlay";
import { Hero } from "./Hero";
import { ImpactSection } from "./ImpactSection";
import { LowWasteQuiz } from "./LowWasteQuiz";
import { Navbar } from "./Navbar";
import { ProductModal } from "./ProductModal";
import { ProductSection } from "./ProductSection";
import { RatingModal } from "./RatingModal";
import { StoreProvider } from "./store";
import { Toasts } from "./Toasts";

function Shell() {
  // The modal is shared by the grid and the carousel, so it lives here.
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FlashSaleTimer />
        <LowWasteQuiz />
        <ProductSection onOpenProduct={setSelected} />
        <FavoritesSection onOpenProduct={setSelected} />
        <FeaturedCarousel onOpenProduct={setSelected} />
        <ImpactSection />
        <FAQ />
      </main>
      <Footer />

      {/* Keyed so switching products remounts with fresh tab/quantity state */}
      <ProductModal
        key={selected?.id ?? "none"}
        product={selected}
        onClose={() => setSelected(null)}
      />
      <CartDrawer />
      <EcoReceiptRail />
      <RatingModal />
      <Toasts />
      <GroveOverlay />
    </>
  );
}

export function EcoMart() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
