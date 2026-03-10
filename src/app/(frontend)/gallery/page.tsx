import GallerySection from "@/components/GallerySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Arksh Group",
  description:
    "Explore photos, events, projects, and highlights from Arksh Group’s journey and activities.",
};

export default function Gallery() {
  return <GallerySection />;
}
