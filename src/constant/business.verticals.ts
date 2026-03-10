import {
  AcademicCapIcon,
  CakeIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  CpuChipIcon,
  TruckIcon,
  SparklesIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  GiftIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/solid'

import { ForwardRefExoticComponent, SVGProps } from 'react'

import v1 from '@/assets/businessVerticals/industry.jpg'
import v2 from '@/assets/businessVerticals/food.png'
import v3 from '@/assets/businessVerticals/beverages.png'
import v4 from '@/assets/businessVerticals/automobiles.jpg'
import v5 from '@/assets/businessVerticals/hotels-restaurants.png'
import v6 from '@/assets/businessVerticals/beauty-cosmetic.png'
import v7 from '@/assets/businessVerticals/health-wellness.png'
import v8 from '@/assets/businessVerticals/tours-and-travels.png'
import v9 from '@/assets/businessVerticals/biotechnology.png'
import v10 from '@/assets/businessVerticals/construction-materials.png'
import v11 from '@/assets/businessVerticals/electronics-technology.png'
import v12 from '@/assets/businessVerticals/vending-machine.png'

import { StaticImageData } from 'next/image'

export type HeroIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement>>

export interface BusinessVertical {
  title: string
  desc: string
  icon: HeroIcon
  bgImage: string | StaticImageData
}

export const businessVerticals: BusinessVertical[] = [
  {
    title: 'Industry',
    desc: 'Dami Puff, Cookies & Biscuits',
    icon: BriefcaseIcon,
    bgImage: v1,
  },
  {
    title: 'Food',
    desc: 'Hwa Tai, Richy, Tastee, Paldo, Monarko, Didian, Savorit, Chizzpa, Shazia Rice, Glacier, Tafeli etc',
    icon: CakeIcon,
    bgImage: v2,
  },
  {
    title: 'Beverages',
    desc: 'MacCoffee, MacTea, MacCereal, Barley Chhaang, NutriRite, Klassno, Creme, Royal Premix',
    icon: BeakerIcon,
    bgImage: v3,
  },
  {
    title: 'Automobiles',
    desc: 'Higer, Golden Dragon, Jubao, Hylong, Zotye, Lifan, Jonway, Grand Tiger, Hafei Lobo',
    icon: TruckIcon,
    bgImage: v4,
  },
  {
    title: 'Hotels & Restaurants',
    desc: 'Hotel Rara, Hotel Peaceland, Kudan Restaurant & Arksh Rooftop Garden & Grill',
    icon: BuildingStorefrontIcon,
    bgImage: v5,
  },
  {
    title: 'Beauty & Cosmetics',
    desc: 'Dream Skin: Korean Skin Care, K Beauty Makeup, Hair Care & Cosmetics',
    icon: SparklesIcon,
    bgImage: v6,
  },
  {
    title: 'Health & Wellness',
    desc: 'Nirvana Physiotherapy & Wellness Center: Lazimpat, Bhaktapur',
    icon: AcademicCapIcon,
    bgImage: v7,
  },
  {
    title: 'Tours and Travels',
    desc: 'Lifestyle Holidays, Book My Ticket, Stream Travel Services',
    icon: GlobeAltIcon,
    bgImage: v8,
  },
  {
    title: 'Biotechnology',
    desc: 'Atkotiya Agro Technologies',
    icon: DevicePhoneMobileIcon,
    bgImage: v9,
  },
  {
    title: 'Construction Materials',
    desc: 'Huaxia',
    icon: BuildingOffice2Icon,
    bgImage: v10,
  },
  {
    title: 'Electronics & Technology',
    desc: 'PQI, VNPT etc',
    icon: CpuChipIcon,
    bgImage: v11,
  },
  {
    title: 'Vending machine',
    desc: 'Godrej',
    icon: GiftIcon,
    bgImage: v12,
  },
]
