import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  // ✅ A11Y & UX FIX: State to determine if we should even render the cursor
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchDevice) {
      setShouldRender(false);
      // Ensure the system cursor is visible
      document.body.style.cursor = "auto";
    } else {
      // Hide the system cursor only when we are rendering the custom one
      document.body.style.cursor = "none";
    }

    // Cleanup: bring the cursor back if the component unmounts
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useGSAP(
    () => {
      if (!shouldRender) return;

      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      // Center the cursor elements initially
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      gsap.set(follower, { xPercent: -50, yPercent: -50 });

      const xToCursor = gsap.quickTo(cursor, "x", {
        duration: 0.1,
        ease: "power3",
      });
      const yToCursor = gsap.quickTo(cursor, "y", {
        duration: 0.1,
        ease: "power3",
      });
      const xToFollower = gsap.quickTo(follower, "x", {
        duration: 0.3,
        ease: "power3",
      });
      const yToFollower = gsap.quickTo(follower, "y", {
        duration: 0.3,
        ease: "power3",
      });

      const onMouseMove = (e: MouseEvent) => {
        xToCursor(e.clientX);
        yToCursor(e.clientY);
        xToFollower(e.clientX);
        yToFollower(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);

      // Hover Logic with Event Delegation
      const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button, input, textarea, .clickable")) {
          gsap.to(cursor, { scale: 2.5, duration: 0.3, overwrite: true });
          gsap.to(follower, {
            scale: 1.5,
            opacity: 0,
            duration: 0.3,
            overwrite: true,
          });
        }
      };

      const onMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button, input, textarea, .clickable")) {
          // Only trigger leave if we're actually leaving the clickable element (not just a child)
          const related = e.relatedTarget as HTMLElement;
          if (
            !related ||
            !related.closest("a, button, input, textarea, .clickable")
          ) {
            gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: true });
            gsap.to(follower, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              overwrite: true,
            });
          }
        }
      };

      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("mouseout", onMouseOut);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseover", onMouseOver);
        document.removeEventListener("mouseout", onMouseOut);
      };
    },
    { dependencies: [shouldRender] },
  ); // Re-run GSAP context if shouldRender changes

  // ✅ UX/A11Y FIX: If they are on a phone or have reduced motion, don't render the HTML at all
  if (!shouldRender) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        aria-hidden="true" // ✅ A11Y FIX: Hide purely decorative element from screen readers
        className="fixed top-0 left-0 w-4 h-4 bg-[#6488EA] rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Ring */}
      <div
        ref={followerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cornflower rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  );
};

export default CustomCursor;
