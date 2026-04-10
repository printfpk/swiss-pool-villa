import { motion, useSpring, useMotionValue as motionValue } from "framer-motion";
import React from "react";

export const Fade = ({ children, duration = 0.5, delay = 0 }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration, delay }}>
    {children}
  </motion.div>
);

export const Slide = ({ children, direction = "up", duration = 0.5, delay = 0 }) => {
  const y = direction === "up" ? 20 : direction === "down" ? -20 : 0;
  const x = direction === "left" ? 20 : direction === "right" ? -20 : 0;
  return (
    <motion.div initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ duration, delay }}>
      {children}
    </motion.div>
  );
};

export const Reveal = ({ children, animation = "fade-up", duration = 0.8, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: animation.includes("up") ? 30 : 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration, delay }}>
    {children}
  </motion.div>
);

export const Stagger = ({ children, delay = 0.1 }) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: delay } } }} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {React.Children.map(children, (child, idx) => (
        <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export const FlipText = ({ children, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
    >
      <div className="flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0, x: 0, rotate: 0 },
              hovered: { 
                y: "-100%",
                x: [0, -1, 1, -1, 1, 0],
                rotate: [0, -2, 2, -2, 0]
              },
            }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.01, 0.05, 0.95],
              delay: 0.025 * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%", x: 0, rotate: 0 },
              hovered: { 
                y: 0,
                x: [0, 1, -1, 1, -1, 0],
                rotate: [0, 2, -2, 2, 0]
              },
            }}
            transition={{
              duration: 0.6,
              ease: [0.6, 0.01, 0.05, 0.95],
              delay: 0.025 * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
export const DislocateText = ({ children, className = "" }) => {
  const mouseX = motionValue(0);
  const mouseY = motionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {children.split("").map((char, index) => (
        <DislocateChar key={index} char={char} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </span>
  );
};


const DislocateChar = ({ char, mouseX, mouseY }) => {
  const ref = React.useRef(null);
  const x = motionValue(0);
  const y = motionValue(0);
  
  // Smooth out the movement
  const springX = useSpring(x, { damping: 15, stiffness: 250, mass: 0.5 });
  const springY = useSpring(y, { damping: 15, stiffness: 250, mass: 0.5 });

  React.useEffect(() => {
    const handleMove = () => {
      if (!ref.current) return;
      const mX = mouseX.get();
      const mY = mouseY.get();
      const rect = ref.current.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;
      
      const dx = cX - mX;
      const dy = cY - mY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const maxDist = 80; // Distance within which chars react
      if (dist < maxDist && dist > 0) {
        // Pushes characters out from the cursor
        const force = (maxDist - dist) / maxDist;
        x.set(dx * force * 0.8);
        y.set(dy * force * 0.8);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const unsubscribeX = mouseX.on("change", handleMove);
    const unsubscribeY = mouseY.on("change", handleMove);
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.span 
      ref={ref} 
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};
