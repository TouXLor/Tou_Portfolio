/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, Suspense, lazy, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // ✅ ADDED ROUTER IMPORTS

import { useGSAP } from "@gsap/react";

import CustomCursor from "./src/components/CustomCursor/CustomCursor";
import { Navbar } from "./src/components/Navbar/Navbar";
import { CursorProvider } from "./src/context/CursorContext";
import { Hero } from "./src/components/Hero/Hero";

// ✅ IMPORT YOUR NEW LEGAL PAGES (Adjust the paths to wherever you saved them)
import LegalLayout from "./src/components/Legal/LegalLayout";
import PrivacyPolicy from "./src/components/Legal/PrivatePolicy";
import TermsConditions from "./src/components/Legal/TermsAndConditions";

import CookieBanner from "./src/components/Legal/CookieBanner";

// Lazy load the heavy components
const SelectedProjects = lazy(() =>
  import("./src/components/Projects/SelectedProjects").then((module) => ({
    default: module.SelectedProjects,
  })),
);
const ServiceSection = lazy(
  () => import("./src/components/Service/ServiceSection"),
);
const Testimonials = lazy(() =>
  import("./src/components/Testimonial/Testimonials").then((module) => ({
    default: module.Testimonials,
  })),
);
const Experience = lazy(() => import("./src/components/Experience/Experience"));
const Toolkit = lazy(() => import("./src/components/Tools/Toolkit"));
const About = lazy(() => import("./src/components/AboutMe/About"));
const AboutGallery = lazy(
  () => import("./src/components/AboutMe/AboutGallery"),
);
const ContactCTA = lazy(() => import("./src/components/Contact/ContactCTA"));
const HeroToVideoSequence = lazy(() =>
  import("./src/components/Hero/HeroToVideoSequence").then((module) => ({
    default: module.HeroToVideoSequence,
  })),
);

// Fallback UI for ContactCTA lazy loading
const ContactCTAFallback: React.FC = () => (
  <section className="relative min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 py-32 lg:py-40 w-full">
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-10 justify-center h-full self-center">
        <div>
          <h2 className="block text-cornflower font-anton font-normal tracking-wide uppercase mb-4 text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl">
            Get in Touch
          </h2>
          <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-rich-black font-anton tracking-widest leading-[1.1]">
            YOUR BUSINESS
            <br />
            YOUR BRAND
          </p>
        </div>
        <div className="flex flex-col gap-4 text-rich-black/60">
          <p>Loading contact section...</p>
        </div>
      </div>
    </div>
  </section>
);
const Footer = lazy(() => import("./src/components/Footer/Footer"));

gsap.registerPlugin(ScrollTrigger);

// --- ScrollManager: sync Lenis with GSAP's ticker ---
const ScrollManager: React.FC = () => {
  // Use the hook without passing ScrollTrigger.update to avoid timing coupling
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // Ensure lenis is at top on mount to avoid retained velocity
    lenis.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });

    // Sync Lenis RAF with GSAP's internal ticker to prevent jittering/stuck scrolls
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [lenis]);

  return null;
};

// ✅ ADDED: This ensures that when a user clicks a link to a new page, it scrolls to the top
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => {
    // Check window object to safely initialize state
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Listen for screen size changes
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const PortfolioHome = ({
  sequenceRef,
}: {
  sequenceRef: React.RefObject<HTMLElement | null>;
}) => {
  // 👇 THE GLOBAL GSAP NUKE 👇
  // This ensures that when the user leaves the home page, ALL pins are instantly
  // reverted so React can safely delete the DOM without crashing.
  useGSAP(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill(true); // Force kill all ScrollTriggers, even if they are pinned
      });
    };
  });

  // Track if the screen is large (lg breakpoint in Tailwind is 1024px)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <Navbar />
      {/* 
        ✅ JavaScript Conditional Rendering 
        This completely unmounts the unused component, saving memory 
        and preventing GSAP from calculating 0px heights.
      */}
      {isDesktop ? <HeroToVideoSequence /> : <Hero />}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[100dvh]">
            Loading...
          </div>
        }
      >
        <SelectedProjects />
        <ServiceSection />
        <Testimonials />
        <Experience />
        <Toolkit />
        <About />
        <AboutGallery />
      </Suspense>
      <Suspense fallback={<ContactCTAFallback />}>
        <ContactCTA />
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // --- INSERT THE OPTIMIZATION HERE ---
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true, // This prevents the "jumping" on mobile
    });
    // ------------------------------------
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    ScrollTrigger.clearScrollMemory();

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);

    const refreshGSAP = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      refreshGSAP();
    } else {
      window.addEventListener("load", refreshGSAP);
    }

    // 👇 ADD THIS RESIZE OBSERVER 👇
    // This watches the body. Whenever a lazy-loaded component (like Testimonials)
    // injects into the DOM and changes the page height, it forces GSAP to update its math.
    const resizeObserver = new ResizeObserver(() => {
      refreshGSAP();
    });

    resizeObserver.observe(document.body);

    const fallbackTimer = setTimeout(refreshGSAP, 1000);

    return () => {
      window.removeEventListener("load", refreshGSAP);
      clearTimeout(fallbackTimer);
      // 👇 Don't forget to clean up the observer! 👇
      resizeObserver.disconnect();
    };
  }, []);

  const sequenceRef = useRef<HTMLElement>(null);

  return (
    // ✅ ADDED: BrowserRouter wraps the entire app
    <BrowserRouter basename="/Tou_Portfolio">
      <ReactLenis
        root
        autoRaf={false}
        options={{ lerp: 0.08, smoothWheel: true }}
      >
        <ScrollManager />
        <ScrollToTopOnNavigate /> {/* Triggers scroll-to-top on route change */}
        <CursorProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-rich-black focus:text-oat-cream focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-cornflower"
          >
            Skip to main content
          </a>

          <main
            id="main-content"
            className="bg-oat-cream h-screen text-softBlack selection:bg-cornflower selection:text-white"
          >
            {/* ✅ ADDED: React Router Routes */}
            <Routes>
              {/* The main scrolling portfolio lives at "/" */}
              <Route
                path="/"
                element={<PortfolioHome sequenceRef={sequenceRef} />}
              />

              {/* The Legal pages are nested inside the LegalLayout */}
              <Route element={<LegalLayout />}>
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Route>
            </Routes>

            {/* Render the Footer on EVERY page so users can always navigate */}
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </main>

          <CustomCursor />
        </CursorProvider>
      </ReactLenis>
      <CookieBanner />
    </BrowserRouter>
  );
};

export default App;
