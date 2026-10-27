"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Ornament } from "@/components/ui/Ornament";

interface Wish {
  id: string;
  name: string;
  presence: "hadir" | "tidak_hadir" | "ragu";
  message: string;
  time: string;
}

export function WishesSection({ guestName }: { guestName: string }) {
  const [name, setName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [presence, setPresence] = useState<"hadir" | "tidak_hadir" | "ragu">("hadir");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: "1",
      name: "Dimas & Sarah",
      presence: "hadir",
      message: "Selamat menempuh hidup baru Arya & Laras! Semoga sakinah mawaddah warahmah.",
      time: "Baru saja",
    },
    {
      id: "2",
      name: "Keluarga Besar Bpk. Handoko",
      presence: "hadir",
      message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Selamat ya!",
      time: "1 jam lalu",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: `${wishes.length + 1}-${name.trim().toLowerCase().slice(0, 5)}`,
      name: name.trim(),
      presence,
      message: message.trim(),
      time: "Baru saja",
    };

    setWishes([newWish, ...wishes]);
    setMessage("");
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto text-center relative">
      <Reveal>
        <span className="text-xs uppercase tracking-[0.25em] text-emas font-semibold">
          Ucapan & Doa
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-arang mt-2 mb-3">
          Konfirmasi Kehadiran & Doa Restu
        </h2>
        <Ornament type="divider" className="mb-10 text-emas" />
      </Reveal>

      {/* Form */}
      <Reveal delay={0.2} className="mb-10">
        <form
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 rounded-2xl border border-emas/40 text-left max-w-xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-sogan font-semibold mb-1.5">
              Nama Anda
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-2.5 rounded-xl border border-emas/40 bg-gading-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-emas text-sm text-arang"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-wider text-sogan font-semibold mb-1.5">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "hadir", label: "Hadir" },
                { val: "ragu", label: "Masih Ragu" },
                { val: "tidak_hadir", label: "Tidak Hadir" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setPresence(opt.val as any)}
                  className={`py-2 px-2 text-xs rounded-lg font-semibold border transition-all cursor-pointer text-center ${
                    presence === opt.val
                      ? "bg-emas text-arang border-emas shadow-xs"
                      : "bg-gading-light text-sogan border-emas/30 hover:border-emas"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-sogan font-semibold mb-1.5">
              Ucapan & Doa Restu
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
              className="w-full px-4 py-2.5 rounded-xl border border-emas/40 bg-gading-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-emas text-sm text-arang resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emas hover:bg-emas-dark text-arang text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-md"
          >
            Kirim Konfirmasi &amp; Ucapan
          </button>
        </form>
      </Reveal>

      {/* Wishes List */}
      <Reveal delay={0.3}>
        <div className="max-w-xl mx-auto space-y-3 text-left max-h-96 overflow-y-auto pr-1">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="glass-card p-4 rounded-xl border border-emas/30"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-serif font-semibold text-arang text-sm">
                  {w.name}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    w.presence === "hadir"
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : w.presence === "ragu"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-stone-200 text-stone-800 border border-stone-300"
                  }`}
                >
                  {w.presence === "hadir"
                    ? "Akan Hadir"
                    : w.presence === "ragu"
                    ? "Ragu-ragu"
                    : "Berhalangan"}
                </span>
              </div>
              <p className="text-xs text-sogan leading-relaxed">
                {w.message}
              </p>
              <span className="text-[10px] text-sogan/70 mt-2 block">
                {w.time}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
