'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import PageBanner from './PageBanner'
import Spinner from './Spinner'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

type CategoryRef = { id: string; name?: string; slug?: string } | string

interface GalleryImage {
  image: { url?: string } | string
  id?: string
}

interface GalleryItem {
  id: string
  title: string
  category: CategoryRef
  year?: string | null
  images: GalleryImage[]
}

function getCategorySlug(cat: CategoryRef): string {
  if (typeof cat === 'string') return cat
  return (cat as { slug?: string }).slug ?? (cat as { name?: string }).name ?? ''
}

function getCategoryName(cat: CategoryRef): string {
  if (typeof cat === 'string') return cat
  return (cat as { name?: string }).name ?? (cat as { slug?: string }).slug ?? 'Category'
}

function getFirstImageUrl(item: GalleryItem): string | null {
  const first = item.images?.[0]
  if (!first) return null
  const img = first.image
  if (!img) return null
  return typeof img === 'object' && img?.url ? img.url : null
}

export default function ChairmanGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/md-gallery?depth=2&limit=500`)
        const data = await res.json()
        setItems(Array.isArray(data.docs) ? data.docs : [])
      } catch (error) {
        console.error('Chairman Gallery fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const categoriesWithFirstImage = useMemo(() => {
    const bySlug = new Map<string, { name: string; slug: string; item: GalleryItem }>()
    for (const item of items) {
      const slug = getCategorySlug(item.category)
      const name = getCategoryName(item.category)
      if (!slug) continue
      if (!bySlug.has(slug)) {
        const url = getFirstImageUrl(item)
        if (url) bySlug.set(slug, { name, slug, item })
      }
    }
    return Array.from(bySlug.values())
  }, [items])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
        <Spinner color="#3498db" />
      </main>
    )
  }

  return (
    <main className="bg-[#f0f6ff] min-h-screen pb-24">
      <PageBanner
        title="Chairman Gallery"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Chairman Gallery' },
        ]}
      />

      <section className="py-16 sm:py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Visual Archive
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
              Chairman's Gallery
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto mb-4" />
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              Browse through curated collections of moments, milestones, and memories
            </p>
          </div>

          {categoriesWithFirstImage.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.08)] mb-4">
                <svg
                  className="w-7 h-7 text-[#3498db]/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3 5.25h18"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No chairman gallery categories yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {categoriesWithFirstImage.map(({ name, slug, item }, index) => {
                const url = getFirstImageUrl(item)
                if (!url) return null

                return (
                  <Link
                    key={slug}
                    href={`/md-gallery/${encodeURIComponent(slug)}`}
                    className="group block"
                  >
                    <div className="relative h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(52,152,219,0.18)] bg-gray-100">
                      {/* Image */}
                      <Image
                        src={`${PAYLOAD_BASE_URL}${url}`}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Persistent subtle gradient at bottom */}
                      <div className="absolute inset-0 bg-linear-to-t from-[#0f2050]/50 via-transparent to-transparent" />

                      {/* Top accent bar — slides in on hover */}
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                      {/* Category label — always visible, lifts on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between">
                        <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 mb-1">
                            Collection
                          </p>
                          <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                            {name}
                          </h3>
                        </div>

                        {/* Arrow button */}
                        <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 ml-3">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Index number watermark */}
                      <div className="absolute top-4 right-4 text-white/10 font-black text-5xl leading-none select-none pointer-events-none group-hover:text-white/20 transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
