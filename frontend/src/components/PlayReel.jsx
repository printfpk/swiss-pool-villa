import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

import champagneModel from '../assets/champagne.glb';
import swordModel from '../assets/sword.glb';

gsap.registerPlugin(ScrollTrigger);

// Cubic ease-out helper (no GSAP dependency needed inside onUpdate)
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
const clamp01      = t => Math.max(0, Math.min(1, t));

/*
  Model math:
  - normalizeScene scales so max(w,h,d) = targetHeight, THEN re-centers at origin
  - Bottle normalized to 3.2 → spans y = -1.6 to +1.6 at origin
  - Bottle group placed at y = -0.4
  - World space: bottom = -1.6 - 0.4 = -2.0,  top = 1.6 - 0.4 = 1.2
  - Neck ≈ 80% from bottom: -2.0 + 3.2*0.80 = 0.56  → use NECK_Y = 0.55
*/
const BOTTLE_X      = 1.4;   // final resting X of bottle
const BOTTLE_START_X = 7.2;  // bottle enters from this X (off-screen right)
const BOTTLE_Y      = -0.4;
const NECK_Y        = 0.55;  // world-space Y of the bottle neck

function normalizeScene(scene, targetHeight = 3) {
  const box = new THREE.Box3().setFromObject(scene);
  const sz  = new THREE.Vector3();
  box.getSize(sz);
  const scale = targetHeight / Math.max(sz.x, sz.y, sz.z);
  scene.scale.setScalar(scale);
  // re-center
  const box2   = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();
  box2.getCenter(center);
  scene.position.sub(center);
  return scene;
}

// ─── Champagne Spray ──────────────────────────────────────────────────────────
// Always mounted — particles just have scale 0 until eventRef.triggered flips
function ChampagneSpray({ eventRef }) {
  const COUNT = 280;
  const mesh  = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const sprayTimer = useRef(-1);
  const SPRAY_DURATION = 5.0; // seconds of continuous fountain

  // Pre-built particle pool (mutable, not state)
  const pool = useRef(
    Array.from({ length: COUNT }, () => ({ life: Infinity, maxLife: 1 }))
  );

  const spawnParticle = (p) => {
    const phi   = Math.random() * Math.PI * 2;
    const cone  = 0.25 + Math.random() * 0.55; // spread angle
    const spd   = 0.05 + Math.random() * 0.09;
    p.x     = BOTTLE_X + (Math.random() - 0.5) * 0.1;
    p.y     = NECK_Y   + Math.random() * 0.08;
    p.z     = (Math.random() - 0.5) * 0.1;
    p.vx    = Math.cos(phi) * cone * spd * 0.45;
    p.vy    = spd;
    p.vz    = Math.sin(phi) * cone * spd * 0.45;
    p.life  = 0;
    p.maxLife = 1.4 + Math.random() * 2.0;
    p.size  = 0.15 + Math.random() * 0.22; // large — definitely visible
  };

  useFrame((_, dt) => {
    if (!mesh.current) return;

    // Start spray when event fires
    if (eventRef.current.triggered && sprayTimer.current < 0) {
      sprayTimer.current = 0;
      pool.current.forEach(spawnParticle);
    }

    if (sprayTimer.current >= 0) {
      sprayTimer.current += dt;
      // Keep fountain going by recycling dead particles
      if (sprayTimer.current < SPRAY_DURATION) {
        pool.current.forEach(p => { if (p.life >= p.maxLife) spawnParticle(p); });
      }
    }

    pool.current.forEach((p, i) => {
      if (p.life < p.maxLife) {
        p.life += dt;
        p.vy   -= 0.003; // gravity droop
        p.x    += p.vx;
        p.y    += p.vy;
        p.z    += p.vz;
        const fade = Math.max(0, 1 - p.life / p.maxLife);
        dummy.position.set(p.x, p.y, p.z);
        dummy.scale.setScalar(p.size * fade);
      } else {
        dummy.scale.setScalar(0);
      }
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial
        color="#f5d045"
        transparent opacity={0.92}
        roughness={0.06} metalness={0.08}
      />
    </instancedMesh>
  );
}

// ─── Cork Pop ─────────────────────────────────────────────────────────────────
// Always mounted, visible=false until trigger
function CorkPop({ eventRef }) {
  const mesh    = useRef();
  const vel     = useRef({ x: 0.055, y: 0.11, z: 0.03 });
  const live    = useRef(false);

  useFrame((_, dt) => {
    if (!mesh.current) return;
    if (eventRef.current.triggered && !live.current) {
      live.current = true;
      mesh.current.visible = true;
      mesh.current.position.set(BOTTLE_X + 0.08, NECK_Y + 0.06, 0);
    }
    if (!live.current) return;
    vel.current.y -= 0.005;
    mesh.current.position.x += vel.current.x;
    mesh.current.position.y += vel.current.y;
    mesh.current.position.z += vel.current.z;
    mesh.current.rotation.x += 0.11;
    mesh.current.rotation.z += 0.07;
  });

  return (
    <mesh ref={mesh} visible={false} position={[BOTTLE_X, NECK_Y, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 0.24, 12]} />
      <meshStandardMaterial color="#b8904a" roughness={0.5} metalness={0.1} />
    </mesh>
  );
}

// ─── Champagne Bottle ─────────────────────────────────────────────────────────
function ChampagneBottle({ eventRef, bottleXRef, bottleRollRef }) {
  const { scene }    = useGLTF(champagneModel);
  const group        = useRef();
  const shake        = useRef(0);
  const normalized   = useMemo(() => normalizeScene(scene.clone(), 3.2), [scene]);

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Shake on sabrage impact
    if (eventRef.current.triggered && shake.current <= 0) shake.current = 0.55;
    let sx = 0, sy = 0;
    if (shake.current > 0) {
      shake.current -= dt;
      const str = shake.current * 0.08;
      sx = (Math.random() - 0.5) * str;
      sy = (Math.random() - 0.5) * str;
    }

    // Progress of bottle roll-in (0 = at start, 1 = at resting place)
    const arriveProgress = clamp01(
      1 - (bottleXRef.current - BOTTLE_X) / (BOTTLE_START_X - BOTTLE_X)
    );

    // Y-axis spin: fast while rolling in, settles to gentle idle sway when arrived
    const spinAngle = bottleRollRef.current;
    const idleSway  = Math.sin(t * 0.35) * 0.06 * arriveProgress;

    // Slight Z tilt while travelling (like a bottle leaning as it slides), upright on arrival
    const tiltZ = (1 - arriveProgress) * 0.18 * Math.sin(spinAngle * 0.5);

    // Small lift arc: rises 0.3 units at mid-travel, lands flat at rest
    const liftY = Math.sin(arriveProgress * Math.PI) * 0.3;

    group.current.position.set(
      bottleXRef.current + sx,
      BOTTLE_Y + liftY + sy,
      0
    );
    group.current.rotation.y = spinAngle + idleSway;
    group.current.rotation.z = tiltZ + sx * 0.5;
  });

  return (
    <group ref={group} position={[BOTTLE_START_X, BOTTLE_Y, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ─── Sword ────────────────────────────────────────────────────────────────────
function Sword({ swordXRef, eventRef }) {
  const { scene } = useGLTF(swordModel);
  const group  = useRef();
  const normalized = useMemo(() => normalizeScene(scene.clone(), 3.8), [scene]);
  const hitDone = useRef(false);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    if (eventRef.current.triggered && !hitDone.current) hitDone.current = true;

    group.current.position.x = swordXRef.current;
    // Slight float — stops after impact
    group.current.position.y = hitDone.current
      ? -0.1
      : Math.sin(t * 0.55) * 0.06 - 0.1;
    // Tilt angle: held level during approach
    group.current.rotation.z = hitDone.current
      ? -0.08
      : -0.06 + Math.sin(t * 0.3) * 0.03;
  });

  return (
    // rotation [0, PI/2, 0] → sword's length runs along world X (right)
    <group ref={group} position={[-5.5, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={normalized} />
    </group>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ swordXRef, eventRef, bottleXRef, bottleRollRef }) {
  // Add responsivenes hook for field of view
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // Arbitrary threshold for mobile width

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 5]} intensity={2.0} castShadow />
      <pointLight position={[-3, 2, 4]} intensity={1.3} color="#ffd680" />
      <spotLight position={[1, 8, 4]} angle={0.28} penumbra={0.9} intensity={1.8} />
      <group scale={isMobile ? 0.6 : 1} position={[0, isMobile ? 0.4 : 0, 0]}>
        <ChampagneBottle eventRef={eventRef} bottleXRef={bottleXRef} bottleRollRef={bottleRollRef} />
        <Sword swordXRef={swordXRef} eventRef={eventRef} />
        <CorkPop eventRef={eventRef} />
        <ChampagneSpray eventRef={eventRef} />
      </group>
      <Environment preset="night" />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlayReel() {
  const parent       = useRef(null);
  const swordXRef    = useRef(-5.5);
  const bottleXRef   = useRef(BOTTLE_START_X);   // bottle starts off-screen right
  const bottleRollRef = useRef(0);               // Y-axis roll angle (radians)
  const eventRef     = useRef({ triggered: false });
  const [flash, setFlash]       = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied]       = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent.current,
        start: 'top top',
        end: '+=250%',          // slightly longer for two-phase drama
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        onUpdate(self) {
          const p = self.progress;

          // ── Phase 1 (0 → 45%): bottle rolls in from right ──────────────────
          const bottlePhase = clamp01(p / 0.45);
          const bottleEased = easeOutQuart(bottlePhase);
          bottleXRef.current  = BOTTLE_START_X + bottleEased * (BOTTLE_X - BOTTLE_START_X);
          // Spin: 3 full Y rotations during travel, slows to idle on arrival
          bottleRollRef.current = (1 - bottleEased) * Math.PI * 6;

          // ── Phase 2 (45% → 88%): sword sweeps in from left ─────────────────
          const swordPhase  = clamp01((p - 0.45) / 0.43);
          const swordEased  = easeOutCubic(swordPhase);
          swordXRef.current = -5.5 + swordEased * 5.5;

          // ── Trigger sabrage at 88% ──────────────────────────────────────────
          if (p >= 0.88 && !eventRef.current.triggered) {
            eventRef.current.triggered = true;
            setFlash(true);
            setTimeout(() => setFlash(false), 380);
            // Show discount popup 2.2s after sabrage so spray is enjoyed first
            setTimeout(() => setShowPopup(true), 2200);
          }
        },
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      id="experiences"
      ref={parent}
      style={{
        width: '100%', height: '100vh',
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(150deg, #06060d 0%, #0e0c17 55%, #07070f 100%)',
      }}
    >
      {/* Ambient gold glow around bottle */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 58% 50%, rgba(210,160,45,0.14) 0%, transparent 68%)',
      }} />

      {/* Impact flash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 8,
        opacity: flash ? 1 : 0,
        transition: flash ? 'none' : 'opacity 0.35s ease',
        background: 'radial-gradient(ellipse 60% 55% at 55% 48%, rgba(255,225,80,0.52) 0%, transparent 62%)',
      }} />

      {/* Top label */}
      <div style={{
        position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
        color: 'rgba(215,175,80,0.72)', fontSize: '0.67rem',
        letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'Georgia, serif',
      }}>
        <span>✦</span> The Sabrage Experience <span>✦</span>
      </div>

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0.3, 7.5], fov: 42 }}
          gl={{ antialias: true }}
          style={{ pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            <Scene
              swordXRef={swordXRef}
              eventRef={eventRef}
              bottleXRef={bottleXRef}
              bottleRollRef={bottleRollRef}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom hint */}
      <p style={{
        position: 'absolute', bottom: '2rem', left: 0, right: 0, zIndex: 10,
        textAlign: 'center',
        color: 'rgba(215,175,80,0.42)', fontSize: '0.64rem',
        letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Georgia, serif',
      }}>
        Scroll to witness the sabrage
      </p>

      {/* ── Discount Popup ─────────────────────────────────────────────────── */}
      {showPopup && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(4,4,10,0.72)',
          backdropFilter: 'blur(10px)',
          animation: 'prFadeIn 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <style>{`
            @keyframes prFadeIn  { from { opacity:0; transform:scale(0.88) translateY(18px) } to { opacity:1; transform:scale(1) translateY(0) } }
            @keyframes prShimmer { 0%,100% { background-position: -200% center } 50% { background-position: 200% center } }
            @keyframes prPulse   { 0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.45) } 50% { box-shadow: 0 0 0 10px rgba(212,175,55,0) } }
            @keyframes prFloat   { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
            .pr-copy-btn:hover   { background: rgba(212,175,55,0.28) !important; }
            .pr-cancel-btn:hover { color: #fff !important; border-color: rgba(255,255,255,0.35) !important; }
          `}</style>

          <div style={{
            position: 'relative',
            width: 'min(92vw, 460px)',
            borderRadius: '20px',
            padding: '2.8rem 2.4rem 2.2rem',
            background: 'linear-gradient(145deg, rgba(20,16,32,0.97) 0%, rgba(12,10,22,0.98) 100%)',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,175,55,0.2)',
            textAlign: 'center',
            animation: 'prFloat 4s ease-in-out infinite 0.5s',
          }}>
            {/* Gold corner accents */}
            {['0 0','0 auto','auto 0','auto auto'].map((m,i)=>(
              <span key={i} style={{
                position:'absolute', [i<2?'top':'bottom']:'14px', [i%2===0?'left':'right']:'14px',
                width:'18px', height:'18px',
                borderTop: i<2 ? '1.5px solid rgba(212,175,55,0.7)' : 'none',
                borderBottom: i>=2 ? '1.5px solid rgba(212,175,55,0.7)' : 'none',
                borderLeft: i%2===0 ? '1.5px solid rgba(212,175,55,0.7)' : 'none',
                borderRight: i%2!==0 ? '1.5px solid rgba(212,175,55,0.7)' : 'none',
              }}/>
            ))}

            {/* Champagne emoji badge */}
            <div style={{
              fontSize: '2.6rem', marginBottom: '1rem',
              filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.6))',
            }}>🍾</div>

            {/* Headline */}
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.65rem', letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.75)', marginBottom: '0.55rem',
            }}>Dear Guest</p>

            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.3rem, 4vw, 1.65rem)',
              fontWeight: 400, lineHeight: 1.35,
              color: '#fff', marginBottom: '0.6rem',
            }}>
              You are the{' '}
              <span style={{
                background: 'linear-gradient(90deg, #d4af37, #f5e17a, #c8960c, #f5e17a, #d4af37)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'prShimmer 3s linear infinite',
              }}>Luckiest Person</span>
            </h2>

            <p style={{
              color: 'rgba(220,210,195,0.78)', fontSize: '0.92rem',
              lineHeight: 1.6, marginBottom: '1.8rem',
              fontFamily: 'Georgia, serif',
            }}>
              The sabrage chose you — claim your exclusive{' '}
              <strong style={{ color: '#f5e17a' }}>10% discount</strong>{' '}
              on your Swiss Pool Villa booking.
            </p>

            {/* Coupon box */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', marginBottom: '1.8rem',
              padding: '0.85rem 1.2rem',
              background: 'rgba(212,175,55,0.1)',
              border: '1.5px dashed rgba(212,175,55,0.55)',
              borderRadius: '10px',
              animation: 'prPulse 2.4s ease-in-out infinite',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.35rem', letterSpacing: '0.18em',
                color: '#f5e17a', fontWeight: 600,
                userSelect: 'all',
              }}>SWISS2026</span>
              <button
                className="pr-copy-btn"
                onClick={() => {
                  navigator.clipboard?.writeText('SWISS2026');
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2200);
                }}
                style={{
                  cursor: 'pointer', border: 'none', outline: 'none',
                  background: 'rgba(212,175,55,0.15)',
                  color: copied ? '#7effa0' : 'rgba(212,175,55,0.9)',
                  borderRadius: '6px', padding: '0.3rem 0.65rem',
                  fontSize: '0.72rem', letterSpacing: '0.1em',
                  fontFamily: 'Georgia, serif',
                  transition: 'all 0.2s',
                }}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            {/* Cancel button */}
            <button
              className="pr-cancel-btn"
              onClick={() => setShowPopup(false)}
              style={{
                cursor: 'pointer', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.5)',
                borderRadius: '50px', padding: '0.5rem 2rem',
                fontSize: '0.72rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', fontFamily: 'Georgia, serif',
                transition: 'all 0.25s',
              }}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}