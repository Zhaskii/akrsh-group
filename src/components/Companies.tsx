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

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
          @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
          .oc-shimmer {
            background: linear-gradient(90deg,#f0f4f8 25%,#e4edf5 50%,#f0f4f8 75%);
            background-size: 800px 100%;
            animation: shimmer 1.6s infinite linear;
            border-radius: 16px;
          }
        `}</style>
        <div className="py-20 bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 flex flex-col items-center gap-6 px-6">
          <div className="oc-shimmer h-8 w-48 mb-2" />
          <div className="oc-shimmer h-1 w-16" />
          <div className="oc-shimmer h-4 w-56 mb-6" />
          <div className="flex gap-5 w-full max-w-5xl">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="oc-shimmer flex-1 h-36" />
            ))}
          </div>
        </div>
      </>
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
        .oc-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.07), transparent 70%);
          pointer-events: none;
        }
        .oc-section::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -80px;
          width: 360px; height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,87,166,0.05), transparent 70%);
          pointer-events: none;
        }

        /* Eyebrow */
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

        /* Ornament */
        .oc-ornament {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          margin: 10px 0 16px;
        }
        .oc-orn-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.45));
        }
        .oc-orn-line.r {
          background: linear-gradient(90deg, rgba(33,154,234,0.45), transparent);
        }
        .oc-orn-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
          opacity: 0.6;
        }

        /* Logo card */
        .oc-logo-card {
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
        .oc-logo-card::before {
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
        .oc-logo-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 16px 44px rgba(33,154,234,0.16), 0 4px 12px rgba(0,0,0,0.07);
          border-color: rgba(33,154,234,0.25);
        }
        .oc-logo-card:hover::before { transform: scaleX(1); }

        /* Fade edges on carousel */
        .oc-fade-left {
          position: absolute; top: 0; left: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(90deg, rgba(240,246,254,0.9), transparent);
          z-index: 10;
          pointer-events: none;
        }
        .oc-fade-right {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(270deg, rgba(240,246,254,0.9), transparent);
          z-index: 10;
          pointer-events: none;
        }

        /* Counter */
        .oc-counter {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          color: rgba(35,87,166,0.45);
          letter-spacing: 0.12em;
        }

        /* Dot */
        .oc-dot {
          height: 6px;
          border-radius: 100px;
          transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
          border: none;
        }
        .oc-dot.active {
          width: 24px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          box-shadow: 0 2px 8px rgba(33,154,234,0.3);
        }
        .oc-dot.inactive {
          width: 6px;
          background: rgba(33,154,234,0.2);
        }
      `}</style>

      <section className="oc-root oc-section py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center relative z-10">
          {/* ── Header ── */}
          <div className="mb-14">
            <div className="oc-eyebrow">Arksh Group</div>

            <h2
              className="oc-display font-bold text-[#0f1e3c] leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Companies
              </span>
            </h2>

            <div className="oc-ornament">
              <div className="oc-orn-line" />
              <div className="oc-orn-diamond" />
              <div className="oc-orn-line r" />
            </div>

            <p
              className="text-[#2357A6] font-medium"
              style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Discover our associated companies
            </p>
          </div>

          {/* ── Carousel ── */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="oc-fade-left" />
            <div className="oc-fade-right" />

            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * translatePercentage}%)` }}
            >
              {extendedCompanies.map((company, index) => (
                <div
                  key={`${company.id}-${index}`}
                  style={{ width: `${translatePercentage}%` }}
                  className="shrink-0 px-3 sm:px-4"
                >
                  <div className="oc-logo-card" style={{ height: 'clamp(120px, 14vw, 160px)' }}>
                    <Image
                      src={company.logo.url}
                      alt={company.name}
                      fill
                      className="object-contain p-5 sm:p-6 md:p-7 transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Company name below card */}
                  <p
                    className="mt-3 text-center text-[#2357A6] font-medium truncate px-1"
                    style={{ fontSize: '0.72rem', letterSpacing: '0.06em', opacity: 0.7 }}
                  >
                    {company.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Dots + Counter ── */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {companies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`oc-dot ${currentIndex === idx ? 'active' : 'inactive'}`}
                  aria-label={`Go to company ${idx + 1}`}
                />
              ))}
            </div>
            <span className="oc-counter">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(companies.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
