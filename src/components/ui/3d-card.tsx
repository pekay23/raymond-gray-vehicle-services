"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThreeDCard({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleInteraction = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    // Clamp the percentage to prevent over-rotation on touch drag
    const xPct = Math.max(-0.5, Math.min(0.5, mouseX / width - 0.5));
    const yPct = Math.max(-0.5, Math.min(0.5, mouseY / height - 0.5));
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleInteraction(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center perspective-[1000px]",
        containerClassName
      )}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative transition-all duration-200 ease-linear rounded-xl shadow-2xl",
          className
        )}
      >
        {/* Glossy Overlay */}
        <div className="absolute inset-0 z-50 pointer-events-none rounded-xl bg-linear-to-tr from-transparent via-white/10 to-white/30 opacity-0 transition-opacity group-hover:opacity-100 mix-blend-overlay" />
        
        {/* Content */}
        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
