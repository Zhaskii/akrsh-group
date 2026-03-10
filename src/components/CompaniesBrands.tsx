'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { HomeIcon } from '@heroicons/react/24/solid'
import PageBanner from '@/components/PageBanner'

// Define the shape of our backend data
interface PayloadItem {
  id: string
  name: string
  logo: {
    url: string
    alt?: string
  }
}

export default function CompaniesBrands() {
  const [activeTab, setActiveTab] = useState<'companies' | 'brands'>('companies')

  // State for backend data
  const [companies, setCompanies] = useState<PayloadItem[]>([])
  const [brands, setBrands] = useState<PayloadItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetching both concurrently for better performance
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

  // Determine which list to show based on active tab
  const displayData = activeTab === 'companies' ? companies : brands

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      <PageBanner
        title="Companies & Brands"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Companies & Brands' },
        ]}
      />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Toggle Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 md:mb-16 px-4">
            <button
              onClick={() => setActiveTab('companies')}
              className={`w-full md:w-auto px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md ${
                activeTab === 'companies'
                  ? 'bg-[#2257A6] text-white'
                  : 'bg-[#49B2E7] text-white hover:bg-[#2257A6]'
              }`}
            >
              Associated Companies
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`w-full md:w-auto px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md ${
                activeTab === 'brands'
                  ? 'bg-[#2257A6] text-white'
                  : 'bg-[#49B2E7] text-white hover:bg-[#2257A6]'
              }`}
            >
              Associated Brands
            </button>
          </div>

          {/* Loading & Empty States */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading records...</div>
          ) : displayData.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No {activeTab} found.</div>
          ) : (
            /* Grid Layout for Logos */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayData.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center justify-center p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative w-full aspect-square max-w-45">
                    <Image
                      src={item.logo.url}
                      alt={item.logo.alt || item.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  {/* Optional: Overlay with Name */}
                  <div className="absolute bottom-2 text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
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
