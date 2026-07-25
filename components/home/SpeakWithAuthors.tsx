"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooksBySubject } from "@/hooks/useBooks";
import { DualBookCard } from "@/components/book/DualBookCard";
import type { Book } from "@/lib/types";

export function SpeakWithAuthors() {
  const { data } = useBooksBySubject("literature", 6);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
  }

  // Group books into pairs -- each DualBookCard shows 2 covers
  const pairs: [Book, Book][] = [];
  if (data) {
    for (let i = 0; i + 1 < data.length; i += 2) {
      pairs.push([data[i], data[i + 1]]);
    }
  }

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Speak with Authors
        </h2>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollBy("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white hover:bg-black/5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollBy("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white hover:bg-black/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {pairs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No books found yet.</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {pairs.map(([a, b]) => (
            <DualBookCard key={`${a.id}-${b.id}`} books={[a, b]} />
          ))}
        </div>
      )}
    </section>
  );
}