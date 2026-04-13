import React from "react";
import { Fade, Slide, FlipText, DislocateText } from "./pretext";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {

  return (
    <section id="home" className="relative h-[80svh] md:h-screen flex flex-col md:flex-row items-center justify-start overflow-hidden px-6 md:px-24">
      {/* Background container that is half screen on mobile, full on desktop */}
      <div className="absolute top-0 left-0 w-full h-[55%] md:h-full z-0 pointer-events-none">
        <video
          src="https://ik.imagekit.io/printf/swissvilla/swissvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[--color-bg-main] to-transparent md:hidden" />
      </div>

      {/* Vertical Side Text */}
      <div className="hidden md:block absolute left-[-60px] md:left-[-80px] top-1/2 -translate-y-1/2 -rotate-90 z-20 text-[#FDFBF7] origin-center">
        <Slide direction="up" delay={0.2}>
          <span className="block opacity-80 text-xs font-['Montserrat'] tracking-[0.4em] uppercase font-bold drop-shadow-lg whitespace-nowrap">
            <DislocateText>Private Sanctuary</DislocateText>
          </span>
        </Slide>
      </div>

      <div className="relative text-left z-10 p-0 w-full mt-auto mb-16 sm:mt-auto sm:mb-12 md:m-0 md:-mt-16 lg:-mt-24 md:pl-16 flex flex-col justify-end md:justify-center h-full">

        <div className="headings mt-2 sm:mt-5 lg:mt-8 flex flex-col items-start px-2 md:px-0">
          {["Where", "Luxury", "Breathes"].map((item, index, array) => {
            const previousCharsCount = array.slice(0, index).join("").length;
            return (
              <p 
                key={index} 
                className={`text-[55px] sm:text-6xl md:text-7xl xl:text-[7rem] tracking-tighter py-1 sm:py-2 md:py-3 -mt-3 sm:-mt-2 md:-mt-3 lg:-mt-4 leading-none overflow-hidden drop-shadow-md
                  ${index === 0 ? "font-thin text-black/50 md:text-white/30" : ""}
                  ${index === 1 ? "font-semibold text-[#e0003c] pb-1 sm:pb-4" : ""}
                  ${index === 2 ? "font-light text-black md:text-white ml-2 sm:ml-4" : ""}
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

        {/* Red line below "Breathes" */}
        <motion.div
          className="ml-2 sm:ml-4 mt-2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.9, delay: 1.1 }}
          style={{ transformOrigin: 'left center' }}
        >
          <div
            className="h-[3px] w-40 sm:w-64 lg:w-80 rounded-full"
            style={{ background: 'linear-gradient(90deg, #e0003c 0%, #ff6b81 55%, transparent 100%)' }}
          />
        </motion.div>
      </div>

      {/* Floating Search Bar at Bottom */}
      <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-[400px] sm:max-w-none z-[100] px-2 sm:px-4 text-white pointer-events-none">
        <Slide direction="up" delay={0.5}>
          <div className="flex justify-center pointer-events-auto">
            <div className="flex items-center w-full justify-between sm:justify-center shadow-[0_8px_30px_rgb(0,0,0,0.6)] rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-1.5 sm:p-2 transition duration-300 hover:bg-black/60">
              <button className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium border-r border-white/30 whitespace-nowrap hover:text-[#C9A646] transition-colors flex-1 text-center">
                <FlipText>Book Now</FlipText>
              </button>
              <button className="px-3 sm:px-6 py-2 text-xs sm:text-sm font-normal opacity-90 whitespace-nowrap hover:text-[#C9A646] transition-colors flex-1 text-center">
                <FlipText>Explore</FlipText>
              </button>
              <div className="bg-gradient-to-br from-[#ff6b81] via-[#e0003c] to-[#b0002e] text-white p-2 sm:p-3 rounded-full flex items-center justify-center ml-1 sm:ml-2 cursor-pointer hover:scale-105 transition-all shrink-0">
                <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}