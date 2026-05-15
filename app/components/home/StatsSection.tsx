"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { end: 1200, suffix: "+", label: "Properties Listed" },
  { end: 850, suffix: "M", prefix: "$", label: "Sales Volume" },
  { end: 120, suffix: "+", label: "Expert Agents" },
  { end: 40, suffix: "+", label: "Cities Covered" },
];

function Counter({ end, suffix, prefix }: { end: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref} className="stat-number">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <div className="bg-[#F5F2ED]">
      <section
        className="relative py-24 lg:py-32 bg-[#1A3C5E] overflow-hidden"
        style={{ clipPath: "polygon(0 6%, 100% 0%, 100% 94%, 0% 100%)" }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">By The Numbers</p>
            <h2 className="font-serif font-bold text-white text-4xl lg:text-5xl tracking-tight">
              Our Track Record
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <div className="font-serif font-black text-white text-5xl lg:text-6xl leading-none mb-2">
                  <Counter end={s.end} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="w-8 h-[2px] bg-[#C9A84C] rounded-full my-3" />
                <p className="text-white/60 text-sm tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
