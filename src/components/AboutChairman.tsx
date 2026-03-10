"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  TrophyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import PageBanner from "./PageBanner";
import { HomeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  allAwards,
  galleryImages,
  positions,
  videoData,
} from "@/constant/chairman.profile.data";

export default function AboutChairman() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleAwards = isExpanded ? allAwards : allAwards.slice(0, 2);

  return (
    <main className="bg-white min-h-screen pb-20 font-sans">
      <PageBanner
        title="Message from Managing Director"
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "MD Message" },
        ]}
      />

      {/* ================= MESSAGE & BIO ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="bg-white rounded-3xl shadow-xl flex flex-col lg:flex-row overflow-hidden border border-gray-100">
          <div className="lg:w-2/5 p-8 bg-white flex flex-col items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full aspect-4/3 lg:aspect-square mb-6">
              <Image
                src="https://arkshgroup.com/uploads/about/Rajesh-Kazi-Shrestha-Arksh-Group-1536x1023%20(1).jpg"
                alt="Dr. Rajesh Kazi Shrestha"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-6 right-0 bg-[#2257A6] text-white px-5 py-3 rounded-l-xl text-center shadow-md z-10">
                <p className="text-2xl font-semibold tracking-tight">47+</p>
                <p className="text-[10px] uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-[#2257A6] text-2xl font-semibold">
                Dr. Rajesh Kazi Shrestha
              </h2>
              <p className="text-gray-500 font-normal mt-1 uppercase tracking-widest text-xs">
                Chairman / Managing Director
              </p>
              <div className="w-16 h-1 bg-[#2257A6] mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          <div className="lg:w-3/5 p-8 lg:p-14 bg-white">
            <h3 className="text-[#2257A6] text-xl font-medium mb-6 italic">
              "Dear Valued Partners, Clients, and Team Members"
            </h3>
            <div className="text-gray-600 leading-relaxed mb-8 text-base font-normal">
              <p>
                It is with great pleasure that I welcome you to Arksh Group. As
                the Managing Director, I take immense pride in our
                organization's journey of growth, innovation, and excellence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-l-4 border-[#209AEA] shadow-sm italic text-gray-700 relative mb-8 text-base leading-relaxed font-normal">
              <span className="absolute -top-3 left-4 text-7xl text-blue-100 font-serif select-none opacity-50">
                “
              </span>
              Since our inception in 1978, we have remained steadfast in our
              commitment to delivering exceptional value across diverse sectors.
            </div>
            <div className="text-gray-600 leading-relaxed mb-8 text-base font-normal flex ">
              <p className="flex gap-2">
                <CheckCircleIcon className="text-blue-800 w-30 h-6" />
                The business landscape is constantly evolving, presenting both
                challenges and opportunities. At Arksh Group, we embrace change
                and adaptability as essential components of our business
                strategy.
              </p>
              <p className="flex gap-2">
                <CheckCircleIcon className="text-blue-800 w-30 h-6" />
                We continuously invest in our people, processes, and
                technologies to stay ahead of the curve and deliver solutions
                that meet the evolving needs of our stakeholders.
              </p>
            </div>
            <div className="text-gray-600 leading-relaxed mb-8 text-base font-normal">
              <p>
                As we look to the future, we remain committed to sustainable
                growth, socially responsible business practices, and creating
                value for all our stakeholders. We are excited about the
                opportunities that lie ahead and are confident in our ability to
                achieve new milestones while staying true to our founding
                principles. I extend my heartfelt gratitude to our clients,
                partners, and team members for their trust, support, and
                dedication. Together, we will continue to push boundaries,
                overcome challenges, and create a legacy of excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AWARDS TIMELINE ================= */}
      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <span className="bg-[#2257A6] text-white px-5 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-widest shadow-sm">
            Recognition
          </span>
          <h2 className="text-[#2257A6] text-4xl font-semibold mt-4 tracking-tight">
            Awards & Honors
          </h2>
          <div className="w-16 h-1 bg-[#209AEA] mx-auto mt-4 rounded-full opacity-50"></div>
        </div>

        <div className="relative border-l border-blue-100 ml-4 md:ml-32 space-y-10 pb-10">
          {visibleAwards.map((award, idx) => (
            <div key={idx} className="relative pl-10 group cursor-pointer">
              <div className="absolute -left-[6.5px] top-0 w-3 h-3 rounded-full bg-white border-2 border-[#2257A6] z-10 transition-all duration-300 group-hover:bg-[#2257A6] group-hover:scale-150"></div>
              <span className="absolute -left-28 top-0 text-[#2257A6] font-medium text-xl hidden md:block opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                {award.year}
              </span>
              <div className="bg-white p-7 rounded-2xl border border-gray-50 relative transition-all duration-500 ease-out shadow-md group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(34,87,166,0.15)] group-hover:border-blue-100">
                <div className="absolute top-6 right-6 text-[#2257A6] transition-all duration-300 opacity-20 group-hover:opacity-100 group-hover:scale-110">
                  <TrophyIcon className="w-6 h-6" />
                </div>
                <h4 className="text-[#2257A6] text-lg font-medium pr-10 leading-snug">
                  {award.title}
                </h4>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed font-normal">
                  {award.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 border border-blue-200 text-[#2257A6] px-8 py-3 rounded-full hover:bg-[#2257A6] hover:text-white transition-all duration-300 font-medium text-xs uppercase tracking-widest shadow-sm hover:shadow-lg hover:-translate-y-0.5"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUpIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                Show More <ChevronDownIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* ================= POSITIONS LIST ================= */}
      <section className="bg-[#E6F2FF] py-20 mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[#2257A6] text-xl md:text-2xl font-semibold text-center mb-12 uppercase tracking-wide leading-relaxed">
            Rajesh Kazi Shrestha holds the following positions in{" "}
            <br className="hidden md:block" /> different associations and
            organizations:
          </h2>
          <div className="flex flex-col gap-3">
            {positions.map((pos, idx) => (
              <div
                key={idx}
                className="flex items-center bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 group cursor-default hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,87,166,0.1)] hover:border-blue-100"
              >
                <div className="w-[35%] md:w-[30%] p-4 md:p-5 font-semibold text-[#2257A6] text-sm md:text-base transition-colors duration-300 group-hover:bg-blue-50/50">
                  {pos.title}
                </div>
                <div className="flex items-center justify-center px-2">
                  <div className="flex -space-x-1.5">
                    <ChevronRightIcon className="w-4 h-4 text-[#2257A6] font-bold" />
                    <ChevronRightIcon className="w-4 h-4 text-[#2257A6] font-bold" />
                  </div>
                </div>
                <div className="flex-1 p-4 md:p-5 text-right text-sm md:text-base text-gray-700 font-medium">
                  {pos.organization}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CURRENT MESSAGE VIDEOS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#2257A6] text-3xl md:text-4xl font-bold tracking-tight">
              Current Message Videos
            </h2>
            <div className="w-12 h-1 bg-[#2257A6] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoData.map((video) => (
              <a
                key={video.id}
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(34,87,166,0.2)] group-hover:-translate-y-2">
                  <Image
                    src={video.thumbnail}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY COLLECTION (BORDERLESS) ================= */}
      <section className="max-w-8xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-[#EBF5FF] text-[#209AEA] text-[12px] font-bold uppercase tracking-widest px-6 py-2 rounded-full mb-6">
          Photo Gallery
        </span>
        <h2 className="text-[#2257A6] text-4xl font-bold tracking-tight">
          MD Gallery Collection
        </h2>
        <div className="w-16 h-1 bg-[#209AEA] mx-auto mt-4 mb-6 rounded-full"></div>
        <p className="text-gray-500 font-normal mb-16 text-lg">
          Browse through our collection of memorable moments and milestones
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="group cursor-pointer">
              {/* No wrapper borders, just the relative container for the Image */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(34,87,166,0.2)]">
                <Image
                  src={src}
                  alt={`MD Gallery milestone ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
