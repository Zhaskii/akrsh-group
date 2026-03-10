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

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
          .ob-shimmer {
            background: linear-gradient(90deg,#f0f4f8 25%,#e8f0f8 50%,#f0f4f8 75%);
            background-size: 800px 100%;
            animation: shimmer 1.6s infinite linear;
            border-radius: 16px;
          }
        `}</style>
        <div
          className="py-20 flex flex-col items-center gap-5 px-6"
          style={{ background: 'linear-gradient(160deg,#f8fbff,#f0f6fe,#eaf3fd)' }}
        >
          <div className="ob-shimmer h-8 w-44 mb-1" />
          <div className="ob-shimmer h-1 w-14" />
          <div className="ob-shimmer h-4 w-52 mb-6" />
          <div className="flex gap-5 w-full max-w-5xl">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="ob-shimmer flex-1 h-32" />
            ))}
          </div>
        </div>
      </>
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

        .ob-section {
          background: linear-gradient(160deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }
        .ob-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.07), transparent 70%);
          pointer-events: none;
        }
        .ob-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,87,166,0.05), transparent 70%);
          pointer-events: none;
        }

        /* Eyebrow */
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

        /* Ornament */
        .ob-ornament {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          margin: 10px 0 16px;
        }
        .ob-orn-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.45));
        }
        .ob-orn-line.r {
          background: linear-gradient(90deg, rgba(33,154,234,0.45), transparent);
        }
        .ob-orn-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
          opacity: 0.6;
        }

        /* Brand card */
        .ob-brand-card {
          position: relative;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(33,154,234,0.1);
          box-shadow: 0 2px 16px rgba(35,87,166,0.06), 0 1px 3px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ob-brand-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          border-radius: 18px 18px 0 0;
        }
        .ob-brand-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 44px rgba(33,154,234,0.16), 0 4px 12px rgba(0,0,0,0.07);
          border-color: rgba(33,154,234,0.25);
        }
        .ob-brand-card:hover::before { transform: scaleX(1); }

        /* Fade edges */
        .ob-fade-left {
          position: absolute; top: 0; left: 0; bottom: 0; width: 80px;
          background: linear-gradient(90deg, rgba(240,246,254,0.9), transparent);
          z-index: 10; pointer-events: none;
        }
        .ob-fade-right {
          position: absolute; top: 0; right: 0; bottom: 0; width: 80px;
          background: linear-gradient(270deg, rgba(240,246,254,0.9), transparent);
          z-index: 10; pointer-events: none;
        }

        /* Dot */
        .ob-dot {
          height: 6px;
          border-radius: 100px;
          transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          border: none;
        }
        .ob-dot.active {
          width: 24px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          box-shadow: 0 2px 8px rgba(33,154,234,0.3);
        }
        .ob-dot.inactive {
          width: 6px;
          background: rgba(33,154,234,0.2);
        }
        .ob-dot.inactive:hover { background: rgba(33,154,234,0.4); }

        /* Counter */
        .ob-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(35,87,166,0.45);
          letter-spacing: 0.12em;
        }
      `}</style>

      <section className="ob-root ob-section py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center relative z-10">
          {/* ── Header ── */}
          <div className="mb-14">
            <div className="ob-eyebrow">Arksh Group</div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#0f1e3c',
              }}
            >
              Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Brands
              </span>
            </h2>

            <div className="ob-ornament">
              <div className="ob-orn-line" />
              <div className="ob-orn-diamond" />
              <div className="ob-orn-line r" />
            </div>

            <p
              style={{
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#2357A6',
                fontWeight: 500,
              }}
            >
              Discover our latest brands &amp; products
            </p>
          </div>

          {/* ── Carousel ── */}
          <div className="relative overflow-hidden">
            <div className="ob-fade-left" />
            <div className="ob-fade-right" />

            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * translatePercentage}%)` }}
            >
              {extendedBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  style={{ width: `${translatePercentage}%` }}
                  className="shrink-0 px-3 sm:px-4"
                >
                  <div className="ob-brand-card" style={{ height: 'clamp(120px, 14vw, 160px)' }}>
                    <Image
                      src={brand.logo.url}
                      alt={brand.name}
                      fill
                      className="object-contain p-5 sm:p-6 md:p-7 transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p
                    style={{
                      marginTop: 10,
                      fontSize: '0.72rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(35,87,166,0.5)',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {brand.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Dots + Counter ── */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {brands.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`ob-dot ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to brand ${idx + 1}`}
                />
              ))}
            </div>
            <span className="ob-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(brands.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
