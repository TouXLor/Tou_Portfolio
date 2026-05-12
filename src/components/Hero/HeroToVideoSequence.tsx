import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Hero } from "./Hero";
import FullScreenVideo from "../Video/FullScreenVideo";

gsap.registerPlugin(ScrollTrigger);

export const HeroToVideoSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sequenceRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* THE ISOLATION WRAPPER */}
      <div className="gsap-isolation-wrapper relative w-full z-[100]">
        <section
          ref={sequenceRef}
          aria-label="Introduction Sequence"
          className="sequence-wrapper relative w-full h-screen overflow-hidden"
        >
          <div aria-hidden="true" className="absolute inset-0 z-0">
            <FullScreenVideo />
          </div>

          <div className="absolute inset-0 z-10">
            {/* Pass the isDesktopWrapper flag down to the Hero component */}
            <Hero isDesktopWrapper={true} />
          </div>
        </section>
      </div>
    </div>
  );
};
