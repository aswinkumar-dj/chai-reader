"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";

export function Header() {
  const [query, setQuery] = useState("");
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);

  return (
    <header className="flex items-center justify-between gap-3 px-4 py-6 lg:gap-6 lg:px-0">
      {/* Hamburger -- mobile only */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={toggleMobileMenu}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Search bar -- shrinks and drops the placeholder text on very
          small screens rather than overflowing or getting clipped */}
      <div className="flex h-[47px] min-w-0 flex-1 items-center gap-3 rounded-[22px] border border-[#e4e4e4] bg-white px-4 sm:gap-4 sm:px-8 lg:max-w-[718px]">
        <Search size={20} strokeWidth={1.5} className="shrink-0 text-[#1f1f1f] opacity-80" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search book title or author..."
          className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:truncate placeholder:text-[#7c7c7c] placeholder:opacity-80 focus:outline-none"
        />
      </div>

      {/* Wishlist / cart / login -- icons only on mobile, login button
          shrinks to icon-only below sm */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
        <Link href="/wishlist" aria-label="Wishlist" className="shrink-0">
          <Heart size={22} strokeWidth={1.5} className="text-[#1f1f1f] transition-transform hover:scale-110" />
        </Link>
        <Link href="/cart" aria-label="Cart" className="hidden shrink-0 sm:block">
          <ShoppingCart size={22} strokeWidth={1.5} className="text-[#1f1f1f] transition-transform hover:scale-110" />
        </Link>
        <Link
          href="/login"
          className="shrink-0 rounded-full border border-[#2b2638] px-3 py-2 text-sm text-[#3a3a3a] transition-colors hover:bg-black/5 sm:px-6"
        >
          Login
        </Link>
      </div>
    </header>
  );
}