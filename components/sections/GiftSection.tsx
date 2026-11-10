"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { weddingConfig, BankAccount } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers / non-secure contexts
  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (successful) resolve();
      else reject(new Error("Copy failed"));
    } catch (err) {
      document.body.removeChild(textarea);
      reject(err);
    }
  });
}

export function GiftSection() {
  const { bankAccounts, giftAddress } = weddingConfig;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback(async (id: string, text: string) => {
    try {
      await copyToClipboard(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto text-center relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Tanda Kasih
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-3">
          Wedding Gift
        </h2>
        <p className="text-xs md:text-sm text-sogan max-w-md mx-auto leading-relaxed mb-8">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila Anda
          ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini:
        </p>
        <Ornament type="divider" className="mb-10 text-emas" />
      </Reveal>

      {/* Bank Account Cards - Maroon with Kawung Pattern */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        {bankAccounts.map((account: BankAccount) => (
          <motion.div
            key={account.id}
            variants={cardVariants}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-maroon text-gading border border-emas/40 shadow-xl">
              {/* Kawung Pattern Background */}
              <div className="absolute inset-0 opacity-15" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('/ornaments/batik-kawung.svg')] bg-center bg-cover" />
              </div>

              {/* Decorative top border */}
              <div className="relative z-10 border-t-2 border-emas/50" />

              <div className="relative z-10 p-6 text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-serif font-bold text-lg text-emas">
                      {account.bankName}
                    </span>
                    <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-emas/20 text-emas font-semibold border border-emas/40">
                      Transfer
                    </span>
                  </div>

                  <p className="text-xs text-gading/70 mb-1 uppercase tracking-wider">Nomor Rekening</p>
                  <p className="font-mono text-xl font-semibold text-gading tracking-wider mb-2 select-all">
                    {account.accountNumber}
                  </p>
                  <p className="text-xs text-gading/80">
                    a.n. <span className="font-semibold text-emas">{account.accountHolder}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(account.id, account.accountNumber)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-emas bg-transparent text-emas hover:bg-emas/10 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  aria-label={copiedId === account.id ? "Nomor rekening sudah disalin" : `Salin nomor rekening ${account.bankName}`}
                >
                  <AnimatePresence mode="wait">
                    {copiedId === account.id ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-2 text-emerald-400"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Tersalin ✓</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-emas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Salin Nomor</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gift Parcel Address - Maroon Card Style */}
      {giftAddress && (
        <Reveal delay={0.3} className="mt-4">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-maroon text-gading border border-emas/40 shadow-xl max-w-lg mx-auto">
              {/* Kawung Pattern Background */}
              <div className="absolute inset-0 opacity-15" aria-hidden="true">
                <div className="absolute inset-0 bg-[url('/ornaments/batik-kawung.svg')] bg-center bg-cover" />
              </div>

              <div className="relative z-10 p-6 text-left">
                <h4 className="font-serif text-lg font-medium text-emas mb-2">
                  Kirim Kado Fisik
                </h4>
                <p className="text-xs text-gading/80 leading-relaxed mb-4">
                  Penerima: <strong className="text-emas font-semibold">{giftAddress.receiver}</strong> ({giftAddress.phone})
                  <br />
                  {giftAddress.fullAddress}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy("address", `${giftAddress.receiver} (${giftAddress.phone}) - ${giftAddress.fullAddress}`)}
                  className="py-2 px-3 text-[11px] font-semibold border border-emas rounded-lg text-emas bg-transparent hover:bg-emas/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  aria-label={copiedId === "address" ? "Alamat sudah disalin" : "Salin alamat lengkap"}
                >
                  <AnimatePresence mode="wait">
                    {copiedId === "address" ? (
                      <motion.span
                        key="copied-addr"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-1.5 text-emerald-400"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Alamat Tersalin ✓</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default-addr"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 text-emas" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Salin Alamat Lengkap</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      )}
    </section>
  );
}
