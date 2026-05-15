"use client";
import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiHeart, FiPhone, FiMail, FiArrowLeft, FiCheck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { MdOutlineGarage, MdOutlineCalendarToday, MdOutlineApartment, MdOutlineTv, MdOutlineLocalLaundryService, MdOutlineKitchen } from "react-icons/md";
import Badge from "../../components/ui/Badge";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import properties from "../../../lib/properties";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();

  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const gallery = property.gallery ?? [property.img];

  const prev = () => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActiveImg((i) => (i + 1) % gallery.length);

  const similar = properties.filter((p) => p.category === property.category && p.id !== property.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">

      {/* ── Hero Image ── */}
      <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden bg-[#1A3C5E]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={gallery[activeImg]} alt={property.title} fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

        {/* Back button */}
        <Link href="/properties">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
          >
            <FiArrowLeft size={14} /> Back
          </motion.div>
        </Link>

        {/* Heart */}
        <motion.button
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => setSaved((v) => !v)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        >
          <FiHeart size={16} className={saved ? "fill-red-500 text-red-500" : "text-white"} />
        </motion.button>

        {/* Gallery arrows */}
        {gallery.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer">
              <FiChevronLeft size={16} />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 transition-colors cursor-pointer">
              <FiChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === activeImg ? "bg-[#C9A84C] w-4" : "bg-white/50"}`} />
            ))}
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge className={property.type === "For Rent" ? "bg-[#1a5c5c] text-white text-[10px] font-bold tracking-wide" : "bg-[#1A3C5E] text-white text-[10px] font-bold tracking-wide"}>
                  {property.type === "For Rent" ? "FOR RENT" : "FOR SALE"}
                </Badge>
                {property.featured && <Badge className="bg-[#C9A84C] text-white text-[10px] font-bold tracking-wide">FEATURED</Badge>}
                <Badge className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-wide">{property.category}</Badge>
              </div>
              <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight drop-shadow-lg">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-white/70 text-sm mt-1">
                <FiMapPin size={12} /> {property.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-0.5">Price</p>
              <p className="text-white font-extrabold text-2xl sm:text-3xl drop-shadow-lg">{property.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Thumbnail Strip ── */}
      {gallery.length > 1 && (
        <div className="bg-[#1A3C5E] px-6 pb-4">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pt-3">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${i === activeImg ? "border-[#C9A84C]" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Stats bar */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">At a Glance</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.beds !== undefined && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                    <IoBedOutline size={22} className="text-[#1A3C5E] mb-1.5" />
                    <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.beds}</p>
                    <p className="text-gray-400 text-xs mt-1">Bedrooms</p>
                  </motion.div>
                )}
                {property.baths !== undefined && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                    <IoWaterOutline size={22} className="text-[#1A3C5E] mb-1.5" />
                    <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.baths}</p>
                    <p className="text-gray-400 text-xs mt-1">Bathrooms</p>
                  </motion.div>
                )}
                <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                  <BiArea size={22} className="text-[#1A3C5E] mb-1.5" />
                  <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.area}</p>
                  <p className="text-gray-400 text-xs mt-1">Sq. Ft.</p>
                </motion.div>
                {property.parking !== undefined && property.parking > 0 && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                    <MdOutlineGarage size={22} className="text-[#1A3C5E] mb-1.5" />
                    <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.parking}</p>
                    <p className="text-gray-400 text-xs mt-1">Parking</p>
                  </motion.div>
                )}
                {property.yearBuilt && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                    <MdOutlineCalendarToday size={22} className="text-[#1A3C5E] mb-1.5" />
                    <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.yearBuilt}</p>
                    <p className="text-gray-400 text-xs mt-1">Year Built</p>
                  </motion.div>
                )}
                {property.floors && (
                  <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-3 bg-[#F5F2ED] rounded-xl">
                    <MdOutlineApartment size={22} className="text-[#1A3C5E] mb-1.5" />
                    <p className="font-bold text-[#0D0D0D] text-lg leading-none">{property.floors}</p>
                    <p className="text-gray-400 text-xs mt-1">Floors</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Description */}
            {property.description && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">About</p>
                <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Property Overview</h2>
                <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-4" />
                <p className="text-gray-500 text-sm leading-relaxed">{property.description}</p>
              </motion.div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Features</p>
                <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Amenities</h2>
                <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-5" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                        <FiCheck size={10} className="text-[#C9A84C]" />
                      </div>
                      {a}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Where</p>
              <h2 className="font-serif font-bold text-[#0D0D0D] text-2xl mb-1">Location</h2>
              <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mb-4" />
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <FiMapPin size={13} className="text-[#C9A84C]" />
                {property.location}
              </div>
              {/* Map placeholder */}
              <div className="w-full h-48 bg-[#F5F2ED] rounded-xl flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <FiMapPin size={28} className="text-[#1A3C5E]/30 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Map view coming soon</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Agent Card + CTA ── */}
          <div className="space-y-5">

            {/* Price card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A3C5E] rounded-2xl p-6 text-white"
            >
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Asking Price</p>
              <p className="font-extrabold text-2xl text-white mb-1">{property.price}</p>
              <p className="text-white/40 text-xs">{property.type} · {property.category} · {property.city}</p>
              <div className="border-t border-white/10 mt-4 pt-4 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-[#C9A84C] hover:bg-[#b8943e] text-white font-bold text-sm py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Book Visit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors cursor-pointer border border-white/10"
                >
                  Make Offer
                </motion.button>
              </div>
            </motion.div>

            {/* Agent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Listed By</p>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#1A3C5E] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                  {property.agentInitials}
                </div>
                <div>
                  <p className="font-serif font-bold text-[#0D0D0D] text-base">{property.agentName}</p>
                  <p className="text-gray-400 text-xs">Property Agent · {property.city}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {property.agentPhone && (
                  <a href={`tel:${property.agentPhone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#1A3C5E] transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-[#F5F2ED] group-hover:bg-[#1A3C5E]/10 flex items-center justify-center transition-colors">
                      <FiPhone size={13} className="text-[#1A3C5E]" />
                    </div>
                    {property.agentPhone}
                  </a>
                )}
                <a href="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#1A3C5E] transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-[#F5F2ED] group-hover:bg-[#1A3C5E]/10 flex items-center justify-center transition-colors">
                    <FiMail size={13} className="text-[#1A3C5E]" />
                  </div>
                  Send Message
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-5 border border-[#1A3C5E]/30 text-[#1A3C5E] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#1A3C5E] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                View Agent Profile
              </motion.button>
            </motion.div>

            {/* Quick info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Details</p>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Category",     value: property.category },
                  { label: "City",         value: property.city },
                  { label: "Listing Type", value: property.type },
                  { label: "Area",         value: `${property.area} sq ft` },
                  ...(property.yearBuilt ? [{ label: "Year Built", value: String(property.yearBuilt) }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-[#0D0D0D]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Similar Properties ── */}
        {similar.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-16"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">More Like This</p>
              <h2 className="font-serif font-bold text-[#0D0D0D] text-3xl">Similar Properties</h2>
              <div className="w-10 h-[3px] bg-[#C9A84C] rounded-full mt-3" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <Link href={`/properties/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="relative h-[200px] overflow-hidden">
                        <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className={p.type === "For Rent" ? "bg-[#1a5c5c] text-white" : "bg-[#1A3C5E] text-white"}>
                            {p.type === "For Rent" ? "FOR RENT" : "FOR SALE"}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <span className="text-white font-extrabold text-base drop-shadow-lg">{p.price}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-[#0D0D0D] text-[15px] leading-snug mb-1">{p.title}</h3>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <FiMapPin size={11} />{p.location}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
