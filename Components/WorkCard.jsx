import Image from "next/image";
import { BsArrowRightShort, BsCheck2 } from "react-icons/bs";

export default function WorkCard({ work }) {
  return (
    <div
      className={`grid overflow-hidden rounded-[28px] border border-neutral-200 bg-white lg:grid-cols-2 ${
        work.reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative h-full">
        <Image
          src={work.image}
          alt={work.title}
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="eager"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center p-10">

        <h3 className="mb-5 text-4xl font-bold">
          {work.title}
        </h3>

        <p className="mb-8 leading-7 text-neutral-500">
          {work.description}
        </p>

        <div className="space-y-3">
          {work.stats.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <BsCheck2 className="text-amber-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button className="group mt-8 flex w-fit items-center gap-2 font-medium">
          View Case Study

          <BsArrowRightShort
            size={22}
            className="transition group-hover:translate-x-1"
          />
        </button>

      </div>
    </div>
  );
}