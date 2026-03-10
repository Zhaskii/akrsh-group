export type SubBrand = {
  name: string
  href: string
}

export type Involvement = {
  name: string
  href?: string
  subBrands: SubBrand[]
}
export const involvements: Involvement[] = [
  {
    name: 'Automobiles',
    subBrands: [{ name: 'Arksh Motors', href: 'https://motors.arkshgroup.com/' }],
  },
  {
    name: 'Food',
    subBrands: [
      { name: 'दामी', href: '#' },
      { name: 'Didan', href: '#' },
      { name: 'Tafeli', href: '#' },
      { name: 'Paldo', href: '#' },
      { name: 'Tastee', href: '#' },
      { name: 'Glacier', href: '#' },
      { name: 'Richy', href: '#' },
      { name: 'Chizzpa', href: '#' },
      { name: 'Monarko', href: '#' },
      { name: 'Hwa Tai', href: '#' },
    ],
  },
  {
    name: 'Health & Wellness',
    subBrands: [
      { name: 'Nivana Physiotherapy & Wellness Centre', href: 'https://www.npwc.com.np/' },
    ],
  },
  {
    name: 'Beverages',
    subBrands: [
      { name: 'MacCoffee', href: '#' },
      { name: 'MacTea', href: '#' },
      { name: 'MacCereal', href: '#' },
      { name: 'Barley Chhang', href: '#' },
      { name: 'NutiRite', href: '#' },
      { name: 'Klassno', href: '#' },
      { name: 'Creme', href: '#' },
    ],
  },
  {
    name: 'Tours & Travels',
    subBrands: [
      { name: 'Lifestyle Holidays', href: 'https://lifestyleholidays.com.np/' },
      { name: 'Book My Ticket', href: '#' },
      { name: 'Stream Travels', href: '#' },
    ],
  },
  {
    name: 'Hotels & Restaurants',
    subBrands: [
      { name: 'Hotel Peaceland Lumbini', href: 'https://hotelpeaceland.com/' },
      { name: 'Hotel Rara', href: '#' },
      { name: 'Jomsom Airport Hotel', href: '#' },
    ],
  },
  {
    name: 'Bed & Mattress',
    subBrands: [{ name: 'Darling Mattress', href: '#' }],
  },
  {
    name: 'Beauty & Cosmetics',
    subBrands: [{ name: 'Dream Skin Nepal', href: 'https://www.dreamskinnepal.com/' }],
  },
  {
    name: 'Biotechnology',
    subBrands: [{ name: 'Arksh Agro', href: 'https://agro.arkshgroup.com/' }],
  },
  {
    name: 'Carpet and Flooring',
    subBrands: [
      { name: 'Gem Flooring', href: '#' },
      { name: 'Abu Dhabi National Carpet', href: '#' },
      { name: 'Hanwha', href: '#' },
      { name: 'Swiss Krono', href: '#' },
    ],
  },
  {
    name: 'Clothing',
    subBrands: [
      { name: 'Clovia', href: '#' },
      { name: 'Suoyue', href: '#' },
    ],
  },
  {
    name: 'Industry',
    subBrands: [{ name: 'Arksh Food Industry', href: 'https://www.arkshfood.com/' }],
  },
  {
    name: 'Marketing Agency',
    subBrands: [{ name: 'Arksh Digital', href: '#' }],
  },
  {
    name: 'Vending Machine',
    subBrands: [{ name: 'Godrej Vending', href: '#' }],
  },
  {
    name: 'Construction Materials',
    subBrands: [{ name: 'Huaxia', href: '#' }],
  },
  {
    name: 'Electronics & Technology',
    subBrands: [{ name: 'PQI', href: '#' }],
  },
]
