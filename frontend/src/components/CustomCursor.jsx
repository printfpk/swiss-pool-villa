import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleOver = (e) => {
        if (e.target.closest("button, a, [role='button'], .cursor-pointer")) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] flex items-center justify-center shadow-xl"
      style={{
        width: 60,
        height: 60,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 0.15 : (isVisible ? 1 : 0),
      }}
      transition={{ type: "spring", damping: 20, stiffness: 250 }}
    >
      {!isHovering && (
        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Scroll
        </span>
      )}
    </motion.div>
  );
}
