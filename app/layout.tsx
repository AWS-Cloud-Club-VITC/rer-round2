import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { InlineScript } from "@/components/InlineScript";
import "./globals.css";

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EcoMart | Shop Better. Live Sustainably.",
    template: "%s | EcoMart",
  },
  description:
    "A marketplace for everyday products that are actually better for the planet. Every listing is scored out of five leaves on carbon, materials, packaging and durability.",
  applicationName: "EcoMart",
  openGraph: {
    type: "website",
    siteName: "EcoMart",
    title: "EcoMart | Shop Better. Live Sustainably.",
    description:
      "Explore everyday products scored clearly on carbon, materials, packaging and durability.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoMart | Shop Better. Live Sustainably.",
    description:
      "Explore everyday products scored clearly on carbon, materials, packaging and durability.",
  },
};

// Runs synchronously during HTML parsing so the stored theme is applied before
// the browser paints. See next/dist/docs — "How to prevent flash before hydration".
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("ecomart-theme");if(!t)t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={THEME_SCRIPT} />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
