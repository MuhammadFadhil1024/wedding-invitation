"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BatikBackground } from "@/components/ui/BatikBackground";

interface HeroBackgroundProps {
  heroImage: string;
}

export function HeroBackground({ heroImage }: HeroBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 40]);

  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ y }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      {/* Overlay --arang 55% */}
      <div className="absolute inset-0 bg-[--arang]/55" aria-hidden="true" />
      {/* Optional: Batik Parang pattern overlay */}
      <BatikBackground
        variant="parang"
        opacity={0.08}
        strokeColor="#C9A24B"
        className="absolute inset-0"
      />
    </motion.div>
  );
}