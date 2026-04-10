import React from "react";
import { Reveal } from "./pretext";
import { MapPin, Navigation } from "lucide-react";

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
          <h3 className="text-3xl font-bold">Secluded yet accessible.</h3>
          <p className="text-lg text-[--color-text-muted] leading-relaxed">
            Located on the pristine southern peninsula, just 45 minutes from the International Airport. Complimentary luxury transfers provided.
          </p>
          <div className="pt-6">
            <button className="flex items-center gap-2 font-bold text-[--color-brand] hover:text-[--color-primary] transition">
              <Navigation size={18} /> Get Directions
            </button>
          </div>
        </div>

        <div className="w-full md:w-3/5 h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-200">
           {/* Map Image Placeholder for aesthetic */}
           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" alt="Map View" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
}