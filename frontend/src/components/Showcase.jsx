import React, { useRef, useState } from "react";

export default function Showcase() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMouseX(e.clientX - left);
    setMouseY(e.clientY - top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-40 px-6 md:px-12 w-full max-w-[1400px] mx-auto overflow-hidden bg-[#f8f9fa] shadow-inner rounded-3xl my-20 cursor-none border border-gray-200"
    >
      {/* Base Layer */}
      <div className="relative z-10 w-full pointer-events-none">
        <div className="text-center mb-16 w-full">
          <h2 className="text-sm font-bold tracking-widest text-[--color-brand] uppercase mb-4 transition-opacity duration-1000 opacity-100">
            The Art of Resort
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[--color-text-main]">
            A Story of Elegance
          </h3>
        </div>
        
        <div className="max-w-4xl mx-auto text-justify md:text-center">
          <div className="text-xl md:text-3xl font-medium leading-relaxed md:leading-[1.8] text-gray-800 select-none">
            Our journey began with a simple idea: to harmonize human luxury with raw natural beauty. Every stone laid, every beam carved, and every dish prepared is an homage to the sacred land we rest upon. The resort is not just a destination; it is an immersive art piece. As you walk these halls, the sound of the ocean and the rustle of the tropical breeze converge into a symphony of peace. We invite you to lose yourself in the detail, to taste the extraordinary, and to feel the heartbeat of SwissPoolVilla in every moment of your stay.
          </div>
        </div>
      </div>

      {/* Distorted Glass Layer clipped exactly to the Spoon's Bowl position */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 py-40 px-6 md:px-12"
        style={{
          filter: "url(#text-distort)",
          clipPath: isHovered ? `circle(80px at ${mouseX - 50}px ${mouseY + 50}px)` : "circle(0px at 0px 0px)",
          WebkitClipPath: isHovered ? `circle(80px at ${mouseX - 50}px ${mouseY + 50}px)` : "circle(0px at 0px 0px)",
          transition: "clip-path 0.1s linear"
        }}
      >
        <div className="relative z-10 w-full pointer-events-none">
          <div className="text-center mb-16 w-full">
            <h2 className="text-sm font-bold tracking-widest text-[--color-brand] uppercase mb-4 opacity-100">
              The Art of Resort
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[--color-brand]">
              A Story of Elegance
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto text-justify md:text-center">
            <div className="text-xl md:text-3xl font-medium leading-relaxed md:leading-[1.8] text-gray-900 select-none">
              Our journey began with a simple idea: to harmonize human luxury with raw natural beauty. Every stone laid, every beam carved, and every dish prepared is an homage to the sacred land we rest upon. The resort is not just a destination; it is an immersive art piece. As you walk these halls, the sound of the ocean and the rustle of the tropical breeze converge into a symphony of peace. We invite you to lose yourself in the detail, to taste the extraordinary, and to feel the heartbeat of SwissPoolVilla in every moment of your stay.
            </div>
          </div>
        </div>
      </div>

      {/* SVG Water/Glass Ripple Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="text-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </svg>
      
      {/* Physical Spoon Element */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          pointerEvents: "none",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isHovered ? 1 : 0,
          transform: `translate3d(${mouseX - 200}px, ${mouseY - 200}px, 0) scale(${isHovered ? 1 : 0.8})`,
          transition: "opacity 0.2s ease-out, transform 0.05s linear"
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Silver_spoon.png" 
          alt="Silver Spoon"
          className="w-[300px] h-[300px] object-contain transform -rotate-12 relative z-30 drop-shadow-2xl opacity-95"
        />
      </div>
    </section>
  );
}
