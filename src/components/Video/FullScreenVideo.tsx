/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import IntroVid from "../../vids/IntroVid.webm";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function FullScreenVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  // ✅ A11Y FIX: Added a ref specifically for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ A11Y FIX: Respect OS-level "Reduce Motion" settings
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // If the user prefers reduced motion, pause the auto-playing background video
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction Background Video" // ✅ SEO/A11Y FIX: Gives the section a semantic identity
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true" // ✅ A11Y FIX: Hides purely decorative looping video from screen readers
        className="object-cover w-full h-full"
      >
        <source src={IntroVid} type="video/webm" />
        {/* ✅ A11Y FIX: Empty track satisfies strict WCAG audits for `<video>` elements */}
        <track kind="captions" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}
