import { fetchAuthorDetails, authorPhotoUrl, OLTextField } from "@/lib/api/openLibrary";
import type { Author } from "@/lib/types";

// Bio comes back as either a plain string or { value: string } --
// this is the one place in the whole app that has to know that.
function extractText(field: OLTextField | undefined, fallback: string): string {
  if (!field) return fallback;
  return typeof field === "string" ? field : field.value;
}

export async function getAuthorById(id: string): Promise<Author> {
  const data = await fetchAuthorDetails(id);
  return {
    id,
    name: data.name,
    photoUrl: authorPhotoUrl(id),
    bio: extractText(data.bio, "No biography available yet."),
    genres: [],
  };
}