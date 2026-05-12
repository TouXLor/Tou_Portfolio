import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TermsConditions() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-item", {
        opacity: 0,
        x: -10,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="space-y-10 font-poppins text-rich-black/80 leading-relaxed max-w-prose mx-auto"
    >
      <div className="gsap-item pb-6 border-b-2 border-black">
        <h2 className="font-anton text-4xl sm:text-5xl uppercase tracking-wide text-rich-black">
          Terms of Use
        </h2>
        <p className="font-mono text-xs sm:text-sm tracking-widest text-cornflower mt-3 uppercase font-bold">
          Effective Date: April 29, 2026
        </p>
      </div>

      <section className="gsap-item">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="text-2xl not-italic font-anton text-cornflower opacity-50">
            #1
          </span>
          My Work & Intellectual Property
        </h3>
        <p>
          Everything you see on this site—from the UI/UX design to the
          underlying code, animations, and graphics—is my original work owned by{" "}
          <strong className="text-rich-black">Tou Xiong Lor</strong> unless
          otherwise stated. Please do not copy, scrape, or repurpose my site's
          code or design assets to use as your own without explicitly asking me
          for written permission first.
        </p>
      </section>

      <section className="gsap-item">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="text-2xl not-italic font-anton text-cornflower opacity-50">
            #2
          </span>
          External Links
        </h3>
        <p>
          I occasionally link out to live client sites or external platforms
          like GitHub and LinkedIn. Once you leave my site, you are bound by
          their specific terms and privacy policies. I do not control those
          external sites and assume no responsibility for their content or
          practices.
        </p>
      </section>

      <section className="gsap-item">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="text-2xl not-italic font-anton text-cornflower opacity-50">
            #3
          </span>
          The Legal Basics
        </h3>
        <p className="p-5 bg-rich-black text-oat-cream font-mono text-sm leading-relaxed shadow-lg border-l-4 border-cornflower">
          This portfolio is provided for informational and display purposes "as
          is." These terms are governed by the laws of the State of Wisconsin. I
          may update this page occasionally, and continuing to browse the site
          means you accept any changes.
        </p>
      </section>

      <section className="gsap-item pt-8 border-t-2 border-black mt-12">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-3">
          Contact Me
        </h3>
        <p className="flex items-center gap-3 font-mono text-sm bg-rich-black text-oat-cream p-4 ">
          <span className="uppercase text-xs font-bold tracking-widest text-oat-cream/50">
            Email
          </span>
          <a
            href="mailto:touxlor7@gmail.com"
            className="text-cornflower hover:text-white transition-colors"
          >
            touxlor7@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
}
