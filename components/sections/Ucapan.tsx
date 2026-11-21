"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ornament } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";
import type { Ucapan, Attendance } from "@/types";

const ATTENDANCE_LABELS: Record<Attendance, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  ragu: "Masih Ragu",
};

const ATTENDANCE_CLASSES: Record<Attendance, string> = {
  hadir: "bg-sogan-light/20 text-sogan-dark border border-sogan/20",
  tidak_hadir: "bg-maroon-light/20 text-maroon-dark border border-maroon/20",
  ragu: "bg-emas-light/20 text-emas-dark border border-emas/20",
};

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

    if (diffSec < 60) return rtf.format(-diffSec, "second");
    if (diffMin < 60) return rtf.format(-diffMin, "minute");
    if (diffHour < 24) return rtf.format(-diffHour, "hour");
    if (diffDay < 30) return rtf.format(-diffDay, "day");
    return rtf.format(-Math.floor(diffDay / 30), "month");
  } catch {
    return "baru saja";
  }
}

interface UcapanSectionProps {
  guestName: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" as const } },
};

export function UcapanSection({ guestName }: UcapanSectionProps) {
  const [wishes, setWishes] = useState<Ucapan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [buttonPhase, setButtonPhase] = useState<"idle" | "sending" | "sent">("idle");

  const [formData, setFormData] = useState({
    name: guestName || "",
    message: "",
    attendance: "hadir" as Attendance,
    website: "",
  });

  const fetchWishes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/ucapan", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal memuat");
      const data = await res.json();
      setWishes(data);
      setError(null);
    } catch {
      setError("Gagal memuat ucapan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWishes();
  }, [fetchWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitting(true);
    setButtonPhase("sending");

    try {
      const res = await fetch("/api/ucapan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: guestName.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setSubmitError(data.error || "Terlalu sering mengirim");
        setButtonPhase("idle");
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setSubmitError(data.errors.join(", "));
        } else {
          setSubmitError(data.error || "Gagal mengirim ucapan");
        }
        setButtonPhase("idle");
        return;
      }

      setButtonPhase("sent");
      setSubmitSuccess(true);
      setFormData((prev) => ({ ...prev, message: "" }));
      fetchWishes();

      setTimeout(() => {
        setButtonPhase("idle");
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
      setButtonPhase("idle");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    fetchWishes();
  };

  const charCount = formData.message.length;
  const maxChars = 300;
  const remaining = maxChars - charCount;

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Maha Suci Allah
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-4">
          Ucapan & Doa Restu
        </h2>
        <p className="text-sm text-sogan max-w-md mx-auto leading-relaxed mb-12">
          Berikan ucapan dan doa restu terbaik Anda untuk kami.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        <div className="relative">
          <div className="gading-card p-6 md:p-8 relative overflow-hidden">
            <Ornament type="corner" position="top-left" size={28} className="absolute -top-1 -left-1 opacity-50" />
            <Ornament type="corner" position="bottom-right" size={28} className="absolute -bottom-1 -right-1 opacity-50 rotate-180" />

            <h3 className="font-serif text-xl md:text-2xl text-arang mb-6 text-center">
              Kirim Ucapan
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Reveal delay={0.12}>
                <div>
                  <label htmlFor="name" className="block text-sm text-sogan mb-1">
                    Nama
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gading border border-emas/30 rounded-xl text-arang placeholder-sogan/40 focus:outline-none focus:ring-2 focus:ring-emas focus:border-transparent transition-all"
                    placeholder="Nama Anda"
                    maxLength={60}
                    required
                    disabled={submitting}
                  />
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div>
                  <label className="block text-sm text-sogan mb-1">
                    Kehadiran
                  </label>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Pilihan kehadiran">
                    {(["hadir", "tidak_hadir", "ragu"] as Attendance[]).map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.attendance === opt
                            ? "border-emas bg-emas/10"
                            : "border-emas/20 hover:border-emas/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={opt}
                          checked={formData.attendance === opt}
                          onChange={() => setFormData((prev) => ({ ...prev, attendance: opt }))}
                          className="sr-only"
                          disabled={submitting}
                        />
                        <span className="font-medium text-sogan capitalize">{ATTENDANCE_LABELS[opt]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.36}>
                <div>
                  <label htmlFor="message" className="block text-sm text-sogan mb-1 flex justify-between">
                    <span>Ucapan & Doa Restu</span>
                    <span className={`font-mono text-xs ${charCount > maxChars ? "text-rose-500" : remaining < 20 ? "text-maroon" : "text-sogan/50"}`}>
                      {charCount}/{maxChars}
                    </span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-gading border border-emas/30 rounded-xl text-arang placeholder-sogan/40 focus:outline-none focus:ring-2 focus:ring-emas focus:border-transparent transition-all resize-none"
                    placeholder="Tulis ucapan dan doa restu Anda di sini..."
                    rows={5}
                    maxLength={maxChars}
                    required
                    disabled={submitting}
                  />
                </div>
              </Reveal>

              <input type="hidden" name="website" value={formData.website} onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))} />

              <AnimatePresence mode="wait">
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-rose-50 text-rose-700 text-sm border border-rose-200"
                    role="alert"
                  >
                    {submitError}
                  </motion.div>
                )}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-sm border border-emerald-200"
                    role="status"
                  >
                    Ucapan terkirim. Terima kasih!
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={submitting || charCount > maxChars}
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emas via-emas-light to-emas text-arang font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emas/30"
              >
                <AnimatePresence mode="wait">
                  {buttonPhase === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                      Kirim Ucapan
                    </motion.span>
                  )}
                  {buttonPhase === "sending" && (
                    <motion.span key="sending" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="flex items-center justify-center gap-2 opacity-70">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Mengirim...
                    </motion.span>
                  )}
                  {buttonPhase === "sent" && (
                    <motion.span key="sent" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Terkirim
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </div>
        </div>

        <div className="relative">
          <div className="gading-card relative overflow-hidden">
            <Ornament type="corner" position="top-right" size={28} className="absolute -top-1 -right-1 opacity-50" />
            <Ornament type="corner" position="bottom-left" size={28} className="absolute -bottom-1 -left-1 opacity-50 rotate-180" />

            <h3 className="font-serif text-xl md:text-2xl text-arang mb-6 p-6 md:p-8 text-center">
              Ucapan Tamu
            </h3>

            <div className="max-h-96 overflow-y-auto pr-2 pb-6 p-6 md:p-8 relative">
              <div className="relative z-10" style={{
                background: "linear-gradient(to top, var(--color-gading, #F5EBD7) 30%, transparent)",
                height: "80px",
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "none",
              }} />

              {loading ? (
                <div className="space-y-4" role="status" aria-label="Memuat ucapan">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="animate-pulse space-y-2"
                    >
                      <div className="h-4 bg-emas/20 rounded w-3/4" />
                      <div className="h-3 bg-emas/10 rounded w-full" />
                      <div className="h-3 bg-emas/10 rounded w-2/3" />
                    </motion.div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-rose-500 mb-4">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 text-sm text-emas hover:text-emas-light font-medium underline"
                  >
                    Coba lagi
                  </button>
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sogan/60">Jadilah yang pertama memberi ucapan</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  <ul className="space-y-6" role="list" aria-label="Daftar ucapan tamu">
                    {wishes.map((wish, index) => (
                      <motion.li
                        key={wish.id}
                        layout
                        variants={itemVariants}
                        initial={index < 8 ? "hidden" : "visible"}
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut", delay: index < 8 ? index * 0.06 : 0 }}
                        className="relative p-4 rounded-xl bg-gading/50 border border-emas/20"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-arang">{wish.name}</span>
                          <span className={`px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full ${ATTENDANCE_CLASSES[wish.attendance]}`}>
                            {ATTENDANCE_LABELS[wish.attendance]}
                          </span>
                          <span className="ml-auto text-[10px] text-sogan/50 font-mono">
                            {formatRelativeTime(wish.created_at)}
                          </span>
                        </div>
                        <p className="text-sogan whitespace-pre-wrap break-words">{wish.message}</p>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      <Reveal delay={0.3} className="mt-10">
        <Ornament type="divider" className="text-emas" />
      </Reveal>
    </section>
  );
}