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

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/gallery?depth=2&limit=500`)
        const data = await res.json()
        setItems(Array.isArray(data.docs) ? data.docs : [])
      } catch (error) {
        console.error('Gallery fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  // One entry per category: first gallery item's first image
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
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Spinner color="#3498db" />
      </main>
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title="Gallery"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Gallery' },
        ]}
      />

      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {categoriesWithFirstImage.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No gallery categories yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {categoriesWithFirstImage.map(({ name, slug, item }) => {
                const url = getFirstImageUrl(item)
                if (!url) return null

                return (
                  <div
                    key={slug}
                    className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded-lg sm:rounded-2xl md:rounded-[10px] bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl"
                  >
                    <Link
                      href={`/gallery/${encodeURIComponent(slug)}`}
                      className="block w-full h-full relative"
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={`${PAYLOAD_BASE_URL}${url}`}
                          alt={name}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div
                        className="absolute inset-0 bg-linear-to-t from-[#1D8AD2]/65 via-[#1f2a37]/40 to-transparent 
                opacity-100 sm:opacity-0 group-hover:opacity-100 
                transition-all duration-500 ease-out 
                flex flex-col justify-end 
                p-4 sm:p-6 md:p-8 lg:p-10"
                      >
                        <div
                          className=" bg-[#1D8AD2]/55 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 
                  transform translate-y-4 sm:translate-y-6 group-hover:translate-y-0 
                  transition-transform duration-500 ease-out w-fit"
                        >
                          <p
                            className="text-white text-xs sm:text-sm font-semibold uppercase 
                  tracking-[0.18em] sm:tracking-[0.22em]"
                          >
                            {name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
