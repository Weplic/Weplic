'use client'
import React from 'react'
import Nav from '../Sections/Nav.jsx'
import Home from '@/Sections/Home.jsx'
import HomeStats from '@/Sections/HomeStats.jsx'
import Philosophy from '@/Sections/Philosophy.jsx'
import Works from '@/Sections/Works.jsx'
import Process from '@/Sections/Process.jsx'
import About from '@/Sections/About.jsx'
import Stats from '@/Sections/Stats.jsx'
import TechStack from '@/Sections/TechStack.jsx'
import Contact from '@/Sections/Contact.jsx'
import FAQ from '@/Sections/FAQ.jsx'
import Services from '@/Sections/Services.jsx'
import Footer from '@/Sections/Footer.jsx'
import PageLoader from '@/Components/PageLoader.jsx'
import ScrollProgress from '@/Components/ScrollProgress.jsx'

// Interactive drawers & modals & bottom dock
import ProjectDrawer from '@/Components/ProjectDrawer.jsx'
import BookingModal from '@/Components/BookingModal.jsx'
import CaseStudyDrawer from '@/Components/CaseStudyDrawer.jsx'
import BottomNavDock from '@/Components/BottomNavDock'

export default function Page() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <BottomNavDock />
      
      {/* Drawers/Modals */}
      <ProjectDrawer />
      <BookingModal />
      <CaseStudyDrawer />

      <Nav />
      <Home />
      <HomeStats /> 
      <Philosophy />
      
      <div id="services">
        <Services />
      </div>
      
      <div id="work">
        <Works />
      </div>
      
      <div id="process">
        <Process />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <Stats />
      <TechStack />
      
      <div id="faq">
        <FAQ />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
      
      <Footer />
    </>
  )
}
