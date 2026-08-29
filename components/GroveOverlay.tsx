"use client";

import { Leaf } from "./Icons";
import { useStore } from "./store";

// Fixed trajectories keep the burst deterministic across renders.
const LEAVES = [
  { dx: -240, dy: 180, rot: "-140deg", delay: 0, size: 26 },
  { dx: 220, dy: 260, rot: "160deg", delay: 90, size: 20 },
  { dx: -140, dy: 320, rot: "90deg", delay: 40, size: 32 },
  { dx: 320, dy: 140, rot: "-100deg", delay: 160, size: 18 },
  { dx: -330, dy: 90, rot: "120deg", delay: 210, size: 22 },
  { dx: 90, dy: 360, rot: "-60deg", delay: 120, size: 28 },
  { dx: -60, dy: 400, rot: "200deg", delay: 260, size: 16 },
  { dx: 400, dy: 300, rot: "-180deg", delay: 60, size: 24 },
  { dx: -420, dy: 240, rot: "70deg", delay: 300, size: 19 },
  { dx: 160, dy: 440, rot: "140deg", delay: 350, size: 30 },
  { dx: -200, dy: 460, rot: "-90deg", delay: 180, size: 17 },
  { dx: 260, dy: 60, rot: "110deg", delay: 240, size: 23 },
];

/** Hidden interaction #1 — the leaf burst that plays when Grove Mode unlocks. */
export function GroveOverlay() {
  const { groveMode, groveTrees } = useStore();
  if (!groveMode) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      <div className="animate-pop-in absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-brand/20 bg-surface/95 px-4 py-2 shadow-lift backdrop-blur">
        <span className="flex items-center gap-2 text-[12px] font-semibold text-ink">
          <Leaf filled width={15} height={15} className="text-brand" />
          Grove Mode · <span className="tabular-nums text-brand">{groveTrees}</span>
          {" "}tree{groveTrees === 1 ? "" : "s"} planted
        </span>
      </div>
      {LEAVES.map((leaf, i) => (
        <span
          key={i}
          className="animate-leaf absolute left-1/2 top-8 text-brand"
          style={{
            ["--dx" as string]: `${leaf.dx}px`,
            ["--dy" as string]: `${leaf.dy}px`,
            ["--rot" as string]: leaf.rot,
            animationDelay: `${leaf.delay}ms`,
          }}
        >
          <Leaf filled width={leaf.size} height={leaf.size} />
        </span>
      ))}
    </div>
  );
}
