"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { weddingConfig, WeddingEvent } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { formatIndonesianDate } from "@/lib/utils";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export function EventSection() {
  const { events } = weddingConfig;

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Save the Date
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-3">
          Rangkaian Acara
        </h2>
        <Ornament type="divider" className="mb-10 text-emas" />
      </Reveal>

      {/* Event Cards - Staggered Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {events.map((event: WeddingEvent, index: number) => {
          const dateFormatted = formatIndonesianDate(event.date);

          return (
            <Reveal
              key={event.id}
              delay={0.2 * (index + 1)}
              className="h-full"
            >
              <motion.div
                variants={cardVariants}
                className="relative group h-full"
              >
                <div className="relative glass-card h-full rounded-2xl border border-emas/40 overflow-hidden">
                  {/* Parang border motif on left side */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emas/60 via-gading/40 to-emas/60">
                    <div className="absolute inset-0 bg-[url('/patterns/parang.svg')] bg-left bg-repeat-y opacity-30" />
                  </div>

                  <div className="p-8 pl-12 relative flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-serif text-2xl text-arang font-medium mb-2">
                        {event.title}
                      </h3>
                      <Ornament type="divider" className="my-2 max-w-[150px] text-emas" />

                      {/* Date with calendar icon */}
                      <div className="flex items-center justify-center gap-2 text-sogan font-medium mt-4">
                        <svg className="w-4 h-4 text-emas" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{dateFormatted}</span>
                      </div>

                      {/* Time with clock icon */}
                      <div className="flex items-center justify-center gap-2 text-sogan/80 text-xs font-medium mt-1">
                        <svg className="w-4 h-4 text-emas" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.timeString}</span>
                      </div>

                      {/* Venue with location icon */}
                      <div className="my-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-emas" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="font-serif text-lg text-arang font-semibold">
                            {event.locationName}
                          </p>
                        </div>
                        <p className="text-xs text-sogan leading-relaxed max-w-xs mx-auto">
                          {event.address}
                        </p>
                      </div>
                    </div>

                    {/* Maps Button */}
                    <motion.a
                      href={event.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emas text-arang text-xs font-semibold tracking-wider shadow-sm cursor-pointer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="relative z-10">Buka Google Maps</span>
                      {/* Gold shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-emas/60 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: [-200, 200] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        style={{ pointerEvents: 'none' }}
                      />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </motion.div>
    </section>
  );
}
