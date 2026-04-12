import React, { useState, useEffect, useRef } from "react";
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

  const [hoveredItems, setHoveredItems] = useState(new Set());
  const [isPouring, setIsPouring] = useState(false);
  const prevSize = React.useRef(0);

  useEffect(() => {
    if (!isMenuOpen) {
      setHoveredItems(new Set());
      prevSize.current = 0;
      setIsPouring(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (hoveredItems.size > prevSize.current) {
      setIsPouring(true);
      const timer = setTimeout(() => setIsPouring(false), 900); // Pour animation duration
      prevSize.current = hoveredItems.size;
      return () => clearTimeout(timer);
    }
  }, [hoveredItems.size]);

  const handleItemHover = (index) => {
    setHoveredItems(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const fillPercentage = hoveredItems.size / 5;
  const maxLiquidY = 536; // Bottom of glass
  const minLiquidY = 182; // Full liquid top
  const currentY = maxLiquidY - (fillPercentage * (maxLiquidY - minLiquidY));

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
                  {/* Dynamic Background to Mocktail Color */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItems.size === 5 ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-b from-[#00f2fe] to-[#4facfe] z-[-2]" 
                  />

                  {/* Close Button Inside Menu */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 md:top-10 md:right-12 p-3 rounded-full border border-[#88D4D6]/30 hover:bg-[#88D4D6]/20 transition-all cursor-pointer flex items-center justify-center text-black backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col gap-6 md:gap-10 text-center px-4 mt-4 md:mt-10 mx-auto w-max relative">
                    <MenuLink num="01" text="Home" delay={0.1} onClick={() => setIsMenuOpen(false)} onHover={() => handleItemHover(1)} />
                    <MenuLink num="02" text="Villas" delay={0.2} onClick={() => setIsMenuOpen(false)} onHover={() => handleItemHover(2)} />
                    <MenuLink num="03" text="Experiences" delay={0.3} onClick={() => setIsMenuOpen(false)} onHover={() => handleItemHover(3)} />
                    <MenuLink num="04" text="About Us" delay={0.4} onClick={() => setIsMenuOpen(false)} onHover={() => handleItemHover(4)} />
                    <MenuLink num="05" text="Contact" delay={0.5} onClick={() => setIsMenuOpen(false)} onHover={() => handleItemHover(5)} />
                  </div>

                  {/* Decorative Cocktail Glass SVG */ }
                  <motion.div 
                    animate={{ 
                      rotate: hoveredItems.size === 5 ? -25 : 0, 
                      scale: hoveredItems.size === 5 ? 1.05 : 1 
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute origin-bottom-right bottom-4 right-4 md:bottom-8 md:right-8 pointer-events-none z-[-1] opacity-90 w-24 md:w-40 lg:w-48"
                  >
                    <svg width="100%" viewBox="0 0 680 820" role="img" xmlns="http://www.w3.org/2000/svg">
                      <title>Realistic cocktail glass illustration</title>
                      <desc>A detailed SVG illustration of a luxury cocktail in a coupe glass with citrus garnish, ice, and condensation drops on a transparent background</desc>

                      <defs>
                        <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7a4020" stopOpacity="0.22"/>
                          <stop offset="18%" stopColor="#fff" stopOpacity="0.55"/>
                          <stop offset="40%" stopColor="#fff" stopOpacity="0.08"/>
                          <stop offset="70%" stopColor="#fff" stopOpacity="0.28"/>
                          <stop offset="100%" stopColor="#7a3a18" stopOpacity="0.28"/>
                        </linearGradient>
                        <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f2fe"/>
                          <stop offset="40%" stopColor="#4facfe"/>
                          <stop offset="100%" stopColor="#0072ff"/>
                        </linearGradient>
                        <linearGradient id="liquidShine" x1="0%" y1="0%" x2="60%" y2="100%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.42"/>
                          <stop offset="100%" stopColor="#fff" stopOpacity="0.0"/>
                        </linearGradient>
                        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7a4030" stopOpacity="0.25"/>
                          <stop offset="30%" stopColor="#fff" stopOpacity="0.6"/>
                          <stop offset="70%" stopColor="#fff" stopOpacity="0.12"/>
                          <stop offset="100%" stopColor="#7a4030" stopOpacity="0.3"/>
                        </linearGradient>
                        <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#7a4030" stopOpacity="0.22"/>
                        </linearGradient>
                        <linearGradient id="iceGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.88"/>
                          <stop offset="100%" stopColor="#d0e8f0" stopOpacity="0.55"/>
                        </linearGradient>
                        <linearGradient id="iceGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.75"/>
                          <stop offset="100%" stopColor="#b8d8e8" stopOpacity="0.45"/>
                        </linearGradient>
                        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffb347"/>
                          <stop offset="100%" stopColor="#e06010"/>
                        </linearGradient>
                        <linearGradient id="cherryGrad" x1="20%" y1="10%" x2="80%" y2="90%">
                          <stop offset="0%" stopColor="#ff4466"/>
                          <stop offset="100%" stopColor="#990022"/>
                        </linearGradient>
                        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fff" stopOpacity="0.65"/>
                          <stop offset="50%" stopColor="#fff" stopOpacity="0.18"/>
                          <stop offset="100%" stopColor="#fff" stopOpacity="0.55"/>
                        </linearGradient>
                        <clipPath id="bowlClip">
                          <path d="M200 190 Q200 180 340 180 Q480 180 480 190 L440 490 Q390 530 340 532 Q290 530 240 490 Z"/>
                        </clipPath>
                        <clipPath id="liquidLevelClip">
                          <motion.rect 
                            x="0" 
                            width="680"
                            height="400"
                            initial={{ y: 536 }}
                            animate={{ y: currentY }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </clipPath>
                      </defs>

                      <ellipse cx="340" cy="760" rx="140" ry="18" fill="#5a2a0a" opacity="0.12"/>
                      <ellipse cx="340" cy="758" rx="110" ry="12" fill="#4a1a06" opacity="0.08"/>

                      <ellipse cx="340" cy="738" rx="100" ry="10" fill="none" stroke="url(#baseGrad)" strokeWidth="18"/>
                      <ellipse cx="340" cy="738" rx="100" ry="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
                      <ellipse cx="340" cy="738" rx="84" ry="7" fill="url(#baseGrad)" opacity="0.55"/>
                      <ellipse cx="340" cy="735" rx="40" ry="3" fill="#fff" opacity="0.25"/>

                      <path d="M322 538 Q330 650 332 730 L348 730 Q350 650 358 538 Z" fill="url(#stemGrad)"/>
                      <path d="M322 538 Q330 650 332 730 L348 730 Q350 650 358 538 Z" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.3"/>
                      <path d="M332 538 Q333 650 334 730" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.38" strokeLinecap="round"/>

                      <ellipse cx="340" cy="538" rx="22" ry="7" fill="url(#stemGrad)" opacity="0.7"/>
                      <ellipse cx="340" cy="538" rx="22" ry="7" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.28"/>

                      <AnimatePresence>
                          {isPouring && hoveredItems.size < 5 && (
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0.8 }}
                              animate={{ pathLength: 1, opacity: 0.8 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, ease: "easeIn" }}
                              d={`M340 0 L340 ${currentY + 10}`}
                              stroke="url(#liquidGrad)"
                              strokeWidth="12"
                              strokeLinecap="round"
                              fill="none"
                            />
                          )}
                        </AnimatePresence>

                        {/* Spilling Liquid pouring out of the glass when full */}
                        <AnimatePresence>
                          {hoveredItems.size === 5 && (
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.95 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
                              d="M 210 185 Q -30 250 -250 800"
                              stroke="url(#liquidGrad)"
                              strokeWidth="35"
                            strokeLinecap="round"
                            fill="none"
                          />
                        )}
                      </AnimatePresence>

                      <g clipPath="url(#liquidLevelClip)">
                        <path d="M200 192 Q200 182 340 182 Q480 182 480 192 L442 492 Q392 534 340 536 Q288 534 238 492 Z" fill="url(#liquidGrad)" clipPath="url(#bowlClip)" opacity="0.85"/>
                        <path d="M200 192 Q200 182 340 182 Q480 182 480 192 L442 492 Q392 534 340 536 Q288 534 238 492 Z" fill="url(#liquidShine)" clipPath="url(#bowlClip)"/>
                      </g>

                      <ellipse cx="310" cy="250" rx="38" ry="12" fill="#fff" opacity="0.14" transform="rotate(-15 310 250)"/>
                      <ellipse cx="290" cy="295" rx="22" ry="7" fill="#fff" opacity="0.09" transform="rotate(-10 290 295)"/>

                      <polygon points="255,420 298,390 318,460 272,475" fill="url(#iceGrad1)" stroke="#b8d8e8" strokeWidth="1.2" opacity="0.88"/>
                      <line x1="255" y1="420" x2="298" y2="390" stroke="#fff" strokeWidth="0.8" opacity="0.7"/>
                      <line x1="298" y1="390" x2="318" y2="460" stroke="#d0e8f0" strokeWidth="0.7" opacity="0.6"/>
                      <line x1="272" y1="432" x2="305" y2="418" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>

                      <polygon points="350,400 395,378 412,445 364,458" fill="url(#iceGrad2)" stroke="#b8d8e8" strokeWidth="1.2" opacity="0.82"/>
                      <line x1="350" y1="400" x2="395" y2="378" stroke="#fff" strokeWidth="0.8" opacity="0.65"/>
                      <line x1="395" y1="378" x2="412" y2="445" stroke="#d0e8f0" strokeWidth="0.7" opacity="0.55"/>
                      <line x1="372" y1="415" x2="400" y2="402" stroke="#fff" strokeWidth="0.5" opacity="0.45"/>

                      <polygon points="290,460 330,448 338,498 294,505" fill="url(#iceGrad1)" stroke="#b8d8e8" strokeWidth="1" opacity="0.75"/>

                      <path d="M200 192 Q200 182 340 182 Q480 182 480 192 L442 492 Q392 534 340 536 Q288 534 238 492 Z" fill="url(#glassBody)" stroke="rgba(160,80,40,0.3)" strokeWidth="1.2"/>

                      <path d="M200 192 Q340 178 480 192" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>
                      <ellipse cx="340" cy="191" rx="140" ry="5" fill="url(#rimGrad)" opacity="0.75"/>

                      <path d="M210 192 L248 490 Q260 520 240 510 L205 195 Z" fill="#fff" opacity="0.12"/>
                      <path d="M215 192 L225 280" fill="none" stroke="#fff" strokeWidth="2" opacity="0.32" strokeLinecap="round"/>

                      <circle cx="430" cy="230" r="4" fill="#fff" opacity="0.2"/>
                      <circle cx="420" cy="262" r="2.5" fill="#fff" opacity="0.14"/>
                      <circle cx="435" cy="292" r="3" fill="#fff" opacity="0.16"/>
                      <circle cx="415" cy="314" r="2" fill="#fff" opacity="0.11"/>
                      <circle cx="428" cy="344" r="3.5" fill="#fff" opacity="0.13"/>
                      <circle cx="222" cy="242" r="3" fill="#fff" opacity="0.16"/>
                      <circle cx="228" cy="274" r="2" fill="#fff" opacity="0.11"/>
                      <circle cx="218" cy="304" r="3" fill="#fff" opacity="0.13"/>

                      <g transform="rotate(-30 420 160)">
                        <ellipse cx="420" cy="175" rx="42" ry="42" fill="url(#orangeGrad)" stroke="#c05010" strokeWidth="1.5"/>
                        <ellipse cx="420" cy="175" rx="32" ry="32" fill="#ff8c20" opacity="0.5"/>
                        <ellipse cx="420" cy="175" rx="20" ry="20" fill="#ffa030" opacity="0.6"/>
                        <line x1="420" y1="133" x2="420" y2="217" stroke="#c05010" strokeWidth="0.8" opacity="0.4"/>
                        <line x1="378" y1="175" x2="462" y2="175" stroke="#c05010" strokeWidth="0.8" opacity="0.4"/>
                        <line x1="390" y1="145" x2="450" y2="205" stroke="#c05010" strokeWidth="0.6" opacity="0.3"/>
                        <line x1="390" y1="205" x2="450" y2="145" stroke="#c05010" strokeWidth="0.6" opacity="0.3"/>
                        <path d="M378 175 Q399 158 420 133" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.38" strokeLinecap="round"/>
                        <ellipse cx="420" cy="175" rx="42" ry="42" fill="none" stroke="#fff" strokeWidth="1" opacity="0.25"/>
                        <path d="M415 160 Q418 165 414 172" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.48" strokeLinecap="round"/>
                      </g>

                      <path d="M420 135 Q430 115 440 100 Q448 88 455 82" fill="none" stroke="#4a7a28" strokeWidth="2.2" strokeLinecap="round"/>
                      <path d="M438 108 Q445 100 455 98 Q448 106 445 115 Z" fill="#4a7a28"/>
                      <path d="M428 118 Q432 108 440 104 Q436 112 434 120 Z" fill="#6aaa38" opacity="0.8"/>

                      <circle cx="460" cy="148" r="14" fill="url(#cherryGrad)" stroke="#660011" strokeWidth="1.2"/>
                      <ellipse cx="455" cy="142" rx="5" ry="3" fill="#fff" opacity="0.38" transform="rotate(-20 455 142)"/>
                      <path d="M460 134 Q462 118 470 110" fill="none" stroke="#4a7a28" strokeWidth="1.8" strokeLinecap="round"/>

                      <circle cx="287" cy="390" r="3" fill="#fff" opacity="0.55"/>
                      <circle cx="287" cy="390" r="1.5" fill="#c8e8f0" opacity="0.8"/>
                      <circle cx="402" cy="360" r="2.5" fill="#fff" opacity="0.5"/>
                      <circle cx="402" cy="360" r="1.2" fill="#c8e8f0" opacity="0.75"/>
                      <circle cx="260" cy="430" r="2" fill="#fff" opacity="0.45"/>
                      <circle cx="422" cy="410" r="3" fill="#fff" opacity="0.5"/>
                      <circle cx="422" cy="410" r="1.5" fill="#c8e8f0" opacity="0.72"/>
                      <circle cx="248" cy="340" r="2.5" fill="#fff" opacity="0.42"/>
                      <circle cx="435" cy="462" r="2" fill="#fff" opacity="0.4"/>
                      <circle cx="270" cy="472" r="2" fill="#fff" opacity="0.38"/>

                      <ellipse cx="310" cy="196" rx="55" ry="6" fill="#fff" opacity="0.22"/>
                      <ellipse cx="380" cy="193" rx="30" ry="4" fill="#fff" opacity="0.14"/>
                    </svg>
                  </motion.div>
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
const MenuLink = ({ num, text, delay, onClick, onHover }) => {
  return (
    <a href="#" onClick={onClick} onMouseEnter={onHover} className="group block w-full text-center py-2 relative">
      <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 text-xs md:text-sm font-light text-black/30 tracking-widest pointer-events-none">
        {num}
      </div>
      <div className="relative inline-flex justify-center text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-medium uppercase tracking-[0.15em] text-[#3d2a21] pb-2">
        {/* Main Text */}
        <div className="relative z-10 flex">
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
              className="inline-block group-hover:text-black transition-colors duration-500"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        {/* Elegant Animated Underline */}
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3d2a21]/40 scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-out z-10"></span>
      </div>
    </a>
  );
};