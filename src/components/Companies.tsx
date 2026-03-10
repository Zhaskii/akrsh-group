'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Company {
  id: string
  name: string
  logo: {
    url: string
    alt?: string
  }
}

export default function OurCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [itemsToShow, setItemsToShow] = useState(5)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies?sort=order&limit=100')
        const data = await response.json()
        setCompanies(data.docs)
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth
      if (width < 640) setItemsToShow(1)
      else if (width < 768) setItemsToShow(2)
      else if (width < 1024) setItemsToShow(3)
      else setItemsToShow(5)
    }

    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)
  }, [])

  useEffect(() => {
    if (companies.length <= itemsToShow) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= companies.length ? 0 : prev + 1))
    }, 2500)

    return () => clearInterval(interval)
  }, [companies.length, itemsToShow])

  if (loading) return <div className="py-20 text-center text-blue-900">Loading Companies...</div>
  if (companies.length === 0) return null

  const extendedCompanies = [...companies, ...companies]
  const translatePercentage = 100 / itemsToShow

  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-6 text-center overflow-hidden">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
          Our Companies
        </h2>
        <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
        <p className="text-md sm:text-lg font-bold text-blue-900 mb-16">
          Discover our associated companies.
        </p>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * translatePercentage}%)`,
            }}
          >
            {extendedCompanies.map((company, index) => (
              <div
                key={`${company.id}-${index}`}
                style={{ width: `${translatePercentage}%` }}
                className="shrink-0 px-4 sm:px-6" // Slightly more horizontal padding to center the "larger" card
              >
                <div
                  className="
                    relative
                    /* HEIGHT ADJUSTMENTS: Increased height specifically for mobile */
                    h-56           /* Mobile: 224px (Large) */
                    sm:h-64        /* Tablet: 256px (Larger) */
                    md:h-52        /* Desktop: 208px (Standard) */
                    
                    transition-transform duration-300
                    hover:scale-105
                    hover:shadow-[0_10px_30px_rgba(52,152,219,0.15)]
                    rounded-2xl
                    flex items-center justify-center
                    bg-white border border-gray-100
                  "
                >
                  <Image
                    src={company.logo.url}
                    alt={company.name}
                    fill
                    /* PADDING ADJUSTMENT: Smaller padding on mobile (p-4) to maximize logo size */
                    className="object-contain p-4 sm:p-6 md:p-8"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
