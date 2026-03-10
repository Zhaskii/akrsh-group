'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { HomeIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import PageBanner from '@/components/PageBanner'
import LightboxLazy from '@/components/LightboxLazy'
import { useParams, notFound } from 'next/navigation'
import Spinner from '@/components/Spinner'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

type CategoryRef = { id: string; name?: string; slug?: string } | string

function getCategorySlug(cat: CategoryRef): string {
  if (typeof cat === 'string') return cat
  return (cat as { slug?: string }).slug ?? (cat as { name?: string }).name ?? ''
}

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

function getImageUrl(img: GalleryImage): string | null {
  const media = img.image
  if (!media) return null
  return typeof media === 'object' && (media as { url?: string }).url
    ? (media as { url: string }).url
    : null
}

export default function ChairmanGalleryDetails() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(-1)

  const params = useParams()
  const slug =
    typeof params?.title === 'string'
      ? params.title
      : typeof params?.id === 'string'
        ? params.id
        : ''

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/md-gallery?depth=2&limit=500`)
        const data = await res.json()
        const docs = Array.isArray(data.docs) ? data.docs : []

        const filteredByCategory = docs.filter(
          (item: GalleryItem) =>
            getCategorySlug(item.category).toLowerCase() === decodeURIComponent(slug).toLowerCase(),
        )

        setItems(filteredByCategory)
      } catch (error) {
        console.error('Chairman gallery details fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchGallery()
  }, [slug])

  const slides = useMemo(
    () =>
      items.flatMap((item) =>
        (item.images ?? [])
          .map((img) => getImageUrl(img))
          .filter((url): url is string => Boolean(url))
          .map((url) => ({
            src: `${PAYLOAD_BASE_URL}${url}`,
            alt: item.title,
            download: `${PAYLOAD_BASE_URL}${url}?download`,
          })),
      ),
    [items],
  )

  const currentPost = items.length > 0 ? items[0] : null

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <Spinner color="#3498db" />
      </main>
    )
  }

  if (!currentPost) {
    notFound()
    return null
  }

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title={currentPost.title}
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          {
            name: 'Chairman Gallery',
            href: '/md-gallery',
            icon: <HomeIcon className="w-4 h-4" />,
          },
          { name: currentPost.title },
        ]}
      />

      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {slides.map((slide, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LightboxLazy
        open={index >= 0}
        index={index}
        onClose={() => setIndex(-1)}
        slides={slides}
        pluginSet="full"
        slideshow={{ autoplay: false, delay: 3000 }}
      />
    </main>
  )
}
