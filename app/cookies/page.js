'use client'
import React from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FaArrowLeft } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#040300] px-6 md:px-16 lg:px-24 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#6A6A6A] hover:text-[#040300] transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          Back to Home
        </Link>

        <header className="border-b border-neutral-200 pb-8">
          <span className="text-xs font-semibold uppercase tracking-[3px] text-amber-500">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-clash mt-2">Cookie Policy</h1>
          <p className={`${inter.className} text-sm text-[#6A6A6A] mt-2`}>
            Last updated: July 2026 · Weplic Digital Studio
          </p>
        </header>

        <section className={`${inter.className} flex flex-col gap-6 leading-relaxed text-neutral-700`}>
          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your browser or device when you visit our website. They help improve site performance, remember user preferences, and provide analytical data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">2. How We Use Cookies</h2>
            <p>
              Weplic uses essential cookies required for site navigation and performance optimization. We may also use privacy-focused analytics cookies to understand site traffic patterns and improve user experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">3. Managing Cookies</h2>
            <p>
              You can choose to disable or block cookies through your browser settings at any time. Note that disabling essential cookies may affect site functionality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">4. Questions</h2>
            <p>
              If you have any questions about our Cookie Policy, reach out to us at{' '}
              <a href="mailto:hello.weplic@gmail.com" className="text-amber-600 font-semibold underline">
                hello.weplic@gmail.com
              </a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
