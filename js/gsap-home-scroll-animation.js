// Reveal-only scroll animations (fade-in on scroll)
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var gs = window.gsap || null;
    var prefersReduced = false;
    try {
      prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    } catch (e) {}

    // selectors we want to reveal on scroll — keep this small and generic
    var selectors = [
      ".bio",
      ".education",
      ".experience-section",
      ".project-section",
      //   ".card-article",
      //   ".card",
      ".skill-table th",
    ];
    var toReveal = document.querySelectorAll(selectors.join(", "));
    if (!toReveal || toReveal.length === 0) return;

    // If user prefers reduced motion, simply make elements visible without animation
    if (prefersReduced) {
      toReveal.forEach(function (el) {
        try {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.visibility = "";
        } catch (e) {}
      });
      return;
    }

    // If GSAP + ScrollTrigger are available, use them for nicer reveal control
    if (gs && gs.ScrollTrigger) {
      try {
        toReveal.forEach(function (el) {
          try {
            gs.fromTo(
              el,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none none", // don't reverse on scroll out
                  once: true, // play animation only once
                },
              }
            );
          } catch (e) {
            /* individual element failed — continue */
          }
        });
      } catch (e) {
        // fallback to IntersectionObserver below
      }
      return;
    }

    // Fallback: IntersectionObserver that directly animates via inline styles
    try {
      var io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            try {
              el.style.transition = "transform 600ms ease, opacity 600ms ease";
              el.style.transform = "translateY(0)";
              el.style.opacity = "1";
              el.style.visibility = "visible";

              // 🧹 Cleanup inline styles after animation ends
              setTimeout(() => {
                el.style.removeProperty("transition");
                el.style.removeProperty("transform");
                el.style.removeProperty("opacity");
                el.style.removeProperty("visibility");
              }, 650); // slightly longer than your 600ms animation
            } catch (e) {}

            obs.unobserve(el);
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.09 }
      );

      // initialize starting state and observe
      toReveal.forEach(function (el) {
        try {
          el.style.opacity = el.style.opacity || "0";
          el.style.transform = el.style.transform || "translateY(24px)";
          el.style.visibility = el.style.visibility || "hidden";
          io.observe(el);
        } catch (e) {}
      });
    } catch (e) {
      // last-resort: if IntersectionObserver isn't available, reveal immediately
      toReveal.forEach(function (el) {
        try {
          el.style.opacity = "";
          el.style.transform = "";
          el.style.visibility = "";
        } catch (e) {}
      });
    }
  });
})();
