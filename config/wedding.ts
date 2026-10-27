export interface PersonInfo {
  name: string;
  fullName: string;
  role: "groom" | "bride";
  father: string;
  mother: string;
  instagram?: string;
  photo: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string; // ISO 8601 with +07:00, e.g. "2026-12-20T08:00:00+07:00"
  timeString: string;
  locationName: string;
  address: string;
  mapsUrl: string;
  calendarUrl?: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImage?: string;
}

export interface WeddingQuote {
  arabic?: string;
  text: string;
  source: string;
}

export interface WeddingConfig {
  groom: PersonInfo;
  bride: PersonInfo;
  combinedName: string;
  weddingDate: string; // ISO with +07:00
  quote: WeddingQuote;
  events: WeddingEvent[];
  bankAccounts: BankAccount[];
  giftAddress: {
    receiver: string;
    phone: string;
    fullAddress: string;
  };
  media: {
    heroImage: string;
    ogImage: string;
    audio: string;
    gallery: string[];
    batikPattern?: string;
  };
}

export const weddingConfig: WeddingConfig = {
  groom: {
    name: "Arya",
    fullName: "Raden Arya Wirawan, S.T.",
    role: "groom",
    father: "Bpk. Bambang Wirawan",
    mother: "Ibu Sri Rahayu",
    instagram: "aryawirawan",
    photo: "/images/groom.jpg",
  },
  bride: {
    name: "Laras",
    fullName: "Sekar Larasati, S.Ds.",
    role: "bride",
    father: "Bpk. Hadi Subroto",
    mother: "Ibu Endang Lestari",
    instagram: "sekarlaras",
    photo: "/images/bride.jpg",
  },
  combinedName: "Arya & Laras",
  // ISO date with timezone +07:00 (WIB)
  weddingDate: "2026-12-20T08:00:00+07:00",
  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      date: "2026-12-20T08:00:00+07:00",
      timeString: "08:00 - 10:00 WIB",
      locationName: "Pendopo Sasana Kencana",
      address: "Jl. Kaliurang Km. 9, Sleman, D.I. Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Pendopo+Sasana+Kencana+Yogyakarta",
    },
    {
      id: "resepsi",
      title: "Resepsi Pernikahan",
      date: "2026-12-20T11:00:00+07:00",
      timeString: "11:00 - 14:00 WIB",
      locationName: "Grand Ballroom Sasana Kencana",
      address: "Jl. Kaliurang Km. 9, Sleman, D.I. Yogyakarta",
      mapsUrl: "https://maps.google.com/?q=Pendopo+Sasana+Kencana+Yogyakarta",
    },
  ],
  bankAccounts: [
    {
      id: "bca",
      bankName: "BCA",
      accountNumber: "8420912345",
      accountHolder: "Raden Arya Wirawan",
    },
    {
      id: "mandiri",
      bankName: "Bank Mandiri",
      accountNumber: "1370019283746",
      accountHolder: "Sekar Larasati",
    },
  ],
  giftAddress: {
    receiver: "Arya & Laras",
    phone: "081234567890",
    fullAddress: "Jl. Kaliurang Km. 9 No. 42, Sinduharjo, Ngaglik, Sleman, D.I. Yogyakarta 55581",
  },
  media: {
    heroImage: "/images/hero.jpg",
    ogImage: "/images/og-wedding.jpg",
    audio: "/audio/wedding-song.mp3",
    gallery: [
      "/images/gallery-1.jpg",
      "/images/gallery-2.jpg",
      "/images/gallery-3.jpg",
      "/images/gallery-4.jpg",
      "/images/gallery-5.jpg",
      "/images/gallery-6.jpg",
    ],
  },
};
