"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { formatIndonesianDate } from "@/lib/utils";

interface HeroSectionProps {
  guestName: string;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const weddingDateStr = formatIndonesianDate(weddingConfig.weddingDate);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      <Ornament type="corner" position="top-left" size={60} />
      <Ornament type="corner" position="top-right" size={60} />

      <Reveal delay={0.1}>
        <p className="text-xs uppercase tracking-[0.3em] text-emas font-semibold mb-3">
          The Wedding Celebration of
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <h1 className="font-serif text-5xl md:text-7xl font-normal text-arang tracking-tight mb-2">
          {weddingConfig.groom.name}{" "}
          <span className="font-script text-5xl md:text-7xl text-emas font-light mx-2">
            &
          </span>{" "}
          {weddingConfig.bride.name}
        </h1>
      </Reveal>

      <Reveal delay={0.4}>
        <Ornament type="divider" className="my-3 text-emas" />
      </Reveal>

      <Reveal delay={0.5}>
        <p className="font-serif text-lg md:text-xl text-sogan italic">
          {weddingDateStr}
        </p>
      </Reveal>

      <Reveal delay={0.65}>
        <div className="mt-8 glass-card px-6 py-3 rounded-full border border-emas/40 shadow-sm inline-flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-sogan font-medium">
            Spesial untuk:
          </span>
          <span className="font-semibold text-arang text-sm">{guestName}</span>
        </div>
      </Reveal>

      <Reveal delay={0.8} className="mt-12">
        <div className="flex flex-col items-center animate-bounce text-emas">
          <span className="text-[10px] tracking-widest uppercase mb-1">Scroll</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </Reveal>
    </section>
  );
}
