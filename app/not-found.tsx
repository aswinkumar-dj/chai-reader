import Link from "next/link";
import { BookX } from "lucide-react";

// Next.js automatically renders this for any route that doesn't match --
// e.g. a mistyped URL, or a completely invalid path (not to be confused
// with our in-page "book not found" state, which handles valid routes
// with invalid ids -- this handles invalid routes entirely).
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <BookX size={48} strokeWidth={1.2} className="text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-[6px] bg-[#121212] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to Browse
      </Link>
    </main>
  );
}