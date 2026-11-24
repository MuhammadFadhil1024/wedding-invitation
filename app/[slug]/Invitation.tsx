"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig, type Variants } from "motion/react";
import { weddingConfig } from "@/config/wedding";
import { Ornament } from "@/components/ui/Ornament";
import { BatikBackground } from "@/components/ui/BatikBackground";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { BottomNav, useScrollSpy } from "@/components/ui/BottomNav";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { EventSection } from "@/components/sections/EventSection";
import { GiftSection } from "@/components/sections/GiftSection";
import { UcapanSection } from "@/components/sections/Ucapan";
import { ClosingSection } from "@/components/sections/ClosingSection";

interface InvitationProps {
  slug: string;
  guestName: string;
}

export function Invitation({ guestName }: InvitationProps) {
  const [opened, setOpened] = useState(false);

  // Section IDs for scrollspy
  const sectionIds = [
    "opening",
    "hero",
    "quote",
    "couple",
    "events",
    "gift",
    "wishes",
    "closing",
  ];

  // Auto-detect active section on scroll
  const activeSection = useScrollSpy(sectionIds, 120);

  // Kunci scroll saat cover aktif & unlock saat cover dibuka
  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Scroll langsung ke paling atas saat dibuka
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  // Open invitation handler
  const handleOpenInvitation = () => {
    setOpened(true);
  };

  // Motion variants untuk stagger masuk teks di cover
  const containerStaggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35,
      },
    },
  };

  const itemFadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionConfig>
      <main className="relative min-h-screen bg-gading text-sogan overflow-x-hidden selection:bg-emas selection:text-arang">
        {/* 1. COVER OVERLAY (Layar Buka Undangan) */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              key="cover-overlay"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-gradient-to-b from-maroon via-[#451419] to-maroon-dark text-center overflow-hidden touch-none"
            >
              {/* Solid maroon gradient background - no batik pattern */}
                <div className="relative w-full h-full min-h-screen flex items-center justify-center p-3 sm:p-4">
                  {/* GERBANG KIRI (Gunungan / Sayap Gapura Kiri) */}
                  {/* <motion.div
                    initial={{ x: 0 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
                    }}
                    className="absolute left-[-15%] sm:left-[-5%] lg:left-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 transform-gpu opacity-40 sm:opacity-75 lg:opacity-90"
                  >
                    <Ornament type="gunungan" size={240} />
                  </motion.div> */}

                  {/* GERBANG KANAN (Gunungan / Sayap Gapura Kanan) */}
                  {/* <motion.div
                    initial={{ x: 0 }}
                    exit={{
                      x: "100%",
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
                    }}
                    className="absolute right-[-15%] sm:right-[-5%] lg:right-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 transform-gpu opacity-40 sm:opacity-75 lg:opacity-90"
                  >
                    <Ornament type="gunungan" size={240} flip={true} />
                  </motion.div> */}

                  {/* KARTU TENGAH COVER */}
                  <motion.div
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 1.05,
                      opacity: 0,
                      transition: { duration: 0.8, ease: "easeIn" },
                    }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative glass-card-dark max-w-sm sm:max-w-md w-full py-8 px-6 sm:py-10 sm:px-8 rounded-3xl border border-emas/40 shadow-2xl flex flex-col items-center z-20 backdrop-blur-xl"
                  >
                    {/* Ornamen Kembang Melati Melayang Pelan (Idle Motion 6s loop) */}
                    <motion.div
                      animate={{
                        y: [-5, 5, -5],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <Ornament type="melati" position="top-left" size={46} />
                      <Ornament type="melati" position="top-right" size={46} />
                      <Ornament type="melati" position="bottom-left" size={46} />
                      <Ornament type="melati" position="bottom-right" size={46} />
                    </motion.div>

                    {/* GUNUNGAN DI TENGAH ATAS (Motion Masuk: y: 40 -> 0, 1.2s) */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-3 transform-gpu select-none"
                    >
                      <Ornament type="gunungan" size={88} className="drop-shadow-lg" />
                    </motion.div> */}

                    {/* TEKS DI TENGAH (Motion Masuk: Stagger 0.15s) */}
                    <motion.div
                      variants={containerStaggerVariants}
                      initial="hidden"
                      animate="visible"
                      className="w-full flex flex-col items-center"
                    >
                      {/* 1. Sugeng Rawuh (Aksara Jawa Dekoratif) */}
                      <motion.div
                        variants={itemFadeUpVariants}
                        className="mb-2 text-center"
                      >
                        <span className="font-javanese text-2xl sm:text-3xl text-emas tracking-wider block drop-shadow select-none">
                          ꦱꦸꦒꦼꦁ ꦫꦮꦸꦃ
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.35em] text-gading/65 font-medium block mt-0.5">
                          Sugeng Rawuh
                        </span>
                      </motion.div>

                      {/* 2. The Wedding of */}
                      <motion.p
                        variants={itemFadeUpVariants}
                        className="text-[11px] uppercase tracking-[0.32em] text-emas font-semibold mb-1"
                      >
                        The Wedding of
                      </motion.p>

                      {/* 3. Nama Panggilan Mempelai */}
                      <motion.h1
                        variants={itemFadeUpVariants}
                        className="font-serif text-3xl sm:text-5xl text-gading font-normal tracking-tight mb-2"
                      >
                        {weddingConfig.groom.name}{" "}
                        <span className="font-script text-4xl sm:text-5xl text-emas font-light mx-1">
                          &
                        </span>{" "}
                        {weddingConfig.bride.name}
                      </motion.h1>

                      <motion.div variants={itemFadeUpVariants} className="w-full">
                        <Ornament type="divider" className="my-2 text-emas" size={24} />
                      </motion.div>

                      {/* 4. Kepada Yth. & Nama Tamu */}
                      <motion.div
                        variants={itemFadeUpVariants}
                        className="w-full bg-maroon/75 backdrop-blur-md border border-emas/30 rounded-2xl p-4 sm:p-5 my-4 shadow-inner"
                      >
                        <p className="text-[11px] uppercase tracking-wider text-gading/75 mb-1">
                          Kepada Yth. Bapak/Ibu/Saudara/i:
                        </p>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-emas truncate px-2">
                          {guestName}
                        </h2>
                        <p className="text-[10px] text-gading/60 mt-1 italic">
                          *Mohon maaf bila ada kesalahan penulisan nama/gelar
                        </p>
                      </motion.div>

                      {/* 5. Tombol Buka Undangan (Idle Motion: Denyut Halus scale: 1 -> 1.03) */}
                      <motion.div variants={itemFadeUpVariants} className="mt-2">
                        <motion.button
                          type="button"
                          onClick={handleOpenInvitation}
                          animate={{
                            scale: [1, 1.035, 1],
                          }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emas via-emas-light to-emas text-arang font-bold text-xs tracking-widest uppercase shadow-lg shadow-emas/35 hover:shadow-emas/50 hover:shadow-xl transition-all cursor-pointer transform-gpu"
                        >
                          <svg
                            className="w-4 h-4 transition-transform group-hover:rotate-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Buka Undangan</span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. FLOATING MUSIC TOGGLE BUTTON */}
        {opened && (
          <MusicToggle
            audioSrc={weddingConfig.media.audio}
            initialVolume={0.6}
            autoPlayOnOpen={true}
          />
        )}

        {/* 3. MAIN INVITATION CONTENT (Latar Utama: --gading #F5EBD7, Batik Sogan: #5B3A1E) */}
        <BatikBackground opacity={0.06} strokeColor="#5B3A1E" variant="kawung">
          <div className="max-w-2xl mx-auto shadow-2xl bg-gading/80 backdrop-blur-sm min-h-screen border-x border-emas/25">
            <section id="opening"><OpeningSection guestName={guestName} /></section>
            <section id="hero"><HeroSection guestName={guestName} /></section>
            <section id="quote"><QuoteSection /></section>
            <section id="couple"><CoupleSection /></section>
            <section id="events"><EventSection /></section>
            <section id="gift"><GiftSection /></section>
            <section id="wishes"><UcapanSection guestName={guestName} /></section>
            <section id="closing"><ClosingSection /></section>
          </div>
        </BatikBackground>

        {/* 4. BOTTOM NAVIGATION (Hidden temporarily) */}
        {/* {opened && (
          <BottomNav activeSection={activeSection} onSectionClick={(id) => {
            const el = document.getElementById(id);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }} />
        )} */}
      </main>
    </MotionConfig>
  );
}
