import Link from "next/link";
import { ArrowRight, Leaf, Search } from "@/components/Icons";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-canvas px-4 py-16 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="animate-drift absolute -left-28 -top-28 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="animate-drift absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl [animation-delay:-6s]" />
      </div>

      <section className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-line bg-surface/90 p-6 shadow-lift backdrop-blur sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Search width={28} height={28} />
        </span>
        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          Lost in the sustainable aisle
        </p>
        <h1 className="display mt-3 text-[clamp(2.3rem,8vw,4.4rem)] font-semibold text-ink">
          404 — This page failed the replication challenge.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
          Even we couldn&apos;t rebuild this route in time. The good news: no
          pixels were sent to landfill.
        </p>
        <Link
          href="/#home"
          className="group mx-auto mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-lg shadow-[var(--brand-ring)] transition-all hover:bg-brand-strong active:scale-[0.97]"
        >
          <Leaf filled width={17} height={17} />
          Back to Home
          <ArrowRight className="transition-transform group-hover:translate-x-1" width={17} height={17} />
        </Link>
      </section>
    </main>
  );
}
