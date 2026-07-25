"use client";

import Image from "next/image";
import { useBooksBySubject } from "@/hooks/useBooks";

interface RecommendedPanelProps {
  subject: string;
  bgClassName: string; // lets the two panels use slightly different tones
}

export function RecommendedPanel({ subject, bgClassName }: RecommendedPanelProps) {
  const { data, isLoading, isError } = useBooksBySubject(subject, 4);

  return (
    <div className={`relative overflow-hidden rounded-[12px] p-8 ${bgClassName}`}>
      {/* Decorative circles -- simple CSS, matches the soft overlapping
          circle background in the Figma panels */}
      <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/30" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-white/20" />

      <div className="relative">
        <h3 className="text-xl font-semibold text-foreground">
          Recommended For You
        </h3>
        <p className="mt-3 max-w-md text-sm text-[#404040] opacity-80">
          A global publishing technology pavilion designed to run alongside
          major international book fairs.
        </p>

        {isLoading && (
          <p className="mt-6 text-sm text-muted-foreground">Loading...</p>
        )}
        {isError && (
          <p className="mt-6 text-sm text-red-600">Couldn&apos;t load books.</p>
        )}

        {data && data.length > 0 && (
            <div className="mt-7 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {data.map((book) => (
              <div
                key={book.id}
                className="relative h-[195px] w-[130px] shrink-0 overflow-hidden rounded-[9px] bg-black/5"
              >
                {book.coverUrl ? (
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    sizes="130px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-1 text-center text-[10px] text-muted-foreground">
                    {book.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data && data.length === 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            No recommendations found yet.
          </p>
        )}
      </div>
    </div>
  );
}