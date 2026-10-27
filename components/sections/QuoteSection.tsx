"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

export function QuoteSection() {
  const { quote } = weddingConfig;

  return (
    <section className="py-16 px-6 max-w-3xl mx-auto text-center relative">
      <Reveal>
        {quote.arabic && (
          <p
            dir="rtl"
            className="font-serif text-xl md:text-2xl leading-loose text-sogan mb-6 px-4"
          >
            {quote.arabic}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.2}>
        <p className="font-serif italic text-base md:text-lg text-arang leading-relaxed max-w-xl mx-auto">
          &ldquo;{quote.text}&rdquo;
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <Ornament type="divider" className="my-4 text-emas" />
      </Reveal>

      <Reveal delay={0.4}>
        <p className="text-xs uppercase tracking-widest font-semibold text-emas">
          — {quote.source} —
        </p>
      </Reveal>
    </section>
  );
}
