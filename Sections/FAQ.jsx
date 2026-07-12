import { IoArrowForward } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import {Inter} from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const faqs = [
  "How long does a typical project take?",
  "What is your pricing model?",
  "Do you work with early-stage startups?",
  "What makes WEPLIC different from other agencies?",
  "Do you provide ongoing support after launch?",
];

export default function FAQSection() {
  return (
    <section className="bg-[#F8F8F5] py-28">
      <div className="mx-auto gap-20 px-6 flex flex-col ">
        {/* Left Content */}
        <div>
          <p className={`${inter.className} mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FFC400]`}>
            FAQ
          </p>

          <h2 className="text-[58px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#181818]">
            Common
            <br />
            questions.
          </h2>

          <p className={`${inter.className} mt-6 text-[15px] leading-7 text-[#777]`}>
            Can't find your answer? Drop us a line anytime.
          </p>

          <a
            href="mailto:hello@weplic.com"
            className="mt-8 inline-flex items-center gap-2 border-b border-black pb-1 text-[15px] font-medium text-black"
          >
            hello@weplic.com
            <IoArrowForward className="text-sm" />
          </a>
        </div>

        {/* FAQ List */}
        <div className="border-t border-[#E6E6E6]">
          {faqs.map((faq) => (
            <div
              key={faq}
              className="flex items-center justify-between border-b border-[#E6E6E6] py-8"
            >
              <h3 className="text-[18px] font-medium text-[#181818]">
                {faq}
              </h3>

              <IoIosArrowDown className="text-lg text-[#666]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}