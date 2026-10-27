"use client";

import React, { useState, useEffect } from "react";
import { weddingConfig, WeddingEvent } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { formatIndonesianDate } from "@/lib/utils";

export function EventSection() {
  const { events, weddingDate } = weddingConfig;
  const [mounted, setMounted] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const target = new Date(weddingDate).getTime();

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
  }, [weddingDate]);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Save the Date
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-3">
          Rangkaian Acara
        </h2>
        <Ornament type="divider" className="mb-10 text-emas" />
      </Reveal>

      {/* Countdown Card */}
      <Reveal delay={0.2} className="mb-14">
        <div className="glass-card max-w-lg mx-auto p-6 rounded-2xl relative overflow-hidden border border-emas/40">
          <Ornament type="corner" position="top-left" size={32} />
          <Ornament type="corner" position="top-right" size={32} />
          <Ornament type="corner" position="bottom-left" size={32} />
          <Ornament type="corner" position="bottom-right" size={32} />

          <p className="text-xs uppercase tracking-widest text-sogan font-semibold mb-4">
            Menuju Hari Bahagia
          </p>

          <div
            className="grid grid-cols-4 gap-3 text-center"
            suppressHydrationWarning
          >
            {[
              { label: "Hari", value: mounted ? timeLeft.days : 0 },
              { label: "Jam", value: mounted ? timeLeft.hours : 0 },
              { label: "Menit", value: mounted ? timeLeft.minutes : 0 },
              { label: "Detik", value: mounted ? timeLeft.seconds : 0 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gading-light border border-emas/40 rounded-xl p-2.5 flex flex-col items-center shadow-xs"
              >
                <span
                  suppressHydrationWarning
                  className="font-serif text-2xl md:text-3xl font-bold text-arang"
                >
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-sogan mt-1 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        {events.map((event: WeddingEvent, index: number) => {
          const dateFormatted = formatIndonesianDate(event.date);

          return (
            <Reveal
              key={event.id}
              delay={0.2 * (index + 1)}
              className="h-full"
            >
              <div className="glass-card h-full p-8 rounded-2xl flex flex-col justify-between items-center relative border border-emas/40 hover:shadow-md transition-shadow">
                <Ornament type="corner" position="top-left" size={28} />
                <Ornament type="corner" position="bottom-right" size={28} />

                <div>
                  <h3 className="font-serif text-2xl text-arang font-medium mb-2">
                    {event.title}
                  </h3>
                  <Ornament type="divider" className="my-2 max-w-[150px] text-emas" />

                  <p className="font-semibold text-sogan text-sm mt-3">
                    {dateFormatted}
                  </p>
                  <p className="text-xs text-sogan/80 font-medium mt-1">
                    Pukul {event.timeString}
                  </p>

                  <div className="my-6">
                    <p className="font-serif text-lg text-arang font-semibold">
                      {event.locationName}
                    </p>
                    <p className="text-xs text-sogan mt-1 max-w-xs mx-auto leading-relaxed">
                      {event.address}
                    </p>
                  </div>
                </div>

                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emas hover:bg-emas-dark text-arang text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer"
                >
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Buka Google Maps</span>
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
