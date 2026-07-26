"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

// Next.js renders this automatically when a rendering/runtime error is
// thrown anywhere below this level in the tree. Must be a Client
// Component -- error boundaries rely on React state, which only works
// client-side. `reset()` lets the user retry without a full page reload.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real production app this is where you'd send the error to a
    // monitoring service (Sentry, etc.). Logged to console here since no
    // such service is wired up in this project.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <AlertTriangle size={48} strokeWidth={1.2} className="text-red-500" />
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        An unexpected error occurred. You can try again, or head back to Browse.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-[6px] border border-border bg-white px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-black/5"
        >
          Try again
        </button>
        
        {/* Plain <a>, not next/link's <Link>, is intentional here -- when an
        error boundary is active, the app's client-side router state can be
        in a broken condition. A full page navigation reliably escapes it;
        client-side navigation might not always recover cleanly. */}

        <a
          href="/"
          className="rounded-[6px] bg-[#121212] px-6 py-2.5 text-sm
          font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Browse
        </a>
      </div>
    </main>
  );
}
