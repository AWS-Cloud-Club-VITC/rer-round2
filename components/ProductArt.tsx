/**
 * Line-art illustration for each product, drawn inline so the catalogue has no
 * external image dependency. `--t3` comes from the product's tint class.
 */
const ART: Record<string, React.ReactNode> = {
  toothbrush: (
    <>
      <path d="M38 82c-4-4-4-9 0-13l30-30 13 13-30 30c-4 4-9 4-13 0Z" />
      <path d="M74 32c4-4 10-4 14 0s4 10 0 14" />
      <path d="M36 84 26 94" />
      <path d="M44 62 58 76M52 54 66 68" />
    </>
  ),
  soap: (
    <>
      <rect x="24" y="52" width="60" height="34" rx="10" />
      <path d="M24 66h60" />
      <circle cx="88" cy="40" r="7" />
      <circle cx="72" cy="28" r="4.5" />
      <circle cx="95" cy="24" r="3" />
      <path d="M40 76h12" />
    </>
  ),
  bottle: (
    <>
      <path d="M48 30h24v10c0 4 8 10 8 20v42a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6V60c0-10 8-16 8-20V30Z" />
      <rect x="45" y="18" width="30" height="12" rx="4" />
      <path d="M40 64h40" />
      <path d="M52 76h16" />
    </>
  ),
  notebook: (
    <>
      <path d="M36 22h48a4 4 0 0 1 4 4v72a4 4 0 0 1-4 4H36Z" />
      <path d="M36 22c-6 0-10 4-10 10v56c0 6 4 10 10 10" />
      <path d="M26 34h10M26 46h10M26 58h10M26 70h10M26 82h10" />
      <path d="M50 44h24M50 58h24M50 72h14" />
    </>
  ),
  tote: (
    <>
      <path d="M28 42h64l6 56a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6Z" />
      <path d="M44 42V32a16 16 0 0 1 32 0v10" />
      <path d="M52 62c0 6 4 10 8 10s8-4 8-10" />
    </>
  ),
  sneaker: (
    <>
      <path d="M18 76c0-10 4-18 4-26l14 4 10 10 16 2 20 8c8 3 12 7 12 12v6H22c-2 0-4-2-4-4Z" />
      <path d="M18 88h76" />
      <path d="M36 54l-6 8M46 64l-6 8M62 76l-4 6" />
    </>
  ),
  backpack: (
    <>
      <path d="M30 46a24 24 0 0 1 48 0v46a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8Z" />
      <path d="M44 46V38a10 10 0 0 1 20 0v8" />
      <rect x="42" y="66" width="24" height="20" rx="5" />
      <path d="M30 56c-6 2-8 8-8 14M78 56c6 2 8 8 8 14" />
    </>
  ),
  powerbank: (
    <>
      <rect x="30" y="20" width="48" height="80" rx="10" />
      <rect x="40" y="30" width="28" height="28" rx="4" />
      <path d="M40 44h28M54 30v28" />
      <path d="M56 68l-8 14h10l-6 12" />
    </>
  ),
  lantern: (
    <>
      <path d="M36 46h40l6 34a6 6 0 0 1-6 7H36a6 6 0 0 1-6-7Z" />
      <path d="M44 46V34h24v12" />
      <path d="M56 22v12" />
      <path d="M44 24a12 12 0 0 1 24 0" />
      <path d="M42 62h28M42 74h28" />
    </>
  ),
  cleaning: (
    <>
      <path d="M42 44h22a6 6 0 0 1 6 6v46a6 6 0 0 1-6 6H42a6 6 0 0 1-6-6V50a6 6 0 0 1 6-6Z" />
      <path d="M46 44V30h14v14" />
      <path d="M60 30h14l6 10" />
      <path d="M36 62h34" />
      <circle cx="88" cy="72" r="7" />
      <circle cx="86" cy="90" r="5" />
    </>
  ),
  wraps: (
    <>
      <path d="M22 44c8-6 16-6 24 0s16 6 24 0 16-6 24 0v30c-8 6-16 6-24 0s-16-6-24 0-16 6-24 0Z" />
      <path d="M22 60c8-6 16-6 24 0s16 6 24 0 16-6 24 0" />
      <path d="M34 86c8-5 14-5 20 0" />
    </>
  ),
  cutlery: (
    <>
      <path d="M32 22v22c0 6 4 8 4 12l-2 42M28 22v18M36 22v18" />
      <path d="M60 22c-6 6-8 16-8 24 0 6 4 8 8 8s8-2 8-8c0-8-2-18-8-24Z" />
      <path d="M60 54v44" />
      <path d="M88 22c6 8 6 20 0 26v50" />
    </>
  ),
};

export function ProductArt({
  art,
  className = "",
}: {
  art: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="var(--t3)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ART[art] ?? ART.tote}
    </svg>
  );
}
