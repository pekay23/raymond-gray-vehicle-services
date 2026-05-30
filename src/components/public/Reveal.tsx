"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  variant?: "fade" | "clip" | "line" | "img";
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = "fade",
  delay = 0,
  className,
  triggerOnce = false,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) observer.unobserve(entry.target);
        } else if (!triggerOnce) {
          // Directional logic: Only reset to hidden if it exits BELOW the viewport
          // If it leaves via the top, boundingClientRect.top will be negative, so we leave it revealed.
          if (entry.boundingClientRect.top > 0) {
            setIsRevealed(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [triggerOnce]);

  const variantMap = {
    fade: "r-fade",
    clip: "r-clip",
    line: "r-line",
    img: "r-img",
  };

  return (
    <div
      ref={ref}
      className={cn(variantMap[variant], isRevealed && "is-revealed", variant === "img" && "relative", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
