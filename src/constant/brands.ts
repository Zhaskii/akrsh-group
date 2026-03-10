import brand1 from '@/assets/brands/b1.png'
import brand2 from '@/assets/brands/b2.png'
import brand3 from '@/assets/brands/b3.png'
import brand4 from '@/assets/brands/b4.png'
import brand5 from '@/assets/brands/b5.png'
import { StaticImageData } from 'next/image'

export interface Brand {
  name: string
  logo: StaticImageData
}

export const brands: Brand[] = [
  { name: 'JUBAO', logo: brand1 },
  { name: 'Tafeli', logo: brand2 },
  { name: 'Didian', logo: brand3 },
  { name: 'MacCoffee', logo: brand4 },
  { name: 'Dami', logo: brand5 },
]
