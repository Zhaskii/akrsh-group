'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import chairman from '@/assets/chairman&ceo/Rajesh-Kazi-Shrestha-Arksh-Group.jpg'
import Image from 'next/image'

export default function About() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 },
    }),
  }

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -50, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section { font-family: 'DM Sans', sans-serif; }
        .display-font  { font-family: 'Cormorant Garamond', serif; }

        .image-frame::before {
          content: '';
          position: absolute;
          inset: -10px -10px 10px 10px;
          border: 1.5px solid rgba(33,154,234,0.22);
          border-radius: 22px;
          z-index: 0;
          pointer-events: none;
        }
        .image-frame::after {
          content: '';
          position: absolute;
          inset: -22px -22px 22px 22px;
          border: 1px solid rgba(33,154,234,0.1);
          border-radius: 28px;
          z-index: 0;
          pointer-events: none;
        }

        .accent-line {
          background: linear-gradient(90deg, #219AEA, #2357A6, transparent);
          height: 3px;
          width: 64px;
          border-radius: 2px;
        }

        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem;
          line-height: 0.55;
          color: rgba(33,154,234,0.1);
          position: absolute;
          top: -4px;
          left: -6px;
          font-weight: 700;
          pointer-events: none;
          user-select: none;
        }

        .cta-primary {
          position: relative;
          background: linear-gradient(135deg, #219AEA, #2357A6);
          color: white;
          padding: 13px 30px;
          border-radius: 12px;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2357A6, #1a7bc0);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-primary:hover::before { opacity: 1; }
        .cta-primary:hover {
          box-shadow: 0 10px 32px rgba(33,154,234,0.38);
          transform: translateY(-2px);
        }
        .cta-primary span { position: relative; z-index: 1; }

        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #2357A6;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: gap 0.2s ease;
        }
        .cta-ghost:hover { gap: 14px; }
        .cta-ghost .arrow-circle {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(33,154,234,0.3);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .cta-ghost:hover .arrow-circle {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          border-color: transparent;
        }
        .cta-ghost:hover .arrow-circle svg { stroke: white; }
      `}</style>

      <section
        id="about"
        className="about-section w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-[#f0f6ff] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── Image Column ── */}
            <motion.div
              className="order-2 md:order-1 flex justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={slideInLeft}
            >
              <div className="relative image-frame" style={{ width: '100%', maxWidth: 460 }}>
                {/* Glow blob */}
                <div
                  className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(33,154,234,0.12) 0%, transparent 70%)',
                    zIndex: 0,
                  }}
                />

                {/* Main image card */}
                <div
                  className="relative rounded-3xl overflow-hidden z-10 group"
                  style={{
                    aspectRatio: '4/5',
                    boxShadow: '0 24px 64px rgba(35,87,166,0.22), 0 4px 16px rgba(33,154,234,0.1)',
                  }}
                >
                  {/* ✅ Zoom on hover — overflow-hidden on parent clips the scale */}
                  <Image
                    src={chairman}
                    alt="Chairman Rajesh Kazi Shrestha"
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    priority
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,25,55,0.85) 0%, rgba(33,154,234,0.08) 50%, transparent 100%)',
                    }}
                  />

                  {/* Name card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-end justify-between">
                      <div>
                        <p
                          className="text-white/60 mb-1.5 uppercase tracking-[0.18em]"
                          style={{ fontSize: '0.65rem', fontFamily: 'DM Sans, sans-serif' }}
                        >
                          Chairman &amp; Managing Director
                        </p>
                        <p
                          className="display-font text-white font-semibold leading-tight"
                          style={{ fontSize: '1.45rem' }}
                        >
                          Dr. Rajesh Kazi Shrestha
                        </p>
                      </div>
                      <div
                        className="shrink-0 rounded-full"
                        style={{
                          width: 10,
                          height: 10,
                          background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                          boxShadow:
                            '0 0 0 3px rgba(255,255,255,0.15), 0 0 12px rgba(33,154,234,0.6)',
                          marginBottom: 4,
                        }}
                      />
                    </div>
                    <div className="mt-3 h-px bg-linear-to-r from-white/30 to-transparent" />
                  </div>
                </div>

                {/* Corner accent dot */}
                <div
                  className="absolute z-20 rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                    bottom: -6,
                    right: -6,
                    boxShadow: '0 0 0 4px #f0f6ff, 0 0 0 6px rgba(33,154,234,0.25)',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Content Column ── */}
            <div className="order-1 md:order-2">
              {/* Badge */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={0}
                variants={fadeUp}
              >
                <span
                  className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#2357A6]"
                  style={{
                    background: 'rgba(33,154,234,0.08)',
                    border: '1px solid rgba(33,154,234,0.2)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#219AEA' }}
                  />
                  Leadership &amp; Vision
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={1}
                variants={fadeUp}
              >
                <h2
                  className="display-font font-bold text-[#0f1e3c] mb-2 leading-[1.12]"
                  style={{ fontSize: 'clamp(2.1rem, 4vw, 3.1rem)' }}
                >
                  A Legacy Built on
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Four Decades
                  </span>
                </h2>
                <div className="accent-line mb-8" />
              </motion.div>

              {/* Quote paragraph */}
              <motion.div
                className="relative mb-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={2}
                variants={fadeUp}
              >
                <span className="quote-mark">"</span>
                <p
                  className="text-gray-500 leading-[1.9] pl-2 text-justify"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)' }}
                >
                  Dr. Rajesh Kazi Shrestha's business journey started four decades ago. Since then
                  he has come a long way. His hard work has been recognized with various medals and
                  appreciation from the Government of Nepal for his outstanding contribution to the
                  business sector.
                </p>
              </motion.div>

              <motion.p
                className="text-gray-500 leading-[1.9] mb-8 text-justify"
                style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={3}
                variants={fadeUp}
              >
                He also received an honorary Doctorate from the International Journal of Non-Aligned
                Countries &amp; Foreign Policy Research Institute (FPRI), and served as a former
                Assistant Minister of the Ministry of Industry, Commerce &amp; Supplies.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-3 mb-9"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={4}
                variants={fadeUp}
              >
                {[
                  { value: '40+', label: 'Years of\nExperience' },
                  { value: 'PhD', label: 'Honorary\nDoctorate' },
                  { value: 'Gov.', label: 'Govt. Medals\n& Awards' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center rounded-2xl py-4 px-3 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'white',
                      border: '1px solid rgba(33,154,234,0.12)',
                      boxShadow: '0 4px 16px rgba(33,154,234,0.06)',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 10px 30px rgba(33,154,234,0.14)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(33,154,234,0.28)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 4px 16px rgba(33,154,234,0.06)'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(33,154,234,0.12)'
                    }}
                  >
                    <p
                      className="display-font font-bold mb-1"
                      style={{
                        fontSize: '1.55rem',
                        background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-gray-400 whitespace-pre-line font-medium"
                      style={{ fontSize: '0.67rem', lineHeight: 1.45, letterSpacing: '0.03em' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={5}
                variants={fadeUp}
                className="flex items-center gap-6"
              >
                <Link href="/md-message">
                  <button className="cta-primary cursor-pointer">
                    <span>Read Full Message</span>
                  </button>
                </Link>

                <Link href="/md-message" className="cta-ghost">
                  <div className="arrow-circle">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2357A6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                  <span>Chairman's Vision</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
