import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 1,
    img: 'https://ik.imagekit.io/printf/swissvilla/pool1.jpg',
    category: 'Leisure & Activities',
    title: 'Private Pool & Entertainment',
    text: 'Dive into relaxation with our exclusive private pool, perfect for both daytime fun and evening swims under the stars. Unwind in our luxurious outdoor living spaces.',
    features: [
      'Temperature-controlled Private Pool',
      'Poolside Loungers & Sunbeds',
      'BBQ Setup & Outdoor Dining',
      'Dedicated Kids Pool Area',
      'Evening Ambient & Underwater Lighting',
      'Outdoor Shower & Changing Facilities'
    ],
    footer: 'Experience the ultimate outdoor oasis designed for unforgettable memories.'
  },
  {
    id: 2,
    img: 'https://ik.imagekit.io/printf/swissvilla/bedroom.jpg',
    category: 'Accommodation',
    title: 'Luxury Bedrooms & Kitchen',
    text: 'Enjoy utmost comfort in our spacious, elegantly designed bedrooms and prepare delicious meals in the fully equipped modern kitchen. Every detail is crafted for your perfect stay.',
    features: [
      'Plush King Sized Beds with Premium Linens',
      'En-suite Bathrooms & Jacuzzi',
      'Fully Equipped Modular Kitchen & Appliances',
      'Spacious Living & Indoor Dining Area',
      'Smart TVs, Sound System & High-Speed Wi-Fi',
      'Climate Control Air Conditioning'
    ],
    footer: 'Your perfect home away from home with top-tier comfort and luxury amenities.'
  },
  {
    id: 3,
    img: 'https://ik.imagekit.io/printf/swissvilla/unnamed.jpg',
    category: 'Location & Surroundings',
    title: 'Prime Villa Location',
    text: 'Nestled in a serene and picturesque landscape, our villa offers the perfect escape from the city hustle while keeping you conveniently close to essential attractions and beautiful nature.',
    features: [
      'Breathtaking Hillside & Nature Views',
      'Close Proximity to Local Attractions',
      'Secure & Private Gated Property',
      'Ample Private Parking Space',
      'Peaceful, Noise-Free Environment',
      'Easy Access arrangements for Transport'
    ],
    footer: 'Discover the perfect blend of absolute tranquility and convenient access.'
  }
];

const AnimatedText = ({ text, className, speed = 0.04, delay = 0 }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      y: "0%",
      transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    },
    hidden: {
      y: "110%",
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: "hidden", display: "inline-flex", marginRight: "0.25em", paddingBottom: "0.1em" }}>
          <motion.span variants={child} style={{ display: "inline-block", transformOrigin: "bottom" }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

const About = () => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeModal]);

  const openModal = (index) => setActiveModal(index);
  const closeModal = () => setActiveModal(null);
  const nextModal = (e) => {
    if (e) e.stopPropagation();
    setActiveModal((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };
  const prevModal = (e) => {
    if (e) e.stopPropagation();
    setActiveModal((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  return (
    <div id="catalog" className="relative pt-16 pb-0 lg:pt-[5vw] lg:pb-0 bg-[#e2dedb]">
      <div className="container mx-auto max-w-[1440px] px-[1.5rem] lg:px-[6.875rem]">

        {/* Container background block */}
        <div className="relative bg-[#fffce3] p-[2.5rem] lg:p-[4.375vw] rounded-[1.25rem] lg:rounded-[1.04vw]">

          <div className="flex justify-between items-center mb-[2rem] lg:mb-[3.33vw]">
            <div className="text-[2.5rem] lg:text-[2.6vw] font-medium text-[#1c1b1d]">Amenities</div>
            <div>
              <svg viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" className="h-12 md:h-16 w-auto">
                <defs>
                  <linearGradient id="goldGradientAbout" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E8D8A8" />
                    <stop offset="50%" stopColor="#C9A646" />
                    <stop offset="100%" stopColor="#A8832F" />
                  </linearGradient>
                </defs>
                <g transform="translate(90,80)">
                  <circle cx="0" cy="0" r="40" stroke="url(#goldGradientAbout)" strokeWidth="1.5" fill="none" />
                  <path d="M-18 8 L0 -18 L18 8 Z" fill="none" stroke="url(#goldGradientAbout)" strokeWidth="1.5" />
                  <path d="M-24 16 Q0 26 24 16" stroke="url(#goldGradientAbout)" strokeWidth="1.5" fill="none" />
                </g>
                <line x1="145" y1="35" x2="145" y2="125" stroke="url(#goldGradientAbout)" strokeWidth="1" opacity="0.5" />
                <text x="165" y="85" fontFamily="Playfair Display, serif" fontSize="32" fill="url(#goldGradientAbout)" letterSpacing="5">SWISS</text>
                <text x="165" y="115" fontFamily="Montserrat, sans-serif" fontSize="13" fill="#222222" letterSpacing="7">POOL VILLA</text>
                <line x1="165" y1="125" x2="420" y2="125" stroke="url(#goldGradientAbout)" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.1875rem]">
            {services.map((service, index) => (
              <a
                key={service.id}
                onClick={() => openModal(index)}
                className="group relative text-[#fffce3] rounded-[1.25rem] block cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-[55vw] lg:h-[28vw] transition-[height] duration-500 group-hover:h-full after:content-[''] after:absolute after:inset-0 after:border-[2px] after:border-[#2b9705] after:rounded-[1.25rem] after:shadow-[0_0_1rem_0_#2b9705] after:pointer-events-none after:opacity-0 group-focus-visible:after:opacity-100">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#78797e] rounded-[1.25rem] overflow-hidden will-change-transform">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="absolute top-0 left-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col justify-end h-[55vw] lg:h-[28vw] p-[1.875rem]">
                  <div className="relative text-[1rem] font-medium leading-[1.4] tracking-[.01rem] mb-[.75rem]">{service.category}</div>
                  <div className="relative text-[1.875rem] font-medium leading-[1.3]">{service.title}</div>
                </div>

                <div className="relative py-[2.1875rem] pt-[1.5rem] transition-[padding] duration-500 group-hover:px-[1.875rem]">
                  <div className="relative group-hover:bg-[#1c1b1d] group-hover:text-[#fffce3] group-hover:border-[#1c1b1d] bg-[#e2dedb] text-[#1c1b1d] border border-[#1c1b1d] w-full flex items-center justify-center p-[1rem] rounded-full transition-all duration-500 pointer-events-none font-medium">
                    <span className="transition-transform duration-500">more details</span>
                    <ArrowUpRight className="absolute right-5 w-5 h-5 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* Modal */}
        <AnimatePresence>
          {activeModal !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100]"
            >
              <div className={`fixed top-[.375rem] bottom-[.375rem] flex flex-col p-[2.5rem_.75rem_2.5rem_7.5rem] transition-all duration-500 z-[101] pointer-events-auto opacity-100 left-1/2 md:left-[12.5vw] w-[95vw] md:w-[41.6667vw] -translate-x-1/2 md:translate-x-0 before:absolute before:bg-white before:top-0 before:left-0 before:w-full before:h-full before:rounded-[.625rem] before:-z-10`}>

                <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-3 justify-center items-center bg-white p-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-4 border-white z-[110]">
                  <div onClick={prevModal} className="relative bg-gradient-to-br from-[#eeb992] to-[#e6a87c] flex items-center justify-center w-[2.75rem] h-[2.75rem] text-white text-[1.5rem] rounded-full shadow-md transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-lg">
                    <ChevronLeft size={24} />
                  </div>
                  <div onClick={nextModal} className="relative bg-gradient-to-br from-[#eeb992] to-[#e6a87c] flex items-center justify-center w-[2.75rem] h-[2.75rem] text-white text-[1.5rem] rounded-full shadow-md transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-lg">
                    <ChevronRight size={24} />
                  </div>
                </div>

                <div onClick={closeModal} className="absolute bg-gradient-to-br from-[#eeb992] to-[#e6a87c] flex items-center justify-center top-[2.5rem] right-[2.5rem] w-[2.5rem] h-[2.5rem] text-white text-[1.5rem] rounded-full shadow-md transition-all duration-500 cursor-pointer z-50 hover:scale-105 hover:shadow-lg">
                  <X size={20} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeModal}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col max-w-[27.5rem] height-full pr-[2.5rem] overflow-y-auto z-10 text-[#1c1b1d]"
                  >
                    <AnimatedText text={services[activeModal].category} className="text-[1rem] font-medium leading-[1.4] tracking-[.01rem] mb-[.75rem] text-gray-500" delay={0.1} />
                    <AnimatedText text={services[activeModal].title} className="relative text-[1.875rem] font-medium leading-[1.3] mb-[2rem]" delay={0.2} />

                    <div className="text-[1.125rem] font-medium leading-[1.4] tracking-[.01rem] mb-[2.5rem]">
                      <div className="mb-[1rem]">
                        <AnimatedText text={services[activeModal].text} speed={0.02} delay={0.3} />
                      </div>
                      <ul className="pl-[1.25rem] mb-[1rem] list-disc marker:text-[#2b9705]">
                        {services[activeModal].features.map((feat, i) => (
                          <li key={i} className="mb-[.5rem]">
                            <AnimatedText text={feat} speed={0.02} delay={0.4 + i * 0.1} />
                          </li>
                        ))}
                      </ul>
                      <div className="mt-[1rem]">
                        <AnimatedText text={services[activeModal].footer} speed={0.02} delay={0.5 + services[activeModal].features.length * 0.1} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Modal background image */}
                <div className="absolute top-[.375rem] bottom-[.375rem] right-[.375rem] w-[45vw] md:w-[41.6667vw] translate-x-full rounded-[.625rem] overflow-hidden -z-10 shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`img-${activeModal}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      src={services[activeModal].img}
                      alt={services[activeModal].title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>
                </div>

              </div>

              {/* Dim overlay */}
              <div onClick={closeModal} className="fixed inset-0 bg-[#1c1b1d]/80 z-[-1] cursor-pointer"></div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default About;
