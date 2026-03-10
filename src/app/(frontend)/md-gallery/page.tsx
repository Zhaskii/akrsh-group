import React from "react";
import ChairmanGallery from "@/components/ChairmanGallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chairman Gallery | Arksh Group",
  description:
    "View the official gallery of the Chairman at Arksh Group, showcasing leadership moments, events, and company milestones.",
};

export default function MDGallery() {
  return <ChairmanGallery />;
}
