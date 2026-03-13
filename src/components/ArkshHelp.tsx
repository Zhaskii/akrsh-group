'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HomeIcon, CalendarIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import PageBanner from '@/components/PageBanner'
import Link from 'next/link'
import { BlogPost } from './BlogDetails'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

export default function ArkshHelps() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; type: string } | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  function getExcerpt(excerpt: any) {
    if (!excerpt?.root?.children) return ''
    return excerpt.root.children
      .map((node: any) => node.children?.map((child: any) => child.text || '').join(''))
      .join('')
      .slice(0, 160)
  }

  const getThumbnail = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^?&]+)/)
    const videoId = match ? match[1] : null
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder.jpg'
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${PAYLOAD_BASE_URL}/api/blogs?where[status][equals]=open&depth=1&limit=100`,
        )
        const data = await res.json()
        setPosts(Array.isArray(data.docs) ? data.docs : [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `${PAYLOAD_BASE_URL}/api/social-videos?where[status][equals]=active&sort=order`,
        )
        const data = await res.json()
        if (Array.isArray(data.docs)) setVideos(data.docs)
      } catch (error) {
        console.error('Video fetch error:', error)
      }
    }
    fetchVideos()
  }, [])

  return (
    <main className="bg-[#f0f6ff] min-h-screen font-sans pb-24">
      <PageBanner
        title="Arksh Helps"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Arksh Helps' },
        ]}
      />

      {/* ── Get More Insights ── */}
      <section className="py-15 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
            Knowledge Hub
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
            Get More Insights
          </h2>
          <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.07)] animate-pulse"
              >
                <div className="h-56 bg-blue-50" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-blue-50 rounded w-1/3" />
                  <div className="h-5 bg-blue-50 rounded w-4/5" />
                  <div className="h-3 bg-blue-50 rounded w-full" />
                  <div className="h-3 bg-blue-50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No insights available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                <div className="bg-white rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.07)] hover:shadow-[0_16px_48px_rgba(52,152,219,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-62 w-full overflow-hidden">
                    <Image
                      src={`${PAYLOAD_BASE_URL}${post.image?.url}`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-50 p-1 rounded-md">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#3498db]" />
                      </div>
                      <span className="text-[#3498db] text-xs font-semibold">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-bold text-[#1a3a6e] mb-2.5 line-clamp-2 leading-snug group-hover:text-[#3498db] transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-[13px] mb-5 line-clamp-3 leading-relaxed grow">
                      {getExcerpt(post.excerpt)}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-blue-50 mb-4" />

                    <div className="flex items-center gap-1.5 text-[#3498db] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-200">
                      Read More
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Delivering Happiness ── */}
      {videos.length > 0 && (
        <section className="py-20 bg-[#f0f6ff] overflow-hidden">
          <div className="text-center mb-14 px-4">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Our Community
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
              Delivering Happiness
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scrollbar-hide">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative min-w-[85%] md:min-w-[32%] rounded-2xl overflow-hidden aspect-square border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.10)] snap-start group shrink-0"
                >
                  {video.platform === 'instagram' ? (
                    <div className="w-full h-full overflow-y-auto bg-white">
                      <iframe src={`${video.url}/embed`} className="w-full h-[150%] border-none" />
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => setActiveVideo({ url: video.url, type: video.platform })}
                    >
                      <Image
                        src={getThumbnail(video.url)}
                        alt="Happiness Video"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
                      {/* Top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#2561B5] transition-all duration-300">
                          <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-1" />
                        </div>
                      </div>
                      {/* Platform badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {video.platform}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Video Modal ── */}
      {activeVideo && activeVideo.type === 'youtube' && (
        <div
          className="fixed inset-0 z-100 bg-black/92 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-110 text-white bg-white/10 backdrop-blur-sm border border-white/20 w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-200 text-sm font-bold"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <iframe
              src={`${activeVideo.url}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ── Giving Back ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Social Impact
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
              Giving Back to the Community
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>

          <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_8px_40px_rgba(52,152,219,0.10)] overflow-hidden">
            {/* Top linear bar */}
            <div className="h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db]" />

            <div className="p-8 md:p-12">
              {/* Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-4 rounded-2xl shadow-[0_8px_24px_rgba(52,152,219,0.30)]">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="space-y-5 text-gray-500 leading-[1.9] text-[15px] text-center max-w-3xl mx-auto">
                <p>
                  Our mission goes beyond business — it's about building a better tomorrow. A
                  portion of the profits generated through our operations at NPWC is proudly donated
                  to charitable foundations and social initiatives that uplift communities across
                  Nepal.
                </p>
                <p>
                  This commitment extends to our hospitality venture, Hotel Peace Land, located in
                  the sacred heart of Lumbini.
                </p>
                <p>
                  We believe that every act of kindness can spark a lasting impact. With your trust
                  and support, we continue to champion community welfare, promote sustainable
                  growth, and inspire hope across Nepal.
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-10 mx-auto max-w-2xl border-l-4 border-[#3498db] bg-[#f0f6ff] rounded-r-2xl px-6 py-4">
                <p className="text-[#1a3a6e] font-bold text-base leading-relaxed">
                  "Every act of kindness can spark a lasting impact."
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '1978', label: 'Since' },
                  { value: '100%', label: 'Commitment' },
                  { value: '∞', label: 'Impact' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center py-5 px-3 rounded-2xl bg-[#f0f6ff] border border-blue-50 group hover:border-blue-100 hover:shadow-[0_4px_16px_rgba(52,152,219,0.08)] transition-all duration-200"
                  >
                    <p className="text-2xl font-extrabold bg-linear-to-r from-[#2357A6] to-[#3498db] bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
