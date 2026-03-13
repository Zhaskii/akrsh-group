'use client'
import Link from 'next/link'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-linear-to-br from-[#0f2557] via-[#1a3a6e] to-[#1e4ca1] text-white pt-16 pb-6 font-sans w-full overflow-x-clip relative">
      {/* Top wave */}
      <div
        className="absolute top-0 left-0 w-full h-8 pointer-events-none overflow-hidden"
        style={{
          background: '#f0f6ff',
          clipPath: 'ellipse(50% 100% at 50% 0%)', // Changed 55% to 50% to prevent edge-bleeding
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-4">
        {/* Column 1: About & Contact */}
        <div>
          {/* Section label */}
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
            Who We Are
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">About Us</h3>
          <div className="w-8 h-0.5 bg-linear-to-r from-white/60 to-transparent rounded-full mb-4" />
          <p className="text-sm leading-relaxed mb-8 text-white/70">
            Arksh is an International Trading, Manufacturing, Hospitality &amp; Services Group
            established in 1978 AD.
          </p>

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
            Reach Out
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">Contact Us</h3>
          <div className="w-8 h-0.5 bg-linear-to-r from-white/60 to-transparent rounded-full mb-5" />

          <div className="space-y-4">
            {[
              {
                icon: (
                  <MapPinIcon className="w-4 h-4 text-white group-hover:text-[#2257A6] transition-colors duration-300" />
                ),
                content: (
                  <>
                    152 Rani Devi Marg Lazimpat,
                    <br />
                    Kathmandu, Nepal.
                  </>
                ),
              },
              {
                icon: (
                  <PhoneIcon className="w-4 h-4 text-white group-hover:text-[#2257A6] transition-colors duration-300" />
                ),
                content: '+977-1-4002049 / +977 980-2074449',
              },
              {
                icon: (
                  <EnvelopeIcon className="w-4 h-4 text-white group-hover:text-[#2257A6] transition-colors duration-300" />
                ),
                content: 'info@arkshgroup.com',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-white/15 group-hover:bg-white p-2 rounded-xl mt-0.5 shrink-0 transition-all duration-300 border border-white/10 group-hover:border-white">
                  {item.icon}
                </div>
                <span className="text-sm text-white/75 group-hover:text-white transition-colors duration-200 leading-relaxed">
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
            Navigation
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">Quick Links</h3>
          <div className="w-8 h-0.5 bg-linear-to-r from-white/60 to-transparent rounded-full mb-6" />
          <ul className="space-y-2">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Arkshism', path: '/arkshism' },
              { name: 'News', path: '/news' },
              { name: 'Gallery', path: '/gallery' },
              { name: 'Careers', path: '/career' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="group flex items-center gap-2.5 py-1.5 px-3 rounded-xl hover:bg-white/10 transition-all duration-200 w-fit"
                >
                  <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white group-hover:scale-125 transition-all duration-200 shrink-0" />
                  <span className="text-[14px] text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div className="w-full overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
            Stay Connected
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">Follow Us</h3>
          <div className="w-8 h-0.5 bg-linear-to-r from-white/60 to-transparent rounded-full mb-6" />
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)] w-full h-75 border border-white/10">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FArksh.Group%2F&tabs=timeline&width=340&height=300&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="100%"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
            />
          </div>
        </div>

        {/* Column 4: Locate Us */}
        <div className="w-full overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
            Find Us
          </p>
          <h3 className="text-xl font-bold mb-3 text-white">Locate Us</h3>
          <div className="w-8 h-0.5 bg-linear-to-r from-white/60 to-transparent rounded-full mb-6" />
          <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.25)] w-full h-75 border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.7063399626504!2d85.31907747568266!3d27.7263518246527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1918569c8961%3A0x5f43dd27a908ad94!2sArksh%20Group!5e0!3m2!1sen!2snp!4v1773384215008!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-white/10 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/40 tracking-wide">
            © {currentYear} <span className="text-white/70 font-semibold">ARKSH GROUP</span>. All
            Rights Reserved.
          </p>
          <div className="flex gap-1">
            {['Terms', 'Privacy', 'Support'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-white/40 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
