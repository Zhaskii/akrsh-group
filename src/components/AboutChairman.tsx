'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  ChevronRightIcon,
  TrophyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline'
import PageBanner from './PageBanner'
import { CheckCircleIcon, HomeIcon } from '@heroicons/react/24/solid'
import { allAwards, positions } from '@/constant/chairman.profile.data'
import chairman from '@/assets/chairman&ceo/Rajesh-Kazi-Shrestha-Arksh-Group.jpg'

// Lightbox imports
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Lightbox Plugins
import Download from 'yet-another-react-lightbox/plugins/download'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

// Helper to get Youtube Thumbnail from URL
function getYouTubeId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function AboutChairman() {
  const [isExpanded, setIsExpanded] = useState(false)
  const visibleAwards = isExpanded ? allAwards : allAwards.slice(0, 4)

  const [videoData, setVideoData] = useState<any[]>([])
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [videoIndex, setVideoIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isPausedVideo, setIsPausedVideo] = useState(false)
  const [isPausedGallery, setIsPausedGallery] = useState(false)
  const [itemsToShow, setItemsToShow] = useState({ videos: 3, gallery: 4 })
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const getImageUrl = (urlPath: string | undefined) => {
    if (!urlPath) return ''
    return urlPath.startsWith('http') ? urlPath : `${PAYLOAD_BASE_URL}${urlPath}`
  }

  useEffect(() => {
    const fetchChairmanData = async () => {
      try {
        setLoading(true)
        const [videoRes, photoRes] = await Promise.all([
          fetch(
            `${PAYLOAD_BASE_URL}/api/youtube-news?where[cornerType][equals]=chairman&sort=order&limit=100`,
          ),
          fetch(`${PAYLOAD_BASE_URL}/api/md-photos?depth=1&limit=100`),
        ])
        const videoJson = await videoRes.json()
        const photoJson = await photoRes.json()
        if (videoJson.docs) setVideoData(videoJson.docs)
        if (photoJson.docs) setGalleryImages(photoJson.docs)
      } catch (error) {
        console.error('Connection Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchChairmanData()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setItemsToShow({
        videos: width < 768 ? 1 : width < 1024 ? 2 : 3,
        gallery: width < 640 ? 1 : width < 768 ? 2 : width < 1024 ? 3 : 4,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextVideo = useCallback(() => {
    const maxIndex = Math.max(0, videoData.length - itemsToShow.videos)
    if (maxIndex === 0) return
    setVideoIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [videoData.length, itemsToShow.videos])

  const prevVideo = () => {
    const maxIndex = Math.max(0, videoData.length - itemsToShow.videos)
    if (maxIndex === 0) return
    setVideoIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const nextGallery = useCallback(() => {
    const maxIndex = Math.max(0, galleryImages.length - itemsToShow.gallery)
    if (maxIndex === 0) return
    setGalleryIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [galleryImages.length, itemsToShow.gallery])

  const prevGallery = () => {
    const maxIndex = Math.max(0, galleryImages.length - itemsToShow.gallery)
    if (maxIndex === 0) return
    setGalleryIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    if (isPausedVideo || videoData.length <= itemsToShow.videos) return
    const interval = setInterval(nextVideo, 3000)
    return () => clearInterval(interval)
  }, [isPausedVideo, nextVideo, videoData.length, itemsToShow.videos])

  useEffect(() => {
    if (isPausedGallery || galleryImages.length <= itemsToShow.gallery) return
    const interval = setInterval(nextGallery, 3000)
    return () => clearInterval(interval)
  }, [isPausedGallery, nextGallery, galleryImages.length, itemsToShow.gallery])

  const lightboxSlides = galleryImages.map((item) => ({
    src: getImageUrl(item.image?.url),
    alt: item.caption || 'Gallery Image',
    download: `${getImageUrl(item.image?.url)}?download`,
  }))

  return (
    <main className="bg-[#f0f6ff] min-h-screen pb-24 font-sans overflow-x-hidden">
      <PageBanner
        title="Message from Managing Director"
        padding="py-12 px-6"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIcon className="w-4 h-4" /> },
          { name: 'MD Message' },
        ]}
      />

      {/* ── PROFILE / BIO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(52,152,219,0.10)] flex flex-col lg:flex-row overflow-hidden border border-blue-50">
          <div className="lg:w-2/5 p-8 bg-linear-to-b from-[#f8fbff] to-white flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-blue-50">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(52,152,219,0.18)] w-full aspect-square mb-7 group">
              <Image
                src={chairman}
                alt="Dr. Rajesh Kazi Shrestha"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f2050]/65 to-transparent" />
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

          <div className="lg:w-3/5 p-8 lg:p-12">
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
            <div className="relative bg-[#f0f6ff] border-l-4 border-[#3498db] rounded-r-2xl px-6 py-5 mb-7">
              <span className="absolute -top-2 left-4 text-6xl text-[#3498db]/15 font-serif leading-none select-none">
                "
              </span>
              <p className="text-[#1a3a6e] font-medium leading-[1.8] text-[15px] italic">
                Since our inception in 1978, we have remained steadfast in our commitment to
                delivering exceptional value across diverse sectors.
              </p>
            </div>
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
              responsible business practices, and creating value for all our stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
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
              <div className="absolute -left-1.75 top-5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#3498db] z-10 transition-all duration-300 group-hover:bg-[#3498db] group-hover:scale-150" />
              <span className="absolute -left-28 top-4 text-[#2357A6] font-bold text-base hidden md:block opacity-30 transition-all duration-300 group-hover:opacity-100">
                {award.year}
              </span>
              <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl relative">
                <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-100 transition-opacity duration-300">
                  <TrophyIcon className="w-5 h-5 text-[#3498db]" />
                </div>
                <h4 className="text-[#1a3a6e] text-base font-bold pr-10">{award.title}</h4>
                <p className="text-gray-400 text-[13px] mt-2.5">{award.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 border border-blue-200 text-[#2357A6] px-8 py-3 rounded-full hover:bg-[#2357A6] hover:text-white transition-all duration-300 font-semibold text-xs uppercase tracking-widest"
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
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Leadership Roles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">
              Positions &amp; Affiliations
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>
          <div className="flex flex-col gap-3">
            {positions.map((pos, idx) => (
              <div
                key={idx}
                className="group flex items-center bg-[#f0f6ff] rounded-2xl overflow-hidden border border-blue-50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-[40%] md:w-[35%] px-5 py-4 font-bold text-[#1a3a6e] text-sm group-hover:text-[#3498db] transition-colors leading-snug">
                  {pos.title}
                </div>
                <div className="flex-1 px-5 py-4 text-right text-gray-500 text-sm font-medium leading-snug">
                  {pos.organization}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── VIDEO MESSAGES ── */}
        {!loading && videoData.length > 0 && (
          <div
            className="py-20 max-w-7xl mx-auto px-6 mt-4"
            onMouseEnter={() => setIsPausedVideo(true)}
            onMouseLeave={() => setIsPausedVideo(false)}
          >
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Watch &amp; Listen
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">Video Messages</h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
            </div>
            <div className="relative px-12">
              {videoData.length > itemsToShow.videos && (
                <>
                  <button
                    onClick={prevVideo}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-md hover:bg-[#2357A6] hover:text-white transition-all flex items-center justify-center text-[#2357A6]"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextVideo}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-md hover:bg-[#2357A6] hover:text-white transition-all flex items-center justify-center text-[#2357A6]"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${videoIndex * (100 / itemsToShow.videos)}%)`,
                    width: '100%',
                  }}
                >
                  {videoData.map((video, i) => {
                    const videoId = getYouTubeId(video.youtubeUrl)
                    const fallbackThumb = videoId
                      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                      : ''
                    const thumbUrl = video.thumbnail?.url
                      ? getImageUrl(video.thumbnail.url)
                      : fallbackThumb

                    return (
                      <div
                        key={`video-${i}`}
                        className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3 shrink-0"
                      >
                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative aspect-video rounded-2xl overflow-hidden shadow-md border border-blue-50 block bg-black transition-all duration-300 hover:-translate-y-1.5"
                        >
                          {thumbUrl && (
                            <Image
                              src={thumbUrl}
                              alt="Video Message"
                              fill
                              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                              unoptimized={thumbUrl.includes('youtube.com')}
                            />
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                              <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-16 border-l-white border-b-[9px] border-b-transparent ml-1" />
                            </div>
                          </div>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PHOTO GALLERY ── */}
        {!loading && galleryImages.length > 0 && (
          <div
            className="py-20 max-w-7xl mx-auto px-6 border-t border-blue-50"
            onMouseEnter={() => setIsPausedGallery(true)}
            onMouseLeave={() => setIsPausedGallery(false)}
          >
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Visual Moments
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a3a6e] mb-3">Photo Gallery</h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
            </div>
            <div className="relative px-12">
              {galleryImages.length > itemsToShow.gallery && (
                <>
                  <button
                    onClick={prevGallery}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-md hover:bg-[#2357A6] hover:text-white transition-all flex items-center justify-center text-[#2357A6]"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextGallery}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-blue-100 rounded-full shadow-md hover:bg-[#2357A6] hover:text-white transition-all flex items-center justify-center text-[#2357A6]"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </>
              )}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${galleryIndex * (100 / itemsToShow.gallery)}%)`,
                    width: '100%',
                  }}
                >
                  {galleryImages.map((item, i) => {
                    const imgUrl = getImageUrl(item.image?.url)
                    return (
                      <div
                        key={`gallery-${i}`}
                        className="min-w-full sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%] px-2 shrink-0"
                      >
                        <div
                          onClick={() => setLightboxIndex(i)}
                          className="relative aspect-square rounded-2xl overflow-hidden border border-blue-50 shadow-sm group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                        >
                          {imgUrl && (
                            <Image
                              src={imgUrl}
                              alt={item.caption || 'Gallery Image'}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-[#1a3a6e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Download, Fullscreen, Slideshow, Thumbnails, Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        slideshow={{ autoplay: false, delay: 3000 }}
      />
    </main>
  )
}
