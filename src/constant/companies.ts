import company1 from "@/assets/company/company1.png";
import company2 from "@/assets/company/company2.png";
import company3 from "@/assets/company/company3.png";
import company4 from "@/assets/company/company4.png";
import company5 from "@/assets/company/company5.png";
import { StaticImageData } from "next/image";

export interface Company {
  name: string;
  logo: StaticImageData;
}

// 2. Typed array of companies
export const companies: Company[] = [
  { name: "Arksh Agro", logo: company1 },
  { name: "Lakus Trading House", logo: company2 },
  { name: "Himalayan Organic Agro", logo: company3 },
  { name: "Urban Earth", logo: company4 },
  { name: "Hotel Rara", logo: company5 },
];
