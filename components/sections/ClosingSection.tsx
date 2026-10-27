"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { BatikBackground } from "@/components/ui/BatikBackground";

export function ClosingSection() {
  return (
    <footer className="relative py-24 px-6 text-center overflow-hidden bg-maroon text-gading border-t border-emas/40">
      <BatikBackground opacity={0.06} strokeColor="#C9A24B" className="absolute inset-0">
        <div className="relative z-10 max-w-lg mx-auto">
          <Reveal>
            {/* Aksara Jawa Aksen Dekoratif */}
            <div className="mb-3 text-center">
              <span className="font-javanese text-2xl sm:text-3xl text-emas tracking-wider block drop-shadow-sm select-none">
                ꦩꦠꦸꦂ ꦤꦸꦮꦸꦤ꧀
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-gading/65 font-medium block mt-0.5">
                Matur Nuwun
              </span>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-emas font-semibold mb-3">
              Terima Kasih
            </p>
            <p className="text-xs md:text-sm text-gading/85 max-w-md mx-auto leading-relaxed mb-6">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
            </p>

            <p className="font-serif text-sm italic text-gading/75 mb-6">
              Kami yang berbahagia,
            </p>

            <h3 className="font-serif text-3xl md:text-4xl text-emas mb-3 font-normal">
              {weddingConfig.groom.name} & {weddingConfig.bride.name}
            </h3>
            <p className="text-xs text-gading/70">
              Beserta segenap keluarga besar kedua mempelai
            </p>

            <Ornament type="divider" className="my-8 text-emas" />

            <p className="text-[10px] text-gading/60 uppercase tracking-widest">
              Created with love &bull; 2026
            </p>
          </Reveal>
        </div>
      </BatikBackground>
    </footer>
  );
}
