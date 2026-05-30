import React from "react";
import { cn } from "@/lib/utils";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "header" | "footer";
  padded?: boolean;
  maxWidth?: "default" | "full" | "narrow";
  variant?: "light" | "muted" | "warm" | "dark" | "transparent";
}

export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  className,
  id,
  as: Component = "section",
  padded = true,
  maxWidth = "default",
  variant = "light",
  ...rest
}) => {
  const variantClasses = {
    light: "bg-white text-rg-ink",
    muted: "bg-rg-muted text-rg-ink",
    warm: "bg-rg-warm text-rg-ink",
    dark: "bg-rg-invert-bg text-rg-invert-ink",
    transparent: "bg-transparent",
  };

  const widthClasses = {
    default: "rg-section",
    full: "w-full px-[var(--rg-pad-x)]",
    narrow: "max-w-5xl mx-auto px-[var(--rg-pad-x)]",
  };

  return (
    <Component
      id={id}
      className={cn(
        "rg-public relative",
        variantClasses[variant],
        padded ? widthClasses[maxWidth] : "w-full",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
