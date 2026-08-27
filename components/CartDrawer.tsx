"use client";

import { useEffect } from "react";
import { Cart, Close, Leaf, Minus, Plus, Trash, Truck } from "./Icons";
import { ProductArt } from "./ProductArt";
import { useStore } from "./store";

export function CartDrawer() {
  const {
    cart,
    cartCount,
    subtotal,
    shipping,
    total,
    cartOpen,
    setCartOpen,
    setQty,
    removeFromCart,
    clearCart,
    pushToast,
  } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCartOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  // Rough CO₂ figure from each line's stated saving — keeps the cart on-theme.
  const co2 = cart.reduce(
    (sum, line) => sum + parseFloat(line.product.impact.co2) * line.qty,
    0,
  );
  const toFreeShipping = Math.max(0, 50 - subtotal);

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-sm"
      />

      <aside className="animate-sheet-in relative flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-pop">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
            <Cart width={19} height={19} />
          </span>
          <div className="min-w-0">
            <h2 id="cart-title" className="text-base font-semibold text-ink">
              Your Cart
            </h2>
            <p className="text-[12px] text-muted">
              {cartCount} item{cartCount === 1 ? "" : "s"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line text-ink-soft transition-all duration-200 hover:border-brand hover:text-brand active:scale-90"
          >
            <Close width={18} height={18} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-surface-2 text-muted">
              <Cart width={26} height={26} />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">
              Your cart is empty
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Add a swap or two and we&apos;ll show the impact of your order
              here.
            </p>
            <button
              type="button"
              onClick={() => {
                setCartOpen(false);
                document
                  .getElementById("shop")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-strong active:scale-95"
            >
              Browse products
            </button>
          </div>
        ) : (
          <>
            {/* Free-shipping progress */}
            <div className="border-b border-line px-5 py-3.5">
              <p className="flex items-center gap-2 text-[12px] font-medium text-muted">
                <Truck width={15} height={15} className="text-brand" />
                {toFreeShipping > 0 ? (
                  <>
                    <span className="font-semibold text-ink">
                      ${toFreeShipping.toFixed(2)}
                    </span>
                    away from free carbon-neutral delivery
                  </>
                ) : (
                  <span className="font-semibold text-brand">
                    Free carbon-neutral delivery unlocked
                  </span>
                )}
              </p>
              <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                <span
                  className="block h-full rounded-full bg-brand transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (subtotal / 50) * 100)}%`,
                  }}
                />
              </span>
            </div>

            {/* Lines */}
            <ul className="min-h-0 flex-1 divide-y divide-[var(--line)] overflow-y-auto px-5">
              {cart.map((line) => (
                <li key={line.product.id} className="flex gap-3.5 py-4">
                  <div
                    className={`tint-${line.product.tint} art-panel relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line`}
                  >
                    <ProductArt
                      art={line.product.art}
                      className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                          {line.product.name}
                        </p>
                        <p className="mt-0.5 text-[12px] text-muted">
                          ${line.product.price.toFixed(2)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.product.id)}
                        aria-label={`Remove ${line.product.name} from cart`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-rose-500/10 hover:text-rose-500 active:scale-90"
                      >
                        <Trash width={16} height={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-line px-1">
                        <button
                          type="button"
                          onClick={() =>
                            setQty(line.product.id, line.qty - 1)
                          }
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 active:scale-90"
                        >
                          <Minus width={14} height={14} />
                        </button>
                        <span className="w-5 text-center text-[13px] font-semibold tabular-nums text-ink">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQty(line.product.id, line.qty + 1)
                          }
                          aria-label={`Increase quantity of ${line.product.name}`}
                          className="grid h-7 w-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface-2 active:scale-90"
                        >
                          <Plus width={14} height={14} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-ink">
                        ${(line.product.price * line.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <footer className="border-t border-line bg-surface-2/50 px-5 py-4">
              <p className="mb-3 flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2.5 text-[12.5px] font-medium text-ink-soft">
                <Leaf
                  filled
                  width={15}
                  height={15}
                  className="shrink-0 text-brand"
                />
                This order saves about{" "}
                <span className="font-bold tabular-nums text-brand">
                  {co2.toFixed(1)} kg
                </span>{" "}
                of CO₂
              </p>

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums text-ink">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Delivery</dt>
                  <dd className="tabular-nums">
                    {shipping === 0 ? (
                      <span className="font-semibold text-brand">Free</span>
                    ) : (
                      <span className="text-ink">${shipping.toFixed(2)}</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2.5 text-base font-semibold text-ink">
                  <dt>Total</dt>
                  <dd className="tabular-nums">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() =>
                  pushToast({
                    title: "This is a demo storefront",
                    detail: "No checkout here — your cart stays on this page.",
                    icon: "leaf",
                  })
                }
                className="mt-4 h-12 w-full rounded-full bg-brand text-sm font-semibold text-white shadow-lg shadow-[var(--brand-ring)] transition-all duration-200 hover:bg-brand-strong active:scale-[0.98]"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-2 h-10 w-full rounded-full text-[13px] font-medium text-muted transition-colors hover:text-rose-500"
              >
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
