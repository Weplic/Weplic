'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/Components/MagneticButton";
import { useApp } from "@/Context/AppContext";

export default function Nav() {
  const { openBrief } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

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
      className={`sticky top-0 z-[100] flex justify-between items-center p-4 h-[80px] transition-all duration-500 ${
        scrolled
          ? "bg-[#FAFAF7]/80 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.06)]"
          : "bg-[#FAFAF7]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 2.4 }}
    >
      <motion.a
        href="#"
        className="flex items-center gap-2 w-[120px] h-[60px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
      >
        <Image
          src="/Image/Weplic_Logo.jpeg"
          alt="Weplic Logo"
          width={120}
          height={60}
          className="h-full w-full object-cover"
        />
      </motion.a>

      <div className="flex gap-8 space-x-4 list-none text-gray-500 font-inter text-sm font-medium leading-5">
        {navLinks.map((link, i) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.7 + i * 0.1 }}
            className="relative cursor-pointer group"
          >
            <a href={link.href}>{link.name}</a>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
          </motion.li>
        ))}
      </div>

      <div className="flex items-center">
        <a href="#contact">
          <motion.button
            className="text-gray-500 font-inter text-sm font-medium leading-5 relative group mr-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 3.1 }}
            whileHover={{ color: '#000' }}
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FFC800] transition-all duration-300 group-hover:w-full" />
          </motion.button>
        </a>

        <MagneticButton>
          <motion.button
            onClick={() => openBrief()}
            className="bg-[#FFC800] px-6 py-2.5 rounded-full font-inter text-sm font-semibold leading-5 text-black transition-all duration-300 hover:bg-[#e6b400] hover:shadow-[0_4px_20px_rgba(255,200,0,0.4)] cursor-pointer"
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
    </motion.div>
  );
}

