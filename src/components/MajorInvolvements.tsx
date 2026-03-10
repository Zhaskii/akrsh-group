'use client'

import { businessVerticals } from '@/constant/business.verticals'

export default function MajorInvolvements() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#3498db] mb-2 uppercase tracking-tight">
            Major Involvements
          </h2>
          <div className="w-16 h-1 bg-[#3498db] mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-blue-900">Our Business Verticals</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessVerticals.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-4xl shadow-lg h-64 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                {/* Background image */}
                {item.bgImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${
                        typeof item.bgImage === 'string' ? item.bgImage : item.bgImage.src
                      })`,
                    }}
                  ></div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-white/80 to-white/0 opacity-80 group-hover:opacity-60 transition-opacity duration-300 rounded-4xl pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col items-start justify-center h-full transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  {/* Enhanced Icon */}
                  <div
                    className="
                      bg-white p-3 rounded-full shadow-md mb-4 
                      w-12 h-12 flex items-center justify-center
                      transition-all duration-500 ease-out
                      group-hover:bg-blue-100
                      group-hover:-translate-y-2
                      group-hover:rotate-6
                      group-hover:scale-110
                      group-hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]
                    "
                  >
                    <Icon className="w-6 h-6 text-[#219AEA] transition-all duration-500 ease-out group-hover:text-[#2357A6] group-hover:scale-110" />
                  </div>

                  {/* Text */}
                  <h3 className="text-2xl font-bold text-[#2357A6] mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-950 font-light leading-relaxed max-w-[90%]">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
