import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. ADDED IMPORT

gsap.registerPlugin(ScrollTrigger); // 2. REGISTERED PLUGIN

const TESTIMONIALS = [
  {
    quote:
      "Tou's ability to translate complex logic into seamless, high-performance interfaces is unmatched. He crafted an experience.",
    author: "Mailee L.",
    role: "CEO",
    company: "Treasure Taste",
  },
  {
    quote:
      "Working with Tou was a game-changer. His eye for detail and mastery of motion design elevated our brand to a level we didn't think possible.",
    author: "Houa L.",
    role: "Founder",
    company: "Golden Flavors",
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-play interval (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // 3. ADDED YOUR SCROLLTRIGGER ANIMATION
  useGSAP(() => {
    gsap.fromTo(
      ".testimonial-quote",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current, // Updated to match your ref name
          start: "top 60%",
        },
      }
    );
  }, { scope: containerRef }); // Automatically runs once on mount

  // Existing GSAP Animation: Snap and Fade In on state change
  useGSAP(
    () => {
      if (!contentRef.current) return;

      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
        );
      });

      return () => mm.revert();
    },
    { dependencies: [currentIndex], scope: containerRef },
  );

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      ref={containerRef}
      aria-labelledby="testimonials-heading"
      className="min-h-[80vh] max-w-[90vw] mx-auto flex items-center justify-center bg-rich-black relative overflow-hidden mt-14 md:mt-20 py-24 px-6 md:px-20 rounded-3xl"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-stone-line rounded-full blur-[150px] pointer-events-none"
      />

      {/* Giant Quote Mark */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-20 pointer-events-none select-none z-0"
      >
        <span className="font-fraunces italic text-[400px] leading-none text-stone-line/50">
          &ldquo;
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        {/* TITLE */}
        <h2
          id="testimonials-heading"
          className="text-cornflower font-anton text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-normal tracking-wide uppercase mb-12"
        >
          Testimonials
        </h2>

        {/* Animated Text Block */}
        <figure
          ref={contentRef}
          className="flex flex-col items-center gap-10"
          aria-live="polite"
          aria-atomic="true"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="flex items-center justify-center min-h-[250px] md:min-h-[200px] lg:min-h-[220px] w-full">
            {/* 4. ADDED CLASSNAME HERE */}
            <blockquote className="testimonial-quote font-fraunces italic text-3xl md:text-5xl lg:text-6xl text-oat-cream leading-tight">
              <p>&quot;{current.quote}&quot;</p>
            </blockquote>
          </div>

          {/* Separator Line */}
          <div aria-hidden="true" className="w-24 h-[1px] bg-cornflower/50" />

          {/* Author Info */}
          <figcaption className="flex flex-col md:flex-row items-center gap-2 md:gap-3 font-poppins text-base md:text-base tracking-widest uppercase">
            <span className="font-bold text-oat-cream/80">
              {current.author}
            </span>
            <span
              aria-hidden="true"
              className="hidden md:inline text-oat-cream"
            >
              •
            </span>
            <span className="text-cornflower font-semibold">
              {current.role}
            </span>
            <span
              aria-hidden="true"
              className="hidden md:inline text-oat-cream"
            >
              •
            </span>
            <span className="text-oat-cream/80 font-bold">
              {current.company}
            </span>
          </figcaption>

          {/* Progress Indicators */}
          <nav
            className="flex gap-3 z-20 mt-8"
            aria-label="Testimonial pagination"
          >
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-current={idx === currentIndex ? "true" : "false"}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-cornflower focus-visible:ring-offset-2 focus-visible:ring-offset-oat-cream ${
                  idx === currentIndex
                    ? "w-8 bg-cornflower"
                    : "w-2 bg-oat-cream hover:bg-rich-black"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </nav>
        </figure>
      </div>
    </section>
  );
};