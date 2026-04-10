import React from "react";
import { Reveal, Stagger } from "./pretext";

export default function Experiences() {
  const experiences = [
    { title: "Michelin-Star Dining", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80", colSpan: "md:col-span-2" },
    { title: "Holistic Spa", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", colSpan: "md:col-span-1" },
    { title: "Private Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", colSpan: "md:col-span-1" },
    { title: "Yacht Charters", img: "https://images.unsplash.com/photo-1569263979104-865037130c00?w=800&q=80", colSpan: "md:col-span-2" }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Curated Experiences</h2>
            <p className="text-lg text-[--color-text-muted]">Indulge in world-class amenities designed for your pleasure.</p>
          </div>
          <button className="hidden md:block mt-6 px-6 py-3 border border-[--color-text-main] rounded-[8px] font-semibold hover:bg-gray-100 transition">
            View All Activities
          </button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stagger delay={0.2}>
          {experiences.map((exp, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden h-[350px] group cursor-pointer ${exp.colSpan}`}>
              <img src={exp.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={exp.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition duration-300" />
              <h3 className="absolute bottom-8 left-8 text-white text-3xl font-semibold drop-shadow-md">{exp.title}</h3>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}