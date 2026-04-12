import React from "react";
import { Fade, Slide, FlipText, DislocateText } from "./pretext";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden px-6 md:px-24">
      <video
        src="https://ik.imagekit.io/printf/swissvilla/swissvideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Vertical Side Text */}
      <div className="absolute left-[-60px] md:left-[-80px] top-1/2 -translate-y-1/2 -rotate-90 z-20 text-[#FDFBF7] origin-center">
        <Slide direction="up" delay={0.2}>
          <span className="block opacity-80 text-xs font-['Montserrat'] tracking-[0.4em] uppercase font-bold drop-shadow-lg whitespace-nowrap">
            <DislocateText>Private Sanctuary</DislocateText>
          </span>
        </Slide>
      </div>

      <div className="relative text-left text-white z-10 p-0 w-full md:-mt-16 lg:-mt-24 md:pl-16">

        <div className="headings mt-2 sm:mt-5 lg:mt-8">
          {["Where", "Luxury", "Breathes"].map((item, index, array) => {
            const previousCharsCount = array.slice(0, index).join("").length;
            return (
              <p 
                key={index} 
                className={`text-4xl sm:text-5xl lg:text-7xl xl:text-[7rem] tracking-tighter py-2 sm:py-3 -mt-1 sm:-mt-3 lg:-mt-4 leading-none overflow-hidden drop-shadow-md
                  ${index === 0 ? "font-thin text-white/80" : ""}
                  ${index === 1 ? "text-red-600 pb-4" : ""}
                  ${index === 2 ? "font-bold text-white ml-2 sm:ml-4" : ""}
                `}
              >
                {item.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      ease: [0.22, 1, 0.36, 1],
                      duration: 0.6,
                      delay: 0.2 + (previousCharsCount + charIndex) * 0.04,
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </p>
            );
          })}
        </div>
      </div>

      {/* Floating Search Bar at Bottom */}
      <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] px-4 text-white pointer-events-none">
        <Slide direction="up" delay={0.5}>
          <div className="flex justify-center pointer-events-auto">
            <div className="flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.6)] rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-2 transition duration-300 hover:bg-black/60">
              <button className="px-6 py-2 text-sm font-medium border-r border-white/30 whitespace-nowrap hover:text-[#C9A646] transition-colors">
                <FlipText>Book Now</FlipText>
              </button>
              <button className="px-6 py-2 text-sm font-normal opacity-90 whitespace-nowrap hover:text-[#C9A646] transition-colors">
                <FlipText>Explore Villas</FlipText>
              </button>
              <div className="bg-gradient-to-br from-[#E8D8A8] via-[#C9A646] to-[#A8832F] text-black p-3 rounded-full flex items-center justify-center ml-2 cursor-pointer shadow-[0_0_15px_rgba(201,166,70,0.4)] hover:scale-105 transition-all shrink-0">
                <Search size={18} />
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}