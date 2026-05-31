import type { Metadata } from "next";
import { FaqsContent } from "./FaqsContent";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about EV sales, EV and ICE maintenance, fleet management, charging infrastructure, booking, and support from Raymond Gray's EV & Automotive Services.",
};

export default function FaqsPage() {
  return <FaqsContent />;
}
