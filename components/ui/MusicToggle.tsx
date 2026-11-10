"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MusicToggleProps {
  audioSrc: string;
  initialVolume?: number;
  autoPlayOnOpen?: boolean;
}

export function MusicToggle({ audioSrc, initialVolume = 0.6, autoPlayOnOpen = true }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = initialVolume;
    audio.preload = "auto";
    audioRef.current = audio;

    // Handle audio events
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };

    const handleError = (e: Event) => {
      console.warn("Audio error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, [audioSrc, initialVolume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio play failed:", err);
      }
    }
  }, [isPlaying]);

  // Auto-play on mount when autoPlayOnOpen is true
  useEffect(() => {
    if (autoPlayOnOpen && audioRef.current) {
      audioRef.current.volume = initialVolume;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlayOnOpen, initialVolume]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      type="button"
      onClick={togglePlay}
      aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-maroon border border-emas/60 shadow-xl flex items-center justify-center text-emas hover:text-emas-light hover:bg-maroon-dark transition-all cursor-pointer"
      style={{ touchAction: "manipulation" }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Pulsing ring */}
            <motion.span
              className="absolute w-8 h-8 rounded-full border border-emas"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Rotating gamelan-style icon */}
            <motion.svg
              className="w-5 h-5"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
              <path strokeLinecap="round" d="M12 3v3" strokeWidth="2" />
              <path strokeLinecap="round" d="M12 18v3" strokeWidth="2" />
              <path strokeLinecap="round" d="M3 12h3" strokeWidth="2" />
              <path strokeLinecap="round" d="M18 12h3" strokeWidth="2" />
            </motion.svg>
          </motion.div>
        ) : (
          <motion.div
            key="paused"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}