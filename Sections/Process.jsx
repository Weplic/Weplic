import React from "react";
import { Inter } from "next/font/google";
import { BsArrowRightShort } from "react-icons/bs";
const inter = Inter({
  subsets: ["latin"],
});
export default function Process() {
    const processData = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Deep dives into your business, audience, and goals. Stakeholder interviews, competitive analysis, and market research.",
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "Insights become a clear roadmap. Information architecture, user flows, and content strategy defined.",
  },
  {
    id: "03",
    title: "Wireframing",
    description:
      "Low-fidelity layouts that validate concepts quickly before investing in pixels.",
  },
  {
    id: "04",
    title: "UI Design",
    description:
      "Pixel-perfect interfaces crafted with intention. Every component, every spacing decision considered.",
  },
  {
    id: "05",
    title: "Prototype",
    description:
      "Interactive prototypes that feel like the real product—for stakeholder alignment and user testing.",
  },
  {
    id: "06",
    title: "Development",
    description:
      "Clean, scalable code that brings the design to life with performance and accessibility at the core.",
  },
  {
    id: "07",
    title: "Testing",
    description:
      "Rigorous QA across devices, browsers, and user groups. We don't ship until it's right.",
  },
  {
    id: "08",
    title: "Launch",
    description:
      "A coordinated launch strategy with post-launch monitoring, analytics, and rapid iteration.",
  },
];
  return (
    <div className="flex flex-col  gap-8 p-5 bg-[#FAFAF7] ">
      <div className="flex flex-col gap-6 p-5">
        <p
          className={`${inter.className} text-sm font-semibold leading-4 tracking-[2.4px] text-[#FFC800]`}
        >
          HOW WE WORK
        </p>
        <h2 className="font-clash font-bold text-[40px] leading-12 tracking-[-0.99px] w-75">
          Our Proven Process
        </h2>
        <p className={`${inter.className} text-sm font-regular leading-6`}>
          Transparent and collaborative — you&apos;re informed at every stage. No
          surprises, no delays.{" "}
        </p>
        <button className="flex bg-[#FFC800] text-[#000000] font-bold py-3 max-w-max px-6 rounded-full ">
          <p>Start a Project</p>
          <BsArrowRightShort size={22} className="ml-2" />
        </button>
      </div>

      <div className="py-20 bg-[#FAFAF7]">
        <div className=" max-w-6xl px-6">
          {processData.map((step, index) => (
            <div key={step.id} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-xs font-semibold">
                  {step.id}
                </div>

                {index !== processData.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-neutral-300"></div>
                )}
              </div>

              <div className="pb-12">
                <h3 className="text-2xl font-semibold">{step.title}</h3>

                <p className="mt-2 text-neutral-500 leading-7">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
