import React from "react";
import { cn } from "@/lib/utils";

/* TODO: ganti aset final jika tersedia dari desainer */
type OrnamentType = "divider" | "corner" | "gunungan" | "gapura" | "parang" | "flourish" | "melati";
type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface OrnamentProps {
  type?: OrnamentType;
  position?: CornerPosition;
  className?: string;
  size?: number;
  flip?: boolean;
}

export function Ornament({
  type = "divider",
  position = "top-left",
  className,
  size,
  flip = false,
}: OrnamentProps) {
  // 1. Pembatas Section (Garis Emas dengan Ornamen Tengah)
  if (type === "divider") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 w-full max-w-sm mx-auto py-3 text-emas select-none",
          className
        )}
      >
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-emas/70 to-emas" />
        <svg
          width={size || 32}
          height={size ? size * 0.75 : 24}
          viewBox="0 0 32 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-emas flex-shrink-0 animate-pulse duration-1000"
        >
          {/* Rhombus Medallion with Petals */}
          <path
            d="M 16 2 L 23 12 L 16 22 L 9 12 Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
          <circle cx="16" cy="12" r="2.5" fill="currentColor" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" />
          <circle cx="27" cy="12" r="1.5" fill="currentColor" />
        </svg>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-emas/70 to-emas" />
      </div>
    );
  }

  // 2. Kembang Setaman / Melati Hiasan Sudut
  if (type === "corner" || type === "melati") {
    const rotationMap: Record<CornerPosition, string> = {
      "top-left": "rotate-0 top-2 left-2",
      "top-right": "rotate-90 top-2 right-2",
      "bottom-right": "rotate-180 bottom-2 right-2",
      "bottom-left": "-rotate-90 bottom-2 left-2",
    };

    return (
      <div
        className={cn(
          "absolute pointer-events-none select-none text-emas/85 z-10",
          rotationMap[position],
          className
        )}
      >
        <svg
          width={size || 52}
          height={size || 52}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Border vines */}
          <path d="M 4 96 L 4 28 C 4 14, 14 4, 28 4 L 96 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M 12 96 L 12 32 C 12 20, 20 12, 32 12 L 96 12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />

          {/* Melati central bloom */}
          <g transform="translate(24, 24)">
            <circle cx="0" cy="0" r="3.5" fill="currentColor" />
            <ellipse cx="0" cy="-8" rx="3.5" ry="5" fill="currentColor" fillOpacity="0.8" />
            <ellipse cx="7.6" cy="-2.5" rx="3.5" ry="5" transform="rotate(72 7.6 -2.5)" fill="currentColor" fillOpacity="0.8" />
            <ellipse cx="4.7" cy="6.5" rx="3.5" ry="5" transform="rotate(144 4.7 6.5)" fill="currentColor" fillOpacity="0.8" />
            <ellipse cx="-4.7" cy="6.5" rx="3.5" ry="5" transform="rotate(216 -4.7 6.5)" fill="currentColor" fillOpacity="0.8" />
            <ellipse cx="-7.6" cy="-2.5" rx="3.5" ry="5" transform="rotate(288 -7.6 -2.5)" fill="currentColor" fillOpacity="0.8" />
          </g>

          {/* Buds & tendrils */}
          <circle cx="56" cy="4" r="2.5" fill="currentColor" />
          <path d="M 56 4 Q 68 0 78 4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="4" cy="56" r="2.5" fill="currentColor" />
          <path d="M 4 56 Q 0 68 4 78" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // 3. Gunungan Wayang (Pohon Hayat / Kayon)
  if (type === "gunungan") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center text-emas select-none",
          flip && "scale-x-[-1]",
          className
        )}
      >
        <svg
          width={size || 140}
          height={size ? (size * 1.6) : 220}
          viewBox="0 0 200 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Contour */}
          <path
            d="M 100 8 C 112 40, 135 60, 150 95 C 165 130, 175 165, 175 210 C 175 240, 160 265, 140 285 C 125 300, 110 308, 100 312 C 90 308, 75 300, 60 285 C 40 265, 25 240, 25 210 C 25 165, 35 130, 50 95 C 65 60, 88 40, 100 8 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="#5A1E24"
            fillOpacity="0.4"
          />
          {/* Inner Dashed Line */}
          <path
            d="M 100 24 C 110 50, 128 70, 140 100 C 152 130, 162 165, 162 205 C 162 232, 148 255, 130 272 C 118 285, 108 292, 100 295 C 92 292, 82 285, 70 272 C 52 255, 38 232, 38 205 C 38 165, 48 130, 60 100 C 72 70, 90 50, 100 24 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          {/* Spire */}
          <line x1="100" y1="2" x2="100" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="18" r="3.5" fill="currentColor" />
          {/* Tree trunk & branches */}
          <path d="M 100 300 L 100 130" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 100 240 Q 125 220 145 235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 100 240 Q 75 220 55 235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 100 195 Q 130 175 150 190" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 100 195 Q 70 175 50 190" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 100 155 Q 125 135 140 145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 100 155 Q 75 135 60 145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Paduraksa Door at bottom */}
          <path d="M 82 300 L 82 255 Q 100 242 118 255 L 118 300 Z" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="115" r="4" fill="currentColor" />
          <circle cx="145" cy="235" r="2.5" fill="currentColor" />
          <circle cx="55" cy="235" r="2.5" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // 4. Gapura / Kori (Frame Lengkung untuk Foto Mempelai)
  if (type === "gapura") {
    return (
      <div className={cn("relative w-full h-full text-emas pointer-events-none select-none", className)}>
        <svg
          viewBox="0 0 240 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Crown */}
          <path d="M 120 8 L 123 20 L 132 23 L 125 30 L 127 40 L 120 35 L 113 40 L 115 30 L 108 23 L 117 20 Z" fill="currentColor" />
          <circle cx="120" cy="50" r="4" fill="currentColor" />
          {/* Arch */}
          <path
            d="M 28 315 L 28 140 C 28 85, 70 55, 120 55 C 170 55, 212 85, 212 140 L 212 315"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Inner Dashed Line */}
          <path
            d="M 38 315 L 38 142 C 38 95, 76 68, 120 68 C 164 68, 202 95, 202 142 L 202 315"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // 5. Pembatas Motif Parang (Garis Diagonal)
  if (type === "parang") {
    return (
      <div className={cn("w-full py-4 text-emas select-none overflow-hidden", className)}>
        <div className="h-6 w-full opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--color-emas)_0%,_transparent_70%)] relative flex items-center justify-center">
          <span className="h-[1px] w-full bg-gradient-to-r from-transparent via-emas to-transparent" />
          <span className="absolute px-4 font-serif text-xs tracking-[0.4em] uppercase text-emas font-bold">
            /// &bull; ///
          </span>
        </div>
      </div>
    );
  }

  // 6. Flourish Tengah
  if (type === "flourish") {
    return (
      <div className={cn("flex justify-center text-emas my-2 select-none", className)}>
        <svg
          width={size || 120}
          height={size ? size / 3 : 40}
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 20C45 10 30 30 10 20C20 18 35 22 45 15C52 10 57 18 60 20Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M60 20C75 10 90 30 110 20C100 18 85 22 75 15C68 10 63 18 60 20Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <circle cx="60" cy="20" r="3" fill="currentColor" />
          <circle cx="60" cy="12" r="1.5" fill="currentColor" />
          <circle cx="60" cy="28" r="1.5" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return null;
}
