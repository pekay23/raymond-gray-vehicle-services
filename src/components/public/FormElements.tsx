"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FormLabelProps {
  children: React.ReactNode;
  label: string;
  required?: boolean;
}

export const FormLabel = ({ children, label, required = false }: FormLabelProps) => {
  return (
    <div className="relative w-full group">
      {/* We intercept the children to inject state-aware floating label logic */}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Pass the label down to the child component so it can handle the floating logic internally
          return React.cloneElement(child as React.ReactElement<{ _label?: string; _required?: boolean }>, { _label: label, _required: required });
        }
        return child;
      })}
    </div>
  );
};

// Generic Floating Label
const FloatingLabel = ({ 
  label, 
  required, 
  isActive 
}: { 
  label: string; 
  required?: boolean; 
  isActive: boolean 
}) => (
  <label
    className={cn(
      "absolute left-4 px-1 bg-rg-bg-2 transition-all duration-200 pointer-events-none z-10 font-bold",
      isActive 
        ? "-top-2.5 text-[10px] text-rg-accent uppercase tracking-widest" 
        : "top-4 text-base text-rg-ink-mute/70 font-medium"
    )}
  >
    {label}
    {required && <span className="text-rg-accent ml-1">*</span>}
  </label>
);

// Modernized styled generic text input with floating label support
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { _label?: string, _required?: boolean, endAdornment?: React.ReactNode }>(
  ({ className = "", value, onChange, _label, _required, endAdornment, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    return (
      <div className="relative w-full group">
        {_label && <FloatingLabel label={_label} required={_required} isActive={isActive} />}
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium",
            "outline-none transition-all duration-300",
            "placeholder-transparent focus:placeholder-rg-ink-mute/50",
            "focus:border-rg-accent focus:ring-1 focus:ring-rg-accent/20 rounded-md",
            className
          )}
          {...props}
        />
        {endAdornment}
      </div>
    );
  }
);
Input.displayName = "Input";

// Textarea variation with floating label
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { _label?: string, _required?: boolean }>(
  ({ className = "", value, onChange, _label, _required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    return (
      <div className="relative w-full group">
        {_label && <FloatingLabel label={_label} required={_required} isActive={isActive} />}
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium",
            "outline-none transition-all duration-300 resize-none min-h-[110px]",
            "placeholder-transparent focus:placeholder-rg-ink-mute/50",
            "focus:border-rg-accent focus:ring-1 focus:ring-rg-accent/20 rounded-md",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// Modern styled select box drop component
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { options: {label: string, value: string}[], _label?: string, _required?: boolean }>(
  ({ className = "", options, value, onChange, _label, _required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    return (
      <div className="relative w-full group">
        {_label && <FloatingLabel label={_label} required={_required} isActive={isActive} />}
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full appearance-none bg-rg-bg-2 border border-rg-line p-4 text-base text-rg-ink font-medium",
            "outline-none transition-all duration-300 cursor-pointer",
            "focus:border-rg-accent focus:ring-1 focus:ring-rg-accent/20 rounded-md",
            className
          )}
          {...props}
        >
          <option value="" disabled className="text-rg-ink-mute bg-rg-bg-2"></option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="text-rg-ink bg-rg-bg-2">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-rg-ink-mute opacity-60 group-focus-within:text-rg-accent transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
