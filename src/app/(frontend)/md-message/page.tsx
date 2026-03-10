import AboutChairman from "@/components/AboutChairman";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MD Message | Arksh Group",
  description:
    "Read the message from the Managing Director of Arksh Group about our vision, values, and commitment to excellence and innovation.",
};

export default function MdMessage() {
  return <AboutChairman />;
}
