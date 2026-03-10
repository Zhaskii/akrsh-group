'use client'

import { achievements } from '@/constant/achievements'

export default function Achievements() {
  return (
    <section className="py-20 bg-[#f8fbff] relative overflow-hidden">
      {/* Decorative Light Blue Circle (Right Side Background) */}
      <div className="absolute top-0 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-50 z-0 translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-200 rounded-full opacity-50 z-0 -translate-x-1/3 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3498DB] relative inline-block">
            Our Achievements
          </h2>
          <div className="w-20 h-1 bg-[#3498db] mx-auto mb-6"></div>
          <p className="text-xl font-bold text-[#003D82]">Milestones That Define Us.</p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="group bg-white p-10 rounded-[2.5rem] shadow-md flex flex-col items-center text-center transition-transform hover:scale-105 duration-300 border border-gray-50 hover:shadow-xl"
              >
                {/* Icon Circle */}
                <div className="bg-[#219AEA] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:bg-[#2357A6]">
                  <Icon className="w-10 h-10 text-white transition-all duration-300" />
                </div>

                {/* Number */}
                <h3 className="text-4xl font-semibold text-[#219AEA] mb-2 tracking-tight transition-colors duration-300 group-hover:text-[#2357A6]">
                  {item.number}
                </h3>

                {/* Label */}
                <p className="text-lg font-bold text-[#003D82] mb-1 transition-colors duration-300 group-hover:text-[#2357A6]">
                  {item.label}
                </p>

                {/* Sub-label */}
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  {item.subLabel}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
