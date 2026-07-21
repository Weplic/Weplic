'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import { FiCheckCircle, FiLoader } from 'react-icons/fi'
import { useApp } from '@/Context/AppContext'

const servicesList = [
  "Website Design & Development",
  "Mobile App Design & Development",
  "UI/UX Design",
  "Brand Identity",
  "Product Design",
  "Design Systems",
]

const budgetRanges = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
]

export default function ProjectDrawer() {
  const { isBriefOpen, closeBrief, preselectedService } = useApp()

  // Prevent background scroll when open
  useEffect(() => {
    if (isBriefOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBriefOpen])

  return (
    <AnimatePresence>
      {isBriefOpen && (
        <ProjectDrawerInner
          closeBrief={closeBrief}
          preselectedService={preselectedService}
        />
      )}
    </AnimatePresence>
  )
}

function ProjectDrawerInner({ closeBrief, preselectedService }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [selectedService, setSelectedService] = useState(() => {
    if (preselectedService) {
      const matched = servicesList.find(s => 
        s.toLowerCase().includes(preselectedService.toLowerCase())
      )
      return matched || preselectedService
    }
    return ''
  })
  const [selectedBudget, setSelectedBudget] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !message) {
      setError('Please fill in name, email, and description.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          service: selectedService || 'Not Specified',
          budget: selectedBudget || 'Not Specified',
          message,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
        setCompany('')
        setSelectedService('')
        setSelectedBudget('')
        setMessage('')
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBrief}
      />

      {/* Drawer container */}
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-[550px] bg-[#111111] text-white shadow-2xl z-[201] flex flex-col border-l border-white/5"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 200 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold font-clash tracking-wide text-white">Start Your Project</h3>
            <p className="text-sm text-neutral-400 mt-1">We typically reply within 24 hours</p>
          </div>
          <button
            onClick={closeBrief}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-hover"
          >
            <IoCloseOutline size={26} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {success ? (
            <motion.div
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <FiCheckCircle size={70} className="text-[#FFC800]" />
              </motion.div>
              <h4 className="text-2xl font-bold font-clash">Brief Received!</h4>
              <p className="text-neutral-400 max-w-sm">
                Thank you for reaching out. A senior partner from our team will review your requirements and follow up within one business day.
              </p>
              <button
                onClick={() => {
                  setSuccess(false)
                  closeBrief()
                }}
                className="mt-6 bg-[#FFC800] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#e6b400] transition-all cursor-hover"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                  {error}
                </div>
              )}

              {/* Basic Inputs */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Chen"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@nexus.finance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nexus Finance"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
                </div>
              </div>

              {/* Services Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">What service do you need?</label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isSelected = selectedService === service
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => setSelectedService(isSelected ? '' : service)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-hover ${
                          isSelected
                            ? 'bg-[#FFC800] text-black border-[#FFC800]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        {service}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Budget Ranges */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Project Budget</label>
                <div className="flex flex-wrap gap-2">
                  {budgetRanges.map((budget) => {
                    const isSelected = selectedBudget === budget
                    return (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => setSelectedBudget(isSelected ? '' : budget)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-hover ${
                          isSelected
                            ? 'bg-[#FFC800] text-black border-[#FFC800]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Project Details *</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the project objectives, timelines, and scope..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC800] text-black font-semibold py-4 rounded-xl hover:bg-[#e6b400] transition-all flex items-center justify-center gap-2 cursor-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin text-lg" />
                    Submitting Brief...
                  </>
                ) : (
                  'Submit Brief'
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </>
  )
}
