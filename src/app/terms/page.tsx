import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Terms of Service | Raymond Gray Vehicle Services",
  description:
    "The terms governing use of Raymond Gray Limited's EV & Automotive Services website and booking.",
};

const UPDATED = "30 May 2026";

export default function TermsPage() {
  return (
    <main className="rg-public relative">
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center opacity-[0.03]">
        <Image
          src="/images/logos/RaymondgraylogoBW.png"
          alt="Raymond Gray Watermark"
          width={800}
          height={800}
          className="max-w-[80vw] object-contain"
        />
      </div>
      <section className="relative h-[42vh] min-h-[280px] w-full overflow-hidden flex items-end">
        <Image src="/images/redesign/legal-hero.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-rg-invert-bg via-rg-invert-bg/70 to-rg-invert-bg/30" />
        <div className="relative z-10 mx-auto max-w-3xl w-full px-6 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/70">Legal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white">Terms of Service</h1>
          <p className="mt-3 text-sm text-white/60">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">

        <div className="rg-legal mt-10 space-y-8 text-rg-ink-soft">
          <p>
            These Terms govern your access to and use of the Raymond Gray Limited EV &amp; Automotive Services website
            and booking (the &ldquo;Service&rdquo;). By using the Service, you agree to these Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">1. The Service</h2>
            <p className="mt-3">
              The Service lets you enquire about vehicle sales and request vehicle servicing, fleet management, and
              charging-infrastructure work. Requests are subject to assessment, scoping, and a separate written
              agreement or quotation; submitting a request does not by itself create a binding service contract.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">2. Bookings &amp; information</h2>
            <p className="mt-3">
              You must provide accurate vehicle and contact information. You are responsible for the accuracy of the
              details you submit and for keeping any account credentials secure. We may decline or cancel bookings that
              are inaccurate, fraudulent, or pose a safety or security risk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">3. Acceptable use</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Do not misuse, disrupt, or attempt to gain unauthorised access to the Service.</li>
              <li>Do not submit unlawful, infringing, or harmful content.</li>
              <li>Use the Service only for legitimate vehicle sales and servicing purposes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">4. Intellectual property</h2>
            <p className="mt-3">
              The Service, the Raymond Gray name, logo, and content are owned by Raymond Gray Limited and its
              licensors. You may not copy, modify, or redistribute them without permission. Content you submit remains
              yours; you grant us the rights needed to operate the Service and deliver your work.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">5. Disclaimers &amp; liability</h2>
            <p className="mt-3">
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind to the fullest extent
              permitted by law. To the maximum extent permitted by law, Raymond Gray Limited is not liable for indirect
              or consequential losses arising from use of the Service. Nothing in these Terms limits liability that
              cannot be limited under applicable law. Specific service and workmanship warranties (where offered) are
              set out in your separate service agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">6. Termination</h2>
            <p className="mt-3">
              You may stop using the Service at any time. We may suspend or end access if these Terms are breached or to
              protect the Service or its users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">7. Governing law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the Republic of Ghana, and disputes are subject to the
              jurisdiction of its courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">8. Changes</h2>
            <p className="mt-3">
              We may update these Terms. Continued use after changes take effect constitutes acceptance of the revised
              Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">9. Contact</h2>
            <p className="mt-3">
              <a className="text-rg-accent underline" href="mailto:automechanic@raymond-gray.org">
                automechanic@raymond-gray.org
              </a>{" "}
              — Raymond Gray Limited, Accra, Ghana.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
