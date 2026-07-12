import React from 'react'
import Nav from '../Sections/Nav.jsx'
import Home from '@/Sections/Home.jsx'
import HomeStats from '@/Sections/HomeStats.jsx'
import Philosophy from '@/Sections/Philosophy.jsx'
import Works from '@/Sections/Works.jsx'
import Process from '@/Sections/Process.jsx'
import About from '@/Sections/About.jsx'
import Review from '@/Sections/Review.jsx'
import Stats from '@/Sections/Stats.jsx'
import TechStack from '@/Sections/TechStack.jsx'
import Contact from '@/Sections/Contact.jsx'
import  FAQ  from '@/Sections/FAQ.jsx'
import Services from '@/Sections/Services.jsx'
import Footer from '@/Sections/Footer.jsx'

export default function page() {
  return (
    <>
      <Nav />
      <Home />
      <HomeStats /> 
      <Philosophy />
      <Services/>
      <Works />
      <Process />
      <About />
      <Review />
      <Stats />
      <TechStack />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}
