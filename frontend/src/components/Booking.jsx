import React from "react";
import { Reveal } from "./pretext";

export default function Booking() {
  return (
    <section className="py-24 px-6">
      <div className="bg-gradient-to-b from-[#edb891] to-[#ebccc5] rounded-[40px] p-10 md:p-20 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden text-black">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[--color-brand] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-pulse delay-1000" />
        
        <Reveal animation="fade-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Ready for Paradise?</h2>
          <p className="text-xl opacity-80 mb-12 relative z-10 max-w-2xl mx-auto">Book direct with us for exclusive perks, complimentary spa credits, and flexible cancellations.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center bg-white p-4 rounded-2xl md:rounded-full shadow-2xl relative z-10 text-black max-w-4xl mx-auto">
            <div className="flex-1 flex flex-col justify-center px-4 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Check In</label>
              <input type="date" className="outline-none bg-transparent w-full text-lg cursor-pointer" />
            </div>
            <div className="w-full md:w-px bg-gray-200 my-2 md:my-0" />
            <div className="flex-1 flex flex-col justify-center px-4 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Check Out</label>
              <input type="date" className="outline-none bg-transparent w-full text-lg cursor-pointer" />
            </div>
            <div className="w-full md:w-px bg-gray-200 my-2 md:my-0" />
            <div className="flex-1 flex flex-col justify-center px-4 hover:bg-gray-100 rounded-full transition cursor-pointer">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Guests</label>
              <select className="outline-none bg-transparent w-full text-lg cursor-pointer font-medium appearance-none">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6+ Guests</option>
              </select>
            </div>
            <button className="bg-[--color-brand] text-white px-10 py-4 md:py-0 rounded-full font-bold text-lg hover:bg-[--color-primary] hover:shadow-[0_0_30px_rgba(224,11,65,0.5)] transition-all h-full min-h-[64px]">
              Search
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}