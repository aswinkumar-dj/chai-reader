"use client";

import { useBooksBySubject } from "@/hooks/useBooks";

export default function Home() {
  const { data, isLoading, isError, error } = useBooksBySubject("crime");

  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-semibold text-foreground mb-4">
        Chai Reader — Data Layer Test
      </h1>

      {isLoading && <p className="text-muted-foreground">Loading books...</p>}

      {isError && (
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      {data && (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((book) => (
            <li key={book.id} className="border border-border rounded-[12px] p-3 bg-card">
              <p className="font-medium text-sm">{book.title}</p>
              <p className="text-xs text-muted-foreground">{book.author}</p>
              <p className="text-xs mt-1">₹{book.price}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}