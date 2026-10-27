"use client";

import React, { useState } from "react";
import { weddingConfig, BankAccount } from "@/config/wedding";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

export function GiftSection() {
  const { bankAccounts, giftAddress } = weddingConfig;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

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

      {/* Bank Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {bankAccounts.map((account: BankAccount) => (
          <Reveal key={account.id} delay={0.2} className="h-full">
            <div className="glass-card p-6 rounded-2xl relative border border-emas/40 text-left flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif font-bold text-lg text-arang">
                    {account.bankName}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-gading-dark text-sogan font-semibold border border-emas/30">
                    Transfer
                  </span>
                </div>

                <p className="text-xs text-sogan mb-1">Nomor Rekening:</p>
                <p className="font-mono text-lg font-semibold text-arang tracking-wider mb-2">
                  {account.accountNumber}
                </p>
                <p className="text-xs text-sogan">
                  a.n. <span className="font-semibold text-arang">{account.accountHolder}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(account.id, account.accountNumber)}
                className="mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold border border-emas bg-gading-light hover:bg-emas text-arang transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {copiedId === account.id ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Nomor Tersalin!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-emas-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Salin Nomor Rekening</span>
                  </>
                )}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Gift Parcel Address */}
      {giftAddress && (
        <Reveal delay={0.3}>
          <div className="glass-card p-6 rounded-2xl border border-emas/40 text-left max-w-lg mx-auto">
            <h4 className="font-serif text-lg font-medium text-arang mb-2">
              Kirim Kado Fisik
            </h4>
            <p className="text-xs text-sogan leading-relaxed mb-3">
              Penerima: <strong className="text-arang font-semibold">{giftAddress.receiver}</strong> ({giftAddress.phone})
              <br />
              {giftAddress.fullAddress}
            </p>
            <button
              type="button"
              onClick={() => handleCopy("address", `${giftAddress.receiver} (${giftAddress.phone}) - ${giftAddress.fullAddress}`)}
              className="py-2 px-3 text-[11px] font-semibold border border-emas rounded-lg text-arang bg-gading-light hover:bg-emas transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copiedId === "address" ? "Alamat Tersalin!" : "Salin Alamat Lengkap"}
            </button>
          </div>
        </Reveal>
      )}
    </section>
  );
}
