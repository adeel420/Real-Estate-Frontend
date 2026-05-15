"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, staggerContainer, slideInLeft } from "../../../lib/animations";
import cities from "../../../lib/cities";

export default function CitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [large, ...small] = cities;

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Explore</p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight leading-tight">
              Find Properties in<br className="hidden sm:block" /> These Cities
            </h2>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
            <p className="text-gray-400 text-sm mt-3">Discover listings across Pakistan's most sought-after locations</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link href="/cities" className="group inline-flex items-center gap-2 text-[#0D0D0D] text-sm font-semibold hover:text-[#C9A84C] transition-colors duration-200">
              View All Cities
              <FiArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-auto lg:h-[500px]">

          {/* Large left card */}
          <Link href={`/cities/${large.slug}`} className="lg:row-span-2">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={slideInLeft}
              className="relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] lg:h-[550px]"
            >
              <Image src={large.img} alt={large.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-300" />
              <div className="absolute bottom-5 left-5 z-10">
                <p className="text-white/70 text-sm mb-1">{large.count}+ Properties</p>
                <h3 className="font-serif font-bold text-white text-3xl">{large.name}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold mt-1 tracking-wide uppercase">{large.province}</p>
              </div>
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
                  <FiArrowRight size={14} className="text-white" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* 2×2 right grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 h-[400px] lg:h-[550px]">
            {small.map((city, i) => (
              <Link key={city.slug} href={`/cities/${city.slug}`}>
                <motion.div
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
                >
                  <Image src={city.img} alt={city.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent group-hover:from-black/75 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <p className="text-white/70 text-xs mb-0.5">{city.count}+ {city.count === 1 ? "Property" : "Properties"}</p>
                    <h3 className="font-serif font-bold text-white text-xl">{city.name}</h3>
                    <p className="text-[#C9A84C] text-[10px] font-semibold mt-0.5 tracking-wide uppercase">{city.province}</p>
                  </div>
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center">
                      <FiArrowRight size={12} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
