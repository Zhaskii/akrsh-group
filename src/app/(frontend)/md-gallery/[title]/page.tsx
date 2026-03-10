import ChairmanGalleryDetails from "@/components/ChairmanGalleryDetails";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chairman Gallery Details | Arksh Group",
  description:
    "Explore detailed photos and moments from the Chairman's gallery at Arksh Group, highlighting events and company milestones.",
};

export default function Page() {
  return <ChairmanGalleryDetails />;
}
