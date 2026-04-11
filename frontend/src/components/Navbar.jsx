import React, { useState, useEffect } from "react";
import { Search, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipText } from "./pretext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background/shadow past 50px
      setIsScrolled(currentScrollY > 50);

      // Determine scroll direction to hide/show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${isScrolled ? 'bg-white shadow-md text-[--color-text-main]' : 'bg-transparent text-white'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="cursor-pointer">
        <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" className="h-16 md:h-20 w-auto">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D8A8" />
              <stop offset="50%" stopColor="#C9A646" />
              <stop offset="100%" stopColor="#A8832F" />
            </linearGradient>
          </defs>

          {/* Icon */}
          <g transform="translate(90,80)">
            <circle cx="0" cy="0" r="40" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
            <path d="M-18 8 L0 -18 L18 8 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
            <path d="M-24 16 Q0 26 24 16" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
          </g>

          <line x1="145" y1="35" x2="145" y2="125" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.5" />

          <text x="165" y="85" fontFamily="Playfair Display, serif" fontSize="32" fill="url(#goldGradient)" letterSpacing="5">
            SWISS
          </text>

          <text x="165" y="115" fontFamily="Montserrat, sans-serif" fontSize="13" fill={isScrolled ? "#222222" : "#ffffff"} letterSpacing="7">
            POOL VILLA
          </text>

          <line x1="165" y1="125" x2="420" y2="125" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center shadow-sm rounded-full border p-2 transition ${isScrolled ? 'border-gray-200 bg-white' : 'border-white/30 bg-white/10 backdrop-blur-md'}`}>
        <button className="px-4 text-sm font-medium border-r border-inherit">
          <FlipText>Anywhere</FlipText>
        </button>
        <button className="px-4 text-sm font-medium border-r border-inherit">
          <FlipText>Any week</FlipText>
        </button>
        <button className="px-4 text-sm font-normal opacity-80">
          <FlipText>Add guests</FlipText>
        </button>
        <div className="bg-[--color-brand] text-white p-2 rounded-full h-8 w-8 flex items-center justify-center ml-2 cursor-pointer hover:bg-[--color-primary] transition">
          <Search size={14} />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium relative">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center gap-3 p-2 rounded-full cursor-pointer transition border ${isScrolled || isMenuOpen ? 'border-gray-200 bg-white shadow-md text-black' : 'border-white/30 hover:bg-white/10'}`}
        >
          {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          <div className="bg-gray-500 text-white rounded-full p-1">
            <User size={16} />
          </div>
        </div>

        {/* Half-screen Overlay Sidebar Menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <>
              {/* Optional backdrop to darken the rest of the screen */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm"
              />

              <motion.div
                initial={{ clipPath: "circle(0px at 100% 0%)" }}
                animate={{ clipPath: "circle(2500px at 100% 0%)" }}
                exit={{ clipPath: "circle(0px at 100% 0%)" }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-[40%] bg-gradient-to-b from-[#edb891] to-[#ebccc5] z-[60] flex flex-col justify-center text-black border-l border-[#88D4D6]/20 shadow-[0_0_50px_rgba(6,30,38,0.7)] overflow-hidden"
              >
                {/* Stunning SVG Animated Real Water Caustics / Ripples */}
                <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-color-dodge">
                  <svg width="100%" height="100%">
                    <filter id="water-effect">
                      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="fractal" seed="1">
                        <animate attributeName="baseFrequency" dur="20s" values="0.015 0.015; 0.02 0.01; 0.015 0.015" repeatCount="indefinite" />
                      </feTurbulence>
                      <feDisplacementMap in="SourceGraphic" in2="fractal" scale="40" xChannelSelector="R" yChannelSelector="G" />
                    </filter>

                    <rect width="100%" height="100%" fill="url(#water-grad)" filter="url(#water-effect)" />

                    <defs>
                      <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#88D4D6" stopOpacity="0.2" />
                        <stop offset="30%" stopColor="#88D4D6" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#082E3A" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#88D4D6" stopOpacity="0.5" />
                        <animate attributeName="x1" values="0%; 20%; 0%" dur="15s" repeatCount="indefinite" />
                        <animate attributeName="y1" values="0%; 20%; 0%" dur="15s" repeatCount="indefinite" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Content Container (to sit on top of the water effect) */}
                <div className="relative z-10 h-full w-full flex flex-col justify-center">
                  {/* Close Button Inside Menu */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 md:top-10 md:right-12 p-3 rounded-full border border-[#88D4D6]/30 hover:bg-[#88D4D6]/20 transition-all cursor-pointer flex items-center justify-center text-black backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col gap-6 md:gap-10 text-center px-8 mt-10">
                    <MenuLink text="Home" delay={0.1} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink text="Villas" delay={0.2} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink text="Experiences" delay={0.3} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink text="About Us" delay={0.4} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink text="Contact" delay={0.5} onClick={() => setIsMenuOpen(false)} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// Custom component for ultra-modern staggered blur-and-scale character reveal
const MenuLink = ({ text, delay, onClick }) => {
  return (
    <a href="#" onClick={onClick} className="group block w-full text-center py-2">
      <div className="relative inline-flex justify-center text-3xl sm:text-4xl md:text-5xl font-['Montserrat'] font-light uppercase tracking-[0.25em] text-black pb-2">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.2, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.25, 1, 0.5, 1]
            }}
            className="inline-block group-hover:text-[#88D4D6] transition-colors duration-500"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        {/* Elegant Animated Underline */}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#88D4D6] scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
      </div>
    </a>
  );
};