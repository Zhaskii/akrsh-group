'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/24/solid'
import PageBanner from '@/components/PageBanner'

interface PayloadItem {
  id: string
  name: string
  logo: { url: string; alt?: string }
}

export default function CompaniesBrands() {
  const [activeTab, setActiveTab] = useState<'companies' | 'brands'>('companies')
  const [companies, setCompanies] = useState<PayloadItem[]>([])
  const [brands, setBrands] = useState<PayloadItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [companiesRes, brandsRes] = await Promise.all([
          fetch('/api/companies?sort=order&limit=100'),
          fetch('/api/brands?sort=order&limit=100'),
        ])
        const companiesData = await companiesRes.json()
        const brandsData = await brandsRes.json()
        setCompanies(companiesData.docs)
        setBrands(brandsData.docs)
      } catch (error) {
        console.error('Error fetching data from Payload:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const displayData = activeTab === 'companies' ? companies : brands

  return (
    <main className="bg-[#f0f6ff] min-h-screen pb-24 font-sans">
      <PageBanner
        title="Companies & Brands"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Companies & Brands' },
        ]}
      />

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ── Section header ── */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Our Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
              Companies &amp; Brands
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto mb-4" />
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              A diverse portfolio of companies and brands united under the Arksh Group umbrella
            </p>
          </div>

          {/* ── Tab switcher ── */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white border border-blue-50 rounded-2xl p-1.5 shadow-[0_4px_20px_rgba(52,152,219,0.08)]">
              {(['companies', 'brands'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-7 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-linear-to-r from-[#2357A6] to-[#3498db] text-white shadow-[0_4px_16px_rgba(52,152,219,0.30)]'
                      : 'text-[#1a3a6e] hover:bg-blue-50 hover:text-[#3498db] cursor-pointer'
                  }`}
                >
                  {tab === 'companies' ? 'Associated Companies' : 'Associated Brands'}
                  {/* Item count badge */}
                  {!loading && (
                    <span
                      className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        activeTab === tab ? 'bg-white/25 text-white' : 'bg-blue-50 text-[#3498db]'
                      }`}
                    >
                      {tab === 'companies' ? companies.length : brands.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Loading state ── */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.06)] p-8 aspect-square animate-pulse"
                >
                  <div className="w-full h-full bg-blue-50 rounded-xl" />
                </div>
              ))}
            </div>
          ) : displayData.length === 0 ? (
            /* ── Empty state ── */
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.08)] mb-4">
                <svg
                  className="w-7 h-7 text-[#3498db]/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No {activeTab} found.</p>
            </div>
          ) : (
            /* ── Logo grid ── */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayData.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col items-center justify-center p-7 bg-white border border-blue-50 rounded-2xl shadow-[0_4px_16px_rgba(52,152,219,0.06)] hover:shadow-[0_16px_48px_rgba(52,152,219,0.16)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  {/* Ghost index number */}
                  <span className="absolute top-3 right-3.5 text-3xl font-black text-[#3498db]/5 leading-none select-none pointer-events-none group-hover:text-[#3498db]/9 transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Logo */}
                  <div className="relative w-full aspect-square max-w-35">
                    <Image
                      src={item.logo.url}
                      alt={item.logo.alt || item.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  {/* Name — slides up on hover */}
                  <div className="mt-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[11px] font-bold text-gray-400 group-hover:text-[#3498db] text-center uppercase tracking-wider transition-colors duration-200 leading-tight">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
