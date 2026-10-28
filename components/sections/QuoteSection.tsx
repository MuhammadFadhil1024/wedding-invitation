"use client";

import React from "react";
import { weddingConfig } from "@/config/wedding";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

export function QuoteSection() {
  const { quote } = weddingConfig;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cornerVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-maroon">
      {/* Batik Kawung pattern overlay */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/patterns/kawung.svg')] bg-center bg-no-repeat" />
      </div>

      {/* Corner ornaments with animation */}
      <motion.div
        className="absolute top-6 left-6"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Ornament type="corner" position="top-left" size={72} className="text-emas" />
      </motion.div>

      <motion.div
        className="absolute top-6 right-6"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Ornament type="corner" position="top-right" size={72} className="text-emas" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-6"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Ornament type="corner" position="bottom-left" size={72} className="text-emas" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6"
        variants={cornerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Ornament type="corner" position="bottom-right" size={72} className="text-emas" />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Arabic quote (if present) */}
          {quote.arabic && (
            <motion.p
              variants={itemVariants}
              dir="rtl"
              className="font-serif text-xl md:text-2xl leading-loose text-gading mb-6 px-4"
            >
              {quote.arabic}
            </motion.p>
          )}

          {/* Main quote with large gold quote marks */}
          <motion.div
            variants={itemVariants}
            className="relative inline-block py-4"
          >
            {/* Opening quote mark - large gold ornament */}
            <Ornament type="divider" className="absolute -top-10 left-1/2 -translate-x-1/2 text-emas/60 transform scale-150" />
            
            <motion.p
              className="font-serif italic text-base md:text-lg text-gading leading-relaxed max-w-xl mx-auto px-4 relative z-10"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
            >
              &ldquo;{quote.text}&rdquo;
            </motion.p>
            
            {/* Closing quote mark */}
            <Ornament type="divider" className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-emas/60 transform scale-150 rotate-180" />
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants}>
            <Ornament type="divider" className="my-4 text-emas" />
          </motion.div>

          {/* Source */}
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-widest font-semibold text-emas"
          >
            — {quote.source} —
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
