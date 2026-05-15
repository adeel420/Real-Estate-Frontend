"use client";
import { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiSearch, FiSliders } from "react-icons/fi";
import { staggerContainer, fadeUp } from "../../lib/animations";
import properties from "../../lib/properties";
import BrowsePropertyCard from "../components/BrowsePropertyCard";

export default function BrowsePropertiesPage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [beds, setBeds] = useState("");
  const [area, setArea] = useState("");
  const [listingType, setListingType] = useState("");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...properties];
    if (city) result = result.filter((p) => p.city === city);
    if (listingType) result = result.filter((p) => p.type === listingType);
    if (beds) {
      result = result.filter((p) =>
        beds === "4+" ? (p.beds ?? 0) >= 4 : p.beds === parseInt(beds)
      );
    }
    if (priceRange) {
      result = result.filter((p) => {
        if (priceRange === "under50") return p.priceRaw < 5000000;
        if (priceRange === "50to1cr") return p.priceRaw >= 5000000 && p.priceRaw <= 10000000;
        if (priceRange === "1to3cr") return p.priceRaw > 10000000 && p.priceRaw <= 30000000;
        if (priceRange === "3cr+") return p.priceRaw > 30000000;
        return true;
      });
    }
    if (area) {
      result = result.filter((p) => {
        if (area === "under500") return p.area < 500;
        if (area === "500to1500") return p.area >= 500 && p.area <= 1500;
        if (area === "1500to3000") return p.area > 1500 && p.area <= 3000;
        if (area === "3000+") return p.area > 3000;
        return true;
      });
    }
    if (sort === "priceLow") result.sort((a, b) => a.priceRaw - b.priceRaw);
    else if (sort === "priceHigh") result.sort((a, b) => b.priceRaw - a.priceRaw);
    return result;
  }, [city, listingType, beds, priceRange, area, sort]);

  const selectDark = "filter-select bg-white/[0.08] border border-white/[0.12] rounded-xl pl-3 pr-8 py-2.5 text-white/80 text-sm outline-none cursor-pointer focus:border-[#C9A84C]/60 transition-colors w-full appearance-none";

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero Header ── */}
      <section className="bg-[#1A3C5E] pt-16 pb-32 px-4  sm:px-6">
        <div className="max-w-7xl mx-auto ">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-2">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase">
                Pakistan&apos;s Finest
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-serif font-bold text-white text-4xl lg:text-5xl tracking-tight leading-tight"
            >
              Browse <span className="text-[#C9A84C]">Properties</span>
            </motion.h1>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
            <motion.p variants={fadeUp} className="text-white/50 text-sm mt-3 max-w-md">
              Explore curated listings across Lahore, Karachi, Islamabad and beyond
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-2 z-40 -mt-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1A3C5E]/70 backdrop-blur-sm border border-white/[0.12] rounded-2xl p-4 flex flex-wrap gap-3 items-end shadow-2xl"
          >
            {/* City */}
            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">City</label>
              <select className={selectDark} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">All Cities</option>
                {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Peshawar"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">Price</label>
              <select className={selectDark} value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">Any Price</option>
                <option value="under50">Under 50 Lac</option>
                <option value="50to1cr">50L – 1 Crore</option>
                <option value="1to3cr">1 – 3 Crore</option>
                <option value="3cr+">3 Crore+</option>
              </select>
            </div>

            {/* Beds */}
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">Beds</label>
              <select className={selectDark} value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option value="">Any</option>
                {["1", "2", "3"].map((n) => (
                  <option key={n} value={n}>{n} Bed{n !== "1" ? "s" : ""}</option>
                ))}
                <option value="4+">4+ Beds</option>
              </select>
            </div>

            {/* Area */}
            <div className="flex flex-col gap-1 flex-1 min-w-[100px]">
              <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">Area</label>
              <select className={selectDark} value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">Any Size</option>
                <option value="under500">Under 500</option>
                <option value="500to1500">500–1500</option>
                <option value="1500to3000">1500–3000</option>
                <option value="3000+">3000+</option>
              </select>
            </div>

            {/* Listing */}
            <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
              <label className="text-[#C9A84C] text-[10px] font-semibold tracking-[0.15em] uppercase">Listing</label>
              <select className={selectDark} value={listingType} onChange={(e) => setListingType(e.target.value)}>
                <option value="">Sale &amp; Rent</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>

            {/* Reset */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setCity(""); setPriceRange(""); setBeds(""); setArea(""); setListingType(""); }}
              className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors duration-200 flex-shrink-0 self-end cursor-pointer whitespace-nowrap"
            >
              Reset
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── Results ── */}
      <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Results Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              <FiSliders className="inline mr-1.5" size={11} />
              Search Results
            </p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl lg:text-4xl tracking-tight">
              <span className="text-[#1A3C5E]">{filtered.length}</span> Properties Found
            </h2>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <select
              className="filter-select bg-white border border-yellow-800/[0.12] rounded-xl pl-3 pr-8 py-2.5 text-black/80 text-sm outline-none cursor-pointer focus:border-[#C9A84C]/60 transition-colors w-full appearance-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
              {filtered.map((property) => (
                <BrowsePropertyCard key={property.id} property={property} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1A3C5E]/10 flex items-center justify-center mb-4">
                <FiSearch size={24} className="text-[#1A3C5E]" />
              </div>
              <p className="font-serif font-bold text-[#0D0D0D] text-xl">No properties found</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCity(""); setPropType(""); setPriceRange("");
                  setBeds(""); setArea(""); setListingType("");
                }}
                className="mt-5 bg-[#C9A84C] text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#b8943e] transition-colors cursor-pointer"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
