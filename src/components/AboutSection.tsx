'use client'

import {
  HomeIcon,
  EyeIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ScaleIcon,
  WrenchIcon,
  HandRaisedIcon,
  HeartIcon,
  SparklesIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid'
import PageBanner from './PageBanner'

const MISSION_ITEMS = [
  {
    title: 'Sustainable Growths',
    desc: 'To become sustainably-growing business group through carefully planned strategies.',
  },
  {
    title: 'Customer Value',
    desc: 'To create optimum value for our customers by understanding and exceeding their expectations.',
  },
  {
    title: 'Employer of Choice',
    desc: "To become 'Employer of Choice' by providing growth opportunities and work-life balance.",
  },
  {
    title: 'Equal Opportunities',
    desc: 'To provide equal opportunities regardless of age, caste, gender, race, and religion.',
  },
  {
    title: 'Community Support',
    desc: 'To empower communities by providing support and opportunities that unite society.',
  },
  {
    title: 'Business Excellence',
    desc: 'To uphold the highest standards of integrity, quality, service, innovation, and excellence.',
  },
] as const

const CORE_VALUES = [
  {
    label: 'Accountability',
    icon: CheckCircleIcon,
    desc: 'Taking responsibility for our actions and decisions',
  },
  {
    label: 'Determination',
    icon: ArrowTrendingUpIcon,
    desc: 'Pursuing our goals with unwavering resolve',
  },
  { label: 'Discipline', icon: ClockIcon, desc: 'Maintaining high standards in all we do' },
  { label: 'Equality', icon: ScaleIcon, desc: 'Treating everyone with fairness and respect' },
  { label: 'Hard-Work', icon: WrenchIcon, desc: 'Putting in our best effort in everything we do' },
  {
    label: 'Helpfulness',
    icon: HandRaisedIcon,
    desc: 'Supporting others in their journey to success',
  },
  { label: 'Honesty', icon: HeartIcon, desc: 'Being truthful and transparent in all our dealings' },
  {
    label: 'Kindness',
    icon: SparklesIcon,
    desc: 'Showing compassion and care in our interactions',
  },
  { label: 'Respect', icon: HandThumbUpIcon, desc: 'Valuing and honoring the dignity of all' },
  { label: 'Trust', icon: ShieldCheckIcon, desc: 'Building reliable and lasting relationships' },
] as const

export default function AboutSection() {
  return (
    <main className="bg-[#f0f6ff] font-sans">
      {/* BANNER */}
      <PageBanner
        title="About Us"
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[{ name: 'Home', href: '/', icon: <HomeIcon /> }, { name: 'About Us' }]}
      />

      {/* ── WHO ARE WE ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* Left: text */}
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3 leading-tight">
                Who Are We?
              </h2>
              <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-8" />
              <div className="space-y-5 text-gray-500 leading-relaxed text-[15px] text-justify">
                <p>
                  The story of Arksh Group began in 1978 when Dr. Rajesh Kazi Shrestha, a vibrant
                  entrepreneur, founded Rajesh Concern with a focus on trade and hospitality.
                  Through importing various goods from around the world, Rajesh Concern played a
                  vital role in promoting Nepal and strengthening trade relations with many
                  countries. His dedication and success made him one of the most accomplished
                  importers in Nepal, committed to serving their customers diligently.
                </p>
                <p>
                  Arksh Group has now evolved into a versatile and dynamic business conglomerate.
                  The Group has diversified its reach across various sectors and is engaged in a
                  wide range of businesses including automobiles, food industry, hotels &amp;
                  restaurants, food &amp; beverages, metal &amp; minerals, tours &amp; travels,
                  carpet &amp; flooring, clothing &amp; shoes, health &amp; wellness, beauty &amp;
                  cosmetics, IT and more.
                </p>
                <p>
                  Today, Arksh Group stands as one of the most trusted business groups in Nepal. Its
                  impressive growth is a result of deeply understanding local markets, people, and
                  customs, allowing them to excel in every segment of their business. Apart from
                  making significant contributions to Nepal's economy it also creates employment
                  opportunities and promotes entrepreneurship in the country.
                </p>
                <p>
                  Arksh Group's journey embodies dedication, understanding, and adaptability. Its
                  diverse portfolio and commitment to excellence have made the group a leading
                  business force in Nepal, touching every aspect of the business world and
                  positively impacting the nation's growth and development.
                </p>
              </div>
            </div>

            {/* Right: stat cards */}
            <div className="lg:w-72 w-full grid grid-cols-2 lg:grid-cols-1 gap-4 lg:mt-16">
              {[
                { value: '1978', label: 'Founded' },
                { value: '45+', label: 'Years of Excellence' },
                { value: '10+', label: 'Business Sectors' },
                { value: '15+', label: 'Countries Reached' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl px-6 py-5 border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.07)] hover:shadow-[0_8px_30px_rgba(52,152,219,0.14)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <p className="text-3xl font-extrabold text-[#2357A6]">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Our Purpose
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
              Our Vision &amp; Mission
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)] hover:shadow-[0_16px_48px_rgba(52,152,219,0.14)] transition-all duration-300 p-8 md:p-12 mb-8 relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-linear-to-br from-[#2357A6]/5 to-[#3498db]/10 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-3 rounded-2xl shadow-md">
                <EyeIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3498db]">
                  Vision
                </p>
                <h3 className="text-2xl font-bold text-[#1a3a6e]">Our Vision</h3>
              </div>
            </div>
            <div className="w-full h-px bg-linear-to-r from-blue-100 to-transparent mb-6" />
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
              To be recognized as an ethical business group committed to empowering and uplifting
              society through continuous and meaningful efforts.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-linear-to-tr from-[#2357A6]/5 to-[#3498db]/10 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-3 rounded-2xl shadow-md">
                <RocketLaunchIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3498db]">
                  Mission
                </p>
                <h3 className="text-2xl font-bold text-[#1a3a6e]">Our Mission</h3>
              </div>
            </div>
            <div className="w-full h-px bg-linear-to-r from-blue-100 to-transparent mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MISSION_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-[#f0f6ff] rounded-2xl p-6 border border-blue-50 hover:border-blue-200 hover:shadow-[0_8px_30px_rgba(52,152,219,0.12)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-8 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-4" />
                  <h4 className="text-[#1a3a6e] text-base font-bold mb-2 group-hover:text-[#3498db] transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Our Core Values
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
              The Principles That Guide Us
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto mb-4" />
            <p className="text-gray-400 text-sm font-medium italic">
              Our values shape who we are and how we work together
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_VALUES.map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.06)] hover:shadow-[0_12px_36px_rgba(52,152,219,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-linear-to-br from-[#2357A6]/10 to-[#3498db]/10 p-4 rounded-2xl mb-4 w-16 h-16 flex items-center justify-center group-hover:scale-110 group-hover:from-[#2357A6] group-hover:to-[#3498db] transition-all duration-300">
                    <Icon className="w-8 h-8 text-[#2357A6] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-[18px] font-bold text-[#1a3a6e] mb-2 group-hover:text-[#3498db] transition-colors duration-200">
                    {value.label}
                  </h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
