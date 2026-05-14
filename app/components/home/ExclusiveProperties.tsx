"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiChevronLeft, FiChevronRight, FiArrowRight, FiPlay } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import Badge from "../ui/Badge";
import { fadeUp, staggerContainer, slideInLeft } from "../../../lib/animations";

const rightImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80",
];

export default function ExclusiveProperties() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [imgIdx, setImgIdx] = useState(0);

  const prev = () => setImgIdx((i) => (i - 1 + rightImages.length) % rightImages.length);
  const next = () => setImgIdx((i) => (i + 1) % rightImages.length);

  return (
    <section ref={ref} className="py-16 bg-[#1A3C5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-10"
        >
          <motion.p variants={fadeUp} className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Hand-Picked
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif font-bold text-white text-4xl lg:text-5xl tracking-tight">
            Exclusive Properties
          </motion.h2>
          <motion.div variants={fadeUp} className="w-14 h-[3px] bg-[#C9A84C] rounded-full mx-auto mt-3" />
          <motion.p variants={fadeUp} className="text-white/50 text-sm mt-3 max-w-md mx-auto">
            Curated luxury listings you won't find anywhere else
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-auto lg:h-[560px]">

          {/* ── Left: large feature card ── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="relative rounded-2xl overflow-hidden group cursor-pointer h-[400px] lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
              alt="Exclusive property"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <Badge className="bg-[#1a5c5c] text-white text-[10px] font-bold tracking-wide">FOR SALE</Badge>
              <Badge className="bg-[#C9A84C] text-white text-[10px] font-bold tracking-wide">FEATURED</Badge>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <h3 className="font-serif font-bold text-white text-2xl leading-tight mb-1">
                Willow Creek Estate
              </h3>
              <div className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
                <FiMapPin size={11} />
                <span>88 Willow Creek Blvd, Beverly Hills</span>
              </div>
              <p className="text-white font-extrabold text-xl mb-3">$3,200,000</p>
              <div className="flex items-center gap-5 text-white/70 text-xs border-t border-white/10 pt-3">
                <span className="flex items-center gap-1.5"><IoBedOutline size={13} /> 5 Beds</span>
                <span className="flex items-center gap-1.5"><IoWaterOutline size={13} /> 4 Baths</span>
                <span className="flex items-center gap-1.5"><BiArea size={13} /> 6,200 sqft</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: 2×2 sub-grid ── */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[400px] lg:h-full">

            {/* Top-left — carousel card */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={rightImages[imgIdx]}
                alt="interior"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Arrows */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer z-10"
              >
                <FiChevronLeft size={14} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer z-10"
              >
                <FiChevronRight size={14} />
              </button>
            </motion.div>

            {/* Top-right — lifestyle photo */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                alt="interior lifestyle"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>

            {/* Bottom-left — video play overlay */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                alt="property tour"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center"
                >
                  <FiPlay size={16} className="text-white ml-0.5" />
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom-right — accent stat card */}
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden bg-[#C9A84C] p-5 flex flex-col justify-between cursor-pointer"
            >
              {/* Subtle dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "18px 18px" }}
              />
              <div className="relative z-10">
                <p className="font-serif font-black text-[#0D0D0D] text-4xl leading-none">280+</p>
                <p className="font-bold text-[#0D0D0D] text-base mt-1">Properties</p>
                <p className="text-[#0D0D0D]/60 text-xs mt-2 leading-relaxed">
                  Exclusive listings across premium locations worldwide
                </p>
              </div>
              <div className="relative z-10 flex justify-end">
                <motion.div
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-9 h-9 rounded-full bg-[#0D0D0D] flex items-center justify-center cursor-pointer"
                >
                  <FiArrowRight size={15} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
