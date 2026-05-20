import React, { useEffect, useRef, useState, forwardRef } from "react";
import { Project } from "../../../types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react"; // ✅ Added useGSAP

import ihcMockup from "../../img/project-Imgs/IhConcept_mockup.webp";
import TTMockup from "../../img/project-Imgs/TT_mockup.webp";
import LphieMockup from "../../img/project-Imgs/Lphie_mockup.webp";
import starFish from "../../img/project-Imgs/starFish-thumb.png";
import dishDive from "../../img/project-Imgs/dishdive-thumb.png";
import lawBandit from "../../img/project-Imgs/LawBandit.png";
import coHabit from "../../img/project-Imgs/coHabit-thumb.png";

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    id: 1,
    title: "Web Developer / Designer",
    category: "IHConcept",
    description:
      "Developed and maintained a custom theme, optimizing front-end performance and UX navigation to drive a 25% increase in user engagement.",
    image: ihcMockup,
    link: "https://ihconcepts.com/",
    tags: "work",
    tools: ["WordPress", "PHP", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 2,
    title: "Web Designer",
    category: "Treasure Taste",
    description:
      "Executed the full project lifecycle of a responsive restaurant website, from high-fidelity prototyping to front-end implementation.",
    image: TTMockup,
    link: "https://touxlor.github.io/treasure-taste/",
    tags: "work",
    tools: ["Figma", "Adobe CC", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "Web Designer Chair",
    category: "Lambda Phi Epsilon",
    description:
      "Engineered and maintained a responsive organization website. Integrated SEO best practices and implemented front-end performance optimizations based on continuous user research.",
    image: LphieMockup,
    link: "https://touxlor.github.io/646-Final-Project/",
    tags: "work",
    tools: ["HTML", "CSS", "JavaScript", "SEO"],
  },
  {
    id: 4,
    title: "DishDive",
    category: "Web Page",
    description:
      "Built an interactive recipe-sharing web app featuring dynamic DOM manipulation, responsive grid layouts, real-time filtering, and custom user interaction components.",
    image: dishDive,
    link: "https://touxlor.github.io/FinalJS/",
    tags: "technicalLabs",
    tools: ["JavaScript", "CSS Grid", "HTML"],
  },
  {
    id: 5,
    title: "LawBandit Home UI Redesign",
    category: "UI/UX",
    description:
      "Executed a research-driven UI/UX redesign of a legal education platform to resolve user friction. Delivered high-fidelity prototypes featuring improved information hierarchy and streamlined navigation patterns.",
    image: lawBandit,
    link: "https://www.figma.com/design/drgPtx4yQRXOV5y2zHuSiO/LawBandit-HomePage-Redesign-TouXiongLor?node-id=72-30&t=txegWnaY9u9jBsM1-1",
    tags: "caseStudies",
    tools: ["Figma", "User Research", "Prototyping"],
  },
  {
    id: 6,
    title: "CoHabit Mobile Application Design",
    category: "UI/UX",
    description:
      "Designed an end-to-end mobile app solution for student housing, emphasizing accessibility and mobile-first interactions. Developed comprehensive user flows, including a matching algorithm interface and a task-management dashboard.",
    image: coHabit,
    link: "https://www.figma.com/design/drgPtx4yQRXOV5y2zHuSiO/LawBandit-HomePage-Redesign-TouXiongLor?node-id=245-30&t=txegWnaY9u9jBsM1-1",
    tags: "caseStudies",
    tools: ["Figma", "Wireframing", "Mobile UI"],
  },
  {
    id: 7,
    title: "LPHIE Madison Chapter Website Redesign",
    category: "Web Page",
    description:
      "Architected a complete front-end redesign to modernize web presence and improve mobile responsiveness. Built scalable UI templates and optimized content structures to support digital recruitment efforts.",
    image: "https://picsum.photos/seed/lphie/800/600",
    link: "https://touxlor.github.io/646-Final-Project/",
    tags: "technicalLabs",
    tools: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    id: 8,
    title: "StarFish Redesign",
    category: "UI/UX",
    description:
      "Redesigned a student resource platform interface to reduce cognitive load and enhance discoverability. Engineered a scalable UI component library and restructured navigation architecture to meet accessibility standards.",
    image: starFish,
    link: "#",
    tags: "caseStudies",
    tools: ["Figma", "Design Systems", "Accessibility"],
  },
];

type FilterTag = "all" | "work" | "caseStudies" | "technicalLabs";

export const SelectedProjects = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("work");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLAnchorElement>(null);
  const bgTextRef = useRef<HTMLParagraphElement>(null);
  const mobileBgTextRef = useRef<HTMLHeadingElement>(null);
  const isAnimating = useRef(false);
  const isInitialRender = useRef(true);
  const isTabChange = useRef(false);

  const sectionRef = useRef<HTMLElement>(null); // ✅ Added sectionRef for strict scoping
  const pinRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags === activeFilter);

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  const toggleFilter = (tag: FilterTag) => {
    if (isAnimating.current || activeFilter === tag) return;

    const newFilter = activeFilter === tag ? "all" : tag;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setActiveFilter(newFilter);
      setCurrentIndex(0);
      return;
    }

    isAnimating.current = true;
    isTabChange.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveFilter(newFilter);
        setCurrentIndex(0);
      },
    });

    // OUTRO
    tl.to(
      textContainerRef.current,
      { y: 20, opacity: 0, duration: 0.7, ease: "power2.in" },
      0,
    );

    tl.to(
      [
        categoryRef.current,
        titleRef.current,
        bgTextRef.current,
        mobileBgTextRef.current,
      ],
      { yPercent: 100, duration: 0.7, ease: "power2.in", stagger: 0.05 },
      0,
    );

    tl.to(
      imageContainerRef.current,
      { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.in" },
      0,
    );
  };

  const animateSlide = (direction: number) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCurrentIndex(
        (prev) =>
          (prev + direction + filteredProjects.length) %
          filteredProjects.length,
      );
      return;
    }

    isAnimating.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(
          (prev) =>
            (prev + direction + filteredProjects.length) %
            filteredProjects.length,
        );
      },
    });

    // OUTRO
    tl.to(
      textContainerRef.current,
      { y: 20, opacity: 0, duration: 0.7, ease: "power2.in" },
      0,
    );

    tl.to(
      [categoryRef.current, titleRef.current],
      { yPercent: 100, duration: 0.7, ease: "power2.in", stagger: 0.05 },
      0,
    );

    tl.to(
      imageContainerRef.current,
      { scale: 0.95, opacity: 0, duration: 0.7, ease: "power2.in" },
      0,
    );
  };

  const handleNext = () => {
    if (isAnimating.current) return;
    animateSlide(1);
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    animateSlide(-1);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      isAnimating.current = false;
      return;
    }

    // INTRO
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        isTabChange.current = false;
      },
    });

    // Reset starting positions for intro
    gsap.set(textContainerRef.current, { y: 20, opacity: 0 });

    const elementsToAnimate: (Element | null)[] = [
      categoryRef.current,
      titleRef.current,
    ];
    if (isTabChange.current) {
      elementsToAnimate.push(bgTextRef.current, mobileBgTextRef.current);
    }

    gsap.set(elementsToAnimate, { yPercent: 100 });
    gsap.set(imageContainerRef.current, {
      scale: 1,
      opacity: 1,
      clipPath: "inset(80% 0% 0% 80%)",
    });

    tl.to(
      textContainerRef.current,
      { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
      0.1,
    );

    tl.to(
      elementsToAnimate,
      { yPercent: 0, duration: 0.9, ease: "power2.out", stagger: 0.1 },
      0.1,
    );

    tl.to(
      imageContainerRef.current,
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.out" },
      0,
    );
  }, [currentIndex, activeFilter]);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      // Disable auto-carousel on mobile screens (width < 1024px)
      if (window.innerWidth < 1024) return;

      if (!isAnimating.current) {
        animateSlide(1);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, currentIndex]);

  // ✅ To this (Wrapping it in matchMedia):
  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // DESKTOP & LARGE TABLETS (1024px and up)
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: pinRef.current,
          pin: true, // Only pin on desktop!
          start: "top top",
          end: "+=100%",
          // ... keep your existing desktop scroll logic here
        });
      });

      // MOBILE & SMALL TABLETS (1023px and down)
      mm.add("(max-width: 1023px)", () => {
        // We do NOT pin here.
        // Let the projects flow naturally down the page like a normal vertical list.
        // GSAP will automatically kill the desktop pin when the screen resizes below 1024px!
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="works"
      ref={sectionRef} // ✅ Added ref for GSAP scope
      aria-labelledby="projects-heading"
      className="relative z-[101] mt-0 lg:-mt-[100svh] bg-oat-cream pb-10 lg:pb-0"
    >
      <h2 id="projects-heading" className="sr-only">
        Selected Works
      </h2>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Showing project {currentIndex + 1} of {filteredProjects.length}:{" "}
        {activeProject.title}
      </div>

      {/* 👇 THE FIX: THE ISOLATION WRAPPER 👇 */}
      <div className="gsap-isolation-wrapper">
        {/* Pinned Frame */}
        <div
          ref={pinRef}
          className="relative min-h-[100svh] w-full overflow-hidden transform-gpu"
        >
          {/* Layer 2: Content Overlay - z-10 */}
          <div className="content-overlay relative z-10 flex w-full h-full px-6 lg:px-16 pointer-events-none will-change-transform">
            {/* Left Side: Slider (2/3 Width) */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full lg:w-[85%] xl:w-[80%] pt-0 lg:pt-16 3xl:pt-0 pb-0 lg:pb-20 mt-14 flex flex-col h-auto min-h-full pointer-events-auto overflow-y-auto lg:overflow-y-visible"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Mobile Title */}
              <div className="block lg:hidden w-full text-center mb-8 shrink-0">
                <div className="overflow-hidden">
                  <div
                    ref={mobileBgTextRef as any}
                    aria-hidden="true"
                    className="font-anton font-black text-cornflower text-4xl sm:text-5xl lg:text-[13vw] leading-[0.9] tracking-normal opacity-100 flex flex-row lg:flex-col gap-3 lg:gap-0 whitespace-nowrap lg:whitespace-normal"
                  >
                    <span>
                      {activeFilter === "caseStudies"
                        ? "CASE"
                        : activeFilter === "technicalLabs"
                          ? "TECHNICAL"
                          : "SELECTED"}
                    </span>
                    <span>
                      {activeFilter === "caseStudies"
                        ? "STUDIES"
                        : activeFilter === "technicalLabs"
                          ? "LABS"
                          : "WORKS"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header / Nav Area */}
              <div className="mb-8 lg:mb-12 w-full mx-auto shrink-0 pr-0 lg:pr-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-4">
                  {/* --- DESKTOP LEFT SIDE (Hidden on Mobile/Tablet) --- */}
                  <div className="hidden lg:flex flex-row justify-between items-center w-auto ">
                    <div className="font-mono text-lg font-medium text-rich-black flex gap-2">
                      <span className="sr-only">
                        Project {currentIndex + 1} of {filteredProjects.length}
                      </span>
                      <span aria-hidden="true">
                        ( {String(currentIndex + 1).padStart(2, "0")} -{" "}
                        {String(filteredProjects.length).padStart(2, "0")} )
                      </span>
                    </div>
                  </div>

                  {/* --- RIGHT SIDE STRUCTURE --- */}
                  <div className="flex items-center lg:items-end w-full lg:w-auto justify-between lg:justify-end pb-2 lg:pb-0 gap-4">
                    {/* Filter Buttons (Now scrolls independently if needed) */}
                    <div className="flex gap-4 font-fraunces text-base lg:text-lg tracking-wide uppercase shrink-0 overflow-x-auto hide-scrollbar">
                      <button
                        type="button"
                        onClick={() => toggleFilter("work")}
                        aria-pressed={activeFilter === "work"}
                        className={`transition-colors hover:text-cornflower outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm ${activeFilter === "work" ? "text-rich-black font-bold" : "text-rich-black"}`}
                      >
                        Work
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFilter("caseStudies")}
                        aria-pressed={activeFilter === "caseStudies"}
                        className={`transition-colors hover:text-cornflower outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm ${activeFilter === "caseStudies" ? "text-rich-black font-bold" : "text-rich-black"}`}
                      >
                        Case Studies
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleFilter("technicalLabs")}
                        aria-pressed={activeFilter === "technicalLabs"}
                        className={`transition-colors hover:text-cornflower outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm ${activeFilter === "technicalLabs" ? "text-rich-black font-bold" : "text-rich-black"}`}
                      >
                        Technical Labs
                      </button>
                    </div>

                    {/* Navigation Controls (Index + Arrows pinned to the right) */}
                    <div className="flex items-center gap-2 lg:gap-3 lg:mb-1 shrink-0 ml-auto">
                      {/* TABLET INDEX (Hidden on Mobile, Visible on Tablet, Hidden on Desktop) */}
                      <div className="hidden sm:flex lg:hidden font-mono text-base md:text-lg font-medium text-rich-black gap-1 mr-2">
                        <span className="sr-only">
                          Project {currentIndex + 1} of{" "}
                          {filteredProjects.length}
                        </span>
                        <span aria-hidden="true">
                          ( {String(currentIndex + 1).padStart(2, "0")} -{" "}
                          {String(filteredProjects.length).padStart(2, "0")} )
                        </span>
                      </div>

                      {/* Unified Arrows (Hidden on mobile, visible on tablet/desktop) */}
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous Project"
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-none border border-rich-black/20 hover:bg-rich-black hover:text-oat-cream text-rich-black transition-all duration-300 focus:outline-none"
                      >
                        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next Project"
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-none border border-rich-black/20 hover:bg-rich-black hover:text-oat-cream text-rich-black transition-all duration-300 focus:outline-none"
                      >
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  className="w-full h-[1px] bg-rich-black/20 relative mt-4 lg:mt-0"
                  aria-hidden="true"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-cornflower transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentIndex + 1) / filteredProjects.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Active Project Content */}
              <article
                className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full mx-auto h-auto lg:min-h-[75%] lg:flex-none overflow-visible lg:overflow-hidden pr-0 lg:pr-8"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Text Info */}
                <div className="flex flex-col justify-start lg:justify-between order-2 lg:order-1 w-full lg:w-5/12 h-auto lg:h-full md:pb-8 lg:pb-0 shrink-0 lg:shrink">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full overflow-hidden">
                      <span
                        ref={categoryRef}
                        className="inline-block font-fraunces font-bold text-cornflower uppercase tracking-wide text-xl"
                      >
                        {activeProject.category}
                      </span>

                      {/* MOBILE ARROWS: Visible only on mobile (< md). Pushed to the right edge. */}
                      <div className="flex md:hidden gap-2 shrink-0 ml-4">
                        <button
                          type="button"
                          onClick={handlePrev}
                          aria-label="Previous Project"
                          className="flex items-center justify-center w-8 h-8 rounded-none border border-rich-black/20 hover:bg-rich-black hover:text-oat-cream text-rich-black transition-all duration-300 focus:outline-none"
                        >
                          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={handleNext}
                          aria-label="Next Project"
                          className="flex items-center justify-center w-8 h-8 rounded-none border border-rich-black/20 hover:bg-rich-black hover:text-oat-cream text-rich-black transition-all duration-300 focus:outline-none"
                        >
                          <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <h3
                        ref={titleRef}
                        className="font-anton font-normal text-4xl lg:text-5xl xl:text-6xl tracking-normal text-rich-black leading-[1.1]"
                      >
                        {activeProject.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    ref={textContainerRef}
                    className="flex flex-col gap-6 mt-4 lg:mt-auto mb-20 lg:mb-10"
                  >
                    <p className="font-poppins text-soft-black/80 leading-loose text-base lg:text-base 3xl:text-base max-w-md">
                      {activeProject.description}
                    </p>

                    {/* Tools */}
                    {activeProject.tools && activeProject.tools.length > 0 && (
                      <ul
                        className="flex flex-row flex-wrap gap-2 lg:gap-3 max-w-md"
                        aria-label="Technologies used"
                      >
                        {activeProject.tools.map((tool, index) => (
                          <li
                            key={index}
                            className="px-3 py-1 border border-cornflower text-cornflower rounded-full font-sans uppercase text-sm lg:text-base tracking-[0.05em] bg-transparent"
                          >
                            {tool}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Links */}
                    <div className="flex gap-6 text-base lg:text-lg 3xl:text-xl font-fraunces text-cornflower font-medium">
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View the live ${activeProject.title} project`}
                        className="group flex items-center gap-2 hover:text-rich-black transition-colors underline underline-offset-4 decoration-1 decoration-cornflower/30 hover:decoration-rich-black outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
                      >
                        View Project
                        <ArrowRight
                          aria-hidden="true"
                          className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </a>
                      {(activeProject as any).caseStudyLink && (
                        <a
                          href={(activeProject as any).caseStudyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read the ${activeProject.title} case study`}
                          className="group flex items-center gap-2 hover:text-rich-black transition-colors underline underline-offset-4 decoration-1 decoration-cornflower/30 hover:decoration-rich-black outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
                        >
                          Case Study
                          <ArrowRight
                            aria-hidden="true"
                            className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Card */}
                <a
                  ref={imageContainerRef}
                  href={activeProject.link}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="order-1 lg:order-2 w-full lg:w-auto flex-none lg:max-w-[45%] lg:ml-auto aspect-[5/3] lg:aspect-[1/1] relative overflow-hidden shadow-2xl rounded-sm group block bg-rich-black/10 focus:outline-none shrink-0"
                >
                  <img
                    src={activeProject.image}
                    alt={`Screenshot of ${activeProject.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-cornflower/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </article>
            </div>

            {/* Right Side: Static Text */}
            <div className="hidden lg:block w-1/2 lg:w-1/4 xl:w-1/5 relative h-full pointer-events-none">
              <div className="absolute bottom-12 right-0 lg:-right-10 text-right pointer-events-auto">
                <div className="overflow-hidden">
                  <p
                    ref={bgTextRef}
                    aria-hidden="true"
                    className="font-anton font-black text-cornflower/15 text-[5vw] leading-[0.9] tracking-normal opacity-100 flex flex-col m-0"
                  >
                    <span>
                      {activeFilter === "caseStudies"
                        ? "CASE"
                        : activeFilter === "technicalLabs"
                          ? "TECHNICAL"
                          : "SELECTED"}
                    </span>
                    <span>
                      {activeFilter === "caseStudies"
                        ? "STUDIES"
                        : activeFilter === "technicalLabs"
                          ? "LABS"
                          : "WORKS"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 👆 END OF ISOLATION WRAPPER */}
    </section>
  );
});

SelectedProjects.displayName = "SelectedProjects";
