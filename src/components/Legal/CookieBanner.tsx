import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState<boolean | null>(null);
  const [bannerDelay, setBannerDelay] = useState<number>(3);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingRoot = document.getElementById("cookie-banner-root");
    const root = existingRoot || document.createElement("div");

    root.id = "cookie-banner-root";
    if (!document.body.contains(root)) {
      document.body.appendChild(root);
    }

    setPortalContainer(root);

    let consent: string | null = null;
    try {
      consent = localStorage.getItem("cookieConsent");
    } catch (error) {
      console.warn("CookieBanner: localStorage access failed", error);
    }

    console.log("CookieBanner init consent=", consent);

    if (!consent) {
      setBannerDelay(3);
      setShowBanner(true);
    } else if (consent === "accepted") {
      initializeAnalytics();
      setShowBanner(false);
    } else {
      setShowBanner(false);
    }

    return () => {
      if (!existingRoot && root.parentElement) {
        root.parentElement.removeChild(root);
      }
    };
  }, []);

  useEffect(() => {
    const handleOpenCookieBanner = () => {
      setBannerDelay(0.5);
      setShowBanner(true);
    };

    window.addEventListener("openCookieBanner", handleOpenCookieBanner);
    return () => {
      window.removeEventListener("openCookieBanner", handleOpenCookieBanner);
    };
  }, []);

  // Animation effect when banner becomes visible
  useEffect(() => {
    if (showBanner === true && bannerRef.current) {
      gsap.to(bannerRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: bannerDelay,
      });
    }
  }, [showBanner, bannerDelay]);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "accepted");
    } catch (error) {
      console.warn("CookieBanner: localStorage setItem failed", error);
    }
    setShowBanner(false);
    initializeAnalytics();
  };

  const handleDecline = () => {
    try {
      localStorage.removeItem("cookieConsent");
    } catch (error) {
      console.warn("CookieBanner: localStorage removeItem failed", error);
    }
    setShowBanner(false);
    window.location.reload();
  };

  const initializeAnalytics = () => {
    console.log("Analytics loading... User clicked Accept!");
  };

  if (showBanner !== true || !portalContainer) return null;

  return createPortal(
    <div
      ref={bannerRef}
      id="cookie-banner-top-left"
      className="z-[105] bg-rich-black text-oat-cream p-6 shadow-[8px_8px_0_0_rgba(100,149,237,1)] border-2 border-cornflower font-poppins"
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        width: "min(360px, calc(100vw - 32px))",
        maxWidth: "100%",
        // 👇 ADD THESE TWO LINES TO BAKE IN THE INITIAL HIDDEN STATE 👇
        opacity: 0,
        transform: "translateX(-400px)",
      }}
    >
      <h3 className="font-anton text-2xl uppercase tracking-wide text-cornflower mb-2">
        Cookies & Privacy
      </h3>
      <p className="text-sm leading-relaxed mb-6 opacity-90 font-mono">
        I use Google Analytics and Microsoft Clarity to see how visitors
        interact with my portfolio. Do you mind if I track your visit?
      </p>
      <div className="flex gap-3 font-mono text-sm uppercase tracking-widest font-bold">
        <button
          onClick={handleAccept}
          className="bg-cornflower text-rich-black px-4 py-2 hover:bg-white transition-colors flex-1"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="border border-oat-cream/50 text-oat-cream hover:bg-oat-cream/10 px-4 py-2 transition-colors flex-1"
        >
          Decline
        </button>
      </div>
    </div>,
    portalContainer,
  );
}
