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
        setCompanies(data.docs || [])
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      // Adjusted itemsToShow to ensure cards have a professional aspect ratio
      if (w < 480)
        setItemsToShow(2) // Mobile: 2 items looks better than 1 huge one
      else if (w < 768)
        setItemsToShow(3) // Tablet
      else if (w < 1024)
        setItemsToShow(4) // Small Desktop
      else setItemsToShow(5) // Large Desktop
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (companies.length <= itemsToShow) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= companies.length ? 0 : prev + 1))
    }, 2500)
    return () => clearInterval(interval)
  }, [companies.length, itemsToShow])

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

  if (companies.length === 0) return null

  const extendedCompanies = [...companies, ...companies]
  const translatePercentage = 100 / itemsToShow

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .oc-root { font-family: 'DM Sans', sans-serif; }
        .oc-display { font-family: 'Cormorant Garamond', serif; }

        .oc-section {
          background: linear-gradient(160deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }

        .oc-eyebrow {
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
        .oc-eyebrow::before, .oc-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: #219AEA;
          opacity: 0.5;
        }

        .oc-card-wrap {
          position: relative;
          border-radius: 18px;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          background: #ffffff;
          border: 1px solid rgba(33,154,234,0.1);
          overflow: hidden;
        }

        .oc-card-wrap:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(33,154,234,0.12);
          border-color: rgba(33,154,234,0.3);
        }

        .oc-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: white;
        }

        .oc-fade-left, .oc-fade-right {
          position: absolute; top: 0; bottom: 0; width: 60px; z-index: 10; pointer-events: none;
        }
        .oc-fade-left { left: 0; background: linear-gradient(90deg, #f8fbff, transparent); }
        .oc-fade-right { right: 0; background: linear-gradient(270deg, #f8fbff, transparent); }

        .oc-dot {
          height: 6px;
          border-radius: 100px;
          transition: all 0.4s ease;
          cursor: pointer;
          border: none;
        }
        .oc-dot.active {
          width: 24px;
          background: #219AEA;
        }
        .oc-dot.inactive {
          width: 6px;
          background: rgba(33,154,234,0.2);
        }

        .oc-name {
          margin-top: 12px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 500;
          color: #1e293b;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .oc-slide:hover .oc-name {
          opacity: 1;
        }
      `}</style>

      <section className="oc-root oc-section py-16 sm:py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <div className="mb-10 sm:mb-14">
            <div className="oc-eyebrow">Arksh Group</div>
            <h2
              className="oc-display font-bold text-[#0f1e3c] leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            >
              Our <span className="text-[#219AEA]">Companies</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm tracking-widest uppercase">
              Associated partners & subsidiaries
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="oc-fade-left hidden sm:block" />
            <div className="oc-fade-right hidden sm:block" />

            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * translatePercentage}%)` }}
            >
              {extendedCompanies.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  className="oc-slide shrink-0 px-2 sm:px-4"
                  style={{ width: `${translatePercentage}%` }}
                >
                  <div className="oc-card-wrap">
                    <div
                      className="oc-logo-container"
                      /* Increased height for small/medium: from 100px to 130px minimum */
                      style={{ height: 'clamp(130px, 16vw, 160px)' }}
                    >
                      <div className="relative w-full h-full p-3 sm:p-5 md:p-6">
                        <Image
                          src={company.logo.url}
                          alt={company.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="oc-name truncate px-2">{company.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-2">
              {companies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`oc-dot ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 tracking-tighter">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(companies.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
