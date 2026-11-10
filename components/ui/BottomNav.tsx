"use client";

import React, { useCallback, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: "opening", label: "Pembukaan", icon: <OpeningIcon /> },
  { id: "hero", label: "Mempelai", icon: <CoupleIcon /> },
  { id: "quote", label: "Kutipan", icon: <QuoteIcon /> },
  { id: "couple", label: "Profil", icon: <ProfileIcon /> },
  { id: "events", label: "Acara", icon: <CalendarIcon /> },
  { id: "gift", label: "Hadiah", icon: <GiftIcon /> },
  { id: "wishes", label: "Ucapan", icon: <WishesIcon /> },
  { id: "closing", label: "Penutup", icon: <ClosingIcon /> },
];

function OpeningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function CoupleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V21c0 3 4 8 7 8z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V21c0 3 4 8 7 8z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function WishesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ClosingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

interface BottomNavProps {
  activeSection?: string;
  onSectionClick?: (id: string) => void;
  showLabels?: boolean;
}

export function BottomNav({ activeSection, onSectionClick, showLabels = false }: BottomNavProps) {
  // Use prop directly, fall back to first item
  const activeId = activeSection || NAV_ITEMS[0].id;

  const handleClick = useCallback((id: string) => {
    onSectionClick?.(id);
  }, [onSectionClick]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 md:pb-6 pointer-events-none"
      role="navigation"
      aria-label="Navigasi section"
    >
      <div className="mx-auto max-w-2xl pointer-events-auto">
        <div className="relative flex items-center justify-center gap-1 md:gap-2 p-2 bg-maroon/95 backdrop-blur-xl border border-emas/40 rounded-full shadow-2xl shadow-maroon/50">
          {/* Active indicator with layoutId */}
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute w-[calc(100%/8)] h-full rounded-full bg-emas/20 transition-all duration-300 ease-[0.22,1,0.36,1]"
            style={{ pointerEvents: "none" }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />

          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={cn(
                "relative z-10 flex flex-col items-center gap-1 px-3 py-2 min-w-[56px] transition-colors",
                activeId === item.id
                  ? "text-emas"
                  : "text-gading/60 hover:text-emas"
              )}
              aria-current={activeId === item.id ? "true" : "false"}
              aria-label={item.label}
              whileTap={{ scale: 0.9 }}
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              {showLabels && (
                <span className="text-[9px] uppercase tracking-wider font-medium leading-none">
                  {item.label}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// Scrollspy hook for auto-updating active section
export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: `-${offset}px 0px -${window.innerHeight - offset - 100}px 0px`,
          threshold: 0.1,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sectionIds, offset]);

  return activeSection;
}