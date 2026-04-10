export default function ListingCard({ item }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-[20px]">
        <img src={item.image} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
        <button className="absolute top-3 right-3 text-white hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgba(0,0,0,0.3)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>
      <div className="flex flex-col text-[15px] leading-snug">
        <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[--color-text-main] truncate">{item.title}</h3>
            <div className="flex items-center gap-1 text-[14px]">
                <span></span> 4.98
            </div>
        </div>
        <p className="text-[--color-text-muted] text-[14px] mt-1 line-clamp-1">{item.description}</p>
        <div className="mt-2 font-medium">
            <span className="font-bold">{item.price}</span>
        </div>
      </div>
    </div>
  );
}
