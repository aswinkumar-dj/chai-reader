"use client";

const genres = ["People", "History", "Politics", "Kids", "Education"];

export function GenrePills() {
  return (
    <section id="genres" className="mb-20 ">
      <h2 className="mb-8 text-2xl font-semibold text-foreground">
        Dive into Different Genres
      </h2>
      <div className="flex flex-wrap gap-4">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className="flex h-[60.91px] w-[195.34px] shrink-0 items-center justify-center rounded-full bg-[#1f1f1f] text-sm font-medium text-white shadow-sm transition-transform hover:scale-105"
          >
            {genre}
          </button>
        ))}
      </div>
    </section>
  );
}