import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CustomCursor: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  
  // Refs for quickTo functions
  const xToInner = useRef<gsap.QuickToFunc>();
  const yToInner = useRef<gsap.QuickToFunc>();
  const xToOuter = useRef<gsap.QuickToFunc>();
  const yToOuter = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    // 1. Setup QuickTo instances
    xToInner.current = gsap.quickTo(innerRef.current, "x", { duration: 0.1, ease: "back.out(1.7)" });
    yToInner.current = gsap.quickTo(innerRef.current, "y", { duration: 0.1, ease: "back.out(1.7)" });

    xToOuter.current = gsap.quickTo(outerRef.current, "x", { duration: 0.4, ease: "power3.out" });
    yToOuter.current = gsap.quickTo(outerRef.current, "y", { duration: 0.4, ease: "power3.out" });

    // 2. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      // Update positions
      xToInner.current?.(e.clientX - 8); 
      yToInner.current?.(e.clientY - 8);
      
      xToOuter.current?.(e.clientX - 16);
      yToOuter.current?.(e.clientY - 16);

      // Check hover state
      const target = e.target as HTMLElement;
      // Expanded selector to catch nav links, buttons, inputs, and explicit clickable classes
      const isClickable = target.closest('a, button, input, textarea, .clickable, nav a, nav button, nav li');
      
      // Only animate if state changes
      if (isClickable && !isHovering.current) {
        isHovering.current = true;
        
        // Enter Hover State
        gsap.to(innerRef.current, { 
          scale: 2.5, 
          duration: 0.3, 
          overwrite: 'auto'
        });
        gsap.to(outerRef.current, { 
          scale: 1.5, 
          opacity: 0, 
          duration: 0.3, 
          overwrite: 'auto'
        });
      } else if (!isClickable && isHovering.current) {
        isHovering.current = false;
        
        // Exit Hover State (Return to Normal)
        gsap.to(innerRef.current, { 
          scale: 1, 
          duration: 0.3, 
          overwrite: 'auto'
        });
        gsap.to(outerRef.current, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.3, 
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: innerRef }); // Scope for GSAP context

  return (
    <>
      {/* Main dot */}
      <div 
        ref={innerRef}
        className="fixed top-0 left-0 w-4 h-4 bg-cornflower rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      
      {/* Trailing ring */}
      <div 
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-softBlack/30 rounded-full pointer-events-none z-[9998] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
