"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState (not a plain const) ensures each user session gets its own
  // QueryClient instance instead of sharing one across requests -- this
  // matters in Next.js because the server can handle multiple users'
  // requests concurrently, and you never want to leak one user's cached
  // data into another user's response.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // data is "fresh" for 60s, no refetch needed
            retry: 1, // retry a failed request once before showing an error
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}