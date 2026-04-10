import React from "react";
import { Reveal, Stagger } from "./pretext";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    { name: "Sarah Jenkins", loc: "New York", text: "The most incredible vacation of my life. The attention to detail and service is unmatched anywhere else in the world." },
    { name: "David Chen", loc: "London", text: "Absolutely breathtaking. The cliffside villa offered views I will remember forever. A true 5-star experience." },
    { name: "Emma Rossi", loc: "Milan", text: "From the Michelin star dining to the relaxing spa, every moment felt curated just for us. Highly recommended." }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
       <Reveal>
          <div className="text-center justify-center flex flex-col items-center mb-16">
             <div className="flex gap-2 text-[--color-brand] mb-4">
                <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" /> <Star fill="currentColor" />
             </div>
             <h2 className="text-4xl md:text-5xl font-bold">Loved by Guests</h2>
          </div>
       </Reveal>

       <div className="grid md:grid-cols-3 gap-8">
          <Stagger>
             {reviews.map((rev, i) => (
               <div key={i} className="bg-[--color-surface] p-8 rounded-3xl shadow-sm hover:shadow-md transition">
                 <p className="text-lg text-[--color-text-main] mb-8 font-medium leading-relaxed">"{rev.text}"</p>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={rev.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-bold">{rev.name}</h4>
                     <p className="text-sm text-[--color-text-muted]">{rev.loc}</p>
                   </div>
                 </div>
               </div>
             ))}
          </Stagger>
       </div>
    </section>
  );
}