"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import Button from "../ui/Button";

const stats = [
  { value: "1,200+", label: "Listings" },
  { value: "98%",    label: "Satisfaction" },
  { value: "15 Yrs", label: "Experience" },
  { value: "40+",    label: "Cities" },
];

const types    = ["Any Type", "Apartment", "Villa", "Commercial", "Land"];
const budgets  = ["Any Budget", "< $100K", "$100K–$300K", "$300K–$600K", "$600K+"];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [location, setLocation] = useState("");

  const bgX = useTransform(useSpring(mouseX, { stiffness: 40, damping: 30 }), [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(useSpring(mouseY, { stiffness: 40, damping: 30 }), [-1, 1], ["-2%", "2%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    mouseX.set(((e.clientX - left) / width - 0.5) * 2);
    mouseY.set(((e.clientY - top)  / height - 0.5) * 2);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen -mt-[72px] overflow-hidden grain"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-[-4%]" style={{ x: bgX, y: bgY }}>
        <Image src="/hero.png" alt="hero" fill className="object-cover object-center" priority />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e30]/92 via-[#0a1e30]/70 to-[#0a1e30]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e30]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-[72px]">
        <div className="flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-[640px] w-full"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
                Premium Real Estate
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-white font-bold leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              Find Your <span className="text-[#C9A84C]">Dream</span><br />
              Property Today
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed mb-8 max-w-[440px]">
              Discover curated luxury homes, apartments, and commercial spaces — from as low as $10/day.
            </motion.p>

            {/* Search bar */}
            <motion.div
              variants={fadeUp}
              className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-3 mb-8 max-w-[580px]"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Location */}
                <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.1] rounded-xl px-4 py-3 flex-1 focus-within:border-[#C9A84C]/60 transition-colors">
                  <FiMapPin className="text-[#C9A84C] flex-shrink-0" size={15} />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, neighborhood…"
                    className="bg-transparent text-white text-sm placeholder:text-white/40 outline-none w-full"
                  />
                </div>
                {/* Type */}
                <select className="bg-white/[0.08] border border-white/[0.1] rounded-xl px-4 py-3 text-white/60 text-sm outline-none cursor-pointer w-full sm:w-[140px] focus:border-[#C9A84C]/60 transition-colors">
                  {types.map((t) => <option key={t} className="text-gray-900 bg-white">{t}</option>)}
                </select>
                {/* Budget */}
                <select className="bg-white/[0.08] border border-white/[0.1] rounded-xl px-4 py-3 text-white/60 text-sm outline-none cursor-pointer w-full sm:w-[150px] focus:border-[#C9A84C]/60 transition-colors">
                  {budgets.map((b) => <option key={b} className="text-gray-900 bg-white">{b}</option>)}
                </select>
                {/* Search btn */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors duration-200 flex-shrink-0 cursor-pointer"
                >
                  <FiSearch size={15} />
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <Button variant="accent">Browse Listings</Button>
              <Button variant="ghost">Watch Tour →</Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 mt-4 sm:px-6 w-full pb-10"
        >
          <div className="flex items-center gap-0 w-fit bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-8 py-4 ${i !== stats.length - 1 ? "border-r border-white/[0.1]" : ""}`}
              >
                <span className="text-[#C9A84C] font-serif font-bold text-xl leading-none">{s.value}</span>
                <span className="text-white/50 text-[11px] mt-1 tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
