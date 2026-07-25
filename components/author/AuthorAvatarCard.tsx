"use client";

import Image from "next/image";
import Link from "next/link";
import { authorPhotoUrl } from "@/lib/api/openLibrary";

interface AuthorAvatarCardProps {
  id: string;
  name: string;
}

export function AuthorAvatarCard({ id, name }: AuthorAvatarCardProps) {
  return (
    <Link
      href={`/author/${id}`}
      className="relative h-[142px] w-[142px] shrink-0 overflow-hidden rounded-[12px] border border-border bg-[#433e38]/10 transition-transform hover:scale-[1.03]"
    >
      {/* Photo fills the entire card */}
      <Image
        src={authorPhotoUrl(id, "M")}
        alt={name}
        fill
        sizes="142px"
        className="object-cover"
      />

      {/* Gradient scrim -- transparent at top, dark at bottom, so white
          text stays legible over any photo without a solid background
          block hiding the image. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/10 to-transparent" />

      {/* Name overlaid at the bottom, in white */}
      <p className="absolute inset-x-0 bottom-0 truncate px-2 py-2.5 text-center text-sm font-medium text-white">
        {name}
      </p>
    </Link>
  );
}