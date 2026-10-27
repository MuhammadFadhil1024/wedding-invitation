"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig, type Variants } from "motion/react";
import { weddingConfig } from "@/config/wedding";
import { formatIndonesianDate } from "@/lib/utils";
import { Ornament } from "@/components/ui/Ornament";
import { BatikBackground } from "@/components/ui/BatikBackground";
import { OpeningSection } from "@/components/sections/OpeningSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { EventSection } from "@/components/sections/EventSection";
import { GiftSection } from "@/components/sections/GiftSection";
import { WishesSection } from "@/components/sections/WishesSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

interface InvitationProps {
  slug: string;
  guestName: string;
}

export function Invitation({ guestName }: InvitationProps) {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const weddingDateStr = formatIndonesianDate(weddingConfig.weddingDate);

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

  // Toggle audio playback
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
        });
    }
  };

  // Open invitation handler
  const handleOpenInvitation = () => {
    setOpened(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("User triggered audio play was prevented:", err);
        });
    }
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
        {/* Background Audio */}
        <audio
          ref={audioRef}
          src={weddingConfig.media.audio}
          loop
          preload="auto"
        />

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
              {/* Pola Kawung Samar di Latar Cover */}
              <BatikBackground
                opacity={0.06}
                strokeColor="#C9A24B"
                variant="kawung"
                className="absolute inset-0"
              >
                <div className="relative w-full h-full min-h-screen flex items-center justify-center p-3 sm:p-4">
                  {/* GERBANG KIRI (Gunungan / Sayap Gapura Kiri) */}
                  <motion.div
                    initial={{ x: 0 }}
                    exit={{
                      x: "-100%",
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
                    }}
                    className="absolute left-[-15%] sm:left-[-5%] lg:left-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 transform-gpu opacity-40 sm:opacity-75 lg:opacity-90"
                  >
                    <Ornament type="gunungan" size={240} />
                  </motion.div>

                  {/* GERBANG KANAN (Gunungan / Sayap Gapura Kanan) */}
                  <motion.div
                    initial={{ x: 0 }}
                    exit={{
                      x: "100%",
                      opacity: 0,
                      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
                    }}
                    className="absolute right-[-15%] sm:right-[-5%] lg:right-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 transform-gpu opacity-40 sm:opacity-75 lg:opacity-90"
                  >
                    <Ornament type="gunungan" size={240} flip={true} />
                  </motion.div>

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
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-3 transform-gpu select-none"
                    >
                      <Ornament type="gunungan" size={88} className="drop-shadow-lg" />
                    </motion.div>

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
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Buka Undangan</span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </BatikBackground>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. FLOATING MUSIC TOGGLE BUTTON */}
        {opened && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            type="button"
            onClick={toggleAudio}
            aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-maroon border border-emas/60 shadow-xl flex items-center justify-center text-emas hover:text-emas-light hover:bg-maroon-dark transition-all cursor-pointer"
          >
            {isPlaying ? (
              <div className="relative flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full border border-emas animate-ping opacity-30" />
                <svg
                  className="w-5 h-5 animate-[spin_6s_linear_infinite]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path strokeLinecap="round" d="M12 3v3" strokeWidth="2" />
                </svg>
              </div>
            ) : (
              <svg
                className="w-5 h-5 text-emas/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            )}
          </motion.button>
        )}

        {/* 3. MAIN INVITATION CONTENT (Latar Utama: --gading #F5EBD7, Batik Sogan: #5B3A1E) */}
        <BatikBackground opacity={0.06} strokeColor="#5B3A1E" variant="kawung">
          <div className="max-w-2xl mx-auto shadow-2xl bg-gading/80 backdrop-blur-sm min-h-screen border-x border-emas/25">
            <OpeningSection guestName={guestName} />
            <HeroSection guestName={guestName} />
            <QuoteSection />
            <CoupleSection />
            <EventSection />
            <GiftSection />
            <WishesSection guestName={guestName} />
            <ClosingSection />
          </div>
        </BatikBackground>
      </main>
    </MotionConfig>
  );
}
