'use client'
import React from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FaArrowLeft } from 'react-icons/fa'

const inter = Inter({ subsets: ['latin'] })

export default function TermsOfService() {
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
          <h1 className="text-4xl sm:text-5xl font-bold font-clash mt-2">Terms of Service</h1>
          <p className={`${inter.className} text-sm text-[#6A6A6A] mt-2`}>
            Last updated: July 2026 · Weplic Digital Studio
          </p>
        </header>

        <section className={`${inter.className} flex flex-col gap-6 leading-relaxed text-neutral-700`}>
          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">1. Agreement to Terms</h2>
            <p>
              By accessing our website or engaging Weplic for design, branding, or software development services, you agree to be bound by these Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">2. Scope of Services & Deliverables</h2>
            <p>
              Weplic provides custom digital design, UI/UX, software engineering, and branding services. Specific scope, timelines, deliverables, and payment terms for each engagement are outlined in individual project agreements or statements of work.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">3. Intellectual Property Rights</h2>
            <p>
              Upon full payment of agreed fees, client receives full ownership rights to final design deliverables and production codebases created specifically for their project, subject to standard open-source software license terms where applicable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">4. Limitation of Liability</h2>
            <p>
              Weplic shall not be liable for any indirect, incidental, or consequential damages resulting from the use of delivered software or services beyond the total amount paid under the relevant project contract.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#040300] mb-2 font-clash">5. Contact Information</h2>
            <p>
              For questions regarding these Terms, contact us at{' '}
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
