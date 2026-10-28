"use client";

import React, { useState, useEffect } from "react";
import { weddingConfig } from "@/config/wedding";
import { Ornament } from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

interface CountdownProps {
  className?: string;
  showLabels?: boolean;
}

export function Countdown({ className, showLabels = true }: CountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const target = new Date(weddingConfig.weddingDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Dinten", value: mounted ? timeLeft.days : 0, animate: false },
    { label: "Jam", value: mounted ? timeLeft.hours : 0, animate: false },
    { label: "Menit", value: mounted ? timeLeft.minutes : 0, animate: true },
    { label: "Detik", value: mounted ? timeLeft.seconds : 0, animate: true },
  ];

  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden border border-emas/40",
        className
      )}
    >
      <Ornament type="corner" position="top-left" size={32} />
      <Ornament type="corner" position="top-right" size={32} />
      <Ornament type="corner" position="bottom-left" size={32} />
      <Ornament type="corner" position="bottom-right" size={32} />

      {showLabels && (
        <p className="text-xs uppercase tracking-widest text-sogan font-semibold mb-4 text-center">
          Menuju Hari Bahagia
        </p>
      )}

      <div
        className="grid grid-cols-4 gap-3 text-center"
        suppressHydrationWarning
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gading-light border border-emas/40 rounded-xl p-2.5 flex flex-col items-center shadow-xs"
          >
            {item.animate ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={item.value}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  suppressHydrationWarning
                  className="font-serif text-2xl md:text-3xl font-bold text-arang"
                >
                  {String(item.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            ) : (
              <span
                suppressHydrationWarning
                className="font-serif text-2xl md:text-3xl font-bold text-arang"
              >
                {String(item.value).padStart(2, "0")}
              </span>
            )}
            {showLabels && (
              <span className="text-[10px] uppercase tracking-wider text-sogan mt-1 font-medium">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}