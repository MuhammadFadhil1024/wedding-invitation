"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

/* TODO: ganti aset final jika tersedia dari desainer */
interface BatikBackgroundProps {
  className?: string;
  opacity?: number;
  strokeColor?: string;
  variant?: "kawung" | "parang";
  children?: React.ReactNode;
}

export function BatikBackground({
  className,
  opacity = 0.07,
  strokeColor = "#5B3A1E",
  variant = "kawung",
  children,
}: BatikBackgroundProps) {
  const patternId = useId();

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        <defs>
          {variant === "kawung" ? (
            /* Motif Batik Kawung (Pola Berulang Halus untuk Latar) */
            <pattern
              id={patternId}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Center diamond & corner markers in emas */}
              <circle cx="40" cy="40" r="2.5" fill="#C9A24B" />
              <circle cx="0" cy="0" r="2.5" fill="#C9A24B" />
              <circle cx="80" cy="0" r="2.5" fill="#C9A24B" />
              <circle cx="0" cy="80" r="2.5" fill="#C9A24B" />
              <circle cx="80" cy="80" r="2.5" fill="#C9A24B" />

              {/* Kawung 4 intersecting ellipses around (40, 40) in Sogan */}
              <g stroke={strokeColor} strokeWidth="1.2" fill="none">
                {/* Vertical ellipse pair */}
                <ellipse cx="40" cy="25" rx="10" ry="15" />
                <ellipse cx="40" cy="55" rx="10" ry="15" />
                {/* Horizontal ellipse pair */}
                <ellipse cx="25" cy="40" rx="15" ry="10" />
                <ellipse cx="55" cy="40" rx="15" ry="10" />

                {/* Inner elliptical details */}
                <ellipse cx="40" cy="25" rx="5" ry="9" strokeWidth="0.8" strokeDasharray="2 2" stroke="#C9A24B" />
                <ellipse cx="40" cy="55" rx="5" ry="9" strokeWidth="0.8" strokeDasharray="2 2" stroke="#C9A24B" />
                <ellipse cx="25" cy="40" rx="9" ry="5" strokeWidth="0.8" strokeDasharray="2 2" stroke="#C9A24B" />
                <ellipse cx="55" cy="40" rx="9" ry="5" strokeWidth="0.8" strokeDasharray="2 2" stroke="#C9A24B" />

                {/* Corner Kawung loops connecting seamlessly */}
                <ellipse cx="0" cy="25" rx="10" ry="15" />
                <ellipse cx="0" cy="55" rx="10" ry="15" />
                <ellipse cx="80" cy="25" rx="10" ry="15" />
                <ellipse cx="80" cy="55" rx="10" ry="15" />

                <ellipse cx="25" cy="0" rx="15" ry="10" />
                <ellipse cx="55" cy="0" rx="15" ry="10" />
                <ellipse cx="25" cy="80" rx="15" ry="10" />
                <ellipse cx="55" cy="80" rx="15" ry="10" />

                {/* Central petal seeds */}
                <circle cx="40" cy="25" r="1.5" fill="#C9A24B" />
                <circle cx="40" cy="55" r="1.5" fill="#C9A24B" />
                <circle cx="25" cy="40" r="1.5" fill="#C9A24B" />
                <circle cx="55" cy="40" r="1.5" fill="#C9A24B" />
              </g>
            </pattern>
          ) : (
            /* Motif Batik Parang (Garis Diagonal Khas Parang Rusak) */
            <pattern
              id={patternId}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="80" y2="80" stroke="#C9A24B" strokeWidth="1.8" />
              <line x1="0" y1="40" x2="40" y2="80" stroke="#C9A24B" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="40" y1="0" x2="80" y2="40" stroke="#C9A24B" strokeWidth="0.8" strokeDasharray="3 3" />

              <path d="M 20 20 C 25 10, 35 15, 30 25 C 25 35, 35 35, 40 40" stroke={strokeColor} strokeWidth="1.8" fill="none" />
              <path d="M 60 60 C 65 50, 75 55, 70 65 C 65 75, 75 75, 80 80" stroke={strokeColor} strokeWidth="1.8" fill="none" />

              <polygon points="20,40 25,45 20,50 15,45" fill="#C9A24B" />
              <polygon points="60,0 65,5 60,10 55,5" fill="#C9A24B" />
              <polygon points="60,80 65,85 60,90 55,85" fill="#C9A24B" />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Content wrapper */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
