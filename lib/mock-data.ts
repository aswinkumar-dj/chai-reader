// No review system exists (no backend, no user accounts) -- these are
// placeholder reviewers so the Reviews section isn't empty on every
// book. Kept in one clearly-labeled file rather than mixed into the
// page component, so it's obvious what's real data vs. a stand-in.
export interface Review {
  name: string;
  text: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    name: "Vinuja",
    text: "A gripping read from start to finish - the pacing kept me turning pages long after I meant to stop.",
  },
  {
    name: "Arjun",
    text: "Beautifully written, with characters that feel genuinely real. One of the better books I've read this year.",
  },
];

// Open Library's author records rarely include genre/subject tags the
// way book records do -- there's no clean API field for it. This is a
// documented placeholder set, shown only when an author has no genres
// of their own, same pattern as MOCK_REVIEWS.
export const FALLBACK_AUTHOR_GENRES = [
  "Classic",
  "Books to read",
  "Historical Fiction",
];