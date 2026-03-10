'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Define the type based on your Payload Collection
interface FeaturedProduct {
  id: string
  image: {
    url: string
    alt?: string
  }
  order: number
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch data from Payload CMS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Adjust URL to your environment (e.g., http://localhost:3000/api/featured-products)
        const response = await fetch('/api/featured-products?sort=order&limit=10')
        const data = await response.json()
        setProducts(data.docs)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
        setMounted(true)
      }
    }

    fetchProducts()
  }, [])

  // Auto-slide logic
  useEffect(() => {
    if (isPaused || !mounted || products.length === 0) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused, mounted, products.length])

  const handleNext = () => {
    if (products.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
      setIsTransitioning(false)
    }, 400)
  }

  const handlePrev = () => {
    if (products.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
      setIsTransitioning(false)
    }, 400)
  }

  const getVisibleImages = () => {
    if (products.length === 0) return []
    const visible = []
    const imagesToShow = window.innerWidth >= 768 ? Math.min(3, products.length) : 1

    for (let i = 0; i < imagesToShow; i++) {
      visible.push(products[(currentIndex + i) % products.length])
    }
    return visible
  }

  // Loading state or empty state
  if (!mounted || loading) {
    return (
      <div className="py-16 bg-white min-h-100 flex items-center justify-center">Loading...</div>
    )
  }

  if (products.length === 0) return null

  return (
    <section
      className="py-16 bg-[#F5F5F7] w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3498DB] relative inline-block">
            Our Featured Products & Services
          </h2>
          <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
          <p className="text-lg font-bold text-blue-900">
            Discover our latest products and services.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-4 md:px-12">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block text-4xl"
          >
            ‹
          </button>

          {/* Images Grid */}
          <div
            className={`flex gap-2 sm:gap-5 md:gap-8 transition-all duration-700 ease-in-out ${
              isTransitioning
                ? 'opacity-40 scale-[0.98] blur-[2px]'
                : 'opacity-100 scale-100 blur-0'
            }`}
          >
            {getVisibleImages().map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="relative w-full h-80 sm:h-105 md:h-130 lg:h-120 overflow-hidden rounded shadow-xl"
              >
                <Image
                  src={product.image.url}
                  alt={product.image.alt || 'Featured Product'}
                  fill
                  className="object-fill transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={currentIndex === 0}
                />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white shadow-lg rounded-full text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block text-4xl"
          >
            ›
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (currentIndex === idx) return
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(idx)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === idx ? 'w-10 bg-[#3498db]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
