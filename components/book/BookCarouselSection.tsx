"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCard } from "./BookCard";
import type { Book } from "@/lib/types";

interface BookCarouselSectionProps {
  title: string;
  subtitle?: string;
  books: Book[];
  variant?: "compact" | "standard";
}

export function BookCarouselSection({
  title,
  subtitle,
  books,
  variant = "standard",
}: BookCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // We scroll by roughly one card-width-plus-gap at a time, rather than
  // an arbitrary fixed pixel amount -- this keeps the scroll feeling
  // consistent regardless of which variant (compact/standard) is used.
  function scrollBy(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-4">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Arrow controls -- replace the native scrollbar the browser
            would otherwise show */}
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollBy("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-black/5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollBy("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-colors hover:bg-black/5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Empty state -- if a subject genuinely returns nothing */}
      {books.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No books found in this section yet.
        </p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} variant={variant} />
          ))}
        </div>
      )}
    </section>
  );
}