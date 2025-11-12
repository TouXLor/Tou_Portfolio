// // // Reveal-only scroll animations (fade-in on scroll)
// // (function () {
// //   function ready(fn) {
// //     if (document.readyState !== "loading") fn();
// //     else document.addEventListener("DOMContentLoaded", fn);
// //   }

// //   ready(function () {
// //     var gs = window.gsap || null;
// //     var prefersReduced = false;
// //     try {
// //       prefersReduced = window.matchMedia(
// //         "(prefers-reduced-motion: reduce)"
// //       ).matches;
// //     } catch (e) {}

// //     // selectors we want to reveal on scroll — keep this small and generic
// //     var selectors = [
// //       ".bio",
// //       ".education",
// //       ".experience-section",
// //       ".project-section",
// //       //   ".card-article",
// //       //   ".card",
// //       ".skill-table th",
// //     ];
// //     var toReveal = document.querySelectorAll(selectors.join(", "));
// //     if (!toReveal || toReveal.length === 0) return;

// //     // If user prefers reduced motion, simply make elements visible without animation
// //     if (prefersReduced) {
// //       toReveal.forEach(function (el) {
// //         try {
// //           el.style.opacity = "";
// //           el.style.transform = "";
// //           el.style.visibility = "";
// //         } catch (e) {}
// //       });
// //       return;
// //     }

// //     // If GSAP + ScrollTrigger are available, use them for nicer reveal control
// //     if (gs && gs.ScrollTrigger) {
// //       try {
// //         toReveal.forEach(function (el) {
// //           try {
// //             gs.fromTo(
// //               el,
// //               { y: 24, autoAlpha: 0 },
// //               {
// //                 y: 0,
// //                 autoAlpha: 1,
// //                 duration: 0.6,
// //                 ease: "power2.out",
// //                 clearProps: "transform,opacity,visibility", // <-- important
// //                 scrollTrigger: {
// //                   trigger: el,
// //                   start: "top 85%",
// //                   toggleActions: "play none none none",
// //                   once: true,
// //                 },
// //               }
// //             );
// //           } catch (e) {
// //             /* individual element failed — continue */
// //           }
// //         });
// //       } catch (e) {
// //         // fallback to IntersectionObserver below
// //       }
// //       return;
// //     }

// //     // Fallback: IntersectionObserver that directly animates via inline styles
// //     try {
// //       var io = new IntersectionObserver(
// //         function (entries, obs) {
// //           entries.forEach(function (entry) {
// //             if (!entry.isIntersecting) return;
// //             var el = entry.target;
// //             try {
// //               el.style.transition = "transform 600ms ease, opacity 600ms ease";
// //               el.style.transform = "translateY(0)";
// //               el.style.opacity = "1";
// //               el.style.visibility = "visible";

// //               // 🧹 Cleanup inline styles after animation ends
// //               setTimeout(() => {
// //                 el.style.removeProperty("transition");
// //                 el.style.removeProperty("transform");
// //                 el.style.removeProperty("opacity");
// //                 el.style.removeProperty("visibility");
// //               }, 650); // slightly longer than your 600ms animation
// //             } catch (e) {}

// //             obs.unobserve(el);
// //           });
// //         },
// //         { root: null, rootMargin: "0px", threshold: 0.09 }
// //       );

// //       // initialize starting state and observe
// //       toReveal.forEach(function (el) {
// //         try {
// //           el.style.opacity = el.style.opacity || "0";
// //           el.style.transform = el.style.transform || "translateY(24px)";
// //           el.style.visibility = el.style.visibility || "hidden";
// //           io.observe(el);
// //         } catch (e) {}
// //       });
// //     } catch (e) {
// //       // last-resort: if IntersectionObserver isn't available, reveal immediately
// //       toReveal.forEach(function (el) {
// //         try {
// //           el.style.opacity = "";
// //           el.style.transform = "";
// //           el.style.visibility = "";
// //         } catch (e) {}
// //       });
// //     }
// //   });
// // })();

// // js/gsap-home-scroll-animation.js
// (function () {
//   // Respect reduced motion
//   const reduceMotion = window.matchMedia(
//     "(prefers-reduced-motion: reduce)"
//   ).matches;
//   if (reduceMotion) return;

//   // Guard: require GSAP
//   if (typeof gsap === "undefined") return;

//   // Register plugin (loaded via CDN tag)
//   if (gsap && gsap.registerPlugin && window.ScrollTrigger) {
//     gsap.registerPlugin(ScrollTrigger);
//   } else {
//     // ScrollTrigger not loaded—bail gracefully
//     return;
//   }

//   // Utility: reveal any collection with the same animation
//   function revealEach(targets, opts = {}) {
//     gsap.utils.toArray(targets).forEach((el) => {
//       gsap.fromTo(
//         el,
//         { autoAlpha: 0, y: 24 },
//         {
//           autoAlpha: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//           overwrite: "auto",
//           scrollTrigger: {
//             trigger: el,
//             start: "top 80%",
//             once: true,
//           },
//           ...opts,
//         }
//       );
//     });
//   }

//   // Top hero elements
//   revealEach([".focus-point .landing-picture", ".name-ticker"]);

//   // Bio block (image + text)
//   revealEach([".bio .about-header", ".bio .bio-paragraph", ".bio .picture-me"]);

//   // Education
//   revealEach([".education .education-header", ".education .education-item"]);

//   // Experience + Projects headers/filters
//   revealEach([
//     ".experiences-header",
//     ".experience-nav",
//     ".project-header",
//     ".project-nav",
//   ]);

//   // Containers
//   revealEach([".experience-section .container", ".project-section .container"]);

//   // Stagger skill icons row-by-row
//   gsap.utils.toArray(".skill-table tr").forEach((row) => {
//     const kids = Array.from(row.children || []);
//     if (!kids.length) return;

//     gsap.fromTo(
//       kids,
//       { autoAlpha: 0, y: 10 },
//       {
//         autoAlpha: 1,
//         y: 0,
//         duration: 0.45,
//         ease: "power2.out",
//         stagger: 0.06,
//         scrollTrigger: {
//           trigger: row,
//           start: "top 85%",
//           once: true,
//         },
//       }
//     );
//   });

//   // Batch reveal helper (nice for lots of cards)
//   function batchReveal(selector) {
//     ScrollTrigger.batch(selector, {
//       start: "top 90%",
//       once: true,
//       onEnter: (batch) => {
//         gsap.to(batch, {
//           autoAlpha: 1,
//           y: 0,
//           duration: 0.5,
//           ease: "power2.out",
//           stagger: 0.06,
//         });
//       },
//     });
//   }

//   // Animate cards that already exist
//   batchReveal(".card");

//   // Dynamically injected cards (Projects/Experiences)
//   const animateNewCards = (root) => {
//     const cards = root.querySelectorAll(".card:not([data-animated])");
//     cards.forEach((c) => {
//       // In case CSS didn't set initial state
//       gsap.set(c, { autoAlpha: 0, y: 16 });
//       c.setAttribute("data-animated", "1");
//     });
//     // Batch them as they scroll in
//     batchReveal(".card");
//   };

//   // Observe the grids for new cards
//   const projectsGrid = document.getElementById("projects-grid");
//   const experiencesGrid = document.getElementById("experiences-grid");
//   const obsOpts = { childList: true, subtree: true };

//   if (projectsGrid) {
//     new MutationObserver(() => animateNewCards(projectsGrid)).observe(
//       projectsGrid,
//       obsOpts
//     );
//   }
//   if (experiencesGrid) {
//     new MutationObserver(() => animateNewCards(experiencesGrid)).observe(
//       experiencesGrid,
//       obsOpts
//     );
//   }

//   // Initial pass (if cards are already present)
//   if (projectsGrid) animateNewCards(projectsGrid);
//   if (experiencesGrid) animateNewCards(experiencesGrid);
// })();

// // Register plugin
// gsap.registerPlugin(ScrollTrigger);

// // Respect reduced-motion
// const prefersReduced = window.matchMedia?.(
//   "(prefers-reduced-motion: reduce)"
// )?.matches;

// // ---------- FOOTER TAKEOVER (pin + scrub) ----------
// (function footerTakeover() {
//   if (prefersReduced) {
//     // No animation if user prefers reduced motion
//     gsap.set(".site-footer .footer-container", { opacity: 1, y: 0, scale: 1 });
//     return;
//   }

//   // initial state
//   gsap.set(".site-footer .footer-container", {
//     opacity: 0,
//     y: 24,
//     scale: 0.96,
//   });

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".site-footer",
//       start: "top bottom", // when footer touches viewport
//       end: "+=120%", // length of the takeover
//       scrub: 1, // smoothing
//       pin: true, // lock footer in place during takeover
//       anticipatePin: 1,
//     },
//   });

//   tl.fromTo(
//     ".site-footer",
//     { height: "40vh", borderTopLeftRadius: 14, borderTopRightRadius: 14 },
//     {
//       height: "100vh",
//       borderTopLeftRadius: 0,
//       borderTopRightRadius: 0,
//       ease: "power2.out",
//     }
//   ).to(
//     ".site-footer .footer-container",
//     { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
//     0.15 // start just after the grow begins
//   );
// })();

// // ---------- LETTER–BY–LETTER REVEAL ----------
// (function splitAndReveal() {
//   const el = document.querySelector(".big-name");
//   if (!el) return;

//   // Prevent double-splitting on hot reload
//   if (!el.dataset.split) {
//     const text = el.textContent;
//     el.setAttribute("aria-label", text.trim());
//     el.textContent = "";
//     const frag = document.createDocumentFragment();

//     for (const ch of text) {
//       const s = document.createElement("span");
//       s.className = "char";
//       s.textContent = ch === " " ? "\u00A0" : ch; // preserve spaces
//       frag.appendChild(s);
//     }
//     el.appendChild(frag);
//     el.dataset.split = "true";
//   }

//   if (prefersReduced) {
//     gsap.set(".big-name .char", { yPercent: 0, opacity: 1, rotate: 0 });
//     return;
//   }

//   gsap.fromTo(
//     ".big-name .char",
//     { yPercent: 120, opacity: 0, rotate: 6 },
//     {
//       yPercent: 0,
//       opacity: 1,
//       rotate: 0,
//       ease: "power4.out",
//       stagger: { each: 0.055, from: "start" }, // tweak speed here
//       scrollTrigger: {
//         trigger: ".big-name",
//         start: "top 80%", // play as your name enters
//         once: true,
//       },
//     }
//   );
// })();
