import { Inter } from "next/font/google";
import { BsArrowRightShort } from "react-icons/bs";

import WorkCard from "@/Components/WorkCard.jsx";



const inter = Inter({
  subsets: ["latin"],
});

export default function Works() {
  const worksData = [
  {
    id: 1,
    title: "Nexus Finance",
    description:
      "A complete digital banking experience — from identity to interface. We redesigned Nexus's entire product suite for web and mobile, building a design system from the ground up.",
    image: "/image/works.png",
    reverse: false,
    stats: [
      "340% increase in user retention",
      "4.9★ App Store rating",
      "Launched in 12 markets",
    ],
  },
  {
    id: 2,
    title: "Luminary AI",
    description:
      "Brand identity, design system, and marketing site for a Series A AI infrastructure company.",
    image: "/image/works.png",
    reverse: true,
    stats: [
      "$40M Series A closed post-launch",
      "Featured on Product Hunt",
      "500k site visits in first month",
    ],
  },
  {
    id: 3,
    title: "Vera Health",
    description:
      "Patient-facing app redesign for a leading telehealth platform. Simplifying complex healthcare workflows into elegant, stress-free interactions.",
    image: "/image/works.png",
    reverse: false,
    stats: [
      "62% reduction in appointment drop-off",
      "NPS score improved to 78",
      "Best Health App 2024 finalist",
    ],
  }
];

  return (
    <section className="bg-[#FAFAF7] py-24">

      <div className=" px-6">

        <div className="mb-16 flex items-end justify-between">

          <div>

            <p
              className={`${inter.className} mb-4 text-xs font-semibold uppercase tracking-[3px] text-amber-500`}
            >
              Featured Work
            </p>

            <h2 className="max-w-xl text-[60px] font-bold leading-tight">
              Work that speaks
              <br />
              for itself.
            </h2>

          </div>

          <button className="group flex items-center gap-2 font-medium">

            All Case Studies

            <BsArrowRightShort
              size={22}
              className="rotate-[315deg] transition group-hover:translate-x-1"
            />

          </button>

        </div>

        <div className="space-y-8">

          {worksData.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}

        </div>

      </div>

    </section>
  );
}