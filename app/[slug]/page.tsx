import type { Metadata } from "next";
import { Suspense } from "react";
import { weddingConfig } from "@/config/wedding";
import { slugToName } from "@/lib/utils";
import { Invitation } from "./Invitation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guestName = slugToName(slug);
  const title = `The Wedding of ${weddingConfig.combinedName} - Undangan untuk ${guestName}`;
  const description = `Kepada Yth. ${guestName}, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam momen bahagia pernikahan ${weddingConfig.combinedName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${slug}`,
      siteName: `The Wedding of ${weddingConfig.combinedName}`,
      images: [
        {
          url: weddingConfig.media.ogImage,
          width: 1200,
          height: 630,
          alt: `Undangan Pernikahan ${weddingConfig.combinedName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [weddingConfig.media.ogImage],
    },
  };
}

async function InvitationContent({ params }: PageProps) {
  const { slug } = await params;
  const guestName = slugToName(slug);
  return <Invitation slug={slug} guestName={guestName} />;
}

export default function WeddingPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InvitationContent params={params} />
    </Suspense>
  );
}
