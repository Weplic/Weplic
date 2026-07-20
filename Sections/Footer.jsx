import FooterAbout from '@/Components/FooterAbout'
import FooterContact from '@/Components/FooterContact'
import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[#0A0A0A] flex flex-col  py-20 px-10 gap-10'>
      <FooterAbout />
      <hr className='border-[#6A6A6A]' />
      <FooterContact />
      <hr className='border-[#6A6A6A]' />
        <div className='flex justify-between '>
          <div>
            <p className='text-[#6A6A6A] text-sm leading-5 font-regular'>© 2024 WePlic. All rights reserved.</p>
          </div>
          <div  className='flex gap-4 list-none'>
            <li className='text-[#6A6A6A] text-sm leading-5 font-regular'>Privacy Policy</li>
            <li className='text-[#6A6A6A] text-sm leading-5 font-regular'>Terms of Service</li>
            <li className='text-[#6A6A6A] text-sm leading-5 font-regular'>Cookie Policy</li>
          </div>
        </div>
    </div>
  )
}
