import React from 'react'
import {Inter} from 'next/font/google'
import { FaDiamond,FaRegCircle ,FaRegSquareFull } from "react-icons/fa6";
import { BsDiamondHalf,BsDiamond,BsTriangle   } from "react-icons/bs";
const inter = Inter({ subsets: ['latin'] })
export default function About() {
    const features = [
    {
      Icon: FaDiamond,
      title: "Senior-Only Team",
      description: "No juniors. Every project is handled by senior designers and engineers with 8+ years of experience."
    },
    {
      Icon: BsDiamondHalf,
      title: "Design + Dev Under One Roof",
      description: "Seamless handoff because we do both. Your design is built exactly as intended — no interpretation errors."
    },
    {
      Icon: FaRegCircle,
      title: "Fast Without Compromise",
      description: "We move with startup speed without sacrificing craft. Most projects launch within 6–12 weeks."
    },
    {
      Icon: BsDiamond,
      title: "Strategic Thinking",
      description: "We think like founders. Every design decision is rooted in business goals, not aesthetic preference alone."
    },
    {
      Icon: BsTriangle,
      title: "Transparent Collaboration",
      description: "You're involved every step. Weekly check-ins, shared Figma files, and open communication always."
    },
    {
      Icon: FaRegSquareFull,
      title: "Built to Scale",
      description: "Design systems, codebases, and strategies engineered to grow with your company for years."
    },
  ]
  return (
    <div className='bg-[#111111] w-full p-6 flex flex-col  gap-10 justify-center '>
      <div className='flex flex-col  gap-8 p-6 mt-10'>
        <p className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}>
          WHY WEPLIC
        </p>
        <h2 className='text-white font-clash text-6xl font-bold tracking-[1.6px] w-130'>The studio that refuses to settle.</h2>
      </div>
      <div className='w-full p-6 grid grid-cols-3 gap-6 mt-4'>
        {features.map(({ Icon, title, description }, index) => (
        <div key={index} className='bg-[#1A1A1A] rounded-xl p-6 flex flex-col gap-4'>
          <Icon className='text-[#FFC800] text-xl' />
          <h3 className='text-[20px] leading-7 font-semibold text-white'>{title}</h3>
          <p className={`${inter.className} text-lg font-regular leading-6 text-[#6A6A6A]`}>
            {description}
          </p>
        </div>
      ))}
      </div>
    </div>
  )
}
