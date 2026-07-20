import React from 'react'
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function Stats() {
    const stats = [
    { label: 'Projects Delivered', value: '100+' },
    { label: 'Countries Served', value: '20+' },
    { label: 'Client Satisfaction', value: '95%' },
    {label: 'Users Impacted', value: '5M+' }
  ];
  return (
   
      <div className='flex bg-[#FFC800] gap-8 py-12 px-6 justify-around items-center'>
        {stats.map((stat, index) => (
          <div key={index} className='flex flex-col  justify-center p-4 text-[#040300]'>
            <h3 className='text-[72px] font-clash font-bold leading-20 text-[#1A1A1A]'>{stat.value}</h3>
            <p className={`${inter.className} text-sm leading-5 font-regular text-[#6A6A6A]`}>{stat.label}</p>
          </div>
        ))}
      </div>
   
  )
}
