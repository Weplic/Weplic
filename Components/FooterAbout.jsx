import React from "react";
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function FooterAbout() {

 const About=[{
  "title":"Services",
  "list":["Web Design","App Development","UI/UX Design","Branding","Design Systems"]
 },
 {
  "title":"Company",
  "list":["About","Works","Process","Careers","Contact",]
 },
 {
  "title":"Contact",
  "list":["hello.weplic@gmail.com","Book a Call","Twitter","LinkedIn","Dribbble"]
 }
]

  return (
    <div className="flex justify-between items-center gap-4 ">
      <div className="flex flex-col gap-6">
        <h2 className="text-[#FFFFFF] uppercase font-bold text-3xl leading-9">WEPLIC</h2>
        <p className={`${inter.className} text-[#6A6A6A] text-sm leading-5 font-regular max-w-80`}>
          Where Brands Become Experiences. A premium creative studio building
          digital products that move people.
        </p>
        <div className="flex gap-4">
          <a href="" className="text-[#6A6A6A] ">
            Twitter
          </a>
          <a href="" className="text-[#6A6A6A] ">
            LinkedIn
          </a>
          <a href="" className="text-[#6A6A6A] ">
            Dribbble
          </a>
          <a href="" className="text-[#6A6A6A] ">
            Behance
          </a>
        </div>
      </div>

      {About.map((item, index) => (
        <div key={index} className={`${inter.className} flex flex-col gap-4 m-4`}>
          <h2 className="text-[#FFFFFF] opacity-30 uppercase font-medium text-sm leading-4 tracking-[2px]">{item.title}</h2>
          <ul className="flex flex-col gap-2">
            {item.list.map((subItem, subIndex) => (
              <li key={subIndex}>
                <a href="" className="text-[#6A6A6A] font-regular text-sm leading-5">
                  {subItem}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

    </div>
  );
}
