'use client'

import React, { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  HomeIcon,
  UserIcon,
  TagIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid'
import PageBanner from './PageBanner'

import Spinner from './Spinner'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''
const POSTS_PER_PAGE = 6

function getExcerptText(excerpt: unknown): string {
  if (!excerpt || typeof excerpt !== 'object') return ''
  const root = (excerpt as { root?: { children?: { children?: { text?: string }[] }[] } }).root
  if (!root?.children) return ''
  return root.children
    .map((node) => (node.children || []).map((c) => (c && 'text' in c ? c.text : '')).join(''))
    .join(' ')
}

interface BlogCategory {
  id: string
  category: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: any
  author: string
  date: string
  category?: BlogCategory[]
  image?: {
    url?: string
  } | null
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/blogs?depth=1&limit=100`)
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

  const indexOfLastPost = currentPage * POSTS_PER_PAGE
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE
  const currentPosts = useMemo(
    () => posts.slice(indexOfFirstPost, indexOfLastPost),
    [posts, indexOfFirstPost, indexOfLastPost],
  )
  const totalPages = useMemo(() => Math.ceil(posts.length / POSTS_PER_PAGE), [posts.length])
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  )

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f0f6ff]">
        <Spinner color="#3498db" />
      </main>
    )
  }

  return (
    <main className="bg-[#f0f6ff] font-sans min-h-screen pb-24 overflow-x-hidden">
      <PageBanner
        title="Blogs"
        padding="py-12 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'Our Blogs' },
        ]}
      />

      <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
            Our Blog
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-4">Latest Articles</h2>
          <div className="w-14 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] mx-auto rounded-full" />
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No blog posts found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-x-8 gap-y-8 md:gap-y-12">
              {currentPosts.map((post, i) => {
                if (!post.image?.url) return null

                return (
                  <article
                    key={post.id}
                    style={{
                      opacity: 1,
                      animationDelay: `${i * 80}ms`,
                    }}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.07)] hover:shadow-[0_20px_50px_rgba(52,152,219,0.18)] hover:-translate-y-1.5 transition-all duration-400"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {/* Image */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                        <Image
                          src={`${PAYLOAD_BASE_URL}${post.image.url}`}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-fill transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#2357A6] to-[#3498db] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category badge */}
                        {post.category && post.category.length > 0 && (
                          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#2357A6] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg z-20 shadow-sm border border-blue-50">
                            {post.category.map((cat) => cat.category).join(', ')}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-7 md:p-8 flex flex-col grow">
                        {/* Meta row */}
                        <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-4 font-semibold uppercase tracking-wider">
                          <div className="flex items-center gap-1.5">
                            <div className="bg-blue-50 p-1 rounded-md">
                              <UserIcon className="w-3 h-3 text-[#2357A6]" />
                            </div>
                            <span>{post.author}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-gray-200" />
                          <div className="flex items-center gap-1.5">
                            <div className="bg-blue-50 p-1 rounded-md">
                              <TagIcon className="w-3 h-3 text-[#2357A6]" />
                            </div>
                            <span>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-bold text-[#1a3a6e] mb-3 leading-snug group-hover:text-[#3498db] transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[#5d6d7e] text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {getExcerptText(post.excerpt)}
                        </p>

                        {/* CTA */}
                        <div className="mt-auto pt-5 border-t border-blue-50 flex items-center gap-1.5 text-[#2357A6] font-extrabold text-[11px] uppercase tracking-widest group-hover:gap-3 transition-all duration-200">
                          Continue Reading
                          <ChevronRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 duration-200" />
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl bg-white border border-blue-100 text-gray-400 hover:text-[#3498db] hover:border-[#3498db] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 shadow-sm border ${
                      currentPage === number
                        ? 'bg-linear-to-br from-[#2357A6] to-[#3498db] text-white border-transparent scale-110 shadow-md'
                        : 'bg-white text-[#2c3e50] border-blue-100 hover:border-[#3498db] hover:text-[#3498db]'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl bg-white border border-blue-100 text-gray-400 hover:text-[#3498db] hover:border-[#3498db] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}
