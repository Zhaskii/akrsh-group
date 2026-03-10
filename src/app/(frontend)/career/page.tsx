import CareerSection from "@/components/CareerSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Arksh Group",
  description:
    "Explore career opportunities at Arksh Group and join our team to grow, innovate, and make an impact in the industry.",
};

export default function Career() {
  return <CareerSection />;
}
