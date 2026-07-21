'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/Components/MagneticButton";
import { useApp } from "@/Context/AppContext";

export default function Nav() {
  const { openBrief } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "About", href: "#about" },
  ];

  return (
    <motion.div
      className={`sticky top-0 z-[100] flex justify-between items-center px-5 sm:px-8 md:px-16 lg:px-24 h-[65px] sm:h-[80px] transition-all duration-500 ${
        scrolled
          ? "bg-[#FAFAF7]/80 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.06)]"
          : "bg-[#FAFAF7]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2.4 }}
    >
      {/* Brand Logo */}
      <motion.a
        href="#"
        className="flex items-center w-[95px] sm:w-[110px] h-[38px] sm:h-[44px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
      >
        <Image
          src="/Image/Weplic_logo.jpeg"
          alt="Weplic Logo"
          width={110}
          height={44}
          className="h-full w-full object-cover rounded-md"
        />
      </motion.a>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-8 space-x-4 list-none text-[#040300] font-inter text-sm font-semibold leading-5">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.7 + i * 0.1 }}
            className="relative cursor-pointer group"
          >
            <a href={link.href} className="hover:text-amber-600 transition-colors">{link.name}</a>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
          </motion.li>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center">
        <a href="#contact">
          <motion.button
            className="text-[#040300] font-inter text-sm font-semibold leading-5 relative group mr-6 hover:text-amber-600 transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.1 }}
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
          </motion.button>
        </a>

        <MagneticButton>
          <motion.button
            onClick={() => openBrief()}
            className="bg-[#FFC800] px-6 py-2.5 rounded-full font-inter text-sm font-bold leading-5 text-black transition-all duration-300 hover:bg-[#e6b400] hover:shadow-[0_4px_20px_rgba(255,200,0,0.4)] cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3.2, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Project
          </motion.button>
        </MagneticButton>
      </div>

      {/* Mobile Header Badge (Replaces Hamburger) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => openBrief()}
          className="bg-[#FFC800] px-4 py-1.5 rounded-full font-inter text-xs font-bold text-black shadow-xs cursor-pointer active:scale-95 transition-transform"
        >
          Start Brief ⚡
        </button>
      </div>
    </motion.div>
  );
}
