# Chai Reader

A modern, responsive book discovery platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. The application demonstrates scalable frontend architecture, reusable UI components, efficient data fetching, persistent client-side state, and a polished user experience across desktop and mobile devices.

---

## ✨ Features

* 📚 Discover books and authors using live public data
* 🔍 Search and browse books across multiple categories
* ❤️ Persistent wishlist with local storage
* ⚡ Fast data fetching and caching with React Query
* 🧩 Reusable component architecture
* 📱 Fully responsive design across desktop, tablet, and mobile
* 🎨 Modern UI with smooth animations and transitions
* 🚨 Loading, empty, and error states
* ❌ Custom 404 and runtime error pages
* 📖 Author detail pages
* 📦 Clean repository-based data layer

---

## Live Demo

> **Demo:** https://chai-reader-rust.vercel.app/

## Repository

> **GitHub:** https://github.com/aswinkumar-dj/chai-reader

---


# Architecture

The project follows a layered architecture that keeps presentation, business logic, and data access separated.

```
UI Components
      │
      ▼
React Query Hooks
      │
      ▼
Repository Layer
      │
      ▼
API Client
      │
      ▼
Public Books API
```

This architecture keeps components independent from external APIs, improves maintainability, and makes future backend migration significantly easier.

---

# Tech Stack

### Framework

* Next.js 16 (App Router)
* React
* TypeScript

### Styling

* Tailwind CSS v4

### State Management

* Zustand
* Zustand Persist Middleware

### Data Fetching

* TanStack React Query

### Icons

* Lucide React

---

# Project Structure

```
app/
components/
hooks/
repositories/
services/
store/
types/
utils/
public/
```

---

# Setup

Clone the repository.

```bash
git clone https://github.com/aswinkumar-dj/chai-reader
```

Navigate into the project.

```bash
cd chai-reader
```

Install dependencies.

```bash
npm install
```

---

# Running the Project

Start the development server.

```bash
npm run dev
```

Build for production.

```bash
npm run build
```

Run ESLint.

```bash
npm run lint
```

No environment variables or API keys are required.

---

# Data Source

The application consumes a public books API to provide real-time book and author information.

Because the API focuses on bibliographic data rather than commercial bookstore functionality, certain UI elements are represented using deterministic placeholder data.

Examples include:

* Product pricing
* Customer reviews
* Personalized recommendations
* Bestseller collections

These placeholders allow the interface to behave like a production application while remaining consistent and predictable.

---

# Key Technical Decisions

## Repository Pattern

The application separates data access from presentation.

```
Components
      ↓
React Query Hooks
      ↓
Repositories
      ↓
API Client
```

Components never communicate with the API directly. Every response is normalized into application-owned types before reaching the UI.

---

## Reusable Component System

Rather than creating separate components for each page, the application is built around reusable UI primitives.

For example, a single `BookCard` component supports multiple layouts through variants, allowing the same component to be reused across grids, carousels, and recommendation sections.

---

## Efficient Client State

Wishlist functionality is powered by **Zustand** with persisted storage.

The application uses selector-based subscriptions so updating one book does not trigger unnecessary re-renders across unrelated components.

---

## Server State Management

TanStack React Query manages:

* API requests
* Response caching
* Loading states
* Error handling
* Background refetching

This keeps asynchronous logic centralized and significantly reduces boilerplate.

---

## Responsive Layout

The interface uses viewport-based layouts with flexible sizing instead of fixed-width designs.

Responsive behavior includes:

* Mobile navigation drawer
* Responsive grids
* Adaptive typography
* Flexible spacing
* Fluid layouts using modern CSS techniques

---

## Error Handling

The application includes dedicated pages for:

* 404 Not Found
* Runtime Errors
* Empty States
* API Failures

This provides a more polished user experience than relying on framework defaults.

---

# Performance Considerations

* Optimized component composition
* Cached API responses
* Shared reusable components
* Lazy client rendering where appropriate
* Minimal global state
* Reduced unnecessary re-renders using Zustand selectors

---

# Accessibility

The project includes:

* Semantic HTML
* Responsive layouts
* Proper image alt text where applicable

Future improvements include a complete accessibility audit and screen reader testing.

---

# Trade-offs

## Wishlist Only

The current scope focuses on the wishlist experience.

Shopping cart, checkout, and payment functionality are intentionally excluded to keep the project focused while maintaining production-quality implementation.

---

## Local Persistence

Wishlist data is stored locally using browser storage.

A future backend can replace this with authenticated cloud synchronization without changing the UI architecture.

---

## Animations

CSS animations are used instead of a dedicated animation library, reducing bundle size while providing smooth interactions.

---

## Testing

Automated tests have not yet been added.

The architecture is designed to make future unit and integration testing straightforward, particularly around repositories, hooks, and state management.

---

# Future Enhancements

* Shopping cart
* Checkout flow
* User authentication
* Cloud-synced wishlist
* User profiles
* Recommendation engine
* Search filters
* Book reviews
* Unit testing
* Integration testing
* End-to-end testing
* Improved accessibility
* Progressive Web App support
* Image optimization
* Offline support

---

# Libraries

* Next.js
* React
* TypeScript
* Tailwind CSS v4
* TanStack React Query
* Zustand
* Lucide React

---

# Why This Architecture?

This project prioritizes maintainability, scalability, and developer experience over simply rendering screens.

By separating UI, state management, and data access into dedicated layers, the codebase becomes easier to extend, test, and maintain as new features are introduced. Reusable components, centralized API handling, and predictable state management enable rapid development while keeping the application organized and production-ready.


