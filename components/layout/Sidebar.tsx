"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
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
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// Order and labels match the Figma sidebar exactly. "Browse" links to the
// home page; the rest are subject filters we'll wire to /search?subject=...
// once that page exists.
const navItems: NavItem[] = [
  { label: "Browse", href: "/", icon: Compass },
  { label: "New Arrivals", href: "/search?subject=new_arrivals", icon: Star },
  { label: "Best Sellers", href: "/search?subject=best_sellers", icon: Crown },
  { label: "Self help", href: "/search?subject=self_help", icon: Handshake },
  { label: "Business", href: "/search?subject=business", icon: Briefcase },
  { label: "Tech", href: "/search?subject=tech", icon: Laptop },
  { label: "Kids", href: "/search?subject=kids", icon: Baby },
  { label: "Classics", href: "/search?subject=classics", icon: GraduationCap },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[256px] shrink-0 rounded-[12px] border border-[#fff8d7] bg-[#fffbe7] p-3 lg:block">
      {/* Brand mark -- no logo asset was provided in the Figma file, so
          this is a simple text lockup rather than a reproduced brand image. */}
      <div className="px-3 py-4">
        <Image src="/Simplification.png" alt="Chai Reader" width={195} height={39} priority />
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
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
    </aside>
  );
}