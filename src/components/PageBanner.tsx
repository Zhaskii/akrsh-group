import Link from 'next/link'
import { ReactNode, CSSProperties } from 'react'

interface BreadcrumbItem {
  name: string
  href?: string
  icon?: ReactNode
}

interface PageBannerProps {
  title: string
  breadcrumb?: BreadcrumbItem[]
  bgColor?: string
  textColor?: string
  padding?: string
  width?: string
  textAlign?: 'left' | 'center' | 'right'
  style?: CSSProperties
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  breadcrumb = [],
  bgColor = '#1D8AD2',
  textColor = '#ffffff',
  padding = 'py-8',
  width = 'w-full',
  textAlign = 'center',
  style = {},
}) => {
  return (
    <section
      className={`${width} relative overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-14 text-center md:text-${textAlign}`}
      style={{ backgroundColor: bgColor, color: textColor, ...style }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: textColor, transform: 'translate(30%, -40%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: textColor, transform: 'translate(-30%, 40%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: textColor, transform: 'translate(-50%, -50%)' }}
      />

      {/* Wave bottom clip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: '#f0f6ff',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pb-3">
        {/* Label above title */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] font-bold uppercase tracking-[0.25em] border"
          style={{
            background: 'rgba(255,255,255,0.12)',
            borderColor: 'rgba(255,255,255,0.25)',
            color: textColor,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: textColor, opacity: 0.8 }}
          />
          Arksh Group
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold mb-5 tracking-tight leading-tight"
          style={{ color: textColor }}
        >
          {title}
        </h1>

        {/* Underline accent */}
        <div
          className="mx-auto mb-6 h-0.75 w-16 rounded-full opacity-50"
          style={{
            background: textColor,
            marginLeft: textAlign === 'center' ? 'auto' : textAlign === 'left' ? '0' : 'auto',
            marginRight: textAlign === 'center' ? 'auto' : textAlign === 'right' ? '0' : 'auto',
          }}
        />

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold"
            style={{ color: textColor, opacity: 0.85 }}
          >
            {breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {item.icon && <span className="w-4 h-4 opacity-80">{item.icon}</span>}

                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:opacity-100 transition-opacity duration-200"
                    style={{ color: textColor, opacity: 0.8 }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span style={{ opacity: index === 0 ? 1 : 0.95 }}>{item.name}</span>
                )}

                {index < breadcrumb.length - 1 && (
                  <span style={{ opacity: 0.4 }} className="text-xs select-none">
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageBanner
