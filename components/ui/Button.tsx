"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

// Matches the Figma "filled button" component (#121212 bg, ~6px radius) --
// this is the same button used for "Read & Chat", "Buy Now", "Explore More",
// etc. across the whole design, not a card-specific style.
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "w-full rounded-[6px] py-2 text-xs font-medium transition-all duration-150 active:scale-[0.98]";
  const variants = {
    primary: "bg-[#121212] text-white hover:opacity-90",
    outline: "border border-border text-foreground hover:bg-black/5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}