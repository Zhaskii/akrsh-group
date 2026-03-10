"use client";

import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { galleryData } from "@/constant/gallery.data";
import PageBanner from "@/components/PageBanner";
import LightboxLazy from "@/components/LightboxLazy";

export default function GalleryAlbum() {
  const [index, setIndex] = useState(-1);

  const slides = galleryData.map((item) => ({
    src: item.src,
    alt: item.title,
    // Add download url if it's different, otherwise it uses src
    download: `${item.src}?download`,
  }));

  return (
    <main className="bg-white min-h-screen">
      <PageBanner
        title="Gallery"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: "Home", href: "/", icon: <HomeIcon className="w-4 h-4" /> },
          { name: "Gallery", href: "/gallery" },
          { name: "Album" },
        ]}
      />

      <section className="py-10 sm:py-12 md:py-15 bg-white">
        <div className="w-full max-w-8xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {galleryData.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setIndex(i)}
                className="group relative h-56 sm:h-72 md:h-80 lg:h-88 overflow-hidden rounded sm:rounded md:rounded bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
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
  );
}
