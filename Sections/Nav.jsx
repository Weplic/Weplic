import React from "react";

export default function Nav() {
  return (
    
      <div className="flex justify-between items-center p-4 bg-[#FAFAF7] text-black h-[80] ">
        <div  className="flex items-center gap-2 w-[120] h-[60]" >
          <img src="Image/Weplic_Logo.jpeg" alt="Weplic Logo"  className="h-full w-full object-cover" />
        </div>
        <div className="flex gap-8 space-x-4 list-none  text-gray-500  font-inter text-sm font-medium leading-5">
          <li>Services</li>
          <li>Work</li>
          <li>Process</li>
          <li>About</li>
        </div>
        <div className="flex  ">
          <button className=" text-gray-500  font-inter text-sm font-medium leading-5">
            Contact
          </button>
          <button className="bg-[#FFC800]   px-4 py-2  rounded-2xl ml-4 font-inter text-sm font-semibold leading-5">
            Start Project
          </button>
        </div>
      </div>
  );
}
