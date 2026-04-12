import React, { useRef, useEffect, useState } from 'react';

const VILLA_VIDEO = 'https://ik.imagekit.io/printf/swissvilla/video-6%20(1).mp4';

const NAV_LINKS = [
  { label: 'Villas',      href: '#' },
  { label: 'Experiences', href: '#' },
  { label: 'Gallery',     href: '#' },
  { label: 'Book Now',    href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'WhatsApp',  href: '#' },
];

// ── Flip Link — slide-up 3D style ─────────────────────────────────────────────
function FlipLink({ href, children }) {
  return (
    <a href={href} className="ft-flip-link">
      <span className="ft-flip-front">{children}</span>
      <span className="ft-flip-back">{children}</span>
    </a>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1400, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let st = null;
    const step = (ts) => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

export default function Footer() {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (rootRef.current) obs.observe(rootRef.current);
    return () => obs.disconnect();
  }, []);

  const years  = useCountUp(18,   1200, visible);
  const villas = useCountUp(24,   1200, visible);
  const guests = useCountUp(3800, 1400, visible);

  return (
    <footer
      ref={rootRef}
      style={{
        /* Very dark near-black to blend with video section above */
        background: '#090807',
        color: '#e0d9d2',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: 'hidden',
      }}
    >
      {/* ── CSS for flip links + shimmer ────────────────────────────────────── */}
      <style>{`
        /* Flip link */
        .ft-flip-link {
          position: relative;
          display: inline-block;
          overflow: hidden;
          line-height: 1.35;
          text-decoration: none;
          color: rgba(224,217,210,0.55);
          font-size: 0.9rem;
        }
        .ft-flip-front, .ft-flip-back {
          display: block;
          transition: transform 0.38s cubic-bezier(0.23, 1, 0.32, 1);
          white-space: nowrap;
        }
        .ft-flip-back {
          position: absolute;
          left: 0;
          top: 100%;
          color: #edb891;
        }
        .ft-flip-link:hover .ft-flip-front { transform: translateY(-100%); }
        .ft-flip-link:hover .ft-flip-back  { transform: translateY(-100%); }



        /* Responsive */
        @media (max-width: 860px) {
          .ft-hero  { grid-template-columns: 1fr !important; padding: 3rem 1.8rem 2rem !important; }
          .ft-links { grid-template-columns: 1fr 1fr !important; padding: 2.5rem 1.8rem !important; }
        }
        @media (max-width: 520px) {
          .ft-links { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO BAND ──────────────────────────────────────────────────────── */}
      <div
        className="ft-hero"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '60vh',
          alignItems: 'center',
          padding: '5rem 5rem 3.5rem',
          gap: '3.5rem',
        }}
      >
        {/* LEFT */}
        <div>
          {/* Eyebrow */}
          <p style={{
            fontSize: '0.66rem', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: '#edb891',
            marginBottom: '1.4rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
            ✦ Swiss Pool Villa · Est. 2006
          </p>

          {/* Main heading */}
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5.8rem)',
            fontWeight: 400, lineHeight: 1.06,
            letterSpacing: '-0.02em',
            margin: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.85s ease, transform 0.85s ease',
          }}>
            {/* Line 1 — plain light */}
            <span style={{ display: 'block', color: '#f0ebe6' }}>
              Your Perfect
            </span>
            {/* Line 2 — plain terracotta, no glow */}
            <span style={{ color: '#edb891' }}>
              Escape Awaits.
            </span>
          </h2>

          {/* Body */}
          <p style={{
            marginTop: '1.8rem', maxWidth: '400px',
            fontSize: '0.97rem', lineHeight: 1.8,
            color: 'rgba(224,217,210,0.55)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.85s ease 0.2s, transform 0.85s ease 0.2s',
          }}>
            Nestled in paradise, Swiss Pool Villa offers an unrivalled blend of
            privacy, luxury, and nature — where every detail is curated for you.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '3rem', marginTop: '2.8rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.85s ease 0.4s',
          }}>
            {[
              { val: years,  sfx: '+', label: 'Years of Luxury' },
              { val: villas, sfx: '',  label: 'Exclusive Villas' },
              { val: guests, sfx: '+', label: 'Happy Guests' },
            ].map(({ val, sfx, label }) => (
              <div key={label}>
                <div style={{ fontSize: '2rem', fontWeight: 400, color: '#edb891', lineHeight: 1 }}>
                  {val.toLocaleString()}{sfx}
                </div>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'rgba(224,217,210,0.38)',
                  marginTop: '0.35rem',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — video */}
        <div style={{
          position: 'relative', borderRadius: '14px', overflow: 'hidden',
          aspectRatio: '16/10',
          boxShadow: '0 28px 70px rgba(0,0,0,0.7)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0) scale(1)' : 'translateX(45px) scale(0.96)',
          transition: 'opacity 0.95s ease 0.15s, transform 0.95s ease 0.15s',
        }}>
          <video
            src={VILLA_VIDEO}
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(9,8,7,0.3) 0%, transparent 50%, rgba(9,8,7,0.3) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '14px', pointerEvents: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(237,184,145,0.22)',
          }} />
        </div>
      </div>

      {/* ── DIVIDER ────────────────────────────────────────────────────────── */}
      <div style={{
        margin: '0 5rem', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(237,184,145,0.3) 35%, rgba(235,204,197,0.3) 65%, transparent)',
      }} />

      {/* ── LINKS GRID ─────────────────────────────────────────────────────── */}
      <div
        className="ft-links"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '2rem',
          padding: '3.5rem 5rem 2.5rem',
          alignItems: 'start',
        }}
      >
        {/* Col 1 — address */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#edb891', marginBottom: '1rem' }}>
            Contact
          </div>
          <address style={{ fontStyle: 'normal', lineHeight: 2.2, color: 'rgba(224,217,210,0.52)', fontSize: '0.87rem' }}>
            Swiss Pool Villa Lane<br />
            Luxury Island, Maldives<br />
            +960 300 1234<br />
            <FlipLink href="mailto:hello@swisspoolvilla.com">
              hello@swisspoolvilla.com
            </FlipLink>
          </address>
        </div>

        {/* Col 2 — nav */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#edb891', marginBottom: '1rem' }}>
            Explore
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.85rem' }}>
                <FlipLink href={href}>{label}</FlipLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — social */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#edb891', marginBottom: '1rem' }}>
            Follow Us
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.85rem' }}>
                <FlipLink href={href}>{label}</FlipLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — newsletter */}
        <div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#edb891', marginBottom: '1rem' }}>
            Newsletter
          </div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(224,217,210,0.45)', lineHeight: 1.7, marginBottom: '1.1rem' }}>
            Exclusive offers and villa updates, straight to your inbox.
          </p>
          <div style={{
            display: 'flex', borderRadius: '6px', overflow: 'hidden',
            border: '1px solid rgba(237,184,145,0.32)',
          }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1, padding: '0.65rem 0.9rem',
                background: 'rgba(255,255,255,0.04)',
                border: 'none', outline: 'none',
                color: '#e0d9d2', fontSize: '0.82rem',
                fontFamily: 'Georgia, serif',
              }}
            />
            <button
              style={{
                padding: '0.65rem 1rem',
                background: '#edb891',
                border: 'none', cursor: 'pointer',
                color: '#1a130d', fontWeight: 700,
                fontSize: '0.7rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', fontFamily: 'Georgia, serif',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#ebccc5'}
              onMouseLeave={e => e.currentTarget.style.background = '#edb891'}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.4rem 5rem 2.4rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        flexWrap: 'wrap', gap: '0.8rem',
      }}>
        <span style={{ fontSize: '0.7rem', color: 'rgba(224,217,210,0.28)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()} Swiss Pool Villa · All rights reserved
        </span>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(l => (
            <FlipLink key={l} href="#">{l}</FlipLink>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            background: 'none', border: '1px solid rgba(237,184,145,0.3)',
            borderRadius: '50px', padding: '0.4rem 1.1rem',
            color: 'rgba(237,184,145,0.7)', fontSize: '0.66rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'Georgia, serif',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ebccc5'; e.currentTarget.style.color = '#ebccc5'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(237,184,145,0.3)'; e.currentTarget.style.color = 'rgba(237,184,145,0.7)'; }}
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}