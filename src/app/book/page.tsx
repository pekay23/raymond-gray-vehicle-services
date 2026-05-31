"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionShell } from "@/components/public/SectionShell";
import { DisplayHeading } from "@/components/public/DisplayHeading";
import { Reveal } from "@/components/public/Reveal";
import { AdvancedFormContainer } from "@/components/public/AdvancedFormContainer";
import { FormLabel, Input, Textarea } from "@/components/public/FormElements";
import { Wrench, Car, ClipboardList, CheckCircle2, Truck, MessageCircle } from "lucide-react";
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

export default function VehicleBookingPage() {
  const [formData, setFormData] = useState({
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
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [assignedJobId, setAssignedJobId] = useState<string | null>(null);

  const isFormValid = 
    formData.fullName && 
    formData.whatsappNumber && 
    formData.vehicleMake && 
    formData.vehicleModel && 
    formData.regNumber && 
    formData.serviceType && 
    formData.agreed;

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/vehicle-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bookingOption: formData.bookingOption,
          location: formData.bookingOption === "callout" ? formData.location?.address || "" : "",
          latitude: formData.bookingOption === "callout" ? formData.location?.latitude : null,
          longitude: formData.bookingOption === "callout" ? formData.location?.longitude : null,
          formLoadedAt: Date.now(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAssignedJobId(data.jobId);
        setStatus("success");
        
        if (viaWhatsApp) {
          window.open(generateWhatsAppLink(data.jobId), "_blank");
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="rg-public relative">
      
      {/* SLIM BANNER HERO */}
      <section className="rg-page-hero min-h-[50vh]!">
        <div className="rg-hero-media" aria-hidden="true">
          <Image 
            src="/images/sections/automotive/disciplines-2.webp" 
            alt="Vehicle Servicing" 
            fill 
            priority 
            className="object-cover opacity-50 saturate-0" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0f14] via-[#0a0f14]/80 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <Reveal delay={100}>
            <span className="rg-eyebrow text-white/50 mb-4"><span className="num">Book</span>Automotive Programme</span>
          </Reveal>

          <Reveal variant="line" delay={300}>
            <DisplayHeading as="h1" size="xl" className="text-white font-light tracking-tight">
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

            {/* Matrix Grid */}
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
                  <h4 className="text-sm font-bold text-rg-ink mb-1">Quotes & Authorization</h4>
                  <p className="text-xs text-rg-ink-soft leading-relaxed m-0">
                    Submitting this form initiates a work order draft. A fully costed quote itemising parts 
                    and labor is dispatched via WhatsApp/Email before any wrenches hit the steel.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Automated Booking Intelligence */}
          <div className="w-full">
            <AdvancedFormContainer
              title="Book Your Service"
              eyebrow="Service Form"
              subtitle="Enter vehicle details to book a slot with our technicians."
              status={status}
              resetStatus={() => setStatus("idle")}
              submitDisabled={!isFormValid}
              submitLabel="Confirm Booking"
              onSubmit={(e) => handleSubmit(e, false)}
              successTitle="Booking Received!"
              successMessage={`Your request is being processed. Secure reference: ${assignedJobId || 'Pending'}. We will contact you shortly with a cost estimate.`}
            >
              
              {/* Tier 1: Asset Profile */}
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
                    <div className="relative">
                      <Input name="odometer" value={formData.odometer} onChange={handleChange} placeholder="e.g. 45,000" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-rg-ink-mute">KM / MILES</span>
                    </div>
                  </FormLabel>
                </div>
              </div>

              <hr className="border-rg-line-soft" />

              {/* Tier 2: Maintenance Configuration */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-4 block">
                  Maintenance Type
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {SERVICE_TYPES.map((tier) => (
                    <label 
                      key={tier.value}
                      className={`flex flex-col gap-1 border cursor-pointer p-4 transition-all duration-300 select-none relative group
                        ${formData.serviceType === tier.value 
                          ? 'border-rg-ink bg-rg-ink text-white shadow-md scale-[1.02]' 
                          : 'border-rg-line bg-white text-rg-ink hover:border-rg-accent/50 hover:bg-rg-accent/2'}`}
                    >
                      <input 
                        type="radio" 
                        name="serviceType" 
                        value={tier.value} 
                        checked={formData.serviceType === tier.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className={`font-mono text-[10px] font-bold ${formData.serviceType === tier.value ? 'text-rg-accent' : 'text-rg-ink-mute'}`}>
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

              <hr className="border-rg-line-soft" />

              {/* Logistics Strategy */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-rg-ink font-bold mb-4 block">Service Strategy</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <label className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-300
                    ${formData.bookingOption === 'dropoff' ? 'border-rg-ink border-2 bg-rg-accent/3' : 'border-rg-line bg-white hover:border-rg-ink-mute'}`}>
                    <input type="radio" name="bookingOption" value="dropoff" checked={formData.bookingOption === 'dropoff'} onChange={handleChange} className="sr-only" />
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${formData.bookingOption === 'dropoff' ? 'bg-rg-ink text-white' : 'bg-rg-bg-2 text-rg-ink-mute'}`}>
                      <Car className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-rg-ink">Workshop Visit</span>
                      <span className="text-[10px] text-rg-ink-soft font-medium font-mono uppercase tracking-wider">I will drop off</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 border p-5 cursor-pointer transition-all duration-300
                    ${formData.bookingOption === 'callout' ? 'border-rg-ink border-2 bg-rg-accent/3' : 'border-rg-line bg-white hover:border-rg-ink-mute'}`}>
                    <input type="radio" name="bookingOption" value="callout" checked={formData.bookingOption === 'callout'} onChange={handleChange} className="sr-only" />
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${formData.bookingOption === 'callout' ? 'bg-rg-ink text-white' : 'bg-rg-bg-2 text-rg-ink-mute'}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-rg-ink">Home Call / Towing</span>
                      <span className="text-[10px] text-rg-ink-soft font-medium font-mono uppercase tracking-wider">Pick up my car</span>
                    </div>
                  </label>
                </div>

                {/* Geographic Lock for Field Ops */}
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
                    onChange={(val) => setFormData({...formData, preferredDate: val})}
                    label="Preferred Booking Date"
                  />
                </div>
              </div>

              <hr className="border-rg-line-soft" />

              {/* Ownership Contacts */}
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
              </div>

              <div className="mt-4 p-5 bg-rg-bg-2 border border-rg-line rounded-sm flex items-start gap-4 cursor-pointer hover:bg-white hover:border-rg-ink/30 transition-all duration-300 select-none">
                <input 
                  type="checkbox" 
                  id="agreed"
                  name="agreed" 
                  className="mt-1.5 w-4 h-4 cursor-pointer accent-rg-ink" 
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreed" className="text-xs text-rg-ink-soft leading-relaxed cursor-pointer font-medium">
                  I acknowledge authorization dictates flow. Work only activates after static quote acceptance. Diagnostics carry isolated access fees if repair directive is subsequently declined.
                </label>
              </div>

              {/* WhatsApp Alternate Hook */}
              <div className="relative -mt-2">
                <button 
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={status === "loading" || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-mono tracking-widest uppercase border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 transition-colors disabled:opacity-50 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Book via WhatsApp Instead
                </button>
              </div>

            </AdvancedFormContainer>
          </div>

        </div>
      </SectionShell>

    </main>
  );
}
