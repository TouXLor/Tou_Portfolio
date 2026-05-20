/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SlidingScares from "../../vids/SlidingScares.webm";

// Register ScrollTrigger just in case it isn't registered globally yet
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  // 1. Create the reference for the video
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const experiences = [
    {
      role: "Web Developer/Designer",
      company: "IH Concept",
      timeline: "2025 - Present",
    },
    {
      role: "Graphic/Brand Designer",
      company: "Golden Flavors",
      timeline: "2026 - Present",
    },
    {
      role: "Web Developer/Designer",
      company: "Treasure Taste",
      timeline: "2025 - 2025",
    },
  ];

  // 2. Set up the ScrollTrigger logic
  useEffect(() => {
    if (!videoRef.current) return;

    const st = ScrollTrigger.create({
      trigger: videoRef.current,
      // Change this from "top 85%" to "top 150%"
      // This forces the video to start buffering when it is still
      // half a screen's height BELOW the bottom of the user's monitor.
      start: "top 200%",
      onEnter: () => videoRef.current?.play(),
      onLeave: () => videoRef.current?.pause(),
      onEnterBack: () => videoRef.current?.play(),
      onLeaveBack: () => videoRef.current?.pause(),
    });

    return () => {
      st.kill(); // Cleanup on unmount
    };
  }, []);

  // Entrance animation for table rows
  useGSAP(
    () => {
      // 1. Add this early return guard
      if (!tableRef.current) return;

      // 2. Remove the optional chaining (?.) since we now know it exists
      const rows = gsap.utils.toArray(
        tableRef.current.querySelectorAll("tbody tr"),
      );

      if (rows.length > 0) {
        gsap.from(rows, {
          opacity: 0,
          x: 100, // slide in from right to left
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tableRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="w-full min-h-[60vh] text-rich-black font-poppins py-16 px-6 md:py-24 md:px-12 lg:px-24 flex flex-col"
    >
      {/* Top Header */}
      <div className="mb-16 md:mb-24">
        <h2
          id="experience-heading"
          className="text-cornflower text-[clamp(1.875rem,5vw,4rem)] font-anton font-normal uppercase mb-1"
        >
          Experience
        </h2>
        <div className="w-full h-px bg-cornflower/80" role="presentation"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        {/* Left Side - Clean Video Placeholder */}
        <div className="hidden lg:flex w-full lg:w-1/3 xl:w-1/4 ml-auto flex-col items-center lg:items-start">
          <div className="w-full max-w-[320px] aspect-square rounded-2xl border border-dark-tan/20 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
            {/* 3. Attach the ref, REMOVE autoPlay, KEEP preload="none" */}
            <video
              ref={videoRef}
              preload="none"
              loop
              muted
              playsInline
              // Add a poster image if you have one!
              // poster="/images/my-placeholder.jpg"
              aria-label="Video showcase of my web development projects"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={SlidingScares} type="video/webm" />
              {/* ✅ A11Y FIX: Even for muted background videos, strict WCAG compliance requires a captions track. */}
              <track kind="captions" srcLang="en" label="English" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Side - Experience List (No changes here) */}
        <div
          className="w-full lg:w-2/3 xl:w-1/2 lg:ml-auto lg:h-[320px] overflow-y-auto overflow-x-hidden lg:pr-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#bbb18e transparent",
          }}
        >
          {/* ... Your existing table code ... */}
          <table
            ref={tableRef}
            role="table"
            className="w-full text-left border-collapse block md:table"
          >
            {/* ... rest of your table ... */}
            <caption className="sr-only">
              A timeline of my professional work experience, roles, and
              companies.
            </caption>
            <thead
              role="rowgroup"
              className="hidden md:table-header-group sticky top-0 z-10 "
            >
              <tr
                role="row"
                className="border-b border-richBlack text-sm tracking-widest text-rich-black uppercase font-fraunces"
              >
                <th
                  role="columnheader"
                  scope="col"
                  className="pb-4 w-1/2 font-bold"
                >
                  Role
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="pb-4 w-1/3 font-bold"
                >
                  Company
                </th>
                <th
                  role="columnheader"
                  scope="col"
                  className="pb-4 w-1/6 text-right font-bold"
                >
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="block md:table-row-group">
              {experiences.map((exp, index) => (
                <tr
                  key={index}
                  role="row"
                  className="flex flex-col md:table-row py-5 md:py-0 border-b border-dark-tan/20 group transition-colors"
                >
                  <td
                    role="cell"
                    className="py-1 md:py-6 font-poppins text-xl md:text-lg xl:text-xl text-rich-black font-normal tracking-tight block md:table-cell align-middle "
                  >
                    {exp.role}
                  </td>
                  <td
                    role="cell"
                    className="italic md:not-italic py-1 md:py-6 font-poppins text-lg md:text-lg xl:text-xl text-rich-black/90 font-normal block md:table-cell align-middle "
                  >
                    {exp.company}
                  </td>
                  <td
                    role="cell"
                    className="py-1 md:py-6 font-poppins md:text-right text-xs md:text-sm font-medium text-rich-black/70 tracking-wider mt-2 md:mt-0 block md:table-cell align-middle"
                  >
                    {exp.timeline}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
