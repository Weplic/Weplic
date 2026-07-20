import { FaPlus, FaMinus } from "react-icons/fa6";
const services = [
  {
    number: "01",
    title: "Website Design & Development",
    description:
      "From concept to code — immersive websites that combine stunning visual design with rock-solid engineering. Fast, accessible, and built to convert.",
    tags: ["Next.js", "Webflow", "Framer"],
    active: true,
  },
  {
    number: "02",
    title: "Mobile App Design & Development",
    active: false,
  },
  {
    number: "03",
    title: "UI/UX Design",
    active: false,
  },
  {
    number: "04",
    title: "Brand Identity",
    active: false,
  },
  {
    number: "05",
    title: "Product Design",
    active: false,
  },
  {
    number: "06",
    title: "Design Systems",
    active: false,
  },
];

export default function Services() {
  return (
    <section className="bg-[#F4F4F2] py-28">
      <div className=" px-6">
        {/* Heading */}
        <h2 className="max-w-md text-[60px] font-semibold leading-[1.05] tracking-[-0.04em] text-[#181818]">
          Services built
          <br />
          for bold brands.
        </h2>

        {/* Services */}
        <div className="mt-20 border-t border-[#E8E8E8]">
          {services.map((service) => (
            <div
              key={service.number}
              className="border-b border-[#E8E8E8] py-8"
            >
              <div className="flex items-start justify-between gap-10">
                <div className="flex gap-6">
                  <span className="mt-1 w-8 text-xs text-[#8A8A8A]">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-[30px] font-medium text-[#181818]">
                      {service.title}
                    </h3>

                    {service.active && (
                      <>
                        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#777]">
                          {service.description}
                        </p>

                        <div className="mt-6 flex gap-2">
                          {service.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#181818] px-4 py-2 text-xs font-medium text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-1 text-lg text-[#181818]">
                  {service.active ? (
                    <FaMinus className="text-[#F4B400]" />
                  ) : (
                    <FaPlus />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}