"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { weddingConfig } from "@/config/wedding";
import { BatikBackground } from "@/components/ui/BatikBackground";
import { Ornament } from "@/components/ui/Ornament";

interface OpeningSectionProps {
  guestName: string;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameVariantsRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const ampVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const guestVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const borderVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function OpeningSection({ guestName }: OpeningSectionProps) {
  const batikRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  // Pause drift animation if reduced motion or performance issues
  useEffect(() => {
    if (batikRef.current && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-drift");
          } else {
            entry.target.classList.remove("animate-drift");
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(batikRef.current);
      return () => observer.disconnect();
    }
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      aria-label="Opening section"
    >
      {/* Batik Kawung Background (satu-satunya elemen yang ikut animasi drift) */}
      <div
        ref={batikRef}
        className="pointer-events-none absolute -inset-8 z-0 select-none"
        aria-hidden="true"
      >
        <BatikBackground
          opacity={0.08}
          strokeColor="#5B3A1E"
          variant="kawung"
          className="h-full w-full"
        >
          <div className="w-full h-full" />
        </BatikBackground>
      </div>

      {/* Top Border Ornament - Animated Stroke */}
      <div className="pointer-events-none absolute top-6 inset-x-0 z-10 flex justify-center px-32 sm:px-44">
        <svg
          className="w-full max-w-[360px] h-8 text-emas"
          viewBox="0 0 360 36"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M 2 18 H 358 M 2 18 Q 90 2 180 18 Q 270 34 358 18"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={borderVariants}
          />
        </svg>
      </div>

      {/* Bottom Border Ornament - Animated Stroke */}
      <div className="pointer-events-none absolute bottom-6 inset-x-0 z-10 flex justify-center px-32 sm:px-44">
        <svg
          className="w-full max-w-[360px] h-8 text-emas rotate-180"
          viewBox="0 0 360 36"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M 2 18 H 358 M 2 18 Q 90 2 180 18 Q 270 34 358 18"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={borderVariants}
          />
        </svg>
      </div>

      {/* Lotus flowers di keempat sudut - statis (tanpa motion), ukuran besar, mobile-first */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 sm:top-2 sm:left-2"
      >
        <Ornament
          type="lotus"
          position="top-left"
          className="h-32 w-32 text-maroon sm:h-40 sm:w-40"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-20 sm:top-2 sm:right-2"
      >
        <Ornament
          type="lotus"
          position="top-right"
          className="h-32 w-32 text-maroon sm:h-40 sm:w-40"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-20 sm:bottom-2 sm:left-2"
      >
        <Ornament
          type="lotus"
          position="bottom-left"
          className="h-24 w-24 text-maroon/80 sm:h-32 sm:w-32"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-20 sm:bottom-2 sm:right-2"
      >
        <Ornament
          type="lotus"
          position="bottom-right"
          className="h-24 w-24 text-maroon/80 sm:h-32 sm:w-32"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Opening Greeting - "Rahayu" / "Kanthi nyuwun pangestu" */}
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-emas font-semibold mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ delay: 0.1 }}
        >
          Rahayu
        </motion.p>

        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-emas font-semibold mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Kanthi nyuwun pangestu
        </motion.p>

        {/* Couple Names - Staggered Animation */}
        <div className="flex items-center justify-center gap-3" role="heading" aria-level={1}>
          {/* Groom's Name - from left */}
          <motion.span
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-arang tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={nameVariantsLeft}
            transition={{ delay: 0.3 }}
          >
            {weddingConfig.groom.name}
          </motion.span>

          {/* Ampersand - scale animation */}
          <motion.span
            className="font-script text-5xl md:text-7xl lg:text-8xl text-emas font-light"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ampVariants}
            transition={{ delay: 0.45 }}
          >
            &
          </motion.span>

          {/* Bride's Name - from right */}
          <motion.span
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-arang tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={nameVariantsRight}
            transition={{ delay: 0.3 }}
          >
            {weddingConfig.bride.name}
          </motion.span>
        </div>

        {/* Guest Name in Frame - Fade up with delay */}
        <motion.div
          className="mt-8 glass-card px-6 py-3 rounded-full border border-emas/40 shadow-sm inline-flex items-center gap-2 mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={guestVariants}
          transition={{ delay: 0.7 }}
        >
          <span className="text-xs uppercase tracking-wider text-sogan font-medium">
            Spesial untuk:
          </span>
          <span className="font-semibold text-arang text-sm">{guestName}</span>
        </motion.div>

        {/* Short Invitation Sentence */}
        <motion.p
          className="mt-6 text-base md:text-lg text-sogan italic font-serif max-w-xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ delay: 0.9 }}
        >
          Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri
          momen bahagia kami dalam ikatan suci pernikahan.
        </motion.p>
      </div>
    </section>
  );
}
