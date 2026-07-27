import { useQuery } from "@tanstack/react-query";
import { getBooksBySubject, getBookById, getAuthorById } from "@/lib/repositories";

// Query keys are how React Query identifies and caches each request.
// ["books", "subject", "crime_fiction"] is a different cache entry than
// ["books", "subject", "classics"] -- get these wrong (e.g. reuse the
// same key for different data) and see stale/wrong data appear.
export function useBooksBySubject(subject: string, limit = 12) {
  return useQuery({
    queryKey: ["books", "subject", subject, limit],
    queryFn: () => getBooksBySubject(subject, limit),
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["books", "detail", id],
    queryFn: () => getBookById(id),
    enabled: !!id, // don't fire the request at all if id is empty/undefined
  });
}

export function useAuthor(id: string | undefined) {
  return useQuery({
    queryKey: ["authors", "detail", id],
    queryFn: () => getAuthorById(id as string),
    enabled: !!id,
  });
}