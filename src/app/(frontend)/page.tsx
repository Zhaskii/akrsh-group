import Hero from "@/components/Hero";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Arksh Group | Leading Business Conglomerate in Nepal",
  description:
    "Arksh Group is a diversified business conglomerate involved in automobiles, food & beverages, hospitality, wellness, and multiple global brands.",
};

const About = dynamic(() => import("@/components/About"), { ssr: true });
const Arkshism = dynamic(() => import("@/components/Arkshism"), { ssr: true });
const MajorInvolvements = dynamic(() => import("@/components/MajorInvolvements"), { ssr: true });
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), { ssr: true });
const Achievements = dynamic(() => import("@/components/Acheievements"), { ssr: true });
const Companies = dynamic(() => import("@/components/Companies"), { ssr: true });
const Brands = dynamic(() => import("@/components/Brands"), { ssr: true });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Arkshism />
      <MajorInvolvements />
      <FeaturedProducts />
      <Achievements />
      <Companies />
      <Brands />
    </>
  );
}
