"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DisplayHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  className?: string;
  italic?: boolean;
  animate?: boolean;
}

const headingComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  span: motion.span,
  div: motion.div,
};

const sizeClasses = {
  xl: "rg-display-xl",
  lg: "rg-display-lg",
  md: "rg-display-md",
  sm: "rg-display-sm",
  xs: "rg-display-xs",
};

export const DisplayHeading: React.FC<DisplayHeadingProps> = ({
  children,
  as = "h2",
  size = "lg",
  className,
  italic = false,
  animate = false,
}) => {
  const Component = headingComponents[as];

  return (
    <Component
      className={cn(
        sizeClasses[size],
        italic && "italic font-light italic-font",
        className
      )}
      {...(animate
        ? {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-10%" },
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }
        : {})}
    >
      {children}
    </Component>
  );
};
