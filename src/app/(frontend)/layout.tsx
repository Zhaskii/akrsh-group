import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientLoadGuard from '@/components/ClientLoadGuard'

export const metadata: Metadata = {
  title: 'Arksh Group',
  description:
    'ARKSH Group is a leading Nepalese conglomerate in automobiles, food & beverages, manufacturing, and international trading.',
}

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientLoadGuard>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </ClientLoadGuard>
  )
}
