"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { fadeUp, staggerContainer, scaleIn } from "../../lib/animations";
import cities from "../../lib/cities";

const stats = [
  { value: "5",    label: "Major Cities"    },
  { value: "40+",  label: "Areas Covered"   },
  { value: "1.2K+",label: "Total Listings"  },
  { value: "PKR",  label: "Local Currency"  },
];

export default function CitiesPage() {
  const gridRef    = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1A3C5E] pt-20 pb-32 px-4 sm:px-6">
        <Image src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1600&q=80" alt="cities" fill className="object-cover opacity-10" priority />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">Explore Pakistan</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif font-bold text-white text-4xl lg:text-6xl tracking-tight leading-tight max-w-2xl">
              Properties Across <span className="text-[#C9A84C] italic">Pakistan</span>
            </motion.h1>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-4" />
            <motion.p variants={fadeUp} className="text-white/50 text-base mt-4 max-w-lg leading-relaxed">
              Browse premium real estate in Pakistan's most sought-after cities — from Lahore to Karachi, Islamabad to Peshawar.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-0 mt-10 w-fit bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col items-center px-7 py-4 ${i !== stats.length - 1 ? "border-r border-white/[0.1]" : ""}`}>
                  <span className="text-[#C9A84C] font-serif font-bold text-xl leading-none">{s.value}</span>
                  <span className="text-white/50 text-[11px] mt-1 tracking-wide">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Cities Grid ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        <motion.div variants={staggerContainer} initial="hidden" animate={gridInView ? "visible" : "hidden"} className="mb-10">
          <motion.div variants={fadeUp}>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">All Locations</p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">Browse by City</h2>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
          </motion.div>
        </motion.div>

        {/* Bento-style grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cities.map((city, i) => (
            <motion.div key={city.slug} variants={scaleIn} className={i === 0 ? "sm:col-span-2 lg:col-span-2 sm:row-span-1" : ""}>
              <Link href={`/cities/${city.slug}`}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-300 h-[320px]"
                >
                  <Image src={city.img} alt={city.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Province badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                      {city.province}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
                      <FiArrowRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/60 text-xs mb-1 flex items-center gap-1">
                          <FiMapPin size={9} /> {city.count}+ Properties
                        </p>
                        <h3 className="font-serif font-bold text-white text-2xl leading-tight">
                          {city.name}
                        </h3>
                        {i === 0 && <p className="text-white/50 text-sm mt-1 max-w-sm leading-relaxed line-clamp-2">{city.tagline}</p>}
                      </div>
                      {/* Avg price chip */}
                      <div className="bg-[#C9A84C] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex-shrink-0 ml-3">
                        Avg {city.avgPrice.replace("PKR ", "")}
                      </div>
                    </div>

                    {/* Top areas on all cards */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {city.topAreas.slice(0, i === 0 ? 3 : 2).map((area) => (
                        <span key={area} className="bg-white/10 backdrop-blur-sm text-white/80 text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why Pakistan CTA ── */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6" style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}>
        <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" alt="cta" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#1A3C5E]/88" />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold tracking-wide px-4 py-2 rounded-full">
                Invest in Pakistan
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-serif font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-5 max-w-3xl">
              Find Your City,<br /> Find Your <span className="italic text-[#C9A84C]">Home</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              Pakistan's real estate market is growing fast. Explore listings in your preferred city and secure your investment today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/properties">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="shimmer inline-flex items-center gap-2 bg-[#C9A84C] text-white font-bold text-sm px-8 py-4 rounded-full cursor-pointer">
                  Browse All Properties <FiArrowRight size={15} />
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#1A3C5E" }} transition={{ duration: 0.2 }} className="inline-flex items-center gap-2 border border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full cursor-pointer">
                  Talk to an Agent
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
