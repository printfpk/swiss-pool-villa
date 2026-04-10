import React from "react";
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
}