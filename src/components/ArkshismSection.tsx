'use client'

import React, { useRef, useEffect, useState } from 'react'
import {
  HomeIcon,
  LightBulbIcon,
  StarIcon,
  UserIcon,
  ShareIcon,
  ArrowUpRightIcon,
  TrophyIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import logo2 from '@/assets/logo/logo2.png'
import Image from 'next/image'
import PageBanner from './PageBanner'

// Simple hook for scroll-triggered animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function ArkshismSection() {
  const heroAnim = useInView(0.2)
  const pillarsAnim = useInView(0.1)
  const logoAnim = useInView(0.2)
  const gridAnim = useInView(0.1)
  const nepaliAnim = useInView(0.1)

  return (
    <main className="bg-[#f7faff] font-sans min-h-screen pb-32 overflow-x-hidden">
      {/* Banner */}
      <PageBanner
        title="Arkshism"
        padding="py-12 px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[{ name: 'Home', href: '/', icon: <HomeIcon /> }, { name: 'Arkshism' }]}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20">
        {/* ── Hero Philosophy Card ── */}
        <div
          ref={heroAnim.ref}
          style={{
            opacity: heroAnim.inView ? 1 : 0,
            transform: heroAnim.inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
          className="relative rounded-[40px] overflow-hidden mb-24 shadow-2xl"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#1a3a6e] via-[#2357A6] to-[#3498db]" />
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-white-3" />

          <div className="relative z-10 py-20 px-8 text-center text-white flex flex-col items-center gap-6">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 p-5 rounded-full shadow-xl">
              <LightBulbIcon className="w-14 h-14 text-white drop-shadow-lg" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200 mb-3">
                Our Philosophy
              </p>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Arkshism</h2>
              <div className="w-16 h-0.75 bg-white/40 rounded-full mx-auto mb-6" />
              <p className="max-w-2xl text-lg leading-relaxed text-blue-100 font-light">
                The guiding philosophy behind this identity and visual representation of logo is
                known as Arkshism — a concept rooted in aspiration and stellar excellence.
              </p>
            </div>
          </div>
        </div>

        {/* ── Three Pillars ── */}
        <div ref={pillarsAnim.ref}>
          <SectionHeader
            label="Foundation"
            title="Three Pillars of Arkshism"
            inView={pillarsAnim.inView}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
            {[
              {
                icon: <StarIcon className="w-8 h-8" />,
                title: 'ARKSH means "Of The Stars"',
                desc: "The name 'ARKSH' was chosen by the CEO of Arksh Group. The name ARKSH is of Sanskrit origin and means 'Of The Stars' or 'Celestial,' representing the group's aspiration for excellence.",
                delay: 0,
              },
              {
                icon: <UserIcon className="w-8 h-8" />,
                title: 'A Legacy in Letters',
                desc: "The pronunciation 'AR=R, K=K, SH=S' aligns with the initials of our Chairman/Managing Director, Rajesh Kazi Shrestha, forming a meaningful and deeply connected brand identity.",
                delay: 100,
              },
              {
                icon: <ShareIcon className="w-8 h-8" />,
                title: 'Interconnections',
                desc: 'The logo, slogan, and name are correlated and interconnected, emphasizing the significance of stars and devotion to aim for the highest goals while inspiring others.',
                delay: 200,
              },
            ].map((p, i) => (
              <PillarCard
                key={i}
                icon={p.icon}
                title={p.title}
                desc={p.desc}
                delay={p.delay}
                inView={pillarsAnim.inView}
              />
            ))}
          </div>
        </div>

        {/* ── Logo Section (English) ── */}
        <section className="mb-28" ref={logoAnim.ref}>
          <SectionHeader
            label="Visual Identity"
            title="Meaning Behind Our Logo"
            inView={logoAnim.inView}
          />

          {/* Logo display */}
          <div
            style={{
              opacity: logoAnim.inView ? 1 : 0,
              transform: logoAnim.inView ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
            className="flex justify-center mb-14"
          >
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-blue-200/40 blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative bg-white rounded-3xl border border-blue-100 shadow-xl p-8 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                <Image src={logo2} alt="Arksh Logo" className="h-40 object-contain" />
              </div>
            </div>
          </div>

          {/* Intro quote */}
          <div
            style={{
              opacity: logoAnim.inView ? 1 : 0,
              transform: logoAnim.inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
            className="max-w-2xl mx-auto text-center mb-14"
          >
            <p className="text-gray-500 text-lg leading-relaxed italic border-l-4 border-[#3498db] pl-5 text-left rounded-r-xl bg-white py-4 pr-6 shadow-sm">
              "The logo comprises stars, a person, and lines — with each element and color conveying
              a specific meaning."
            </p>
          </div>

          {/* Logo detail cards */}
          <div ref={gridAnim.ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <StarIcon />,
                title: 'Perspective',
                desc: 'The dark and light parts of the star represent the different perspectives people have. Some may see the dark color as positive, whilst others see the light color as positive. The transparent central part represents clarity and neutrality from within, regardless of external factors.',
                delay: 0,
              },
              {
                icon: <StarIcon />,
                title: 'Star Quality',
                desc: 'The person within the star symbolizes that every individual is a star, regardless of position, age, caste, gender, race, or religion. It signifies that those associated with Arksh Group will be nurtured to develop star qualities and become exceptional performers.',
                delay: 100,
              },
              {
                icon: <ArrowUpRightIcon />,
                title: 'Reaching Higher',
                desc: "A person extending hands to reach a star symbolizes Arksh Group's collective effort to achieve its vision — to be recognized as an ethical business group committed to empowering and uplifting society through continuous and meaningful efforts.",
                delay: 200,
              },
              {
                icon: <TrophyIcon />,
                title: 'Highest Goals',
                desc: "The smaller star represents the organization's goals to attain the pinnacle of success, desiring not just finite targets but the furthest ones — reaching beyond what seems possible.",
                delay: 300,
              },
              {
                icon: <SparklesIcon />,
                title: 'Shooting Star',
                desc: 'The line above the smaller star represents shooting stars — rare and special. This reflects that every individual associated with Arksh Group is also rare and special, and the Group is dedicated to supporting the aspirations of all associated individuals and organizations.',
                delay: 400,
              },
            ].map((card, i) => (
              <LogoDetailCard
                key={i}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                delay={card.delay}
                inView={gridAnim.inView}
              />
            ))}
          </div>
        </section>

        {/* ── Logo Section (Nepali) ── */}
        <section ref={nepaliAnim.ref}>
          <SectionHeader
            label="नेपाली संस्करण"
            title="अर्कश ग्रुपको लोगोले के चित्रण गर्दछ ?"
            inView={nepaliAnim.inView}
          />

          <div
            style={{
              opacity: nepaliAnim.inView ? 1 : 0,
              transform: nepaliAnim.inView ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
            className="flex justify-center mb-14"
          >
            <div className="group relative">
              <div className="absolute inset-0 rounded-3xl bg-blue-200/40 blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative bg-white rounded-3xl border border-blue-100 shadow-xl p-8 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-500">
                <Image src={logo2} alt="Arksh Logo" className="h-40 object-contain" />
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: nepaliAnim.inView ? 1 : 0,
              transform: nepaliAnim.inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
            className="max-w-2xl mx-auto text-center mb-14"
          >
            <p className="text-gray-500 text-lg leading-relaxed italic border-l-4 border-[#3498db] pl-5 text-left rounded-r-xl bg-white py-4 pr-6 shadow-sm">
              "लोगोमा ताराहरू, एक व्यक्ति र रेखाहरू समावेश भएका छन्, जसका प्रत्येक तत्व र रङले विशेष
              अर्थको अनुरूप बुझाउँछ।"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <StarIcon />,
                title: 'दृष्टिकोण',
                desc: 'लोगोमा भएका ताराहरूको रङिए विभेदले मानिसहरूको भिन्न भिन्न दृष्टिकोणलाई प्रतिबिम्बित गर्दछ। केही व्यक्तिहरूले गाढा रङलाई सकारात्मक पक्षको रूपमा लिन सक्छन्, भने केहीले फिक्का रङलाई लिन सक्छन्। लोगोको मध्य भागमा रहेको पारदर्शी भागले हामीलाई बाह्य परिस्थिति जतिसुकै प्रतिकूल भए तापनि, हामी आन्तरिक रूपमा स्पष्ट र तटस्थ हुनु पर्दछ भन्ने मनोभावको संकेत गर्दछ।',
                delay: 0,
              },
              {
                icon: <StarIcon />,
                title: 'उज्ज्वल व्यक्तित्व',
                desc: 'लोगोको तारा अन्तर्गत चित्रण गरिएको व्यक्तिले, अर्क्श ग्रुपसँग सम्बन्धित सबै व्यक्तिहरू जस्तोसुकै पद, उमेर, जात, लिङ्ग, जाति भएपनि तारा जस्तै उज्ज्वल विशेषता रहेको र सिद्ध कार्य निष्पादक बन्न विकसित गरिनेछ भन्ने धारणालाई प्रतिनिधित्व गर्दछ।',
                delay: 100,
              },
              {
                icon: <ArrowUpRightIcon />,
                title: 'उच्च लक्ष्यको खोजी',
                desc: 'तारासम्म पुग्नको लागि हात फैलाउने व्यक्तिले लक्ष्य प्राप्त गर्नको लागि कडा परिश्रम गरिरहेको अर्क्श ग्रुपको प्रतिनिधित्व गर्दछ, जसको उद्देश्य निरन्तर र सार्थक प्रयासमार्फत समाजलाई सशक्त र उन्नत बनाउने प्रतिबद्धता सहितको नैतिक व्यवसायिक समूहका रूपमा चिनिनु हो।',
                delay: 200,
              },
              {
                icon: <TrophyIcon />,
                title: 'सर्वोच्च सफलता',
                desc: 'अर्क्श ग्रुपको लोगोमा रहेको सानो तारले सीमित लक्ष्यहरूका लागि मात्र नभई सबैभन्दा टाढाको लक्ष्य सम्मै सफलताको शिखरमा पुग्ने सङ्गठनको उद्देश्यलाई प्रतिनिधित्व गर्दछ।',
                delay: 300,
              },
              {
                icon: <SparklesIcon />,
                title: 'टुटेको तारा',
                desc: 'लोगोको सानो तारा माथिको रेखा टुटेको तारको सूचक हो। टुटेका ताराहरू अति नै दुर्लभ र विशेष हुन्छन् — अर्क्श ग्रुपका सबै व्यक्तित्वहरू दुर्लभ विशेषताका धनी छन् र अर्क्श ग्रुप सदैव उनीहरूको उन्नति र इच्छा पूर्तिमा समर्पित रहेको छ।',
                delay: 400,
              },
            ].map((card, i) => (
              <LogoDetailCard
                key={i}
                icon={card.icon}
                title={card.title}
                desc={card.desc}
                delay={card.delay}
                inView={nepaliAnim.inView}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// ── Reusable Components ──

function SectionHeader({
  label,
  title,
  inView,
}: {
  label: string
  title: string
  inView: boolean
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className="text-center mb-14"
    >
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-4 leading-tight">{title}</h2>
      <div className="w-16 h-0.75 bg-linear-to-r from-[#3498db] to-[#2357A6] mx-auto rounded-full" />
    </div>
  )
}

function PillarCard({
  icon,
  title,
  desc,
  delay,
  inView,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  delay: number
  inView: boolean
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className="group bg-white rounded-4xl p-9 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(52,152,219,0.08)] border border-blue-50 hover:shadow-[0_12px_40px_rgba(52,152,219,0.18)] hover:-translate-y-2 transition-all duration-400"
    >
      <div className="relative mb-7">
        <div className="absolute inset-0 rounded-full bg-[#3498db]/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative bg-linear-to-br from-[#2357A6] to-[#3498db] p-5 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#1a3a6e] mb-3">{title}</h3>
      <div className="w-10 h-0.5 bg-[#3498db] mb-4 rounded-full group-hover:w-16 transition-all duration-300" />
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

function LogoDetailCard({
  icon,
  title,
  desc,
  delay,
  inView,
}: {
  icon: any
  title: string
  desc: string
  delay: number
  inView: boolean
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
      className="group bg-white rounded-3xl border border-blue-100 p-8 flex flex-col gap-4 hover:shadow-[0_12px_40px_rgba(52,152,219,0.15)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="bg-linear-to-br from-[#2357A6] to-[#3498db] p-3 rounded-xl text-white w-12 h-12 flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-300 shrink-0">
          {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </div>
        <h4 className="text-xl font-bold text-[#1a3a6e]">{title}</h4>
      </div>
      <div className="w-full h-px bg-blue-50" />
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}
