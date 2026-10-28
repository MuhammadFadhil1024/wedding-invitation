import React from "react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { formatIndonesianDate } from "@/lib/utils";
import { Countdown } from "@/components/ui/Countdown";
import { HeroBackground } from "@/components/ui/HeroBackground";

interface HeroSectionProps {
  guestName: string;
}

function generateCalendarUrl(): string {
  const start = new Date(weddingConfig.weddingDate);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Pernikahan ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: `Acara pernikahan ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
    location: weddingConfig.events[0]?.locationName || "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function HeroSection({ guestName }: HeroSectionProps) {
  const weddingDateStr = formatIndonesianDate(weddingConfig.weddingDate);
  const calendarUrl = generateCalendarUrl();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Background: Cover photo with --arang 55% overlay + parallax */}
      <HeroBackground heroImage={weddingConfig.media.heroImage} />

      <Ornament
        type="corner"
        position="top-left"
        size={60}
        className="relative z-10"
      />
      <Ornament
        type="corner"
        position="top-right"
        size={60}
        className="relative z-10"
      />

      <Reveal delay={0.1} className="relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-emas font-semibold mb-3">
          The Wedding Celebration of
        </p>
      </Reveal>

      <Reveal delay={0.25} className="relative z-10">
        <h1 className="font-serif text-5xl md:text-7xl font-normal text-white tracking-tight mb-2">
          {weddingConfig.groom.name}{" "}
          <span className="font-script text-5xl md:text-7xl text-emas font-light mx-2">
            &
          </span>{" "}
          {weddingConfig.bride.name}
        </h1>
      </Reveal>

      <Reveal delay={0.4} className="relative z-10">
        <Ornament type="divider" className="my-3 text-emas" />
      </Reveal>

      <Reveal delay={0.5} className="relative z-10">
        <p className="font-serif text-lg md:text-xl text-gading-light italic">
          {weddingDateStr}
        </p>
      </Reveal>

      <Reveal delay={0.65} className="relative z-10">
        <div className="mt-8 glass-card px-6 py-3 rounded-full border border-emas/40 shadow-sm inline-flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-gading-light font-medium">
            Spesial untuk:
          </span>
          <span className="font-semibold text-white text-sm">{guestName}</span>
        </div>
      </Reveal>

      {/* Countdown Card - framed with gold border */}
      <Reveal delay={0.75} className="relative z-10 mt-10">
        <Countdown className="w-full max-w-md mx-auto" />
      </Reveal>

      {/* Save to Calendar Button */}
      <Reveal delay={0.9} className="relative z-10 mt-8">
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 glass-card px-6 py-3 rounded-full border border-emas/60 shadow-md hover:border-emas hover:shadow-lg hover:shadow-emas/20 transition-all duration-300 text-white font-medium text-sm"
        >
          <svg
            className="w-4 h-4 text-emas"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Simpan ke Kalender
        </a>
      </Reveal>

      <Reveal delay={1.0} className="relative z-10 mt-12">
        <div className="flex flex-col items-center animate-bounce text-emas">
          <span className="text-[10px] tracking-widest uppercase mb-1">Scroll</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
