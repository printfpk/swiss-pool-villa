const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

const components = {
  "Navbar.jsx": `import React, { useState, useEffect } from "react";
import { Search, Globe, Menu, User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={\`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex justify-between items-center \${isScrolled ? 'bg-white shadow-md text-[--color-text-main]' : 'bg-transparent text-white'}\`}>
      <div className={\`font-bold text-2xl tracking-tighter cursor-pointer flex gap-2 items-center \${isScrolled ? 'text-[--color-brand]' : 'text-white'}\`}>
        <Globe /> AirbnbLuxury
      </div>
      
      <div className={\`hidden md:flex items-center shadow-sm rounded-full border p-2 transition \${isScrolled ? 'border-gray-200 bg-white' : 'border-white/30 bg-white/10 backdrop-blur-md'}\`}>
        <button className="px-4 text-sm font-medium border-r border-inherit">Anywhere</button>
        <button className="px-4 text-sm font-medium border-r border-inherit">Any week</button>
        <button className="px-4 text-sm font-normal opacity-80">Add guests</button>
        <div className="bg-[--color-brand] text-white p-2 rounded-full h-8 w-8 flex items-center justify-center ml-2 cursor-pointer hover:bg-[--color-primary] transition">
          <Search size={14} />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        <button className="hidden sm:block hover:bg-black/5 px-4 py-2 rounded-full transition-colors">Airbnb your home</button>
        <div className={\`flex items-center gap-3 p-2 rounded-full cursor-pointer transition border \${isScrolled ? 'border-gray-200 hover:shadow-md' : 'border-white/30 hover:bg-white/10'}\`}>
            <Menu size={16} />
            <div className="bg-gray-500 text-white rounded-full p-1">
              <User size={16} />
            </div>
        </div>
      </div>
    </header>
  );
}`,

  "Hero.jsx": `import React from "react";
import { Fade, Slide } from "./pretext";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80"
      >
        {/* Placeholder video - relying on poster if video doesn't load */}
        <source src="https://cdn.pixabay.com/video/2020/05/25/40140-424917540_large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative text-center text-white z-10 p-4 pt-20 max-w-4xl mx-auto">
        <Fade duration={1.2}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-xl leading-tight">Experience Luxury<br/>Beyond Imagination</h1>
        </Fade>
        <Slide direction="up" delay={0.3}>
          <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md">Discover the perfect harmony of nature, design, and ultimate comfort.</p>
        </Slide>
        <Slide direction="up" delay={0.5}>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[--color-brand] text-white px-8 py-4 rounded-[8px] font-semibold text-lg hover:bg-[--color-primary] hover:scale-105 transition-all shadow-xl">
              Book Now
            </button>
            <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-8 py-4 rounded-[8px] font-semibold text-lg hover:bg-white/30 transition-all shadow-xl">
              Explore Villas
            </button>
          </div>
        </Slide>
      </div>
    </section>
  );
}`,

  "About.jsx": `import React from "react";
import { Reveal, Fade, Slide } from "./pretext";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 w-full relative">
        <Reveal animation="fade-up" duration={1}>
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" alt="Luxury Resort Pool" className="w-full h-full object-cover hover:scale-105 transition duration-1000" />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
            <p className="text-4xl font-bold text-[--color-brand]">15+</p>
            <p className="text-[--color-text-muted] font-medium">Years of Excellence</p>
          </div>
        </Reveal>
      </div>
      
      <div className="flex-1 w-full space-y-6">
        <Fade>
          <h4 className="text-[--color-brand] font-semibold tracking-wider uppercase text-sm">Our Story</h4>
        </Fade>
        <Slide direction="up" delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">A Sanctuary for the Senses</h2>
        </Slide>
        <Slide direction="up" delay={0.3}>
          <p className="text-lg text-[--color-text-muted] leading-relaxed">
            SwissPoolVilla was born from a vision to create an unparalleled retreat where modern architecture meets untouched natural beauty. Every detail of our resort has been meticulously crafted to provide an atmosphere of total serenity.
          </p>
        </Slide>
        <Slide direction="up" delay={0.4}>
          <p className="text-lg text-[--color-text-muted] leading-relaxed">
            Whether you are swimming in your private infinity pool or dining under the stars, our dedicated team ensures that your stay is nothing short of magical.
          </p>
        </Slide>
        <Slide direction="up" delay={0.5}>
          <button className="mt-4 border-b-2 border-[--color-brand] text-[--color-brand] font-bold pb-1 hover:text-[--color-primary] hover:border-[--color-primary] transition-colors">
            Read the full story
          </button>
        </Slide>
      </div>
    </section>
  );
}`,

  "Villas.jsx": `import React from "react";
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
}`,

  "Experiences.jsx": `import React from "react";
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
            <div key={i} className={\`relative rounded-2xl overflow-hidden h-[350px] group cursor-pointer \${exp.colSpan}\`}>
              <img src={exp.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={exp.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition duration-300" />
              <h3 className="absolute bottom-8 left-8 text-white text-3xl font-semibold drop-shadow-md">{exp.title}</h3>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}`,

  "Gallery.jsx": `import React from "react";
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
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-black text-white rounded-3xl my-10">
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
         <button className="px-8 py-3 border border-white text-white rounded-[8px] font-semibold hover:bg-white hover:text-black transition">
            View Full Gallery
         </button>
      </div>
    </section>
  );
}`,

  "Testimonials.jsx": `import React from "react";
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
                     <img src={\`https://i.pravatar.cc/100?img=\${i+10}\`} alt={rev.name} className="w-full h-full object-cover" />
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
}`,

  "Location.jsx": `import React from "react";
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
}`,

  "Booking.jsx": `import React from "react";
import { Reveal } from "./pretext";

export default function Booking() {
  return (
    <section className="py-24 px-6">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-10 md:p-20 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden text-white">
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
}`,

  "Footer.jsx": `import React from "react";
import { Reveal } from "./pretext";
import { Globe, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[--color-border] text-[--color-text-main] pt-16 pb-8 px-10">
       <Reveal>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="font-bold text-2xl tracking-tighter flex gap-2 items-center text-[--color-brand]">
              <Globe /> AirbnbLuxury
            </div>
            <p className="text-[--color-text-muted]">Redefining luxury travel with unparalleled experiences and sustainable practices.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-[--color-text-muted]">
              <li><a href="#" className="hover:text-[--color-text-main] transition">Help Center</a></li>
              <li><a href="#" className="hover:text-[--color-text-main] transition">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-[--color-text-main] transition">COVID-19 Response</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-4 text-[--color-text-muted]">
              <li><a href="#" className="hover:text-[--color-text-main] transition">About Us</a></li>
              <li><a href="#" className="hover:text-[--color-text-main] transition">Careers</a></li>
              <li><a href="#" className="hover:text-[--color-text-main] transition">Investors</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Newsletter</h4>
            <p className="text-[--color-text-muted] mb-4">Subscribe for exclusive offers.</p>
            <div className="flex border rounded-lg overflow-hidden">
               <input type="email" placeholder="Email address" className="p-3 w-full outline-none" />
               <button className="bg-black text-white px-4 font-semibold">Join</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-[--color-border] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[--color-text-muted]">
          <div>© 2026 SwissPoolVilla, Inc. · Privacy · Terms · Sitemap</div>
          <div className="flex gap-6 items-center">
             <span className="flex items-center gap-1 font-semibold text-[--color-text-main] cursor-pointer hover:underline"><Globe size={16}/> English (US)</span>
             <span className="font-semibold text-[--color-text-main] cursor-pointer hover:underline">$ USD</span>
             <div className="flex gap-4 ml-4 text-[--color-text-main]">
                <Facebook size={20} className="cursor-pointer hover:text-[--color-brand] transition" />
                <Twitter size={20} className="cursor-pointer hover:text-[--color-brand] transition" />
                <Instagram size={20} className="cursor-pointer hover:text-[--color-brand] transition" />
             </div>
          </div>
        </div>
       </Reveal>
    </footer>
  );
}`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(componentsDir, filename), content);
}

const appContent = `import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Villas from "./components/Villas";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white text-[--color-text-main] font-sans selection:bg-[--color-brand] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Villas />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Location />
      <Booking />
      <Footer />
    </div>
  );
}`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'App.jsx'), appContent);

console.log("All components generated successfully!");