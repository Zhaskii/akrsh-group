'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  useEffect(() => {
    if (isPaused || !mounted || products.length === 0) return

    // The interval is set to 3000ms (3 seconds)
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
    const imagesToShow =
      typeof window !== 'undefined' && window.innerWidth >= 768 ? Math.min(3, products.length) : 1
    for (let i = 0; i < imagesToShow; i++) {
      visible.push(products[(currentIndex + i) % products.length])
    }
    return visible
  }

  if (!mounted || loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
          .shimmer-box {
            background: linear-gradient(90deg, #f0f4f8 25%, #e4edf5 50%, #f0f4f8 75%);
            background-size: 800px 100%;
            animation: shimmer 1.6s infinite linear;
            border-radius: 16px;
          }
        `}</style>
        <div className="py-20 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 min-h-96 flex flex-col items-center justify-center gap-6 px-6">
          <div className="text-center mb-4">
            <div className="shimmer-box h-8 w-64 mx-auto mb-3" />
            <div className="shimmer-box h-1 w-16 mx-auto mb-4" />
            <div className="shimmer-box h-4 w-48 mx-auto" />
          </div>
          <div className="flex gap-6 w-full max-w-5xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="shimmer-box flex-1 h-72" />
            ))}
          </div>
        </div>
      </>
    )
  }

  if (products.length === 0) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .fp-root { font-family: 'DM Sans', sans-serif; }
        .fp-display { font-family: 'Cormorant Garamond', serif; }

        .fp-section {
          background: linear-gradient(160deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }
        .fp-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 450px; height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.07), transparent 70%);
          pointer-events: none;
        }
        .fp-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,87,166,0.05), transparent 70%);
          pointer-events: none;
        }

        /* Eyebrow */
        .fp-eyebrow {
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
        .fp-eyebrow::before, .fp-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: #219AEA;
          opacity: 0.5;
        }

        /* Ornament */
        .fp-ornament {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          margin: 10px 0 16px;
        }
        .fp-orn-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.45));
        }
        .fp-orn-line.r {
          background: linear-gradient(90deg, rgba(33,154,234,0.45), transparent);
        }
        .fp-orn-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
          opacity: 0.6;
        }

        /* Nav buttons */
        .fp-nav-btn {
          width: 46px; height: 46px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(33,154,234,0.18);
          box-shadow: 0 4px 16px rgba(33,154,234,0.1), 0 1px 4px rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: center;
          color: #219AEA;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .fp-nav-btn:hover {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 28px rgba(33,154,234,0.35);
          transform: scale(1.08);
        }

        /* Image card */
        .fp-img-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(35,87,166,0.12), 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.8);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .fp-img-card:hover {
          box-shadow: 0 20px 52px rgba(33,154,234,0.18), 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-4px);
        }
        .fp-img-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(35,87,166,0.12) 0%, transparent 50%);
          pointer-events: none;
          border-radius: 18px;
        }

        /* Dot */
        .fp-dot {
          height: 8px;
          border-radius: 100px;
          transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
        }
        .fp-dot.active {
          width: 32px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          box-shadow: 0 2px 8px rgba(33,154,234,0.35);
        }
        .fp-dot.inactive {
          width: 8px;
          background: rgba(33,154,234,0.2);
        }
        .fp-dot.inactive:hover {
          background: rgba(33,154,234,0.4);
        }

        /* Counter */
        .fp-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(35,87,166,0.5);
          letter-spacing: 0.12em;
        }
      `}</style>

      <section
        className="fp-root fp-section py-20 sm:py-24 w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-full px-5 sm:px-8 relative z-10">
          {/* ── Header ── */}
          <div className="text-center mb-14">
            <div className="fp-eyebrow">Arksh Group</div>

            <h2
              className="fp-display font-bold text-[#0f1e3c] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Featured{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Products & Services
              </span>
            </h2>

            <div className="fp-ornament">
              <div className="fp-orn-line" />
              <div className="fp-orn-diamond" />
              <div className="fp-orn-line r" />
            </div>

            <p
              className="text-[#2357A6] font-medium"
              style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Discover our latest offerings
            </p>
          </div>

          {/* ── Carousel ── */}
          <div className="relative px-4 md:px-16 max-w-7xl mx-auto">
            {/* Prev */}
            <button
              onClick={handlePrev}
              className="fp-nav-btn absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex"
              aria-label="Previous"
            >
              <svg
                width="18"
                height="18"
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

            {/* Images */}
            <div
              className={`flex gap-4 sm:gap-6 transition-all duration-500 ease-in-out ${
                isTransitioning
                  ? 'opacity-30 scale-[0.985] blur-[1.5px]'
                  : 'opacity-100 scale-100 blur-0'
              }`}
            >
              {getVisibleImages().map((product, idx) => (
                <div
                  key={`${product.id}-${idx}`}
                  className="fp-img-card relative w-full"
                  style={{ height: 'clamp(280px, 35vw, 480px)' }}
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

            {/* Next */}
            <button
              onClick={handleNext}
              className="fp-nav-btn absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex"
              aria-label="Next"
            >
              <svg
                width="18"
                height="18"
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

          {/* ── Dots + Counter ── */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex items-center gap-2">
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
                  className={`fp-dot ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="fp-counter">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
