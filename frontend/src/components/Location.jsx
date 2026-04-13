import React, { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Reveal } from "./pretext";
import { MapPin, Navigation } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

// ── Wine Glass ────────────────────────────────────────────────────────────────
function WineGlass() {
  const { scene } = useGLTF(wineGlassModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 2.4), [scene]);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.28;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Cocktail Umbrella (in glass) ──────────────────────────────────────────────
function CocktailUmbrella() {
  const { scene } = useGLTF(umbrellaModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 1.1), [scene]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.28;
    group.current.position.y = 1.0 + Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
  });

  return (
    <group ref={group} position={[0.1, 1.0, 0]} rotation={[0.2, 0, 0.35]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Static cocktail display scene ─────────────────────────────────────────────
// showUmbrella=false when the cursor umbrella is active (umbrella left the glass)
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

// ── Spinning Umbrella — 120fps cursor ─────────────────────────────────────────
function SpinningUmbrella() {
  const { scene } = useGLTF(umbrellaModel);
  const group = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 1.8), [scene]);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 2.2;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.4) * 0.1;
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ── Location Section ──────────────────────────────────────────────────────────
export default function Location() {
  const sectionRef = useRef(null);
  const canvasDisplayRef = useRef(null); // ref on the 3D display canvas wrapper
  const hasLaunched = useRef(false); // umbrella launched once → stays out forever

  // React state for glass toggle — only 1 re-render ever (false and stays false)
  const [showGlassUmbrella, setShowGlassUmbrella] = useState(true);

  // ── MotionValues — zero re-renders on move ───────────────────────────────
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  // Very soft spring: slow stiffness + strong damping = silky cinematic glide
  const springX = useSpring(rawX, { stiffness: 110, damping: 26, mass: 0.9 });
  const springY = useSpring(rawY, { stiffness: 110, damping: 26, mass: 0.9 });
  // Opacity and scale springs — for smooth disappearing and launching
  const rawOpacity = useMotionValue(0);
  const rawScale = useMotionValue(0);
  
  const cursorOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 20 });
  const cursorScale = useSpring(rawScale, { stiffness: 80, damping: 18, mass: 0.8 });

  // ── mouseenter / mouseleave on section ──────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onEnter = () => {
      if (!hasLaunched.current && canvasDisplayRef.current) {
        // ── First entry: LAUNCH from glass center ──────────────────────────
        // jump() sets position instantly (bypasses spring) so umbrella
        // visibly appears AT the glass, then spring arcs it toward cursor.
        const r = canvasDisplayRef.current.getBoundingClientRect();
        rawX.jump(r.left + r.width / 2 - 60);
        rawY.jump(r.top + r.height / 2 - 60);
        setShowGlassUmbrella(false); // empty glass — umbrella is now the cursor
        hasLaunched.current = true;
      }
      // Fade cursor in smoothly and scale up
      rawOpacity.set(1);
      rawScale.set(1);
    };

    // We no longer hide on 'mouseleave' from the section, because we want it to 
    // stay visible in the footer too. The mousemove event handles hiding it instead 
    // when leaving the Location+Footer area.
    
    el.addEventListener("mouseenter", onEnter);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
    };
  }, [rawOpacity, rawScale, rawX, rawY]);

  // ── mousemove: pure position tracking, passive, no setState ─────────────
  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX - 60); // centre the 120px canvas on cursor
      rawY.set(e.clientY - 60);

      // Hide umbrella cursor when hovering over links/buttons
      if (hasLaunched.current) {
        const isHoveringLink = e.target.closest("a, button, [role='button'], iframe");
        const inLocation = sectionRef.current && sectionRef.current.contains(e.target);
        const inFooter = !!e.target.closest("footer");
        const inAllowedArea = inLocation || inFooter;
        
        if (isHoveringLink || !inAllowedArea) {
          rawOpacity.set(0);
          rawScale.set(0);
        } else {
          rawOpacity.set(1);
          rawScale.set(1);
        }
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, rawOpacity, rawScale]);

  return (
    <>
      {/* ── Umbrella cursor overlay — spring-physics, 120fps ──────────────── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          width: 120,
          height: 120,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: cursorOpacity,
          scale: cursorScale,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.4, 3.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 3, 2]} intensity={2.2} />
          <Suspense fallback={null}>
            <SpinningUmbrella />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── Location section ─────────────────────────────────────────────── */}
      <section
        id="location"
        ref={sectionRef}
        className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto [&_*]:!cursor-none"
        style={{ cursor: "none" }}
      >
        {/* Heading row: title + logo + 3D cocktail display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left">
              Discover Paradise
            </h2>
          </Reveal>

          {/* Swiss Pool Villa logo + 3D cocktail */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" className="h-12 md:h-16 w-auto">
              <defs>
                <linearGradient id="goldGradientLoc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8D8A8" />
                  <stop offset="50%" stopColor="#C9A646" />
                  <stop offset="100%" stopColor="#A8832F" />
                </linearGradient>
              </defs>
              <g transform="translate(90,80)">
                <circle cx="0" cy="0" r="40" stroke="url(#goldGradientLoc)" strokeWidth="1.5" fill="none" />
                <path d="M-18 8 L0 -18 L18 8 Z" fill="none" stroke="url(#goldGradientLoc)" strokeWidth="1.5" />
                <path d="M-24 16 Q0 26 24 16" stroke="url(#goldGradientLoc)" strokeWidth="1.5" fill="none" />
              </g>
              <line x1="145" y1="35" x2="145" y2="125" stroke="url(#goldGradientLoc)" strokeWidth="1" opacity="0.5" />
              <text x="165" y="85" fontFamily="Playfair Display, serif" fontSize="32" fill="url(#goldGradientLoc)" letterSpacing="5">SWISS</text>
              <text x="165" y="115" fontFamily="Montserrat, sans-serif" fontSize="13" fill="#555555" letterSpacing="7">POOL VILLA</text>
              <line x1="165" y1="125" x2="420" y2="125" stroke="url(#goldGradientLoc)" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* 3D Wine Glass + Umbrella */}
            <div ref={canvasDisplayRef} style={{ width: 160, height: 200, flexShrink: 0, pointerEvents: "none" }}>
              <Canvas
                camera={{ position: [0, 0.5, 4.5], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
                style={{ width: "100%", height: "100%", background: "transparent" }}
              >
                <CocktailScene showUmbrella={showGlassUmbrella} />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Content row: info panel + map */}
        <div className="flex flex-col md:flex-row gap-12 items-center bg-gray-50 rounded-3xl overflow-hidden p-2 md:p-4">

          <div className="w-full md:w-2/5 p-8 md:p-12 space-y-6">
            <div className="bg-[--color-brand]/10 w-16 h-16 rounded-full flex items-center justify-center text-[--color-brand] mb-6">
              <MapPin size={32} />
            </div>
            <motion.h3
              className="text-3xl font-bold flex flex-wrap"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
              }}
            >
              {"Immersed in nature.".split("").map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h3>
            <motion.p
              className="text-lg text-[--color-text-muted] leading-relaxed inline-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.01, delayChildren: 0.4 } }
              }}
            >
              {"Located in scenic Bang Sare, Chon Buri, Thailand, offering a serene luxury escape with seamless access to the coast. Your private oasis awaits.".split("").map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <div className="pt-6">
              <a
                href="https://maps.app.goo.gl/tafRTisbF6cCBQfZ7?g_st=aw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-medium text-white bg-black hover:bg-neutral-800 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl"
              >
                <Navigation size={18} /> Get Directions
              </a>
            </div>
          </div>

          <div className="w-full md:w-3/5 h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg relative">
            <iframe
              src="https://maps.google.com/maps?q=72%20Swiss%20Poolvilla,%20Tambon%20Bang%20Sare,%20Sattahip%20District,%20Chon%20Buri%2020250,%20Thailand&t=&z=15&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-125 hover:grayscale-0 transition duration-700 absolute inset-0"
              title="Swiss Pool Villa Location Map"
            ></iframe>
          </div>

        </div>
      </section>
    </>
  );
}
