// Low-level API client -- talks directly to Open Library, knows nothing
// about our app's internal Book/Author types. Its only job is: build the
// right URL, fetch it, return the raw JSON. All the "make this messy data
// clean" logic lives in the repository layer, not here.

const BASE_URL = "https://openlibrary.org";
const COVERS_URL = "https://covers.openlibrary.org/b";
const AUTHOR_PHOTOS_URL = "https://covers.openlibrary.org/a";

// Open Library subject slugs must be lowercase, space->underscore.
// e.g. "Crime Fiction" -> "crime_fiction". Without this, subject
// lookups silently 404 or return empty results.
export function toSubjectSlug(subject: string): string {
  return subject.trim().toLowerCase().replace(/\s+/g, "_");
}

// ---- Raw shapes, exactly as Open Library returns them ----

export interface OLSubjectWork {
  key: string;
  title: string;
  cover_id?: number;
  authors?: { name: string; key: string }[];
}

export interface OLSubjectResponse {
  name: string;
  work_count: number;
  works: OLSubjectWork[];
}

export interface OLSearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
  subject?: string[];
}

export interface OLSearchResponse {
  docs: OLSearchDoc[];
  numFound: number;
}

// Open Library returns description as either a plain string OR an object
// like { type: "/type/text", value: "..." } depending on the record.
// This inconsistency is exactly why we don't let raw data touch the UI.
export type OLTextField = string | { type: string; value: string };

export interface OLWorkDetails {
  key: string;
  title: string;
  description?: OLTextField;
  covers?: number[];
  subjects?: string[];
  authors?: { author: { key: string } }[];
}

export interface OLAuthorDetails {
  key: string;
  name: string;
  bio?: OLTextField;
}

// ---- API calls ----

export async function fetchBySubject(
  subject: string,
  limit = 12
): Promise<OLSubjectResponse> {
  const res = await fetch(
    `${BASE_URL}/subjects/${encodeURIComponent(toSubjectSlug(subject))}.json?limit=${limit}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch subject "${subject}": ${res.status}`);
  }
  return res.json();
}

export async function searchBooks(
  query: string,
  limit = 12
): Promise<OLSearchResponse> {
  const res = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`
  );
  if (!res.ok) {
    throw new Error(`Failed to search "${query}": ${res.status}`);
  }
  return res.json();
}

export async function fetchWorkDetails(
  workId: string
): Promise<OLWorkDetails> {
  const res = await fetch(`${BASE_URL}/works/${workId}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch work "${workId}": ${res.status}`);
  }
  return res.json();
}

export async function fetchAuthorDetails(
  authorId: string
): Promise<OLAuthorDetails> {
  const res = await fetch(`${BASE_URL}/authors/${authorId}.json`);
  if (!res.ok) {
    throw new Error(`Failed to fetch author "${authorId}": ${res.status}`);
  }
  return res.json();
}

// ---- Image URL helpers ----

export function coverUrl(
  coverId: number | undefined | null,
  size: "S" | "M" | "L" = "L"
): string | null {
  if (!coverId) return null;
  return `${COVERS_URL}/id/${coverId}-${size}.jpg`;
}

export function authorPhotoUrl(
  authorId: string,
  size: "S" | "M" | "L" = "L"
): string {
  return `${AUTHOR_PHOTOS_URL}/olid/${authorId}-${size}.jpg`;
}