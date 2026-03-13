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
import ceo from '@/assets/chairman&ceo/rajul-shrestha-ceo-arksh-group.jpg'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default function AboutCEO() {
  const [interviews, setInterviews] = useState<any[]>([])
  const [gallery, setGallery] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isGalleryPaused, setIsGalleryPaused] = useState(false)
  const [isGalleryTransitioning, setIsGalleryTransitioning] = useState(false)

  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLightboxPlaying, setIsLightboxPlaying] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterKey = encodeURIComponent('where[cornerType][equals]')
        const [videoRes, photoRes] = await Promise.all([
          fetch(`${PAYLOAD_URL}/api/youtube-news?${filterKey}=ceo&sort=order`, {
            cache: 'no-store',
          }),
          fetch(`${PAYLOAD_URL}/api/ceo-photos?limit=20&sort=createdAt`, { cache: 'no-store' }),
        ])
        const videoData = await videoRes.json()
        const photoData = await photoRes.json()
        if (!videoData.docs || videoData.docs.length === 0) {
          const fallbackRes = await fetch(
            `${PAYLOAD_URL}/api/youtube-news?${filterKey}=ceo-corner&sort=order`,
          )
          const fallbackData = await fallbackRes.json()
          setInterviews(fallbackData.docs || [])
        } else {
          setInterviews(videoData.docs)
        }
        setGallery(photoData.docs || [])
      } catch (error) {
        console.error('Error fetching CEO content:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isPaused || interviews.length === 0) return
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [currentIndex, isPaused, interviews.length])

  useEffect(() => {
    if (isGalleryPaused || selectedImageIdx !== null || gallery.length === 0) return
    const interval = setInterval(() => {
      handleGalleryNext()
    }, 3000)
    return () => clearInterval(interval)
  }, [galleryIndex, isGalleryPaused, selectedImageIdx, gallery.length])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLightboxPlaying && selectedImageIdx !== null) {
      interval = setInterval(() => {
        setZoomLevel(1)
        setSelectedImageIdx((prev) => (prev! + 1) % gallery.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isLightboxPlaying, selectedImageIdx, gallery.length])

  const handleNext = () => {
    if (interviews.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % interviews.length)
      setIsTransitioning(false)
    }, 400)
  }
  const handlePrev = () => {
    if (interviews.length === 0) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + interviews.length) % interviews.length)
      setIsTransitioning(false)
    }, 400)
  }
  const handleGalleryNext = () => {
    if (gallery.length === 0) return
    setIsGalleryTransitioning(true)
    setTimeout(() => {
      setGalleryIndex((prev) => (prev + 1) % gallery.length)
      setIsGalleryTransitioning(false)
    }, 400)
  }
  const handleGalleryPrev = () => {
    if (gallery.length === 0) return
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
    if (interviews.length === 0) return []
    const items = []
    const displayCount = Math.min(3, interviews.length)
    for (let i = 0; i < displayCount; i++)
      items.push(interviews[(currentIndex + i) % interviews.length])
    return items
  }
  const getVisibleGallery = () => {
    if (gallery.length === 0) return []
    const items = []
    const displayCount = Math.min(3, gallery.length)
    for (let i = 0; i < displayCount; i++) items.push(gallery[(galleryIndex + i) % gallery.length])
    return items
  }
  const getMediaUrl = (media: any) => {
    if (!media) return '/placeholder.jpg'
    const url = typeof media === 'string' ? media : media.url
    return url?.startsWith('http') ? url : `${PAYLOAD_URL}${url}`
  }
  const getYoutubeThumb = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const match = url.match(regExp)
    const id = match ? match[1] : null
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '/placeholder.jpg'
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
        <div className="w-10 h-10 border-3 border-blue-100 border-t-[#3498db] rounded-full animate-spin" />
      </div>
    )

  return (
    <main className="bg-[#f0f6ff] min-h-screen pb-24 font-sans">
      <PageBanner
        title="Message from CEO"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'CEO Message' },
        ]}
      />

      {/* ── CEO MESSAGE ── */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden border border-blue-50 shadow-[0_8px_40px_rgba(52,152,219,0.10)] flex flex-col lg:flex-row">
            {/* Left — photo */}
            <div className="lg:w-[40%] relative min-h-105 lg:min-h-0 overflow-hidden group">
              <Image
                src={ceo}
                alt="Rajul Shrestha"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              {/* linear overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0f2050]/70 via-transparent to-transparent" />
              {/* Name card */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-5 rounded-2xl shadow-[0_8px_32px_rgba(52,152,219,0.4)] inline-block transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-500">
                  <h2 className="text-white text-2xl font-extrabold tracking-tight leading-tight">
                    Rajul Shrestha
                  </h2>
                  <div className="h-0.5 w-10 bg-white/35 my-2.5 group-hover:w-16 transition-all duration-500 rounded-full" />
                  <p className="text-blue-100 text-[11px] font-bold uppercase tracking-[0.2em]">
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>

            {/* Right — message */}
            <div className="lg:w-[60%] p-8 md:p-10 lg:p-14 relative">
              {/* Top linear bar */}
              <div className="h-0.75 w-full bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-8" />

              {/* Decorative quote mark */}
              <div className="absolute top-10 right-10 opacity-[0.06] pointer-events-none select-none">
                <svg width="72" height="54" viewBox="0 0 75 56" fill="none">
                  <path
                    d="M18.75 0C8.39062 0 0 8.39062 0 18.75V56.25H28.125V18.75H9.375C9.375 13.5703 13.5703 9.375 18.75 9.375V0ZM65.625 0C55.2656 0 46.875 8.39062 46.875 18.75V56.25H75V18.75H56.25C56.25 13.5703 60.4453 9.375 65.625 9.375V0Z"
                    fill="#2357A6"
                  />
                </svg>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                A Message From Our Leader
              </p>
              <h3 className="text-[#1a3a6e] text-xl font-bold mb-7 leading-snug">
                "A Journey of Learning, Vision &amp; Purpose"
              </h3>

              <div className="space-y-5 text-gray-500 leading-[1.88] text-[15px]">
                <p>
                  I am in no misconception about what an enormous privilege it is to be sharing a
                  few words on this page as the CEO of Arksh Group. Life for me, so far, has been a
                  journey filled with unexpected interactions and results.
                </p>
                <p>
                  These experiences have been the determinants of my characteristics — that of an
                  individual with a keen interest in learning and gaining new information and
                  continuously building my knowledge.
                </p>
                {/* Pull quote */}
                <div className="relative bg-[#f0f6ff] border-l-4 border-[#3498db] rounded-r-2xl px-6 py-4 my-2">
                  <span className="absolute -top-2 left-4 text-5xl text-[#3498db]/15 font-serif leading-none select-none">
                    "
                  </span>
                  <p className="text-[#1a3a6e] font-medium leading-[1.8] text-[15px] italic">
                    Having spent nearly half my life abroad for studies, I have had vast exposure of
                    foreign customs, institutions and systems — leading me to envision a modern
                    future for Arksh Group.
                  </p>
                </div>
                <p>
                  Completing my Master's degree with distinction from England, United Kingdom felt
                  like a huge accomplishment at the time but now, I face bigger challenges. As I
                  commence my journey as the CEO, I am very well aware of the huge responsibility I
                  carry towards the company, our partners, our customers and the society we live in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMITMENT ── */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_8px_40px_rgba(52,152,219,0.08)] overflow-hidden">
            <div className="h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db]" />
            <div className="p-8 md:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Our Promise
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
                Commitment to Society
              </h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-8" />

              <p className="text-gray-500 text-[15px] leading-[1.88] mb-8">
                As I look ahead at the long road that stretches in front of me, I am even more
                determined to work rigorously hard to fulfill my duties. With the recent revamp of
                the brand image, I envision to create a better working environment for our staff who
                play a crucial role in meeting and exceeding the expectations of our customers.
              </p>

              <div className="space-y-5">
                {[
                  'It is my belief that every part of the society we live in must advance with the economy of the nation. We should give back to the society that we live and work in by helping the needed. We must provide equal opportunities to those who are qualified as well as to those who are less able than the rest.',
                  'We must instill upon every single individual that they are proficient, no matter what their capabilities, everyone is capable of achieving their goals. This attitude is critical in driving the society forward and to provide such opportunities will be one amongst the many contributions of Arksh Group to the society.',
                ].map((text, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-start bg-[#f8fbff] rounded-2xl p-4 border border-blue-50"
                  >
                    <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-1.5 rounded-full mt-0.5 shrink-0 shadow-[0_4px_12px_rgba(52,152,219,0.3)]">
                      <svg
                        className="w-3.5 h-3.5 text-white"
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
                    <p className="text-gray-500 text-[14px] leading-[1.85]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERVIEWS ── */}
      {interviews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Watch &amp; Listen
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
                Exclusive Interviews
              </h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
            </div>

            <div
              className="relative px-12"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Nav arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-[0_4px_16px_rgba(52,152,219,0.12)] hover:bg-linear-to-br hover:from-[#2357A6] hover:to-[#3498db] hover:text-white hover:border-transparent transition-all duration-200 hidden md:flex items-center justify-center text-[#2357A6]"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-[0_4px_16px_rgba(52,152,219,0.12)] hover:bg-linear-to-br hover:from-[#2357A6] hover:to-[#3498db] hover:text-white hover:border-transparent transition-all duration-200 hidden md:flex items-center justify-center text-[#2357A6]"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500 ${isTransitioning ? 'opacity-30' : 'opacity-100'}`}
              >
                {getVisibleInterviews().map((item, index) => (
                  <Link
                    href={item.youtubeUrl || '#'}
                    target="_blank"
                    key={index}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(52,152,219,0.18)]">
                      <Image
                        src={getYoutubeThumb(item.youtubeUrl)}
                        alt="Interview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* linear overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-13 h-13 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2561B5] transition-all duration-300 shadow-lg">
                          <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-16 border-l-white border-b-[9px] border-b-transparent ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dots */}
            {interviews.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {interviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      currentIndex === i
                        ? 'w-6 h-2 bg-linear-to-r from-[#2357A6] to-[#3498db]'
                        : 'w-2 h-2 bg-blue-200 hover:bg-blue-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {gallery.length > 0 && (
        <section className="py-20 bg-[#f0f6ff]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Visual Moments
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
                CEO Gallery Collection
              </h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
            </div>

            <div
              className="relative px-12"
              onMouseEnter={() => setIsGalleryPaused(true)}
              onMouseLeave={() => setIsGalleryPaused(false)}
            >
              <button
                onClick={handleGalleryPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-[0_4px_16px_rgba(52,152,219,0.12)] hover:bg-linear-to-br hover:from-[#2357A6] hover:to-[#3498db] hover:text-white hover:border-transparent transition-all duration-200 hidden md:flex items-center justify-center text-[#2357A6]"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleGalleryNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-[0_4px_16px_rgba(52,152,219,0.12)] hover:bg-linear-to-br hover:from-[#2357A6] hover:to-[#3498db] hover:text-white hover:border-transparent transition-all duration-200 hidden md:flex items-center justify-center text-[#2357A6]"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500 ${isGalleryTransitioning ? 'opacity-30' : 'opacity-100'}`}
              >
                {getVisibleGallery().map((item, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => setSelectedImageIdx(gallery.indexOf(item))}
                  >
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.07)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_48px_rgba(52,152,219,0.16)]">
                      <Image
                        src={getMediaUrl(item.image)}
                        alt="Gallery"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#1a3a6e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      {/* Zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center shadow-lg">
                          <MagnifyingGlassPlusIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            {gallery.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      galleryIndex === i
                        ? 'w-6 h-2 bg-linear-to-r from-[#2357A6] to-[#3498db]'
                        : 'w-2 h-2 bg-blue-200 hover:bg-blue-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ── */}
      {selectedImageIdx !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Controls bar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-110">
            <button
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation()
                setZoomLevel((z) => Math.min(z + 0.5, 3))
              }}
            >
              <MagnifyingGlassPlusIcon className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation()
                setZoomLevel((z) => Math.max(z - 0.5, 1))
              }}
            >
              <MagnifyingGlassMinusIcon className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation()
                setIsLightboxPlaying(!isLightboxPlaying)
              }}
            >
              {isLightboxPlaying ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </button>
            <button
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation()
                toggleFullScreen()
              }}
            >
              <ArrowsPointingOutIcon className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all duration-200"
              onClick={closeLightbox}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Prev / Next */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-110 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setZoomLevel(1)
              setSelectedImageIdx((prev) => (prev! - 1 + gallery.length) % gallery.length)
            }}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-110 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setZoomLevel(1)
              setSelectedImageIdx((prev) => (prev! + 1) % gallery.length)
            }}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Image */}
          <div
            className="relative w-[88%] h-[80vh] transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getMediaUrl(gallery[selectedImageIdx].image)}
              alt="Full View"
              fill
              className="object-contain rounded-xl"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
            <span className="text-white text-xs font-semibold">
              {selectedImageIdx + 1} / {gallery.length}
            </span>
          </div>
        </div>
      )}
    </main>
  )
}
