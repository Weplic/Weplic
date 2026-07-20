import React from 'react'
import {Inter} from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function Philosophy() {

  const philosophy = [
    {
      "title":"Human First",
      "description":"Every pixel serves a purpose. We design for people, not trends."
    },
    {
      "title":"Quality Obsessed",
      "description":"We refuse to ship work we wouldn't be proud to put our name on."
    },
    {
      "title":"Result Driven",
      "description":"Beautiful design that converts. Every project is a business partnership."
    }
  ]

  return (
    <div className='bg-[#111111] w-full h-screen p-6 flex  flex-col gap-6 justify-around'>
      <div className='flex flex-col gap-4 w-70 mt-10'>
        <h2 className={`${inter.className} text-xs font-semibold text-[#FFC800]`}>OUR PHILOSOPHY</h2>
        <p className={`${inter.className} text-sm font-regular leading-relaxed text-[#6A6A6A]`}>We believe the best digital products are crafted with intent, obsession, and a deep understanding of human behavior.</p>
      </div>

      <div>
        <p className={`${inter.className} text-[51px] font-bold text-[#ffff] leading-14 tracking-[-1.27px] w-full max-w-[1081px] `}>&quot;Design is not decoration. It&apos;s the decisive difference between a product people merely use — and one they <span className='text-[#FFC800]'>love.</span>&quot;</p>
      </div>

      <div className='flex   w-full  gap-10 justify-between mt-10 '>
        {philosophy.map((item, index) => (

          <div key={index} className='flex gap-4 flex-col w-full max-w-1/5 '>
            <hr className="border-2 border-[#FFC800] w-1/6 " />
            {/* //Clash Display */}
            <h3 className={` text-[20px] font-semibold text-[#ffff] leading-7`}>{item.title}</h3>    
            <p className={`${inter.className} text-sm font-regular leading-7 text-[#6A6A6A]`}>{item.description}</p>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  )
}
