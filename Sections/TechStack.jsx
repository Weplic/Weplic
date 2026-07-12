const skills = [
  "Figma",
  "Framer",
  "React",
  "Next.js",
  "Flutter",
  "Swift",
  "Node.js",
  "Three.js",
  "Webflow",
  "GSAP",
  "TypeScript",
  "Tailwind CSS",
];

export default function TechStack() {
  return (
    <section className="py-24 bg-[#F4F4F2]">
      <div className="container mx-auto px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">
          Technology
        </span>

        <h2 className="mt-4 text-5xl font-bold tracking-tight">
          Our stack.
        </h2>

        <p className="mt-6  text-lg font-regular text-[#6A6A6A]  text-muted-foreground">
          We work with best-in-class tools across design and engineering to
          deliver products that are fast, beautiful, and maintainable.
        </p>

        <div className="mt-16 flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-2xl border border-amber-50 font-clash-semibold  bg-[#FFFFFF] px-8 py-5 text-lg leading-6  shadow-sm "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
