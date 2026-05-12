import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function PrivacyPolicy() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-item", {
        opacity: 0,
        y: 10,
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
          Privacy Policy
        </h2>
        <p className="font-mono text-xs sm:text-sm tracking-widest text-cornflower mt-3 uppercase font-bold">
          Effective Date: May 11, 2026
        </p>
      </div>

      <section className="gsap-item">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-oat-cream flex items-center justify-center text-sm not-italic font-anton text-cornflower">
            01
          </span>
          The Short Version
        </h3>
        <p>
          Welcome to my portfolio! I believe in keeping things simple and
          transparent. I only collect information you voluntarily give me (like
          sending an email or filling out a contact form) and basic, anonymized
          data about how visitors interact with my site to help me improve my
          UI/UX designs. I am the sole owner of this site, and I do not sell
          your personal data to anyone.
        </p>
      </section>

      <section className="gsap-item bg-oat-cream p-6 border-l-4 border-cornflower">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm not-italic font-anton text-cornflower shadow-sm">
            02
          </span>
          Tracking & Analytics
        </h3>
        <p className="mb-4">
          To understand what projects catch people's eyes and ensure my site is
          performing well, I use two standard industry tools:
        </p>
        <ul className="space-y-5">
          <li className="border-t border-stone-line pt-4">
            <strong className="text-rich-black block mb-1 text-sm uppercase tracking-wider font-bold">
              Google Analytics
            </strong>{" "}
            This helps me measure general website traffic, see where my visitors
            are coming from, and check standard performance metrics.
          </li>
          <li className="border-t border-stone-line pt-4">
            <strong className="text-rich-black block mb-1 text-sm uppercase tracking-wider font-bold">
              Microsoft Clarity
            </strong>{" "}
            This tool provides behavioral metrics like heatmaps and scroll
            depth. It shows me how users navigate my layouts so I can make
            better design decisions.
          </li>
        </ul>
      </section>

      <section className="gsap-item">
        <h3 className="font-fraunces italic font-semibold text-2xl text-rich-black mb-4 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-oat-cream flex items-center justify-center text-sm not-italic font-anton text-cornflower">
            03
          </span>
          How I Use This Information
        </h3>
        <p className="mb-4">Any data collected is strictly used to:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Reply to your inquiries or project requests.",
            "Analyze portfolio engagement (like which case studies get read).",
            "Optimize site performance and fix navigational bugs.",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 shadow-[4px_4px_0_0_rgba(5,5,5,1)] border-2 border-rich-black flex items-start group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_rgba(5,5,5,1)] transition-all cursor-default"
            >
              <span className="text-cornflower font-anton text-xl mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
                0{i + 1}
              </span>
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
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
