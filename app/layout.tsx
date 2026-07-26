import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chai Reader — Discover, Read, Chat with Books",
  description:
    "An AI-powered book commerce platform to discover and experience books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="h-full font-sans bg-background text-foreground">
        <Providers>
          {/* h-screen + overflow-hidden on the outer shell means nothing
              at this level scrolls -- only the designated scroll region
              inside (the main content column) will. */}
          <div className="flex h-screen w-full gap-[28px] overflow-hidden px-[28px] py-6">
            {/* Sidebar: fixed height matching the viewport, scrolls
                internally only if its own content overflows (e.g. more
                nav items than fit) -- doesn't move when content scrolls. */}
            <div className="h-full shrink-0 overflow-y-auto">
              <Sidebar />
            </div>

            {/* Content column: Header stays pinned (shrink-0, outside the
                scroll area), everything below it scrolls independently. */}
            <div className="flex h-full min-w-0 flex-1 flex-col">
              <div className="shrink-0">
                <Header />
              </div>
              <div className="flex-1 overflow-y-auto">
                {children}
              
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}