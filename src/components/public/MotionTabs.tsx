'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface MotionTab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface MotionTabsProps {
  tabs: MotionTab[];
  activeTab: string;
  onChange: (id: string) => void;
  layoutId?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Premium pill-style tabs with sliding indicators.
 * Optimized for Raymond Gray's editorial design system.
 */
export function MotionTabs({
  tabs,
  activeTab,
  onChange,
  layoutId = 'rg-active-pill',
  className,
  style,
}: MotionTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      role="tablist"
      onMouseLeave={() => setHoveredTab(null)}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full p-1 border border-rg-line max-w-full overflow-x-auto no-scrollbar',
        className
      )}
      style={{ background: 'var(--rg-bg-2)', ...style }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id && !isActive;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            className={cn(
              'relative flex items-center justify-center gap-2 rounded-full transition-colors duration-300 shrink-0 min-h-[44px]',
              isActive 
                ? 'text-rg-bg' 
                : 'text-rg-ink-soft hover:text-rg-ink'
            )}
            style={{ padding: '8px 20px' }}
          >
            {/* Hover Indicator */}
            {isHovered && (
              <motion.div
                layoutId={`${layoutId}-hover`}
                className="absolute inset-0 rounded-full bg-rg-ink/5"
                style={{ zIndex: 0 }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-rg-ink shadow-sm shadow-black/10"
                style={{ zIndex: 0 }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}

            {tab.icon && (
              <tab.icon
                className={cn(
                  'relative z-10 h-4 w-4 transition-colors',
                  isActive ? 'text-rg-bg' : 'text-rg-ink-mute'
                )}
                aria-hidden="true"
              />
            )}
            
            <span className="relative z-10 font-mono text-[10px] tracking-[0.1em] uppercase font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
