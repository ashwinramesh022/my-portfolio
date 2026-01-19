"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "link" | "external" | "project" | "text";

interface CursorLabel {
  text: string;
  show: boolean;
}

const cursorLabels: Record<CursorState, string> = {
  default: "",
  link: "View",
  external: "↗",
  project: "Explore",
  text: "",
};

export function CursorFollower() {
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(true); // Default to true to avoid flash
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [label, setLabel] = useState<CursorLabel>({ text: "", show: false });
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position with spring physics for smooth following
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring config for smooth, cinematic movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Ring scale based on state
  const ringScale = useSpring(1, { damping: 20, stiffness: 300 });
  const labelOpacity = useSpring(0, { damping: 20, stiffness: 300 });
  
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch-only device (no mouse/trackpad)
    const checkTouch = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const hasHoverCapability = window.matchMedia("(hover: hover)").matches;
      
      // Only disable cursor on devices with NO fine pointer AND NO hover capability
      // This ensures touchscreen laptops and desktops with touch monitors still get the cursor
      setIsTouch(!hasFinePointer && !hasHoverCapability);
    };
    
    checkTouch();
    
    // Listen for pointer type changes (e.g., connecting/disconnecting mouse)
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");
    
    finePointerQuery.addEventListener("change", checkTouch);
    hoverQuery.addEventListener("change", checkTouch);
    
    return () => {
      finePointerQuery.removeEventListener("change", checkTouch);
      hoverQuery.removeEventListener("change", checkTouch);
    };
  }, []);

  useEffect(() => {
    // Don't run on touch devices or reduced motion
    if (isTouch || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use RAF for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        if (!isVisible) {
          setIsVisible(true);
        }
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Handle hover states via data-cursor attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      
      if (cursorTarget) {
        const cursorType = cursorTarget.dataset.cursor as CursorState;
        setCursorState(cursorType);
        
        // Get custom label if provided
        const customLabel = cursorTarget.dataset.cursorLabel;
        const labelText = customLabel || cursorLabels[cursorType];
        
        if (labelText) {
          setLabel({ text: labelText, show: true });
          labelOpacity.set(1);
        }
        
        // Scale up ring for interactive elements
        if (cursorType !== "default" && cursorType !== "text") {
          ringScale.set(1.5);
        }
      } else {
        // Check for native interactive elements
        const isLink = target.closest("a, button, [role='button']");
        if (isLink) {
          const isExternal = (isLink as HTMLAnchorElement).target === "_blank" || 
                            (isLink as HTMLAnchorElement).href?.startsWith("http");
          setCursorState(isExternal ? "external" : "link");
          setLabel({ text: isExternal ? "↗" : "", show: isExternal });
          labelOpacity.set(isExternal ? 1 : 0);
          ringScale.set(1.3);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest("[data-cursor], a, button, [role='button']");
      
      if (cursorTarget) {
        setCursorState("default");
        setLabel({ text: "", show: false });
        labelOpacity.set(0);
        ringScale.set(1);
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouch, shouldReduceMotion, mouseX, mouseY, isVisible, ringScale, labelOpacity]);

  // Don't render on touch devices or reduced motion
  if (isTouch || shouldReduceMotion) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Ring */}
          <motion.div
            className="w-10 h-10 rounded-full border border-white/60"
            style={{ scale: ringScale }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
          
          {/* Label */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-white uppercase tracking-wider whitespace-nowrap"
            style={{ opacity: labelOpacity }}
          >
            {label.text}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Small center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
          className="w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}

