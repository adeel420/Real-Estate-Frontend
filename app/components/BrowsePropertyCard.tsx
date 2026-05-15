"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMapPin, FiHeart } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import Badge from "./ui/Badge";
import { scaleIn } from "../../lib/animations";
import type { Property } from "../../lib/properties";

export default function BrowsePropertyCard({ property: p }: { property: Property }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={p.img}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={p.type === "For Rent" ? "bg-[#1a5c5c] text-white" : "bg-[#1A3C5E] text-white"}>
            {p.type === "For Rent" ? "FOR RENT" : "FOR SALE"}
          </Badge>
          {p.featured && <Badge className="bg-[#C9A84C] text-white">FEATURED</Badge>}
        </div>

        {/* Heart */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setSaved((v) => !v)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
        >
          <FiHeart size={15} className={saved ? "fill-red-500 text-red-500" : "text-white"} />
        </motion.button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-extrabold text-lg leading-none drop-shadow-lg">
            {p.price}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-[#0D0D0D] text-[15px] leading-snug mb-1">{p.title}</h3>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
          <FiMapPin size={11} />
          <span className="truncate">{p.location}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-gray-500 text-xs">
          {p.beds !== undefined && (
            <span className="flex items-center gap-1.5"><IoBedOutline size={13} /> {p.beds} Beds</span>
          )}
          {p.baths !== undefined && (
            <span className="flex items-center gap-1.5"><IoWaterOutline size={13} /> {p.baths} Baths</span>
          )}
          <span className="flex items-center gap-1.5"><BiArea size={13} /> {p.area} sqft</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#1A3C5E] font-semibold text-[11px] border border-[#1A3C5E]/30 rounded-full px-3 py-1 hover:bg-[#1A3C5E] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            View
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
