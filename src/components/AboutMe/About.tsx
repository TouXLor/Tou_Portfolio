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

            <ResumeButton />

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

function ResumeButton() {
  // 👇 ADD THIS FUNCTION 👇
  const handleDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only trigger the download if the box is being checked (not unchecked)
    if (e.target.checked) {
      // Create a temporary invisible link
      const link = document.createElement("a");
      // Point it to the PDF in your public folder
      link.href = `${import.meta.env.BASE_URL}Tou_Xiong_Lor_Resume.pdf`;
      // Tell the browser to download it instead of opening it
      link.download = "Tou_Xiong_Lor_Resume.pdf";

      // Append, click, and remove the invisible link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="flex justify-center items-center font-poppins w-full my-2">
      <style>{`
        .resume-label {
          background-color: transparent;
          border: 2px solid #597FE8; /* cornflower */
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
        }

        .resume-label::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #EAE7DC; /* oat-cream */
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }

        .resume-label .input {
          display: none;
        }

        .resume-label .title {
          font-size: 17px;
          color: #EAE7DC; /* oat-cream */
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 14px;
          text-align: center;
          margin: 0;
        }

        .resume-label .title:last-child {
          opacity: 0;
          visibility: hidden;
        }

        .resume-label .circle {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: #597FE8; /* cornflower */
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 #EAE7DC;
          overflow: hidden;
        }

        .resume-label .circle .icon {
          color: #EAE7DC; /* oat-cream */
          width: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .resume-label .circle .square {
          aspect-ratio: 1;
          width: 15px;
          border-radius: 2px;
          background-color: #EAE7DC; /* oat-cream */
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .resume-label .circle::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-color: #050505; /* rich-black (Progress fill) */
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }

        .resume-label:has(.input:checked) {
          width: 57px;
          animation: installed 0.4s ease 3.5s forwards;
        }

        .resume-label:has(.input:checked)::before {
          animation: rotate 3s ease-in-out 0.4s forwards;
        }

        .resume-label .input:checked + .circle {
          animation: pulse 1s forwards, circleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }

        .resume-label .input:checked + .circle::before {
          animation: installing 3s ease-in-out forwards;
        }

        .resume-label .input:checked + .circle .icon {
          opacity: 0;
          visibility: hidden;
        }

        .resume-label .input:checked ~ .circle .square {
          opacity: 1;
          visibility: visible;
        }

        .resume-label .input:checked ~ .title {
          opacity: 0;
          visibility: hidden;
        }

        .resume-label .input:checked ~ .title:last-child {
          animation: showInstalledMessage 0.4s ease 3.5s forwards;
        }

        @keyframes pulse {
          0% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(234, 231, 220, 0.7); /* oat-cream with opacity */
          }
          70% {
            scale: 1;
            box-shadow: 0 0 0 16px rgba(234, 231, 220, 0);
          }
          100% {
            scale: 0.95;
            box-shadow: 0 0 0 0 rgba(234, 231, 220, 0);
          }
        }

        @keyframes installing {
          from { height: 0; }
          to { height: 100%; }
        }

        @keyframes rotate {
          0% {
            transform: rotate(-90deg) translate(27px) rotate(0);
            opacity: 1;
            visibility: visible;
          }
          99% {
            transform: rotate(270deg) translate(27px) rotate(270deg);
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes installed {
          100% {
            width: 150px;
            border-color: #597FE8; /* cornflower */
          }
        }

        @keyframes circleDelete {
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes showInstalledMessage {
          100% {
            opacity: 1;
            visibility: visible;
            right: 56px;
          }
        }
      `}</style>

      <label className="resume-label">
        {/* Once the user clicks, the checkbox triggers the CSS animation. You can add an onChange event here later to actually download the file. */}
        <input type="checkbox" className="input" onChange={handleDownload} />
        <span className="circle">
          <svg
            className="icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            ></path>
          </svg>
          <div className="square"></div>
        </span>
        <p className="title">Resume</p>
        <p className="title">Open</p>
      </label>
    </div>
  );
}
