import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Raymond Gray Vehicle Services",
  description:
    "Answers about EV sales, EV and ICE maintenance, fleet management, charging infrastructure, booking, and support from Raymond Gray's EV & Automotive Services.",
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
