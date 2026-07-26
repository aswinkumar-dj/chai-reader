"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAuthor, useBook, useBooksBySubject } from "@/hooks/useBooks";
import { useExpandableText } from "@/hooks/useExpandableText";
import { BookCarouselSection } from "@/components/book/BookCarouselSection";
import { WideBookCard } from "@/components/book/WideBookCard";
import { FALLBACK_AUTHOR_GENRES } from "@/lib/mock-data";
import { BackButton } from "@/components/ui/BackButton";
import { Breadcrumb } from "@/components/ui/BreadCrumb";

export default function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: author, isLoading, isError } = useAuthor(id);
  const releases = useBooksBySubject("fiction", 8);

  const bio = useExpandableText(author?.bio ?? "", 260);

  if (isLoading) {
    return (
      <main className="p-8">
        <p className="text-muted-foreground">Loading author...</p>
      </main>
    );
  }

  if (isError || !author) {
    return (
      <main className="p-8">
        <p className="text-red-600">
          Couldn&apos;t load this author. They may not exist or the request
          failed.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-[#1142be]">
          Back to Browse
        </Link>
      </main>
    );
  }

  const genres =
    author.genres.length > 0 ? author.genres : FALLBACK_AUTHOR_GENRES;

  return (
    <main className="p-8">
      {/* 3-level breadcrumb: Browse > Authors > Name */}
      <BackButton />
      <Breadcrumb
        items={[
          { label: "Browse", href: "/" },
          { label: "Authors" },
          { label: author.name },
        ]}
      />

      {/* Author banner */}
      <section className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="relative h-[220px] w-[220px] shrink-0 overflow-hidden rounded-[16px] border border-border bg-[#d9d9d9] shadow-sm">
          {author.photoUrl && (
            <Image
              src={author.photoUrl}
              alt={author.name}
              fill
              sizes="220px"
              className="object-cover"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold text-foreground">
            {author.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#404040] opacity-80">
            {bio.displayText}
          </p>
          {bio.isTruncatable && (
            <button
              type="button"
              onClick={bio.toggle}
              aria-expanded={bio.expanded}
              className="mt-2 text-sm font-medium text-[#1142be] hover:underline"
            >
              {bio.expanded ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {genres.map((genre, i) => (
              <span
                key={`${genre}-${i}`}
                className="rounded-full border border-[#c7d9fa] bg-[#e8f0fe] px-4 py-1.5 text-xs text-[#1142be]"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases -- standard cover grid */}
      {releases.data && releases.data.length > 0 && (
        <div className="mt-12">
          <BookCarouselSection
            title="Our New Releases"
            subtitle="Trending books among readers"
            books={releases.data}
          />
        </div>
      )}

      {/* New Releases -- wide cards with description. The Figma reference
          shows this same section twice, in two different card layouts --
          reproducing both rather than picking one, since it's a real
          part of the provided design. */}
      {releases.data && releases.data.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground">
            Our New Releases
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Trending books among readers
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {releases.data.map((book) => (
              <WideBookCard key={`wide-${book.id}`} book={book} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
