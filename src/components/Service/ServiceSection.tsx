import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { FiMail } from "react-icons/fi";
import WebImage from "../../img/service-Imgs/web.webp";
import SeoImage from "../../img/service-Imgs/seo.webp";
import GraphicImage from "../../img/service-Imgs/graphic.webp";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SERVICES_DATA = [
  {
    id: 1,
    title: (
      <>
        Graphic
        <br />
        Design
      </>
    ),
    imageSrc:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=1200&auto=format&fit=crop",
    imageAlt: "UI/UX Design 3D",
    bgImageSrc: GraphicImage,
    description:
      "Crafting intuitive user interfaces and compelling graphic designs that elevate your brand identity and engage your target audience.",
    pricing: "$1,000 - $5,000+ depending on project scope and complexity",
    columnStyle: "left",
  },
  {
    id: 2,
    title: (
      <>
        Custom
        <br />
        Website
      </>
    ),
    imageSrc:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&h=1200&auto=format&fit=crop",
    imageAlt: "Web Development 3D",
    bgImageSrc: WebImage,
    description:
      "Building responsive, high-performance websites with cutting-edge technologies. We turn complex problems into elegant digital solutions.",
    pricing: "$2,500 - $10,000+ depending on project scope and complexity",
    columnStyle: "center",
  },
  {
    id: 3,
    title: (
      <>
        SEO
        <br />
        Optimization
      </>
    ),
    imageSrc:
      "https://images.unsplash.com/photo-1674027326254-88c960d8e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgImageSrc: SeoImage,
    imageAlt: "SEO Optimization 3D",
    description:
      "Data-driven SEO strategies to improve your search rankings, drive organic traffic, and maximize your online visibility and growth.",
    pricing: "$1,000 - $3,000+/mo depending on project scope and complexity",
    columnStyle: "right",
  },
];

export default function ServiceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      // Entrance animation on scroll
      gsap.from([headingRef.current, subtitleRef.current, descRef.current], {
        opacity: 0,
        y: 40,
        duration: 2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.to(leftRef.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(rightRef.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(midRef.current, {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const handleCardClick = (
    index: number,
    cardRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (!cardRef.current) return;

    if (activeCard === index) {
      gsap.to(cardRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        rotationY: 0,
        zIndex: 1,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setActiveCard(null),
      });
    } else {
      setActiveCard(index);

      const isDesktop = window.innerWidth >= 1024;

      gsap.to(cardRef.current, {
        scale: isDesktop ? 1.875 : 1,
        x: isDesktop
          ? () => {
              const rect = cardRef.current!.getBoundingClientRect();
              const containerRect =
                rightSectionRef.current!.getBoundingClientRect();
              return (
                containerRect.width / 2 -
                (rect.left - containerRect.left) -
                rect.width / 2
              );
            }
          : 0,
        y: isDesktop
          ? () => {
              const rect = cardRef.current!.getBoundingClientRect();
              const containerRect =
                rightSectionRef.current!.getBoundingClientRect();
              return (
                containerRect.height / 2 -
                (rect.top - containerRect.top) -
                rect.height / 2
              );
            }
          : 0,
        rotationY: 180,
        zIndex: 50,
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    cardRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(index, cardRef);
    }
  };

  const closeActiveCard = () => {
    if (activeCard === 1) handleCardClick(1, card1Ref);
    else if (activeCard === 2) handleCardClick(2, card2Ref);
    else if (activeCard === 3) handleCardClick(3, card3Ref);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#contact", offsetY: 50 },
      ease: "power3.inOut",
    });
  };

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  return (
    <section
      id="service"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="bg-oat-cream text-rich-black font-poppins min-h-screen flex flex-col lg:flex-row relative"
    >
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${
          activeCard !== null
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeActiveCard}
        aria-hidden="true"
        tabIndex={-1}
      />

      <header className="lg:w-[45%] px-8 mt-0 bg-rich-black lg:bg-transparent lg:p-8 md:p-16 lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center items-start z-10">
        <h2
          ref={headingRef}
          id="services-heading"
          className="text-cornflower mt-10 lg:mt-0 text-3xl lg:text-6xl mb-8 font-anton uppercase tracking-wide"
        >
          Services
        </h2>
        <p
          ref={subtitleRef}
          className="text-4xl md:text-5xl lg:text-6xl 3xl:text-8xl text-oat-cream lg:text-rich-black font-anton leading-[1.1] mb-6 tracking-wide uppercase"
        >
          A Comprehensive look
          <br />
          at what I offer.
        </p>
        <p
          ref={descRef}
          className="text-oat-cream/80 lg:text-rich-black/60 text-2xl lg:mb-10 max-w-md font-fraunces italic"
        >
          I craft premium digital experiences to elevate small brand and
          businesses.
        </p>
      </header>

      <div
        ref={rightSectionRef}
        className={`lg:w-[55%] bg-rich-black text-oat-cream relative lg:rounded-l-[40px] mt-0 perspective-1000 ${
          activeCard !== null ? "z-50" : "z-10"
        }`}
      >
        <div
          className={`absolute inset-0 z-40 lg:rounded-l-[40px] transition-all duration-500 lg:backdrop-blur-md lg:bg-rich-black/50 ${
            activeCard !== null
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeActiveCard}
          aria-hidden="true"
          tabIndex={-1}
        />

        <div className="py-16 lg:py-[25vh] px-4 md:px-8 overflow-hidden">
          {/* ✅ A11Y FIX: Added role="list" to the grid container */}
          <div
            ref={containerRef}
            role="list"
            className="max-w-[900px] mx-auto flex lg:grid lg:grid-cols-3 gap-6 relative overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* --- LEFT COLUMN --- */}
            <div
              ref={leftRef}
              role="listitem" // ✅ A11Y FIX: Marked column as a list item
              className={`flex flex-col gap-4 relative order-2 lg:order-1 min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center ${
                activeCard === 1 ? "z-50" : "z-10"
              }`}
            >
              <article
                ref={card1Ref}
                className="relative h-[400px] 3xl:h-[540px] w-full [transform-style:preserve-3d] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cornflower/50 rounded-t-full"
                onClick={() => handleCardClick(1, card1Ref)}
                onKeyDown={(e) => handleKeyDown(e, 1, card1Ref)}
                role="button"
                tabIndex={0}
                aria-expanded={activeCard === 1}
                aria-label={`View details for ${SERVICES_DATA[0].imageAlt}`}
              >
                <div
                  aria-hidden={activeCard === 1} // Hide front from SR when flipped
                  className="absolute inset-0 [backface-visibility:hidden] border-2 border-oat-cream flex flex-col items-center pt-12 pb-6 px-6 bg-rich-black z-10 overflow-hidden"
                >
                  <h3 className="relative z-10 text-cornflower font-anton text-5xl lg:text-4xl xl:text-6xl 3xl:text-7xl uppercase text-center leading-[1.1] tracking-wide">
                    {SERVICES_DATA[0].title}
                  </h3>
                  <div className="flex-1 w-full relative mt-6">
                    <img
                      src={SERVICES_DATA[0].bgImageSrc}
                      alt=""
                      decoding="async" // ✅ SEO FIX: Faster image rendering
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div
                  aria-hidden={activeCard !== 1} // ✅ A11Y FIX: Hide back from SR when NOT flipped
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-oat-cream flex flex-col items-center justify-center p-8 bg-oat-cream text-rich-black z-0"
                >
                  <h4 className="font-anton text-2xl 3xl:text-3xl mb-4 uppercase text-cornflower">
                    <span className="sr-only">
                      {SERVICES_DATA[0].imageAlt}{" "}
                    </span>
                    Details
                  </h4>
                  <p className="text-sm 3xl:text-base text-center mb-6">
                    {SERVICES_DATA[0].description}
                  </p>
                  <div className="text-sm text-center mb-6 opacity-80">
                    {SERVICES_DATA[0].pricing}
                  </div>
                  <button
                    type="button"
                    tabIndex={activeCard === 1 ? 0 : -1} // ✅ A11Y FIX: Prevent hidden button focus
                    className="bg-cornflower text-rich-black p-4 rounded-full hover:scale-110 transition-transform shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rich-black/20"
                    onClick={scrollToContact}
                    aria-label={`Contact us about ${SERVICES_DATA[0].imageAlt}`}
                  >
                    <FiMail className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </article>

              <div
                className={`relative h-6 w-full flex items-center px-4 transition-all duration-500 ${
                  activeCard === 1
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <ArrowRight
                  className="text-cornflower w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(1, card1Ref);
                  }}
                />
              </div>

              <div
                className={`hidden lg:flex border-2 border-oat-cream overflow-hidden h-[320px] 3xl:h-[432px] transition-all duration-500 ${
                  activeCard === 1
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src={SERVICES_DATA[0].imageSrc}
                  alt={SERVICES_DATA[0].imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* --- CENTER COLUMN --- */}
            <div
              ref={midRef}
              role="listitem"
              className={`flex flex-col gap-4 order-1 lg:order-2 lg:-mt-24 relative min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center ${
                activeCard === 2 ? "z-50" : "z-10"
              }`}
            >
              <div
                className={`hidden lg:flex border-2 border-oat-cream overflow-hidden h-[320px] 3xl:h-[432px] bg-oat-cream transition-all duration-500 ${
                  activeCard === 2
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src={SERVICES_DATA[1].imageSrc}
                  alt={SERVICES_DATA[1].imageAlt}
                  className="w-full h-full object-cover "
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className={`relative h-6 w-full flex items-center justify-start px-4 transition-all duration-500 ${
                  activeCard === 2
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <ArrowRight
                  className="text-cornflower w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(2, card2Ref);
                  }}
                />
              </div>

              <article
                ref={card2Ref}
                className="relative h-[400px] 3xl:h-[540px] w-full [transform-style:preserve-3d] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cornflower/50 rounded-b-full"
                onClick={() => handleCardClick(2, card2Ref)}
                onKeyDown={(e) => handleKeyDown(e, 2, card2Ref)}
                role="button"
                tabIndex={0}
                aria-expanded={activeCard === 2}
                aria-label={`View details for ${SERVICES_DATA[1].imageAlt}`}
              >
                <div
                  aria-hidden={activeCard === 2}
                  className="absolute inset-0 [backface-visibility:hidden] border-2 border-oat-cream flex flex-col items-center pt-6 pb-12 px-6  text-rich-black z-10 overflow-hidden"
                >
                  <div className="flex-1 w-full relative mb-6">
                    <img
                      src={SERVICES_DATA[1].bgImageSrc}
                      alt=""
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <h3 className="relative z-10 text-cornflower font-anton text-5xl lg:text-4xl xl:text-6xl 3xl:text-7xl uppercase text-center leading-[1.1] tracking-wide">
                    {SERVICES_DATA[1].title}
                  </h3>
                </div>

                <div
                  aria-hidden={activeCard !== 2}
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-oat-cream flex flex-col items-center justify-center p-8 bg-rich-black text-oat-cream z-0"
                >
                  <h4 className="font-anton text-2xl 3xl:text-3xl mb-4 uppercase text-cornflower">
                    <span className="sr-only">
                      {SERVICES_DATA[1].imageAlt}{" "}
                    </span>
                    Details
                  </h4>
                  <p className="text-sm 3xl:text-base text-center mb-6">
                    {SERVICES_DATA[1].description}
                  </p>
                  <div className="text-sm text-center mb-6 opacity-80">
                    {SERVICES_DATA[1].pricing}
                  </div>
                  <button
                    type="button"
                    tabIndex={activeCard === 2 ? 0 : -1}
                    className="bg-cornflower text-rich-black p-4 rounded-full hover:scale-110 transition-transform shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-oat-cream/20"
                    onClick={scrollToContact}
                    aria-label={`Contact us about ${SERVICES_DATA[1].imageAlt}`}
                  >
                    <FiMail className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div
              ref={rightRef}
              role="listitem"
              className={`flex flex-col gap-4 relative order-3 lg:order-3 min-w-[85vw] md:min-w-[45vw] lg:min-w-0 snap-center ${
                activeCard === 3 ? "z-50" : "z-10"
              }`}
            >
              <article
                ref={card3Ref}
                className="relative h-[400px] 3xl:h-[540px] w-full [transform-style:preserve-3d] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cornflower/50 rounded-t-full"
                onClick={() => handleCardClick(3, card3Ref)}
                onKeyDown={(e) => handleKeyDown(e, 3, card3Ref)}
                role="button"
                tabIndex={0}
                aria-expanded={activeCard === 3}
                aria-label={`View details for ${SERVICES_DATA[2].imageAlt}`}
              >
                <div
                  aria-hidden={activeCard === 3}
                  className="absolute inset-0 [backface-visibility:hidden] border-2 border-oat-cream flex flex-col items-center pt-12 pb-6 px-6 bg-rich-black z-10 overflow-hidden"
                >
                  <h3 className="relative z-10 text-cornflower font-anton text-5xl lg:text-2xl xl:text-4xl 3xl:text-5xl uppercase text-center leading-[1.1] tracking-wide">
                    {SERVICES_DATA[2].title}
                  </h3>
                  <div className="flex-1 w-full relative mt-6">
                    <img
                      src={SERVICES_DATA[2].bgImageSrc}
                      alt=""
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div
                  aria-hidden={activeCard !== 3}
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border-2 border-oat-cream flex flex-col items-center justify-center p-8 bg-oat-cream text-rich-black z-0"
                >
                  <h4 className="font-anton text-2xl 3xl:text-3xl mb-4 uppercase text-cornflower">
                    <span className="sr-only">
                      {SERVICES_DATA[2].imageAlt}{" "}
                    </span>
                    Details
                  </h4>
                  <p className="text-sm 3xl:text-base text-center mb-6">
                    {SERVICES_DATA[2].description}
                  </p>
                  <div className="text-sm text-center mb-6 opacity-80">
                    {SERVICES_DATA[2].pricing}
                  </div>
                  <button
                    type="button"
                    tabIndex={activeCard === 3 ? 0 : -1}
                    className="bg-cornflower text-rich-black p-4 rounded-full hover:scale-110 transition-transform shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rich-black/20"
                    onClick={scrollToContact}
                    aria-label={`Contact us about ${SERVICES_DATA[2].imageAlt}`}
                  >
                    <FiMail className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </article>

              <div
                className={`relative h-6 w-full flex items-center justify-start px-4 transition-all duration-500 ${
                  activeCard === 3
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <ArrowRight
                  className="text-cornflower w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(3, card3Ref);
                  }}
                />
              </div>

              <div
                className={`hidden lg:flex border-2 border-oat-cream overflow-hidden h-[320px] 3xl:h-[432px] transition-all duration-500 ${
                  activeCard === 3
                    ? "lg:opacity-30 lg:blur-md pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src={SERVICES_DATA[2].imageSrc}
                  alt={SERVICES_DATA[2].imageAlt}
                  className="w-full h-full object-cover "
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ A11Y FIX: Converted from a <div role="button"> to a native <button type="button">
// Native buttons automatically support "Enter" and "Spacebar" presses, making them incredibly keyboard-friendly!
function ArrowRight({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Expand details"
      className="flex items-center gap-2 cursor-pointer hover:translate-x-2 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cornflower/50 rounded bg-transparent border-none p-0"
    >
      <span className="text-cornflower font-anton uppercase text-sm tracking-wider">
        Click
      </span>
      <svg
        viewBox="0 0 48 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className || ""}
        aria-hidden="true"
      >
        <path
          d="M0 6H46M46 6L41 1M46 6L41 11"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
