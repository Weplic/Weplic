'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/**
 * BookingSteps — State Pattern
 *
 * Each step is a self-contained component that receives shared state
 * and action callbacks. The BOOKING_STEPS config defines the state
 * machine: which component renders for each state, and the valid
 * transitions (next/prev).
 *
 * Adding a new step = adding one entry + one component. No changes
 * to the orchestrator (BookingModalInner).
 */

// ── Time Slots Data ──
const mockTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
]

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// ── Step 1: Date & Time Selection ──
function DateTimeStep({ data, onChange, onNext }) {
  const today = new Date()

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(year, month + 1, 0).getDate()
    const result = []
    const firstDayIndex = new Date(year, month, 1).getDay()
    for (let i = 0; i < firstDayIndex; i++) {
      result.push(null)
    }
    for (let d = 1; d <= days; d++) {
      result.push(new Date(year, month, d))
    }
    return result
  }

  const days = getDaysInMonth(data.currentMonth)

  const nextMonth = () => {
    onChange({
      currentMonth: new Date(data.currentMonth.getFullYear(), data.currentMonth.getMonth() + 1, 1)
    })
  }

  const prevMonth = () => {
    const prev = new Date(data.currentMonth.getFullYear(), data.currentMonth.getMonth() - 1, 1)
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
      onChange({ currentMonth: prev })
    }
  }

  const handleDateSelect = (day) => {
    if (!day || day < today.setHours(0, 0, 0, 0) && day.getDate() !== today.getDate()) return
    onChange({ selectedDate: day, selectedTime: '' })
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <h4 className="text-xl font-bold font-clash mb-6">Select a Date & Time</h4>
        <div className="flex gap-6 h-[400px]">
          {/* Interactive Calendar view */}
          <div className="flex-1 select-none">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm">
                {monthNames[data.currentMonth.getMonth()]} {data.currentMonth.getFullYear()}
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
                const isPast = day < today.setHours(0, 0, 0, 0) && day.getDate() !== today.getDate()
                const isSelected = data.selectedDate && day.getDate() === data.selectedDate.getDate() && day.getMonth() === data.selectedDate.getMonth() && day.getFullYear() === data.selectedDate.getFullYear()

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
          {data.selectedDate && (
            <motion.div
              className="w-[180px] overflow-y-auto flex flex-col gap-2 pr-1 scrollbar-thin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2 block">
                {data.selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              {mockTimeSlots.map((slot) => {
                const isTimeSelected = data.selectedTime === slot
                return (
                  <button
                    key={slot}
                    onClick={() => onChange({ selectedTime: slot })}
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
        disabled={!data.selectedDate || !data.selectedTime}
        onClick={onNext}
        className="w-full bg-neutral-900 text-white font-semibold py-3.5 rounded-xl hover:bg-neutral-800 transition-all text-center cursor-hover disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next Step
      </button>
    </div>
  )
}

// ── Step 2: Details / Confirmation ──
function DetailsStep({ data, onChange, onPrev, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <button
            type="button"
            onClick={onPrev}
            className="text-xs text-neutral-400 font-bold hover:text-black flex items-center gap-1 cursor-hover"
          >
            <FiChevronLeft /> BACK TO DATE
          </button>
          <h4 className="text-xl font-bold font-clash mt-3">Confirm Call Details</h4>
          <p className="text-sm text-neutral-500 mt-1">
            Booking on {data.selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {data.selectedTime}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Your Name *</label>
            <input
              type="text"
              required
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Sarah Chen"
              className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Your Email *</label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="sarah@nexus.finance"
              className="border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">What would you like to discuss? *</label>
            <textarea
              required
              rows={4}
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value })}
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
  )
}

// ── Step 3: Success Confirmation ──
function SuccessStep({ data, onClose }) {
  return (
    <motion.div
      className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <FiCheckCircle size={70} className="text-[#FFC800] animate-bounce" />
      <h4 className="text-2xl font-bold font-clash">Call Scheduled!</h4>
      <p className="text-neutral-500 max-w-sm text-sm">
        Discovery call confirmed for {data.selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {data.selectedTime}. A calendar invitation with Google Meet links has been sent to your email.
      </p>
      <button
        onClick={onClose}
        className="mt-6 bg-neutral-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-all cursor-hover"
      >
        Done
      </button>
    </motion.div>
  )
}

/**
 * BOOKING_STEPS — State Machine Configuration
 *
 * Defines the valid states, their components, and transitions.
 * The orchestrator (BookingModalInner) simply looks up the current
 * step and renders the corresponding component.
 */
export const BOOKING_STEPS = {
  DATE_TIME: {
    id: 'DATE_TIME',
    component: DateTimeStep,
    next: 'DETAILS',
    prev: null,
  },
  DETAILS: {
    id: 'DETAILS',
    component: DetailsStep,
    next: 'SUCCESS',
    prev: 'DATE_TIME',
  },
  SUCCESS: {
    id: 'SUCCESS',
    component: SuccessStep,
    next: null,
    prev: null,
  },
}

/** The initial step when the modal opens */
export const INITIAL_STEP = 'DATE_TIME'
