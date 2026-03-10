'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { HomeIcon, CalendarDaysIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa'
import PageBanner from '@/components/PageBanner'
import RichText from '@/components/RichText'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

interface BlogCategory {
  id?: string
  category: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: unknown
  content?: unknown
  author: string
  date: string
  category?: BlogCategory[] | null
  image?: { url?: string } | null
}

export type { BlogPost }

type BlogDetailsProps = {
  initialPost?: BlogPost | null
  initialRecentPosts?: BlogPost[] | null
}

export default function BlogDetails({
  initialPost = null,
  initialRecentPosts = null,
}: BlogDetailsProps) {
  const params = useParams()
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(initialRecentPosts ?? [])
  const [loading, setLoading] = useState(!initialPost)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  useEffect(() => {
    if (initialPost && initialPost.slug === slug) {
      setPost(initialPost)
      setRecentPosts(initialRecentPosts ?? [])
      setLoading(false)
      return
    }
    const fetchPost = async () => {
      try {
        const [res, recentRes] = await Promise.all([
          fetch(
            `${PAYLOAD_BASE_URL}/api/blogs?where[slug][equals]=${encodeURIComponent(slug)}&depth=1`,
          ),
          fetch(`${PAYLOAD_BASE_URL}/api/blogs?limit=7&depth=1&sort=-date`),
        ])
        const data = await res.json()
        if (!data.docs || data.docs.length === 0) {
          setPost(null)
          setLoading(false)
          return
        }
        setPost(data.docs[0])
        const recentData = await recentRes.json()
        setRecentPosts(recentData.docs || [])
      } catch (error) {
        console.error('Blog fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchPost()
  }, [slug, initialPost, initialRecentPosts])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#2257A6]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#2257A6] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
        <div className="text-center bg-white rounded-3xl p-14 shadow-md border border-blue-50">
          <p className="text-gray-500 mb-5 text-lg">Blog not found.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#2357A6] to-[#3498db] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const payloadUrl = PAYLOAD_BASE_URL
  const imageUrl = post.image?.url
  const hasContent =
    post.content && typeof post.content === 'object' && (post.content as { root?: unknown }).root
  const bodyContent = hasContent ? post.content : post.excerpt

  const recentFiltered = useMemo(
    () => recentPosts.filter((p) => p.slug !== post.slug).slice(0, 6),
    [recentPosts, post.slug],
  )

  const shareUrl = useMemo(() => encodeURIComponent(currentUrl), [currentUrl])
  const shareTitle = useMemo(() => encodeURIComponent(post.title), [post.title])
  const shareText = useMemo(
    () => encodeURIComponent(`${post.title} ${currentUrl}`),
    [post.title, currentUrl],
  )

  return (
    <main className="bg-[#f0f6ff] min-h-screen overflow-x-hidden">
      <PageBanner
        title={post.title}
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Our Blog', href: '/blog' },
          { name: post.title },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Use items-start so sticky works correctly */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* ── Main Content ── */}
            <div className="lg:w-[67%] w-full">
              <div className="bg-white rounded-3xl overflow-hidden border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)]">
                {/* Hero image */}
                {imageUrl ? (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={`${payloadUrl}${imageUrl}`}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#2357A6] to-[#3498db]" />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}

                <div className="p-7 sm:p-10">
                  {/* Meta chips */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <MetaChip icon={<CalendarDaysIcon className="w-4 h-4" />}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </MetaChip>
                    {post.author && (
                      <MetaChip icon={<UserIcon className="w-4 h-4" />}>{post.author}</MetaChip>
                    )}
                    {Array.isArray(post.category) && post.category.length > 0 && (
                      <MetaChip icon={<TagIcon className="w-4 h-4" />}>
                        {post.category.map((c) => c.category).join(', ')}
                      </MetaChip>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-linear-to-r from-transparent via-blue-100 to-transparent mb-8" />

                  {/* Article body */}
                  <div
                    className="prose prose-lg max-w-none text-gray-600 leading-[1.9]
                    prose-headings:text-[#1a3a6e] prose-headings:font-bold
                    prose-a:text-[#3498db] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#1a3a6e]
                    prose-blockquote:border-l-[#3498db] prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                  "
                  >
                    <RichText
                      data={bodyContent as Parameters<typeof RichText>[0]['data']}
                      className="text-gray-700 prose-p:mb-4 prose-headings:text-gray-900"
                    />
                  </div>

                  {/* Share section */}
                  <div className="mt-14 pt-8 border-t border-blue-50">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-2">
                      Share This Article
                    </p>
                    <h3 className="text-xl font-bold text-[#1a3a6e] mb-6">
                      Found this helpful? Spread the word.
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <ShareButton
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        bg="bg-[#1877F2]"
                        icon={<FaFacebookF />}
                        label="Facebook"
                      />
                      <ShareButton
                        href={`https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                        bg="bg-[#1DA1F2]"
                        icon={<FaTwitter />}
                        label="Twitter"
                      />
                      <ShareButton
                        href={`https://api.whatsapp.com/send?text=${shareText}`}
                        bg="bg-[#25D366]"
                        icon={<FaWhatsapp />}
                        label="WhatsApp"
                      />
                      <ShareButton
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                        bg="bg-[#0077B5]"
                        icon={<FaLinkedinIn />}
                        label="LinkedIn"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Sticky Sidebar ── */}
            {/* sticky + top-24 + self-start = follows user as they scroll */}
            <aside className="lg:w-[33%] w-full sticky top-24 self-start">
              <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)] overflow-hidden">
                {/* Header */}
                <div className="px-8 pt-8 pb-5 border-b border-blue-50">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-1">
                    Keep Reading
                  </p>
                  <h3 className="text-2xl font-bold text-[#1a3a6e]">Recent Posts</h3>
                  <div className="w-10 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mt-3" />
                </div>

                {/* Scrollable list — capped at 60vh so it never overflows the screen */}
                <div
                  className="px-8 divide-y divide-blue-50 overflow-y-auto"
                  style={{ maxHeight: '60vh' }}
                >
                  {recentFiltered.length === 0 ? (
                    <p className="text-gray-400 text-sm py-6">No other posts yet.</p>
                  ) : (
                    recentFiltered.map((recentPost) => {
                      const rpImageUrl =
                        recentPost.image &&
                        typeof recentPost.image === 'object' &&
                        'url' in recentPost.image
                          ? (recentPost.image as { url?: string }).url
                          : undefined
                      return (
                        <Link
                          href={`/blog/${recentPost.slug}`}
                          key={recentPost.id}
                          className="group flex gap-4 items-center py-5 first:pt-6 last:pb-6"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-blue-50 bg-blue-50 shadow-sm">
                            {rpImageUrl ? (
                              <Image
                                src={`${payloadUrl}${rpImageUrl}`}
                                alt={recentPost.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">
                                No img
                              </span>
                            )}
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-bold text-[#1a3a6e] leading-snug group-hover:text-[#3498db] transition-colors duration-200 line-clamp-2 mb-2">
                              {recentPost.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                              <div className="bg-blue-50 p-0.5 rounded">
                                <CalendarDaysIcon className="w-3 h-3 text-[#2357A6]" />
                              </div>
                              <span>
                                {new Date(recentPost.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  )}
                </div>

                {/* Back to blog */}
                <div className="px-8 py-6 border-t border-blue-50">
                  <Link
                    href="/blog"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-linear-to-r from-[#2357A6] to-[#3498db] text-white font-bold text-sm hover:opacity-90 transition-all shadow-md"
                  >
                    ← Back to All Posts
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}

// ── Helper Components ──

function MetaChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#2357A6] text-xs font-semibold px-3 py-1.5 rounded-full">
      <span className="text-[#3498db]">{icon}</span>
      {children}
    </span>
  )
}

function ShareButton({
  href,
  bg,
  icon,
  label,
}: {
  href: string
  bg: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-5 py-2.5 ${bg} text-white rounded-full font-bold text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm`}
    >
      {icon}
      {label}
    </a>
  )
}
