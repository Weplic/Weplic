import React from 'react'
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function FooterContact() {
  return (
    <div className=' flex  items-center justify-between gap-10 '>
      <div className='flex flex-col gap-4'>
        <h2 className=' font-semibold text-xl text-white leading-5 '>Stay in the Loop</h2>
        <p className={`${inter.className} text-[#6A6A6A] text-sm leading-5 font-regular `}>
          Desingn insights, projects spotlight, and agency news.
        </p>
      </div>
      <div>
        <input type="text" placeholder='hello.weplic@gmail.com' className='bg-[#161616] border border-[#6A6A6A] rounded-full px-8 py-4 text-white text-opacity-25' />
        <button className='bg-[#FFC800] text-black font-semibold px-6 py-4 text-sm rounded-full ml-4'>Subscribe</button>
      </div>
    </div>
  )
}
