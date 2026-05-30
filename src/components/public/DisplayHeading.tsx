import React from "react";
import { cn } from "@/lib/utils";

interface DisplayHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  className?: string;
  italic?: boolean;
  animate?: boolean;
}

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  children,
  as: Component = "h2",
  size = "lg",
  className,
  italic = false,
  animate = false,
}) => {
  const sizeClasses = {
    xl: "rg-display-xl",
    lg: "rg-display-lg",
    md: "rg-display-md",
    sm: "rg-display-sm",
    xs: "rg-display-xs",
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        italic && "italic font-light italic-font",
        animate && "r-fade",
        className
      )}
    >
      {children}
    </Component>
  );
};
