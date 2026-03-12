'use client'

import { useState, useEffect, useRef } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollRef = useRef(0)
  const isOpenRef = useRef(isOpen)

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (isOpenRef.current) return
      const currentScroll = window.scrollY
      setIsScrolled(currentScroll > 50)
      if (currentScroll <= 10) {
        setIsVisible(true)
      } else if (currentScroll > lastScrollRef.current && currentScroll > 150) {
        setIsVisible(false)
      } else if (currentScroll < lastScrollRef.current) {
        setIsVisible(true)
      }
      lastScrollRef.current = currentScroll
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Spacer */}
      <div className="h-26.25 md:h-37.5 w-full bg-white" />

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* ── TOP BAR ── */}
        <div className="hidden md:flex bg-linear-to-r from-[#1a3a6e] via-[#2257A6] to-[#2a6bc4] text-white py-2.5 px-4 md:px-12 justify-between items-center gap-4 relative overflow-visible">
          {/* Contact info */}
          <div className="flex gap-6 items-center text-[12px] font-medium">
            <a
              href="mailto:info@arkshgroup.com"
              className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity duration-200 group"
            >
              <div className="bg-white/15 p-1 rounded-md group-hover:bg-white/25 transition-colors">
                <EnvelopeIcon className="w-3 h-3 text-white" />
              </div>
              <span>info@arkshgroup.com</span>
            </a>
            <span className="w-px h-3.5 bg-white/20" />
            <a
              href="tel:+9779802074449"
              className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity duration-200 group"
            >
              <div className="bg-white/15 p-1 rounded-md group-hover:bg-white/25 transition-colors">
                <PhoneIcon className="w-3 h-3 text-white" />
              </div>
              <span>+977 980-2074449 / +977-1-4002049</span>
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-2 items-center">
            <span className="text-[10px] text-white/35 mr-1 font-bold uppercase tracking-[0.22em]">
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
                    className="bg-white/15 hover:bg-white hover:text-[#2257A6] p-1 rounded-lg w-7 h-7 flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-transparent hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>

                  {hasBrands && (
                    <div className="absolute top-full right-0 mt-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-60">
                      {/* Arrow */}
                      <div className="absolute -top-1.5 right-3.5 w-3 h-3 bg-white rotate-45 border-t border-l border-blue-50 z-10" />
                      <div className="bg-white rounded-2xl shadow-[0_16px_48px_rgba(52,152,219,0.18)] p-4 w-72 border border-blue-50 relative z-20">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#3498db] mb-3">
                          Our Brands
                        </p>
                        <div className="grid grid-cols-3 gap-2.5">
                          {social.brands?.map((brand, index) => (
                            <a
                              key={index}
                              href={brand.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center p-2 rounded-xl border border-blue-50 hover:border-blue-200 hover:shadow-[0_4px_12px_rgba(52,152,219,0.12)] transition-all duration-200 bg-white group/brand"
                            >
                              <div className="relative w-14 h-14">
                                <Image
                                  src={brand.logo}
                                  alt={brand.name}
                                  fill
                                  className="object-contain transition-transform duration-300 group-hover/brand:scale-110"
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

        {/* ── NAVBAR ── */}
        <nav
          className={`w-full px-6 md:px-12 py-3 flex justify-between items-center transition-all duration-300 ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(52,152,219,0.12)] border-b border-blue-50/80'
              : 'bg-white border-b border-blue-50/60'
          }`}
        >
          <Link href="/" className="relative h-20 w-20 block shrink-0">
            <Image src={logo} alt="Arksh Group Logo" fill className="object-contain" priority />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isInvolvement = item.label === 'Involvements'
              const dropdownItems: UnifiedDropdownItem[] = isInvolvement
                ? involvements
                : item.subMenu || []
              const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)
              const isActive = item.href && pathname === item.href

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseLeave={() => setActiveNestedMenu(null)}
                >
                  {hasDropdown ? (
                    <>
                      <button
                        className={`relative flex items-center gap-1 px-3.5 py-2 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                          isActive
                            ? 'text-[#3498db] bg-blue-50'
                            : 'text-[#1a3a6e] hover:text-[#3498db] hover:bg-blue-50/70'
                        }`}
                      >
                        {item.label}
                        <ChevronDownIcon className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-250" />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        {/* Arrow */}
                        <div className="absolute top-0.75 left-5 w-2.5 h-2.5 bg-white rotate-45 border-t border-l border-blue-50 z-10" />
                        <ul className="w-64 bg-white border border-blue-50 shadow-[0_16px_48px_rgba(52,152,219,0.14)] py-2 px-1.5 rounded-2xl overflow-visible relative z-20">
                          {dropdownItems.map((sub) => {
                            const children = isInvolvement
                              ? (sub.subBrands ?? [])
                              : (sub.nestedItems ?? [])
                            const hasChildren = children.length > 0

                            return (
                              <li
                                key={sub.name}
                                className="relative"
                                onMouseEnter={() =>
                                  setActiveNestedMenu(hasChildren ? sub.name : null)
                                }
                              >
                                <div
                                  className={`flex items-center justify-between rounded-xl transition-colors duration-150 ${hasChildren || sub.href ? 'hover:bg-blue-50/80' : ''}`}
                                >
                                  {sub.href ? (
                                    <Link
                                      href={sub.href}
                                      className="flex-1 text-[13px] font-medium text-[#1a3a6e] px-3 py-2.5 hover:text-[#3498db] transition-colors block"
                                    >
                                      {sub.name}
                                    </Link>
                                  ) : (
                                    <span className="flex-1 text-[13px] font-medium text-[#1a3a6e] px-3 py-2.5 cursor-default">
                                      {sub.name}
                                    </span>
                                  )}
                                  {hasChildren && (
                                    <ChevronRightIcon className="w-3 h-3 text-[#3498db] shrink-0 mr-3 opacity-60" />
                                  )}
                                </div>

                                {/* Nested dropdown */}
                                {hasChildren && activeNestedMenu === sub.name && (
                                  <div className="absolute left-full top-0 pl-2 z-60">
                                    <ul className="w-60 bg-white border border-blue-50 shadow-[0_16px_48px_rgba(52,152,219,0.14)] py-2 px-1.5 rounded-2xl">
                                      {children.map((nested) => (
                                        <li
                                          key={nested.name}
                                          className="rounded-xl hover:bg-blue-50/80 transition-colors duration-150"
                                        >
                                          <a
                                            href={nested.href}
                                            target={isInvolvement ? '_blank' : undefined}
                                            rel={isInvolvement ? 'noopener noreferrer' : undefined}
                                            className="block px-3 py-2.5 text-[13px] font-medium text-[#1a3a6e] hover:text-[#3498db] transition-colors"
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
                      className={`flex items-center px-3.5 py-2 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                        isActive
                          ? 'text-[#3498db] bg-blue-50'
                          : 'text-[#1a3a6e] hover:text-[#3498db] hover:bg-blue-50/70'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#1a3a6e] hover:bg-blue-50 rounded-xl transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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

        {/* ── MOBILE MENU ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-[85vh] border-t border-blue-50 shadow-[0_16px_40px_rgba(52,152,219,0.12)]'
              : 'max-h-0'
          }`}
        >
          <div className="bg-white/98 backdrop-blur-xl px-4 py-4 overflow-y-auto max-h-[85vh]">
            {/* Contact info strip */}
            <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-blue-50">
              <a
                href="mailto:info@arkshgroup.com"
                className="flex items-center gap-2.5 text-[13px] text-gray-500 hover:text-[#3498db] transition-colors"
              >
                <div className="bg-blue-50 p-1.5 rounded-lg">
                  <EnvelopeIcon className="w-3.5 h-3.5 text-[#3498db]" />
                </div>
                info@arkshgroup.com
              </a>
              <a
                href="tel:+9779802074449"
                className="flex items-center gap-2.5 text-[13px] text-gray-500 hover:text-[#3498db] transition-colors"
              >
                <div className="bg-blue-50 p-1.5 rounded-lg">
                  <PhoneIcon className="w-3.5 h-3.5 text-[#3498db]" />
                </div>
                +977 980-2074449
              </a>
            </div>

            <div className="space-y-0.5">
              {menuItems.map((item) => {
                const isInvolvement = item.label === 'Involvements'
                const dropdownItems: UnifiedDropdownItem[] = isInvolvement
                  ? involvements
                  : item.subMenu || []
                const hasDropdown = item.isDropdown || (item.subMenu && item.subMenu.length > 0)
                const isActive = item.href && pathname === item.href

                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileItem(item.label)}
                          className={`flex justify-between w-full px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors duration-150 ${
                            mobileExpandedItem === item.label
                              ? 'bg-blue-50 text-[#3498db]'
                              : 'text-[#1a3a6e] hover:bg-blue-50/60 hover:text-[#3498db]'
                          }`}
                        >
                          {item.label}
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedItem === item.label ? 'rotate-180 text-[#3498db]' : 'opacity-40'}`}
                          />
                        </button>

                        {mobileExpandedItem === item.label && (
                          <div className="mt-1 mb-1 ml-4 pl-3 border-l-2 border-blue-100 space-y-0.5">
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
                                        className={`flex justify-between w-full px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                                          mobileNestedExpanded === sub.name
                                            ? 'bg-blue-50/80 text-[#3498db]'
                                            : 'text-[#1a3a6e] hover:bg-blue-50/50 hover:text-[#3498db]'
                                        }`}
                                      >
                                        {sub.name}
                                        <ChevronDownIcon
                                          className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileNestedExpanded === sub.name ? 'rotate-180' : 'opacity-40'}`}
                                        />
                                      </button>

                                      {mobileNestedExpanded === sub.name && (
                                        <div className="ml-3 pl-3 border-l-2 border-blue-50 space-y-0.5 mt-0.5 mb-0.5">
                                          {children.map((nested) => (
                                            <a
                                              key={nested.name}
                                              href={nested.href}
                                              target={isInvolvement ? '_blank' : undefined}
                                              rel={
                                                isInvolvement ? 'noopener noreferrer' : undefined
                                              }
                                              onClick={() => setIsOpen(false)}
                                              className="block px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-500 hover:bg-blue-50 hover:text-[#3498db] transition-colors duration-150"
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
                                      className="block px-3 py-2 rounded-lg text-[13px] font-medium text-[#1a3a6e] hover:bg-blue-50/60 hover:text-[#3498db] transition-colors duration-150"
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
                        className={`block px-3.5 py-2.5 rounded-xl text-[14px] font-semibold transition-colors duration-150 ${
                          isActive
                            ? 'bg-blue-50 text-[#3498db]'
                            : 'text-[#1a3a6e] hover:bg-blue-50/60 hover:text-[#3498db]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Social links row */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-50">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                Follow
              </span>
              {socialLinks.map((social, i) => {
                const Icon: IconType = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-linear-to-br hover:from-[#2357A6] hover:to-[#3498db] p-1.5 rounded-lg w-7 h-7 flex items-center justify-center transition-all duration-200 text-[#3498db] hover:text-white"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
