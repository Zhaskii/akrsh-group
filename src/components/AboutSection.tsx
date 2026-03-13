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
    <main className="bg-[#f0f6ff] font-sans overflow-x-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(12px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer-line {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .anim-fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-d1 { animation: fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-d2 { animation: fadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-d3 { animation: fadeUp 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-d4 { animation: fadeUp 0.7s 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-up-d5 { animation: fadeUp 0.7s 0.5s cubic-bezier(0.22,1,0.36,1) both; }
        .anim-fade-in   { animation: fadeIn 0.9s 0.1s both; }

        /* Stat card number shimmer */
        .stat-value {
          background: linear-gradient(90deg, #1a3a6e 0%, #3498db 40%, #1a3a6e 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-line 3s linear infinite;
        }

        /* Pulse ring on vision/mission icons */
        .icon-pulse::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: rgba(52,152,219,0.25);
          animation: pulse-ring 2.2s ease-out infinite;
        }

        /* Mission card — number watermark */
        .mission-card { position: relative; overflow: hidden; }
        .mission-card .ghost-num {
          position: absolute;
          bottom: -8px; right: 8px;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(52,152,219,0.05);
          line-height: 1;
          pointer-events: none;
          transition: color 0.3s;
          user-select: none;
        }
        .mission-card:hover .ghost-num { color: rgba(52,152,219,0.09); }

        /* Core value card icon block */
        .value-icon-wrap {
          position: relative;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .group:hover .value-icon-wrap { transform: scale(1.12) rotate(-4deg); }

        /* Sliding top accent bar */
        .top-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2357A6, #3498db);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
          border-radius: 999px 999px 0 0;
        }
        .group:hover .top-accent-bar { transform: scaleX(1); }

        /* Gradient divider */
        .grad-divider {
          height: 1px;
          background: linear-gradient(90deg, #3498db 0%, rgba(52,152,219,0.08) 100%);
          margin-bottom: 1.5rem;
        }
      `}</style>

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
              <p className="anim-fade-up text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
                Our Story
              </p>
              <h2 className="anim-fade-up-d1 text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3 leading-tight">
                Who Are We?
              </h2>
              <div
                className="anim-fade-up-d2 w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-8 origin-left"
                style={{
                  animation:
                    'slideRight 0.6s 0.3s cubic-bezier(0.22,1,0.36,1) both, fadeIn 0s 0.3s both',
                }}
              />
              <div className="anim-fade-up-d3 space-y-5 text-gray-500 leading-relaxed text-[15px] text-justify">
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
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="group relative bg-white rounded-2xl px-6 py-5 border border-blue-50 shadow-[0_4px_20px_rgba(52,152,219,0.07)] hover:shadow-[0_12px_36px_rgba(52,152,219,0.16)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  style={{
                    animation: `countUp 0.6s ${0.15 * i + 0.3}s cubic-bezier(0.22,1,0.36,1) both`,
                  }}
                >
                  {/* Accent bar */}
                  <div className="top-accent-bar" />
                  {/* Decorative bg circle */}
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-linear-to-br from-[#2357A6]/5 to-[#3498db]/10 pointer-events-none transition-transform duration-500 group-hover:scale-150" />

                  <p className="stat-value text-3xl font-extrabold">{stat.value}</p>
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
          <div className="text-center mb-16 anim-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Our Purpose
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-3">
              Our Vision &amp; Mission
            </h2>
            <div className="w-12 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mx-auto" />
          </div>

          {/* Vision */}
          <div className="anim-fade-up-d1 group relative bg-white rounded-3xl border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)] hover:shadow-[0_20px_56px_rgba(52,152,219,0.15)] transition-all duration-400 p-8 md:p-12 mb-6 overflow-hidden">
            {/* Top accent */}
            <div className="top-accent-bar" style={{ borderRadius: '1.5rem 1.5rem 0 0' }} />
            {/* Decorative blob */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-linear-to-br from-[#2357A6]/6 to-[#3498db]/10 pointer-events-none transition-transform duration-500 group-hover:scale-125" />

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="icon-pulse relative bg-linear-to-br from-[#2357A6] to-[#3498db] p-3 rounded-2xl shadow-[0_6px_20px_rgba(52,152,219,0.3)]">
                <EyeIcon className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3498db]">
                  Vision
                </p>
                <h3 className="text-2xl font-bold text-[#1a3a6e]">Our Vision</h3>
              </div>
            </div>

            <div className="grad-divider" />

            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">
              To be recognized as an ethical business group committed to empowering and uplifting
              society through continuous and meaningful efforts.
            </p>

            {/* Decorative quote mark */}
            <div className="absolute bottom-4 right-8 text-[7rem] leading-none text-[#3498db]/5 font-serif pointer-events-none select-none">
              "
            </div>
          </div>

          {/* Mission */}
          <div className="anim-fade-up-d2 group relative bg-white rounded-3xl border border-blue-50 shadow-[0_4px_24px_rgba(52,152,219,0.08)] hover:shadow-[0_20px_56px_rgba(52,152,219,0.15)] transition-all duration-400 p-8 md:p-12 overflow-hidden">
            <div className="top-accent-bar" style={{ borderRadius: '1.5rem 1.5rem 0 0' }} />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-linear-to-tr from-[#2357A6]/6 to-[#3498db]/10 pointer-events-none transition-transform duration-500 group-hover:scale-125" />

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="icon-pulse relative bg-linear-to-br from-[#2357A6] to-[#3498db] p-3 rounded-2xl shadow-[0_6px_20px_rgba(52,152,219,0.3)]">
                <RocketLaunchIcon className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3498db]">
                  Mission
                </p>
                <h3 className="text-2xl font-bold text-[#1a3a6e]">Our Mission</h3>
              </div>
            </div>

            <div className="grad-divider" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MISSION_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="mission-card group/card bg-[#f0f6ff] rounded-2xl p-6 border border-blue-50 hover:border-blue-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(52,152,219,0.12)] hover:-translate-y-1 transition-all duration-300"
                  style={{
                    animation: `fadeUp 0.6s ${idx * 0.08 + 0.2}s cubic-bezier(0.22,1,0.36,1) both`,
                  }}
                >
                  <div className="w-8 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mb-4 origin-left transition-transform duration-300 group-hover/card:scale-x-125" />
                  <h4 className="text-[#1a3a6e] text-base font-bold mb-2 group-hover/card:text-[#3498db] transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{item.desc}</p>
                  <span className="ghost-num">{String(idx + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 anim-fade-up">
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
                  className="group relative bg-white rounded-2xl p-6 border border-blue-50 shadow-[0_4px_16px_rgba(52,152,219,0.06)] hover:shadow-[0_16px_40px_rgba(52,152,219,0.16)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
                  style={{
                    animation: `fadeUp 0.6s ${idx * 0.06 + 0.15}s cubic-bezier(0.22,1,0.36,1) both`,
                  }}
                >
                  {/* Top accent bar */}
                  <div className="top-accent-bar" />

                  {/* Decorative background circle */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#2357A6]/0 to-[#3498db]/0 group-hover:from-[#2357A6]/3 group-hover:to-[#3498db]/6 transition-all duration-500 pointer-events-none" />

                  {/* Icon */}
                  <div className="value-icon-wrap mb-4">
                    <div className="bg-linear-to-br from-[#2357A6]/10 to-[#3498db]/10 p-4 rounded-2xl w-16 h-16 flex items-center justify-center group-hover:from-[#2357A6] group-hover:to-[#3498db] transition-all duration-300 shadow-[0_2px_8px_rgba(52,152,219,0.08)] group-hover:shadow-[0_8px_24px_rgba(52,152,219,0.3)]">
                      <Icon className="w-8 h-8 text-[#2357A6] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h4 className="text-[15px] font-bold text-[#1a3a6e] mb-2 group-hover:text-[#3498db] transition-colors duration-200 relative z-10">
                    {value.label}
                  </h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed relative z-10">
                    {value.desc}
                  </p>

                  {/* Ghost index */}
                  <div className="absolute bottom-1 right-2 text-4xl font-black text-[#3498db]/5 group-hover:text-[#3498db]/0 transition-colors duration-300 pointer-events-none select-none leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
