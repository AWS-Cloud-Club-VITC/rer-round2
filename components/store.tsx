"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

const THEME_KEY = "ecomart-theme";
const CART_KEY = "ecomart-cart";

export type CartLine = { product: Product; qty: number };
export type Toast = { id: number; title: string; detail?: string; icon?: string };
type Theme = "light" | "dark";

type Store = {
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkout: () => boolean;

  purchasedItems: CartLine[];
  ratingOpen: boolean;
  closeRating: () => void;

  favorites: string[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  /** Shared so the navbar search and the shop filter bar drive the same grid. */
  query: string;
  setQuery: (q: string) => void;

  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;

  /**
   * The active theme lives on <html data-theme>, set by the inline script
   * before paint. It is deliberately NOT React state: the server cannot know
   * it, so rendering from it would mismatch on hydration. The navbar swaps its
   * icon with CSS instead.
   */
  toggleTheme: () => void;

  // Hidden interaction: three clicks on the logo unlocks "Grove Mode".
  groveMode: boolean;
  registerLogoClick: () => void;
};

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<CartLine[]>([]);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [groveMode, setGroveMode] = useState(false);

  const toastId = useRef(0);
  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // React resets <html> attributes on the Strict Mode dev remount, which drops
  // what the inline script set. Re-applying here is a no-op in production.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", readTheme());
  }, []);

  useEffect(() => {
    let active = true;
    let restored: CartLine[] = [];
    try {
      const stored = JSON.parse(window.localStorage.getItem(CART_KEY) ?? "[]") as Array<{
        id: string;
        qty: number;
      }>;
      restored = stored.flatMap(({ id, qty }) => {
        const product = PRODUCTS.find((item) => item.id === id);
        return product && Number.isFinite(qty) && qty > 0
          ? [{ product, qty: Math.floor(qty) }]
          : [];
      });
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    queueMicrotask(() => {
      if (!active) return;
      setCart(restored);
      setCartReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    try {
      window.localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart.map(({ product, qty }) => ({ id: product.id, qty }))),
      );
    } catch {
      /* Storage may be unavailable; the in-memory cart still works. */
    }
  }, [cart, cartReady]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (t: Omit<Toast, "id">) => {
      const id = ++toastId.current;
      // Keep at most two on screen so the stack stays unobtrusive.
      setToasts((prev) => [...prev.slice(-1), { ...t, id }]);
      setTimeout(() => dismissToast(id), 2600);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (product: Product, qty = 1) => {
      setCart((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { product, qty }];
      });
      pushToast({
        title: `${product.name} added to cart`,
        detail: `Saves ${product.impact.co2} of CO₂`,
        icon: "cart",
      });
    },
    [pushToast],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) =>
        l.product.id === id ? { ...l, qty: Math.max(1, qty) } : l,
      ),
    );
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((l) => l.product.id !== id));
      pushToast({ title: "Removed from cart.", icon: "cart" });
    },
    [pushToast],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    pushToast({ title: "Cart cleared.", icon: "cart" });
  }, [pushToast]);

  const checkout = useCallback(() => {
    if (cart.length === 0) return false;

    // Snapshot each unique cart line before clearing so the optional rating
    // step remains independent of the now-empty, persisted cart.
    setPurchasedItems(cart.map((line) => ({ ...line })));
    setCart([]);
    setCartOpen(false);
    pushToast({
      title: "Order placed successfully!",
      detail: "Your sustainable swaps are on their way.",
      icon: "check",
    });
    setRatingOpen(true);
    return true;
  }, [cart, pushToast]);

  const closeRating = useCallback(() => setRatingOpen(false), []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      // The toast must fire outside the updater: React double-invokes state
      // updaters in Strict Mode, which would queue the notification twice.
      const has = favorites.includes(product.id);
      setFavorites((prev) =>
        prev.includes(product.id)
          ? prev.filter((f) => f !== product.id)
          : [...prev, product.id],
      );
      pushToast({
        title: has
          ? "Removed from favourites"
          : `${product.name} saved to favourites`,
        icon: has ? "heart-off" : "heart",
      });
    },
    [favorites, pushToast],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next: Theme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable — the toggle still works for this session */
    }
  }, []);

  // Hidden interaction #1 — three clicks on the wordmark within 1.2s.
  const registerLogoClick = useCallback(() => {
    logoClicks.current += 1;
    if (logoTimer.current) clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => {
      logoClicks.current = 0;
    }, 1200);

    if (logoClicks.current >= 3) {
      logoClicks.current = 0;
      setGroveMode(true);
      pushToast({
        title: "Grove Mode unlocked 🌱",
        detail: "You just planted a tree in the EcoMart forest.",
        icon: "leaf",
      });
      setTimeout(() => setGroveMode(false), 4200);
    }
  }, [pushToast]);

  const { cartCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const line of cart) {
      count += line.qty;
      sum += line.qty * line.product.price;
    }
    return { cartCount: count, subtotal: sum };
  }, [cart]);

  // Free carbon-neutral delivery over $50 — a small detail worth noticing.
  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 4.95;

  const value = useMemo<Store>(
    () => ({
      cart,
      cartCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      checkout,
      purchasedItems,
      ratingOpen,
      closeRating,
      favorites,
      toggleFavorite,
      isFavorite,
      cartOpen,
      setCartOpen,
      query,
      setQuery,
      toasts,
      pushToast,
      dismissToast,
      toggleTheme,
      groveMode,
      registerLogoClick,
    }),
    [
      cart,
      cartCount,
      subtotal,
      shipping,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      checkout,
      purchasedItems,
      ratingOpen,
      closeRating,
      favorites,
      toggleFavorite,
      isFavorite,
      cartOpen,
      query,
      toasts,
      pushToast,
      dismissToast,
      toggleTheme,
      groveMode,
      registerLogoClick,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
