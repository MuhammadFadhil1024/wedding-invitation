"use client";

import React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { fadeUp, defaultViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  duration,
  className,
  viewport = defaultViewport,
  ...props
}: RevealProps) {
  // If custom delay or duration is supplied, merge with the variant's transition
  const customTransition = (delay || duration)
    ? {
        transition: {
          delay,
          ...(duration ? { duration } : {}),
        },
      }
    : undefined;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      custom={customTransition}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
