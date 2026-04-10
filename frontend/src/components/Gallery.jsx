import React from "react";
import { Reveal } from "./pretext";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c0d1396b?w=800&q=80"
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-gradient-to-b from-[#edb891] to-[#ebccc5] text-black rounded-3xl my-10">
      <Reveal>
         <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Moments Captured</h2>
      </Reveal>
      
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((src, i) => (
          <Reveal key={i} animation="fade-up" delay={i * 0.1}>
            <div className="overflow-hidden rounded-xl group cursor-pointer">
              <img src={src} alt="Gallery" className="w-full h-auto object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
         <button className="px-8 py-3 border border-black text-black rounded-[8px] font-semibold hover:bg-black hover:text-[#eeb992] transition">
            View Full Gallery
         </button>
      </div>
    </section>
  );
}