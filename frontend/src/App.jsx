import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import About from "./components/About";
import ServicesHistory from "./components/ServicesHistory";
import PlayReel from "./components/PlayReel";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white text-[--color-text-main] font-sans selection:bg-[--color-brand] selection:text-white cursor-none">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <ServicesHistory />
      <PlayReel />
      <Testimonials />
      <Location />
      <Footer />
    </div>
  );
}