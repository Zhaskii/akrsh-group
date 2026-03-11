'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ChevronRightIcon,
  TrophyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import PageBanner from './PageBanner'
import { HomeIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { allAwards, galleryImages, positions, videoData } from '@/constant/chairman.profile.data'
import chairman from '@/assets/chairman&ceo/Rajesh-Kazi-Shrestha-Arksh-Group.jpg'

export default function AboutChairman() {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleAwards = isExpanded ? allAwards : allAwards.slice(0, 2)

  return (
    <main className="bg-[#f0f6ff] min-h-screen pb-20 font-sans">
      <PageBanner
        title="Message from Managing Director"
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'MD Message' },
        ]}
      />

      {/* ── MESSAGE & BIO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(52,152,219,0.10)] flex flex-col lg:flex-row overflow-hidden border border-blue-50">
          {/* Left: photo */}
          <div className="lg:w-2/5 p-8 bg-linear-to-b from-[#f8fbff] to-white flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-blue-50">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(52,152,219,0.18)] w-full aspect-square mb-7 group">
              <Image
                src={chairman}
                alt="Rajesh Kaji Shrestha"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* linear overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0f2050]/60 to-transparent" />
              {/* Years badge */}
              <div className="absolute bottom-0 right-0 bg-linear-to-br from-[#2357A6] to-[#3498db] text-white px-5 py-3 rounded-tl-2xl text-center shadow-lg z-10">
                <p className="text-2xl font-extrabold tracking-tight leading-none">47+</p>
                <p className="text-[9px] uppercase tracking-widest mt-0.5 opacity-80">
                  Years of Excellence
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#3498db] mb-2">
                Managing Director
              </p>
              <h2 className="text-[#1a3a6e] text-xl font-bold leading-tight">
                Dr. Rajesh Kazi Shrestha
              </h2>
              <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-1 font-medium">
                Chairman / Managing Director
              </p>
              <div className="w-10 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] mx-auto mt-4 rounded-full" />
            </div>
          </div>

          {/* Right: message */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            {/* Top gradient bar */}
            <div className="h-0.75 w-full bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-8" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              A Message From Our Leader
            </p>
            <h3 className="text-[#1a3a6e] text-xl font-bold mb-6 leading-snug">
              "Dear Valued Partners, Clients, and Team Members"
            </h3>

            <p className="text-gray-500 leading-[1.85] mb-6 text-[15px]">
              It is with great pleasure that I welcome you to Arksh Group. As the Managing Director,
              I take immense pride in our organization's journey of growth, innovation, and
              excellence.
            </p>

            {/* Pull quote */}
            <div className="relative bg-[#f0f6ff] border-l-4 border-[#3498db] rounded-r-2xl px-6 py-5 mb-7">
              <span className="absolute -top-2 left-4 text-6xl text-[#3498db]/15 font-serif leading-none select-none">
                "
              </span>
              <p className="text-[#1a3a6e] font-medium leading-[1.8] text-[15px] italic">
                Since our inception in 1978, we have remained steadfast in our commitment to
                delivering exceptional value across diverse sectors.
              </p>
            </div>

            {/* Two-column checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {[
                'The business landscape is constantly evolving, presenting both challenges and opportunities. At Arksh Group, we embrace change and adaptability as essential components of our business strategy.',
                'We continuously invest in our people, processes, and technologies to stay ahead of the curve and deliver solutions that meet the evolving needs of our stakeholders.',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 bg-[#f8fbff] rounded-2xl p-4 border border-blue-50"
                >
                  <CheckCircleIcon className="text-[#3498db] w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-gray-500 text-[13px] leading-[1.75]">{text}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-500 leading-[1.85] text-[15px]">
              As we look to the future, we remain committed to sustainable growth, socially
              responsible business practices, and creating value for all our stakeholders. I extend
              my heartfelt gratitude to our clients, partners, and team members for their trust,
              support, and dedication. Together, we will continue to push boundaries and create a
              legacy of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ── AWARDS TIMELINE ── */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
            Recognition
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
            Awards &amp; Honors
          </h2>
          <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
        </div>

        <div className="relative border-l-2 border-blue-100 ml-4 md:ml-32 space-y-8 pb-10">
          {visibleAwards.map((award, idx) => (
            <div key={idx} className="relative pl-10 group cursor-pointer">
              {/* Timeline dot */}
              <div className="absolute -left-1.75 top-5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#3498db] z-10 transition-all duration-300 group-hover:bg-[#3498db] group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(52,152,219,0.4)]" />
              {/* Year label */}
              <span className="absolute -left-28 top-4 text-[#2357A6] font-bold text-base hidden md:block opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                {award.year}
              </span>
              {/* Card */}
              <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.07)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_48px_rgba(52,152,219,0.14)] group-hover:border-blue-100 relative">
                <div className="absolute top-5 right-5 transition-all duration-300 opacity-10 group-hover:opacity-100 group-hover:scale-110">
                  <TrophyIcon className="w-5 h-5 text-[#3498db]" />
                </div>
                <h4 className="text-[#1a3a6e] text-base font-bold pr-10 leading-snug">
                  {award.title}
                </h4>
                <p className="text-gray-400 text-[13px] mt-2.5 leading-relaxed">{award.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 border border-blue-200 text-[#2357A6] px-8 py-3 rounded-full hover:bg-linear-to-r hover:from-[#2357A6] hover:to-[#3498db] hover:text-white hover:border-transparent transition-all duration-300 font-semibold text-xs uppercase tracking-widest shadow-sm hover:shadow-[0_8px_24px_rgba(52,152,219,0.25)] hover:-translate-y-0.5"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUpIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronDownIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* ── POSITIONS ── */}
      <section className="py-20 mt-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Leadership Roles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
              Positions &amp; Affiliations
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto mb-4" />
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Dr. Rajesh Kazi Shrestha holds the following positions in different associations and
              organizations
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {positions.map((pos, idx) => (
              <div
                key={idx}
                className="group flex items-center bg-[#f0f6ff] rounded-2xl overflow-hidden border border-blue-50 shadow-[0_2px_8px_rgba(52,152,219,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(52,152,219,0.12)] hover:border-blue-100 cursor-default"
              >
                {/* Title */}
                <div className="w-[40%] md:w-[35%] px-5 py-4 font-bold text-[#1a3a6e] text-sm md:text-[13px] group-hover:text-[#3498db] transition-colors duration-200 leading-snug">
                  {pos.title}
                </div>
                {/* Separator */}
                <div className="flex items-center px-2 shrink-0">
                  <ChevronRightIcon className="w-3.5 h-3.5 text-[#3498db] opacity-40 group-hover:opacity-100 -mr-1.5 transition-opacity" />
                  <ChevronRightIcon className="w-3.5 h-3.5 text-[#3498db] opacity-20 group-hover:opacity-60 transition-opacity" />
                </div>
                {/* Organization */}
                <div className="flex-1 px-5 py-4 text-right text-gray-500 text-sm md:text-[13px] font-medium leading-snug">
                  {pos.organization}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO MESSAGES ── */}
      <section className="py-20 bg-[#f0f6ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Watch &amp; Listen
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
              Current Message Videos
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {videoData.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.08)] transition-all duration-300 group-hover:shadow-[0_16px_48px_rgba(52,152,219,0.18)] group-hover:-translate-y-1.5">
                  <Image
                    src={video.thumbnail}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] translate-y-0.75 group-hover:translate-y-0 transition-transform duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                      <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-16 border-l-white border-b-[9px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
            Photo Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
            MD Gallery Collection
          </h2>
          <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto mb-4" />
          <p className="text-gray-400 text-sm">
            Browse through our collection of memorable moments and milestones
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(52,152,219,0.16)] cursor-pointer"
            >
              <Image
                src={src}
                alt={`MD Gallery milestone ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1a3a6e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] translate-y-0.75 group-hover:translate-y-0 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
