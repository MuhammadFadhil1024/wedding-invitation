import type { Variants, Transition } from "motion/react";

export const defaultEase = [0.22, 1, 0.36, 1] as const;

export const defaultTransition: Transition = {
  duration: 0.8,
  ease: defaultEase,
};

export const defaultViewport = {
  once: true,
  margin: "-80px",
} as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const envelopeCoverVariants: Variants = {
  open: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 1.1,
      ease: [0.77, 0, 0.175, 1],
    },
    transitionEnd: {
      display: "none",
    },
  },
  closed: {
    y: 0,
    opacity: 1,
  },
};
