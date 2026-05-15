"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { fadeUp, staggerContainer } from "../../../lib/animations";
import { useRouter } from "next/navigation";

const trustBadges = ["No Hidden Fees", "Free Consultation", "500+ Happy Clients"];

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
      style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}
    >
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
        alt="luxury property"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#1A3C5E]/88" />

      {/* Ambient orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-1 pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[80px] orb-2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#C9A84C]/5 blur-[100px] orb-3 pointer-events-none" />

      {/* Floating card — left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 animate-float z-20"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-[200px]">
          <div className="relative h-[90px] rounded-xl overflow-hidden mb-3">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80"
              alt="listing"
              fill
              className="object-cover"
            />
            <span className="absolute top-2 left-2 bg-[#1A3C5E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              Just Listed
            </span>
          </div>
          <p className="font-serif font-bold text-[#0D0D0D] text-sm leading-tight">Willow Creek Estate</p>
          <p className="text-[#C9A84C] font-bold text-sm mt-0.5">$3,200,000</p>
        </div>
      </motion.div>

      {/* Floating card — right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 animate-float-delayed z-20"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-5 w-[180px]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[#C9A84C] font-black text-lg leading-none">4.9</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#C9A84C"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
          </div>
          <p className="text-[#0D0D0D] font-bold text-sm">Top Rated Agency</p>
          <p className="text-gray-400 text-xs mt-1">2,400+ Properties</p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col items-center text-center"
        >
          {/* Label chip */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-semibold tracking-wide px-4 py-2 rounded-full">
              Your Dream Home Awaits
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-serif font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-5 max-w-3xl"
          >
            Ready to Find Your<br />
            Perfect{" "}
            <span className="italic text-[#C9A84C]">Property?</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
            Join thousands of satisfied clients who found their dream home with LuxEstate. Expert guidance, zero stress.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/properties')}
              className="shimmer inline-flex items-center gap-2 bg-[#C9A84C] text-[white] font-bold text-sm px-8 py-4 rounded-full cursor-pointer"
            >
              Browse Properties
              <FiArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#1A3C5E" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 border border-white/40 text-white font-bold text-sm px-8 py-4 rounded-full cursor-pointer"
            >
              Add Property
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-white/60 text-sm">
                <FiCheck size={14} className="text-[#C9A84C] flex-shrink-0" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
