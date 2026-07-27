# Chai Reader - Frontend Assessment

A book discovery platform built with Next.js, TypeScript, and Tailwind CSS, based on the provided Figma design.

## My Approach

I treated this as a real product build, not just a design-to-code exercise. Before writing any UI, I set up a clean data layer (types → API client → repository → React Query hooks) so components never touch raw data directly — this made every screen after the first one faster to build, since the hard problems (loading states, error handling, caching) were solved once and reused everywhere.

I built shared, reusable components first — a card component with multiple size variants, a horizontal-scroll carousel section, a layout shell — before touching individual screens, so each screen became mostly composition rather than new work. That investment paid off directly: three full screens, a wishlist feature, and a responsive pass all came together faster than they would have with one-off, screen-specific code.

Once the core screens were functional, I did a dedicated pass on responsive design (including a mobile navigation drawer, not just breakpoint tweaks), added persisted wishlist state, and finished with loading/error/empty states, custom 404/error pages, animations, and UI polish — matching the "production-quality, not just feature-complete" bar the brief asked for.

**On data**: the brief didn't provide a data source, so I fetched real, live book/author data from a public API rather than hardcoding fixtures — this let the app demonstrate genuine async states (loading, error, empty) instead of mock data. Wherever the source data couldn't support what the design showed (pricing, reviews, curated lists), I used clearly-labeled placeholders rather than pretending they were real. Full details are in Assumptions below, but this was a small part of the overall build — most of the effort went into architecture, components, responsiveness, and polish.

## Setup Instructions

```bash
git clone <https://github.com/aswinkumar-dj/chai-reader>
cd chai-reader
npm install
```

No environment variables or API keys are required.

## How to Run the Project

```bash
npm run dev      # local development, http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Key Technical Decisions

- **Repository pattern for data access** — components call React Query hooks, hooks call repository functions, repositories call the raw API client. Raw third-party data never reaches a component directly; everything is normalized into clean, app-owned types first.
- **Component composition over duplication** — one `BookCard` component handles every size variant across the app (grid, carousel, wide) via a `variant` prop, instead of separate near-identical components per screen.
- **Zustand for wishlist state** — chosen over Redux for a state need this small; persisted to `localStorage` via middleware, with selector-based subscriptions so toggling one book's wishlist status doesn't re-render every card on screen.
- **Fluid, viewport-based layout** — deliberately avoided hardcoding the Figma canvas's fixed pixel width, since that breaks on real devices; used `clamp()`, percentage widths, and breakpoint-driven layout instead.
- **Mobile-first navigation** — the desktop sidebar becomes a slide-in drawer below tablet width, not just a squeezed/hidden version of the same layout.
- **Custom error boundaries** — dedicated 404 and runtime-error pages matching the app's design, instead of relying on Next.js's default generic ones.

## Assumptions Made

No data source was provided in the brief. These fill that gap:

- **Data**: book/author data is fetched live from a public book-data API. This was a deliberate choice to demonstrate real data-fetching patterns (caching, loading, error handling) rather than static fixtures.
- **Pricing**: no pricing data exists in the source — prices are deterministically generated per book (same book always shows the same price) rather than random or hardcoded.
- **"New Arrivals" / "Best Sellers" / "Recommended For You"**: the data source has no retail-curation concept for these — backed by well-populated genre categories as stand-ins, since there's no account/purchase history to base real recommendations on.
- **Reviews**: no review system exists in scope — shown with clearly-labeled placeholder content rather than left empty.
- **Cart icon**: kept in the header to match the Figma design, but intentionally inert — this build scopes to the wishlist flow, not cart/checkout (see Trade-offs).
- **Brand logo & hero illustration**: exported directly from the Figma file as flattened image assets, since they're designer-composed graphics.
- **Genre pill imagery**: Figma shows photographic backgrounds per genre; no licensed images were available, so a flat color is used instead.
- **Author's "other books" list**: not filtered to that specific author's real bibliography — shows a general subject as a placeholder (see Improvements).

## Libraries Used

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **TanStack React Query** — data fetching, caching, loading/error state
- **Zustand** (+ `persist` middleware) — wishlist state
- **lucide-react** — icons

## Trade-offs

- **Wishlist only, no cart/checkout** — "Read & Chat" is the app's core interaction per the design; a full commerce flow was scoped out deliberately rather than half-built.
- **No automated tests** — effort prioritized feature completeness, responsive design, and UX polish within the time available. Would add component/integration tests next.
- **No backend/CMS** — wishlist is stored per-device (`localStorage`), not synced to an account, since there's no auth layer in scope.
- **Plain CSS animations over an animation library** — page transitions and micro-interactions use CSS keyframes rather than Framer Motion, since the effects needed didn't justify the added dependency.

## Improvements I Would Make With More Time

- Add automated component/integration tests, starting with the wishlist store and data repository layer.
- Source real per-genre imagery for the genre pills.
- Build a full cart/checkout flow if the product scope extends beyond wishlist.
- A deeper accessibility pass — full keyboard navigation and screen reader testing.
- Further image-loading tuning (blur placeholders, tighter responsive `sizes`).
- This was completed in weekends. If i have more time, i could make even more responsive page.

## Responsive Design & Mobile Readiness

Built with fluid, viewport-based layouts rather than a fixed-width design, plus a slide-in mobile navigation drawer below tablet width. Client-side data fetching (no reliance on a live server for core rendering) and no unguarded browser-API access, keeping the architecture friendly to future Capacitor packaging per the brief.