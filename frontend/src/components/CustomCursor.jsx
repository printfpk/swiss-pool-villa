import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: 10,
        height: 10,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        transformStyle: "preserve-3d",
        rotateX: -30,
        rotateY: 45,
      }}
    >
      <div className="absolute inset-0 bg-neutral-900 border border-black" style={{ transform: "translateZ(5px)" }} />
      <div className="absolute inset-0 bg-neutral-900 border border-black" style={{ transform: "rotateY(180deg) translateZ(5px)" }} />
      <div className="absolute inset-0 bg-neutral-800 border border-black" style={{ transform: "rotateY(-90deg) translateZ(5px)" }} />
      <div className="absolute inset-0 bg-neutral-800 border border-black" style={{ transform: "rotateY(90deg) translateZ(5px)" }} />
      <div className="absolute inset-0 bg-neutral-600 border border-black" style={{ transform: "rotateX(90deg) translateZ(5px)" }} />
      <div className="absolute inset-0 bg-neutral-600 border border-black" style={{ transform: "rotateX(-90deg) translateZ(5px)" }} />
    </motion.div>
  );
}
