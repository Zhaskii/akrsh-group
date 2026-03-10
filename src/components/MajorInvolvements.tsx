'use client'

import { businessVerticals } from '@/constant/business.verticals'

export default function MajorInvolvements() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .mi-root { font-family: 'DM Sans', sans-serif; }
        .mi-display { font-family: 'Cormorant Garamond', serif; }

        /* Section background */
        .mi-section {
          background: linear-gradient(170deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }
        .mi-section::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(33,154,234,0.06), transparent 70%);
          pointer-events: none;
        }
        .mi-section::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(35,87,166,0.05), transparent 70%);
          pointer-events: none;
        }

        /* Header */
        .mi-eyebrow {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #219AEA;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .mi-eyebrow::before,
        .mi-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: #219AEA;
          opacity: 0.5;
        }

        /* Grid stagger animation */
        .mi-card-wrapper {
          opacity: 0;
          transform: translateY(28px);
          animation: miCardIn 0.65s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes miCardIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Card */
        .mi-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid rgba(33,154,234,0.1);
          box-shadow: 0 4px 20px rgba(35,87,166,0.06), 0 1px 4px rgba(0,0,0,0.04);
          transition: box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          cursor: pointer;
          height: 280px;
        }
        .mi-card:hover {
          box-shadow: 0 20px 52px rgba(33,154,234,0.16), 0 4px 16px rgba(0,0,0,0.08);
          border-color: rgba(33,154,234,0.28);
          transform: translateY(-6px);
        }

      /* BG image layer */
.mi-card-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.15;          /* ← was 0, now always visible */
  transition: opacity 0.5s ease, transform 0.6s ease;
  transform: scale(1.05);
}
.mi-card:hover .mi-card-bg {
  opacity: 0.25;          /* ← was 0.12, slightly more on hover */
  transform: scale(1);
}

        /* Gradient overlay on hover */
        .mi-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(145deg, rgba(33,154,234,0.04) 0%, rgba(35,87,166,0.06) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 20px;
        }
        .mi-card:hover .mi-card-overlay { opacity: 1; }

        /* Top accent bar */
        .mi-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          border-radius: 20px 20px 0 0;
        }
        .mi-card:hover .mi-card-accent { transform: scaleX(1); }

        /* Card number watermark */
        .mi-card-num {
          position: absolute;
          bottom: 16px; right: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem;
          font-weight: 700;
          color: rgba(33,154,234,0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s;
        }
        .mi-card:hover .mi-card-num { color: rgba(33,154,234,0.08); }

        /* Icon */
        .mi-icon-wrap {
          width: 50px; height: 50px;
          border-radius: 14px;
          background: linear-gradient(135deg, #eef7fe, #ddf0fd);
          border: 1px solid rgba(33,154,234,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
          flex-shrink: 0;
        }
        .mi-card:hover .mi-icon-wrap {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          border-color: transparent;
          box-shadow: 0 6px 20px rgba(33,154,234,0.35);
          transform: rotate(-6deg) scale(1.1);
        }
        .mi-icon {
          width: 22px; height: 22px;
          color: #219AEA;
          transition: color 0.3s ease;
          flex-shrink: 0;
        }
        .mi-card:hover .mi-icon { color: #ffffff; }

        /* Title underline */
        .mi-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.28rem;
          font-weight: 700;
          color: #0f1e3c;
          margin-bottom: 4px;
          line-height: 1.2;
          position: relative;
          display: inline-block;
        }
        .mi-card-title::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        .mi-card:hover .mi-card-title::after { width: 100%; }

        /* Arrow indicator */
        .mi-arrow {
          position: absolute;
          bottom: 22px; right: 22px;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(33,154,234,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #219AEA;
          opacity: 0;
          transform: translate(4px, 4px) scale(0.8);
          transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .mi-card:hover .mi-arrow {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* Section divider */
        .mi-ornament {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          margin-bottom: 20px;
        }
        .mi-orn-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.4));
        }
        .mi-orn-line.r {
          background: linear-gradient(90deg, rgba(33,154,234,0.4), transparent);
        }
        .mi-orn-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
          opacity: 0.6;
        }
      `}</style>

      <section className="mi-root mi-section py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <div className="mi-eyebrow">
              <span>Arksh Group</span>
            </div>

            <h2
              className="mi-display font-bold text-[#0f1e3c] mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}
            >
              Major{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Involvements
              </span>
            </h2>

            <div className="mi-ornament">
              <div className="mi-orn-line" />
              <div className="mi-orn-diamond" />
              <div className="mi-orn-line r" />
            </div>

            <p
              className="text-[#2357A6] font-medium"
              style={{ fontSize: '0.88rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Our Business Verticals
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessVerticals.map((item, index) => {
              const Icon = item.icon
              const bgSrc = item.bgImage
                ? typeof item.bgImage === 'string'
                  ? item.bgImage
                  : item.bgImage.src
                : null

              return (
                <div
                  key={index}
                  className="mi-card-wrapper"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="mi-card">
                    {/* Top accent bar */}
                    <div className="mi-card-accent" />

                    {/* BG image */}
                    {bgSrc && (
                      <div className="mi-card-bg" style={{ backgroundImage: `url(${bgSrc})` }} />
                    )}

                    {/* Gradient overlay */}
                    <div className="mi-card-overlay" />

                    {/* Ghost number */}
                    <div className="mi-card-num">{String(index + 1).padStart(2, '0')}</div>

                    {/* Content */}
                    <div className="relative z-10 p-7 flex flex-col justify-center h-full">
                      {/* Icon */}
                      <div className="mi-icon-wrap">
                        <Icon className="mi-icon" />
                      </div>

                      {/* Title */}
                      <h3 className="mi-card-title">{item.title}</h3>

                      {/* Thin spacer */}
                      <div
                        style={{
                          width: 28,
                          height: 1.5,
                          background: 'linear-gradient(90deg, #219AEA, transparent)',
                          borderRadius: 2,
                          margin: '8px 0 10px',
                          transition: 'width 0.4s',
                        }}
                      />

                      {/* Description */}
                      <p
                        className="text-gray-500 leading-relaxed"
                        style={{ fontSize: '0.82rem', lineHeight: 1.75, maxWidth: '90%' }}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="mi-arrow">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
