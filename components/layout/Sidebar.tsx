"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import {
  Globe,
  Star,
  Crown,
  Handshake,
  Briefcase,
  Laptop,
  Baby,
  GraduationCap,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useUIStore } from "@/lib/store/useUIStore";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Browse", href: "/", icon: Globe },
  { label: "New Arrivals", href: "/search?subject=new_arrivals", icon: Star },
  { label: "Best Sellers", href: "/search?subject=best_sellers", icon: Crown },
  { label: "Self help", href: "/search?subject=self_help", icon: Handshake },
  { label: "Business", href: "/search?subject=business", icon: Briefcase },
  { label: "Tech", href: "/search?subject=tech", icon: Laptop },
  { label: "Kids", href: "/search?subject=kids", icon: Baby },
  { label: "Classics", href: "/search?subject=classics", icon: GraduationCap },
  { label: "Settings", href: "/settings", icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-4 rounded-[12px] px-4 py-3 text-[16px] font-medium transition-colors ${
              isActive
                ? "bg-white text-[#1f1f1f]"
                : "text-[#4d4d4d] opacity-80 hover:bg-white/60"
            }`}
          >
            <Icon size={22} strokeWidth={1.75} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);

  return (
    <>
      {/* Desktop sidebar -- unchanged from before */}
      <aside className="hidden w-[256px] shrink-0 rounded-[12px] border border-[#fff8d7] bg-[#fffbe7] p-3 lg:block">
        <div className="px-3 py-4">
          <span className="text-xl font-semibold text-foreground">
            Chai Reader
          </span>
        </div>
        <NavList />
      </aside>

      {/* Mobile drawer -- always in the DOM so the slide transition can
          animate, visibility/interactivity controlled by translate +
          pointer-events rather than mounting/unmounting. */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-[280px] bg-[#fffbe7] p-3 shadow-xl transition-transform duration-200 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-3 py-4">
            <span className="text-xl font-semibold text-foreground">
              Chai Reader
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/60"
            >
              <X size={18} />
            </button>
          </div>
          <NavList onNavigate={closeMobileMenu} />
        </div>
      </div>
    </>
  );
}