import React from 'react'
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function HomeStats() {
  const stats = [
    { label: 'Projects Delivered', value: '100+' },
    { label: 'Countries Served', value: '20+' },
    { label: 'Client Satisfaction', value: '95%' },
    {label: 'Users Impacted', value: '5M+' }
  ];
  return (
    <div className='bg-[#FAFAF7] w-full p-6'>
      <hr className='border-[#E7E7E7] border-s-4 ' />
    <div className='flex gap-50'>
   
      {stats.map((stat, index) => (
        <div  
        className='flex  gap-2  flex-col  justify-center p-4  text-[#040300] ' 
         key={index}>
          <h3 className='text-4xl font-bold leading-10' >{stat.value}</h3>
          <p className={ ` ${inter.className} text-sm font-regular leading-5 justify-center text-[#6A6A6A]`}>{stat.label}</p>
        </div>
      ))}
    </div>
    </div>
  )
}
