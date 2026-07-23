import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/constants/site";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Jayesh Chaudhari | Portfolio",
    template: "%s | Jayesh Chaudhari"
  },
  description: siteConfig.description,
  openGraph: {
    title: "Jayesh Chaudhari | Portfolio",
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="relative flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/30 selection:text-primary">
        {/* Ambient background light gradients */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[130px]" />
          <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        <header className="relative z-50">
          <Navbar />
        </header>

        <main className="relative z-10 flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
