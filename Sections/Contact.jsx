import React from 'react'
import { IoArrowForward } from "react-icons/io5";

import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <div className='w-full h-screen bg-[#011111] flex justify-center items-center p-4'>
      <div className='max-w-270 w-full text-center flex flex-col items-center'>
        <p className= {`${inter.className} text-[#ffc800] text-sm leading-4 font-semibold`}>Ready to begin?</p>
        <h2 className='text-white text-[85px] leading-20 font-bold mb-4'>Let's Build Something <span className='text-[#ffc800]'>Extraordinary</span>.</h2>
        <p className={ `${inter.className} text-sm font-regular text-[#6A6A6A] mb-6 max-w-140` }>Whether you have a polished brief or just a spark of an idea — let's talk. Book a free 30-minute discovery call with our team.</p>
        <div className={`${inter.className} flex justify-center items-center gap-4`}>
            <div className='bg-[#FFC800] flex gap-3  items-center font-semibold p-5 rounded-full mr-4'> 
            <button >Book a Discovery Call
            </button>
            <IoArrowForward className=' inline-block'/>
            </div>
            <div className='bg-black border flex gap-3 items-center border-gray-300  text-white  font-semibold p-5 rounded-full'>
            <button >Send a Brief</button>
            <IoArrowForward className=' inline-block rotate-300' />
            </div>
        </div>
      </div>
    </div>
  )
}
