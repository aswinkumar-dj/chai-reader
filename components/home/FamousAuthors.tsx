"use client";

import { AuthorAvatarCard } from "../author/AuthorAvatarCard";

const authors = [
  { id: "OL23919A", name: "J.K. Rowling" },
  { id: "OL1394865A", name: "Chetan Bhagat" },
  { id: "OL34328A", name: "Arundhati Roy" },
  { id: "OL21594A", name: "Agatha Christie" },
  { id: "OL18319A", name: "Charles Dickens" },
  { id: "OL23919A", name: "J.K. Rowling" },
  { id: "OL1394865A", name: "Chetan Bhagat" },
];

export function FamousAuthors() {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Famous Authors
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {authors.map((author) => (
          <AuthorAvatarCard key={author.id} {...author} />
        ))}
      </div>
    </section>
  );
}