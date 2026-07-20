'use client'
import React, { useState } from 'react'
import { Inter } from 'next/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

const inter = Inter({ subsets: ['latin'] })

export default function FooterContact() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    // Mock subscription request
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1200)
  }

  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-xl text-white leading-5">Stay in the Loop</h2>
        <p className={`${inter.className} text-[#6A6A6A] text-sm leading-5 font-regular`}>
          Design insights, project spotlight, and agency news.
        </p>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              className="flex items-center gap-2 bg-[#FFC800]/10 border border-[#FFC800]/20 rounded-full px-6 py-4 text-[#FFC800] text-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <FiCheck className="text-lg" />
              <span>Successfully subscribed! Check your inbox soon.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 relative" key="form">
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="hello.weplic@gmail.com"
                  className="bg-[#161616] border border-[#333] rounded-full px-8 py-4 text-white placeholder-neutral-600 transition-all duration-300 focus:border-[#FFC800] focus:shadow-[0_0_20px_rgba(255,200,0,0.15)] focus:outline-none text-sm"
                />
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#FFC800] text-black font-semibold px-6 py-4 text-sm rounded-full ml-4 transition-all duration-300 hover:bg-[#e6b400] hover:shadow-[0_4px_20px_rgba(255,200,0,0.4)] disabled:opacity-50 cursor-hover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>
              {status === 'error' && (
                <motion.span
                  className="text-xs text-red-400 absolute top-full mt-2 left-6"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.span>
              )}
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
