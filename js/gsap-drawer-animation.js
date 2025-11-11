// GSAP-based drawer animations
// Observes the `open` class on #project-drawer and animates the overlay and panel
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (typeof window.gsap === "undefined") {
      // GSAP not available — silently bail
      return;
    }

    const drawer = document.getElementById("project-drawer");
    if (!drawer) return;
    const panel = drawer.querySelector(".pd-panel");
    const overlay = drawer.querySelector(".pd-overlay");
    if (!panel || !overlay) return;

    let currentTl = null;

    function isMobile() {
      return window.matchMedia("(max-width:640px)").matches;
    }

    function killCurrent() {
      if (currentTl) {
        currentTl.kill();
        currentTl = null;
      }
    }

    function animateOpen() {
      killCurrent();
      // ensure drawer accepts pointer events while animating/open
      drawer.style.pointerEvents = "auto";

      const useY = isMobile();
      currentTl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.45 },
      });

      // overlay: animate autoAlpha for smooth fade (handles visibility + opacity)
      currentTl.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.32 },
        0
      );
      // animate backdrop blur via CSS variable for smoother, GPU-friendly blur
      try {
        currentTl.to(overlay, { "--drawer-blur": "6px", duration: 0.32 }, 0);
      } catch (e) {
        // ignore if GSAP can't animate CSS vars in this environment
      }

      // panel: slide along X on desktop, Y on mobile
      if (useY) {
        // override CSS translateY quickly so GSAP controls it
        gsap.set(panel, { y: "100%" });
        currentTl.to(panel, { y: "0%", duration: 0.45 }, 0);
      } else {
        gsap.set(panel, { x: "100%" });
        currentTl.to(panel, { x: "0%", duration: 0.45 }, 0);
      }

      // small elevation pop using boxShadow/tint (subtle)
      currentTl.fromTo(
        panel,
        { boxShadow: "0 0 0 rgba(0,0,0,0)" },
        { boxShadow: "-24px 0 48px rgba(0,0,0,0.45)", duration: 0.45 },
        0
      );

      // Parallax / staggered reveal for interior content
      try {
        const contentItems = panel.querySelectorAll(".pd-content > *");
        if (contentItems && contentItems.length) {
          // start children slightly offset (they'll move less than the panel for parallax)
          gsap.set(contentItems, { y: 18, opacity: 0 });
          // staggered entrance after panel starts moving
          currentTl.to(
            contentItems,
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.42,
              ease: "power2.out",
            },
            0.08
          );
        }
      } catch (e) {
        // ignore if selection fails
      }

      currentTl.eventCallback("onComplete", function () {
        currentTl = null;
      });
    }

    function animateClose() {
      killCurrent();
      const useY = isMobile();
      currentTl = gsap.timeline({
        defaults: { ease: "power3.in", duration: 0.36 },
      });

      // reverse content stagger first for a nicer parallax exit
      try {
        const contentItems = panel.querySelectorAll(".pd-content > *");
        if (contentItems && contentItems.length) {
          currentTl.to(
            contentItems,
            {
              y: 18,
              opacity: 0,
              stagger: 0.03,
              duration: 0.22,
              ease: "power2.in",
            },
            0
          );
        }
      } catch (e) {}

      currentTl.to(overlay, { autoAlpha: 0, duration: 0.28 }, 0);
      // animate blur back to zero
      try {
        currentTl.to(overlay, { "--drawer-blur": "0px", duration: 0.28 }, 0);
      } catch (e) {}

      if (useY) {
        currentTl.to(panel, { y: "100%", duration: 0.36 }, 0.06);
        currentTl.to(
          panel,
          { boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.36 },
          0.06
        );
      } else {
        currentTl.to(panel, { x: "100%", duration: 0.36 }, 0.06);
        currentTl.to(
          panel,
          { boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.36 },
          0.06
        );
      }

      currentTl.eventCallback("onComplete", function () {
        // restore pointer-events to CSS-managed closed state
        drawer.style.pointerEvents = "";
        currentTl = null;
      });
    }

    // Observe class changes on the drawer so we animate when `open` is toggled
    const mo = new MutationObserver(function () {
      const isOpen = drawer.classList.contains("open");
      if (isOpen) animateOpen();
      else animateClose();
    });

    mo.observe(drawer, { attributes: true, attributeFilter: ["class"] });

    // Expose programmatic hooks if other scripts want to trigger animations
    window.__gsapDrawer = {
      open: animateOpen,
      close: animateClose,
      kill: killCurrent,
    };
  });
})();
