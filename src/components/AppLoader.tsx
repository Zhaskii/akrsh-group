'use client'

import React from 'react'
import Image from 'next/image'

export default function AppLoader() {
  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#E6F2FF] px-4"
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-6 md:gap-8">
        {/* Responsive Logo */}
        <div className="relative">
          <Image
            src="/logo.jpg"
            alt="Arksh Group"
            width={160}
            height={60}
            priority
            className="object-contain w-25 sm:w-40 md:w-50 h-auto"
          />
        </div>

        {/* Spinner Section */}
        <div className="flex flex-col items-center gap-3 md:gap-4">
          {/* Responsive Spinner */}
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
            <div className="absolute inset-0 rounded-full border-4 border-[#1E73BE]/20" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1E73BE] animate-spin"
              style={{ animationDuration: '0.8s' }}
            />
          </div>

          {/* Responsive Text */}
          <p className="text-xs sm:text-sm md:text-base font-semibold text-[#1E73BE] uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    </div>
  )
}
