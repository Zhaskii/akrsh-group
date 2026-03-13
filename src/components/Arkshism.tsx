'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import arkshLogo from '@/assets/logo/logo.jpg'
import Starfield from '@/components/StarField' // Ensure this path matches your file structure

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const PILLARS = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: 'Origin',
    title: 'Of The Stars',
    subtitle: 'Sanskrit Meaning',
    body: 'The name "ARKSH" is of Sanskrit origin and means "Of The Stars" or "Celestial," representing the group\'s perpetual aspiration for stellar excellence and limitless achievement.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    label: 'Identity',
    title: 'A Legacy in Letters',
    subtitle: 'Brand DNA',
    body: 'The pronunciation aligns with the initials of our leadership, forming a meaningful and deeply connected brand identity that echoes through every venture we undertake.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    label: 'Philosophy',
    title: 'Interconnected Vision',
    subtitle: 'Unified Purpose',
    body: "The logo, slogan, and name are intricately interconnected — each element reinforcing the group's devotion to achieving the highest goals and inspiring everyone it touches.",
  },
]

export default function Arkshism() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Jost:wght@300;400;500;600&display=swap');

        .arkshism-root { font-family: 'Jost', sans-serif; }
        .display-font  { font-family: 'Playfair Display', serif; }

        /* ── Deep space background ── */
        .arkshism-bg {
          background: radial-gradient(ellipse at 20% 20%, #1e3f6e 0%, #152d52 35%, #0d1e38 70%, #080f1e 100%);
        }

        /* Nebula */
        .nebula { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }

        /* ── Hero card ── */
        .hero-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(24px);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 50%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.7), transparent);
        }
        .hero-card::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(33,154,234,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Floating badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 16px 5px 5px;
          border-radius: 100px;
          background: rgba(33,154,234,0.1);
          border: 1px solid rgba(33,154,234,0.22);
          margin-bottom: 20px;
        }
        .hero-badge-dot {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(33,154,234,0.25), rgba(35,87,166,0.2));
          border: 1px solid rgba(33,154,234,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .hero-badge-dot span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #219AEA;
          animation: pulse-glow 2.2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(33,154,234,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(33,154,234,0); }
        }

        /* Logo ring */
        .logo-ring {
          width: 96px; height: 96px; border-radius: 50%;
          border: 1px solid rgba(33,154,234,0.28);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .logo-ring::before {
          content: ''; position: absolute; inset: -6px;
          border-radius: 50%; border: 1px solid rgba(33,154,234,0.1);
        }
        .logo-ring::after {
          content: ''; position: absolute; inset: -13px;
          border-radius: 50%; border: 1px solid rgba(33,154,234,0.05);
        }
        .logo-glow {
          position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.18), transparent 70%);
        }

        /* Title gradient */
        .title-gradient {
          background: linear-gradient(135deg, #7ec8f5 0%, #219AEA 50%, #a8d8f8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Ornament */
        .ornament-divider { display: flex; align-items: center; gap: 14px; justify-content: center; }
        .ornament-line { height: 1px; width: 44px; background: linear-gradient(90deg, transparent, rgba(33,154,234,0.45)); }
        .ornament-line.right { background: linear-gradient(90deg, rgba(33,154,234,0.45), transparent); }
        .ornament-diamond { width: 5px; height: 5px; background: #219AEA; transform: rotate(45deg); border-radius: 1px;
          box-shadow: 0 0 8px rgba(33,154,234,0.6); }

        /* ── Pillar cards ── */
        .pillar-card {
          position: relative; border-radius: 22px; overflow: hidden; cursor: pointer;
          background: linear-gradient(150deg, rgba(255,255,255,0.058) 0%, rgba(255,255,255,0.018) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(18px);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .pillar-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.55), transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        .pillar-card:hover { border-color: rgba(33,154,234,0.3); box-shadow: 0 28px 64px rgba(0,0,0,0.45), 0 0 48px rgba(33,154,234,0.07); }
        .pillar-card:hover::before { opacity: 1; }

        /* Corner accent on hover */
        .pillar-card::after {
          content: '';
          position: absolute; bottom: 0; right: 0;
          width: 80px; height: 80px;
          background: radial-gradient(circle at bottom right, rgba(33,154,234,0.08), transparent 70%);
          opacity: 0; transition: opacity 0.4s;
        }
        .pillar-card:hover::after { opacity: 1; }

        .pillar-number {
          position: absolute; top: 18px; right: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 5rem; font-weight: 900;
          color: rgba(33,154,234,0.05); line-height: 1;
          pointer-events: none; user-select: none;
          transition: color 0.35s, transform 0.35s;
        }
        .pillar-card:hover .pillar-number { color: rgba(33,154,234,0.09); transform: scale(1.06) translateY(-4px); }

        .pillar-icon-wrap {
          width: 54px; height: 54px; border-radius: 16px;
          background: linear-gradient(135deg, rgba(33,154,234,0.18), rgba(35,87,166,0.12));
          border: 1px solid rgba(33,154,234,0.18);
          display: flex; align-items: center; justify-content: center;
          color: #7ec8f5;
          transition: all 0.35s;
          box-shadow: 0 4px 16px rgba(33,154,234,0.08);
        }
        .pillar-card:hover .pillar-icon-wrap {
          background: linear-gradient(135deg, rgba(33,154,234,0.28), rgba(35,87,166,0.22));
          border-color: rgba(33,154,234,0.38);
          box-shadow: 0 0 24px rgba(33,154,234,0.2);
          transform: scale(1.05);
        }

        .pillar-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #219AEA; margin-bottom: 6px;
        }
        .pillar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700;
          color: rgba(255,255,255,0.93); line-height: 1.22; margin-bottom: 4px;
        }
        .pillar-subtitle {
          font-size: 0.67rem; color: rgba(255,255,255,0.28);
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px;
        }
        .pillar-divider {
          width: 30px; height: 1.5px;
          background: linear-gradient(90deg, #219AEA, transparent);
          border-radius: 2px; margin-bottom: 14px;
          transition: width 0.4s ease;
        }
        .pillar-card:hover .pillar-divider { width: 52px; }

        .pillar-body {
          font-size: 0.83rem; color: rgba(255,255,255,0.42); line-height: 1.82;
          transition: color 0.3s;
        }
        .pillar-card:hover .pillar-body { color: rgba(255,255,255,0.52); }

        /* ── CTA button ── */
        .cta-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 38px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 0.76rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: white; overflow: hidden; cursor: pointer;
          border: 1px solid rgba(33,154,234,0.35);
          background: linear-gradient(135deg, rgba(33,154,234,0.12), rgba(35,87,166,0.08));
          backdrop-filter: blur(12px);
          transition: all 0.35s ease;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #219AEA, #2357A6);
          opacity: 0; transition: opacity 0.35s;
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:hover {
          border-color: transparent;
          box-shadow: 0 0 48px rgba(33,154,234,0.35), 0 10px 36px rgba(0,0,0,0.35);
          transform: translateY(-2px);
        }
        .cta-btn span, .cta-btn svg { position: relative; z-index: 1; }
        .cta-btn svg { transition: transform 0.3s ease; }
        .cta-btn:hover svg { transform: translateX(4px); }

        /* Separator line */
        .section-sep {
          width: 1px; height: 56px;
          background: linear-gradient(to bottom, transparent, rgba(33,154,234,0.4), transparent);
          margin: 0 auto;
        }
      `}</style>

      <section className="arkshism-root arkshism-bg relative overflow-hidden py-28 px-4 sm:px-6">
        {/* ── High Performance Starfield ── */}
        <Starfield />

        {/* ── Nebula glows ── */}
        <div
          className="nebula"
          style={{
            top: '-12%',
            right: '-6%',
            width: 560,
            height: 560,
            background: 'rgba(33,154,234,0.065)',
          }}
        />
        <div
          className="nebula"
          style={{
            bottom: '-18%',
            left: '-8%',
            width: 640,
            height: 640,
            background: 'rgba(35,87,166,0.075)',
          }}
        />
        <div
          className="nebula"
          style={{
            top: '35%',
            left: '38%',
            width: 420,
            height: 320,
            background: 'rgba(96,184,240,0.035)',
          }}
        />
        <div
          className="nebula"
          style={{
            top: '60%',
            right: '15%',
            width: 300,
            height: 300,
            background: 'rgba(33,154,234,0.04)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* ── Hero Card ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="hero-card px-8 py-14 sm:px-14 sm:py-16 text-center mb-6"
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="logo-ring">
                <div className="logo-glow" />
                <Image
                  src={arkshLogo}
                  alt="Arksh Logo"
                  fill
                  className="h-14 w-14 object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 14px rgba(33,154,234,0.5))' }}
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="flex justify-center mb-6">
              <div className="hero-badge">
                <div className="hero-badge-dot">
                  <span />
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#219AEA',
                  }}
                >
                  The Guiding Philosophy
                </span>
              </div>
            </div>

            {/* Title */}
            <h2
              className="display-font font-black text-white mb-2"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.01em',
              }}
            >
              Ark<span className="title-gradient">sh</span>ism
            </h2>

            {/* Ornament */}
            <div className="ornament-divider mt-5 mb-7">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>

            {/* Description */}
            <p
              className="text-white/45 max-w-lg mx-auto"
              style={{ fontSize: '0.93rem', lineHeight: 1.92 }}
            >
              The guiding philosophy behind this identity and visual representation of the logo is
              known as <em className="text-white/75 not-italic font-semibold">Arkshism</em> — a
              concept rooted in celestial aspiration, stellar excellence, and interconnected
              purpose.
            </p>
          </motion.div>

          {/* Vertical separator */}
          <div className="section-sep mb-6" />

          {/* ── 3 Pillar Cards ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="pillar-card p-7 sm:p-8"
              >
                {/* Ghost number */}
                <div className="pillar-number">{String(i + 1).padStart(2, '0')}</div>

                {/* Icon */}
                <div className="pillar-icon-wrap mb-6">{pillar.icon}</div>

                {/* Meta */}
                <p className="pillar-label">{pillar.label}</p>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-subtitle">{pillar.subtitle}</p>

                {/* Divider */}
                <div className="pillar-divider" />

                {/* Body */}
                <p className="pillar-body">{pillar.body}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center mt-14 gap-5"
          >
            <Link href="/arkshism">
              <button className="cta-btn">
                <span>Explore Arkshism</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>

            {/* Sub-text */}
            <p
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Celestial aspiration · Stellar excellence
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
