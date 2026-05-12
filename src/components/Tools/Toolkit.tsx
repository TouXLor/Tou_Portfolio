import React, { useRef } from "react";
import {
  SiFigma,
  SiWebflow,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiWordpress,
  SiGsap,
} from "react-icons/si";
import { GlobalGrid } from "../AboutMe/ScrollUpColumnAnimation";

export default function Toolkit() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      aria-labelledby="toolkit-heading"
      className="relative overflow-hidden w-full"
    >
      <GlobalGrid sectionRef={sectionRef} />
      <div className="w-[90%] max-w-auto mx-auto py-10 md:py-16 lg:py-20">
        <h2
          id="toolkit-heading"
          className="font-anton text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl mb-12 md:mb-16 tracking-wide uppercase text-cornflower"
        >
          My Creative Toolkit
        </h2>

        <div className="flex flex-col w-full">
          {/* Top Row - 3 Items */}
          {/* ✅ A11Y/SEO FIX: Added aria-label to describe the grouping */}
          <ul
            aria-label="Core Design and Development Tools"
            className="flex w-full border-b border-rich-black/25 h-48 md:h-64 m-0 p-0 list-none"
          >
            {/* Figma */}
            {/* ✅ A11Y FIX: Added title attribute for hover tooltips */}
            <li
              title="Figma"
              className="flex-1 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">Figma</span>
              <SiFigma
                aria-hidden="true"
                className="w-12 h-16 md:w-16 md:h-24 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* Webflow */}
            <li
              title="Webflow"
              className="flex-[2] border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">Webflow</span>
              <SiWebflow
                aria-hidden="true"
                className="w-24 h-10 md:w-36 md:h-16 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* React */}
            <li
              title="React"
              className="flex-1 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">React</span>
              <SiReact
                aria-hidden="true"
                className="w-16 h-16 md:w-24 md:h-24 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
          </ul>

          {/* Bottom Rows (Wraps to 2 rows on mobile, 1 row on desktop) */}
          {/* ✅ A11Y/SEO FIX: Added aria-label to describe the grouping */}
          <ul
            aria-label="Frontend Frameworks and Technologies"
            className="flex flex-wrap w-full m-0 p-0 list-none"
          >
            {/* --- MIDDLE ROW ON MOBILE (3 Items @ 33.33%) --- */}

            {/* GSAP (GreenSock) */}
            <li
              title="GSAP (GreenSock Animation Platform)"
              className="w-1/3 lg:flex-1 h-32 md:h-40 border-b lg:border-b-0 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">
                GSAP (GreenSock Animation Platform)
              </span>
              <SiGsap
                aria-hidden="true"
                className="w-12 h-12 md:w-16 md:h-16 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* Tailwind */}
            <li
              title="Tailwind CSS"
              className="w-1/3 lg:flex-1 h-32 md:h-40 border-b lg:border-b-0 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">Tailwind CSS</span>
              <SiTailwindcss
                aria-hidden="true"
                className="w-10 h-6 md:w-14 md:h-8 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* HTML */}
            {/* Note: border-r is only applied on Desktop here, because it hits the right edge on mobile! */}
            <li
              title="HTML5"
              className="w-1/3 lg:flex-1 h-32 md:h-40 border-b lg:border-b-0 lg:border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">HTML5</span>
              <SiHtml5
                aria-hidden="true"
                className="w-8 h-8 md:w-12 md:h-12 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>

            {/* --- BOTTOM ROW ON MOBILE (4 Items @ 25%) --- */}

            {/* CSS */}
            <li
              title="CSS3"
              className="w-1/4 lg:flex-1 h-32 md:h-40 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">CSS3</span>
              <SiCss
                aria-hidden="true"
                className="w-8 h-8 md:w-12 md:h-12 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* JavaScript */}
            <li
              title="JavaScript"
              className="w-1/4 lg:flex-1 h-32 md:h-40 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">JavaScript</span>
              <SiJavascript
                aria-hidden="true"
                className="w-8 h-8 md:w-12 md:h-12 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* TypeScript */}
            <li
              title="TypeScript"
              className="w-1/4 lg:flex-1 h-32 md:h-40 border-r border-rich-black/25 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">TypeScript</span>
              <SiTypescript
                aria-hidden="true"
                className="w-8 h-8 md:w-12 md:h-12 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
            {/* WordPress */}
            <li
              title="WordPress"
              className="w-1/4 lg:flex-1 h-32 md:h-40 flex items-center justify-center hover:bg-rich-black transition-colors duration-300 group cursor-pointer"
            >
              <span className="sr-only">WordPress</span>
              <SiWordpress
                aria-hidden="true"
                className="w-8 h-8 md:w-12 md:h-12 text-rich-black group-hover:text-oat-cream transition-colors duration-300"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
