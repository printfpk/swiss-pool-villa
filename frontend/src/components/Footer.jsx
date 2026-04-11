import React from "react";
import { Reveal } from "./pretext";
import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[--color-border] text-[--color-text-main] pt-16 pb-8 px-10">
      <Reveal>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="font-bold text-2xl tracking-tighter flex gap-2 items-center text-[--color-brand]">
              <Globe /> Swisspoolvilla
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
            <span className="flex items-center gap-1 font-semibold text-[--color-text-main] cursor-pointer hover:underline"><Globe size={16} /> English (US)</span>
            <span className="font-semibold text-[--color-text-main] cursor-pointer hover:underline">$ USD</span>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}