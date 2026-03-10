'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import hero1 from '@/assets/heroBg/Arksh-Group-Annual-Awards.png'
import hero2 from '@/assets/heroBg/Arksh-Agro-BG.jpg'
import hero3 from '@/assets/heroBg/Arksh-Food-BG.jpg'
import hero4 from '@/assets/heroBg/Daami-BG.jpg'
import hero5 from '@/assets/heroBg/Dream-Skin-BG2.jpg'
import hero6 from '@/assets/heroBg/Fragnance-Room-BG.jpg'
import hero7 from '@/assets/heroBg/Fynnaza-BG.jpg'
import hero8 from '@/assets/heroBg/Golden-Dragon-BG.jpg'
import hero10 from '@/assets/heroBg/Higer-BG.jpg'
import hero11 from '@/assets/heroBg/Hotel-Peaceland-BG.jpg'
import hero12 from '@/assets/heroBg/LF-BG.jpg'
import hero14 from '@/assets/heroBg/Luxury-BG.jpg'
import hero15 from '@/assets/heroBg/MacCoffee-BG.jpg'
import hero17 from '@/assets/heroBg/Nirvana-BG2.jpg'
import hero18 from '@/assets/heroBg/Urban-Earth-BG.jpg'

const HERO_IMAGES = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
  hero10,
  hero11,
  hero12,
  hero14,
  hero15,
  hero17,
  hero18,
]

const SLIDE_DURATION = 4000

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftInView, setLeftInView] = useState(false)
  const [rightInView, setRightInView] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetProgress = () => {
    setProgress(0)
    if (progressRef.current) clearInterval(progressRef.current)
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0
        return p + 100 / (SLIDE_DURATION / 50)
      })
    }, 50)
  }

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    resetProgress()
  }

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
    resetProgress()
  }

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index)
    resetProgress()
  }

  useEffect(() => {
    resetProgress()
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(nextSlide, SLIDE_DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentImageIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current && entry.isIntersecting) setLeftInView(true)
          if (entry.target === rightRef.current && entry.isIntersecting) setRightInView(true)
        })
      },
      { threshold: 0.25 },
    )
    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        .hero-root { font-family: 'Outfit', sans-serif; }
        .display-font { font-family: 'Cormorant Garamond', serif; }

        /* Slideshow */
        .slide-counter {
          font-family: 'Outfit', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.7);
        }
        .progress-bar-track {
          background: rgba(255,255,255,0.2);
          border-radius: 100px;
          height: 2px;
          overflow: hidden;
          flex: 1;
        }
        .progress-bar-fill {
          height: 100%;
          background: white;
          border-radius: 100px;
          transition: width 0.05s linear;
        }

        /* Nav arrows */
        .nav-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .nav-btn:hover {
          background: rgba(33,154,234,0.5);
          border-color: rgba(33,154,234,0.8);
          transform: scale(1.08);
        }

        /* Dot indicators */
        .dot-indicator {
          width: 6px; height: 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dot-indicator.active {
          width: 24px;
          background: white;
        }
        .dot-indicator:hover {
          background: rgba(255,255,255,0.7);
        }

        /* Bottom gradient */
        .slide-gradient {
          background: linear-gradient(
            to top,
            rgba(5, 15, 35, 0.85) 0%,
            rgba(5, 15, 35, 0.3) 45%,
            transparent 100%
          );
        }

        /* Cinematic letterbox bars */
        .letterbox-top { background: linear-gradient(to bottom, rgba(0,0,0,0.35), transparent); }
        .letterbox-bottom { background: linear-gradient(to top, rgba(0,0,0,0.45), transparent); }

        /* Content section */
        .content-section {
          background: linear-gradient(160deg, #ffffff 0%, #f4f8fe 55%, #eef4fc 100%);
        }

        /* Accent line */
        .accent-line {
          width: 56px; height: 2px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          border-radius: 2px;
        }

        /* Headline gradient */
        .headline-gradient {
          background: linear-gradient(135deg, #0f1e3c 0%, #219AEA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Image card */
        .image-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 64px rgba(33,87,166,0.18), 0 8px 24px rgba(0,0,0,0.1);
        }
        .image-card::before {
          content: '';
          position: absolute;
          inset: -14px -14px 14px 14px;
          border: 1.5px solid rgba(33,154,234,0.2);
          border-radius: 24px;
          z-index: -1;
          pointer-events: none;
        }
        .image-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(33,154,234,0.08), rgba(35,87,166,0.12));
        }
        .image-card-badge {
          position: absolute;
          bottom: 20px; left: 20px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border-radius: 100px;
          padding: 8px 18px;
          display: flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #219AEA;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(33,154,234,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(33,154,234,0); }
        }

        /* Year badge */
        .year-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(33,154,234,0.08);
          border: 1px solid rgba(33,154,234,0.2);
          border-radius: 100px;
          padding: 5px 14px 5px 5px;
          margin-bottom: 18px;
        }
        .year-badge-pill {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          color: white;
          border-radius: 100px;
          padding: 2px 10px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .year-badge-text {
          font-size: 0.72rem;
          color: #2357A6;
          font-weight: 500;
          letter-spacing: 0.06em;
        }

        /* CTA Button */
        .cta-btn {
          position: relative;
          background: linear-gradient(135deg, #219AEA 0%, #2357A6 100%);
          color: white;
          padding: 13px 30px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
          border: none;
        }
        .cta-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cta-btn:hover { box-shadow: 0 10px 32px rgba(33,154,234,0.45); transform: translateY(-2px); }
        .cta-btn:hover::after { opacity: 1; }

        /* Secondary link */
        .secondary-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #2357A6;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: gap 0.25s ease;
          text-decoration: none;
        }
        .secondary-link:hover { gap: 10px; }
        .secondary-link svg { transition: transform 0.25s; }
        .secondary-link:hover svg { transform: translateX(2px); }

        /* Slide-in animations */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }

        /* Stats row */
        .stat-item {
          padding: 0 20px;
          border-right: 1px solid rgba(33,154,234,0.15);
        }
        .stat-item:first-child { padding-left: 0; }
        .stat-item:last-child { border-right: none; }
      `}</style>

      <div className="hero-root">
        {/* ── Cinematic Slideshow ── */}
        <div className="group relative w-full h-[38vh] sm:h-[62vh] md:h-[74vh] lg:h-[84vh] xl:h-[88vh] overflow-hidden bg-gray-900">
          {/* Slides */}
          {HERO_IMAGES.map((imageAsset, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ transitionDuration: '1200ms' }}
            >
              <Image
                src={imageAsset}
                alt={`Arksh Group ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center scale-[1.02] transition-transform duration-6000 ease-out"
                style={{ transform: index === currentImageIndex ? 'scale(1)' : 'scale(1.04)' }}
                placeholder="blur"
              />
            </div>
          ))}

          {/* Cinematic overlays */}
          <div className="letterbox-top absolute top-0 left-0 right-0 h-24 z-20 pointer-events-none" />
          <div className="letterbox-bottom absolute bottom-0 left-0 right-0 h-2/5 z-20 pointer-events-none" />

          {/* Bottom HUD — slide info + controls */}
          <div className="absolute bottom-0 left-0 right-0 z-30 px-5 sm:px-8 md:px-12 pb-5 sm:pb-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
              {/* Left: counter + progress */}
              <div className="flex items-center gap-3 flex-1">
                <span className="slide-counter">
                  {String(currentImageIndex + 1).padStart(2, '0')} /{' '}
                  {String(HERO_IMAGES.length).padStart(2, '0')}
                </span>
                <div className="progress-bar-track hidden sm:block">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Center: dot indicators */}
              <div className="flex items-center gap-1.5">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`dot-indicator ${i === currentImageIndex ? 'active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Right: nav arrows */}
              <div className="flex items-center gap-2">
                <button onClick={prevSlide} className="nav-btn" aria-label="Previous">
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="nav-btn" aria-label="Next">
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Brand watermark */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-10 z-30 hidden sm:block">
            <span
              className="display-font text-white/20 font-bold select-none pointer-events-none"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', letterSpacing: '0.12em' }}
            >
              ARKSH GROUP
            </span>
          </div>
        </div>

        {/* ── Content Section ── */}
        <section className="content-section w-full py-14 sm:py-18 md:py-22 lg:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Content */}
              <div
                ref={leftRef}
                className="max-w-xl"
                style={{
                  opacity: leftInView ? 1 : 0,
                  transform: leftInView ? 'translateY(0)' : 'translateY(32px)',
                  transition:
                    'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              >
                {/* Year badge */}
                <div className="year-badge">
                  <span className="year-badge-pill">Est. 1978</span>
                  <span className="year-badge-text">45+ Years of Excellence</span>
                </div>

                {/* Headline */}
                <h1
                  className="display-font font-bold mb-3 leading-tight"
                  style={{
                    fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
                    lineHeight: 1.12,
                    color: '#0f1e3c',
                  }}
                >
                  Unlocking{' '}
                  <em
                    style={{
                      fontStyle: 'italic',
                      background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Boundless
                  </em>
                  <br />
                  Possibilities
                </h1>

                <div className="accent-line mb-5" />

                <p
                  className="text-gray-600 leading-relaxed mb-3 text-justify"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.975rem)', lineHeight: 1.85 }}
                >
                  The business journey of Arksh Group, formerly known as R. K Associates, started
                  back in 1978 A.D when{' '}
                  <strong className="text-[#0f1e3c] font-semibold">Dr. Rajesh Kazi Shrestha</strong>
                  , an energetic, young, proactive entrepreneur established Rajesh Concern with the
                  objective of trade and hospitality business.
                </p>

                {/* Stats */}
                <div
                  className="flex items-center mb-8 mt-6"
                  style={{
                    opacity: leftInView ? 1 : 0,
                    transform: leftInView ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease',
                  }}
                >
                  {[
                    { value: '45+', label: 'Years' },
                    { value: '15+', label: 'Companies' },
                    { value: '1000+', label: 'Employees' },
                  ].map((s) => (
                    <div key={s.label} className="stat-item">
                      <p
                        className="display-font font-bold text-[#219AEA]"
                        style={{ fontSize: '1.6rem', lineHeight: 1 }}
                      >
                        {s.value}
                      </p>
                      <p
                        className="text-gray-500 mt-0.5"
                        style={{
                          fontSize: '0.7rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-6 flex-wrap"
                  style={{
                    opacity: leftInView ? 1 : 0,
                    transform: leftInView ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.8s 0.35s ease, transform 0.8s 0.35s ease',
                  }}
                >
                  <Link href="/about">
                    <button className="cta-btn">Discover Our Story</button>
                  </Link>
                  <Link href="/companies" className="secondary-link">
                    Our Companies
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div
                ref={rightRef}
                className="image-card"
                style={{
                  aspectRatio: '4 / 3',
                  opacity: rightInView ? 1 : 0,
                  transform: rightInView
                    ? 'translateY(0) scale(1)'
                    : 'translateY(24px) scale(0.98)',
                  transition:
                    'opacity 0.9s 0.2s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s 0.2s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://arkshgroup.com/uploads/about/Lumbini-celebrating-45-years-copy.jpg')",
                  }}
                />
                <div className="image-card-overlay" />

                {/* Floating badge */}
                <div className="image-card-badge">
                  <div className="badge-dot" />
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#0f1e3c',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Celebrating 45 Years
                  </span>
                </div>

                {/* Corner accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderTop: '2px solid rgba(33,154,234,0.5)',
                    borderRight: '2px solid rgba(33,154,234,0.5)',
                    borderRadius: '0 8px 0 0',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    width: 36,
                    height: 36,
                    borderBottom: '2px solid rgba(33,154,234,0.5)',
                    borderLeft: '2px solid rgba(33,154,234,0.5)',
                    borderRadius: '0 0 0 8px',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
