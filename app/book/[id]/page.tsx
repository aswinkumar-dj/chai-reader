"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { useBook, useAuthor, useBooksBySubject } from "@/hooks/useBooks";
import { useExpandableText } from "@/hooks/useExpandableText";
import { IconButton } from "@/components/ui/IconButton";
import { BookCarouselSection } from "@/components/book/BookCarouselSection";
import { ProductDetailRow } from "@/components/book/ProductDetailRow";
import { ReviewItem } from "@/components/book/ReviewItem";
import { MOCK_REVIEWS } from "@/lib/mock-data";
import { Breadcrumb } from "@/components/ui/BreadCrumb";
import { useWishlistStore } from "@/lib/store/useWishlistStore";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: book, isLoading, isError } = useBook(id);
  const { data: author } = useAuthor(book?.authorId);
  const related = useBooksBySubject(book?.genres[0] ?? "fiction", 8);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(book?.id ?? ""));
const toggleWishlist = useWishlistStore((state) => state.toggle);

  const description = useExpandableText(book?.description ?? "", 320);
  const bio = useExpandableText(author?.bio ?? "", 220);

  if (isLoading) {
    return (
      <main className="p-8">
        <p className="text-muted-foreground">Loading book...</p>
      </main>
    );
  }

  if (isError || !book) {
    return (
      <main className="p-8">
        <p className="text-red-600">
          Couldn&apos;t load this book. It may not exist or the request failed.
        </p>
        <Link href="/" className="mt-4 inline-block text-sm text-[#1142be]">
          Back to Browse
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      {/* Breadcrumb: Browse > Book Title*/}
      <Breadcrumb
        items={[{ label: "Browse", href: "/" }, { label: book.title }]}
      />

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Cover + actions */}
        <div className="w-full max-w-[280px] shrink-0">
          <div className="relative aspect-[3/4.4] overflow-hidden rounded-[12px] border border-border bg-black/5">
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                sizes="280px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                {book.title}
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-[6px] border border-border bg-white py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-black/5"
            >
              Read
            </button>
            <button
              type="button"
              className="flex-1 rounded-[6px] bg-[#121212] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Chat Now
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                {book.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Written by :{" "}
                <span className="font-semibold text-muted-foreground">
                  {book.author}
                </span>
              </p>
            </div>
            <IconButton
              icon={
                <Heart
                  size={18}
                  fill={isWishlisted ? "#c62123" : "none"}
                  className={
                    isWishlisted ? "text-[#c62123]" : "text-foreground"
                  }
                />
              }
              aria-label={
                isWishlisted
                  ? `Remove ${book.title} from wishlist`
                  : `Add ${book.title} to wishlist`
              }
              onClick={() => toggleWishlist(book)}
              className="h-11 w-11 shrink-0 border border-border bg-white"
            />
          </div>

          {book.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {book.genres.map((genre, i) => (
                <span
                  key={`${genre}-${i}`}
                  className="rounded-full border border-[#c7d9fa] bg-[#e8f0fe] px-4 py-1.5 text-xs text-[#1142be]"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">
              About the Book
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#404040] opacity-80">
              {description.displayText}
            </p>
            {description.isTruncatable && (
              <button
                type="button"
                onClick={description.toggle}
                aria-expanded={description.expanded}
                className="mt-2 text-sm font-medium text-[#1142be] hover:underline"
              >
                {description.expanded ? "Show less" : "Read more"}
              </button>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">
              Product Details
            </h2>
            <dl className="mt-3 flex flex-col gap-2">
              <ProductDetailRow
                label="Publisher"
                value={book.publisher ?? "Ailaysa"}
              />
              <ProductDetailRow
                label="Publication date"
                value={book.publishedDate ?? "Not available"}
              />
              <ProductDetailRow
                label="Language"
                value={book.language ?? "English"}
              />
              <ProductDetailRow
                label="Print length"
                value={
                  book.pageCount ? `${book.pageCount} pages` : "Not available"
                }
              />
            </dl>
          </section>

          {author && (
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">
                About the Author
              </h2>
              <div className="mt-3 flex gap-4">
                <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[10px] bg-black/5">
                  {author.photoUrl && (
                    <Image
                      src={author.photoUrl}
                      alt={author.name}
                      fill
                      sizes="110px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <Link
                    href={`/author/${author.id}`}
                    className="text-lg font-semibold text-[#1142be] hover:underline"
                  >
                    {author.name}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-[#404040] opacity-80">
                    {bio.displayText}
                  </p>
                  {bio.isTruncatable && (
                    <button
                      type="button"
                      onClick={bio.toggle}
                      aria-expanded={bio.expanded}
                      className="mt-1 text-sm font-medium text-[#1142be] hover:underline"
                    >
                      {bio.expanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
            <div className="mt-3 flex flex-col gap-4">
              {MOCK_REVIEWS.map((review) => (
                <ReviewItem key={review.name} {...review} />
              ))}
            </div>
          </section>

          {related.data && related.data.length > 0 && (
            <div className="mt-12">
              <BookCarouselSection
                title="You might also like"
                books={related.data.filter((b) => b.id !== book.id)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
