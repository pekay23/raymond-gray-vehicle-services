"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SectionShell } from "@/components/public/SectionShell";
import { DisplayHeading } from "@/components/public/DisplayHeading";
import { Reveal } from "@/components/public/Reveal";
import { AdvancedFormContainer } from "@/components/public/AdvancedFormContainer";
import { FormLabel, Input, Textarea } from "@/components/public/FormElements";
import { Wrench, Car, ClipboardList, CheckCircle2, Truck, MessageCircle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { LocationPicker, type LocationData } from "@/components/location/LocationPicker";
import { DatePicker } from "@/components/ui/date-picker";

const SERVICE_TYPES = [
  { value: "A1", label: "A1 - Minor Service", desc: "Oil change & basic inspection" },
  { value: "A2", label: "A2 - Intermediate", desc: "A1 + brakes, fluids & belts" },
  { value: "B1", label: "B1 - Major Service", desc: "Full system overhaul" },
  { value: "B2", label: "B2 - Complete Plan", desc: "Maximum longevity suite" },
  { value: "Repairs", label: "General Repairs", desc: "Fault breakdown fixation" },
  { value: "Diagnostics", label: "Computer Scan", desc: "Electronic fault analysis" },
];

const STEPS = [
  { key: "vehicle", label: "Vehicle" },
  { key: "service", label: "Service" },
  { key: "logistics", label: "Logistics" },
  { key: "contact", label: "Contact" },
];

const initialFormData = {
  fullName: "",
  whatsappNumber: "",
  email: "",
  location: null as LocationData | null,
  vehicleMake: "",
  vehicleModel: "",
  regNumber: "",
  odometer: "",
  serviceType: "",
  description: "",
  preferredDate: "",
  bookingOption: "dropoff" as "dropoff" | "callout",
  agreed: false,
};

export default function VehicleBookingPage() {
  const [formData, setFormData] = useState(initialFormData);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [assignedJobId, setAssignedJobId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const lastStep = STEPS.length - 1;

  // Captured when the form mounts (not at submit). The booking API rejects
  // submissions made <3s after this timestamp as bots, so it must reflect the
  // real time the form was loaded — otherwise every genuine booking is silently
  // dropped.
  const formLoadedAt = useRef(0);
  const isMounted = useRef(false);

  useEffect(() => {
    formLoadedAt.current = Date.now();
    try {
      const saved = sessionStorage.getItem("rg_booking_form");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to restore form data", e);
    }
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      sessionStorage.setItem("rg_booking_form", JSON.stringify(formData));
    }
  }, [formData]);

  const isFormValid =
    formData.fullName &&
    formData.whatsappNumber &&
    formData.vehicleMake &&
    formData.vehicleModel &&
    formData.regNumber &&
    formData.serviceType &&
    formData.agreed;

  const stepValid = (s: number): boolean => {
    switch (s) {
      case 0:
        return Boolean(formData.vehicleMake && formData.vehicleModel && formData.regNumber);
      case 1:
        return Boolean(formData.serviceType);
      case 2:
        return true; // logistics has sensible defaults
      case 3:
        return Boolean(formData.fullName && formData.whatsappNumber && formData.agreed);
      default:
        return true;
    }
  };

  const generateWhatsAppLink = (id?: string) => {
    const baseUrl = "https://wa.me/233551010108";
    const text = `${id ? `*[JOB ID: ${id}]*\n` : ""}NEW VEHICLE BOOKING INITIATED:

*Client:* ${formData.fullName}
*Vehicle:* ${formData.vehicleMake} ${formData.vehicleModel} (${formData.regNumber})
*Package:* ${formData.serviceType}
*Booking Strategy:* ${formData.bookingOption === "callout" ? "Roadside / Home Call" : "Workshop Drop-off"}`;

    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e?: React.FormEvent, viaWhatsApp = false) => {
    if (e) e.preventDefault();
    if (!formData.agreed) return;
    setStatus("loading");

    try {
      const res = await fetch(`/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bookingOption: formData.bookingOption,
          location: formData.bookingOption === "callout" ? formData.location?.address || "" : "",
          latitude: formData.bookingOption === "callout" ? formData.location?.latitude : null,
          longitude: formData.bookingOption === "callout" ? formData.location?.longitude : null,
          formLoadedAt: formLoadedAt.current,
        }),
      });

      // The booking API may be unavailable in this standalone deployment (no /api
      // route here). Guard against non-JSON (e.g. a 404 HTML page) so we degrade
      // to the WhatsApp path instead of throwing a JSON parse error.
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : null;

      if (res.ok && data?.success) {
        sessionStorage.removeItem("rg_booking_form");
        setAssignedJobId(data.jobId);
        setStatus("success");
        if (viaWhatsApp) {
          window.open(generateWhatsAppLink(data.jobId), "_blank");
        }
      } else if (viaWhatsApp) {
        // No backend persisted the booking, but the user explicitly chose WhatsApp —
        // still hand them off so the lead isn't lost.
        sessionStorage.removeItem("rg_booking_form");
        setStatus("success");
        window.open(generateWhatsAppLink(), "_blank");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      // Network/parse failure: if they chose WhatsApp, let them through anyway.
      if (viaWhatsApp) {
        sessionStorage.removeItem("rg_booking_form");
        setStatus("success");
        window.open(generateWhatsAppLink(), "_blank");
      } else {
        setStatus("error");
      }
    }
  };

  // Form submit handler: advance through steps, submit on the last one.
  // Also handles the Enter key gracefully (won't submit mid-wizard).
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < lastStep) {
      if (stepValid(step)) setStep((s) => s + 1);
      return;
    }
    if (isFormValid) handleSubmit(e, false);
  };

  const goNext = () => {
    if (step < lastStep && stepValid(step)) setStep((s) => s + 1);
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <main className="rg-public relative">
      {/* SLIM BANNER HERO */}
      <section className="rg-page-hero min-h-[75vh]! flex! flex-col justify-end!">
        <div className="rg-hero-media" aria-hidden="true">
          <Image
            src="/images/redesign/book-hero.png"
            alt="Vehicle Servicing"
            fill
            priority
            className="object-cover saturate-0"
          />
        </div>

        <div className="relative z-10 w-full">
          <Reveal delay={100}>
            <span className="rg-eyebrow text-white/70 mb-4"><span className="num">Book</span>Automotive Programme</span>
          </Reveal>
          <Reveal variant="line" delay={300}>
            <DisplayHeading as="h1" size="xl" className="text-white font-light tracking-tight drop-shadow-md">
              Secure a <em>Servicing</em> Slot.
            </DisplayHeading>
          </Reveal>
        </div>
      </section>

      {/* MAIN BOOKING LAYER */}
      <SectionShell className="py-20 bg-rg-bg-2" data-screen-label="Booking Details">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start max-w-7xl mx-auto">

          {/* LEFT: Informational Tiers */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32">
            <Reveal>
              <div>
                <DisplayHeading as="h2" size="lg" className="mb-6 text-rg-ink">Structured Maintenance.</DisplayHeading>
                <p className="text-rg-ink-soft leading-relaxed font-medium text-sm">
                  Select your framework below. If you aren&apos;t sure, choose <strong>Diagnostics</strong> for a comprehensive machine-scan and physical assessment report.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rg-line border border-rg-line shadow-sm">
                {SERVICE_TYPES.map((t) => (
                  <div key={t.value} className="bg-white p-6 flex flex-col gap-2 hover:bg-rg-accent/2 transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rg-accent tracking-wider">{t.value}</span>
                      <Wrench className="w-3.5 h-3.5 text-rg-ink-mute group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                    <span className="text-sm font-bold text-rg-ink">{t.label}</span>
                    <p className="text-xs text-rg-ink-soft leading-relaxed m-0 font-medium">{t.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="bg-white border border-rg-line p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-rg-bg-2 flex items-center justify-center shrink-0 rounded-sm border border-rg-line">
                  <ClipboardList className="w-5 h-5 text-rg-ink" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rg-ink mb-1">Quotes &amp; Authorization</h4>
                  <p className="text-xs text-rg-ink-soft leading-relaxed m-0">
                    Submitting this form initiates a work order draft. A fully costed quote itemising parts
                    and labour is dispatched via WhatsApp/Email before any work begins.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-rg-bg border border-rg-line p-6">
                <h4 className="text-sm font-bold text-rg-ink mb-3">Good to know</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-rg-ink-soft leading-relaxed m-0">
                  <li>Quotes are valid for 7 days</li>
                  <li>Parts pricing may vary based on availability</li>
                  <li>Major repairs may require an in-person assessment</li>
                  <li>Emergency breakdowns: WhatsApp us directly for priority response</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Multi-step booking wizard */}
          <div className="w-full">
            <AdvancedFormContainer
              title="Book Your Service"
              eyebrow="Service Form"
              subtitle="Enter vehicle details to book a slot with our technicians."
              status={status}
              resetStatus={() => {
                setStatus("idle");
                setStep(0);
              }}
              submitDisabled={!isFormValid}
              submitLabel="Confirm Booking"
              onSubmit={handleFormSubmit}
              successTitle="Booking Received!"
              successMessage={`Your request is being processed${assignedJobId ? `. Secure reference: ${assignedJobId}` : ""}. We'll contact you shortly with a cost estimate — or message us on WhatsApp to confirm right away.`}
              errorText="We couldn't submit the form right now. Please use “Book via WhatsApp” below, or email automechanic@raymond-gray.org."
              progress={
                <ol className="flex items-center gap-2 list-none p-0 m-0" aria-label="Booking progress">
                  {STEPS.map((s, i) => {
                    const done = i < step;
                    const current = i === step;
                    return (
                      <li key={s.key} className="flex items-center gap-2 flex-1 last:flex-none">
                        <button
                          type="button"
                          onClick={() => (i <= step ? setStep(i) : undefined)}
                          disabled={i > step}
                          aria-current={current ? "step" : undefined}
                          className={`flex items-center gap-2 whitespace-nowrap transition-colors ${i > step ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-colors ${
                              done
                                ? "bg-rg-accent border-rg-accent text-rg-accent-ink"
                                : current
                                ? "bg-rg-ink border-rg-ink text-white"
                                : "bg-white border-rg-line text-rg-ink-mute"
                            }`}
                          >
                            {done ? <Check className="w-3 h-3" /> : i + 1}
                          </span>
                          <span className={`text-[11px] font-mono uppercase tracking-wider hidden sm:inline ${current ? "text-rg-ink font-bold" : "text-rg-ink-mute"}`}>
                            {s.label}
                          </span>
                        </button>
                        {i < STEPS.length - 1 && <span className={`h-px flex-1 ${done ? "bg-rg-accent" : "bg-rg-line"}`} />}
                      </li>
                    );
                  })}
                </ol>
              }
              footer={
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="rg-btn rg-btn-outline justify-center px-6"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                    {step < lastStep ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!stepValid(step)}
                        className="rg-btn rg-btn-filled flex-1 justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "loading" || !isFormValid}
                        className="rg-btn rg-btn-filled flex-1 justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? "Processing Securely..." : "Confirm Booking"} <span>→</span>
                      </button>
                    )}
                  </div>

                  {step === lastStep && (
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, true)}
                      disabled={status === "loading" || !isFormValid}
                      className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono tracking-widest uppercase border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 transition-colors disabled:opacity-50 font-bold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Book via WhatsApp Instead
                    </button>
                  )}
                </div>
              }
            >
              {/* STEP 0 — Vehicle */}
              {step === 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold flex items-center gap-2 mb-6">
                    <Car className="w-3.5 h-3.5" /> Vehicle Details
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormLabel label="Car Brand / Make" required>
                      <Input name="vehicleMake" value={formData.vehicleMake} onChange={handleChange} placeholder="e.g. Toyota, Mercedes" required />
                    </FormLabel>
                    <FormLabel label="Car Model" required>
                      <Input name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} placeholder="e.g. Camry, GLK" required />
                    </FormLabel>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormLabel label="Number Plate" required>
                      <Input name="regNumber" value={formData.regNumber} onChange={handleChange} placeholder="e.g. GR-XXXX-25" required />
                    </FormLabel>
                    <FormLabel label="Current Odometer">
                      <Input 
                        name="odometer" 
                        value={formData.odometer} 
                        onChange={handleChange} 
                        placeholder="e.g. 45,000" 
                        endAdornment={
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-rg-ink-mute">KM / MILES</span>
                        }
                      />
                    </FormLabel>
                  </div>
                </div>
              )}

              {/* STEP 1 — Service */}
              {step === 1 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-4 block">
                    Maintenance Type
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {SERVICE_TYPES.map((tier) => (
                      <label
                        key={tier.value}
                        className={`flex flex-col gap-1 border cursor-pointer p-4 transition-all duration-300 select-none relative group
                          ${formData.serviceType === tier.value
                            ? "border-rg-ink bg-rg-ink text-white shadow-md scale-[1.02]"
                            : "border-rg-line bg-white text-rg-ink hover:border-rg-accent/50 hover:bg-rg-accent/2"}`}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={tier.value}
                          checked={formData.serviceType === tier.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className={`font-mono text-[10px] font-bold ${formData.serviceType === tier.value ? "text-rg-accent" : "text-rg-ink-mute"}`}>
                          {tier.value}
                        </span>
                        <span className="text-xs font-bold leading-tight">{tier.label}</span>
                        {formData.serviceType === tier.value && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle2 className="w-3 h-3 text-rg-accent" />
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                  <FormLabel label="Notes or Problems to fix">
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe faults, noises, sensor alerts, or custom scope requests..."
                    />
                  </FormLabel>
                </div>
              )}

              {/* STEP 2 — Logistics */}
              {step === 2 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-4 block">Service Strategy</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <label className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-300
                      ${formData.bookingOption === "dropoff" ? "border-rg-ink border-2 bg-rg-accent/3" : "border-rg-line bg-white hover:border-rg-ink-mute"}`}>
                      <input type="radio" name="bookingOption" value="dropoff" checked={formData.bookingOption === "dropoff"} onChange={handleChange} className="sr-only" />
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${formData.bookingOption === "dropoff" ? "bg-rg-ink text-white" : "bg-rg-bg-2 text-rg-ink-mute"}`}>
                        <Car className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-rg-ink">Workshop Visit</span>
                        <span className="text-[10px] text-rg-ink-soft font-medium font-mono uppercase tracking-wider">I will drop off</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-300
                      ${formData.bookingOption === "callout" ? "border-rg-ink border-2 bg-rg-accent/3" : "border-rg-line bg-white hover:border-rg-ink-mute"}`}>
                      <input type="radio" name="bookingOption" value="callout" checked={formData.bookingOption === "callout"} onChange={handleChange} className="sr-only" />
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${formData.bookingOption === "callout" ? "bg-rg-ink text-white" : "bg-rg-bg-2 text-rg-ink-mute"}`}>
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-rg-ink">Home Call / Towing</span>
                        <span className="text-[10px] text-rg-ink-soft font-medium font-mono uppercase tracking-wider">Pick up my car</span>
                      </div>
                    </label>
                  </div>

                  {formData.bookingOption === "callout" && (
                    <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="bg-rg-bg-2 border border-rg-line p-2">
                        <LocationPicker
                          value={formData.location}
                          onChange={(loc) => setFormData({ ...formData, location: loc })}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    <DatePicker
                      value={formData.preferredDate}
                      onChange={(val) => setFormData({ ...formData, preferredDate: val })}
                      label="Preferred Booking Date"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3 — Contact + confirm */}
              {step === 3 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-4 block">Contact Details</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormLabel label="Full Name" required>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Entity or Individual" required />
                    </FormLabel>
                    <FormLabel label="WhatsApp Number" required>
                      <Input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="+233..." required />
                    </FormLabel>
                  </div>
                  <div className="mt-6">
                    <FormLabel label="Email Address">
                      <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="inbox@domain.com" />
                    </FormLabel>
                  </div>

                  {/* Review summary */}
                  <div className="mt-6 p-5 bg-rg-bg-2 border border-rg-line rounded-sm text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-rg-ink-mute block mb-3">Review</span>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 m-0">
                      <dt className="text-rg-ink-mute">Vehicle</dt>
                      <dd className="text-rg-ink font-medium m-0">{formData.vehicleMake} {formData.vehicleModel} {formData.regNumber && `(${formData.regNumber})`}</dd>
                      <dt className="text-rg-ink-mute">Service</dt>
                      <dd className="text-rg-ink font-medium m-0">{formData.serviceType || "—"}</dd>
                      <dt className="text-rg-ink-mute">Strategy</dt>
                      <dd className="text-rg-ink font-medium m-0">{formData.bookingOption === "callout" ? "Home Call / Towing" : "Workshop Visit"}</dd>
                    </dl>
                  </div>

                  <div className="mt-6 p-5 bg-rg-bg-2 border border-rg-line rounded-sm">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-3">
                      I understand and agree that:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-rg-ink-soft leading-relaxed">
                      <li>A detailed quote will be provided before any work begins</li>
                      <li>Parts and labour will be itemised in the quote</li>
                      <li>Work only proceeds after my written or WhatsApp approval</li>
                      <li>Diagnostics fees apply if no repair is authorised</li>
                    </ul>
                    <label htmlFor="agreed" className="flex items-center gap-3 mt-4 pt-4 border-t border-rg-line cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="agreed"
                        name="agreed"
                        className="w-5 h-5 shrink-0 cursor-pointer accent-rg-ink"
                        checked={formData.agreed}
                        onChange={handleChange}
                        required
                      />
                      <span className="text-sm font-bold text-rg-ink">I agree to these terms</span>
                    </label>
                  </div>
                </div>
              )}
            </AdvancedFormContainer>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
