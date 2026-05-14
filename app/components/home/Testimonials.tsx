import { FiStar } from "react-icons/fi";

const testimonials = [
  { name: "Sarah Mitchell",  city: "New York",    quote: "LuxEstate made finding our dream home effortless. The team was professional and attentive throughout the entire process.", stars: 5 },
  { name: "James Thornton",  city: "Los Angeles", quote: "Incredible service. They found us a property that ticked every box — location, price, and quality. Highly recommend.", stars: 5 },
  { name: "Priya Sharma",    city: "Chicago",     quote: "From search to closing, everything was seamless. Our agent went above and beyond to ensure we were happy.", stars: 5 },
  { name: "Carlos Rivera",   city: "Miami",       quote: "The best real estate experience I've ever had. Fast, transparent, and genuinely caring about the client.", stars: 5 },
  { name: "Emily Chen",      city: "Seattle",     quote: "We sold our home in under two weeks at above asking price. The marketing strategy was brilliant.", stars: 5 },
  { name: "David Okafor",    city: "Houston",     quote: "Professional, knowledgeable, and always available. LuxEstate exceeded every expectation we had.", stars: 5 },
];

const doubled = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F2ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center">
        <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Client Stories</p>
        <h2 className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight">
          What Our Clients Say
        </h2>
        <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mx-auto mt-3" />
      </div>

      {/* Infinite scroll track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll gap-5 w-max">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-[320px] flex-shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <FiStar key={s} size={13} className="fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A3C5E] to-[#C9A84C] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-[#0D0D0D] text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
