import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { Search, Menu, User, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FlipText } from "./pretext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

import wineGlassModel from "../assets/wine_glass.glb";
import umbrellaModel from "../assets/umbrella.glb";

// ── Normalize GLB to target height ───────────────────────────────────────────
function normalizeScene(scene, targetHeight = 2) {
  const box = new THREE.Box3().setFromObject(scene);
  const sz = new THREE.Vector3();
  box.getSize(sz);
  const scale = targetHeight / Math.max(sz.x, sz.y, sz.z);
  scene.scale.setScalar(scale);
  const box2 = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();
  box2.getCenter(center);
  scene.position.sub(center);
  return scene;
}

// ── Wine Glass ───────────────────────────────────────────────────────────────
function WineGlass() {
  const { scene } = useGLTF(wineGlassModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 2.4), [scene]);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.28;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Cocktail Umbrella ────────────────────────────────────────────────────────
function CocktailUmbrella() {
  const { scene } = useGLTF(umbrellaModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 1.1), [scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Rotate with glass + gentle float
    group.current.rotation.y = clock.elapsedTime * 0.28;
    group.current.position.y = 1.0 + Math.sin(clock.elapsedTime * 0.9) * 0.04;
  });

  return (
    // Tilt umbrella like a cocktail stick at ~20°
    <group ref={group} position={[0.1, 1.0, 0]} rotation={[0.2, 0, 0.35]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Spinning Umbrella — used as the cursor ────────────────────────────────────
function SpinningUmbrella() {
  const { scene } = useGLTF(umbrellaModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 1.6), [scene]);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 1.8; // faster spin as cursor
      group.current.rotation.z = Math.sin(clock.elapsedTime * 2) * 0.08;
    }
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Full Cocktail 3D Scene ───────────────────────────────────────────────────
function CocktailScene({ showUmbrella = true }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 5, 3]} intensity={1.8} />
      <pointLight position={[-2, 3, 2]} intensity={1.0} color="#edb891" />
      <Suspense fallback={null}>
        <WineGlass />
        {showUmbrella && <CocktailUmbrella />}
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Umbrella cursor — motion values (no re-render on mouse move)
  const [isInMenu, setIsInMenu] = useState(false);
  const [isIdle, setIsIdle] = useState(false);   // cursor inactive inside menu
  const hasEnteredRef = useRef(false);
  const idleTimerRef = useRef(null);
  const returnTimerRef = useRef(null);
  const menuRef = useRef(null);
  const IDLE_MS = 2000; // ms of no movement before umbrella returns

  // Raw positions updated directly from mousemove
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  // Spring — pulls from glass corner to cursor with physics
  const springX = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.7 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.7 });

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

  // Track mouse — set motion values directly (60fps, no state)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!menuRef.current) return;
      const rect = menuRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      setIsInMenu(inside);

      if (inside) {
        // Cancel any pending idle return
        clearTimeout(idleTimerRef.current);
        clearTimeout(returnTimerRef.current);
        setIsIdle(false);

        // First time entering (or re-entering after idle) — launch from glass
        if (!hasEnteredRef.current) {
          hasEnteredRef.current = true;
          rawX.jump(window.innerWidth - 125);
          rawY.jump(70);
        }
        rawX.set(e.clientX - 40);
        rawY.set(e.clientY - 40);

        // Start idle countdown
        idleTimerRef.current = setTimeout(() => setIsIdle(true), IDLE_MS);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawX, rawY]);

  // When idle: spring flies umbrella back to glass, then hides cursor + resets
  useEffect(() => {
    if (isIdle) {
      // Fly back to glass corner dramatically
      rawX.set(window.innerWidth - 125);
      rawY.set(70);
      // After spring settles, hide cursor & reset so next move = fresh launch
      returnTimerRef.current = setTimeout(() => {
        hasEnteredRef.current = false;
        setIsInMenu(false);
        setIsIdle(false);
      }, 1300);
    }
    return () => clearTimeout(returnTimerRef.current);
  }, [isIdle, rawX, rawY]);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsInMenu(false);
      setIsIdle(false);
      hasEnteredRef.current = false;
      clearTimeout(idleTimerRef.current);
      clearTimeout(returnTimerRef.current);
      rawX.jump(-200);
      rawY.jump(-200);
    }
  }, [isMenuOpen, rawX, rawY]);

  return (
    <>
      {/* ── Umbrella cursor — spring-physics swoop from glass ──────────── */}
      <AnimatePresence>
        {isMenuOpen && isInMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              x: springX,   /* spring follows rawX which jumps from glass corner */
              y: springY,
              width: 80, height: 80,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            <Canvas
              camera={{ position: [0, 0.5, 3.5], fov: 40 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: '100%', height: '100%' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[2, 3, 2]} intensity={2} />
              <Suspense fallback={null}>
                <SpinningUmbrella />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${isScrolled ? 'bg-white shadow-md text-[--color-text-main]' : 'bg-transparent text-white'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>

        {/* Logo */}
        <div className="cursor-pointer">
          <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" className="h-16 md:h-20 w-auto">
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
                  ref={menuRef}
                  initial={{ clipPath: "circle(0px at 100% 0%)" }}
                  animate={{ clipPath: "circle(2500px at 100% 0%)" }}
                  exit={{ clipPath: "circle(0px at 100% 0%)" }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-[40%] z-[60] flex flex-col justify-center text-black overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #d5d4cf, #e0dfdb, #ebccc5, #edb891)', cursor: 'none' }}
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

                  {/* ── 3D Cocktail — top right corner ─────────────────── */}
                  <div
                    style={{
                      position: 'absolute', top: 0, right: 0,
                      width: 170, height: 220,
                      pointerEvents: 'none', zIndex: 2,
                    }}
                  >
                    <Canvas
                      camera={{ position: [0, 0.5, 4.5], fov: 38 }}
                      gl={{ antialias: true, alpha: true }}
                      style={{ width: '100%', height: '100%', background: 'transparent' }}
                    >
                      {/* Show umbrella in glass: when cursor left menu, OR when idle returning */}
                      <CocktailScene showUmbrella={!isInMenu || isIdle} />
                    </Canvas>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 md:top-10 md:right-12 p-3 rounded-full border border-white/20 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center text-white backdrop-blur-md z-10"
                  >
                    <X size={20} />
                  </button>

                  {/* Menu links */}
                  <div className="relative z-10 flex flex-col gap-6 md:gap-10 text-center px-4 mt-4 md:mt-10 mx-auto w-max">
                    <MenuLink num="01" text="Home" delay={0.1} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink num="02" text="Villas" delay={0.2} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink num="03" text="Experiences" delay={0.3} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink num="04" text="About Us" delay={0.4} onClick={() => setIsMenuOpen(false)} />
                    <MenuLink num="05" text="Contact" delay={0.5} onClick={() => setIsMenuOpen(false)} />
                  </div>

                  {/* Bottom tagline */}
                  <p className="absolute bottom-8 left-0 right-0 text-center text-white/25 text-xs tracking-[0.3em] uppercase pointer-events-none">
                    Swiss Pool Villa · Est. 2006
                  </p>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

// ── Menu link ─────────────────────────────────────────────────────────────────
const MenuLink = ({ num, text, delay, onClick }) => (
  <a href="#" onClick={onClick} className="group block w-full text-center py-2 relative">
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