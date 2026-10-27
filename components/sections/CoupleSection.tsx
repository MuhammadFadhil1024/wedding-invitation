"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

/* TODO: ganti aset final jika foto mempelai telah tersedia */
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
        {/* Mempelai Pria dengan Frame Gapura / Kori */}
        <Reveal delay={0.2} className="flex flex-col items-center">
          <div className="relative w-52 h-72 md:w-56 md:h-80 mb-6 rounded-t-[5.5rem] rounded-b-2xl overflow-hidden glass-card border border-emas/40 shadow-lg p-2">
            {/* Foto / Placeholder dalam Gapura */}
            <div className="w-full h-full rounded-t-[5rem] rounded-b-xl bg-gradient-to-t from-gading-dark via-gading to-gading-light flex flex-col items-center justify-center relative overflow-hidden">
              <span className="font-serif text-6xl text-sogan/60 font-light select-none">
                {groom.name.charAt(0)}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sogan/60 mt-2 font-medium">
                Raden Arya
              </span>
            </div>
            {/* Ornamen Gapura Paduraksa Overlay */}
            <Ornament type="gapura" className="absolute inset-0" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-arang font-medium">
            {groom.fullName}
          </h3>
          <p className="text-xs text-emas font-semibold uppercase tracking-widest mt-1 mb-3">
            Mempelai Pria
          </p>

          <p className="text-sm text-sogan">
            Putra dari {groom.father} dan {groom.mother}
          </p>

          {groom.instagram && (
            <a
              href={`https://instagram.com/${groom.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-emas hover:text-emas-dark font-medium transition-colors"
            >
              <span>@{groom.instagram}</span>
            </a>
          )}
        </Reveal>

        {/* Mempelai Wanita dengan Frame Gapura / Kori */}
        <Reveal delay={0.4} className="flex flex-col items-center">
          <div className="relative w-52 h-72 md:w-56 md:h-80 mb-6 rounded-t-[5.5rem] rounded-b-2xl overflow-hidden glass-card border border-emas/40 shadow-lg p-2">
            <div className="w-full h-full rounded-t-[5rem] rounded-b-xl bg-gradient-to-t from-gading-dark via-gading to-gading-light flex flex-col items-center justify-center relative overflow-hidden">
              <span className="font-serif text-6xl text-sogan/60 font-light select-none">
                {bride.name.charAt(0)}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sogan/60 mt-2 font-medium">
                Sekar Larasati
              </span>
            </div>
            <Ornament type="gapura" className="absolute inset-0" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-arang font-medium">
            {bride.fullName}
          </h3>
          <p className="text-xs text-emas font-semibold uppercase tracking-widest mt-1 mb-3">
            Mempelai Wanita
          </p>

          <p className="text-sm text-sogan">
            Putri dari {bride.father} dan {bride.mother}
          </p>

          {bride.instagram && (
            <a
              href={`https://instagram.com/${bride.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-emas hover:text-emas-dark font-medium transition-colors"
            >
              <span>@{bride.instagram}</span>
            </a>
          )}
        </Reveal>
      </div>

      <Reveal delay={0.5} className="mt-14">
        <Ornament type="divider" className="text-emas" />
      </Reveal>
    </section>
  );
}
