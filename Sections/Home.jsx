'use client'
import React, { useState, useEffect } from 'react'
import {Inter} from 'next/font/google'
import {FaArrowRight } from 'react-icons/fa'
import { LuMouse } from "react-icons/lu";
import Spline from '@splinetool/react-spline';
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
   
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  return (
    <div className=' p-4 flex gap-6 w-full h-auto bg-[#FAFAF7] justify-center '>
      <div className='flex flex-col  gap-8 m-3 p-4'>
        <div className='flex bg-white p-2 px-4 rounded-full shadow-md justify-center items-center max-w-max' > 
          <div className='w-2 h-2 bg-[#FFC800] rounded-full mr-4'></div>
          <p className="text-[#6A6A6A] font-medium leading-5" >Award-winning digital design studio</p>
        </div>

        <div className='flex flex-col gap-2 text-7xl font-bold leading-[55.89px] tracking-[-1.44px] '>

          <h2>We Don&apos;t</h2>
          <h2>Just Design</h2>
          <h2>We Create</h2>
          <h2>Experiences</h2>
        </div>

        {/* max-w-[350px] */}
        <div className='max-w-87.5'>
          <p className={`${inter.className} font-normal text-[16px] leading-relaxed`}>Helping ambitious brands transform ideas into unforgettable digital products through design, development, and branding.</p>
        </div>

        <div className='flex gap-4 mt-4'>
          <button className='bg-[#040300] text-white px-4 py-2 rounded-2xl  font-inter text-sm font-semibold leading-5'>Start Your Project
            <FaArrowRight className='ml-3 inline-block' />
          </button>
          <button className='bg-white border-[#E7E7E7] border-2 text-[#040300] px-4 py-2 rounded-full font-inter text-sm font-semibold leading-5'>View Our Work</button>
        </div>

        <div className='flex gap-2 mt-6 items-center text-[#040300] font-inter text-sm font-medium leading-5 '>
          <LuMouse size={34} className='text-[#E7E7E7] text-2xl ' />
          <p className={ `${inter.className} text-[#6A6A6A] text-sm leading-4 font-Regular`}> Scroll to explore</p>
        </div>
      </div>


      <div className="flex-1 min-w-0 flex flex-col items-center justify-center" > 
        <div className="w-full h-[550px] flex items-center justify-center">
          {isMounted && (
            <Spline
              scene="https://prod.spline.design/n8f5hm4KY4u2N5WR/scene.splinecode" 
            />
          )}
        </div>

        <div className='flex bg-white p-2 px-4 rounded-full shadow-md justify-center items-center max-w-max mt-4' > 
          <div className='w-2 h-2 bg-[#FFC800] rounded-full mr-4'></div>
          <p className={ `${inter.className} text-[#6A6A6A] text-sm leading-4 font-medium`}>Interactive - move your cursor</p> </div>
      </div>
    </div>
  )
}
