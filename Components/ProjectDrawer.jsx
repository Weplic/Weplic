'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import { FiCheckCircle, FiLoader } from 'react-icons/fi'
import { useApp, useActions } from '@/Context/AppContext'
import useFormSubmission from '@/hooks/useFormSubmission'
import { ProjectBriefStrategy } from '@/lib/formStrategies'

/**
 * ProjectDrawer — Strategy + Chain of Responsibility + Mediator patterns
 *
 * Strategy Pattern:        Form submission uses ProjectBriefStrategy via useFormSubmission.
 * Chain of Responsibility: Validation is handled by the strategy's validator chain.
 * Mediator Pattern:        Open/close state from AppContext. Scroll lock centralized.
 */

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
  const { isBriefOpen } = useApp()

  return (
    <AnimatePresence>
      {isBriefOpen && (
        <ProjectDrawerInner />
      )}
    </AnimatePresence>
  )
}

function ProjectDrawerInner() {
  const { preselectedService } = useApp()
  const { closeBrief } = useActions()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [selectedServices, setSelectedServices] = useState(() => {
    if (preselectedService) {
      const matched = servicesList.find(s =>
        s.toLowerCase().includes(preselectedService.toLowerCase())
      )
      return [matched || preselectedService]
    }
    return []
  })
  const [selectedBudget, setSelectedBudget] = useState('')
  const [customBudget, setCustomBudget] = useState('')
  const [message, setMessage] = useState('')

  // ── Strategy Pattern: form submission with built-in validation chain ──
  const { submit, loading, error, success } = useFormSubmission(ProjectBriefStrategy)

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  const handleCustomBudgetChange = (e) => {
    setCustomBudget(e.target.value)
    if (e.target.value) {
      setSelectedBudget('')
    }
  }

  const handleBudgetPresetClick = (budget) => {
    if (selectedBudget === budget) {
      setSelectedBudget('')
    } else {
      setSelectedBudget(budget)
      setCustomBudget('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Strategy handles validation + formatting + submission
    const submitted = await submit({
      name,
      email,
      company,
      selectedServices,
      selectedBudget,
      customBudget,
      message,
    })

    if (submitted) {
      // Reset form fields on success
      setName('')
      setEmail('')
      setCompany('')
      setSelectedServices([])
      setSelectedBudget('')
      setCustomBudget('')
      setMessage('')
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
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
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
                onClick={closeBrief}
                className="mt-6 bg-[#FFC800] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#e6b400] transition-all cursor-pointer"
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
                    placeholder="you@yourcompany.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
                </div>
              </div>

              {/* Services Selection */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">What service(s) do you need?</label>
                  <span className="text-[10px] text-neutral-500 font-medium">Select all that apply</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isSelected = selectedServices.includes(service)
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFC800] text-black border-[#FFC800]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        {isSelected ? `✓ ${service}` : service}
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
                    const isSelected = selectedBudget === budget && !customBudget
                    return (
                      <button
                        type="button"
                        key={budget}
                        onClick={() => handleBudgetPresetClick(budget)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
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
                <div className="pt-1">
                  <input
                    type="text"
                    value={customBudget}
                    onChange={handleCustomBudgetChange}
                    placeholder="Or enter custom budget (e.g. $15,000 or $5k/mo)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFC800] focus:ring-1 focus:ring-[#FFC800] transition-all"
                  />
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
                className="w-full bg-[#FFC800] text-black font-semibold py-4 rounded-xl hover:bg-[#e6b400] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
