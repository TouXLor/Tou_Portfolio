import { useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function LegalLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const el = contentWrapRef.current;
      if (!el) return;

      // Animate the content when route changes
      gsap.fromTo(
        el,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    },
    { dependencies: [currentPath], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-oat-cream py-12 px-4 sm:px-6 lg:px-8 relative"
    >
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none stroke-stone-line"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-stone-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-stone-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-xs uppercase tracking-widest font-bold text-cornflower mb-12 hover:text-rich-black transition-colors"
        >
          <span className="mr-2 text-lg leading-none">&larr;</span> Back to Home
        </Link>
        <div className="mb-12">
          <h1 className="font-anton text-6xl md:text-8xl tracking-tight uppercase text-rich-black mb-6">
            Legal <span className="text-cornflower">Hub</span>
          </h1>
          <p className="font-fraunces text-xl md:text-2xl italic text-rich-black/60 border-l-4 border-cornflower pl-4 py-1">
            Transparent policies for a better internet.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-stone-line/50 mb-10 overflow-x-auto hide-scrollbar">
          <Link
            to="/terms"
            className={`relative pb-4 px-6 text-sm sm:text-base uppercase tracking-wider font-semibold whitespace-nowrap transition-colors duration-300 ${currentPath === "/terms" ? "text-rich-black" : "text-rich-black/40 hover:text-rich-black/70"}`}
          >
            Terms & Conditions
            {currentPath === "/terms" && (
              <div className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-cornflower" />
            )}
          </Link>
          <Link
            to="/privacy"
            className={`relative pb-4 px-6 text-sm sm:text-base uppercase tracking-wider font-semibold whitespace-nowrap transition-colors duration-300 ${currentPath === "/privacy" ? "text-rich-black" : "text-rich-black/40 hover:text-rich-black/70"}`}
          >
            Privacy Policy
            {currentPath === "/privacy" && (
              <div className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-cornflower" />
            )}
          </Link>
        </div>

        {/* Content Area */}
        <div className="bg-white p-8 md:p-12 border border-stone-line/50 shadow-xl shadow-stone-line/30 rounded-none relative">
          {/* Brutalist accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rich-black"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rich-black"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rich-black"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rich-black"></div>

          <div ref={contentWrapRef}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
