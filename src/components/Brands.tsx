'use client'

import React, { useEffect, useRef, useState } from 'react'
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
  const isTransitioning = useRef(false)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brands?sort=order&limit=100')
        const data = await response.json()
        setBrands(data.docs || [])
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
      const w = window.innerWidth
      if (w < 480) setItemsToShow(2)
      else if (w < 768) setItemsToShow(3)
      else if (w < 1024) setItemsToShow(4)
      else setItemsToShow(5)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= brands.length ? 0 : prev + 1))
    }, 2500)
  }

  useEffect(() => {
    if (brands.length <= itemsToShow) return
    startAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [brands.length, itemsToShow])

  const pauseThenResume = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      if (brands.length > itemsToShow) startAutoplay()
    }, 4000)
  }

  const handlePrev = () => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length)
    setTimeout(() => {
      isTransitioning.current = false
    }, 700)
    pauseThenResume()
  }

  const handleNext = () => {
    if (isTransitioning.current) return
    isTransitioning.current = true
    setCurrentIndex((prev) => (prev + 1) % brands.length)
    setTimeout(() => {
      isTransitioning.current = false
    }, 700)
    pauseThenResume()
  }

  if (loading) {
    return (
      <div className="py-20 bg-slate-50 flex flex-col items-center gap-6 px-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg" />
        <div className="flex gap-5 w-full max-w-7xl overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-1 h-36 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    )
  }

  if (brands.length === 0) return null

  const extendedBrands = [...brands, ...brands]
  const translatePercentage = 100 / itemsToShow

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ob-root { font-family: 'DM Sans', sans-serif; }
        .ob-display { font-family: 'Cormorant Garamond', serif; }

        .ob-section {
          background: linear-gradient(160deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }

        .ob-eyebrow {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #219AEA;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .ob-eyebrow::before, .ob-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: #219AEA;
          opacity: 0.5;
        }

        /* Card */
        .ob-card-wrap {
          position: relative;
          border-radius: 18px;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          background: #ffffff;
          border: 1px solid rgba(33,154,234,0.1);
          overflow: hidden;
        }
        .ob-card-wrap:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(33,154,234,0.12);
          border-color: rgba(33,154,234,0.3);
        }

        .ob-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: white;
        }

        /* Nav buttons - Updated to match BG */
        .ob-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: transparent; /* Changed to transparent to let BG flow through */
          border: 1.5px solid rgba(33,154,234,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #219AEA;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ob-nav-btn:hover {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 24px rgba(33,154,234,0.32);
          transform: translateY(-50%) scale(1.1);
        }
        .ob-nav-btn:active {
          transform: translateY(-50%) scale(0.96);
        }
        .ob-nav-btn.left  { left: -21px; }
        .ob-nav-btn.right { right: -21px; }

        /* Fade edges */
        .ob-fade-left, .ob-fade-right {
          position: absolute; top: 0; bottom: 0; width: 60px; z-index: 10; pointer-events: none;
        }
        .ob-fade-left  { left: 0;  background: linear-gradient(90deg,  #f8fbff, transparent); }
        .ob-fade-right { right: 0; background: linear-gradient(270deg, #eaf3fd, transparent); }

        /* Dots */
        .ob-dot {
          height: 6px;
          border-radius: 100px;
          transition: all 0.4s ease;
          cursor: pointer;
          border: none;
        }
        .ob-dot.active   { width: 24px; background: #219AEA; }
        .ob-dot.inactive { width: 6px;  background: rgba(33,154,234,0.2); }
        .ob-dot.inactive:hover { background: rgba(33,154,234,0.4); }

        /* Name */
        .ob-name {
          margin-top: 12px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 500;
          color: #1e293b;
          opacity: 0.7;
          transition: opacity 0.3s ease, color 0.3s ease;
        }
        .ob-slide:hover .ob-name { opacity: 1; color: #219AEA; }
      `}</style>

      <section className="ob-root ob-section py-16 sm:py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 text-center relative z-10">
          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <div className="ob-eyebrow">Arksh Group</div>
            <h2
              className="ob-display font-bold text-[#0f1e3c] leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            >
              Our <span className="text-[#219AEA]">Brands</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-widest uppercase">
              Discover our latest brands &amp; products
            </p>
          </div>

          {/* Carousel */}
          <div className="relative overflow-visible px-8">
            {/* Fade edges */}
            <div className="ob-fade-left hidden sm:block" />
            <div className="ob-fade-right hidden sm:block" />

            {/* Prev button */}
            <button className="ob-nav-btn left" onClick={handlePrev} aria-label="Previous brands">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Track */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * translatePercentage}%)` }}
              >
                {extendedBrands.map((brand, index) => (
                  <div
                    key={`${brand.id}-${index}`}
                    className="ob-slide shrink-0 px-2 sm:px-3"
                    style={{ width: `${translatePercentage}%` }}
                  >
                    <div className="ob-card-wrap">
                      <div
                        className="ob-logo-container"
                        style={{ height: 'clamp(130px, 16vw, 160px)' }}
                      >
                        <div className="relative w-full h-full p-3 sm:p-5 md:p-6">
                          <Image
                            src={brand.logo.url}
                            alt={brand.name}
                            fill
                            className="object-contain transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="ob-name truncate px-2">{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button className="ob-nav-btn right" onClick={handleNext} aria-label="Next brands">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dots + counter */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {brands.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`ob-dot ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-tighter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
