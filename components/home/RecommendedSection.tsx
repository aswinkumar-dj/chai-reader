"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RecommendedPanel } from "./RecommendedPanel";

// On large screens (lg+), both panels show side by side, matching Figma.
// Below that, screen width can't comfortably fit two panels, so instead
// of stacking them vertically (which pushes content far down the page),
// we let the user toggle between them one at a time via arrows -- same
// interaction language as the carousel sections elsewhere on this page.
export function RecommendedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="relative mb-10 mt-8">
      {/* Toggle arrows -- only relevant below lg, where panels switch
          one at a time instead of showing side by side */}
      <div className="mb-3 flex justify-end gap-2 lg:hidden">
        <button
          type="button"
          aria-label="Previous recommendation panel"
          onClick={() => scrollBy("left")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-black/5"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          aria-label="Next recommendation panel"
          onClick={() => scrollBy("right")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-black/5"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        <div className="w-full shrink-0 snap-start lg:w-auto">
          <RecommendedPanel subject="romance" bgClassName="bg-[#fdeee0]" />
        </div>
        <div className="w-full shrink-0 snap-start lg:w-auto">
          <RecommendedPanel subject="mystery" bgClassName="bg-[#e8f0fe]" />
        </div>
      </div>
    </section>
  );
}