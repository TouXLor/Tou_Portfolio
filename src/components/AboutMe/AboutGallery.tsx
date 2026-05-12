import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imageModules = import.meta.glob("../../img/about-Imgs/gallery/*.webp", {
  eager: true,
});

const shuffle = (array: string[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Helper to generate SEO-friendly alt text from the filename
// E.g., "top_office_team.webp" becomes "Top office team"
const generateAltText = (filePath: string) => {
  const filename =
    filePath.split("/").pop()?.split(".")[0] || "Portfolio image";
  return filename.replace(/[-_]/g, " ");
};

export default function AboutGallery() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  const { topRowImages, bottomRowImages } = useMemo(() => {
    const allPaths = Object.keys(imageModules);

    const top = allPaths
      .filter((path) => path.includes("top_"))
      .map((path) => (imageModules[path] as any).default);

    const bottom = allPaths
      .filter((path) => path.includes("bottom_"))
      .map((path) => (imageModules[path] as any).default);

    return {
      topRowImages: shuffle(top),
      bottomRowImages: shuffle(bottom),
    };
  }, []);

  useEffect(() => {
    if (!topRowRef.current || !bottomRowRef.current) return;

    // A11Y FIX: GSAP MatchMedia respects system accessibility settings
    const mm = gsap.matchMedia();

    // Only run the marquee animation if the user DOES NOT have "Reduced Motion" enabled
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const topTween = gsap.to(topRowRef.current, {
        x: "-50%",
        ease: "none",
        duration: 80,
        repeat: -1,
        force3D: true,
      });

      const bottomTween = gsap.fromTo(
        bottomRowRef.current,
        { x: "-50%" },
        {
          x: "0%",
          ease: "none",
          duration: 60,
          repeat: -1,
          force3D: true,
        },
      );

      let timeoutId: NodeJS.Timeout;

      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(
            0,
            3000,
            Math.abs(self.getVelocity()),
          );
          const speedBoost = 1 + velocity / 500;

          gsap.to([topTween, bottomTween], {
            timeScale: speedBoost,
            duration: 0.1,
            overwrite: "auto",
          });

          if (timeoutId) clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            gsap.to([topTween, bottomTween], {
              timeScale: 1,
              duration: 0.5,
              overwrite: "auto",
            });
          }, 100);
        },
      });
    });

    // mm.revert() replaces ctx.revert() and handles all cleanup
    return () => mm.revert();
  }, []);

  // A11Y FIX: Added an `isClone` parameter to hide duplicated images from screen readers
  const renderImages = (
    images: string[],
    prefix: string,
    isClone: boolean = false,
  ) => (
    <div className="flex shrink-0" aria-hidden={isClone}>
      {images.map((src, index) => (
        <GalleryImage key={`${prefix}-${index}`} src={src} isClone={isClone} />
      ))}
    </div>
  );

  return (
    // SEMANTIC FIX: Changed from generic <div> to <section> with an aria-label
    <section
      aria-label="Behind the scenes gallery"
      className="w-full overflow-hidden bg-rich-black py-10 flex flex-col gap-4"
    >
      <div
        className="flex w-max will-change-transform [backface-visibility:hidden]"
        ref={topRowRef}
      >
        {/* Pass true to the second set to mark it as an invisible clone for screen readers */}
        {renderImages(topRowImages, "top-set-1", false)}
        {renderImages(topRowImages, "top-set-2", true)}
      </div>

      <div
        className="flex w-max will-change-transform [backface-visibility:hidden]"
        ref={bottomRowRef}
      >
        {renderImages(bottomRowImages, "bottom-set-1", false)}
        {renderImages(bottomRowImages, "bottom-set-2", true)}
      </div>
    </section>
  );
}

// Sub-component updated with SEO and A11Y attributes
function GalleryImage({ src, isClone }: { src: string; isClone: boolean }) {
  // Generate the alt text dynamically
  const altText = generateAltText(src);

  return (
    <figure className="h-[200px] md:h-[250px] lg:h-[300px] flex-shrink-0 px-2 m-0">
      <img
        src={src}
        decoding="async"
        // SEO FIX: Dynamic, readable alt text based on your filenames
        alt={isClone ? "" : `Tou Xiong Lor - ${altText}`}
        // Note: If isClone is true, alt="" further ensures it's ignored by assistive tech
        className="h-full w-auto object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-crosshair will-change-transform"
      />
    </figure>
  );
}
