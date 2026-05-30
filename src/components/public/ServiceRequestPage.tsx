"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { 
  SectionShell, 
  DisplayHeading, 
  Reveal 
} from "@/components/public";

type ServiceRequestPageProps = {
  index: string;
  title: React.ReactNode;
  eyebrow: string;
  image: string;
  intro: string;
  serviceType: string;
  sections: {
    title: string;
    body?: string;
    items: string[];
  }[];
  terms: string[];
  ctaLabel?: string;
};

export function ServiceRequestPage({
  index,
  title,
  eyebrow,
  image,
  intro,
  serviceType,
  sections,
  terms,
  ctaLabel = "Submit Request",
}: ServiceRequestPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formLoadedAt = useRef(0);

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceType,
          honeypot,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="rg-public">
      <section className="rg-page-hero">
        <div className="rg-hero-media" aria-hidden="true">
          <Reveal variant="img" className="h-full w-full">
            <Image src={image} alt="" fill priority className="object-cover opacity-25 saturate-[0.85]" />
          </Reveal>
        </div>
        <div className="rg-eyebrow-row">
          <Reveal delay={100}>
            <span className="rg-eyebrow"><span className="num">{index}</span>{serviceType}</span>
          </Reveal>
          <Reveal delay={200}>
            <span className="rg-eyebrow">- {eyebrow}</span>
          </Reveal>
        </div>
        <Reveal variant="line" delay={300}>
          <DisplayHeading as="h1" size="xl">{title}</DisplayHeading>
        </Reveal>
        <div className="rg-page-hero-bottom">
          <Reveal delay={500}>
            <p className="rg-lede">{intro}</p>
          </Reveal>
          <Reveal delay={600}>
            <Link href="/contact" className="rg-btn rg-btn-outline w-full md:w-fit justify-center">General Contact <span>→</span></Link>
          </Reveal>
        </div>
      </section>

      <SectionShell className="py-(--rg-section-y)" data-screen-label={`${serviceType} / Questions`}>
        {sections.map((section, idx) => (
          <Reveal key={section.title} delay={idx * 150} variant="fade">
            <div className="rg-deep border-b border-rg-line last:border-0 pb-12 mb-12 last:pb-0 last:mb-0">
              <div className="rg-deep-left">
                <span className="rg-eyebrow"><span className="num">{String(idx + 1).padStart(2, "0")}</span>Scope</span>
                <DisplayHeading as="h2" size="lg" className="mt-4 mb-6">{section.title}</DisplayHeading>
                {section.body ? <p className="rg-lede text-rg-ink-soft">{section.body}</p> : null}
              </div>
              <div className="rg-deep-right">
                <ul className="rg-list flex flex-col gap-4 list-none p-0 m-0">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="relative pl-6 py-2 border-b border-rg-line-soft last:border-0 before:content-[''] before:absolute before:left-0 before:top-[18px] before:w-3 before:h-px before:bg-rg-ink-mute text-rg-ink-soft text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </SectionShell>

      <section className="bg-rg-invert-bg text-rg-invert-ink py-(--rg-section-y) px-(--rg-pad-x) grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" data-screen-label={`${serviceType} / Assessment`}>
        <Reveal>
          <div>
            <span className="rg-eyebrow opacity-50"><span className="num">Request</span>Start Here</span>
            <DisplayHeading as="h2" size="lg" className="mt-6 mb-8 text-white">Send the first <em>service brief</em>.</DisplayHeading>
            <ul className="rg-list flex flex-col gap-4 list-none p-0 m-0 text-white/70">
              {terms.map((term) => (
                <li key={term} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[12px] before:w-3 before:h-px before:bg-white/30 italic-font font-light italic">
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="bg-white p-[clamp(24px,4vw,60px)] shadow-soft">
            <form className="rg-contact-form flex flex-col gap-6" onSubmit={handleSubmit}>
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-rg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-rg-success text-2xl font-bold">✓</span>
                  </div>
                  <span className="rg-eyebrow"><span className="num">Sent</span>Request Received</span>
                  <DisplayHeading as="h3" size="md" className="mt-4 text-rg-ink">Thank you. A representative will contact you shortly.</DisplayHeading>
                  <button type="button" className="rg-btn rg-btn-outline mt-8 mx-auto" onClick={() => setStatus("idle")}>Submit another request</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest uppercase text-rg-ink-mute">Full Name *</label>
                      <input name="name" value={formData.name} onChange={handleChange} required className="bg-rg-bg-2 border-b border-rg-line p-3 text-base focus:border-rg-accent outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-widest uppercase text-rg-ink-mute">Phone</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="bg-rg-bg-2 border-b border-rg-line p-3 text-base focus:border-rg-accent outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-rg-ink-mute">Email Address *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-rg-bg-2 border-b border-rg-line p-3 text-base focus:border-rg-accent outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-rg-ink-mute">Site / Location</label>
                    <input name="address" value={formData.address} onChange={handleChange} className="bg-rg-bg-2 border-b border-rg-line p-3 text-base focus:border-rg-accent outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-widest uppercase text-rg-ink-mute">Brief *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe the building, equipment, urgency, site condition, or support you need." className="bg-rg-bg-2 border-b border-rg-line p-3 text-base min-h-[120px] focus:border-rg-accent outline-none transition-colors resize-none" />
                  </div>
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}>
                    <label htmlFor={`${serviceType}-website`}>Website</label>
                    <input id={`${serviceType}-website`} name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                  </div>
                  {status === "error" ? <p className="text-rg-destructive text-sm">Something went wrong. Please try again or email us directly.</p> : null}
                  <button type="submit" disabled={status === "loading"} className="rg-btn rg-btn-filled mt-4 w-full justify-center">
                    {status === "loading" ? "Sending..." : ctaLabel} <span>→</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
