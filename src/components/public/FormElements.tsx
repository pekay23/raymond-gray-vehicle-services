"use client";

import React from "react";

// Simple, shared label wrapper ensuring matching alignment
export const FormLabel = ({ children, label, required = false }: { children: React.ReactNode, label: string, required?: boolean }) => (
  <div className="flex flex-col gap-2 w-full group">
    <label 
      className="font-mono text-[11px] tracking-widest uppercase text-rg-ink-mute group-focus-within:text-rg-accent transition-colors font-bold gap-x-1.5 leading-none min-h-[12px]"
      style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
    >
      <span>{label}</span>
      {required && <span className="text-rg-accent font-bold leading-none">*</span>}
    </label>
    {children}
  </div>
);

// Modernized styled generic text input
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium placeholder:text-rg-ink-mute/50 focus:border-rg-accent outline-none transition-all duration-300 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Textarea variation
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium placeholder:text-rg-ink-mute/50 focus:border-rg-accent outline-none transition-all duration-300 resize-none min-h-[110px] ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// Modern styled select box drop component
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { options: {label: string, value: string}[] }>(
  ({ className = "", options, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`w-full appearance-none bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium placeholder:text-rg-ink-mute/50 focus:border-rg-accent outline-none transition-all duration-300 cursor-pointer ${className}`}
          {...props}
        >
          <option value="" disabled className="text-rg-ink-mute bg-white">Select an Option...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="text-rg-ink bg-white">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-rg-ink-mute opacity-60 group-focus-within:text-rg-accent">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
