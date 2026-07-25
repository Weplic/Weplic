'use client'
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import { FiClock, FiGlobe } from 'react-icons/fi'
import { useApp, useActions } from '@/Context/AppContext'
import { BOOKING_STEPS, INITIAL_STEP } from '@/Components/booking/BookingSteps'
import useFormSubmission from '@/hooks/useFormSubmission'
import { BookingStrategy } from '@/lib/formStrategies'

/**
 * BookingModal — Combines State + Strategy + Mediator patterns
 *
 * State Pattern:   Step rendering is driven by BOOKING_STEPS config.
 * Strategy Pattern: Form submission uses BookingStrategy via useFormSubmission.
 * Mediator Pattern: Open/close state comes from AppContext (Mediator).
 *                   Scroll lock is handled centrally by the Mediator.
 */
export default function BookingModal() {
  const { isBookingOpen } = useApp()

  return (
    <AnimatePresence>
      {isBookingOpen && (
        <BookingModalInner />
      )}
    </AnimatePresence>
  )
}

function BookingModalInner() {
  const { closeBooking } = useActions()

  // ── State Pattern: current step in the state machine ──
  const [currentStepId, setCurrentStepId] = useState(INITIAL_STEP)

  // ── Shared form data across all steps ──
  const [formData, setFormData] = useState({
    selectedDate: null,
    selectedTime: '',
    name: '',
    email: '',
    description: '',
    currentMonth: new Date(),
  })

  // ── Strategy Pattern: form submission ──
  const { submit, loading, error } = useFormSubmission(BookingStrategy)

  // ── State transitions ──
  const currentStep = BOOKING_STEPS[currentStepId]

  const goToNext = useCallback(() => {
    if (currentStep.next) {
      setCurrentStepId(currentStep.next)
    }
  }, [currentStep])

  const goToPrev = useCallback(() => {
    if (currentStep.prev) {
      setCurrentStepId(currentStep.prev)
    }
  }, [currentStep])

  // ── Merge partial updates into shared form data ──
  const handleDataChange = useCallback((partial) => {
    setFormData((prev) => ({ ...prev, ...partial }))
  }, [])

  // ── Strategy-powered form submission ──
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const success = await submit(formData)
    if (success) {
      setCurrentStepId('SUCCESS')
    }
  }, [formData, submit])

  // ── Render the current step's component ──
  const StepComponent = currentStep.component

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBooking}
      />

      {/* Modal Center Wrapper */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="bg-white text-black w-full max-w-[800px] h-[600px] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex border border-neutral-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        >
          {/* Left Column - Agency Context */}
          <div className="w-[30%] bg-neutral-950 text-white p-8 flex flex-col justify-between border-r border-neutral-800">
            <div className="space-y-4">
              <span className="text-[#FFC800] text-xs font-semibold uppercase tracking-wider font-inter">WEPLIC STUDIO</span>
              <h4 className="text-2xl font-bold font-clash leading-tight">30-Min Discovery Meeting</h4>
              <div className="flex items-center gap-2 text-neutral-400 text-sm mt-6">
                <FiClock />
                <span>30 min</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <FiGlobe />
                <span>Google Meet (Video Call)</span>
              </div>
            </div>

            <div className="text-xs text-neutral-500 leading-relaxed">
              Book a quick call to talk strategy, look over your project briefs, and see if we&apos;re a good fit.
            </div>
          </div>

          {/* Right Column - Step Workspace */}
          <div className="flex-1 bg-white p-8 flex flex-col overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeBooking}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-all cursor-hover"
            >
              <IoCloseOutline size={24} />
            </button>

            {/* State Pattern: render the current step's component */}
            <StepComponent
              data={formData}
              onChange={handleDataChange}
              onNext={goToNext}
              onPrev={goToPrev}
              onSubmit={handleSubmit}
              onClose={closeBooking}
              loading={loading}
              error={error}
            />
          </div>
        </motion.div>
      </div>
    </>
  )
}
