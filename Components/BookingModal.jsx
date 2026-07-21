'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoCloseOutline } from 'react-icons/io5'
import { FiCheckCircle, FiChevronLeft, FiChevronRight, FiClock, FiGlobe } from 'react-icons/fi'
import { useApp } from '@/Context/AppContext'

const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
]

export default function BookingModal() {
  const { isBookingOpen, closeBooking } = useApp()
  const [step, setStep] = useState(1) // 1: Date/Time, 2: Details, 3: Success
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calendar states
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()

  // Prevent background scroll when open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBookingOpen])

  // Reset steps on open
  useEffect(() => {
    if (isBookingOpen) {
      setStep(1)
      setSelectedDate(null)
      setSelectedTime('')
      setName('')
      setEmail('')
      setDescription('')
      setError('')
    }
  }, [isBookingOpen])

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const result = []
    
    // Add offset for empty start days
    const firstDayIndex = new Date(year, month, 1).getDay()
    for (let i = 0; i < firstDayIndex; i++) {
      result.push(null)
    }

    for (let d = 1; d <= days; d++) {
      result.push(new Date(year, month, d))
    }
    return result
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
      setCurrentMonth(prev)
    }
  }

  const handleDateSelect = (day) => {
    if (!day || day < today.setHours(0,0,0,0) && day.getDate() !== today.getDate()) return
    setSelectedDate(day)
    setSelectedTime('') // Reset time
  }

  const handleScheduleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: 'Meeting Request',
          service: '30-Min Discovery Meeting',
          budget: 'N/A',
          message: `Scheduled Discovery Call on ${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} at ${selectedTime}.\n\nMeeting Description: ${description}`,
        }),
      })

      if (response.ok) {
        setStep(3)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to schedule. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isBookingOpen && (
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

              {/* Right Column - Selector Workspace */}
              <div className="flex-1 bg-white p-8 flex flex-col overflow-y-auto relative">
                {/* Close Button */}
                <button
                  onClick={closeBooking}
                  className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-all cursor-hover"
                >
                  <IoCloseOutline size={24} />
                </button>

                {step === 1 && (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold font-clash mb-6">Select a Date & Time</h4>
                      <div className="flex gap-6 h-[400px]">
                        {/* Interactive Calendar view */}
                        <div className="flex-1 select-none">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-sm">
                              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </span>
                            <div className="flex gap-2 text-neutral-600">
                              <button onClick={prevMonth} className="p-1 hover:bg-neutral-100 rounded cursor-hover"><FiChevronLeft /></button>
                              <button onClick={nextMonth} className="p-1 hover:bg-neutral-100 rounded cursor-hover"><FiChevronRight /></button>
                            </div>
                          </div>

                          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-neutral-400 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>

                          <div className="grid grid-cols-7 gap-1">
                            {days.map((day, i) => {
                              if (!day) return <div key={`empty-${i}`} />
                              const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
                              const isPast = day < today.setHours(0,0,0,0) && day.getDate() !== today.getDate()
                              const isSelected = selectedDate && day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth() && day.getFullYear() === selectedDate.getFullYear()

                              return (
                                <button
                                  key={`day-${i}`}
                                  disabled={isPast}
                                  onClick={() => handleDateSelect(day)}
                                  className={`aspect-square text-xs font-semibold rounded-full flex items-center justify-center transition-all cursor-hover ${
                                    isSelected
                                      ? 'bg-neutral-900 text-white font-bold'
                                      : isPast
                                      ? 'text-neutral-300 cursor-not-allowed'
                                      : 'text-neutral-700 hover:bg-neutral-100'
                                  } ${isToday && !isSelected ? 'border border-[#FFC800] text-[#FFC800]' : ''}`}
                                >
                                  {day.getDate()}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Timeslot picker panel */}
                        {selectedDate && (
                          <motion.div
                            className="w-[180px] overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2 block">
                              {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            {mockTimeSlots.map((slot) => {
                              const isTimeSelected = selectedTime === slot
                              return (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-hover text-center ${
                                    isTimeSelected
                                      ? 'bg-[#FFC800] text-black border-[#FFC800]'
                                      : 'border-neutral-200 hover:border-neutral-800 text-neutral-700'
                                  }`}
                                >
                                  {slot}
                                </button>
                              )
                            })}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <button
                      disabled={!selectedDate || !selectedTime}
                      onClick={() => setStep(2)}
                      className="w-full bg-neutral-900 text-white font-semibold py-3.5 rounded-xl hover:bg-neutral-800 transition-all text-center cursor-hover disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next Step
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <form onSubmit={handleScheduleSubmit} className="h-full flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs text-neutral-400 font-bold hover:text-black flex items-center gap-1 cursor-hover"
                        >
                          <FiChevronLeft /> BACK TO DATE
                        </button>
                        <h4 className="text-xl font-bold font-clash mt-3">Confirm Call Details</h4>
                        <p className="text-sm text-neutral-500 mt-1">
                          Booking on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {selectedTime}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Your Name *</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Sarah Chen"
                            className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Your Email *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="sarah@nexus.finance"
                            className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">What would you like to discuss? *</label>
                          <textarea
                            required
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief details about your project or meeting goals..."
                            className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs font-semibold mb-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FFC800] text-black font-semibold py-3.5 rounded-xl hover:bg-[#e6b400] transition-all text-center cursor-hover flex items-center justify-center gap-2"
                    >
                      {loading ? 'Scheduling...' : 'Schedule Invitation'}
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <motion.div
                    className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <FiCheckCircle size={70} className="text-[#FFC800] animate-bounce" />
                    <h4 className="text-2xl font-bold font-clash">Call Scheduled!</h4>
                    <p className="text-neutral-500 max-w-sm text-sm">
                      Discovery call confirmed for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {selectedTime}. A calendar invitation with Google Meet links has been sent to your email.
                    </p>
                    <button
                      onClick={closeBooking}
                      className="mt-6 bg-neutral-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-all cursor-hover"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
