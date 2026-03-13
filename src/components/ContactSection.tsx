'use client'

import { useState, useCallback } from 'react'
import PageBanner from './PageBanner'
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  TagIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid } from '@heroicons/react/24/solid'
import toast, { Toaster } from 'react-hot-toast'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setSuccess(false)

      try {
        const res = await fetch(`${PAYLOAD_BASE_URL}/api/contacts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        })

        if (!res.ok) throw new Error('Submission failed')

        setSuccess(true)
        toast.success('Message sent successfully!')
        setFormData(INITIAL_FORM)
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    },
    [formData],
  )

  return (
    <section className="overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      <PageBanner
        title="Contact Us"
        padding="py-8 sm:py-10 md:py-12 px-4 sm:px-6"
        width="w-full mx-auto"
        textAlign="center"
        breadcrumb={[
          { name: 'Home', href: '/', icon: <HomeIconSolid className="w-5 h-5" /> },
          { name: 'Contact' },
        ]}
      />

      <div className="w-full bg-[#f0f6ff] py-16 sm:py-20 md:py-24 lg:py-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header */}
          <div className="text-center mb-14 sm:mb-18 md:mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Reach Out
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3a6e] mb-5">
              Get in{' '}
              <span className="relative inline-block px-2">
                Touch
                <span className="absolute bottom-0 left-0 right-0 h-[0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full" />
              </span>{' '}
              with Us
            </h1>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you have a question about our services, need a quote, or want to discuss a
              project, our team is ready to respond to all your inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left — Contact Info Cards */}
            <div className="space-y-5">
              {[
                {
                  icon: <PhoneIcon className="h-7 w-7 text-white" />,
                  title: 'Call Us',
                  rotate: 'group-hover:rotate-6',
                  content: (
                    <>
                      <p className="text-[#1a3a6e] text-sm md:text-base font-semibold">
                        +977-1-4002069
                      </p>
                      <p className="text-[#1a3a6e] text-sm md:text-base font-semibold">
                        +977 980-2076449
                      </p>
                    </>
                  ),
                },
                {
                  icon: <MapPinIcon className="h-7 w-7 text-white" />,
                  title: 'Visit Us',
                  rotate: 'group-hover:-rotate-6',
                  content: (
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      152 Rani Devi Marg Lazimpat, Kathmandu, Nepal.
                    </p>
                  ),
                },
                {
                  icon: <EnvelopeIcon className="h-7 w-7 text-white" />,
                  title: 'Email Us',
                  rotate: 'group-hover:rotate-6',
                  content: (
                    <p className="text-[#1a3a6e] text-sm md:text-base font-semibold break-all">
                      info@arkshgroup.com
                    </p>
                  ),
                },
                {
                  icon: <ClockIcon className="h-7 w-7 text-white" />,
                  title: 'Business Hours',
                  rotate: 'group-hover:-rotate-6',
                  content: (
                    <p className="text-gray-500 text-sm md:text-base">
                      Sunday – Friday: 09:30 AM – 5:30 PM
                    </p>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(52,152,219,0.07)] hover:shadow-[0_12px_40px_rgba(52,152,219,0.16)] hover:-translate-y-0.5 transition-all duration-300 p-6 md:p-8 flex gap-5 border border-blue-50"
                >
                  <div className="shrink-0">
                    <div
                      className={`flex items-center justify-center h-14 w-14 rounded-2xl bg-linear-to-br from-[#2357A6] to-[#3498db] shadow-md transition-all duration-300 group-hover:-translate-y-1 ${card.rotate} group-hover:shadow-[0_8px_20px_rgba(52,152,219,0.35)]`}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-[#1a3a6e] mb-2">
                      {card.title}
                    </h3>
                    {card.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Contact Form */}
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(52,152,219,0.12)] p-7 md:p-10 border border-blue-50">
              {/* Form header */}
              <div className="mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-2">
                  Send a Message
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a3a6e]">
                  We'd love to hear from you
                </h2>
                <div className="w-10 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] rounded-full mt-3" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full name */}
                <ContactInput
                  label="Full Name"
                  icon={<UserIcon className="w-4 h-4" />}
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <ContactInput
                    label="Email Address"
                    icon={<EnvelopeIcon className="w-4 h-4" />}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <ContactInput
                    label="Phone Number"
                    icon={<PhoneIcon className="w-4 h-4" />}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <label className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1.5 text-[#3498db] text-[13px] font-semibold z-10">
                    <TagIcon className="w-4 h-4" />
                    What's this about?
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] transition-all bg-transparent text-sm ${
                      formData.subject === '' ? 'text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    <option value="" disabled hidden>
                      Select a Subject
                    </option>
                    <option value="General Inquiry" className="text-gray-900">
                      General Inquiry
                    </option>
                    <option value="Customer Support" className="text-gray-900">
                      Customer Support
                    </option>
                    <option value="Sales Inquiry" className="text-gray-900">
                      Sales Inquiry
                    </option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1.5 text-[#3498db] text-[13px] font-semibold z-10">
                    <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] transition-all text-gray-800 bg-transparent text-sm resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn w-full bg-linear-to-r from-[#2357A6] to-[#3498db] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-base shadow-[0_8px_30px_rgba(52,152,219,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <PaperAirplaneIcon className="w-5 h-5 -rotate-12 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-125 relative">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-linear-to-b from-[#f0f6ff] to-transparent z-10" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.7063399626504!2d85.31907747568266!3d27.7263518246527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1918569c8961%3A0x5f43dd27a908ad94!2sArksh%20Group!5e0!3m2!1sen!2snp!4v1773384215008!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>
    </section>
  )
}

// ── Helper Component ──

function ContactInput({
  label,
  icon,
  name,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  icon: React.ReactNode
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="relative">
      <label className="absolute -top-3 left-4 bg-white px-2 flex items-center gap-1.5 text-[#3498db] text-[13px] font-semibold z-10">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] transition-all text-gray-800 bg-transparent text-sm"
      />
    </div>
  )
}
