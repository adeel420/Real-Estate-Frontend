"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiMapPin, FiCheck } from "react-icons/fi";
import { fadeUp, staggerContainer, scaleIn } from "../../../lib/animations";
import cities from "../../../lib/cities";
import properties from "../../../lib/properties";
import agents from "../../../lib/agents";
import BrowsePropertyCard from "../../components/BrowsePropertyCard";
import AgentCard from "../../components/home/AgentCard";

export default function CityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const city = cities.find((c) => c.slug === slug);
  if (!city) notFound();

  const cityProperties = properties.filter((p) => p.city === city.name);
  const cityAgents     = agents.filter((a) => a.city === city.name);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <Image src={city.heroImg} alt={city.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C5E]/60 to-transparent" />

        {/* Back */}
        <Link href="/cities">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
          >
            <FiArrowLeft size={14} /> All Cities
          </motion.div>
        </Link>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-10 max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">{city.province}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              {city.name}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg mt-2 italic">{city.tagline}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100"
        >
          {city.highlights.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center text-center py-5 px-4">
              <p className="font-serif font-bold text-[#1A3C5E] text-2xl leading-none">{value}</p>
              <p className="text-gray-400 text-xs mt-1.5 tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 space-y-16">

        {/* About + Top Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* About */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-7"
          >
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">About</p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Living in {city.name}</h2>
            <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed">{city.description}</p>

            {/* Top areas */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Top Areas</p>
              <div className="flex flex-wrap gap-2">
                {city.topAreas.map((area) => (
                  <Link key={area} href={`/properties?city=${city.name}`}>
                    <motion.span
                      whileHover={{ scale: 1.04 }}
                      className="flex items-center gap-1.5 text-xs bg-[#F5F2ED] text-[#1A3C5E] font-semibold px-3 py-1.5 rounded-full border border-[#1A3C5E]/10 cursor-pointer hover:bg-[#1A3C5E] hover:text-white transition-colors duration-200"
                    >
                      <FiMapPin size={9} /> {area}
                    </motion.span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Why invest */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-[#1A3C5E] rounded-2xl p-7 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative z-10">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Why Invest</p>
              <h3 className="font-serif font-bold text-white text-xl mb-1">Why {city.name}?</h3>
              <div className="w-8 h-[3px] bg-[#C9A84C] rounded-full mb-5" />
              <div className="space-y-3">
                {[
                  "Strong capital appreciation",
                  "High rental demand",
                  "Modern infrastructure",
                  "Gated community options",
                  "Proximity to amenities",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={10} className="text-[#C9A84C]" />
                    </div>
                    {point}
                  </div>
                ))}
              </div>
              <Link href={`/properties`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Browse {city.name} Properties <FiArrowRight size={13} />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Properties */}
        {cityProperties.length > 0 && (
          <div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            >
              <motion.div variants={fadeUp}>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Listings</p>
                <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">
                  Properties in {city.name}
                </h2>
                <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link href="/properties">
                  <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 text-[#1A3C5E] font-semibold text-sm border border-[#1A3C5E]/20 px-5 py-2.5 rounded-full hover:bg-[#1A3C5E] hover:text-white transition-colors cursor-pointer">
                    View All <FiArrowRight size={13} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cityProperties.map((p) => (
                <BrowsePropertyCard key={p.id} property={p} />
              ))}
            </motion.div>
          </div>
        )}

        {/* Agents */}
        {cityAgents.length > 0 && (
          <div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            >
              <motion.div variants={fadeUp}>
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Local Experts</p>
                <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">
                  Agents in {city.name}
                </h2>
                <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link href="/agents">
                  <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 text-[#1A3C5E] font-semibold text-sm border border-[#1A3C5E]/20 px-5 py-2.5 rounded-full hover:bg-[#1A3C5E] hover:text-white transition-colors cursor-pointer">
                    All Agents <FiArrowRight size={13} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {cityAgents.map((a) => (
                <motion.div key={a.id} variants={scaleIn}>
                  <AgentCard agent={a} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Other Cities */}
        <div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-8"
          >
            <motion.div variants={fadeUp}>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Explore More</p>
              <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">Other Cities</h2>
              <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {cities.filter((c) => c.slug !== slug).map((c) => (
              <motion.div key={c.slug} variants={fadeUp}>
                <Link href={`/cities/${c.slug}`}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative rounded-2xl overflow-hidden h-36 cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <Image src={c.img} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white/60 text-[10px] mb-0.5">{c.count}+ Properties</p>
                      <p className="font-serif font-bold text-white text-base">{c.name}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
