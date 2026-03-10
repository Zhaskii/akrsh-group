import AboutCEO from "@/components/AboutCEO";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEO Message | Arksh Group",
  description:
    "Read the message from the CEO of Arksh Group about our vision, values, and commitment to innovation and excellence.",
};

export default function CeoMessage() {
  return <AboutCEO />;
}
