import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Arksh Group',
  description:
    'ARKSH Group is a leading Nepalese conglomerate in automobiles, food & beverages, manufacturing, and international trading.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`antialiased flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
