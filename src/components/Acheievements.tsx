'use client'

import { achievements } from '@/constant/achievements'

export default function Achievements() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ach-root { font-family: 'DM Sans', sans-serif; }
        .ach-display { font-family: 'Cormorant Garamond', serif; }

        .ach-section {
          background: linear-gradient(160deg, #f8fbff 0%, #f0f6fe 50%, #eaf3fd 100%);
          position: relative;
          overflow: hidden;
        }

        /* Ambient blobs */
        .ach-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        /* Eyebrow */
        .ach-eyebrow {
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
        .ach-eyebrow::before, .ach-eyebrow::after {
          content: '';
          width: 28px; height: 1px;
          background: #219AEA;
          opacity: 0.5;
        }

        /* Ornament */
        .ach-ornament {
          display: flex; align-items: center; gap: 12px; justify-content: center;
          margin: 10px 0 16px;
        }
        .ach-orn-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(33,154,234,0.45));
        }
        .ach-orn-line.r {
          background: linear-gradient(90deg, rgba(33,154,234,0.45), transparent);
        }
        .ach-orn-diamond {
          width: 5px; height: 5px;
          background: #219AEA;
          transform: rotate(45deg);
          border-radius: 1px;
          opacity: 0.6;
        }

        /* Card */
        .ach-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(33,154,234,0.1);
          box-shadow: 0 4px 24px rgba(35,87,166,0.07), 0 1px 4px rgba(0,0,0,0.04);
          padding: 40px 28px 36px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
          cursor: default;
        }
        .ach-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(33,154,234,0.15), 0 4px 16px rgba(0,0,0,0.07);
          border-color: rgba(33,154,234,0.28);
        }

        /* Top accent bar */
        .ach-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #219AEA, #2357A6);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94);
          border-radius: 24px 24px 0 0;
        }
        .ach-card:hover .ach-card-accent { transform: scaleX(1); }

        /* Ghost number watermark */
        .ach-card-watermark {
          position: absolute;
          bottom: -8px; right: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 6.5rem;
          font-weight: 900;
          color: rgba(33,154,234,0.045);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.4s;
        }
        .ach-card:hover .ach-card-watermark { color: rgba(33,154,234,0.08); }

        /* Icon wrap */
        .ach-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg, #eef7fe, #daeffe);
          border: 1px solid rgba(33,154,234,0.18);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 22px;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
          position: relative;
          z-index: 1;
        }
        .ach-card:hover .ach-icon-wrap {
          background: linear-gradient(135deg, #219AEA, #2357A6);
          border-color: transparent;
          box-shadow: 0 8px 28px rgba(33,154,234,0.38);
          transform: rotate(-6deg) scale(1.1);
        }
        .ach-icon {
          width: 30px; height: 30px;
          color: #219AEA;
          transition: color 0.3s ease;
        }
        .ach-card:hover .ach-icon { color: #ffffff; }

        /* Number */
        .ach-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 6px;
          background: linear-gradient(135deg, #219AEA, #2357A6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative; z-index: 1;
          transition: all 0.3s ease;
        }

        /* Divider */
        .ach-card-divider {
          width: 28px; height: 1.5px;
          background: linear-gradient(90deg, #219AEA, transparent);
          border-radius: 2px;
          margin: 10px auto 12px;
          transition: width 0.4s ease;
        }
        .ach-card:hover .ach-card-divider { width: 48px; }

        /* Label */
        .ach-label {
          font-size: 0.96rem;
          font-weight: 600;
          color: #0f1e3c;
          margin-bottom: 5px;
          position: relative; z-index: 1;
          transition: color 0.3s;
        }
        .ach-card:hover .ach-label { color: #2357A6; }

        /* Sub-label */
        .ach-sublabel {
          font-size: 0.68rem;
          font-weight: 500;
          color: rgba(33,154,234,0.55);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          position: relative; z-index: 1;
        }

        /* Card entrance animation */
        .ach-card-wrapper {
          opacity: 0;
          transform: translateY(24px);
          animation: achCardIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes achCardIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="ach-root ach-section py-20 sm:py-24">
        {/* Ambient blobs */}
        <div
          className="ach-blob"
          style={{
            top: '-80px',
            right: '-80px',
            width: 400,
            height: 400,
            background: 'rgba(33,154,234,0.07)',
          }}
        />
        <div
          className="ach-blob"
          style={{
            bottom: '-80px',
            left: '-80px',
            width: 420,
            height: 420,
            background: 'rgba(35,87,166,0.06)',
          }}
        />
        <div
          className="ach-blob"
          style={{
            top: '40%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 600,
            height: 300,
            background: 'rgba(96,184,240,0.04)',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <div className="ach-eyebrow">Arksh Group</div>

            <h2
              className="ach-display font-bold text-[#0f1e3c] leading-tight mb-0"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
            >
              Our{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #219AEA, #2357A6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Achievements
              </span>
            </h2>

            <div className="ach-ornament">
              <div className="ach-orn-line" />
              <div className="ach-orn-diamond" />
              <div className="ach-orn-line r" />
            </div>

            <p
              className="text-[#2357A6] font-medium"
              style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Milestones That Define Us
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="ach-card-wrapper"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="ach-card">
                    {/* Top accent bar */}
                    <div className="ach-card-accent" />

                    {/* Ghost watermark */}
                    <div className="ach-card-watermark">{String(index + 1).padStart(2, '0')}</div>

                    {/* Icon */}
                    <div className="ach-icon-wrap">
                      <Icon className="ach-icon" />
                    </div>

                    {/* Number */}
                    <div className="ach-number">{item.number}</div>

                    {/* Divider */}
                    <div className="ach-card-divider" />

                    {/* Label */}
                    <p className="ach-label">{item.label}</p>

                    {/* Sub-label */}
                    <p className="ach-sublabel">{item.subLabel}</p>
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
