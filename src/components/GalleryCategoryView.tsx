'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { HomeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import PageBanner from './PageBanner'
import Spinner from './Spinner'
import LightboxLazy from './LightboxLazy'

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

function getImageUrl(img: GalleryImage): string | null {
  const media = img.image
  if (!media) return null
  return typeof media === 'object' && (media as { url?: string }).url
    ? (media as { url: string }).url
    : null
}

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

export default function GalleryCategoryView({ slug }: { slug: string }) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/gallery?depth=2&limit=500`)
        const data = await res.json()
        const docs = Array.isArray(data.docs) ? data.docs : []
        const filtered = docs.filter(
          (item: GalleryItem) =>
            getCategorySlug(item.category).toLowerCase() === slug.toLowerCase(),
        )
        setItems(filtered)
      } catch (error) {
        console.error('Gallery category fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchGallery()
  }, [slug])

  const allSlides = useMemo(
    () =>
      items.flatMap((item) =>
        (item.images ?? [])
          .map((img) => getImageUrl(img))
          .filter((url): url is string => Boolean(url))
          .map((url) => ({ src: `${PAYLOAD_BASE_URL}${url}` }))
      ),
    [items],
  )

  const categoryName = useMemo(
    () =>
      items.length > 0
        ? typeof items[0].category === 'object' &&
          items[0].category &&
          'name' in items[0].category
          ? (items[0].category as { name?: string }).name
          : slug
        : slug,
    [items, slug],
  )

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Spinner color="#3498db" />
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen">
        <PageBanner
          title="Gallery"
          padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
          width="w-full mx-auto"
          textAlign="center"
          breadcrumb={[
            { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
            { name: 'Gallery', href: '/gallery' },
            { name: decodeURIComponent(slug) },
          ]}
        />
        <section className="py-10">
          <p className="text-center text-gray-500">No images in this category.</p>
          <p className="text-center mt-4">
            <Link href="/gallery" className="text-[#3498db] font-semibold hover:underline">
              Back to Gallery
            </Link>
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={categoryName || decodeURIComponent(slug)}
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Gallery', href: '/gallery' },
          { name: categoryName || slug },
        ]}
      />

      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {items.flatMap((item) =>
              (item.images ?? []).map((img, idx) => {
                const url = getImageUrl(img)
                if (!url) return null
                const fullUrl = `${PAYLOAD_BASE_URL}${url}`
                const slideIndex = allSlides.findIndex((s) => s.src === fullUrl)

                return (
                  <div
                    key={`${item.id}-${img.id ?? idx}`}
                    onClick={() => setLightboxIndex(slideIndex >= 0 ? slideIndex : 0)}
                    className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded-lg sm:rounded-2xl bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl cursor-pointer"
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={fullUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </section>

      <LightboxLazy
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
        slides={allSlides}
        pluginSet="minimal"
      />
    </main>
  )
}
