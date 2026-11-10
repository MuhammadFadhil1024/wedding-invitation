"use client";

import { motion } from "motion/react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { GapuraFrame } from "./GapuraFrame";

export function CoupleSection() {
  const { groom, bride } = weddingConfig;

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Maha Suci Allah
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-4">
          Pasangan Mempelai
        </h2>
        <p className="text-sm text-sogan max-w-md mx-auto leading-relaxed mb-12">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
          menyelenggarakan pernikahan kami:
        </p>
      </Reveal>

      {/* Grid: mobile stacked, desktop side by side - 2 columns like EventSection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-center relative">
        {/* Mempelai Pria */}
        <Reveal delay={0.2} className="flex flex-col items-center">
          <GapuraFrame
            photo={groom.photo}
            name={groom.name}
            fullName={groom.fullName}
            father={groom.father}
            mother={groom.mother}
            instagram={groom.instagram}
            isGroom={true}
            delay={0.1}
          />
        </Reveal>

        {/* Mempelai Wanita */}
        <Reveal delay={0.4} className="flex flex-col items-center">
          <GapuraFrame
            photo={bride.photo}
            name={bride.name}
            fullName={bride.fullName}
            father={bride.father}
            mother={bride.mother}
            instagram={bride.instagram}
            isGroom={false}
            delay={0.1}
          />
        </Reveal>
      </div>

      {/* Mobile separator: & between stacked photos */}
      <div className="md:hidden flex items-center justify-center my-6">
        <Reveal delay={0.5}>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-emas/70" />
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
              className="font-script text-2xl text-emas"
            >
              &
            </motion.span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-emas/70" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.6} className="mt-10">
        <Ornament type="divider" className="text-emas" />
      </Reveal>
    </section>
  );
}
