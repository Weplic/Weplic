'use client'
import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(undefined)

export function AppProvider({ children }) {
  const [isBriefOpen, setIsBriefOpen] = useState(false)
  const [preselectedService, setPreselectedService] = useState('')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)

  const openBrief = (service = '') => {
    setPreselectedService(service)
    setIsBriefOpen(true)
  }

  const closeBrief = () => {
    setIsBriefOpen(false)
    setPreselectedService('')
  }

  const openBooking = () => {
    setIsBookingOpen(true)
  }

  const closeBooking = () => {
    setIsBookingOpen(false)
  }

  const openCaseStudy = (caseStudy) => {
    setActiveCaseStudy(caseStudy)
  }

  const closeCaseStudy = () => {
    setActiveCaseStudy(null)
  }

  return (
    <AppContext.Provider
      value={{
        isBriefOpen,
        preselectedService,
        openBrief,
        closeBrief,
        isBookingOpen,
        openBooking,
        closeBooking,
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
