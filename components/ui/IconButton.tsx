"use client";

import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  "aria-label": string;
}

export function IconButton({ icon, className = "", ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-full shadow-sm transition-transform duration-150 hover:scale-110 active:scale-95 ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}