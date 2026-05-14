"use client"
import Image from "next/image"
import { useState } from "react"
import { featuredHomes } from "../../data/Data"
import { FiMapPin, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { IoBedOutline, IoWaterOutline } from "react-icons/io5"
import { BiArea } from "react-icons/bi"

const VISIBLE = 3

const tagColors = {
  "FOR SALE": "bg-[#1a5c5c] text-white",
  "FOR RENT": "bg-[#2d6a2d] text-white",
}

const HomesForYou = () => {
  const [start, setStart] = useState(0)

  const prev = () => setStart((s) => Math.max(0, s - 1))
  const next = () => setStart((s) => Math.min(featuredHomes.length - VISIBLE, s + 1))
  const visible = featuredHomes.slice(start, start + VISIBLE)

  return (
    <section className="py-20 px-6 md:px-16 bg-[#f7f7f7]">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[2rem] font-extrabold text-gray-900 tracking-tight">Homes For You</h2>
        <p className="text-gray-400 text-sm mt-2">Based on your view history</p>
      </div>

      {/* Carousel wrapper */}
      <div className="flex items-center gap-4">

        {/* Prev arrow */}
        <button
          onClick={prev}
          disabled={start === 0}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:shadow-md disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FiChevronLeft size={16} />
        </button>

        {/* Cards */}
        <div className="flex gap-5 flex-1 overflow-hidden">
          {visible.map((home) => (
            <div
              key={home.id}
              className="flex-1 min-w-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              {/* Image */}
              <div className="relative h-[210px] w-full overflow-hidden">
                <Image
                  src={home.img}
                  alt={home.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wide ${tagColors[home.tag] ?? "bg-gray-700 text-white"}`}>
                    {home.tag}
                  </span>
                  {home.featured && (
                    <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide">
                      FEATURED
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Title + Price */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-[14px] font-bold text-gray-900 leading-snug">{home.title}</h3>
                  <div className="text-right flex-shrink-0">
                    <span className="text-red-500 font-extrabold text-[14px]">{home.price}</span>
                    {home.priceType && (
                      <span className="text-gray-400 text-[11px] font-normal">{home.priceType}</span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-1.5 text-gray-400 text-[12px] mb-4">
                  <FiMapPin size={11} className="flex-shrink-0 text-gray-400" />
                  <span className="truncate">{home.address}</span>
                </div>

                {/* Divider + specs */}
                <div className="border-t border-gray-100 pt-3 flex items-center gap-5 text-gray-500 text-[12px]">
                  <span className="flex items-center gap-1.5">
                    <IoBedOutline size={14} className="text-gray-400" />
                    {home.beds} Beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IoWaterOutline size={14} className="text-gray-400" />
                    {home.baths} Baths
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BiArea size={14} className="text-gray-400" />
                    {home.sqft} sqft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          disabled={start >= featuredHomes.length - VISIBLE}
          className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:shadow-md disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FiChevronRight size={16} />
        </button>

      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: featuredHomes.length - VISIBLE + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className={`rounded-full transition-all duration-200 ${
              i === start ? "w-6 h-2 bg-[#1a5c5c]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

    </section>
  )
}

export default HomesForYou
