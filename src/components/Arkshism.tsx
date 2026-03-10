'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

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
        width="26"
        height="26"
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
        width="26"
        height="26"
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
        width="26"
        height="26"
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

        .arkshism-root {
          font-family: 'Jost', sans-serif;
        }
        .display-font { font-family: 'Playfair Display', serif; }

        /* ── Starfield background ── */
        .arkshism-bg {
      background: linear-gradient(150deg, #1e3a5f 0%, #22426b 40%, #254876 70%, #1a3258 100%);
          position: relative;
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--dur, 3s) ease-in-out infinite var(--delay, 0s);
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--min-op, 0.15); transform: scale(1); }
          50% { opacity: var(--max-op, 0.7); transform: scale(1.3); }
        }

        /* Nebula blobs */
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* ── Hero card ── */
        .hero-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
        }
        .hero-card::before {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 60%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.6), transparent);
        }
        .hero-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(33,154,234,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Logo glow */
        .logo-ring {
          width: 88px; height: 88px;
          border-radius: 50%;
          border: 1px solid rgba(33,154,234,0.3);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .logo-ring::before {
          content: '';
          position: absolute; inset: -5px;
          border-radius: 50%;
          border: 1px solid rgba(33,154,234,0.12);
        }
        .logo-ring::after {
          content: '';
          position: absolute; inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(33,154,234,0.06);
        }
        .logo-glow {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.15), transparent 70%);
        }

        /* Title decoration */
        .title-word-stars {
          background: linear-gradient(135deg, #60b8f0, #219AEA, #93d0f8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Divider */
        .ornament-divider {
          display: flex; align-items: center; gap: 12px; justify-content: center;
        }
        .ornament-line {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.5));
        }
        .ornament-line.right {
          background: linear-gradient(90deg, rgba(33,154,234,0.5), transparent);
        }
        .ornament-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
        }

        /* ── Pillar cards ── */
        .pillar-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background: linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(16px);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .pillar-card:hover {
          border-color: rgba(33,154,234,0.35);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(33,154,234,0.08);
        }
        .pillar-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.5), transparent);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .pillar-card:hover::before { opacity: 1; }

        .pillar-number {
          position: absolute;
          top: 20px; right: 22px;
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 900;
          color: rgba(33,154,234,0.06);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.35s;
        }
        .pillar-card:hover .pillar-number { color: rgba(33,154,234,0.1); }

        .pillar-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(33,154,234,0.2), rgba(35,87,166,0.15));
          border: 1px solid rgba(33,154,234,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #60b8f0;
          transition: all 0.35s;
        }
        .pillar-card:hover .pillar-icon-wrap {
          background: linear-gradient(135deg, rgba(33,154,234,0.3), rgba(35,87,166,0.25));
          border-color: rgba(33,154,234,0.4);
          box-shadow: 0 0 20px rgba(33,154,234,0.15);
        }

        .pillar-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #219AEA;
          margin-bottom: 6px;
        }
        .pillar-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
          line-height: 1.25;
          margin-bottom: 4px;
        }
        .pillar-subtitle {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .pillar-divider {
          width: 32px; height: 1.5px;
          background: linear-gradient(90deg, #219AEA, transparent);
          border-radius: 2px;
          margin-bottom: 14px;
          transition: width 0.35s ease;
        }
        .pillar-card:hover .pillar-divider { width: 56px; }
        .pillar-body {
          font-size: 0.84rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
        }

        /* ── CTA button ── */
        .cta-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 36px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: white;
          overflow: hidden;
          transition: all 0.35s ease;
          cursor: pointer;
          border: 1px solid rgba(33,154,234,0.4);
          background: linear-gradient(135deg, rgba(33,154,234,0.15), rgba(35,87,166,0.1));
          backdrop-filter: blur(10px);
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #219AEA, #2357A6);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:hover {
          border-color: transparent;
          box-shadow: 0 0 40px rgba(33,154,234,0.35), 0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .cta-btn span, .cta-btn svg { position: relative; z-index: 1; }
        .cta-btn svg { transition: transform 0.3s ease; }
        .cta-btn:hover svg { transform: translateX(4px); }
      `}</style>

      <section className="arkshism-root arkshism-bg relative overflow-hidden py-24 px-4 sm:px-6">
        {/* ── Starfield ── */}
        {[
          { top: '8%', left: '12%', size: 1.5, dur: '4s', delay: '0s', minOp: 0.2, maxOp: 0.8 },
          { top: '15%', left: '78%', size: 1, dur: '3s', delay: '1s', minOp: 0.1, maxOp: 0.6 },
          { top: '25%', left: '55%', size: 2, dur: '5s', delay: '0.5s', minOp: 0.15, maxOp: 0.7 },
          { top: '40%', left: '6%', size: 1.5, dur: '3.5s', delay: '2s', minOp: 0.1, maxOp: 0.5 },
          { top: '60%', left: '88%', size: 1, dur: '4.5s', delay: '1.5s', minOp: 0.2, maxOp: 0.65 },
          { top: '72%', left: '22%', size: 2.5, dur: '6s', delay: '0.8s', minOp: 0.1, maxOp: 0.55 },
          { top: '85%', left: '65%', size: 1, dur: '3s', delay: '3s', minOp: 0.15, maxOp: 0.7 },
          { top: '5%', left: '40%', size: 1.5, dur: '4s', delay: '0.3s', minOp: 0.1, maxOp: 0.5 },
          { top: '50%', left: '48%', size: 1, dur: '5s', delay: '2.5s', minOp: 0.1, maxOp: 0.4 },
          { top: '90%', left: '10%', size: 2, dur: '4s', delay: '1.2s', minOp: 0.15, maxOp: 0.6 },
        ].map((s, i) => (
          <div
            key={i}
            className="star"
            style={
              {
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                '--dur': s.dur,
                '--delay': s.delay,
                '--min-op': s.minOp,
                '--max-op': s.maxOp,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Nebula glows */}
        <div
          className="nebula"
          style={{
            top: '-10%',
            right: '-8%',
            width: 500,
            height: 500,
            background: 'rgba(33,154,234,0.07)',
          }}
        />
        <div
          className="nebula"
          style={{
            bottom: '-15%',
            left: '-10%',
            width: 600,
            height: 600,
            background: 'rgba(35,87,166,0.08)',
          }}
        />
        <div
          className="nebula"
          style={{
            top: '40%',
            left: '40%',
            width: 400,
            height: 300,
            background: 'rgba(96,184,240,0.04)',
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* ── Hero Card ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="hero-card p-10 sm:p-14 text-center mb-16"
          >
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <div className="logo-ring">
                <div className="logo-glow" />
                <img
                  src="https://www.arkshgroup.com/arksh-round.png"
                  alt="Arksh Logo"
                  className="h-14 w-14 object-contain relative z-10"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(33,154,234,0.4))' }}
                />
              </div>
            </div>

            {/* Label */}
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#219AEA',
                marginBottom: 14,
              }}
            >
              The Guiding Philosophy
            </p>

            {/* Title */}
            <h2
              className="display-font font-black text-white mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 1.05 }}
            >
              Ark<span className="title-word-stars">sh</span>ism
            </h2>

            {/* Ornament */}
            <div className="ornament-divider mb-7">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>

            {/* Description */}
            <p
              className="text-white/50 max-w-xl mx-auto leading-relaxed"
              style={{ fontSize: '0.94rem', lineHeight: 1.9 }}
            >
              The guiding philosophy behind this identity and visual representation of the logo is
              known as <em className="text-white/70 not-italic font-medium">Arkshism</em> — a
              concept rooted in celestial aspiration, stellar excellence, and interconnected
              purpose.
            </p>
          </motion.div>

          {/* ── 3 Pillar Cards ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
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

                {/* Label */}
                <p className="pillar-label">{pillar.label}</p>

                {/* Title */}
                <h3 className="pillar-title">{pillar.title}</h3>

                {/* Subtitle */}
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
            className="flex justify-center mt-16"
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
          </motion.div>
        </div>
      </section>
    </>
  )
}
