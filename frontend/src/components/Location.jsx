import React from "react";
import { Reveal } from "./pretext";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <Reveal>
         <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Discover Paradise</h2>
      </Reveal>
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
            <a href="https://maps.app.goo.gl/tafRTisbF6cCBQfZ7?g_st=aw" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-bold text-[--color-brand] hover:text-[--color-primary] transition">
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
  );
}