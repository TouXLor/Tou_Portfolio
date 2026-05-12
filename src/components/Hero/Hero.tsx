import React, { useRef } from "react";
import { ArrowDown } from "lucide-react";
import portraitSvg from "../../img/headshot_vector_transparent.webp";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// Define the props to accept the isDesktopWrapper boolean from the parent
interface HeroProps {
  isDesktopWrapper?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDesktopWrapper = false }) => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. THE PRE-LOADER & ENTRY MASTER TIMELINE
      const masterTl = gsap.timeline();

      masterTl
        .to(".preloader", {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          delay: 0.5,
        })
        .fromTo(
          ".word-1",
          { x: -60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "expo.out", duration: 1.8 },
          "-=0.4",
        )
        .fromTo(
          ".word-2",
          { x: 60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "expo.out", duration: 1.8 },
          "-=1.4",
        )
        .fromTo(
          ".word-3",
          { x: -60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "expo.out", duration: 1.8 },
          "-=1.4",
        )
        .fromTo(
          ".portrait-wrapper",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "expo.out", duration: 1 },
          "-=1",
        )
        .fromTo(
          ".intro-text",
          { x: -20, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.8",
        )
        .fromTo(
          ".cta-button",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2 },
          "-=1.0",
        );

      // 2. THE INFINITE BREATHING
      gsap.to(".portrait-img", {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // 3. THE SLOT MACHINE PINNED SEQUENCE
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          // ✅ FIX: Use string selector and boolean prop to bypass ref timing issues
          pinnedContainer: isDesktopWrapper ? ".sequence-wrapper" : undefined,
          pin: isDesktopWrapper ? false : true,
          start: "top top",
          end: isDesktopWrapper ? "+=600%" : "+=200%",
          scrub: isDesktopWrapper ? 0.8 : 2.2,
        },
      });

      scrollTl.fromTo(
        ".portrait-wrapper",
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 3.5,
          ease: "none",
          immediateRender: false,
        },
        0,
      );

      scrollTl.fromTo(
        ".intro-text, .cta-button",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 15,
          duration: 3,
          ease: "none",
          immediateRender: false,
        },
        0,
      );

      scrollTl.to(
        ".reel-1",
        {
          yPercent: -75,
          ease: "power2.inOut",
          duration: 4,
          force3D: true,
          rotation: 0.01,
        },
        0,
      );
      scrollTl.to(
        ".reel-2",
        {
          yPercent: -75,
          ease: "power2.inOut",
          duration: 4,
          force3D: true,
          rotation: 0.01,
        },
        0.5,
      );
      scrollTl.to(
        ".reel-3",
        {
          yPercent: -75,
          ease: "power2.inOut",
          duration: 4,
          force3D: true,
          rotation: 0.01,
        },
        1,
      );

      // ✅ FIX: Only fade out, scale, and blur the text if we are on Desktop
      if (isDesktopWrapper) {
        scrollTl.to(
          ".giant-text",
          {
            autoAlpha: 0,
            scale: 1.1,
            filter: "blur(8px)",
            duration: 1.5,
            ease: "power2.inOut",
          },
          5.2,
        );
      }

      scrollTl.to(
        ".hero-door-left",
        {
          xPercent: -100,
          duration: 8,
          ease: "power2.inOut",
        },
        5.8,
      );

      scrollTl.to(
        ".hero-door-right",
        {
          xPercent: 100,
          duration: 8,
          ease: "power2.inOut",
        },
        5.8,
      );

      scrollTl.to({}, { duration: 8 });
    },
    { scope: heroRef },
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${id}`, offsetY: 0 },
      ease: "power4.inOut",
    });
  };

  return (
    <header
      ref={heroRef}
      className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col "
    >
      <h1 className="sr-only">
        Tou Xiong Lor - Web Designer & Developer based in Milwaukee, WI. Site
        Grows Brand.
      </h1>

      <div
        aria-hidden="true"
        className="hero-door-left absolute top-0 left-0 w-1/2 h-full bg-oat-cream z-[-1]"
      ></div>
      <div
        aria-hidden="true"
        className="hero-door-right absolute top-0 right-0 w-1/2 h-full bg-oat-cream z-[-1]"
      ></div>

      <div
        className="preloader absolute inset-0 z-[999] bg-soft-black flex items-center justify-center overflow-hidden pointer-events-none bg-rich-black"
        aria-hidden="true"
      >
        <div className="preloader-logo font-poppins font-black  text-oat-cream text-4xl">
          2X <span className="text-cornflower">.</span>
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none leading-[0.85] "
        aria-hidden="true"
      >
        <div className="giant-text font-poppins font-black text-cornflower text-[clamp(14vw,18vw,22vw)] xl:text-[clamp(14vw,15vw,22vw)] 3xl:text-[clamp(14vw,17.7vw,22vw)] tracking-tighter flex flex-col w-full px-[5%] md:px-[10%] mb-[15vh] md:mb-0 pt-12 md:pt-16">
          <div className="word-1 text-left w-full h-[0.85em] overflow-hidden ">
            <div className="reel-1 flex flex-col w-full ">
              <span className="block h-[0.85em] leading-[0.85]">TOU</span>
              <span className="block h-[0.85em] leading-[0.85]">PIXEL</span>
              <span className="block h-[0.85em] leading-[0.85]">VISUAL</span>
              <span className="block h-[0.85em] leading-[0.85]  ">SITE</span>
            </div>
          </div>

          <div className="word-2 text-center w-full h-[0.85em] overflow-hidden pr-6 md:pr-12 ">
            <div className="reel-2 flex flex-col w-full ">
              <span className="block h-[0.85em] leading-[0.85]">XIONG</span>
              <span className="block h-[0.85em] leading-[0.85]">CRAFT</span>
              <span className="block h-[0.85em] leading-[0.85]">DESIGN</span>
              <span className="block h-[0.85em] leading-[0.85] ">GROWS</span>
            </div>
          </div>

          <div className="word-3 text-right w-full h-[0.85em] overflow-hidden pr-4 md:pr-10">
            <div className="reel-3 flex flex-col w-full">
              <span className="block h-[0.85em] leading-[0.85]">LOR</span>
              <span className="block h-[0.85em] leading-[0.85]">LOGIC</span>
              <span className="block h-[0.85em] leading-[0.85]">SYSTEM</span>
              <span className="block h-[0.85em] leading-[0.85] ">BRAND</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[280px] lg:max-w-[36rem] xl:max-w-[30rem] 3xl:max-w-[40rem] sm:max-w-[320px] md:max-w-[clamp(20rem,45vw,32rem)] z-10 pointer-events-none  ">
        <div className="portrait-wrapper w-full h-full flex justify-center">
          <img
            src={portraitSvg}
            alt="Tou Xiong Lor - Web Designer & Developer Portrait"
            className="portrait-img w-full h-auto object-contain drop-shadow-2xl"
            fetchPriority="high"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none leading-[0.85]"
        aria-hidden="true"
      >
        <div
          className="giant-text font-poppins font-black text-[clamp(14vw,18vw,22vw)] xl:text-[clamp(14vw,15vw,22vw)] 3xl:text-[clamp(14vw,17.7vw,22vw)] tracking-tighter flex flex-col w-full px-[5%] md:px-[10%] mb-[15vh] md:mb-0 pt-12 md:pt-16 text-transparent translate-x-3 translate-y-3 opacity-50 md:translate-x-0 md:translate-y-0 md:opacity-100"
          style={{ WebkitTextStroke: "2px #6495ED" }}
        >
          <div className="word-1 text-left w-full h-[0.85em] overflow-hidden ">
            <div className="reel-1 flex flex-col w-full">
              <span className="block h-[0.85em] leading-[0.85]">TOU</span>
              <span className="block h-[0.85em] leading-[0.85]">PIXEL</span>
              <span className="block h-[0.85em] leading-[0.85]">VISUAL</span>
              <span className="block h-[0.85em] leading-[0.85]">SITE</span>
            </div>
          </div>

          <div className="word-2 text-center w-full h-[0.85em] overflow-hidden pr-6 md:pr-12">
            <div className="reel-2 flex flex-col w-full">
              <span className="block h-[0.85em] leading-[0.85] ">XIONG</span>
              <span className="block h-[0.85em] leading-[0.85]">CRAFT</span>
              <span className="block h-[0.85em] leading-[0.85]">DESIGN</span>
              <span className="block h-[0.85em] leading-[0.85] ">GROWS</span>
            </div>
          </div>

          <div className="word-3 text-right w-full h-[0.85em] overflow-hidden pr-4 md:pr-10">
            <div className="reel-3 flex flex-col w-full">
              <span className="block h-[0.85em] leading-[0.85]">LOR</span>
              <span className="block h-[0.85em] leading-[0.85]">LOGIC</span>
              <span className="block h-[0.85em] leading-[0.85]">SYSTEM</span>
              <span className="block h-[0.85em] leading-[0.85] ">BRAND</span>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-text absolute top-[20vh] left-6 md:top-auto md:bottom-12 md:left-12 z-30 flex flex-col pointer-events-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-[1px] bg-gradient-to-br from-white/30 to-white/10">
        <div className="bg-oat-cream/40 md:bg-transparent rounded-[calc(1rem-1px)] p-4 md:p-6 w-full h-full">
          <h2 className="font-poppins text-soft-black text-sm md:text-base lg:text-xl 3xl:text-xl font-medium flex items-center gap-2 m-0">
            <span
              aria-hidden="true"
              className="w-2 h-2 rounded-full bg-cornflower animate-pulse"
            ></span>
            Hey! I'm Tou
          </h2>
          <p className="font-poppins text-soft-black/80 text-xs md:text-sm mt-1 max-w-[200px] md:max-w-[200px] lg:max-w-[250px] 3xl:max-w-[300px] leading-relaxed xl:text-lg 3xl:text-xl">
            Web Designer & Developer based in Milwaukee, WI.
          </p>
        </div>
      </div>

      <div className="cta-button absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 pointer-events-auto">
        <a
          href="#project"
          onClick={(e) => handleScroll(e, "project")}
          className="group flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-cornflower text-oat-cream rounded-full hover:bg-soft-black transition-all duration-300 shadow-lg"
          aria-label="See My Work"
        >
          <ArrowDown
            aria-hidden="true"
            className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform duration-300"
          />
        </a>
      </div>
    </header>
  );
};
