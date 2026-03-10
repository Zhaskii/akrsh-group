import AboutSection from "@/components/AboutSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Arksh Group",
  description:
    "Discover Arksh Group’s journey, vision, mission, and core values driving business excellence across industries.",
};

export default function AboutPage() {
  return <AboutSection />;
}
