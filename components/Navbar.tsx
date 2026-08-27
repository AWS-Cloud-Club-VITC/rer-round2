"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useStore } from "./store";
import { Cart, Close, Leaf, Menu, Moon, Search, Sun } from "./Icons";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#shop", label: "Shop" },
  { href: "#impact", label: "Impact" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const {
    cartCount,
    setCartOpen,
    toggleTheme,
    query,
    setQuery,
    registerLogoClick,
    groveMode,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function searchTo(value: string) {
    setQuery(value);
    if (value.trim()) {
      document.getElementById("shop")?.scrollIntoView({ block: "start" });
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-canvas/60 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8"
      >
        {/* Logo — hidden interaction: three quick clicks unlock Grove Mode */}
        <Link
          href="/#home"
          onClick={registerLogoClick}
          aria-label="Go to homepage"
          className="group flex shrink-0 items-center gap-2 rounded-xl px-1 py-1"
        >
          <span
            className={`grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-sm transition-transform duration-300 group-hover:-rotate-12 group-active:scale-90 ${
              groveMode ? "animate-bump" : ""
            }`}
          >
            <Leaf filled width={19} height={19} />
          </span>
          <span className="text-[19px] font-semibold tracking-tight text-ink">
            Eco<span className="text-brand">Mart</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  active === link.href
                    ? "text-brand"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand transition-all duration-300 ${
                    active === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop search */}
        <div className="ml-auto hidden min-w-0 flex-1 justify-end md:flex lg:max-w-xs">
          <label htmlFor="nav-search" className="sr-only">
            Search products
          </label>
          <div className="group relative w-full">
            <Search
              width={16}
              height={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-brand"
            />
            <input
              id="nav-search"
              type="search"
              value={query}
              onChange={(e) => searchTo(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-full rounded-full border border-line bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-muted transition-all duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-[var(--brand-ring)]"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          {/* Theme toggle. Both icons are rendered and CSS picks one from
              <html data-theme>, so nothing here depends on state the server
              cannot know — no hydration mismatch and no flash. */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90 dark:border-brand/40 dark:text-brand"
          >
            <Moon width={18} height={18} className="dark:hidden" />
            <Sun width={18} height={18} className="hidden dark:block" />
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90"
          >
            <Cart width={18} height={18} />
            {/* Keying on the count remounts the badge, replaying the pulse
                each time an item is added. */}
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-bump absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold tabular-nums text-white ring-2 ring-canvas"
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90 lg:hidden"
          >
            {menuOpen ? (
              <Close width={18} height={18} />
            ) : (
              <Menu width={18} height={18} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="animate-fade-up border-t border-line bg-canvas px-4 pb-5 pt-4 lg:hidden"
      >
        <label htmlFor="mobile-search" className="sr-only">
          Search products
        </label>
        <div className="relative mb-3 md:hidden">
          <Search
            width={16}
            height={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="mobile-search"
            type="search"
            value={query}
            onChange={(e) => searchTo(e.target.value)}
            placeholder="Search products…"
            className="h-11 w-full rounded-full border border-line bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>
        <ul className="grid gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === link.href
                    ? "bg-brand-soft text-brand"
                    : "text-ink-soft hover:bg-surface-2"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
