import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const ContactCTA: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const vantaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Function to initialize Vanta
  const initVanta = () => {
    if (!vantaEffect && vantaRef.current) {
      const effect = BIRDS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        wingSpan: 23.0,
        speedLimit: 0.8,
        separation: 69.0,
        cohesion: 20.0,
        quantity: 4.0,
        backgroundColor: 0xe8e4d9,
        color1: 0x6495ed,
        color2: 0x4a4a4a,
      });
      setVantaEffect(effect);
    }
  };

  useEffect(() => {
    // 1. Setup ScrollTrigger to manage the Vanta instance
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom", // Start loading when the top of the section hits the bottom of the viewport
      end: "bottom top", // Ends when the bottom of the section leaves the top of the viewport
      onEnter: () => initVanta(),
      onEnterBack: () => initVanta(),
      onLeave: () => {
        if (vantaEffect) {
          vantaEffect.destroy();
          setVantaEffect(null);
        }
      },
      onLeaveBack: () => {
        if (vantaEffect) {
          vantaEffect.destroy();
          setVantaEffect(null);
        }
      },
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
      trigger.kill();
    };
  }, [vantaEffect]); // Re-run if vantaEffect changes to keep the destruction logic in sync
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-32 lg:py-40 w-full overflow-hidden"
    >
      {/* Vanta Background Container */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        aria-hidden="true" // Hide decorative background from screen readers
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-7xl mx-auto w-full h-full">
        {/* Left Column: Info */}
        <div className="flex flex-col gap-10 justify-center h-full self-center">
          <div>
            {/* SEO & A11y Fix: Added a visually hidden h2 for proper document outline */}
            <h2 id="contact-heading" className="sr-only">
              Contact Information
            </h2>
            <h2
              className="block text-cornflower font-anton font-normal tracking-wide uppercase mb-4 text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl"
              aria-hidden="true" // Hide decorative subtitle since the H2 covers the context
            >
              Get in Touch
            </h2>
            <p className="text-5xl md:text-6xl lg:text-7xl  font-bold text-rich-black font-anton tracking-widest leading-[1.1]">
              {/* LET<span className="text-cornflower">'</span>S WORK <br />
              TOGETHER<span className="text-cornflower">.</span> */}
              YOUR B<span className="text-cornflower">U</span>SINESS
              <br />
              YOUR BR<span className="text-cornflower">AND</span>
              <br />
              YOUR S<span className="text-cornflower">I</span>TE
            </p>
            <p className="mt-8 text-lg md:text-2xl text-rich-black font-fraunces leading-relaxed max-w-md opacity-90">
              LETS WORK TOGETHER ON YOUR PROJECT IDEA
            </p>
          </div>

          {/* Contact Links (Left aligned again) */}
          {/* SEO Fix: Wrapped contact details in a semantic <address> tag */}
          <address className="flex flex-col gap-6 mt-4 not-italic">
            <a
              href="mailto:touxlor7@gmail.com"
              aria-label="Email me at touxlor7@gmail.com" // A11y Fix: Clear context for screen readers
              className="flex items-center gap-4 group cursor-pointer w-fit outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md pr-4"
            >
              <div className="w-12 h-12 rounded-full bg-rich-black  border border-rich-black/10 flex items-center justify-center text-cornflower group-hover:border-cornflower/50 group-hover:bg-cornflower/10 transition-all duration-300">
                <Mail aria-hidden="true" className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-soft-black font-poppins uppercase tracking-wider font-bold opacity-70">
                  Email
                </span>
                <span className="text-lg text-rich-black font-fraunces font-medium group-hover:text-cornflower transition-colors">
                  touxlor7@gmail.com
                </span>
              </div>
            </a>

            <a
              href="tel:+14143058402"
              aria-label="Call me at +1 414 305 8402" // A11y Fix: Clear context for screen readers
              className="flex items-center gap-4 group cursor-pointer w-fit outline-none focus-visible:ring-2 focus-visible:ring-cornflower rounded-md pr-4"
            >
              <div className="w-12 h-12 rounded-full bg-rich-black border border-rich-black/10 flex items-center justify-center text-cornflower group-hover:border-cornflower/50 group-hover:bg-cornflower/10 transition-all duration-300">
                <Phone aria-hidden="true" className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-soft-black font-poppins uppercase tracking-wider font-bold opacity-70">
                  Phone
                </span>
                <span className="text-lg text-rich-black font-fraunces font-medium group-hover:text-cornflower transition-colors">
                  +1 (414) 305-8402
                </span>
              </div>
            </a>
          </address>
        </div>

        {/* Right Column: Form */}
        <div className="h-full w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
