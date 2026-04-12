import React, { useEffect, useRef } from 'react';

const ServicesHistory = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const fillHistory = () => {
      if (!containerRef.current) return;

      const lines = containerRef.current.querySelectorAll(".js-history-line");
      lines.forEach((line) => {
        const posStart = window.innerHeight / 2;
        const posEnd = posStart - line.offsetHeight;
        const currentPos = parseInt(line.getBoundingClientRect().top);
        let setY = 0;

        if (currentPos <= posStart && currentPos >= posEnd) {
          setY = 100 - ((currentPos - posEnd) * 100) / (posStart - posEnd);
        } else if (currentPos > posStart) {
          setY = 0;
        } else if (currentPos < posEnd) {
          setY = 100;
        }

        const fillElement = line.querySelector(".history-line__fill");
        if (fillElement) {
          fillElement.style.transform = `translateY(${setY}%)`;
        }
      });

      const boxes = containerRef.current.querySelectorAll(".js-fill-history");
      boxes.forEach((box) => {
        const posStart = window.innerHeight / 2;
        const posEnd = posStart - box.offsetHeight;
        const currentPos = parseInt(box.getBoundingClientRect().top);
        let setY = 0;

        if (currentPos <= posStart && currentPos >= posEnd) {
          setY = 100 - ((currentPos - posEnd) * 100) / (posStart - posEnd);
          box.classList.add("active-feature");
        } else if (currentPos > posStart) {
          setY = 0;
          box.classList.remove("active-feature");
        } else if (currentPos < posEnd) {
          setY = 100;
          box.classList.remove("active-feature");
        }

        const fillElement = box.querySelector(".history-box__fill");
        if (fillElement) {
          fillElement.style.transform = `translateY(${setY}%)`;
        }
      });
    };

    fillHistory();
    window.addEventListener("scroll", fillHistory, { passive: true });
    window.addEventListener("resize", fillHistory, { passive: true });

    return () => {
      window.removeEventListener("scroll", fillHistory);
      window.removeEventListener("resize", fillHistory);
    };
  }, []);

  const services = [
    {
      num: '01',
      title: 'Location & Space - J Junction, Sattahip, Line 332. Spacious Land Area of 85.5 sqw (342 sqm)',
      img: 'https://ik.imagekit.io/printf/swissvilla/unnamed.jpg?updatedAt=1775926072921',
      alt: 'Location & Space'
    },
    {
      num: '02',
      title: 'Rooms & Capacity - 3 Bedrooms and 3 Bathrooms, comfortably sleeping up to 12 people',
      img: 'https://ik.imagekit.io/printf/swissvilla/bedroom.jpg?updatedAt=1775926072895',
      alt: 'Rooms & Capacity'
    },
    {
      num: '03',
      title: 'Private Pool & Fun - 4×12 meters private swimming pool with a large slide 🛝 and a floating tray',
      img: 'https://ik.imagekit.io/printf/swissvilla/pool1.jpg?updatedAt=1775926072801',
      alt: 'Private Pool'
    },
    {
      num: '04',
      title: 'Entertainment & Kitchen - Fully equipped kitchen, grill & bake ♨️, Betel table, Sheep Karaoke, Netflix, and Fast Wifi',
      img: 'https://ik.imagekit.io/printf/swissvilla/unnamed%20(1).jpg?updatedAt=1775926072879',
      alt: 'Entertainment'
    },
    {
      num: '05',
      title: 'Parking & Free Amenities - Parking for 2+ cars, free towels, shower cream, 1kg grilling charcoal, and 10 kilos of ice',
      img: 'https://ik.imagekit.io/printf/swissvilla/prawn.jpg?updatedAt=1775926073004',
      alt: 'Amenities & Parking'
    }
  ];

  return (
    <div
      className="relative pt-10 pb-20 lg:pt-20 lg:pb-60 overflow-hidden -mt-2 lg:-mt-4 bg-gradient-features"
      ref={containerRef}
    >
      <div className="w-full px-4 mx-auto max-w-[123rem]">
        <div className="relative px-4 md:px-14 lg:px-[6.875rem]">
          <div className="relative text-3xl lg:text-5xl font-light leading-[1.3] mb-8 lg:mb-11 inline-block font-serif tracking-widest uppercase">
            Swiss Poolvilla  Features
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[--color-brand] opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M2.00016 6.94503C31.5432 2.37805 106.666 -2.48421 198.541 6.94503" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="relative flex flex-col">
            <div className="hidden lg:flex absolute flex-col bg-[url('../img/i-caret-down.svg')] bg-[size:100%_42px] bg-repeat-y bg-[position:center_-8px] top-12 -left-[6.875rem] bottom-12 w-6 text-2xl overflow-hidden js-history-line">
              <div className="absolute bg-white top-0 left-0 w-full h-full opacity-70 history-line__fill"></div>
            </div>

            {services.map((svc, index) => (
              <div key={index} className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-0 transition-opacity duration-500 group js-fill-history history-box overflow-hidden gap-4 lg:gap-6">
                <div className="relative w-full lg:w-48 mb-2 lg:mb-0 flex flex-row lg:flex-col items-center lg:items-start gap-2 lg:gap-0 z-0 shrink-0">
                  <div className="relative text-lg lg:text-[1.125rem] font-normal leading-[1.4] tracking-[.05em] font-sans text-gray-700 uppercase">Feature</div>
                  <div className="relative text-5xl lg:text-[4.375rem] font-light leading-none font-serif italic text-gray-900">{svc.num}</div>
                </div>
                <div className="relative w-full lg:flex-1 text-base lg:text-[1.125rem] font-normal leading-[1.6] tracking-wide z-10 font-sans text-gray-800">
                  <p>
                    {svc.title}
                  </p>
                </div>

                {/* Image placed naturally at the end for desktop */}
                <div className="relative w-full lg:w-[24rem] h-60 lg:h-72 shrink-0 rounded-[1.25rem] lg:scale-95 lg:opacity-0 transition-all duration-500 in-[.active-feature]:lg:scale-100 in-[.active-feature]:lg:opacity-100 overflow-hidden shadow-lg lg:shadow-xl z-20 history-box__img">
                  <picture>
                    <source srcSet={svc.img} media="(max-width: 767px)" />
                    <source srcSet={svc.img} media="(max-width: 992px)" />
                    <source srcSet={svc.img} />
                    <img
                      src={svc.img}
                      title="Ever Core"
                      alt={svc.alt}
                      className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    />
                  </picture>
                </div>

                <div className="absolute bg-white top-0 left-0 w-full h-full opacity-70 history-box__fill pointer-events-none z-10 hidden lg:block transition-opacity duration-500 in-[.active-feature]:opacity-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHistory;
