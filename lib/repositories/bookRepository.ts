import {
  fetchBySubject,
  fetchWorkDetails,
  coverUrl,
  OLSubjectWork,
  OLTextField,
} from "@/lib/api/openLibrary";
import { getAuthorById } from "./authorRepository";
import type { Book } from "@/lib/types";

// Open Library has no price data anywhere -- this is a commerce app, so we
// need *a* price. We deterministically derive one from the book's id (a
// simple string hash) so the same book always shows the same price across
// renders and sessions, instead of a random number that changes on every
// fetch. This is a documented assumption, not real pricing data.
function mockPriceFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return 199 + (hash % 20) * 50; // lands between 199 and 1149
}

// Open Library keys look like "/works/OL12345W" or "/authors/OL678A" --
// we only ever want the id segment for our own routes/URLs.
function idFromKey(key: string): string {
  return key.split("/").pop() ?? key;
}

function extractText(field: OLTextField | undefined, fallback: string): string {
  if (!field) return fallback;
  return typeof field === "string" ? field : field.value;
}

function mapSubjectWorkToBook(work: OLSubjectWork): Book {
  const id = idFromKey(work.key);
  return {
    id,
    title: work.title,
    author: work.authors?.[0]?.name ?? "Unknown Author",
    authorId: work.authors?.[0]?.key ? idFromKey(work.authors[0].key) : undefined,
    coverUrl: coverUrl(work.cover_id, "M"),
    description: "", // not available at list level -- fetched on detail page
    genres: [],
    price: mockPriceFromId(id),
  };
}

// Carousel/grid data -- e.g. "Crime Fiction", "Business", "Classics"
export async function getBooksBySubject(
  subject: string,
  limit = 12
): Promise<Book[]> {
  const data = await fetchBySubject(subject, limit);
  return data.works.map(mapSubjectWorkToBook);
}

// Full detail for the Book screen -- needs description, genres, and the
// author's real name, which the subject endpoint doesn't provide.
export async function getBookById(id: string): Promise<Book> {
  const work = await fetchWorkDetails(id);
  const authorKey = work.authors?.[0]?.author.key;
  const authorId = authorKey ? idFromKey(authorKey) : undefined;

  // Resolve the author's name in parallel with nothing else to wait on --
  // if this fails, we still want the book to render with a fallback name
  // rather than the whole page erroring out.
  let authorName = "Unknown Author";
  if (authorId) {
    try {
      const author = await getAuthorById(authorId);
      authorName = author.name;
    } catch {
      // swallow -- book detail should still render without the author name
    }
  }

  return {
    id,
    title: work.title,
    author: authorName,
    authorId,
    coverUrl: coverUrl(work.covers?.[0], "L"),
    description: extractText(work.description, "No description available."),
    genres: work.subjects?.slice(0, 6) ?? [],
    price: mockPriceFromId(id),
  };
}