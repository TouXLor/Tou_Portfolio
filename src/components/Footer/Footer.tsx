import React, { useEffect, useRef } from "react";
import { Instagram, Facebook, Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Footer: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ A11Y FIX: Using matchMedia to respect OS-level "Reduce Motion" settings
    let mm = gsap.matchMedia();

    // Only run the sliding animation if the user hasn't requested reduced motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        textRef.current,
        {
          yPercent: 50,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    });

    // If they do prefer reduced motion, just snap the text to its final visible state
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(textRef.current, { yPercent: 0, opacity: 1 });
    });

    return () => mm.revert(); // Automatically cleans up all matchMedia instances
  }, []);

  const navItems = [
    { label: "Home", id: "top" },
    { label: "Works", id: "works" },
    { label: "Services", id: "service" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="w-full bg-rich-black text-oat-cream py-16 px-6 md:px-12 flex flex-col">
      <div className="w-full flex flex-col">
        {/* Top Row: Navigation & Socials */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side: Nav Links */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap justify-center items-center gap-0 md:gap-8 lg:gap-4 m-0 p-0 list-none">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={`/#${item.id}`}
                    className="font-anton text-lg md:text-xl hover:text-cornflower transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm px-2 block tracking-widest"
                    onClick={(e) => {
                      e.preventDefault();
                      gsap.to(window, {
                        duration: 1.2,
                        scrollTo: { y: `#${item.id}`, offsetY: 0 },
                        ease: "power4.inOut",
                      });
                    }}
                    onKeyDown={(e) => {
                      if ((e as React.KeyboardEvent).key === "Enter") {
                        e.preventDefault();
                        gsap.to(window, {
                          duration: 1.2,
                          scrollTo: { y: `#${item.id}`, offsetY: 0 },
                          ease: "power4.inOut",
                        });
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side: Social Icons */}
          <nav aria-label="Social Media Profiles">
            <ul className="flex justify-center items-center gap-6 m-0 p-0 list-none">
              <li>
                <a
                  href="https://www.instagram.com/tou_xlor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow me on Instagram"
                  className="hover:text-cornflower hover:-translate-y-1 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md block"
                >
                  <Instagram className="w-6 h-6" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/tou.xiong.bay.lor"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow me on Facebook"
                  className="hover:text-cornflower hover:-translate-y-1 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md block"
                >
                  <Facebook className="w-6 h-6" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Touxlor"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View my GitHub projects"
                  className="hover:text-cornflower hover:-translate-y-1 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md block"
                >
                  <Github className="w-6 h-6" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tou-xiong-lor"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with me on LinkedIn"
                  className="hover:text-cornflower hover:-translate-y-1 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md block"
                >
                  <Linkedin className="w-6 h-6" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Middle Row: Massive Typography */}
        <div className="w-full mt-12 md:mt-16 lg:mt-24 flex flex-col items-center overflow-hidden relative">
          <div className="w-full select-none flex justify-center items-end leading-[0.75] pointer-events-none">
            {/* ✅ SEO & A11Y FIX: Visually hidden text so search engines and screen readers actually read your name */}
            <span className="sr-only">Tou Xiong Lor</span>

            <div
              ref={textRef}
              aria-hidden="true"
              className="w-full flex justify-start font-poppins font-black text-cornflower text-[clamp(3rem,13vw,8rem)] md:text-[clamp(4rem,11.1vh,15vw)] lg:text-[clamp(7rem,13.3vw,10rem)] xl:text-[clamp(10rem,13.7vw,14rem)] 3xl:text-[clamp(10vw,15.7vw,18vw)] whitespace-nowrap"
            >
              <span className="tracking-tightest">TOU</span>
              <span className="tracking-tightest ml-[0.13em]">XIONG</span>
              <span className="tracking-tightest ml-[0.13em]">LOR</span>
            </div>
          </div>
          <div
            className="w-full h-[2px] bg-cornflower mt-4 md:mt-8"
            aria-hidden="true"
            role="presentation"
          />
        </div>

        {/* Bottom Row: Fine Print */}
        <div className="w-full flex flex-wrap items-center justify-center xl:justify-between gap-x-6 gap-y-4 mt-8 text-center font-poppins text-sm md:text-base lg:text-lg text-oat-cream/80">
          <small className="flex flex-col md:flex-row gap-4 items-center text-sm md:text-base lg:text-lg m-0 p-0">
            <span>Designed & Developed by Tou Xiong Lor</span>
            <span className="hidden md:inline" aria-hidden="true">
              |
            </span>
            <span>&copy; 2026</span>
            <span className="hidden md:inline" aria-hidden="true">
              |
            </span>
            <span>All rights reserved.</span>
          </small>

          <nav aria-label="Legal Information">
            <ul className="flex gap-6 m-0 p-0 list-none">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new Event("openCookieBanner"))
                  }
                  className="hover:text-cornflower transition-colors outline-none focus-visible:ring-1 focus-visible:ring-cornflower block"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-cornflower transition-colors outline-none focus-visible:ring-1 focus-visible:ring-cornflower block"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-cornflower transition-colors outline-none focus-visible:ring-1 focus-visible:ring-cornflower block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
