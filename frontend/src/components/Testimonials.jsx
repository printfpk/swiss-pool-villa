import React from "react";
import { Reveal } from "./pretext";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews1 = [
    { name: "not not", loc: "1 review · 7 photos", text: "ห้อง สะอาด ดีงาม ชอบมากคะ ห้องนอน กว้าง แอร์เย็นฉ่ำ ห้องหรูมาก สระน้ำดีมีอะไรให้เล่น อุปกรณ์เชฟดีมากคะ รีวิวแบบ 10/10/10 เลยคะ แต่เสียดาย ห้องจองแน่นมาก เลยจองได้ 1 คืน", rating: "5.0" },
    { name: "เอ้ ทาบัณฑิษฐ์", loc: "1 review · 5 photos", text: "บ้านพักสะอาดมีอุปกรณ์ให้ใช้สะดวกสบาย บ้านหลังใหญ่พื้นที่กว้างสไลเดอร์ใหญ่มาก 😊 ...", rating: "5.0" },
    { name: "Jürgen Schupp", loc: "Local Guide · 1,049 reviews", text: "Sehr schöne Poolvilla. Top Ausstattung und nur zum empfehlen. Pool mit Rutsche. Da bleibt kein Auge trocken.. Wem das nicht reicht kann bei einer Runde Poolbillard sein Glück versuchen. Das Haus lässt keine Wünsche offen. Sehr Herzige Vermieter.", rating: "5.0" },
    { name: "Zdenek Mazura", loc: "Local Guide · 68 reviews", text: "Schönes Haus mit Swimmingpool und Slider sowie große Küche. Drei Schlafzimmer mit je 2 Doppelbetten und 3 Badezimmer. Weiter gibt es einen Billardtisch und Karaoke. Zum schönen Strand Bang Saray Beach sind es 7 Minuten mit dem Auto. Markt und 7/11 sind in unmittelbarer Nähe. Kann auch Tageweise gemietet werden.", rating: "5.0" },
    { name: "tingsa Fc", loc: "Local Guide · 51 reviews", text: "บ้านพักดีบ้านกว้าง มีของใช้ในครัวครบหม้อกระทะหม้อไฟฟ้า เตาแกสไม่ต้องเตรียมของใช้มาเลย", rating: "5.0" },
    { name: "ดวงเดือน จูพะเนาว์", loc: "1 review · 2 photos", text: "ชอบบ้านมากคร่าา บรรยากาศ เหมือนอยู่เขาใหญ่เลย อากาศดีมาก สระน้ำก็ใหญ่มากค่ะ ไม่ผิดหวัง ให้ 5 ดาวเลย 😊 ...", rating: "5.0" },
    { name: "Auy Marisa", loc: "1 review · 10 photos", text: "สระน้ำกว้าง ที่พักสวย ทริปนี้สนุกมากๆค่ะ บ้านพักบริการดี เป็นกันเอง 💖💖", rating: "5.0" }
  ];

  const duplicatedReviews1 = [...reviews1, ...reviews1];
  const reviews2 = [...reviews1].reverse();
  const duplicatedReviews2 = [...reviews2, ...reviews2];

  return (
    <section id="testimonials" className="py-16 bg-black overflow-hidden relative border-t border-white/5">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-reverse {
             0% { transform: translateX(-50%); }
             100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 35s linear infinite;
          }
          .animate-marquee-reverse {
            animation: marquee-reverse 35s linear infinite;
          }
          .animate-marquee:hover, .animate-marquee-reverse:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <Reveal>
        <div className="text-center justify-center flex flex-col items-center mb-8 sm:mb-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Loved by Guests</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl">Read what our distinguished visitors have to say about their stay at Swiss Pool Villa.</p>
        </div>
      </Reveal>

      <div className="relative flex flex-col gap-6 w-full -rotate-1 md:-rotate-2 scale-[1.05]">
        {/* Track 1 */}
        <div className="flex w-max animate-marquee gap-4 sm:gap-6">
          {duplicatedReviews1.map((rev, i) => (
            <div key={`t1-${i}`} className="w-[240px] sm:w-[350px] md:w-[450px] h-[180px] sm:h-[220px] md:h-auto flex-shrink-0 bg-[#0c0c0c] border border-[--color-border] rounded-2xl p-4 sm:p-5 text-white text-left shadow-md hover:border-white/20 transition-colors overflow-hidden">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <img src={`https://i.pravatar.cc/100?img=${(i % 10) + 10}`} alt={rev.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">{rev.name}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{rev.loc}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2 text-[#F3C15F]">
                <span className="text-xs sm:text-sm font-bold text-gray-300 mr-2">{rev.rating}</span>
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                "{rev.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Track 2 */}
        <div className="flex w-max animate-marquee-reverse gap-4 sm:gap-6">
          {duplicatedReviews2.map((rev, i) => (
            <div key={`t2-${i}`} className="w-[240px] sm:w-[350px] md:w-[450px] h-[180px] sm:h-[220px] md:h-auto flex-shrink-0 bg-[#0c0c0c] border border-[--color-border] rounded-2xl p-4 sm:p-5 text-white text-left shadow-md hover:border-white/20 transition-colors overflow-hidden">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <img src={`https://i.pravatar.cc/100?img=${(i % 10) + 20}`} alt={rev.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">{rev.name}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{rev.loc}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2 text-[#F3C15F]">
                <span className="text-xs sm:text-sm font-bold text-gray-300 mr-2">{rev.rating}</span>
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                "{rev.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fades for edges */}
      <div className="absolute top-0 left-0 w-8 sm:w-16 md:w-48 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-8 sm:w-16 md:w-48 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}