"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E4F0FD] flex items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full text-center">
        {/* Decorative Element */}
        <div className="relative mb-8 flex justify-center">
          <h1 className="text-[120px] md:text-[180px] font-black text-[#2257A6]/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Replace with a relevant small icon or logo if desired */}
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center rotate-12 group hover:rotate-0 transition-transform duration-500">
              <HomeIcon className="w-12 h-12 text-[#2257A6]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2c3e50] mb-4">
            Oops! Page Disappeared
          </h2>
          <p className="text-[#5d6d7e] text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#2257A6] text-white rounded-full font-bold transition-all hover:bg-[#1a4480] hover:shadow-lg hover:-translate-y-1"
            >
              <HomeIcon className="w-5 h-5" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#2257A6] border-2 border-[#2257A6]/10 rounded-full font-bold transition-all hover:bg-gray-50 hover:border-[#2257A6]"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>

        {/* Support Links */}
        <div className="mt-12 flex justify-center gap-8 text-sm font-medium text-[#2257A6]/60">
          <Link href="/blog" className="hover:text-[#2257A6] transition-colors">
            Our Blogs
          </Link>
          <Link
            href="/gallery"
            className="hover:text-[#2257A6] transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#2257A6] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
