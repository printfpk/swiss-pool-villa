import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import About from "./components/About";
import Showcase from "./components/Showcase";
import Villas from "./components/Villas";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white text-[--color-text-main] font-sans selection:bg-[--color-brand] selection:text-white cursor-none">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Showcase />
      <Villas />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Location />
      <Booking />
      <Footer />
    </div>
  );
}