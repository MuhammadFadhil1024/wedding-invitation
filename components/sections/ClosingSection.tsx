"use client";

import React from "react";
import { motion } from "motion/react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { BatikBackground } from "@/components/ui/BatikBackground";

export function ClosingSection() {
  return (
    <footer className="relative py-24 md:py-32 px-6 text-center overflow-hidden bg-maroon text-gading border-t border-emas/40">
      <BatikBackground opacity={0.06} strokeColor="#C9A24B" className="absolute inset-0">
        {/* Slowly rotating kembang melati ornaments at corners */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center center" }}
        >
          <Ornament type="melati" position="top-left" size={64} className="opacity-60" />
          <Ornament type="melati" position="top-right" size={64} className="opacity-60" />
          <Ornament type="melati" position="bottom-left" size={64} className="opacity-60" />
          <Ornament type="melati" position="bottom-right" size={64} className="opacity-60" />
        </motion.div>

        <div className="relative z-10 max-w-lg mx-auto mt-6 md:mt-16 mb-16 md:mb-16">
          <Reveal className="space-y-4">
            {/* Aksara Jawa Aksen Dekoratif */}
            <div className="mb-2 text-center">
              <span className="font-javanese text-2xl sm:text-3xl text-emas tracking-wider block drop-shadow-sm select-none">
                ꦩꦠꦸꦂ ꦤꦸꦮꦸꦤ꧀
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gading/65 font-medium block mt-0.5">
                Matur Nuwun
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.25em] text-emas font-semibold"
            >
              Terima Kasih
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs md:text-sm text-gading/85 max-w-md mx-auto leading-relaxed"
            >
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-sm italic text-gading/75"
            >
              Kami yang berbahagia,
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl md:text-4xl text-emas font-normal"
            >
              {weddingConfig.groom.name} & {weddingConfig.bride.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs text-gading/70"
            >
              Beserta segenap keluarga besar kedua mempelai
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="my-8"
            >
              <Ornament type="divider" className="text-emas" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] text-gading/60 uppercase tracking-widest"
            >
              Created with love &bull; 2026
            </motion.p>
          </Reveal>
        </div>
      </BatikBackground>
    </footer>
  );
}
