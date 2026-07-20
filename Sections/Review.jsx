import React from 'react'
import {Inter} from 'next/font/google'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })
export default function Review() {
    
     const testimonials = [
    {
      quote: "WEPLIC transformed our product in ways we couldn't have imagined. Their attention to detail and strategic design thinking elevated our entire brand. Conversion rate increased 40% within the first month.",
      name: "Sarah Chen",
      role: "CTO · Nexus Finance",
      avatar: "/Image/Photo.png",
      elevated: false
    },
    {
      quote: "We interviewed a dozen agencies before choosing WEPLIC. Three months later, our Series A was oversubscribed. Investors consistently cited our product's design as a competitive differentiator.",
      name: "Marcus Williams",
      role: "Co-founder & CEO · Luminary AI",
      avatar: "/Image/Photo.png",
      elevated: true
    },
    {
      quote: "Working with WEPLIC felt like having a world-class design team embedded in our company. They understood healthcare UX deeply and delivered a patient experience our whole team is genuinely proud of.",
      name: "Priya Patel",
      role: "Head of Product · Vera Health",
      avatar: "/Image/Photo.png",
      elevated: false
    },
  ]

  return (
    <div className='flex flex-col  gap-8 py-12 px-6 bg-[#FAFAF7]'>
      <div className='flex flex-col gap-6 px-5 py-6'>
        <p className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}
        >CLIENT LOVE</p>
        <h2 className=' font-clash font-bold text-[56.45px] leading-18 tracking-[-1.41px] w-85'  >Words from our clients</h2>
      </div>


      <div className=' w-full py-20 px-6 grid grid-cols-3 gap-8 items-center'>
      {testimonials.map(({ quote, name, role, avatar, elevated }, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm ${elevated ? 'translate-y-7' : ''}`}
        >
          <div className='flex gap-1'>  
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className='text-[#FFC800] text-sm' />
            ))}
          </div>

          <p className={`${inter.className} text-[15px] leading-relaxed text-[#1A1A1A]`}>
            &quot;{quote}&quot;
          </p>

          <div className='flex items-center gap-3 mt-auto'>
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
            <div className='flex flex-col'>
              <h4 className={`${inter.className} text-sm font-semibold text-[#1A1A1A]`}>{name}</h4>
              <p className={`${inter.className} text-xs text-[#6A6A6A]`}>{role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}
