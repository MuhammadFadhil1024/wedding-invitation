"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Ornament } from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";

interface GapuraFrameProps {
  photo?: string;
  name: string;
  fullName: string;
  father: string;
  mother: string;
  instagram?: string;
  isGroom: boolean;
  delay?: number;
}

const GENTLE_EASE = [0.22, 1, 0.36, 1] as const;

export function GapuraFrame({
  photo,
  name,
  fullName,
  father,
  mother,
  instagram,
  isGroom,
  delay = 0,
}: GapuraFrameProps) {
  const pathRef = React.useRef<SVGPathElement>(null);

  // Draw gold frame with stroke-dashoffset animation
  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 1s ease-out 0.3s";
      path.style.strokeDashoffset = "0";
    });
  }, []);

  const imageSizes = "(max-width: 768px) 208px, 224px";

  return (
    <motion.div
      initial={{ x: isGroom ? -40 : 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" as const, delay }}
      className="flex flex-col items-center w-full"
    >
      {/* Photo frame - responsive width to align with grid columns */}
      <div className="relative w-full max-w-[208px] md:max-w-[224px] aspect-[13/18] md:aspect-[14/20] mb-6 overflow-hidden mx-auto">
        {/* Gold stroke frame */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={`gapura-clip-${name}`}>
              <path d="M 0 0 L 100 0 L 100 85 L 50 100 L 0 85 Z" />
            </clipPath>
          </defs>
          <path
            ref={pathRef}
            d="M 0 0 L 100 0 L 100 85 L 50 100 L 0 85 Z"
            fill="none"
            stroke="var(--color-emas, #C9A24B)"
            strokeWidth="2"
            clipPath={`url(#gapura-clip-${name})`}
          />
        </svg>

        {/* Maroon inner background */}
        <div className="absolute inset-1 bg-maroon clip-[polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)]" />

        {/* Photo with zoom-out effect */}
        <motion.div
          className="relative w-full h-full overflow-hidden clip-[polygon(0_0,100%_0,100%_85%,50%_100%,0_85%)]"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: delay + 0.4 }}
        >
          {photo ? (
            <Image
              src={photo}
              alt={fullName}
              fill
              sizes={imageSizes}
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB//2Q=="
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-t from-gading-dark via-gading to-gading-light flex flex-col items-center justify-center">
              <span className="font-serif text-6xl text-sogan/60 font-light select-none">
                {name.charAt(0)}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-sogan/60 mt-2 font-medium">
                {name}
              </span>
            </div>
          )}
        </motion.div>

        {/* Paduraksa ornament overlay */}
        <Ornament type="gapura" className="absolute inset-0" />
      </div>

      {/* Name text - fade-up after photo */}
      <motion.h3
        className="font-serif text-2xl md:text-3xl text-arang font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: delay + 0.7 }}
      >
        {fullName}
      </motion.h3>

      {/* Role badge */}
      <motion.p
        className="text-xs text-emas font-semibold uppercase tracking-widest mt-1 mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: delay + 0.85 }}
      >
        {isGroom ? "Mempelai Pria" : "Mempelai Wanita"}
      </motion.p>

      {/* Parents text */}
      <motion.p
        className="text-sm text-sogan"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const, delay: delay + 1.0 }}
      >
        {isGroom ? "Putra dari" : "Putri dari"} {father} dan {mother}
      </motion.p>

      {/* Instagram link */}
      {instagram && (
        <motion.a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-emas hover:text-emas-light transition-colors mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const, delay: delay + 1.15 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>@{instagram}</span>
        </motion.a>
      )}
    </motion.div>
  );
}
