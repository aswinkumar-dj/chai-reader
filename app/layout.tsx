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
  title: "Chai Reader - Discover, Read, Chat with Books",
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
      <body className="min-h-full font-sans bg-background text-foreground">
        <Providers>
          <div className="flex w-full gap-[28px] px-[28px] py-6">
            <Sidebar />
            <div className="min-w-0 flex-1">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}