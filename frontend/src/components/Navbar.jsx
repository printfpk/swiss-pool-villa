import React, { useState, useEffect } from "react";
import { Search, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipText } from "./pretext";

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsVisible(!(y > lastScrollY && y > 100));
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full left-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-12 py-3 md:py-4 flex justify-between items-center ${isScrolled ? 'bg-white shadow-md text-[--color-text-main]' : 'bg-transparent text-white'} ${isVisible ? 'translate-y-0' : '-translate-y-full'} box-border`}>

        {/* Logo */}
        <div className="cursor-pointer shrink-1 flex items-center min-w-0">
          <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[140px] sm:max-w-[220px] md:max-w-none">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8D8A8" />
                <stop offset="50%" stopColor="#C9A646" />
                <stop offset="100%" stopColor="#A8832F" />
              </linearGradient>
            </defs>
            <g transform="translate(90,80)">
              <circle cx="0" cy="0" r="40" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
              <path d="M-18 8 L0 -18 L18 8 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
              <path d="M-24 16 Q0 26 24 16" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
            </g>
            <line x1="145" y1="35" x2="145" y2="125" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.5" />
            <text x="165" y="85" fontFamily="Playfair Display, serif" fontSize="32" fill="url(#goldGradient)" letterSpacing="5">SWISS</text>
            <text x="165" y="115" fontFamily="Montserrat, sans-serif" fontSize="13" fill={isScrolled ? "#222222" : "#ffffff"} letterSpacing="7">POOL VILLA</text>
            <line x1="165" y1="125" x2="420" y2="125" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Centre search pill */}
        <div className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center shadow-sm rounded-full border p-2 transition ${isScrolled ? 'border-gray-200 bg-white' : 'border-white/30 bg-white/10 backdrop-blur-md'}`}>
          <button className="px-4 text-sm font-medium border-r border-inherit"><FlipText>Anywhere</FlipText></button>
          <button className="px-4 text-sm font-medium border-r border-inherit"><FlipText>Any week</FlipText></button>
          <button className="px-4 text-sm font-normal opacity-80"><FlipText>Add guests</FlipText></button>
          <div className="bg-[--color-brand] text-white p-2 rounded-full h-8 w-8 flex items-center justify-center ml-2 cursor-pointer hover:bg-[--color-primary] transition">
            <Search size={14} />
          </div>
        </div>

        {/* Right — hamburger + menu */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 text-sm font-medium relative shrink-0 min-w-[max-content] z-50">
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full cursor-pointer transition border ${isScrolled || isMenuOpen ? 'border-gray-200 bg-white shadow-md text-black' : 'border-white/30 bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm'}`}
          >
            <div className="px-1 shrink-0 flex items-center justify-center">
              {isMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </div>
            <div className="bg-gray-500 text-white rounded-full p-1 shrink-0">
              <User size={16} />
            </div>
          </div>

        </div>
      </header>

      {/* ── Overlay menu ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[55] backdrop-blur-sm"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ clipPath: "circle(0px at 100% 0%)" }}
              animate={{ clipPath: "circle(2500px at 100% 0%)" }}
              exit={{ clipPath: "circle(0px at 100% 0%)" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 md:inset-auto md:top-0 md:right-0 h-screen w-full md:w-1/2 lg:w-[40%] z-[60] flex flex-col justify-center text-black overflow-hidden box-border"
              style={{ background: 'linear-gradient(135deg, #d5d4cf, #e0dfdb, #ebccc5, #edb891)' }}
            >
              {/* Water caustic ambient */}
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                <svg width="100%" height="100%">
                  <filter id="wfx">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1">
                      <animate attributeName="baseFrequency" dur="20s" values="0.015 0.015; 0.02 0.01; 0.015 0.015" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="fractal" scale="30" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <defs>
                    <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#edb891" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#ebccc5" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#edb891" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#wg)" filter="url(#wfx)" />
                </svg>
              </div>

      {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 md:top-10 md:right-12 p-3 rounded-full border border-black/20 md:border-white/20 hover:bg-black/10 md:hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center text-black md:text-white backdrop-blur-md z-10"
              >
                <X size={20} />
              </button>

              {/* Menu links */}
              <div className="relative z-10 flex flex-col gap-6 md:gap-10 text-center px-4 mt-4 md:mt-10 mx-auto w-max">
                <MenuLink num="01" text="Home" href="#home" delay={0.1} onClick={() => setIsMenuOpen(false)} />
                <MenuLink num="02" text="Amenities" href="#catalog" delay={0.2} onClick={() => setIsMenuOpen(false)} />
                <MenuLink num="03" text="Services & History" href="#history" delay={0.3} onClick={() => setIsMenuOpen(false)} />
                <MenuLink num="04" text="Experiences" href="#experiences" delay={0.4} onClick={() => setIsMenuOpen(false)} />
                <MenuLink num="05" text="Reviews" href="#testimonials" delay={0.5} onClick={() => setIsMenuOpen(false)} />
                <MenuLink num="06" text="Location" href="#location" delay={0.6} onClick={() => setIsMenuOpen(false)} />
              </div>

              {/* Bottom tagline */}
              <p className="absolute bottom-8 left-0 right-0 text-center text-white/25 text-xs tracking-[0.3em] uppercase pointer-events-none">
                Swiss Pool Villa · Est. 2006
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Menu link ─────────────────────────────────────────────────────────────────
const MenuLink = ({ num, text, href, delay, onClick }) => (
  <a href={href} onClick={onClick} className="group block w-full text-center py-2 relative">
    <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 text-xs md:text-sm font-light text-black/30 tracking-widest pointer-events-none">
      {num}
    </div>
    <div className="relative inline-flex justify-center text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-medium uppercase tracking-[0.15em] text-[#3d2a21] pb-2">
      <div className="relative z-10 flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.2, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8, delay: delay + i * 0.04, ease: [0.25, 1, 0.5, 1] }}
            className="inline-block group-hover:text-[#3d2a21] transition-colors duration-400"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      {/* Underline */}
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3d2a21]/40 scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />
    </div>
  </a>
);