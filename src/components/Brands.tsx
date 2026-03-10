'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Brand {
  id: string
  name: string
  logo: {
    url: string
    alt?: string
  }
}

export default function OurBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [itemsToShow, setItemsToShow] = useState(5)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands?sort=order&limit=100')
        const data = await response.json()
        setBrands(data.docs)
      } catch (error) {
        console.error('Error fetching brands:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1)
      else if (window.innerWidth < 768) setItemsToShow(2)
      else if (window.innerWidth < 1024) setItemsToShow(3)
      else setItemsToShow(5)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (brands.length <= itemsToShow) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= brands.length ? 0 : prev + 1))
    }, 2500)

    return () => clearInterval(interval)
  }, [brands.length, itemsToShow])

  if (loading) return <div className="py-20 text-center text-[#3498db]">Loading Brands...</div>
  if (brands.length === 0) return null

  const extendedBrands = [...brands, ...brands]
  const translatePercentage = 100 / itemsToShow

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#3498db] mb-2 tracking-tight">
          Our Brands
        </h2>
        <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
        <p className="text-md sm:text-lg font-bold text-blue-900 mb-16">
          Discover our latest brands and products.
        </p>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * translatePercentage}%)`,
            }}
          >
            {extendedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                style={{ width: `${translatePercentage}%` }}
                className="shrink-0 px-4 sm:px-6"
              >
                <div
                  className="
                    relative
                    /* Larger height for small devices */
                    h-56           /* Mobile */
                    sm:h-64        /* Tablet */
                    md:h-48        /* Desktop back to standard */
                    
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-[0_10px_30px_rgba(52,152,219,0.15)]
                    rounded-2xl
                    flex items-center justify-center
                    bg-white border border-gray-100
                  "
                >
                  <Image
                    src={brand.logo.url}
                    alt={brand.name}
                    fill
                    /* Reduced padding on mobile (p-4) to make the logo look bigger */
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
