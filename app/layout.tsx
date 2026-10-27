import type { Metadata } from "next";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.example.com"),
  title: {
    default: `The Wedding of ${weddingConfig.combinedName}`,
    template: `%s | ${weddingConfig.combinedName}`,
  },
  description: `Official Wedding Invitation of ${weddingConfig.combinedName}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className="scroll-smooth antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Noto+Sans+Javanese:wght@400;700&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-gading text-sogan font-sans flex flex-col"
      >
        {children}
      </body>
    </html>
  );
}
