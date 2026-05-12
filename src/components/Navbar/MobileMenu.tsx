import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Linkedin, Github, Instagram } from "lucide-react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const menuItems = [
  { label: "Home", id: "top" },
  { label: "Works", id: "works" },
  { label: "Services", id: "service" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const textInnerRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // --- 1. Setup GSAP Context ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      // Gather colored layers
      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      // Initial States (Hidden to the right)
      gsap.set([panel, ...preLayers], { xPercent: 100 });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, []);

  // --- 2. Build Open Timeline ---
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".menu-item-text"));
    const socialLinks = Array.from(panel.querySelectorAll(".social-link"));

    // Reset positions for animation
    const layerStates = layers.map((el) => ({ el, start: 100 }));

    if (itemEls.length)
      gsap.set(itemEls, { yPercent: 100, rotate: 5, opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Animate Colored Layers
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.05,
      );
    });

    // Animate Main Panel
    const panelDelay = layerStates.length * 0.05;
    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.6, ease: "power4.out" },
      panelDelay,
    );

    // Animate Text Items
    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1,
        },
        panelDelay + 0.2,
      );
    }

    // Animate Socials
    if (socialLinks.length) {
      tl.to(
        socialLinks,
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 },
        panelDelay + 0.4,
      );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  // --- 3. Animation Controls ---
  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.4,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;

    if (opening) {
      gsap.to(h, { rotate: 45, duration: 0.5, ease: "power4.out" });
      gsap.to(v, { rotate: -45, duration: 0.5, ease: "power4.out" });
    } else {
      gsap.to(h, { rotate: 0, duration: 0.3, ease: "power3.inOut" });
      gsap.to(v, { rotate: 90, duration: 0.3, ease: "power3.inOut" });
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    // Cycle text: Menu -> Close -> Menu
    const target = opening ? "Close" : "Menu";
    const seq = [opening ? "Menu" : "Close", target, target];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    gsap.to(inner, {
      yPercent: -66.66, // Shift up to show the last item
      duration: 0.6,
      ease: "power4.out",
    });
  }, []);

  // --- 4. Toggle Logic ---
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) playOpen();
    else playClose();

    animateIcon(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateText]);

  const closeMenu = useCallback(() => {
    if (openRef.current) toggleMenu();
  }, [toggleMenu]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    closeMenu();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: `#${id}`, offsetY: 0 },
        ease: "power4.inOut",
      });
    }
  };

  return (
    <div className="md:hidden">
      {/* --- Toggle Button --- */}
      <button
        ref={toggleBtnRef}
        onClick={toggleMenu}
        type="button" // ✅ A11Y FIX
        aria-expanded={open} // ✅ A11Y FIX: Announces if menu is opened or closed
        aria-controls="mobile-menu-panel" // ✅ A11Y FIX: Links button to the menu container
        className="relative z-50 flex items-center gap-3 text-rich-black focus:outline-none pointer-events-auto clickable font-anton"
        aria-label={open ? "Close Menu" : "Open Menu"}
      >
        <span
          ref={textWrapRef}
          className="h-[1em] overflow-hidden text-sm font-medium uppercase tracking-widest text-rich-black"
          aria-hidden="true"
        >
          <span ref={textInnerRef} className="flex flex-col">
            {textLines.map((l, i) => (
              <span key={i} className="block h-[1em] leading-none">
                {l}
              </span>
            ))}
          </span>
        </span>

        {/* Animated Plus Icon */}
        <span
          ref={iconRef}
          className="relative w-4 h-4 block"
          aria-hidden="true"
        >
          <span
            ref={plusHRef}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-rich-black -translate-y-1/2"
          />
          <span
            ref={plusVRef}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-rich-black -translate-y-1/2 rotate-90"
          />
        </span>
      </button>

      {/* --- Full Screen Menu Overlay --- */}
      <div
        id="mobile-menu-panel" // ✅ A11Y FIX: Matches the button's aria-controls
        aria-hidden={!open} // ✅ A11Y FIX: Totally hides off-screen menu from assistive tech
        className={`fixed inset-0 z-40 w-full min-h-[100dvh] pointer-events-none overflow-hidden ${open ? "pointer-events-auto" : ""}`}
      >
        {/* Colored Pre-layers */}
        <div
          ref={preLayersRef}
          className="absolute inset-0 z-40 pointer-events-none"
        >
          <div className="sm-prelayer absolute inset-0 bg-darker-tan" />
          <div className="sm-prelayer absolute inset-0 bg-cornflower" />
        </div>

        {/* Main Panel */}
        <div
          ref={panelRef}
          className="absolute inset-0 z-50 bg-oat-cream flex flex-col justify-center px-8"
        >
          {/* Links */}
          {/* ✅ A11Y FIX: Labeled the mobile navigation landmark */}
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-6">
            {menuItems.map((item, i) => (
              <div key={i} className="overflow-hidden">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  tabIndex={open ? 0 : -1} // ✅ A11Y FIX: Prevents "Hidden Tab Trap" when menu is closed
                  className="menu-item-text block text-5xl  font-bold text-rich-black uppercase tracking-[0.1em] hover:text-cornflower transition-colors font-anton text-left w-full clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Socials */}
          <div className="mt-12 flex gap-8">
            <a
              href="https://www.linkedin.com/in/tou-xiong-lor-1b1b1b1b1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              tabIndex={open ? 0 : -1} // ✅ A11Y FIX: Prevents "Hidden Tab Trap"
              className="social-link block text-rich-black hover:text-cornflower clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
            >
              <Linkedin size={24} aria-hidden="true" />{" "}
              {/* ✅ A11Y FIX: Hides redundant icon */}
            </a>
            <a
              href="https://github.com/Touxlor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              tabIndex={open ? 0 : -1} // ✅ A11Y FIX: Prevents "Hidden Tab Trap"
              className="social-link block text-rich-black hover:text-cornflower clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
            >
              <Github size={24} aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/touxlor/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my Instagram profile"
              tabIndex={open ? 0 : -1} // ✅ A11Y FIX: Prevents "Hidden Tab Trap"
              className="social-link block text-rich-black hover:text-cornflower clickable outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-sm"
            >
              <Instagram size={24} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
