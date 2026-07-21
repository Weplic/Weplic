'use client'
import React from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FaArrowLeft } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl sm:text-5xl font-bold font-clash mt-2">Privacy Policy</h1>
          <p className={`${inter.className} text-sm text-[#6A6A6A] mt-2`}>
            Last updated: July 2026 · Weplic Digital Studio
          </p>
        </header>

        <section className={`${inter.className} flex flex-col gap-6 leading-relaxed text-neutral-700`}>
          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">1. Introduction</h2>
            <p>
              Weplic (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our design and development services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when submitting project briefs, scheduling calls, or contacting us directly. This includes your name, email address, company name, project budget, and any details provided in your project description.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide, operate, and maintain our digital agency services.</li>
              <li>To process and respond to client briefs and inquiry requests.</li>
              <li>To communicate project updates, proposals, and invoices.</li>
              <li>To improve web performance, UX metrics, and service offerings.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">4. Data Sharing & Security</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We employ industry-standard encryption and security measures to ensure your data remains safe and confidential.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please email us at{' '}
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
