'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

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

        .about-section {
          font-family: 'DM Sans', sans-serif;
        }
        .display-font {
          font-family: 'Cormorant Garamond', serif;
        }
        .image-frame::before {
          content: '';
          position: absolute;
          inset: -12px -12px 12px 12px;
          border: 1.5px solid #219AEA33;
          border-radius: 18px;
          z-index: 0;
          pointer-events: none;
        }
        .image-frame::after {
          content: '';
          position: absolute;
          inset: -24px -24px 24px 24px;
          border: 1px solid #219AEA18;
          border-radius: 22px;
          z-index: 0;
          pointer-events: none;
        }
        .accent-line {
          background: linear-gradient(90deg, #219AEA, #2357A6, transparent);
          height: 2px;
          width: 72px;
          border-radius: 2px;
        }
        .stat-card {
          background: rgba(33, 154, 234, 0.06);
          border: 1px solid rgba(33, 154, 234, 0.15);
          border-radius: 12px;
          padding: 16px 20px;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          background: rgba(33, 154, 234, 0.1);
          border-color: rgba(33, 154, 234, 0.3);
          transform: translateY(-2px);
        }
        .cta-btn {
          position: relative;
          background: linear-gradient(135deg, #219AEA, #2357A6);
          color: white;
          padding: 13px 32px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          overflow: hidden;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-block;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #2357A6, #1a7bc0);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover::before {
          opacity: 1;
        }
        .cta-btn:hover {
          box-shadow: 0 8px 28px rgba(33, 154, 234, 0.4);
          transform: translateY(-1px);
        }
        .cta-btn span {
          position: relative;
          z-index: 1;
        }
        .section-bg {
          background: linear-gradient(160deg, #f8fafc 0%, #f0f6fe 50%, #f8fafc 100%);
        }
        .image-overlay {
          background: linear-gradient(
            to top,
            rgba(35, 87, 166, 0.55) 0%,
            rgba(33, 154, 234, 0.1) 50%,
            transparent 100%
          );
        }
        .badge {
          background: linear-gradient(135deg, rgba(33,154,234,0.12), rgba(35,87,166,0.12));
          border: 1px solid rgba(33,154,234,0.25);
          backdrop-filter: blur(8px);
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2357A6;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 16px;
        }
        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem;
          line-height: 0.6;
          color: rgba(33, 154, 234, 0.12);
          position: absolute;
          top: -10px;
          left: -8px;
          font-weight: 700;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      <section
        id="about"
        className="about-section w-full py-16 sm:py-20 md:py-24 lg:py-32 section-bg overflow-hidden"
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
              <div className="relative image-frame" style={{ width: '100%', maxWidth: 480 }}>
                {/* Main Image */}
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl z-10"
                  style={{ aspectRatio: '4/5' }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://arkshgroup.com/uploads/about/Rajesh-Kazi-Shrestha-Arksh-Group-1536x1023%20(1).jpg')",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="image-overlay absolute inset-0" />

                  {/* Floating name card */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 z-10"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(15,30,60,0.88) 0%, transparent 100%)',
                    }}
                  >
                    <p
                      className="display-font text-white/90 text-sm tracking-widest uppercase mb-1"
                      style={{ letterSpacing: '0.18em', fontSize: '0.7rem' }}
                    >
                      Chairman & Managing Director
                    </p>
                    <p
                      className="display-font text-white font-semibold"
                      style={{ fontSize: '1.4rem' }}
                    >
                      Dr. Rajesh Kazi Shrestha
                    </p>
                  </div>
                </div>

                {/* Decorative corner dot */}
                <div
                  className="absolute z-20 rounded-full"
                  style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                    bottom: -6,
                    right: -6,
                    boxShadow: '0 0 0 4px white, 0 0 0 6px rgba(33,154,234,0.2)',
                  }}
                />
              </div>
            </motion.div>

            {/* ── Content Column ── */}
            <div className="order-1 md:order-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={0}
                variants={fadeUp}
              >
                <span className="badge">Leadership & Vision</span>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={1}
                variants={fadeUp}
              >
                <h2
                  className="display-font font-bold text-[#0f1e3c] mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
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
                <div className="accent-line mb-7" />
              </motion.div>

              <motion.div
                className="relative mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={2}
                variants={fadeUp}
              >
                <span className="quote-mark">"</span>
                <p
                  className="text-gray-600 leading-relaxed pl-2 text-justify"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.975rem)', lineHeight: 1.85 }}
                >
                  Dr. Rajesh Kazi Shrestha's business journey started four decades ago. Since then
                  he has come a long way. His hard work has been recognized with various medals and
                  appreciation from the Government of Nepal for his outstanding contribution to the
                  business sector.
                </p>
              </motion.div>

              <motion.p
                className="text-gray-600 leading-relaxed mb-8 text-justify"
                style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.975rem)', lineHeight: 1.85 }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={3}
                variants={fadeUp}
              >
                He also received an honorary Doctorate from the International Journal of Non-Aligned
                Countries & Foreign Policy Research Institute (FPRI), and served as a former
                Assistant Minister of the Ministry of Industry, Commerce & Supplies.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                className="grid grid-cols-3 gap-3 mb-8"
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
                  <div key={stat.label} className="stat-card text-center">
                    <p
                      className="display-font font-bold text-[#219AEA] mb-1"
                      style={{ fontSize: '1.5rem' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-gray-500 whitespace-pre-line"
                      style={{ fontSize: '0.68rem', lineHeight: 1.4, letterSpacing: '0.02em' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                custom={5}
                variants={fadeUp}
                className="flex items-center gap-5"
              >
                <Link href="/md-message">
                  <button className="cta-btn">
                    <span>Read Full Message</span>
                  </button>
                </Link>
                <div className="flex items-center gap-2" style={{ color: '#2357A6' }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(33,154,234,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.03em' }}>
                    Chairman's Vision
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
