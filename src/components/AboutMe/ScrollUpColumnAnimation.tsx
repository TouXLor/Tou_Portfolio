import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  { id: "col-1", breakpoint: "always" },
  { id: "col-2", breakpoint: "always" },
  { id: "col-3", breakpoint: "always" },
  { id: "col-4", breakpoint: "md" },
  { id: "col-5", breakpoint: "md" },
  { id: "col-6", breakpoint: "lg" },
  { id: "col-7", breakpoint: "lg" },
  { id: "col-8", breakpoint: "lg" },
] as const;

const BREAKPOINT_PX: Record<string, number> = {
  always: 0,
  md: 768,
  lg: 1024,
};

interface GlobalGridProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export const GlobalGrid: React.FC<GlobalGridProps> = ({ sectionRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const vw = window.innerWidth;

        const visibleCols = COLUMNS.filter(
          (col) => vw >= BREAKPOINT_PX[col.breakpoint],
        );

        const len = visibleCols.length;
        const mid = (len - 1) / 2;

        // 1. Create the timeline
        const tl = gsap.timeline();

        // 2. THE FIX: Add a "label" or empty space at the start.
        // This '0.5' acts as a buffer. The higher this number,
        // the longer the user scrolls while pinned before the black bars rise.
        const startBuffer = 0.5;

        const staggerGap = 0.15;

        visibleCols.forEach((col, index) => {
          const fill = fillRefs.current[col.id];
          if (!fill) return;

          const ringIndex = Math.floor(Math.abs(index - mid));
          gsap.set(fill, { scaleY: 0, transformOrigin: "bottom center" });

          tl.to(
            fill,
            {
              scaleY: 1,
              ease: "none",
              duration: 0.7,
            },
            // We add startBuffer here to push the start of the animation forward
            startBuffer + ringIndex * staggerGap,
          );
        });

        let scrollDistance = "+=800vh";
        if (window.innerWidth < 1024) scrollDistance = "+=400vh";
        if (window.innerWidth < 768) scrollDistance = "+=250vh";

        ScrollTrigger.create({
          animation: tl,
          trigger: sectionRef.current,
          pin: sectionRef.current,
          // Keep this clean so the UI doesn't shift
          start: "bottom bottom",
          end: scrollDistance,
          scrub: isMobile ? 1 : 3,
          anticipatePin: 1,
          pinSpacing: true,
        });
      },
    );

    return () => mm.revert();
  }, [sectionRef]);

  return (
    // 4. Changed 'h-[150vh]' to 'h-[150svh]' to prevent mobile browser URL bar glitches
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute bottom-0 left-0 z-[0] flex w-full h-[150svh] pointer-events-none overflow-hidden"
    >
      {COLUMNS.map((col) => {
        const visibilityClass =
          col.breakpoint === "md"
            ? "hidden md:block"
            : col.breakpoint === "lg"
              ? "hidden lg:block"
              : "";

        return (
          <div
            key={col.id}
            className={`relative flex-1 h-full overflow-hidden ${visibilityClass}`}
          >
            <div
              ref={(el) => {
                fillRefs.current[col.id] = el;
              }}
              // Retained the -left-[1px] -right-[1px] fix for the sub-pixel gap
              className="absolute inset-y-0 -left-[1px] -right-[1px] bg-rich-black"
              style={{
                transform: "scaleY(0)",
                transformOrigin: "bottom center",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
