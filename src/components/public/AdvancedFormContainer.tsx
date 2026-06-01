"use client";

import { ReactNode } from "react";
import React from "react";
import { Reveal, DisplayHeading } from "@/components/public";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

type AdvancedFormContainerProps = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  status: "idle" | "loading" | "success" | "error";
  onSubmit: (e: React.FormEvent) => void;
  resetStatus: () => void;
  children: ReactNode;
  submitLabel?: string;
  submitDisabled?: boolean;
  successTitle?: string;
  successMessage?: string;
  errorText?: string;
  /** Optional progress indicator rendered above the fields (e.g. wizard steps). */
  progress?: ReactNode;
  /** Optional footer that replaces the default submit button (e.g. wizard Back/Next). */
  footer?: ReactNode;
};

export function AdvancedFormContainer({
  title,
  eyebrow = "Direct Booking",
  subtitle,
  status,
  onSubmit,
  resetStatus,
  children,
  submitLabel = "Proceed & Submit",
  submitDisabled = false,
  successTitle = "Request Confirmed!",
  successMessage = "Your details have been received. A technician or dispatcher will be in touch.",
  errorText = "Something went wrong with the transmission. Please verify all fields and try again.",
  progress,
  footer,
}: AdvancedFormContainerProps) {
  return (
    <Reveal delay={300}>
      <div className="bg-white p-5 sm:p-[clamp(24px,4vw,60px)] shadow-[0_20px_60px_-25px_hsl(215_25%_27%/0.25)] border border-rg-line rounded-xl relative overflow-hidden">
        {/* Brand accent top-rail */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-rg-accent via-rg-accent-light to-rg-accent" />

        {/* Success Overlay with same styles */}
        {status === "success" ? (
          <div className="text-center py-20 min-h-[400px] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-linear-to-br from-rg-accent-subtle to-rg-accent/10 ring-1 ring-rg-accent/20 shadow-[0_12px_30px_-12px_var(--rg-accent)]">
              <CheckCircle className="w-11 h-11 text-rg-accent" />
            </div>
            <span className="rg-eyebrow"><span className="num">Logged</span>Success</span>
            <DisplayHeading as="h3" size="md" className="mt-4 mb-4 text-rg-ink">
              {successTitle}
            </DisplayHeading>
            <p className="text-rg-ink-soft text-sm max-w-sm mb-8 font-medium">
              {successMessage}
            </p>
            <button 
              type="button" 
              className="rg-btn rg-btn-outline mt-4 mx-auto flex items-center gap-2" 
              onClick={resetStatus}
            >
              Book Another
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            {/* Local Heading within Form Card */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-rg-accent animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-rg-accent font-bold">
                  {eyebrow}
                </span>
              </div>
              <DisplayHeading as="h2" size="lg" className="text-rg-ink leading-tight text-2xl md:text-3xl">
                {title}
              </DisplayHeading>
              {subtitle && (
                <p className="text-rg-ink-soft text-sm mt-3 leading-relaxed font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            <hr className="border-rg-line-soft" />

            {progress}

            {/* The Injected Custom Inputs */}
            <motion.div 
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {React.Children.map(children, (child, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>

            <hr className="border-rg-line-soft mt-4" />

            {/* Dynamic Footer Bar */}
            <div className="flex flex-col gap-4">
              {status === "error" && (
                <div className="p-4 bg-rg-destructive/5 border border-rg-destructive/20 text-rg-destructive text-xs font-medium rounded-lg flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-px" /> <span>{errorText}</span>
                </div>
              )}

              {footer ?? (
                <button
                  type="submit"
                  disabled={status === "loading" || submitDisabled}
                  className="rg-btn rg-btn-filled w-full justify-center py-4 text-base transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Processing Securely...
                    </>
                  ) : (
                    <>
                      {submitLabel} <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
              )}
              
            </div>
          </form>
        )}
      </div>
    </Reveal>
  );
}
