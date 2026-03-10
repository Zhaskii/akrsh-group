import {
  UsersIcon,
  CalendarIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";
import { ComponentType, SVGProps } from "react";

// 1. Define the type for each achievement
export interface Achievement {
  id: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  number: string;
  label: string;
  subLabel: string;
}

// 2. Typed array of achievements
export const achievements: Achievement[] = [
  {
    id: 1,
    icon: UsersIcon,
    number: "10000000+",
    label: "Happy Customers",
    subLabel: "Market Presence",
  },
  {
    id: 2,
    icon: CalendarIcon,
    number: "47+",
    label: "Years in Operation",
    subLabel: "Since 1978",
  },
  {
    id: 3,
    icon: BuildingOffice2Icon,
    number: "100+",
    label: "Brands",
    subLabel: "Diverse Sectors",
  },
  {
    id: 4,
    icon: GlobeAltIcon,
    number: "20+",
    label: "Global Trade Partners",
    subLabel: "International Reach",
  },
];
