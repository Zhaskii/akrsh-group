'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/solid'
import PageBanner from '@/components/PageBanner'
import Link from 'next/link'
import { gallery, interviews } from '@/constant/ceo.data'

export default function AboutCEO() {
  // --- INTERVIEW SLIDESHOW LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // --- GALLERY SLIDESHOW LOGIC ---
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isGalleryPaused, setIsGalleryPaused] = useState(false)
  const [isGalleryTransitioning, setIsGalleryTransitioning] = useState(false)

  // --- LIGHTBOX STATE ---
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLightboxPlaying, setIsLightboxPlaying] = useState(false)

  // Interview Auto-slide
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused])

  // Gallery Auto-slide
  useEffect(() => {
    if (isGalleryPaused || selectedImageIdx !== null) return
    const interval = setInterval(() => {
      handleGalleryNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [galleryIndex, isGalleryPaused, selectedImageIdx])

  // Lightbox Slideshow Auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLightboxPlaying && selectedImageIdx !== null) {
      interval = setInterval(() => {
        setZoomLevel(1) // Reset zoom on next slide
        setSelectedImageIdx((prev) => (prev! + 1) % gallery.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isLightboxPlaying, selectedImageIdx, gallery.length])

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % interviews.length)
      setIsTransitioning(false)
    }, 400)
  }

  const handlePrev = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + interviews.length) % interviews.length)
      setIsTransitioning(false)
    }, 400)
  }

  const handleGalleryNext = () => {
    setIsGalleryTransitioning(true)
    setTimeout(() => {
      setGalleryIndex((prev) => (prev + 1) % gallery.length)
      setIsGalleryTransitioning(false)
    }, 400)
  }

  const handleGalleryPrev = () => {
    setIsGalleryTransitioning(true)
    setTimeout(() => {
      setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
      setIsGalleryTransitioning(false)
    }, 400)
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  const closeLightbox = () => {
    setSelectedImageIdx(null)
    setZoomLevel(1)
    setIsLightboxPlaying(false)
  }

  const getVisibleInterviews = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(interviews[(currentIndex + i) % interviews.length])
    }
    return items
  }

  const getVisibleGallery = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(gallery[(galleryIndex + i) % gallery.length])
    }
    return items
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
      <PageBanner
        title="Message from CEO"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Ceo Message' },
        ]}
      />

      {/* SECTION 1: CEO MESSAGE */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-4xl md:rounded-[3rem] overflow-hidden border border-gray-50 shadow-[0_10px_50px_rgba(0,0,0,0.03)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-[40%] relative h-112.5 lg:h-auto min-h-125 overflow-hidden group">
              <Image
                src="https://www.arkshgroup.com/rajul-shrestha-ceo-arksh-group-1.jpg"
                alt="Rajul Shrestha"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-10 left-6 right-6 transition-all duration-500 ease-out group-hover:-translate-y-2">
                <div className="bg-[#2257A6] p-6 rounded-2xl shadow-xl inline-block min-w-60">
                  <h2 className="text-white text-3xl font-bold tracking-tight">Rajul Shrestha</h2>
                  <div className="h-0.5 w-12 bg-white/30 my-2 transition-all duration-500 group-hover:w-20"></div>
                  <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-[60%] p-8 md:p-12 lg:p-16 relative">
              <div className="absolute top-10 right-10 opacity-10">
                <svg
                  width="60"
                  height="45"
                  viewBox="0 0 75 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 0C8.39062 0 0 8.39062 0 18.75V56.25H28.125V18.75H9.375C9.375 13.5703 13.5703 9.375 18.75 9.375V0ZM65.625 0C55.2656 0 46.875 8.39062 46.875 18.75V56.25H75V18.75H56.25C56.25 13.5703 60.4453 9.375 65.625 9.375V0Z"
                    fill="#2257A6"
                  />
                </svg>
              </div>
              <div className="space-y-6 text-gray-600 leading-[1.8] text-[17px]">
                <p>
                  I am in no misconception about what an enormous privilege it is to be sharing a
                  few words on this page as the CEO of Arksh Group. Life for me, so far, has been a
                  journey filled with unexpected interactions and results.
                </p>{' '}
                <p>
                  These experiences have been the determinants of my characteristics; that is of an
                  individual with a keen interest in learning and gaining new information and
                  continuously building my knowledge.
                </p>{' '}
                <p>
                  Having spent nearly half my life abroad for studies, I have had vast exposure of
                  foreign customs, institutions and systems. Perhaps this is the reason that has led
                  me to envision a modern future for Arksh Group. I believe it is important to move
                  with, if not ahead of time. Yet, the core principals upon which the company was
                  established will always remain the fundamentals for every avenue we turn.
                </p>{' '}
                <p>
                  Completing my Master's degree with distinction from England, United Kingdom felt
                  like a huge accomplishment at the time but now, I face bigger challenges. As I
                  commence my journey as the CEO of one of the most influential companies of the
                  nation, I am very well aware of the huge responsibility I carry towards the
                  company itself, our partners, our customers and also towards the society we live
                  in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMMITMENT */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-medium text-[#2257A6] mb-8">
            Our Commitment to Society
            <div className="h-1 w-20 bg-[#2257A6] mt-4 rounded-full"></div>
          </h2>
          <div className="space-y-10">
            <p className="text-gray-600 text-lg leading-relaxed">
              As I look ahead at the long road that stretches in front of me, I am even more
              determined to work rigorously hard to fulfill my duties. With the recent revamp of the
              brand image, I envision to create a better working environment for our staff who play
              a crucial role in meeting and exceeding the expectations of our customers. This, in
              turn, will drive the success of the company and along with it our society too.
            </p>
            {[
              'It is my belief that every part of the society we live in must advance with the economy of the nation. We should give back to the society that we live and work in by helping the needed. We must provide equal opportunities to those who are qualified as well as to those who are less able than the rest.',
              'We must instill upon every single individual that they are proficient, no matter what their capabilities, everyone is capable of achieving their goals. This attitude is critical is driving the society forward and to provide such opportunities will be one amongst the many contribution of Arksh Group to the society.',
            ].map((text, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                <div className="bg-[#2257A6] p-1.5 rounded-full mt-1.5">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EXCLUSIVE INTERVIEWS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-[#E4F0FD] text-[#2257A6] px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Our CEO
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-[#2257A6] mb-4">
            Exclusive Interviews
          </h2>
          <div className="w-20 h-1.5 bg-[#2257A6] mx-auto mb-8 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg mb-16">
            Gain insights and perspectives from our leadership through these selected media
            appearances.
          </p>

          <div
            className="relative px-4 md:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#2257A6] hover:bg-[#2257A6] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ease-in-out ${
                isTransitioning
                  ? 'opacity-40 scale-[0.98] blur-[2px]'
                  : 'opacity-100 scale-100 blur-0'
              }`}
            >
              {getVisibleInterviews().map((item, index) => (
                <Link href={item.url} target="_blank" key={`${item.id}-${index}`}>
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl group cursor-pointer transition-transform duration-500 hover:shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-[#2257A6] rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 transform group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#2257A6] hover:bg-[#2257A6] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {interviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsTransitioning(true)
                  setTimeout(() => {
                    setCurrentIndex(idx)
                    setIsTransitioning(false)
                  }, 300)
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentIndex === idx ? 'w-10 bg-[#2257A6]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GALLERY */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="bg-[#E4F0FD] text-[#2257A6] px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
            Photo Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#2257A6] mt-6 mb-4">
            CEO Gallery Collection
          </h2>
          <div className="w-20 h-1.5 bg-[#2257A6] mx-auto mb-16 rounded-full"></div>

          <div
            className="relative px-4 md:px-12"
            onMouseEnter={() => setIsGalleryPaused(true)}
            onMouseLeave={() => setIsGalleryPaused(false)}
          >
            <button
              onClick={handleGalleryPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#2257A6] hover:bg-[#2257A6] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-10 transition-all duration-700 ease-in-out ${
                isGalleryTransitioning
                  ? 'opacity-40 scale-[0.98] blur-[2px]'
                  : 'opacity-100 scale-100 blur-0'
              }`}
            >
              {getVisibleGallery().map((item, index) => {
                const actualIdx = gallery.findIndex((g) => g.id === item.id)
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => setSelectedImageIdx(actualIdx)}
                  >
                    <div className="relative aspect-4/3 rounded-3xl overflow-hidden border-10 border-white shadow-2xl transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 font-bold uppercase tracking-widest text-sm">
                          View Full
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleGalleryNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white shadow-lg rounded-full text-[#2257A6] hover:bg-[#2257A6] hover:text-white transition-all duration-300 border border-gray-100 hidden md:block"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-16">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsGalleryTransitioning(true)
                  setTimeout(() => {
                    setGalleryIndex(idx)
                    setIsGalleryTransitioning(false)
                  }, 300)
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  galleryIndex === idx ? 'w-10 bg-[#2257A6]' : 'w-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImageIdx !== null && (
        <div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 transition-all duration-500"
          onClick={closeLightbox}
        >
          {/* TOP CONTROL BAR */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-120 bg-linear-to-b from-black/60 to-transparent">
            <div className="flex gap-4 items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLightboxPlaying(!isLightboxPlaying)
                }}
                className="text-white hover:text-blue-400 p-2 bg-white/10 rounded-full transition-colors"
              >
                {isLightboxPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomLevel((prev) => Math.min(prev + 0.5, 3))
                }}
                className="text-white hover:text-blue-400 p-2 bg-white/10 rounded-full transition-colors"
              >
                <MagnifyingGlassPlusIcon className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoomLevel((prev) => Math.max(prev - 0.5, 1))
                }}
                className="text-white hover:text-blue-400 p-2 bg-white/10 rounded-full transition-colors"
              >
                <MagnifyingGlassMinusIcon className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFullScreen()
                }}
                className="text-white hover:text-blue-400 p-2 bg-white/10 rounded-full transition-colors"
              >
                <ArrowsPointingOutIcon className="w-6 h-6" />
              </button>
            </div>

            <button
              className="text-white hover:text-red-500 p-2 bg-white/10 rounded-full transition-colors"
              onClick={closeLightbox}
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
          </div>

          {/* LIGHTBOX NAVIGATION */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setZoomLevel(1)
              setSelectedImageIdx((prev) => (prev! - 1 + gallery.length) % gallery.length)
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-110 transition-colors"
          >
            <ChevronLeftIcon className="w-12 h-12" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setZoomLevel(1)
              setSelectedImageIdx((prev) => (prev! + 1) % gallery.length)
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-110 transition-colors"
          >
            <ChevronRightIcon className="w-12 h-12" />
          </button>

          {/* IMAGE CONTAINER */}
          <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
            <div
              className="relative w-[90%] h-full transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[selectedImageIdx].image}
                alt="Full View"
                fill
                className="object-contain animate-in zoom-in duration-300"
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-10 text-white/70 font-medium tracking-widest uppercase text-sm">
            {selectedImageIdx + 1} / {gallery.length}
          </div>
        </div>
      )}
    </main>
  )
}
