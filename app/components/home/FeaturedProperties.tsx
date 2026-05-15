"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "../../../lib/animations";
import PropertyCard from "./PropertyCard";

const properties = [
  { id: 0, title: "DHA Phase 5 Luxury Apartment", address: "DHA Phase 5, Lahore", price: "PKR 1.8 Crore", tag: "FOR SALE", beds: 3, baths: 2, sqft: 1400, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80", category: "Apartments", featured: true },
  { id: 1, title: "Bahria Town Premium Villa", address: "Bahria Town, Karachi", price: "PKR 38,000", priceType: "/mo", tag: "FOR RENT", beds: 4, baths: 3, sqft: 3200, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80", category: "Villas", featured: true },
  { id: 2, title: "Gulberg Residencia Penthouse", address: "Gulberg, Lahore", price: "PKR 2.4 Crore", tag: "FOR SALE", beds: 4, baths: 3, sqft: 2100, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80", category: "Apartments" },
  { id: 3, title: "F-7 Islamabad Modern Villa", address: "F-7 Markaz, Islamabad", price: "PKR 5.2 Crore", tag: "FOR SALE", beds: 5, baths: 4, sqft: 4500, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80", category: "Villas" },
  { id: 4, title: "Blue Area Commercial Office", address: "Blue Area, Islamabad", price: "PKR 85,000", priceType: "/mo", tag: "FOR RENT", beds: 0, baths: 2, sqft: 1800, img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80", category: "Commercial" },
  { id: 5, title: "Clifton Sea-View Apartment", address: "Clifton Block 4, Karachi", price: "PKR 3.1 Crore", tag: "FOR SALE", beds: 3, baths: 2, sqft: 1650, img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=80", category: "Apartments" },
];

const tabs = ["All", "Apartments", "Villas", "Commercial"];

export default function FeaturedProperties() {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? properties : properties.filter((p) => p.category === active);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Hand-Picked</p>
            <h2 className="font-serif font-bold text-[#0D0D0D] text-4xl lg:text-5xl tracking-tight leading-tight">
              Featured Properties
            </h2>
            <div className="w-14 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  active === tab ? "text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {active === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-[#1A3C5E] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          key={active}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p) => <PropertyCard key={p.id} p={p} />)}
        </motion.div>
      </div>
    </section>
  );
}
