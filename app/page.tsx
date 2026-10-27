import { Metadata } from "next";
import { weddingConfig } from "@/config/wedding";
import { Invitation } from "./[slug]/Invitation";

export const metadata: Metadata = {
  title: `The Wedding of ${weddingConfig.combinedName}`,
  description: `Official Wedding Invitation of ${weddingConfig.combinedName}`,
};

export default function HomePage() {
  return <Invitation slug="" guestName="Tamu Undangan" />;
}
