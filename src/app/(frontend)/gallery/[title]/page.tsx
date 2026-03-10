import GalleryCategoryView from "@/components/GalleryCategoryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Arksh Group",
  description:
    "Explore the photo gallery of Arksh Group, featuring events, projects, and moments that showcase our work and achievements.",
};

type Props = { params: Promise<{ title: string }> };

export default async function GalleryCategoryPage({ params }: Props) {
  const { title } = await params;
  const slug = decodeURIComponent(title);
  return <GalleryCategoryView slug={slug} />;
}
