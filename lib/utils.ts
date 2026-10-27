import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind CSS classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a URL slug into a formatted guest name
 * Examples:
 *  - "budi-santoso" -> "Budi Santoso"
 *  - "dr-h-ahmad-fauzi-m-sc" -> "Dr. H. Ahmad Fauzi, M.Sc"
 *  - "mr.+and+mrs.+john" -> "Mr. And Mrs. John"
 */
export function slugToName(slug: string | undefined | null): string {
  if (!slug) return "Tamu Undangan";

  try {
    const decoded = decodeURIComponent(slug);
    const cleaned = decoded
      .replace(/[+_-]+/g, " ")
      .trim();

    if (!cleaned) return "Tamu Undangan";

    return cleaned
      .split(" ")
      .map((word) => {
        if (!word) return "";
        const lower = word.toLowerCase();
        if (["dan", "&", "and"].includes(lower)) return "&";
        if (["di", "ke", "dari"].includes(lower)) return lower;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  } catch {
    return slug;
  }
}

const DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/**
 * Format ISO date string into Indonesian locale date deterministically
 * Avoids Intl.DateTimeFormat differences between server and browser engines
 */
export function formatIndonesianDate(isoString: string): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    // Convert to Asia/Jakarta (WIB: UTC+7) deterministically
    const utcMs = date.getTime() + date.getTimezoneOffset() * 60000;
    const wibDate = new Date(utcMs + 7 * 3600000);

    const dayName = DAYS[wibDate.getDay()];
    const day = wibDate.getDate();
    const monthName = MONTHS[wibDate.getMonth()];
    const year = wibDate.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  } catch {
    return isoString;
  }
}
