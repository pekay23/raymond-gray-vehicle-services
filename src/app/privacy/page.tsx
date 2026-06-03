import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy | Raymond Gray Vehicle Services",
  description:
    "How Raymond Gray Limited collects, uses, and protects personal information across its EV & Automotive Services website and booking.",
};

const UPDATED = "30 May 2026";

export default function PrivacyPage() {
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
      <section className="rg-legal-hero relative h-[42vh] min-h-[280px] w-full overflow-hidden flex items-end">
        <Image src="/images/redesign/webp/legal-hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-rg-invert-bg via-rg-invert-bg/70 to-rg-invert-bg/30" />
        <div className="relative z-10 mx-auto max-w-3xl w-full px-6 pb-12">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/70">Legal</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-white">Privacy Policy</h1>
          <p className="mt-3 text-sm text-white/60">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">

        <div className="rg-legal mt-10 space-y-8 text-rg-ink-soft">
          <p>
            Raymond Gray Limited (&ldquo;Raymond Gray&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides EV &amp;
            Automotive Services — independent vehicle sales, EV and ICE maintenance, fleet management, and charging
            infrastructure — and operates this website and its service-booking forms (together, the
            &ldquo;Service&rdquo;). This policy explains what personal information we collect, how we use it, and the
            choices you have. We are based in Accra, Ghana.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">1. Information we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Contact &amp; booking information</strong> — your name, email, phone number, and the vehicle,
                fleet, and service details you submit through enquiry and booking forms.
              </li>
              <li>
                <strong>Vehicle &amp; service information</strong> — make, model, registration, mileage, service
                history, and the work requested or performed, used to deliver and document maintenance.
              </li>
              <li>
                <strong>Location data</strong> — where you provide it (for example, a fleet site or collection
                address) to coordinate service, collection, or roadside support.
              </li>
              <li>
                <strong>Technical and usage data</strong> — IP address, device and browser information, and
                interactions with the Service, collected to operate, secure, and improve it.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">2. How we use information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>To respond to enquiries and schedule vehicle sales consultations and service bookings.</li>
              <li>To deliver, document, and report on maintenance, fleet management, and charging work you request.</li>
              <li>To communicate with you about bookings, service records, and account or service notices.</li>
              <li>To secure the Service, prevent abuse, and meet legal and contractual obligations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">3. Service providers</h2>
            <p className="mt-3">
              We share information only as needed with processors who help us run the Service, under appropriate
              safeguards (for example, hosting, email, and analytics providers). We do not sell your personal
              information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">4. Data retention</h2>
            <p className="mt-3">
              We keep personal information for as long as needed to provide the Service and maintain your vehicle
              service records, then for the period required to meet legal, accounting, or reporting obligations,
              after which it is deleted or anonymised.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">5. Security</h2>
            <p className="mt-3">
              Access is protected by access controls and encryption in transit. No method of transmission or storage
              is completely secure, but we work to protect your information using industry-standard measures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">6. Your rights</h2>
            <p className="mt-3">
              Subject to applicable law, you may request access to, correction of, or deletion of your personal
              information, and you may withdraw consent or object to certain processing. To make a request, contact us
              at the address below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">7. Cookies</h2>
            <p className="mt-3">
              We use strictly necessary cookies to operate the Service and limited analytics to understand usage. You
              can control cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">8. Children</h2>
            <p className="mt-3">The Service is intended for businesses and adults; it is not directed to children under 18.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">9. Changes</h2>
            <p className="mt-3">
              We may update this policy from time to time. Material changes will be posted here with a revised
              &ldquo;last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-rg-ink">10. Contact</h2>
            <p className="mt-3">
              Questions or requests:{" "}
              <a className="text-rg-accent underline" href="mailto:automechanic@raymond-gray.org">
                automechanic@raymond-gray.org
              </a>
              , Raymond Gray Limited, Accra, Ghana.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
