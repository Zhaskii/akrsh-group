'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  MapPinIcon,
  BriefcaseIcon,
  UsersIcon,
  ChevronRightIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  CloudArrowUpIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import type { Career as CareerType } from '@/payload-types'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ''

export default function CareerSection() {
  const [careers, setCareers] = useState<CareerType[]>([])
  const [selectedJob, setSelectedJob] = useState<CareerType | null>(null)
  const [employmentStatus, setEmploymentStatus] = useState('Unemployed')
  const [hasReferrer, setHasReferrer] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resumePreview, setResumePreview] = useState<{ name: string; size: number } | null>(null)

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch(
          `${PAYLOAD_BASE_URL}/api/careers?where[status][equals]=open&sort=order`,
        )
        const data = await res.json()
        setCareers(Array.isArray(data.docs) ? data.docs : [])
      } catch (error) {
        console.error('Error fetching careers:', error)
      }
    }
    fetchCareers()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const form = e.currentTarget
    const data = Object.fromEntries(formData.entries())

    if (!selectedPosition) {
      toast.error('Please select a position.')
      return
    }

    let cvMediaId: string | undefined
    const resumeFile = formData.get('resume') as File | null

    let submittedOk = false
    try {
      setSubmitting(true)

      if (resumeFile && resumeFile.size > 0) {
        const uploadForm = new FormData()
        uploadForm.append('file', resumeFile)
        uploadForm.append('alt', `${(data.fullName as string) || 'CV'} - ${selectedPosition}`)

        const uploadRes = await fetch(`${PAYLOAD_BASE_URL}/api/media`, {
          method: 'POST',
          body: uploadForm,
        })

        if (!uploadRes.ok) {
          throw new Error(`Failed to upload CV (${uploadRes.status})`)
        }

        const uploadJson = await uploadRes.json()
        cvMediaId = uploadJson?.doc?.id || uploadJson?.id
      }

      const payload = {
        name: (data.fullName as string) ?? '',
        email: (data.email as string) ?? '',
        phone: (data.phoneNumber as string) ?? '',
        location: (data.location as string) ?? '',
        position: selectedPosition,
        expectedSalary: data.expectedSalary ? Number(data.expectedSalary as string) : undefined,
        startDate: (data.startDate as string) || undefined,
        experience: (data.experience as string) ?? '',
        employmentStatus,
        hasReferrer,
        referrerName: (data.referrerName as string) || undefined,
        referrerEmail: (data.referrerEmail as string) || undefined,
        cv: cvMediaId,
      }

      const res = await fetch(`${PAYLOAD_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Failed to submit application (${res.status})`)
      }

      submittedOk = true
      toast.success('Application submitted successfully!')
      form.reset()

      try {
        e.currentTarget.reset()
        setSelectedPosition('')
        setEmploymentStatus('Unemployed')
        setHasReferrer(false)
        setResumePreview(null)
      } catch (_) {}
    } catch (error) {
      console.error('Error submitting application:', error)
      if (!submittedOk) {
        toast.error('Sorry, something went wrong submitting your application.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleApplyNow = useCallback((title: string) => {
    setSelectedPosition(title)
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
    setSelectedJob(null)
  }, [])

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedJob])

  return (
    <div className="min-h-screen bg-[#f0f6ff] font-sans text-gray-900 overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ── Hero Banner ── */}
      <div
        className="relative h-72 flex items-center justify-center text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#1a3a6e]/90 via-[#2357A6]/80 to-[#3498db]/70" />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5" />
        {/* Wave bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-[#f0f6ff]"
          style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}
        />

        <div className="relative z-10 text-center px-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200 mb-3">
            We're Hiring
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Join Our Team</h1>
          <div className="w-14 h-0.75 bg-white/40 rounded-full mx-auto mb-4" />
          <nav className="flex justify-center items-center gap-2 text-sm font-semibold text-blue-100">
            <HomeIcon className="w-4 h-4" />
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <span className="opacity-90">Careers</span>
          </nav>
        </div>
      </div>

      {/* ── Job Listings ── */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-5">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
            Open Positions
          </p>
          <h2 className="text-4xl font-bold text-[#1a3a6e] mb-4">Current Opportunities</h2>
          <div className="w-14 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] mx-auto rounded-full" />
        </div>

        {careers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-blue-50 shadow-sm">
            <p className="text-gray-400 text-lg">
              Currently no positions available. Please check back later.
            </p>
          </div>
        )}

        {careers.map((job) => (
          <div
            key={job.id}
            className="group bg-white border border-blue-50 rounded-2xl shadow-[0_4px_20px_rgba(52,152,219,0.07)] hover:shadow-[0_12px_40px_rgba(52,152,219,0.15)] hover:-translate-y-0.5 transition-all duration-300 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left: job info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a3a6e] group-hover:text-[#3498db] transition-colors duration-200">
                  {job.title}
                </h3>
                {job.status === 'open' && (
                  <span className="bg-green-50 text-green-600 border border-green-100 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                    Open
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <JobBadge icon={<MapPinIcon className="w-3.5 h-3.5" />}>
                  {job.location || 'Location not specified'}
                </JobBadge>
                <JobBadge icon={<ClockIcon className="w-3.5 h-3.5" />}>
                  {job.type || 'N/A'}
                </JobBadge>
                <JobBadge icon={<UsersIcon className="w-3.5 h-3.5" />}>
                  {job.vacancyCount || 1} {Number(job.vacancyCount) > 1 ? 'Positions' : 'Position'}
                </JobBadge>
                {job.deadline && (
                  <JobBadge icon={<ClockIcon className="w-3.5 h-3.5 text-red-400" />} danger>
                    Deadline:{' '}
                    {new Date(job.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </JobBadge>
                )}
              </div>
            </div>

            {/* Right: buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setSelectedJob(job)}
                className="px-5 py-2.5 text-sm font-semibold text-[#2357A6] border border-blue-100 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200"
              >
                Details
              </button>
              <button
                onClick={() => handleApplyNow(job.title)}
                className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#2357A6] to-[#3498db] text-white text-sm font-bold rounded-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
              >
                Apply Now <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-blue-50">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-blue-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3498db] mb-1">
                  Job Opening
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-[#1a3a6e]">
                  {selectedJob.title}
                </h3>
                <p className="text-sm text-[#3498db] font-medium mt-0.5">{selectedJob.location}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-blue-50 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1">
              <div className="flex flex-col md:flex-row">
                {/* Main content */}
                <div className="flex-2 p-8 space-y-8">
                  {selectedJob.description && (
                    <ModalSection
                      icon={<BriefcaseIcon className="w-5 h-5" />}
                      title="Job Description"
                    >
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {selectedJob.description}
                      </p>
                    </ModalSection>
                  )}
                  <ModalSection
                    icon={<AcademicCapIcon className="w-5 h-5" />}
                    title="Requirements & Skills"
                  >
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {selectedJob.requirements || 'Not specified.'}
                    </p>
                  </ModalSection>
                  {selectedJob.responsibilities && (
                    <ModalSection
                      icon={<UsersIcon className="w-5 h-5" />}
                      title="Key Responsibilities"
                    >
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {selectedJob.responsibilities}
                      </p>
                    </ModalSection>
                  )}
                </div>

                {/* Sidebar */}
                <div className="flex-1 bg-[#f7faff] p-8 border-l border-blue-50 space-y-6">
                  <div>
                    <p className="text-xs font-bold text-[#3498db] uppercase tracking-widest mb-5">
                      Job Information
                    </p>
                    <div className="space-y-5">
                      <InfoRow
                        icon={<ClockIcon className="w-4 h-4 text-[#3498db]" />}
                        label="Employment Type"
                      >
                        {selectedJob.type || 'N/A'}
                      </InfoRow>
                      <InfoRow
                        icon={<UsersIcon className="w-4 h-4 text-[#3498db]" />}
                        label="Openings"
                      >
                        {selectedJob.vacancyCount || 1}{' '}
                        {Number(selectedJob.vacancyCount) > 1 ? 'Positions' : 'Position'}
                      </InfoRow>
                      <InfoRow
                        icon={<XMarkIcon className="w-4 h-4 text-red-400" />}
                        label="Deadline"
                      >
                        <span className={selectedJob.deadline ? 'text-red-500 font-semibold' : ''}>
                          {selectedJob.deadline
                            ? new Date(selectedJob.deadline).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Not specified'}
                        </span>
                      </InfoRow>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-blue-100">
                    <button
                      onClick={() => handleApplyNow(selectedJob.title)}
                      className="w-full bg-linear-to-r from-[#2357A6] to-[#3498db] hover:opacity-90 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                    >
                      Apply for this Position
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Application Form ── */}
      <div id="application-form" className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-[0_8px_40px_rgba(52,152,219,0.12)] border border-blue-50 p-8 md:p-16">
          {/* Form Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3498db] mb-3">
              Apply Now
            </p>
            <h2 className="text-4xl font-bold text-[#1a3a6e] mb-3">Submit Your Application</h2>
            <div className="w-14 h-0.75 bg-linear-to-r from-[#2357A6] to-[#3498db] mx-auto rounded-full mb-4" />
            <p className="text-gray-400">
              Fill in the details below and we'll get back to you soon.
            </p>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <FormSection label="01" title="Personal Information" subtitle="Tell us about yourself">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <FloatingInput
                  label="Full Name"
                  icon={<UserIcon className="w-5 h-5" />}
                  name="fullName"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
                <FloatingInput
                  label="Email Address"
                  icon={<EnvelopeIcon className="w-5 h-5" />}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <FloatingInput
                  label="Location"
                  icon={<MapPinIcon className="w-5 h-5" />}
                  name="location"
                  type="text"
                  placeholder="City, Country"
                  required
                />
                <FloatingInput
                  label="Phone Number"
                  icon={<PhoneIcon className="w-5 h-5" />}
                  name="phoneNumber"
                  type="tel"
                  placeholder="+977"
                  required
                />
              </div>
            </FormSection>

            {/* Professional Details */}
            <FormSection
              label="02"
              title="Professional Details"
              subtitle="Tell us about your career"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {/* Position select */}
                <div className="relative">
                  <label className="absolute -top-3.5 left-4 bg-white px-2 text-[13px] text-[#3498db] font-semibold flex items-center gap-1.5 z-10">
                    <BriefcaseIcon className="w-4 h-4" /> Position Applying For
                  </label>
                  <select
                    name="position"
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white appearance-none outline-none focus:border-[#3498db] transition text-gray-700"
                    required
                  >
                    <option value="">Select a Position</option>
                    {careers.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Expected salary */}
                <div className="relative">
                  <label className="absolute -top-3 left-6 bg-white px-2 text-[#3498db] text-[13px] font-semibold z-10">
                    Expected Salary
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-[#3498db] transition-all">
                    <span className="text-gray-400 font-bold mr-2">$</span>
                    <input
                      name="expectedSalary"
                      type="number"
                      className="w-full outline-none text-gray-700 bg-transparent"
                      required
                    />
                  </div>
                </div>

                <FloatingInput
                  label="Available Start Date"
                  icon={<ClockIcon className="w-5 h-5" />}
                  name="startDate"
                  type="date"
                  placeholder=""
                  required
                />
                <FloatingInput
                  label="Years of Experience"
                  icon={<ClockIcon className="w-5 h-5" />}
                  name="experience"
                  type="text"
                  placeholder="e.g. 3 years"
                  required
                />
              </div>
            </FormSection>

            {/* Employment Status */}
            <FormSection
              label="03"
              title="Employment Status"
              subtitle="Your current work situation"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Employed', icon: BuildingOfficeIcon },
                  { label: 'Unemployed', icon: UserIcon },
                  { label: 'Self-employed', icon: BriefcaseIcon },
                  { label: 'Student', icon: AcademicCapIcon },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setEmploymentStatus(item.label)}
                    className={`py-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                      employmentStatus === item.label
                        ? 'border-[#3498db] bg-blue-50 text-[#2357A6] shadow-[0_4px_20px_rgba(52,152,219,0.2)]'
                        : 'border-blue-50 bg-[#f7faff] text-gray-400 hover:border-blue-100'
                    }`}
                  >
                    <item.icon className="w-8 h-8 stroke-[1.5px]" />
                    <span className="font-bold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </FormSection>

            {/* Documents */}
            <FormSection
              label="04"
              title="Documents & References"
              subtitle="Upload your resume and provide references"
            >
              {/* Resume upload */}
              <div className="border-2 border-dashed border-blue-100 rounded-4xl p-12 bg-[#f7faff] hover:bg-blue-50 hover:border-[#3498db] transition-all cursor-pointer group relative">
                <input
                  type="file"
                  id="resume-upload"
                  name="resume"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setResumePreview({ name: file.name, size: file.size })
                    } else {
                      setResumePreview(null)
                    }
                  }}
                />
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <div className="w-16 h-16 bg-linear-to-br from-[#2357A6] to-[#3498db] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                    <CloudArrowUpIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3a6e]">Upload Your Resume</h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    Drag and drop your file here or click to browse
                  </p>
                  <p className="text-gray-300 text-xs mt-1">Accepted: PDF, DOC, DOCX (max 5MB)</p>
                </label>
              </div>

              {resumePreview && (
                <div className="mt-4 flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3 text-sm">
                  <div className="w-8 h-8 bg-[#3498db] rounded-lg flex items-center justify-center shrink-0">
                    <BriefcaseIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-[#1a3a6e] truncate">
                    {resumePreview.name}
                  </span>
                  <span className="text-gray-400 text-xs shrink-0">
                    ({Math.round(resumePreview.size / 1024)} KB)
                  </span>
                  <button
                    type="button"
                    className="ml-auto text-red-400 hover:text-red-600 text-xs font-semibold shrink-0"
                    onClick={() => {
                      const input = document.getElementById(
                        'resume-upload',
                      ) as HTMLInputElement | null
                      if (input) input.value = ''
                      setResumePreview(null)
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Referrer toggle */}
              <div
                className="flex items-center gap-4 bg-[#f7faff] p-5 rounded-2xl border border-blue-50 cursor-pointer hover:border-blue-100 transition-all mt-4"
                onClick={() => setHasReferrer(!hasReferrer)}
              >
                <div
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${hasReferrer ? 'bg-linear-to-r from-[#2357A6] to-[#3498db]' : 'bg-gray-200'}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${hasReferrer ? 'left-7' : 'left-1'}`}
                  />
                </div>
                <span className="text-[#1a3a6e] font-bold text-sm">Do you have a referrer?</span>
              </div>

              {hasReferrer && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 p-8 bg-[#f7faff] rounded-[28px] border border-blue-50 mt-4">
                  <FloatingInput
                    label="Referrer Name"
                    icon={<UserIcon className="w-5 h-5" />}
                    name="referrerName"
                    type="text"
                    placeholder="Enter referrer name"
                    required={hasReferrer}
                  />
                  <FloatingInput
                    label="Referrer Email"
                    icon={<EnvelopeIcon className="w-5 h-5" />}
                    name="referrerEmail"
                    type="email"
                    placeholder="Enter referrer email"
                    required={hasReferrer}
                  />
                </div>
              )}
            </FormSection>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-3 px-16 py-5 bg-linear-to-r from-[#2357A6] to-[#3498db] text-white font-bold rounded-2xl hover:opacity-90 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_8px_30px_rgba(52,152,219,0.35)] text-lg group"
              >
                <PaperAirplaneIcon className="w-6 h-6 -rotate-12 group-hover:translate-x-1 transition-transform" />
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Helper Components ──

function JobBadge({
  icon,
  children,
  danger,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  danger?: boolean
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
        danger
          ? 'bg-red-50 border-red-100 text-red-500'
          : 'bg-blue-50 border-blue-100 text-[#2357A6]'
      }`}
    >
      {icon}
      {children}
    </span>
  )
}

function ModalSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h4 className="text-base font-bold text-[#1a3a6e] flex items-center gap-2">
        <span className="text-[#3498db]">{icon}</span>
        {title}
      </h4>
      <div className="pl-7">{children}</div>
    </section>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-blue-50 p-2 rounded-xl shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#1a3a6e]">{children}</p>
      </div>
    </div>
  )
}

function FormSection({
  label,
  title,
  subtitle,
  children,
}: {
  label: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="text-4xl font-black text-blue-100 leading-none select-none">{label}</span>
        <div>
          <h3 className="text-2xl font-bold text-[#1a3a6e]">{title}</h3>
          <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function FloatingInput({
  label,
  icon,
  name,
  type,
  placeholder,
  required,
}: {
  label: string
  icon: React.ReactNode
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="relative">
      <label className="absolute -top-3 left-6 bg-white px-2 text-[#3498db] text-[13px] font-semibold z-10">
        {label}
      </label>
      <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-4 focus-within:border-[#3498db] focus-within:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] transition-all">
        <span className="text-gray-300 mr-4 shrink-0">{icon}</span>
        <input
          name={name}
          type={type}
          className="w-full outline-none text-gray-700 bg-transparent text-sm"
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  )
}
