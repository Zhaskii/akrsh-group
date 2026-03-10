'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// 1. Import your local images from the assets folder
import hero1 from '@/assets/heroBg/Arksh Group Annual Awards.png'
import hero2 from '@/assets/heroBg/Arksh Agro BG.jpg'
import hero3 from '@/assets/heroBg/Arksh Food BG.jpg'
import hero4 from '@/assets/heroBg/Daami BG.jpg'
import hero5 from '@/assets/heroBg/Dream Skin BG2.jpg'
import hero6 from '@/assets/heroBg/Fragnance Room BG.jpg'
import hero7 from '@/assets/heroBg/Fynnaza BG.jpg'
import hero8 from '@/assets/heroBg/Golden Dragon BG.jpg'
import hero10 from '@/assets/heroBg/Higer BG.jpg'
import hero11 from '@/assets/heroBg/Hotel Peaceland BG.jpg'
import hero12 from '@/assets/heroBg/LF BG.jpg'
import hero14 from '@/assets/heroBg/Luxury BG.jpg'
import hero15 from '@/assets/heroBg/MacCoffee BG.jpg'
import hero17 from '@/assets/heroBg/Nirvana BG2.jpg'
import hero18 from '@/assets/heroBg/Urban Earth BG.jpg'

// 2. Put the imported objects into the array
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

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [leftInView, setLeftInView] = useState(false)
  const [rightInView, setRightInView] = useState(false)

  // Slideshow State
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Manual Navigation Functions
  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  // Slideshow Logic (Changes every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === leftRef.current) {
            if (entry.isIntersecting) setLeftInView(true)
          } else if (entry.target === rightRef.current) {
            if (entry.isIntersecting) setRightInView(true)
          }
        })
      },
      { threshold: 0.3, rootMargin: '0px' },
    )
    if (leftRef.current) observer.observe(leftRef.current)
    if (rightRef.current) observer.observe(rightRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Hero Background Slideshow */}
      <div
        className="
          group
          relative
          w-full
          h-[33vh]
          sm:h-[65vh]
          md:h-[75vh]
          lg:h-[81vh]
          xl:h-[81vh]
          overflow-hidden
          bg-gray-100
        "
      >
        {HERO_IMAGES.map((imageAsset, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 transition-opacity duration-1000 ease-in-out
              ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            <Image
              src={imageAsset}
              alt={`Arksh Group Hero Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-fill object-center"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}

        {/* Left Arrow - Shows on Hover */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#3498DB]/60"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Right Arrow - Shows on Hover */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#3498DB]/60"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Content Section */}
      <section className="w-full bg-white text-gray-900 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div
              ref={leftRef}
              className={`max-w-xl transition-all duration-700 ${
                leftInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h1 className=" text-[#219AEA] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight ">
                Unlocking Boundless Possibilities: Our Multiverse of Success!
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-600 text-justify">
                The business journey of Arksh Group, formerly known as R. K Associates, started back
                in 1978 A.D when <strong>Dr. Rajesh Kazi Shrestha</strong>, an energetic, young,
                proactive entrepreneur established Rajesh Concern with the objective of trade and
                hospitality business...
              </p>
              <Link href="/about">
                <button className="bg-[#219AEA] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#2357A6] transition cursor-pointer">
                  Read More
                </button>
              </Link>
            </div>

            {/* Right Image Card */}
            <div
              ref={rightRef}
              className={`w-full h-65 sm:h-80 md:h-95 lg:h-112 rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 delay-300 ${
                rightInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://arkshgroup.com/uploads/about/Lumbini-celebrating-45-years-copy.jpg')",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
