import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TopNav } from "@/components/public/TopNav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/public/ScrollProgress";
import { MotionProvider } from "@/components/public/MotionProvider";

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
  metadataBase: new URL("https://vehicleservices.raymond-gray.org"),
  title: {
    default: "EV & Automotive Services | Raymond Gray",
    template: "%s | Raymond Gray Vehicle Services",
  },
  description:
    "Every vehicle, one team, professional standards. Independent EV sales, scheduled EV & ICE maintenance, fleet management, and charging infrastructure — built on Raymond Gray's engineering discipline.",
  openGraph: {
    type: "website",
    siteName: "Raymond Gray Vehicle Services",
    title: "EV & Automotive Services | Raymond Gray",
    description:
      "Independent EV sales, scheduled EV & ICE maintenance, fleet management, and charging infrastructure — one accountable team.",
    url: "https://vehicleservices.raymond-gray.org",
    images: [{ url: "/images/redesign/hero.png", width: 1200, height: 630, alt: "Raymond Gray EV & Automotive Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV & Automotive Services | Raymond Gray",
    description: "One team for every vehicle — EV sales, EV & ICE maintenance, fleet, and charging.",
    images: ["/images/redesign/hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
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
        <MotionProvider>
          <ScrollProgress />
          <TopNav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
