import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TopNav } from "@/components/public/TopNav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/public/ScrollProgress";

const gothamDisplay = localFont({
  src: [
    { path: "./fonts/Gotham-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Gotham-Book.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gotham-BookItalic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/Gotham-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Gotham-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Gotham-Black.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-gotham",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vehicle Services | Raymond Gray",
  description: "Specialist EV & Automotive services by Raymond Gray.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gothamDisplay.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-(--rg-ink) bg-(--rg-bg)">
        <ScrollProgress />
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
