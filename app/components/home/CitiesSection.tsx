"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, staggerContainer, slideInLeft } from "../../../lib/animations";

const cities = [
  { name: "New York", count: 8, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80", large: true },
  { name: "Chicago", count: 2, img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80" },
  { name: "Los Angeles", count: 1, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80" },
  { name: "San Diego", count: 5, img: "https://images.unsplash.com/photo-1538964173425-93884d739596?w=600&q=80" },
  { name: "Florida", count: 3, img: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=600&q=80" },
];

export default function CitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [large, ...small] = cities;

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header row */}
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
            <p className="text-gray-400 text-sm mt-3">Discover listings across the most sought-after locations</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 text-[#0D0D0D] text-sm font-semibold hover:text-[#C9A84C] transition-colors duration-200"
            >
              View All Cities
              <FiArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-auto lg:h-[500px]">

          {/* Large left card */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="relative rounded-2xl overflow-hidden group cursor-pointer lg:row-span-2 h-[300px] lg:h-[550px]"
          >
            <Image
              src={large.img}
              alt={large.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-300" />
            <div className="absolute bottom-5 left-5 z-10">
              <p className="text-white/70 text-sm mb-1">{large.count} Properties</p>
              <h3 className="font-serif font-bold text-white text-3xl">{large.name}</h3>
            </div>
          </motion.div>

          {/* 2×2 right grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 h-[400px] lg:h-[550px]">
            {small.map((city, i) => (
              <motion.div
                key={city.name}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={city.img}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent group-hover:from-black/75 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-white/70 text-xs mb-0.5">
                    {city.count} {city.count === 1 ? "Property" : "Properties"}
                  </p>
                  <h3 className="font-serif font-bold text-white text-xl">{city.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
