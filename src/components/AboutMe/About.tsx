import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMeHeadshot from "../../img/about-Imgs/AboutMe_Headshot.webp";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // 1. Create a reference to the entire About section
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 2. Find all elements inside this section that have the "reveal-target" class
    const targets = gsap.utils.toArray(".reveal-target", sectionRef.current);

    // 3. Create the fade-in and slide-up animation
    gsap.fromTo(
      targets,
      {
        y: 80, // Start 80px pushed down
        opacity: 0, // Start completely invisible
      },
      {
        y: 0, // Slide up to original position
        opacity: 1, // Fade to fully visible
        duration: 1.2, // How long the fade takes
        stagger: 0.2, // The delay between each item appearing
        ease: "power3.out", // A smooth deceleration effect
        scrollTrigger: {
          trigger: sectionRef.current,
          // The animation starts when the top of the About section hits 75% down the screen
          start: "top 75%",
          // Optional: uncomment the line below if you want the animation to hide and replay when scrolling up and down
          // toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef} // Attach the ref here
      id="about"
      aria-labelledby="about-heading"
      className="min-h-[100dvh] bg-rich-black text-oat-cream py-10 md:py-16 lg:py-20 w-full overflow-hidden"
    >
      <div className="w-[80%] lg:max-w-7xl 3xl:max-w-full mx-auto">
        {/* Added 'reveal-target' to the H1 */}
        <h1
          id="about-heading"
          className="reveal-target font-anton text-5xl text-oat-cream md:text-6xl lg:text-5xl xl:text-7xl 3xl:text-8xl mb-12 md:mb-16 tracking-wide opacity-0"
        >
          LEARN <span className="text-cornflower ">ABOUT ME</span> BEYOND THE
          PORTFOLIO
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          {/* Left Column: Added 'reveal-target' */}
          <div className="reveal-target flex flex-col gap-6 items-center opacity-0">
            <img
              src={AboutMeHeadshot}
              alt="Headshot of Tou Xiong Lor"
              loading="lazy"
              className="w-4/5 3xl:3/5 rounded-2xl object-cover aspect-[3/4]"
              referrerPolicy="no-referrer"
            />
            <article className="3xl:hidden space-y-4 font-poppins text-base md:text-lg leading-relaxed w-3/4">
              <p>
                Designer by heart, developer by trade, and curious by nature. I
                bridge the gap between 'that looks cool' and 'that works
                perfectly.' My goal is simple: to take your spark of an idea and
                turn it into a custom, intuitive digital experience that people
                actually love to use. I’m always learning, always building, and
                always ready to help you show the world what you’ve got.
              </p>
            </article>
          </div>

          {/* Right Column: Added 'reveal-target' */}
          <div className="reveal-target flex flex-col opacity-0">
            <article className="hidden 3xl:block space-y-4 font-poppins text-base md:text-lg leading-relaxed w-full mb-5">
              <p>
                Designer by heart, developer by trade, and curious by nature. I
                bridge the gap between 'that looks cool' and 'that works
                perfectly.' My goal is simple: to take your spark of an idea and
                turn it into a custom, intuitive digital experience that people
                actually love to use. I’m always learning, always building, and
                always ready to help you show the world what you’ve got.
              </p>
            </article>
            <dl className="divide-y divide-white/10 border-t border-white/10 m-0">
              <InfoRow title="BASED IN" content="Milwaukee, WI" />
              <InfoRow
                title="LANGUAGES"
                content="English (Native), Hmong (Fluent)"
              />
              <InfoRow
                title="STUDIES"
                content="Information Science Degree, Computer Science Certification"
              />
              <InfoRow
                title="OFF THE CLOCK"
                content="Gaming, Painting/Drawing, Singing, Sports [Soccer, Football, Volleyball], Listening to Music, Creating"
              />
              <InfoRow
                title="Fun Fact"
                content="I was born in Thailand and moved to the United States when I was 2 years old"
              />
              <InfoRow
                title="CURRENT OBSESSION"
                content="Designing and Developing Websites and Graphics"
              />
            </dl>

            <div className="mt-10 md:mt-12">
              <h2 className="font-fraunces text-xs md:text-sm tracking-[0.15em] uppercase mb-5 text-oat-cream/80">
                HOW COLLEAGUES DESCRIBE ME
              </h2>
              <ul
                aria-label="Professional traits"
                className="flex flex-wrap gap-3 p-0 m-0 list-none"
              >
                <Tag text="Good Communicator" />
                <Tag text="Proactive" />
                <Tag text="Fun to work with" />
                <Tag text="Calm under pressure" />
                <Tag text="Curious by default" />
                <Tag text="Perfectionist" />
                <Tag text="Nonchalant" />
                <Tag text="Understanding" />
                <Tag text="Positive" />
                <Tag text="Enthusiastic" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ title, content }: { title: string; content: string }) {
  return (
    <div className="py-5 md:py-6 grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr] gap-4 md:gap-8 items-start">
      <dt className="font-fraunces text-sm tracking-[0.1em] uppercase text-oat-cream/80 mt-1">
        {title}
      </dt>
      <dd className="font-poppins text-sm md:text-base text-oat-cream m-0">
        {content}
      </dd>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <li>
      <span className="inline-block px-5 py-2.5 rounded-full border border-white/10 text-sm font-poppins text-oat-cream/90 hover:border-cornflower hover:text-cornflower transition-colors cursor-default bg-transparent">
        {text}
      </span>
    </li>
  );
}
