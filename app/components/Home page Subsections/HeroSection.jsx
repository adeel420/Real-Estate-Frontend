"use client"
import heroimg from "../../../public/hero.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiSearch, FiMapPin } from "react-icons/fi"
import { IoBedOutline } from "react-icons/io5"

const stats = [
  { value: "680", label: "Award Winning" },
  { value: "8K+", label: "Happy Customer" },
  { value: "500+", label: "Property Ready" },
]

const propertyTypes = ["All", "Buy", "Rent", "Commercial"]

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("All")

  return (
    <section className="relative w-full h-screen -mt-18 overflow-hidden">

      {/* Background */}
      <Image src={heroimg} alt="hero" fill className="object-cover object-center " priority />
      <div className="absolute inset-0 bg-gradient-to-r from-[#062a2a] via-[#0a3535]/75 to-[#0a3535]/10" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-[72px]">

        <div className="flex items-center h-full px-8 sm:px-14 md:px-20">
          <div className="max-w-[580px] w-full">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-[2px] bg-yellow-400 rounded-full" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Real Estate Experts</span>
            </div>

            {/* Heading */}
            <h1 className="text-white font-extrabold leading-[1.15] mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              The <span className="text-yellow-400">#1</span> site real estate<br />
              professionals trust*
            </h1>

            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-[420px]">
              From as low as $10 per day with limited time offer discounts. Discover your perfect home today.
            </p>

            {/* Search Card */}
            <div className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl p-4 mb-8 w-full max-w-[540px]">
              {/* Tabs */}
              <div className="flex gap-1 mb-4 bg-white/[0.06] rounded-xl p-1 w-fit">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${activeTab === type
                      ? "bg-yellow-400 text-gray-900 shadow-sm"
                      : "text-white/60 hover:text-white"
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Inputs row */}
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-xl px-3.5 py-2.5 flex-1 focus-within:border-yellow-400/50 transition-colors">
                  <FiMapPin className="text-yellow-400 flex-shrink-0" size={14} />
                  <input
                    type="text"
                    placeholder="City, neighborhood or address"
                    className="bg-transparent text-white text-xs placeholder:text-white/40 outline-none w-full"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-xl px-3.5 py-2.5 w-[120px] focus-within:border-yellow-400/50 transition-colors">
                  <IoBedOutline className="text-yellow-400 flex-shrink-0" size={14} />
                  <select className="bg-transparent text-white/50 text-xs outline-none w-full cursor-pointer">
                    <option value="" className="text-gray-900 bg-white">Bedrooms</option>
                    <option value="1" className="text-gray-900 bg-white">1+</option>
                    <option value="2" className="text-gray-900 bg-white">2+</option>
                    <option value="3" className="text-gray-900 bg-white">3+</option>
                    <option value="4" className="text-gray-900 bg-white">4+</option>
                  </select>
                </div>
                <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-gray-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 flex-shrink-0">
                  <FiSearch size={13} />
                  Search
                </button>
              </div>
            </div>

            {/* CTA */}
            <Link href="/listing" className="inline-flex items-center gap-2 text-yellow-400 text-sm font-semibold group">
              Browse More Properties
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex w-fit">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center px-12 py-5 bg-yellow-400 ${i !== stats.length - 1 ? "border-r border-yellow-500/30" : ""
                }`}
            >
              <span className="text-[1.6rem] font-black text-gray-900 leading-none">{stat.value}</span>
              <span className="text-[11px] text-gray-700 mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HeroSection
