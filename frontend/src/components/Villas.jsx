import React from "react";
import { Reveal, Stagger } from "./pretext";

export default function Villas() {
  const villas = [
    { title: "Oceanfront Villa", desc: "Private pool & butler service", price: "$850", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80" },
    { title: "Cliffside Pavilion", desc: "Panoramic breathtaking views", price: "$1,200", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
    { title: "Jungle Sanctuary", desc: "Immersed in tropical nature", price: "$650", img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80" }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-gray-50/50 rounded-3xl">
      <Reveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Accommodations</h2>
          <p className="text-lg text-[--color-text-muted] max-w-2xl mx-auto">Wake up to the sound of waves, surrounded by breathtaking architecture and nature.</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Stagger delay={0.2}>
          {villas.map((villa, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white">
              <div className="h-[400px] overflow-hidden">
                 <img src={villa.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={villa.title} />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold text-[--color-text-main]">{villa.title}</h3>
                  <span className="font-bold text-lg">{villa.price}<span className="text-sm font-normal text-[--color-text-muted]">/nt</span></span>
                </div>
                <p className="text-[--color-text-muted]">{villa.desc}</p>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}