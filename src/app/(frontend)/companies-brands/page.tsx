import CompaniesBrands from "@/components/CompaniesBrands";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies & Brands | Arksh Group",
  description:
    "Discover the companies and brands under Arksh Group, showcasing our diverse business ventures and innovations.",
};

export default function Companies_Brands() {
  return <CompaniesBrands />;
}
