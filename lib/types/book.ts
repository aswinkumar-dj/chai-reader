// Our own domain shape -- deliberately NOT a 1:1 mirror of Open Library's
// API response. Components only ever see this shape. If we swap data
// sources later (or plug in a real backend), only the repository layer
// needs to change -- not a single component.
export interface Book {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  coverUrl: string | null;
  description: string;
  genres: string[];
  publisher?: string;
  publishedDate?: string;
  language?: string;
  pageCount?: number;
  price: number;
}