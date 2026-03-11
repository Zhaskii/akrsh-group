'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  EnvelopeIcon,
  PhoneIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid'
import logo from '@/assets/logo/logo.jpg'
import { involvements } from '@/constant/involvements.header'
import { menuItems, socialLinks } from '@/constant/header.data'
import type { IconType } from 'react-icons'

interface UnifiedDropdownItem {
  name: string
  href?: string
  subBrands?: { name: string; href: string }[]
  nestedItems?: { name: string; href: string }[]
}

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
  const [mobileNestedExpanded, setMobileNestedExpanded] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide header if mobile menu is open
      if (isOpen) return

      const currentScroll = window.scrollY

      // 1. Styling threshold (background blur/shadow)
      setIsScrolled(currentScroll > 50)

      // 2. Logic to Show/Hide based on direction
      if (currentScroll <= 10) {
        // At the very top
        setIsVisible(true)
      } else if (currentScroll > lastScroll && currentScroll > 150) {
        // Scrolling Down - Hide
        setIsVisible(false)
      } else if (currentScroll < lastScroll) {
        // Scrolling Up - Show
        setIsVisible(true)
      }

      setLastScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll, isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const toggleMobileItem = (label: string) => {
    setMobileExpandedItem(mobileExpandedItem === label ? null : label)
    setMobileNestedExpanded(null)
  }

  const toggleMobileNested = (label: string) => {
    setMobileNestedExpanded(mobileNestedExpanded === label ? null : label)
  }

  return (
    <>
      {/* Spacer to prevent content from jumping under the fixed header - Fixed height and background to match mobile header */}
      <div className="h-26.25 md:h-37.5 w-full bg-white" />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out bg-white/35 shadow-sm ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* TOP BAR */}
        <div className="hidden md:flex bg-linear-to-r from-[#1a3a6e] via-[#2257A6] to-[#2a6bc4] text-white py-2.5 px-4 md:px-12 flex-col md:flex-row justify-between items-center gap-4 relative overflow-visible max-w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-[12px] font-medium">
            <a
              href="mailto:info@arkshgroup.com"
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="bg-white/15 p-1 rounded-md">
                <EnvelopeIcon className="w-3 h-3 text-white" />
              </div>
              <span>info@arkshgroup.com</span>
            </a>
            <span className="hidden md:block w-px h-3.5 bg-white/25" />
            <a
              href="tel:+9779802074449"
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="bg-white/15 p-1 rounded-md">
                <PhoneIcon className="w-3 h-3 text-white" />
              </div>
              <span>+977 980-2074449 / +977-1-4002049</span>
            </a>
          </div>

          {/* SOCIAL DROPDOWN */}
          <div className="flex gap-2 items-center">
            <span className="text-[10px] text-white/40 mr-1 font-semibold uppercase tracking-widest">
              Follow
            </span>
            {socialLinks.map((social, i) => {
              const Icon: IconType = social.icon
              const hasBrands = social.brands && social.brands.length > 0

              return (
                <div key={i} className="relative group">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white hover:text-[#209AEA] p-1 rounded-lg w-7 h-7 flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-white"
                  >
                    <Icon className="w-4 h-4" />
                  </a>

                  {hasBrands && (
                    <div className="absolute top-full right-0 mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-60">
                      <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100 relative translate-x-1/4 md:translate-x-0">
                        <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#3498db] mb-3">
                          Our Brands
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {social.brands?.map((brand, index) => (
                            <a
                              key={index}
                              href={brand.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center p-1.5 rounded-xl border border-gray-50 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white"
                            >
                              <div className="relative w-16 h-16">
                                <Image
                                  src={brand.logo}
                                  alt={brand.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* NAVBAR */}
        <nav
          className={`max-w-8xl mx-auto px-6 md:px-12 py-3 flex justify-between items-center transition-all duration-300 ${
            isScrolled
              ? 'bg-white/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(52,152,219,0.10)] border-b border-blue-50/60'
              : 'bg-white/80 backdrop-blur-sm border-b border-gray-100/80'
          }`}
        >
          <Link href="/" className="relative h-20 w-20 block">
            <Image src={logo} alt="Arksh Group Logo" fill className="object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {menuItems.map((item) => {
              const isInvolvement = item.label === 'Involvements'
              const dropdownItems: UnifiedDropdownItem[] = isInvolvement
                ? involvements
                : item.subMenu || []

              const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)

              return (
                <div
                  key={item.label}
                  className="relative group py-4"
                  onMouseLeave={() => setActiveNestedMenu(null)}
                >
                  {hasDropdown ? (
                    <>
                      <button
                        className="relative font-semibold text-[15px] text-[#005ABA] flex items-center gap-1
                        after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                        after:bg-[#005ABA] after:transition-all after:duration-300
                        hover:after:w-full hover:text-[#3498db] transition-colors duration-200"
                      >
                        {item.label}
                        <ChevronDownIcon className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <ul className="w-72 bg-white border border-blue-50 shadow-[0_12px_40px_rgba(52,152,219,0.14)] py-2 rounded-2xl overflow-visible">
                          {dropdownItems.map((sub) => {
                            const children = isInvolvement
                              ? (sub.subBrands ?? [])
                              : (sub.nestedItems ?? [])

                            const hasChildren = children.length > 0

                            return (
                              <li
                                key={sub.name}
                                className="relative px-2 mx-1 hover:bg-blue-50/70 rounded-xl flex justify-between items-center transition-colors duration-150"
                                onMouseEnter={() => hasChildren && setActiveNestedMenu(sub.name)}
                              >
                                {sub.href ? (
                                  <Link
                                    href={sub.href}
                                    className="text-[13px] font-medium text-[#0057B7] w-full px-3 py-2.5 block hover:text-[#3498db] transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ) : (
                                  <span className="text-[13px] font-medium text-[#0057B7] w-full px-3 py-2.5 cursor-default">
                                    {sub.name}
                                  </span>
                                )}

                                {hasChildren && (
                                  <ChevronRightIcon className="w-3 h-3 text-[#3498db] shrink-0 mr-2" />
                                )}

                                {hasChildren && activeNestedMenu === sub.name && (
                                  <div className="absolute left-full top-0 pl-1 z-60">
                                    <ul className="w-64 bg-white border border-blue-50 shadow-[0_12px_40px_rgba(52,152,219,0.14)] py-2 rounded-2xl">
                                      {children.map((nested) => (
                                        <li
                                          key={nested.name}
                                          className="px-2 mx-1 hover:bg-blue-50/70 rounded-xl transition-colors duration-150"
                                        >
                                          <a
                                            href={nested.href}
                                            target={isInvolvement ? '_blank' : undefined}
                                            rel={isInvolvement ? 'noopener noreferrer' : undefined}
                                            className="block px-3 py-2.5 text-[13px] font-medium text-[#3E80C9] hover:text-[#3498db] transition-colors"
                                          >
                                            {nested.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative font-semibold text-[15px] text-[#005ABA]
                      after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0
                      after:bg-[#005ABA] after:transition-all after:duration-300
                      hover:after:w-full hover:text-[#3498db] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          <button
            className="lg:hidden p-2 text-[#005ABA] hover:bg-blue-50 rounded-lg transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </nav>

        {/* MOBILE DROPDOWNS */}
        <div
          className={`lg:hidden bg-white/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen border-t border-blue-50 px-5 py-4 shadow-xl' : 'max-h-0'
          }`}
        >
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isInvolvement = item.label === 'Involvements'
              const dropdownItems: UnifiedDropdownItem[] = isInvolvement
                ? involvements
                : item.subMenu || []

              const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)

              return (
                <div key={item.label}>
                  {hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleMobileItem(item.label)}
                        className="flex justify-between w-full px-3 py-2.5 rounded-xl font-semibold text-[14px] text-[#005ABA] hover:bg-blue-50/60 transition-colors duration-200"
                      >
                        {item.label}
                        {mobileExpandedItem === item.label ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </button>

                      {mobileExpandedItem === item.label && (
                        <div className="pl-4 space-y-1 mt-1 border-l-2 border-blue-100 ml-4">
                          {dropdownItems.map((sub) => {
                            const children = isInvolvement
                              ? (sub.subBrands ?? [])
                              : (sub.nestedItems ?? [])

                            const hasChildren = children.length > 0

                            return (
                              <div key={sub.name}>
                                {hasChildren ? (
                                  <>
                                    <button
                                      onClick={() => toggleMobileNested(sub.name)}
                                      className="flex justify-between w-full px-3 py-2 rounded-lg text-[14px] text-[#3E80C9] hover:bg-blue-50/60 transition-colors duration-200"
                                    >
                                      {sub.name}
                                      {mobileNestedExpanded === sub.name ? (
                                        <ChevronUpIcon className="w-4 h-4" />
                                      ) : (
                                        <ChevronDownIcon className="w-4 h-4" />
                                      )}
                                    </button>

                                    {mobileNestedExpanded === sub.name && (
                                      <div className="pl-4 space-y-1 border-l-2 border-blue-50 ml-3">
                                        {children.map((nested) => (
                                          <a
                                            key={nested.name}
                                            href={nested.href}
                                            target={isInvolvement ? '_blank' : undefined}
                                            rel={isInvolvement ? 'noopener noreferrer' : undefined}
                                            onClick={() => setIsOpen(false)}
                                            className="block px-3 py-1.5 rounded-lg text-[13px] text-[#0057B7] hover:bg-blue-50 hover:text-[#3498db] transition-colors duration-150"
                                          >
                                            {nested.name}
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    href={sub.href || '#'}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-[14px] text-[#3E80C9] hover:bg-blue-50 hover:text-[#3498db] transition-colors duration-150"
                                  >
                                    {sub.name}
                                  </Link>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2.5 rounded-xl font-semibold text-[14px] text-[#005ABA] hover:bg-blue-50/60 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </header>
    </>
  )
}
