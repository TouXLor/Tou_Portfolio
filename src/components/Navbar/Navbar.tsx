import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileMenu from "./MobileMenu";
import PortfolioLogo from "../../img/final_portfolio_logo.svg";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // Stop the instant jump
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${id}`, offsetY: 0 },
      ease: "power4.inOut",
    });
  };

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0 }, // Scroll to absolute top
      ease: "power4.inOut",
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const showAnim = gsap
        .from(navRef.current, {
          yPercent: -100,
          paused: true,
          duration: 0.3,
          ease: "power3.out",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          // Direction: 1 = down, -1 = up
          if (self.direction === -1) {
            showAnim.play();
          } else if (self.direction === 1 && self.scroll() > 50) {
            showAnim.reverse();
          }

          // Update scrolled state for background style
          if (self.scroll() > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navItems = [
    { label: "Works", id: "works" },
    { label: "Services", id: "service" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation" // ✅ A11Y FIX: Identifies this specific nav landmark
      // REMOVED: transition-all
      // ADDED: transition-[background-color,padding,backdrop-filter]
      className={`fixed top-0 left-0 w-full flex justify-between items-center z-[101] transition-[background-color,padding,backdrop-filter] duration-300 ${
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm py-4 px-6 md:px-12"
          : "bg-transparent p-6 md:p-12"
      }`}
    >
      {/* ✅ Fully SEO Optimized Logo Link */}
      <a
        href="#top"
        className="relative  font-poppins font-bold text-2xl text-richBlack tracking-tight cursor-pointer clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md"
        onClick={handleScrollTop}
        aria-label="Tou Xiong Lor - Return to top" // ✅ SEO/A11Y FIX: Consolidated description
      >
        <img
          src={PortfolioLogo}
          alt="" // ✅ A11Y FIX: Left empty because the anchor tag's aria-label already explains the purpose
          aria-hidden="true" // ✅ A11Y FIX: Hides the redundant image element from screen readers
          className="w-10 h-10"
        />
      </a>
      <ul className="hidden md:flex gap-8 font-anton font-medium text-rich-black text-base lg:text-lg 3xl:text-xl uppercase tracking-[0.3em]">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={`#${item.id}`}
              className="cursor-pointer hover:text-cornflower transition-colors clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
              onClick={(e) => handleScroll(e, item.id)}
              aria-label={`Maps to ${item.label} section`} // ✅ A11Y FIX: Descriptive action context
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <MobileMenu />
    </nav>
  );
};
